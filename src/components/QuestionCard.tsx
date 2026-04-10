import type { Question } from '../types';
import LikertScale from './LikertScale';

interface QuestionCardProps {
  question: Question;
  questionIndex: number;
  total: number;
  value: number | undefined;
  onChange: (value: number) => void;
}

export default function QuestionCard({ question, questionIndex, total, value, onChange }: QuestionCardProps) {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="text-sm text-gray-400 mb-2">
        Q{questionIndex + 1} / {total}
      </div>
      <h2 className="text-lg sm:text-xl font-medium text-gray-800 mb-8 leading-relaxed">
        {question.text}
      </h2>
      <LikertScale value={value} onChange={onChange} />
    </div>
  );
}
