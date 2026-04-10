import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../data/questions';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
import ResultPage from './ResultPage';
import { calculateDimensionScores, matchCharacters } from '../utils/matching';
import { characters } from '../data/characters';
import type { MatchResult } from '../types';

const STORAGE_KEY = 'shiny-quiz-progress';

const MILESTONES: Record<number, { title: string; subtitle: string }> = {
  10: { title: '好的开始！', subtitle: '你已经完成了最初的 10 道题' },
  20: { title: '已过半！', subtitle: '对你的了解越来越清晰了' },
  30: { title: '就快完成了！', subtitle: '最后几道题，加油' },
};

function loadSavedProgress(): { answers: Record<number, number>; currentIndex: number } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data && typeof data.answers === 'object' && typeof data.currentIndex === 'number') {
      return data;
    }
  } catch { /* ignore corrupt data */ }
  return null;
}

function saveProgress(answers: Record<number, number>, currentIndex: number) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, currentIndex }));
}

function clearProgress() {
  localStorage.removeItem(STORAGE_KEY);
}

export default function QuizPage() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [results, setResults] = useState<MatchResult[] | null>(null);
  const [started, setStarted] = useState(false);
  const [savedProgress, setSavedProgress] = useState<{ answers: Record<number, number>; currentIndex: number } | null>(null);
  const [confirmingReset, setConfirmingReset] = useState(false);
  const [showMilestone, setShowMilestone] = useState<number | null>(null);
  const confirmTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load saved progress on mount
  useEffect(() => {
    const saved = loadSavedProgress();
    if (saved && Object.keys(saved.answers).length > 0) {
      setSavedProgress(saved);
    }
  }, []);

  // Cleanup confirm timer
  useEffect(() => {
    return () => {
      if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current);
    };
  }, []);

  const answeredCount = Object.keys(answers).length;
  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const canGoNext = answers[currentQuestion?.id] !== undefined;
  const allAnswered = answeredCount === questions.length;

  const handleAnswer = useCallback((value: number) => {
    setAnswers((prev) => {
      const next = { ...prev, [currentQuestion.id]: value };
      saveProgress(next, currentIndex);
      return next;
    });
  }, [currentQuestion?.id, currentIndex]);

  const handleNext = useCallback(() => {
    if (isLastQuestion && allAnswered) {
      const scores = calculateDimensionScores(answers);
      const matchResults = matchCharacters(scores, characters);
      clearProgress();
      setResults(matchResults);
    } else if (currentIndex < questions.length - 1) {
      const nextIndex = currentIndex + 1;
      // Check if we just crossed a milestone
      if (MILESTONES[nextIndex] && !showMilestone) {
        setShowMilestone(nextIndex);
      } else {
        setCurrentIndex(nextIndex);
        saveProgress(answers, nextIndex);
      }
    }
  }, [isLastQuestion, allAnswered, currentIndex, answers, showMilestone]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      saveProgress(answers, prevIndex);
    }
  }, [currentIndex, answers]);

  const handleRestart = useCallback(() => {
    clearProgress();
    setAnswers({});
    setCurrentIndex(0);
    setResults(null);
    setStarted(false);
    setSavedProgress(null);
    setConfirmingReset(false);
  }, []);

  const handleConfirmReset = useCallback(() => {
    if (confirmingReset) {
      handleRestart();
    } else {
      setConfirmingReset(true);
      confirmTimerRef.current = setTimeout(() => setConfirmingReset(false), 2000);
    }
  }, [confirmingReset, handleRestart]);

  const handleResume = useCallback(() => {
    if (savedProgress) {
      setAnswers(savedProgress.answers);
      setCurrentIndex(savedProgress.currentIndex);
      setSavedProgress(null);
      setStarted(true);
    }
  }, [savedProgress]);

  // Results view
  if (results) {
    return <ResultPage results={results} answers={answers} confirmingReset={confirmingReset} onConfirmReset={handleConfirmReset} />;
  }

  // Landing / start screen
  if (!started) {
    const hasSaved = savedProgress !== null;
    const savedCount = hasSaved ? Object.keys(savedProgress.answers).length : 0;
    const savedPercentage = hasSaved ? Math.round((savedCount / questions.length) * 100) : 0;

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

          {hasSaved ? (
            <>
              <p className="animate-fade-in-up stagger-3 text-olive-gray mb-2" style={{ lineHeight: 1.60 }}>
                你有一次未完成的测试
              </p>
              <p className="animate-fade-in-up stagger-3 text-sm text-stone-gray mb-4">
                已完成 {savedCount}/{questions.length} 题
              </p>
              <div className="animate-fade-in stagger-3 max-w-xs mx-auto mb-8">
                <div className="w-full h-2 bg-border-cream rounded-full overflow-hidden">
                  <div
                    className="h-full bg-terracotta rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${savedPercentage}%` }}
                  />
                </div>
              </div>
              <div className="animate-fade-in-up stagger-4">
                <button
                  onClick={handleResume}
                  className="px-8 py-3 bg-terracotta text-ivory rounded-xl text-base font-medium hover:opacity-90 transition-all cursor-pointer"
                  style={{ boxShadow: '#c96442 0px 0px 0px 0px, #c96442 0px 0px 0px 1px' }}
                >
                  {savedCount >= questions.length ? '查看结果' : '继续测试'}
                </button>
              </div>
              <div className="animate-fade-in stagger-4 mt-8">
                <button
                  onClick={handleConfirmReset}
                  className={`text-sm transition-colors cursor-pointer ${
                    confirmingReset
                      ? 'text-[#b53333] font-medium'
                      : 'text-stone-gray hover:text-dark-warm'
                  }`}
                >
                  {confirmingReset ? '确认清除？' : '重新开始 →'}
                </button>
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    );
  }

  // Milestone interstitial
  if (showMilestone !== null) {
    const milestone = MILESTONES[showMilestone];
    const milestonePercentage = Math.round((showMilestone / questions.length) * 100);
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-md text-center">
          <div className="animate-scale-in">
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="block w-8 h-px bg-border-warm" />
              <span className="block w-2 h-2 rounded-full bg-terracotta" />
              <span className="block w-8 h-px bg-border-warm" />
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl text-near-black mb-3" style={{ lineHeight: 1.20 }}>
              {milestone.title}
            </h2>
            <p className="text-olive-gray mb-6" style={{ lineHeight: 1.60 }}>
              {milestone.subtitle}
            </p>
            <div className="max-w-xs mx-auto mb-3">
              <div className="w-full h-2 bg-border-cream rounded-full overflow-hidden">
                <div
                  className="h-full bg-terracotta rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${milestonePercentage}%` }}
                />
              </div>
            </div>
            <p className="text-sm text-stone-gray mb-8">
              {showMilestone}/{questions.length} 题
            </p>
          </div>
          <div className="animate-fade-in-up stagger-3">
            <button
              onClick={() => {
                setCurrentIndex(showMilestone);
                saveProgress(answers, showMilestone);
                setShowMilestone(null);
              }}
              className="px-8 py-3 bg-terracotta text-ivory rounded-xl text-base font-medium hover:opacity-90 transition-all cursor-pointer"
              style={{ boxShadow: '#c96442 0px 0px 0px 0px, #c96442 0px 0px 0px 1px' }}
            >
              继续答题
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
            onClick={handleConfirmReset}
            className={`text-sm transition-colors cursor-pointer flex items-center gap-1 ${
              confirmingReset
                ? 'text-[#b53333] font-medium'
                : 'text-stone-gray hover:text-dark-warm'
            }`}
          >
            {confirmingReset ? '确认退出？' : '← 返回首页'}
          </button>
          <span className="text-sm text-stone-gray">
            {answeredCount}/{questions.length}
          </span>
        </div>
        <ProgressBar current={answeredCount} total={questions.length} />
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center">
        <div key={currentIndex} className="animate-slide-in">
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
