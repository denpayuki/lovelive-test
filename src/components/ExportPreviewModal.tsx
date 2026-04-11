import { useEffect, useRef } from 'react';
import { useLocale } from '../i18n';

interface ExportPreviewModalProps {
  open: boolean;
  imageUrl: string;
  filename: string;
  onDownload: () => void;
  onClose: () => void;
}

export default function ExportPreviewModal({ open, imageUrl, onDownload, onClose }: ExportPreviewModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const { t } = useLocale();

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="absolute inset-0 bg-near-black/40 dark:bg-black/60" />

      <div
        className="relative w-full max-w-2xl bg-ivory dark:bg-dark-surface rounded-2xl p-5 sm:p-6 animate-scale-in"
        style={{ boxShadow: 'rgba(0,0,0,0.05) 0px 4px 24px' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label={t('export.previewClose')}
          className="absolute top-3 right-3 w-11 h-11 flex items-center justify-center rounded-full text-stone-gray dark:text-warm-silver hover:text-near-black dark:hover:text-ivory hover:bg-parchment dark:hover:bg-near-black transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3898ec]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Title */}
        <h2
          className="font-serif-display text-xl text-near-black dark:text-ivory mb-4"
          style={{ lineHeight: 1.20 }}
        >
          {t('export.previewTitle')}
        </h2>

        {/* Image preview */}
        <div
          className="rounded-xl overflow-hidden mb-5"
          style={{ border: '1px solid var(--card-border-color)', boxShadow: 'var(--card-shadow)' }}
        >
          <img
            src={imageUrl}
            alt={t('export.previewTitle')}
            className="w-full h-auto block"
            draggable={false}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-sm rounded-lg bg-warm-sand dark:bg-dark-warm text-charcoal-warm dark:text-ivory hover:opacity-90 transition-all cursor-pointer"
            style={{ boxShadow: 'var(--btn-secondary-ring)' }}
          >
            {t('export.previewClose')}
          </button>
          <button
            onClick={onDownload}
            className="flex-1 py-2.5 text-sm rounded-lg bg-terracotta text-ivory hover:opacity-90 transition-all cursor-pointer"
            style={{ boxShadow: '#b45535 0px 0px 0px 0px, #b45535 0px 0px 0px 1px' }}
          >
            {t('export.previewDownload')}
          </button>
        </div>
      </div>
    </div>
  );
}
