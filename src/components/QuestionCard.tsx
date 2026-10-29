import type { Question } from '../types';
import LikertScale from './LikertScale';
import { useLocale } from '../i18n';

interface QuestionCardProps {
  question: Question;
  questionIndex: number;
  total: number;
  value: number | undefined;
  onChange: (value: number) => void;
}

export default function QuestionCard({ question, questionIndex, total, value, onChange }: QuestionCardProps) {
  const { t, locale } = useLocale();

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="text-sm text-stone-gray dark:text-warm-silver mb-2">
        {t('question.label', { index: questionIndex + 1, total })}
      </div>
      <h2 className="font-serif-display text-xl sm:text-2xl text-near-black dark:text-ivory mb-8" style={{ lineHeight: 1.30 }}>
        {question.text[locale]}
      </h2>
      <LikertScale value={value} onChange={onChange} />
    </div>
  );
}
