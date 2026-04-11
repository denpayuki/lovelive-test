import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LocaleProvider } from './i18n';
import { useLocale } from './i18n';
import QuizPage from './components/QuizPage';
import CharacterListPage from './components/CharacterListPage';
import ThemeToggle from './components/ThemeToggle';
import LocaleToggle from './components/LocaleToggle';
import DisclaimerModal from './components/DisclaimerModal';

const GITHUB_URL = 'https://github.com/Sallyn0225/shiny-mbti';

function TopBar() {
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const { t } = useLocale();

  return (
    <>
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        {/* GitHub badge */}
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="h-10 flex items-center gap-1.5 px-3 rounded-full bg-warm-sand dark:bg-dark-surface text-charcoal-warm dark:text-warm-silver hover:opacity-80 transition-colors"
          style={{ boxShadow: 'var(--btn-secondary-ring)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <span className="text-xs font-medium hidden sm:inline">GitHub</span>
        </a>

        {/* Disclaimer button */}
        <button
          onClick={() => setDisclaimerOpen(true)}
          aria-label={t('topbar.about')}
          className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer bg-warm-sand dark:bg-dark-surface text-charcoal-warm dark:text-warm-silver transition-colors hover:opacity-80"
          style={{ boxShadow: 'var(--btn-secondary-ring)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </button>

        {/* Locale toggle */}
        <LocaleToggle />

        {/* Theme toggle */}
        <ThemeToggle />
      </div>

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
          <Routes>
            <Route path="/" element={<QuizPage />} />
            <Route path="/characters" element={<CharacterListPage />} />
          </Routes>
        </BrowserRouter>
      </LocaleProvider>
    </ThemeProvider>
  );
}
