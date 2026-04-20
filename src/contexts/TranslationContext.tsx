"use client";
import { createContext, useContext, useEffect, useState } from "react";
import enStrings from "../locales/en.json";

type Strings = Record<string, string>;

interface TranslationCtx {
  t: (key: string) => string;
  tArr: (key: string) => string[];
  lang: string;
}

const Ctx = createContext<TranslationCtx>({
  t: (key) => (enStrings as Strings)[key] ?? key,
  tArr: (key) => ((enStrings as Strings)[key] ?? "").split(","),
  lang: "en",
});

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [strings, setStrings] = useState<Strings>(enStrings as Strings);
  const [lang, setLang] = useState("en");

  async function loadLang(l: string) {
    if (l === "en") {
      setStrings(enStrings as Strings);
      setLang("en");
    } else {
      try {
        const mod = await import(`../locales/${l}.json`);
        setStrings(mod.default as Strings);
        setLang(l);
      } catch {
        // ar.json not generated yet — fall back to English
        setStrings(enStrings as Strings);
        setLang("en");
      }
    }
  }

  useEffect(() => {
    const saved = localStorage.getItem("lv_lang") ?? "en";
    loadLang(saved);

    const handler = () => {
      const l = localStorage.getItem("lv_lang") ?? "en";
      loadLang(l);
    };
    window.addEventListener("lv_lang_change", handler);
    return () => window.removeEventListener("lv_lang_change", handler);
  }, []);

  function t(key: string): string {
    return strings[key] ?? (enStrings as Strings)[key] ?? key;
  }

  function tArr(key: string): string[] {
    const val = t(key);
    return val ? val.split(",") : [];
  }

  return <Ctx.Provider value={{ t, tArr, lang }}>{children}</Ctx.Provider>;
}

export function useT() {
  const { t, tArr, lang } = useContext(Ctx);
  return { t, tArr, lang };
}
