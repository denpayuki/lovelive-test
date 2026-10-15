import { useState, useCallback, useEffect, useRef, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../data/questions';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
const ResultPage = lazy(() => import('./ResultPage'));
import { calculateDimensionScores, matchCharacters } from '../utils/matching';
import { characters } from '../data/characters';
import type { MatchResult } from '../types';
import { useLocale } from '../i18n';

const STORAGE_KEY = 'lovelive-test-progress';
type SavedProgress = {
  answers: Record<number, number>;
  currentIndex: number;
  questionOrder: number[];
};

function loadSavedProgress(): SavedProgress | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data && typeof data.answers === 'object' && typeof data.currentIndex === 'number') {
      const savedOrder = data.questionOrder;
      const hasValidOrder = Array.isArray(savedOrder)
        && savedOrder.length === questions.length
        && new Set(savedOrder).size === questions.length
        && savedOrder.every((id: unknown) => questions.some((question) => question.id === id));
      return {
        answers: data.answers,
        currentIndex: data.currentIndex,
        questionOrder: hasValidOrder ? savedOrder : questions.map((question) => question.id),
      };
    }
  } catch { /* ignore corrupt data */ }
  return null;
}

function saveProgress(answers: Record<number, number>, currentIndex: number, questionOrder: number[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, currentIndex, questionOrder }));
}

