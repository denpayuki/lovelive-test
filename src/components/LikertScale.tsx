import { useRef, useCallback } from 'react';

interface LikertScaleProps {
  value: number | undefined;
  onChange: (value: number) => void;
}

const options = [
  { value: 7, label: '完全认同', size: 'w-12 h-12', bg: '#c96442' },
  { value: 6, label: '非常认同', size: 'w-10 h-10', bg: '#d97757' },
  { value: 5, label: '比较认同', size: 'w-9 h-9', bg: '#e0a08a' },
  { value: 4, label: '中立', size: 'w-8 h-8', bg: '#d1cfc5' },
  { value: 3, label: '不太认同', size: 'w-9 h-9', bg: '#b0aea5' },
  { value: 2, label: '非常不认同', size: 'w-10 h-10', bg: '#87867f' },
  { value: 1, label: '完全不认同', size: 'w-12 h-12', bg: '#5e5d59' },
];

export default function LikertScale({ value, onChange }: LikertScaleProps) {
  const groupRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, idx: number) => {
    let nextIdx = idx;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIdx = (idx + 1) % options.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIdx = (idx - 1 + options.length) % options.length;
    } else {
      return;
    }
    onChange(options[nextIdx].value);
    const buttons = groupRef.current?.querySelectorAll<HTMLButtonElement>('[role="radio"]');
    buttons?.[nextIdx]?.focus();
  }, [onChange]);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Labels */}
      <div className="flex w-full justify-between text-sm text-stone-gray dark:text-warm-silver px-2" aria-hidden="true">
        <span>认同</span>
        <span>不认同</span>
      </div>

      {/* Radio group */}
      <div
        ref={groupRef}
        role="radiogroup"
        aria-label="选择你的认同程度"
        className="flex items-center justify-center gap-1 sm:gap-2"
      >
        {options.map((opt, idx) => {
          const isSelected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={opt.label}
              tabIndex={isSelected || (value === undefined && idx === 0) ? 0 : -1}
              onClick={() => onChange(opt.value)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="flex items-center justify-center cursor-pointer w-11 h-11 sm:w-14 sm:h-14 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3898ec] focus-visible:ring-offset-2 focus-visible:ring-offset-parchment dark:focus-visible:ring-offset-near-black"
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
        {value !== undefined && options.find((o) => o.value === value)?.label}
      </div>
    </div>
  );
}
