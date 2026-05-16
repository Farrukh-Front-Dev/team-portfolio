/**
 * I18n Utility Functions
 * 
 * Senior-level utilities for translation management
 */

import type { Locale } from "@context/I18nContext";

/**
 * Load translation file dynamically
 * 
 * @param locale - Language code (en, ru, uz)
 * @param section - Section name (hero, about, etc.)
 * @returns Translation object
 */
export async function loadTranslation(
  locale: Locale,
  section: string
): Promise<Record<string, unknown>> {
  try {
    const translation = await import(
      `@content/translations/${locale}/${section}.json`
    );
    return translation.default || translation;
  } catch (error) {
    console.warn(`Translation file not found: ${locale}/${section}.json`);
    return {};
  }
}

/**
 * Get nested translation value using dot notation
 * 
 * @param obj - Translation object
 * @param path - Dot notation path (e.g., "hero.title")
 * @returns Translation value or path as fallback
 */
export function getNestedValue(
  obj: Record<string, unknown>,
  path: string
): string {
  const value = path.split(".").reduce((acc: any, key) => acc?.[key], obj);
  return typeof value === "string" ? value : path;
}

/**
 * Interpolate variables in translation string
 * 
 * @param template - Translation string with {{variable}} placeholders
 * @param variables - Object with variable values
 * @returns Interpolated string
 * 
 * @example
 * interpolate("Hello {{name}}!", { name: "John" }) // "Hello John!"
 */
export function interpolate(
  template: string,
  variables: Record<string, string | number>
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    return String(variables[key] ?? `{{${key}}}`);
  });
}

/**
 * Format number based on locale
 * 
 * @param value - Number to format
 * @param locale - Language code
 * @returns Formatted number string
 */
export function formatNumber(value: number, locale: Locale): string {
  const localeMap: Record<Locale, string> = {
    en: "en-US",
    ru: "ru-RU",
    uz: "uz-UZ",
  };

  return new Intl.NumberFormat(localeMap[locale]).format(value);
}

/**
 * Format date based on locale
 * 
 * @param date - Date to format
 * @param locale - Language code
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  locale: Locale,
  options?: Intl.DateTimeFormatOptions
): string {
  const localeMap: Record<Locale, string> = {
    en: "en-US",
    ru: "ru-RU",
    uz: "uz-UZ",
  };

  const dateObj = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat(localeMap[locale], options).format(dateObj);
}

/**
 * Get plural form based on count and locale
 * 
 * @param count - Number for pluralization
 * @param locale - Language code
 * @param forms - Object with plural forms (zero, one, few, many, other)
 * @returns Correct plural form
 * 
 * @example
 * pluralize(1, "en", { one: "item", other: "items" }) // "item"
 * pluralize(5, "en", { one: "item", other: "items" }) // "items"
 */
export function pluralize(
  count: number,
  locale: Locale,
  forms: {
    zero?: string;
    one?: string;
    few?: string;
    many?: string;
    other: string;
  }
): string {
  const localeMap: Record<Locale, string> = {
    en: "en-US",
    ru: "ru-RU",
    uz: "uz-UZ",
  };

  const rules = new Intl.PluralRules(localeMap[locale]);
  const rule = rules.select(count);

  return forms[rule as keyof typeof forms] || forms.other;
}

/**
 * Validate locale
 * 
 * @param locale - Language code to validate
 * @returns True if valid locale
 */
export function isValidLocale(locale: string): locale is Locale {
  return ["en", "ru", "uz"].includes(locale);
}

/**
 * Get browser locale
 * 
 * @returns Browser locale or default "en"
 */
export function getBrowserLocale(): Locale {
  if (typeof window === "undefined") return "en";

  const browserLang = navigator.language.split("-")[0];
  return isValidLocale(browserLang) ? browserLang : "en";
}

/**
 * Translation cache for performance
 */
export class TranslationCache {
  private cache = new Map<string, Record<string, unknown>>();

  get(key: string): Record<string, unknown> | undefined {
    return this.cache.get(key);
  }

  set(key: string, value: Record<string, unknown>): void {
    this.cache.set(key, value);
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}
