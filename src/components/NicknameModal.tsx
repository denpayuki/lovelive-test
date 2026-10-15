import { useState, useEffect, useRef } from 'react';
import { useLocale } from '../i18n';

interface NicknameModalProps {
  open: boolean;
  onConfirm: (nickname: string) => void;
  onClose: () => void;
}

export default function NicknameModal({ open, onConfirm, onClose }: NicknameModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [nickname, setNickname] = useState('');
  const { t } = useLocale();

  useEffect(() => {
    if (!open) return;
    setNickname('');
    setTimeout(() => inputRef.current?.focus(), 100);
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const trimmed = nickname.trim();

  const handleSubmit = () => {
    if (trimmed) onConfirm(trimmed);
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="absolute inset-0 bg-near-black/40 dark:bg-black/60" />

      <div
        className="relative w-full max-w-sm bg-ivory dark:bg-dark-surface rounded-2xl p-6 sm:p-8 animate-scale-in"
        style={{ boxShadow: 'rgba(0,0,0,0.05) 0px 4px 24px' }}
      >
        <button
          onClick={onClose}
          aria-label={t('export.nicknameCancel')}
          className="absolute top-3 right-3 w-11 h-11 flex items-center justify-center rounded-full text-stone-gray dark:text-warm-silver hover:text-near-black dark:hover:text-ivory hover:bg-parchment dark:hover:bg-near-black transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3898ec]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <h2
          className="font-serif-display text-xl text-near-black dark:text-ivory mb-5"
          style={{ lineHeight: 1.20 }}
        >
          {t('export.nicknameTitle')}
        </h2>

        <input
          ref={inputRef}
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }}
          maxLength={12}
          placeholder={t('export.nicknamePlaceholder')}
          className="w-full px-4 py-3 rounded-xl text-near-black dark:text-ivory bg-parchment dark:bg-near-black text-sm outline-none focus-visible:ring-2 focus-visible:ring-[#3898ec] transition-colors"
          style={{ border: '1px solid var(--card-border-color)' }}
        />

        <div className="mt-5 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-sm rounded-lg bg-warm-sand dark:bg-dark-warm text-charcoal-warm dark:text-ivory hover:opacity-90 transition-all cursor-pointer"
            style={{ boxShadow: 'var(--btn-secondary-ring)' }}
          >
            {t('export.nicknameCancel')}
          </button>
          <button
            onClick={handleSubmit}
            disabled={!trimmed}
            className="flex-1 py-2.5 text-sm rounded-lg bg-terracotta text-ivory hover:opacity-90 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ boxShadow: '#b83f6d 0px 0px 0px 0px, #b83f6d 0px 0px 0px 1px' }}
          >
            {t('export.nicknameConfirm')}
          </button>
        </div>
      </div>
    </div>
  );
}
