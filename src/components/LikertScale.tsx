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
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Labels */}
      <div className="flex w-full justify-between text-sm text-stone-gray px-2">
        <span>认同</span>
        <span>不认同</span>
      </div>

      {/* Dots — each wrapped in a 44px touch target */}
      <div className="flex items-center justify-center gap-1 sm:gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            title={opt.label}
            className="flex items-center justify-center cursor-pointer w-11 h-11 sm:w-14 sm:h-14"
            style={{ background: 'none', border: 'none', padding: 0 }}
          >
            <span
              className={`
                ${opt.size}
                rounded-full transition-all duration-200
                block shrink-0
                ${value === opt.value ? 'scale-110' : 'opacity-50 hover:opacity-80'}
              `}
              style={{
                backgroundColor: opt.bg,
                boxShadow: value === opt.value
                  ? `${opt.bg} 0px 0px 0px 3px, #f5f4ed 0px 0px 0px 5px, ${opt.bg} 0px 0px 0px 7px`
                  : 'none',
              }}
            />
          </button>
        ))}
      </div>

      {/* Selected label */}
      <div className="h-5 text-sm text-olive-gray">
        {value !== undefined && options.find((o) => o.value === value)?.label}
      </div>
    </div>
  );
}
