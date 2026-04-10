interface LikertScaleProps {
  value: number | undefined;
  onChange: (value: number) => void;
}

const options = [
  { value: 7, label: '完全认同', size: 'w-12 h-12', color: 'bg-rose-400 hover:bg-rose-500', ring: 'ring-rose-400' },
  { value: 6, label: '非常认同', size: 'w-10 h-10', color: 'bg-rose-300 hover:bg-rose-400', ring: 'ring-rose-300' },
  { value: 5, label: '比较认同', size: 'w-8 h-8', color: 'bg-rose-200 hover:bg-rose-300', ring: 'ring-rose-200' },
  { value: 4, label: '中立', size: 'w-6 h-6', color: 'bg-gray-300 hover:bg-gray-400', ring: 'ring-gray-300' },
  { value: 3, label: '不太认同', size: 'w-8 h-8', color: 'bg-sky-200 hover:bg-sky-300', ring: 'ring-sky-200' },
  { value: 2, label: '非常不认同', size: 'w-10 h-10', color: 'bg-sky-300 hover:bg-sky-400', ring: 'ring-sky-300' },
  { value: 1, label: '完全不认同', size: 'w-12 h-12', color: 'bg-sky-400 hover:bg-sky-500', ring: 'ring-sky-400' },
];

export default function LikertScale({ value, onChange }: LikertScaleProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Labels */}
      <div className="flex w-full justify-between text-sm text-gray-500 px-2">
        <span>认同</span>
        <span>不认同</span>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-3 sm:gap-4">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            title={opt.label}
            className={`
              ${opt.size} ${opt.color}
              rounded-full cursor-pointer transition-all duration-200
              flex items-center justify-center
              ${value === opt.value ? `ring-4 ${opt.ring} ring-offset-2 scale-110` : 'opacity-70 hover:opacity-100'}
            `}
          />
        ))}
      </div>

      {/* Selected label */}
      <div className="h-5 text-sm text-gray-600">
        {value !== undefined && options.find((o) => o.value === value)?.label}
      </div>
    </div>
  );
}
