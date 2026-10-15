import { createContext, useContext, useEffect, useCallback, type ReactNode } from 'react';
import en, { type TranslationKey } from './locales/en';

interface LocaleContextType {
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
}

const LocaleContext = createContext<LocaleContextType>({
  t: (key) => key,
});

export { LocaleContext };

export function LocaleProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = 'en';
  }, []);

  const t = useCallback(
    (key: TranslationKey, vars?: Record<string, string | number>): string => {
      let text: string = en[key];
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          text = text.replaceAll(`{${k}}`, String(v));
        }
      }
      return text;
    },
    [],
  );

  return (
    <LocaleContext.Provider value={{ t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}

export type { TranslationKey };
