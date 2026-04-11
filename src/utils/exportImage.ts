import { domToPng } from 'modern-screenshot';

export async function captureElement(element: HTMLElement): Promise<Blob> {
  const dataUrl = await domToPng(element, {
    scale: 2,
    quality: 0.92,
  });
  const res = await fetch(dataUrl);
  return res.blob();
}

export function downloadBlob(blobUrl: string, filename: string): void {
  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

const R2_ORIGIN = 'https://assets.sallyn.top';
const PROXY_PREFIX = '/r2-assets';

/** In dev mode, rewrite R2 URLs to go through the Vite proxy (bypasses CORS). */
function proxyUrl(url: string): string {
  if (import.meta.env.DEV && url.startsWith(R2_ORIGIN)) {
    return url.replace(R2_ORIGIN, PROXY_PREFIX);
  }
  return url;
}

export async function fetchImageAsDataUrl(url: string): Promise<string> {
  // Approach 1: fetch (uses Vite proxy in dev, direct in prod)
  try {
    const res = await fetch(proxyUrl(url));
    if (res.ok) {
      const blob = await res.blob();
      return await blobToDataUrl(blob);
    }
  } catch { /* CORS or network error, try next approach */ }

  // Approach 2: direct fetch without proxy (prod fallback)
  try {
    const res = await fetch(url);
    if (res.ok) {
      const blob = await res.blob();
      return await blobToDataUrl(blob);
    }
  } catch { /* try next */ }

  // Approach 3: Image element + Canvas
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } catch {
        reject(new Error('Canvas tainted — CORS not supported by image server'));
      }
    };
    img.onerror = () => reject(new Error('Image load failed'));
    img.src = url;
  });
}
