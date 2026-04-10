interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2 text-sm text-stone-gray">
        <span>进度</span>
        <span>{current} / {total}</span>
      </div>
      <div className="w-full h-2 bg-border-cream rounded-full overflow-hidden">
        <div
          className="h-full bg-terracotta rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