function shuffledQuestionOrder() {
  const order = questions.map((question) => question.id);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

function clearProgress() {
  localStorage.removeItem(STORAGE_KEY);
}

export default function QuizPage() {
  const navigate = useNavigate();
  const { t } = useLocale();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionOrder, setQuestionOrder] = useState<number[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [results, setResults] = useState<MatchResult[] | null>(null);
  const [started, setStarted] = useState(false);
  const [savedProgress, setSavedProgress] = useState<SavedProgress | null>(null);
  const [confirmingReset, setConfirmingReset] = useState(false);
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
  const currentQuestionId = questionOrder[currentIndex];
  const currentQuestion = questions.find((question) => question.id === currentQuestionId);
  const isLastQuestion = currentIndex === questions.length - 1;
  const canGoNext = currentQuestion !== undefined && answers[currentQuestion.id] !== undefined;
  const allAnswered = answeredCount === questions.length;

  const handleAnswer = useCallback((value: number) => {
    if (!currentQuestion) {
      throw new Error('Current quiz question is missing from its saved order');
    }
    setAnswers((prev) => {
      const next = { ...prev, [currentQuestion.id]: value };
      saveProgress(next, currentIndex, questionOrder);
      return next;
    });
  }, [currentQuestion?.id, currentIndex, questionOrder]);

  const handleNext = useCallback(() => {
    if (isLastQuestion && allAnswered) {
      const scores = calculateDimensionScores(answers);
      const matchResults = matchCharacters(scores, characters);
      clearProgress();
      setResults(matchResults);
    } else if (currentIndex < questions.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      saveProgress(answers, nextIndex, questionOrder);
    }
  }, [isLastQuestion, allAnswered, currentIndex, answers, questionOrder]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      saveProgress(answers, prevIndex, questionOrder);
    }
  }, [currentIndex, answers, questionOrder]);

  const handleRestart = useCallback(() => {
    clearProgress();
    setAnswers({});
    setCurrentIndex(0);
    setQuestionOrder([]);
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
      setQuestionOrder(savedProgress.questionOrder);
      setSavedProgress(null);
      setStarted(true);
    }
  }, [savedProgress]);

  const handleStart = useCallback(() => {
    setQuestionOrder(shuffledQuestionOrder());
    setCurrentIndex(0);
    setAnswers({});
    setStarted(true);
  }, []);

  // Results view
  if (results) {
    return <Suspense><ResultPage results={results} answers={answers} confirmingReset={confirmingReset} onConfirmReset={handleConfirmReset} /></Suspense>;
  }

  // Landing / start screen
  if (!started) {
    const hasSaved = savedProgress !== null;
    const savedCount = hasSaved ? Object.keys(savedProgress.answers).length : 0;
    const savedPercentage = hasSaved ? Math.round((savedCount / questions.length) * 100) : 0;

    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-lg text-center">
          <p className="animate-fade-in-up stagger-1 text-xs tracking-widest text-stone-gray dark:text-warm-silver uppercase mb-6">
            {t('landing.subtitle')}
          </p>
          <h1 className="animate-fade-in-up stagger-2 font-serif-display text-4xl sm:text-5xl text-near-black dark:text-ivory mb-4" style={{ lineHeight: 1.10 }}>
            {t('landing.title')}
          </h1>
          {/* Decorative divider */}
          <div className="animate-fade-in stagger-3 flex items-center justify-center gap-3 my-8">
            <span className="block w-12 h-px bg-border-warm dark:bg-dark-warm" />
            <span className="block w-1.5 h-1.5 rounded-full bg-terracotta" />
            <span className="block w-12 h-px bg-border-warm dark:bg-dark-warm" />
          </div>

          {hasSaved ? (
            <>
              <p className="animate-fade-in-up stagger-3 text-olive-gray dark:text-warm-silver mb-2" style={{ lineHeight: 1.60 }}>
                {t('landing.savedProgress')}
              </p>
              <p className="animate-fade-in-up stagger-3 text-sm text-stone-gray dark:text-warm-silver mb-4">
                {t('landing.savedCount', { done: savedCount, total: questions.length })}
              </p>
              <div className="animate-fade-in stagger-3 max-w-xs mx-auto mb-8">
                <div className="w-full h-2 bg-border-cream dark:bg-dark-warm rounded-full overflow-hidden">
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
                  style={{ boxShadow: '#b83f6d 0px 0px 0px 0px, #b83f6d 0px 0px 0px 1px' }}
                >
                  {savedCount >= questions.length ? t('landing.viewResults') : t('landing.resume')}
                </button>
              </div>
              <div className="animate-fade-in stagger-4 mt-8">
                <button
                  onClick={handleConfirmReset}
                  className={`text-sm transition-colors cursor-pointer py-2 px-3 -mx-3 ${
                    confirmingReset
                      ? 'text-[#b53333] font-medium'
                      : 'text-stone-gray dark:text-warm-silver hover:text-dark-warm dark:hover:text-ivory'
                  }`}
                >
                  {confirmingReset ? t('landing.confirmClear') : t('landing.restart')}
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="animate-fade-in-up stagger-3 text-olive-gray dark:text-warm-silver mb-10 whitespace-pre-line" style={{ lineHeight: 1.60 }}>
                {t('landing.description', { total: questions.length })}
              </p>
              <div className="animate-fade-in-up stagger-4">
                <button
                  onClick={handleStart}
                  className="px-8 py-3 bg-terracotta text-ivory rounded-xl text-base font-medium hover:opacity-90 transition-all cursor-pointer"
                  style={{ boxShadow: '#b83f6d 0px 0px 0px 0px, #b83f6d 0px 0px 0px 1px' }}
                >
                  {t('landing.start')}
                </button>
              </div>
              <div className="animate-fade-in stagger-4 mt-8">
                <button
                  onClick={() => navigate('/characters')}
                  className="text-sm text-stone-gray dark:text-warm-silver hover:text-dark-warm dark:hover:text-ivory transition-colors cursor-pointer py-2 px-3 -mx-3"
                >
                  {t('landing.browseCharacters')}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    throw new Error('Current quiz question is missing from its saved order');
  }

  // Quiz view
  return (
    <div className="min-h-screen flex flex-col px-4 py-8">
      {/* Header */}
      <div className="max-w-xl mx-auto w-full mb-8">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={handleConfirmReset}
            className={`text-sm transition-colors cursor-pointer flex items-center gap-1 py-2 px-3 -ml-3 ${
              confirmingReset
                ? 'text-[#b53333] font-medium'
                : 'text-stone-gray dark:text-warm-silver hover:text-dark-warm dark:hover:text-ivory'
            }`}
          >
            {confirmingReset ? t('quiz.confirmExit') : t('quiz.back')}
          </button>
          <span className="text-sm text-stone-gray dark:text-warm-silver">
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
          className="px-6 py-2.5 text-sm rounded-lg bg-warm-sand dark:bg-dark-warm text-charcoal-warm dark:text-ivory hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          style={{ boxShadow: 'var(--btn-secondary-ring)' }}
        >
          {t('quiz.prev')}
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
              ? '#b83f6d 0px 0px 0px 0px, #b83f6d 0px 0px 0px 1px'
              : 'var(--btn-dark-ring)'
          }}
        >
          {isLastQuestion && allAnswered ? t('quiz.viewResults') : t('quiz.next')}
        </button>
      </div>
    </div>
  );
}
