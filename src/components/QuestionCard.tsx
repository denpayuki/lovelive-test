import type { Question } from '../types';
import LikertScale from './LikertScale';
import { useLocale } from '../i18n';
import { questionTexts } from '../i18n/questions';

interface QuestionCardProps {
  question: Question;
  questionIndex: number;
  total: number;
  value: number | undefined;
  onChange: (value: number) => void;
}

export default function QuestionCard({ question, questionIndex, total, value, onChange }: QuestionCardProps) {
  const { t, locale } = useLocale();
  const text = questionTexts[locale]?.[question.id] ?? question.text;

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="text-sm text-stone-gray dark:text-warm-silver mb-2">
        {t('question.label', { index: questionIndex + 1, total })}
      </div>
      <h2 className="font-serif-display text-xl sm:text-2xl text-near-black dark:text-ivory mb-8" style={{ lineHeight: 1.30 }}>
        {text}
      </h2>
      <LikertScale value={value} onChange={onChange} />
    </div>
  );
}
