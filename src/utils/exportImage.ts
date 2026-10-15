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

export async function fetchImageAsDataUrl(url: string): Promise<string> {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Image request failed: ${res.status} ${res.statusText}`);
  }
  return blobToDataUrl(await res.blob());
}
