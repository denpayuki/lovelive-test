import { useLocale } from '../i18n';

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100);
  const { t } = useLocale();

  return (
    <div className="w-full">
      <div
        className="w-full h-2 bg-border-cream dark:bg-dark-warm rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={t('progress.aria', { current, total })}
      >
        <div
          className="h-full bg-terracotta rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
