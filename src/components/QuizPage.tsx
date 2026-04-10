import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../data/questions';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
import ResultPage from './ResultPage';
import { calculateDimensionScores, matchCharacters } from '../utils/matching';
import { characters } from '../data/characters';
import type { MatchResult } from '../types';

export default function QuizPage() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [results, setResults] = useState<MatchResult[] | null>(null);
  const [started, setStarted] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const canGoNext = answers[currentQuestion?.id] !== undefined;
  const allAnswered = answeredCount === questions.length;

  const handleAnswer = useCallback((value: number) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  }, [currentQuestion?.id]);

  const handleNext = useCallback(() => {
    if (isLastQuestion && allAnswered) {
      const scores = calculateDimensionScores(answers);
      const matchResults = matchCharacters(scores, characters);
      setResults(matchResults);
    } else if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  }, [isLastQuestion, allAnswered, currentIndex, answers]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex]);

  const handleRestart = useCallback(() => {
    setAnswers({});
    setCurrentIndex(0);
    setResults(null);
    setStarted(false);
  }, []);

  // Results view
  if (results) {
    return <ResultPage results={results} answers={answers} onRestart={handleRestart} />;
  }

  // Landing / start screen
  if (!started) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-lg text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 tracking-tight">
            闪耀色彩性格测试
          </h1>
          <p className="text-base text-gray-500 mb-2 leading-relaxed">
            シャイニーカラーズ パーソナリティ診断
          </p>
          <p className="text-gray-500 mb-8 leading-relaxed">
            回答 {questions.length} 道性格题目，<br />
            找到与你最相似的闪耀色彩角色！
          </p>
          <button
            onClick={() => setStarted(true)}
            className="px-8 py-3 bg-gray-800 text-white rounded-full text-base font-medium hover:bg-gray-700 transition-colors cursor-pointer"
          >
            开始测试
          </button>
          <div className="mt-6">
            <button
              onClick={() => navigate('/characters')}
              className="text-sm text-gray-400 hover:text-gray-600 underline underline-offset-4 cursor-pointer"
            >
              先看看有哪些角色 →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz view
  return (
    <div className="min-h-screen flex flex-col px-4 py-8">
      {/* Header */}
      <div className="max-w-xl mx-auto w-full mb-8">
        <ProgressBar current={answeredCount} total={questions.length} />
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center">
        <QuestionCard
          question={currentQuestion}
          questionIndex={currentIndex}
          total={questions.length}
          value={answers[currentQuestion.id]}
          onChange={handleAnswer}
        />
      </div>

      {/* Navigation */}
      <div className="max-w-xl mx-auto w-full flex justify-between items-center mt-8 gap-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-6 py-2.5 text-sm rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          上一题
        </button>

        <button
          onClick={handleNext}
          disabled={!canGoNext}
          className={`px-6 py-2.5 text-sm rounded-full transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
            isLastQuestion && allAnswered
              ? 'bg-rose-500 text-white hover:bg-rose-600'
              : 'bg-gray-800 text-white hover:bg-gray-700'
          }`}
        >
          {isLastQuestion && allAnswered ? '查看结果' : '下一题'}
        </button>
      </div>
    </div>
  );
}
