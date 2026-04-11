import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import zh, { type TranslationKey } from './locales/zh';
import en from './locales/en';
import ja from './locales/ja';

export type Locale = 'zh' | 'en' | 'ja';

const messages: Record<Locale, Record<TranslationKey, string>> = { zh, en, ja };

const STORAGE_KEY = 'shiny-quiz-locale';

function detectLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'zh' || saved === 'en' || saved === 'ja') return saved;
  } catch { /* restricted */ }

  const lang = navigator.language.toLowerCase();
  if (lang.startsWith('ja')) return 'ja';
  if (lang.startsWith('zh')) return 'zh';
  return 'en';
}

interface LocaleContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: 'zh',
  setLocale: () => {},
  t: (key) => key,
});

export { LocaleContext };

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : locale;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => setLocaleState(l), []);

  const t = useCallback(
    (key: TranslationKey, vars?: Record<string, string | number>): string => {
      let text = messages[locale][key] ?? messages.zh[key] ?? key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          text = text.replaceAll(`{${k}}`, String(v));
        }
      }
      return text;
    },
    [locale],
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}

export type { TranslationKey };
