"use client";

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from "react";
import { MotionConfig } from "motion/react";
import { dict, type Lang } from "@/lib/content";

type Ctx = { lang: Lang; setLang: (l: Lang) => void };
const LangContext = createContext<Ctx>({ lang: "pt", setLang: () => {} });

/* O idioma vive no localStorage; o servidor sempre renderiza PT e o cliente corrige logo após a hidratação. */
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function readLang(): Lang {
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "pt") return saved;
    return navigator.language.toLowerCase().startsWith("en") ? "en" : "pt";
  } catch {
    return "pt";
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore<Lang>(subscribe, readLang, () => "pt");

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    document.title = dict[lang].meta.title;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    try {
      localStorage.setItem("lang", l);
    } catch {}
    listeners.forEach((cb) => cb());
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

export function useT() {
  return dict[useLang().lang];
}
