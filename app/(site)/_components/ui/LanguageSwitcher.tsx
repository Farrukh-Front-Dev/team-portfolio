"use client";

import { useState, useRef, useEffect, memo } from "react";
import { useI18n, LANGUAGE_NAMES, LANGUAGE_FLAGS, type Locale } from "@context/I18nContext";
import { motion, AnimatePresence } from "motion/react";
import { Globe } from "lucide-react";

/**
 * LanguageSwitcher Component
 * 
 * Senior-level features:
 * - Dropdown menu with smooth animations
 * - Click outside to close
 * - Keyboard navigation (Escape to close)
 * - Accessible (ARIA labels)
 * - Memoized for performance
 * - Glass morphism design
 */
function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleLanguageChange = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  const languages: Locale[] = ["en", "ru", "uz"];

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg
                   bg-white/5 dark:bg-white/5
                   border border-white/10
                   hover:bg-white/10 dark:hover:bg-white/10
                   backdrop-blur-xl
                   transition-all duration-300
                   text-gray-700 dark:text-white"
        aria-label="Change language"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="w-5 h-5" />
        <span className="text-sm font-medium hidden sm:inline">
          {LANGUAGE_FLAGS[locale]} {LANGUAGE_NAMES[locale]}
        </span>
        <span className="text-sm font-medium sm:hidden">
          {LANGUAGE_FLAGS[locale]}
        </span>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 right-0 z-50
                       min-w-[160px] rounded-lg
                       bg-white/10 dark:bg-white/10
                       backdrop-blur-xl
                       border border-white/20
                       shadow-xl
                       overflow-hidden"
            role="menu"
            aria-orientation="vertical"
          >
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`w-full flex items-center gap-3 px-4 py-3
                           text-left text-sm font-medium
                           transition-all duration-200
                           ${
                             locale === lang
                               ? "bg-cyan-500/20 text-cyan-600 dark:text-cyan-400"
                               : "text-gray-700 dark:text-white hover:bg-white/10"
                           }`}
                role="menuitem"
                aria-current={locale === lang ? "true" : undefined}
              >
                <span className="text-xl">{LANGUAGE_FLAGS[lang]}</span>
                <span>{LANGUAGE_NAMES[lang]}</span>
                {locale === lang && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto text-cyan-500"
                  >
                    ✓
                  </motion.span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default memo(LanguageSwitcher);
