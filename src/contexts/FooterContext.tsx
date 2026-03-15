import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type FooterContextValue = {
  onBookDemo?: () => void;
  logoSrc?: string;
};

const defaultValue: FooterContextValue = {};

const FooterContext = createContext<{
  value: FooterContextValue;
  setFooter: (v: FooterContextValue) => void;
}>({
  value: defaultValue,
  setFooter: () => {},
});

export function FooterProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState<FooterContextValue>(defaultValue);
  const setFooter = useCallback((v: FooterContextValue) => setValue(v), []);
  return (
    <FooterContext.Provider value={{ value, setFooter }}>
      {children}
    </FooterContext.Provider>
  );
}

export function useFooter() {
  return useContext(FooterContext);
}
