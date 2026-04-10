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
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-lg text-center">
          <p className="animate-fade-in-up stagger-1 text-xs tracking-widest text-stone-gray uppercase mb-6">
            Personality Quiz
          </p>
          <h1 className="animate-fade-in-up stagger-2 font-serif-display text-4xl sm:text-5xl text-near-black mb-4" style={{ lineHeight: 1.10 }}>
            闪耀色彩性格测试
          </h1>
          <p className="animate-fade-in-up stagger-2 text-base text-olive-gray mb-3" style={{ lineHeight: 1.60 }}>
            シャイニーカラーズ パーソナリティ診断
          </p>

          {/* Decorative divider */}
          <div className="animate-fade-in stagger-3 flex items-center justify-center gap-3 my-8">
            <span className="block w-12 h-px bg-border-warm" />
            <span className="block w-1.5 h-1.5 rounded-full bg-terracotta" />
            <span className="block w-12 h-px bg-border-warm" />
          </div>

          <p className="animate-fade-in-up stagger-3 text-olive-gray mb-10" style={{ lineHeight: 1.60 }}>
            回答 {questions.length} 道性格题目，<br />
            找到与你最相似的闪耀色彩角色！
          </p>
          <div className="animate-fade-in-up stagger-4">
            <button
              onClick={() => setStarted(true)}
              className="px-8 py-3 bg-terracotta text-ivory rounded-xl text-base font-medium hover:opacity-90 transition-all cursor-pointer"
              style={{ boxShadow: '#c96442 0px 0px 0px 0px, #c96442 0px 0px 0px 1px' }}
            >
              开始测试
            </button>
          </div>
          <div className="animate-fade-in stagger-4 mt-8">
            <button
              onClick={() => navigate('/characters')}
              className="text-sm text-stone-gray hover:text-dark-warm transition-colors cursor-pointer"
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
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={handleRestart}
            className="text-sm text-stone-gray hover:text-dark-warm transition-colors cursor-pointer flex items-center gap-1"
          >
            ← 返回首页
          </button>
          <span className="text-sm text-stone-gray">
            {answeredCount}/{questions.length}
          </span>
        </div>
        <ProgressBar current={answeredCount} total={questions.length} />
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center">
        <div key={currentIndex} className="animate-fade-in">
          <QuestionCard
            question={currentQuestion}
            questionIndex={currentIndex}
            total={questions.length}
            value={answers[currentQuestion.id]}
            onChange={handleAnswer}
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-xl mx-auto w-full flex justify-between items-center mt-8 gap-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-6 py-2.5 text-sm rounded-lg bg-warm-sand text-charcoal-warm hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          style={{ boxShadow: '#e8e6dc 0px 0px 0px 0px, #d1cfc5 0px 0px 0px 1px' }}
        >
          上一题
        </button>

        <button
          onClick={handleNext}
          disabled={!canGoNext}
          className={`px-6 py-2.5 text-sm rounded-lg transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
            isLastQuestion && allAnswered
              ? 'bg-terracotta text-ivory'
              : 'bg-dark-surface text-ivory'
          }`}
          style={{
            boxShadow: isLastQuestion && allAnswered
              ? '#c96442 0px 0px 0px 0px, #c96442 0px 0px 0px 1px'
              : '#30302e 0px 0px 0px 0px, #30302e 0px 0px 0px 1px'
          }}
        >
          {isLastQuestion && allAnswered ? '查看结果' : '下一题'}
        </button>
      </div>
    </div>
  );
}
