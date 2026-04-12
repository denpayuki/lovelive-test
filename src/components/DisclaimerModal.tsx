import { useEffect, useRef, useState } from 'react';
import { useLocale } from '../i18n';

interface DisclaimerModalProps {
  open: boolean;
  onClose: () => void;
}

const FRIEND_LINKS = [
  {
    url: 'https://jcver.github.io/Gakumas-idolmaster-MBTI-test/',
    labelKey: 'disclaimer.links.gakumas' as const,
  },
];

export default function DisclaimerModal({ open, onClose }: DisclaimerModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const { t } = useLocale();
  const [activeTab, setActiveTab] = useState<'about' | 'links'>('about');

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setActiveTab('about');
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-near-black/40 dark:bg-black/60" />

      {/* Modal */}
      <div
        className="relative w-full max-w-md bg-ivory dark:bg-dark-surface rounded-2xl p-6 sm:p-8 animate-scale-in"
        style={{ boxShadow: 'rgba(0,0,0,0.05) 0px 4px 24px' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label={t('disclaimer.close')}
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
          {t('disclaimer.title')}
        </h2>

        {/* Tabs */}
        <div className="flex gap-1 mb-5 border-b border-border-cream dark:border-dark-warm">
          <button
            onClick={() => setActiveTab('about')}
            className={`px-4 py-2 text-sm rounded-t-lg transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3898ec] ${
              activeTab === 'about'
                ? 'text-terracotta border-b-2 border-terracotta font-medium -mb-px'
                : 'text-stone-gray dark:text-warm-silver hover:text-near-black dark:hover:text-ivory'
            }`}
          >
            {t('disclaimer.tab.about')}
          </button>
          <button
            onClick={() => setActiveTab('links')}
            className={`px-4 py-2 text-sm rounded-t-lg transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3898ec] ${
              activeTab === 'links'
                ? 'text-terracotta border-b-2 border-terracotta font-medium -mb-px'
                : 'text-stone-gray dark:text-warm-silver hover:text-near-black dark:hover:text-ivory'
            }`}
          >
            {t('disclaimer.tab.links')}
          </button>
        </div>

        {/* Tab content */}
        {activeTab === 'about' ? (
          <div className="space-y-4 text-sm text-olive-gray dark:text-warm-silver" style={{ lineHeight: 1.70 }}>
            <div className="flex gap-3">
              <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-terracotta/15 dark:bg-terracotta/25 flex items-center justify-center">
                <span className="block w-1.5 h-1.5 rounded-full bg-terracotta" />
              </span>
              <p>
                {t('disclaimer.p1').split('{highlight}')[0]}
                <span className="font-medium text-near-black dark:text-ivory">{t('disclaimer.p1.highlight')}</span>
                {t('disclaimer.p1').split('{highlight}')[1]}
              </p>
            </div>

            <div className="flex gap-3">
              <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-terracotta/15 dark:bg-terracotta/25 flex items-center justify-center">
                <span className="block w-1.5 h-1.5 rounded-full bg-terracotta" />
              </span>
              <p>
                {t('disclaimer.p2').split('{highlight}')[0]}
                <span className="font-medium text-near-black dark:text-ivory">{t('disclaimer.p2.highlight')}</span>
                {t('disclaimer.p2').split('{highlight}')[1]}
              </p>
            </div>

            <div className="flex gap-3">
              <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-terracotta/15 dark:bg-terracotta/25 flex items-center justify-center">
                <span className="block w-1.5 h-1.5 rounded-full bg-terracotta" />
              </span>
              <p>{t('disclaimer.p3')}</p>
            </div>

            <div className="flex gap-3">
              <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-terracotta/15 dark:bg-terracotta/25 flex items-center justify-center">
                <span className="block w-1.5 h-1.5 rounded-full bg-terracotta" />
              </span>
              <p>{t('disclaimer.p4')}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3 text-sm text-olive-gray dark:text-warm-silver" style={{ lineHeight: 1.70 }}>
            {FRIEND_LINKS.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-parchment dark:bg-near-black hover:bg-warm-sand dark:hover:bg-dark-warm transition-colors group"
              >
                <span className="shrink-0 w-8 h-8 rounded-lg bg-terracotta/15 dark:bg-terracotta/25 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-terracotta">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-medium text-near-black dark:text-ivory group-hover:text-terracotta transition-colors">
                    {t(link.labelKey)}
                  </span>
                  <span className="block text-xs text-stone-gray dark:text-warm-silver truncate mt-0.5">
                    {link.url.replace(/^https?:\/\//, '')}
                  </span>
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-stone-gray dark:text-warm-silver group-hover:text-terracotta transition-colors">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-border-cream dark:border-dark-warm">
          <button
            onClick={onClose}
            className="w-full py-2.5 text-sm rounded-lg bg-warm-sand dark:bg-dark-warm text-charcoal-warm dark:text-ivory hover:opacity-90 transition-all cursor-pointer"
            style={{ boxShadow: 'var(--btn-secondary-ring)' }}
          >
            {t('disclaimer.okay')}
          </button>
        </div>
      </div>
    </div>
  );
}
