import { createContext, useContext, useEffect, useCallback, useState, type ReactNode } from 'react';
import en, { type TranslationKey } from './locales/en';
import ru from './locales/ru';

export type Locale = 'en' | 'ru';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: 'en',
  setLocale: () => {},
  t: (key) => key,
});

export { LocaleContext };

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const savedLocale = localStorage.getItem('lovelive-test-locale');
    return savedLocale === 'ru' ? 'ru' : 'en';
  });

  const setLocale = useCallback((nextLocale: Locale) => {
    localStorage.setItem('lovelive-test-locale', nextLocale);
    setLocaleState(nextLocale);
  }, []);

  const t = useCallback(
    (key: TranslationKey, vars?: Record<string, string | number>): string => {
      let text: string = locale === 'ru' ? ru[key] : en[key];
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          text = text.replaceAll(`{${k}}`, String(v));
        }
      }
      return text;
    },
    [locale],
  );

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = t('landing.title');
  }, [locale, t]);

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
