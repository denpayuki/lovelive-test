import { useState, useRef, useEffect } from 'react';
import { useLocale, type Locale } from '../i18n';

const localeOptions: { value: Locale; label: string }[] = [
  { value: 'zh', label: '中文' },
  { value: 'en', label: 'EN' },
  { value: 'ja', label: '日本語' },
];

export default function LocaleToggle() {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  const current = localeOptions.find((o) => o.value === locale)!;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t('lang.label')}
        aria-expanded={open}
        className="h-11 flex items-center gap-1.5 px-3 rounded-full bg-warm-sand dark:bg-dark-surface text-charcoal-warm dark:text-warm-silver hover:opacity-80 transition-colors cursor-pointer"
        style={{ boxShadow: 'var(--btn-secondary-ring)' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className="text-xs font-medium">{current.label}</span>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 bg-ivory dark:bg-dark-surface rounded-xl overflow-hidden animate-fade-in z-50"
          style={{ boxShadow: 'rgba(0,0,0,0.1) 0px 4px 16px', border: '1px solid var(--card-border-color)', minWidth: '100px' }}
        >
          {localeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { setLocale(opt.value); setOpen(false); }}
              className={`w-full px-4 py-3 text-sm text-left transition-colors cursor-pointer ${
                opt.value === locale
                  ? 'text-terracotta font-medium bg-ivory dark:bg-dark-warm'
                  : 'text-charcoal-warm dark:text-warm-silver hover:bg-parchment dark:hover:bg-dark-warm'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
