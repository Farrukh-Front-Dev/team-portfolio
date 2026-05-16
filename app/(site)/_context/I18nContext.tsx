"use client";

import { 
  createContext, 
  useContext, 
  useState, 
  useEffect,
  ReactNode, 
  useMemo, 
  useCallback 
} from "react";

// Import all translations statically
import commonEn from "@content/translations/en/common.json";
import commonRu from "@content/translations/ru/common.json";
import commonUz from "@content/translations/uz/common.json";

import heroEn from "@content/translations/en/hero.json";
import heroRu from "@content/translations/ru/hero.json";
import heroUz from "@content/translations/uz/hero.json";

import aboutEn from "@content/translations/en/about.json";
import aboutRu from "@content/translations/ru/about.json";
import aboutUz from "@content/translations/uz/about.json";

import projectsEn from "@content/translations/en/projects.json";
import projectsRu from "@content/translations/ru/projects.json";
import projectsUz from "@content/translations/uz/projects.json";

import contactEn from "@content/translations/en/contact.json";
import contactRu from "@content/translations/ru/contact.json";
import contactUz from "@content/translations/uz/contact.json";

import teamEn from "@content/translations/en/team.json";
import teamRu from "@content/translations/ru/team.json";
import teamUz from "@content/translations/uz/team.json";

import servicesEn from "@content/translations/en/services.json";
import servicesRu from "@content/translations/ru/services.json";
import servicesUz from "@content/translations/uz/services.json";

/**
 * Supported languages
 */
export type Locale = "en" | "ru" | "uz";

/**
 * I18n Context Type
 */
interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, section?: string) => string;
}

/**
 * Translation registry - all translations loaded at build time
 */
const translations: Record<Locale, Record<string, Record<string, unknown>>> = {
  en: {
    common: commonEn,
    hero: heroEn,
    about: aboutEn,
    projects: projectsEn,
    contact: contactEn,
    team: teamEn,
    services: servicesEn,
  },
  ru: {
    common: commonRu,
    hero: heroRu,
    about: aboutRu,
    projects: projectsRu,
    contact: contactRu,
    team: teamRu,
    services: servicesRu,
  },
  uz: {
    common: commonUz,
    hero: heroUz,
    about: aboutUz,
    projects: projectsUz,
    contact: contactUz,
    team: teamUz,
    services: servicesUz,
  },
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

/**
 * I18nProvider Component
 * 
 * Senior-level features:
 * - Static imports for better performance
 * - LocalStorage persistence
 * - Type-safe translation keys
 * - Performance optimized with useMemo/useCallback
 */
export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    // Initialize from localStorage if available (client-side only)
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("locale") as Locale | null;
      if (saved && ["en", "ru", "uz"].includes(saved)) {
        return saved;
      }
    }
    return "en";
  });

  // Update localStorage when locale changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", locale);
    }
  }, [locale]);

  /**
   * Set locale with validation
   */
  const setLocale = useCallback((newLocale: Locale) => {
    const supportedLocales: Locale[] = ["en", "ru", "uz"];
    if (supportedLocales.includes(newLocale)) {
      setLocaleState(newLocale);
    }
  }, []);

  /**
   * Translation function
   * 
   * @param key - Translation key (e.g., "title", "description")
   * @param section - Section name (e.g., "hero", "about")
   * @returns Translated string
   */
  const t = useCallback((key: string, section: string = "common"): string => {
    try {
      const sectionTranslations = translations[locale]?.[section];
      
      if (!sectionTranslations) {
        console.warn(`Translation section not found: ${locale}/${section}`);
        return key;
      }

      // Get nested value using dot notation (e.g., "cta.primary")
      const value = key.split(".").reduce((obj: Record<string, unknown> | unknown, k: string) => {
        if (obj && typeof obj === "object" && k in obj) {
          return (obj as Record<string, unknown>)[k];
        }
        return undefined;
      }, sectionTranslations);
      
      return typeof value === "string" ? value : key;
    } catch (err) {
      console.error("Translation error:", err);
      return key;
    }
  }, [locale]);

  // Memoize context value
  const contextValue = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t]
  );

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
}

/**
 * useI18n Hook
 * 
 * Usage:
 * const { locale, setLocale, t } = useI18n();
 * const title = t("title", "hero");
 */
export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}

/**
 * Language names for UI
 */
export const LANGUAGE_NAMES: Record<Locale, string> = {
  en: "English",
  ru: "Русский",
  uz: "O'zbekcha",
};

/**
 * Language flags (emoji)
 */
export const LANGUAGE_FLAGS: Record<Locale, string> = {
  en: "🇬🇧",
  ru: "🇷🇺",
  uz: "🇺🇿",
};
