import { useRef, useCallback } from 'react';
import { useLocale } from '../i18n';
import type { TranslationKey } from '../i18n';

interface LikertScaleProps {
  value: number | undefined;
  onChange: (value: number) => void;
}

const optionMeta: { value: number; labelKey: TranslationKey; size: string; bg: string }[] = [
  { value: 7, labelKey: 'likert.7', size: 'w-9 h-9 sm:w-12 sm:h-12', bg: '#b45535' },
  { value: 6, labelKey: 'likert.6', size: 'w-8 h-8 sm:w-10 sm:h-10', bg: '#d97757' },
  { value: 5, labelKey: 'likert.5', size: 'w-7 h-7 sm:w-9 sm:h-9', bg: '#e0a08a' },
  { value: 4, labelKey: 'likert.4', size: 'w-6 h-6 sm:w-8 sm:h-8', bg: '#d1cfc5' },
  { value: 3, labelKey: 'likert.3', size: 'w-7 h-7 sm:w-9 sm:h-9', bg: '#b0aea5' },
  { value: 2, labelKey: 'likert.2', size: 'w-8 h-8 sm:w-10 sm:h-10', bg: '#87867f' },
  { value: 1, labelKey: 'likert.1', size: 'w-9 h-9 sm:w-12 sm:h-12', bg: '#5e5d59' },
];

export default function LikertScale({ value, onChange }: LikertScaleProps) {
  const groupRef = useRef<HTMLDivElement>(null);
  const { t } = useLocale();

  const handleKeyDown = useCallback((e: React.KeyboardEvent, idx: number) => {
    let nextIdx = idx;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIdx = (idx + 1) % optionMeta.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIdx = (idx - 1 + optionMeta.length) % optionMeta.length;
    } else {
      return;
    }
    onChange(optionMeta[nextIdx].value);
    const buttons = groupRef.current?.querySelectorAll<HTMLButtonElement>('[role="radio"]');
    buttons?.[nextIdx]?.focus();
  }, [onChange]);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Labels */}
      <div className="flex w-full justify-between text-sm text-stone-gray dark:text-warm-silver px-2" aria-hidden="true">
        <span>{t('likert.agree')}</span>
        <span>{t('likert.disagree')}</span>
      </div>

      {/* Radio group */}
      <div
        ref={groupRef}
        role="radiogroup"
        aria-label={t('likert.aria')}
        className="flex items-center justify-center gap-1 sm:gap-2"
      >
        {optionMeta.map((opt, idx) => {
          const isSelected = value === opt.value;
          const label = t(opt.labelKey);
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={label}
              tabIndex={isSelected || (value === undefined && idx === 0) ? 0 : -1}
              onClick={() => onChange(opt.value)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="flex items-center justify-center cursor-pointer w-12 h-12 sm:w-14 sm:h-14 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3898ec] focus-visible:ring-offset-2 focus-visible:ring-offset-parchment dark:focus-visible:ring-offset-near-black"
              style={{ background: 'none', border: 'none', padding: 0 }}
            >
              <span
                className={`
                  ${opt.size}
                  rounded-full transition-all duration-200
                  block shrink-0
                  ${isSelected ? 'scale-110' : 'opacity-50 hover:opacity-80'}
                `}
                style={{
                  backgroundColor: opt.bg,
                  boxShadow: isSelected
                    ? `${opt.bg} 0px 0px 0px 3px, var(--ring-page-bg) 0px 0px 0px 5px, ${opt.bg} 0px 0px 0px 7px`
                    : 'none',
                }}
              />
            </button>
          );
        })}
      </div>

      {/* Selected label */}
      <div className="h-5 text-sm text-olive-gray dark:text-warm-silver" aria-live="polite">
        {value !== undefined && t(optionMeta.find((o) => o.value === value)!.labelKey)}
      </div>
    </div>
  );
}
