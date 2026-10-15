import { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LocaleProvider } from './i18n';
import { useLocale } from './i18n';
import QuizPage from './components/QuizPage';
const CharacterListPage = lazy(() => import('./components/CharacterListPage'));
import ThemeToggle from './components/ThemeToggle';
import DisclaimerModal from './components/DisclaimerModal';

function TopBar() {
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const { t } = useLocale();

  return (
    <>
      <nav aria-label="Site navigation" className="fixed top-4 right-4 z-50 flex items-center gap-2">
        {/* Disclaimer button */}
        <button
          onClick={() => setDisclaimerOpen(true)}
          aria-label={t('topbar.about')}
          className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer bg-warm-sand dark:bg-dark-surface text-charcoal-warm dark:text-warm-silver transition-colors hover:opacity-80"
          style={{ boxShadow: 'var(--btn-secondary-ring)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </button>

        {/* Theme toggle */}
        <ThemeToggle />
      </nav>

      <DisclaimerModal open={disclaimerOpen} onClose={() => setDisclaimerOpen(false)} />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <BrowserRouter>
          <TopBar />
          <main>
            <Routes>
              <Route path="/" element={<QuizPage />} />
              <Route path="/characters" element={<Suspense><CharacterListPage /></Suspense>} />
            </Routes>
          </main>
        </BrowserRouter>
      </LocaleProvider>
    </ThemeProvider>
  );
}
