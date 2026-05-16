"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useRevealAnimation } from "@hooks/useRevealAnimation";
import { useI18n } from "@context/I18nContext";
import Link from "next/link";

/**
 * Animation Configuration
 */
const ANIMATION = {
  THRESHOLD: 0.1,
  DURATION: {
    FAST: 0.5,
    NORMAL: 0.8,
    SLOW: 1.2,
  },
  DELAY: {
    TITLE: 0,
    SUBTITLE: 0.2,
    MISSION: 0.4,
    CTA: 0.6,
  },
} as const;

/**
 * HeroSection Component
 * 
 * Senior-level implementation:
 * - Focused and minimal (no stats - moved to Team section)
 * - Clear call-to-action
 * - Beautiful liquid glass design
 * - Smooth animations
 * - Accessible and responsive
 */
export default function HeroSection() {
  const { ref, isVisible } = useRevealAnimation({ 
    threshold: ANIMATION.THRESHOLD 
  });
  const { t } = useI18n();

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background - Only visible in dark mode */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none dark:block hidden" aria-hidden="true">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col items-center text-center space-y-12">
          
          {/* Team Name/Brand */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: ANIMATION.DURATION.NORMAL, 
              delay: ANIMATION.DELAY.TITLE 
            }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black
                       text-gray-900
                       dark:bg-gradient-to-r dark:from-white dark:via-purple-200 dark:to-white
                       dark:bg-clip-text dark:text-transparent
                       tracking-tight leading-[1.1]"
          >
            {t("title", "hero")}
          </motion.h1>

          {/* Team Type/Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: ANIMATION.DURATION.NORMAL, 
              delay: ANIMATION.DELAY.SUBTITLE 
            }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold
                       text-gray-700 dark:text-purple-400
                       tracking-wide"
          >
            {t("subtitle", "hero")}
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: ANIMATION.DURATION.NORMAL, 
              delay: ANIMATION.DELAY.SUBTITLE + 0.1 
            }}
            className="text-xl sm:text-2xl md:text-3xl font-medium
                       text-gray-600 dark:text-gray-300
                       max-w-3xl leading-relaxed"
          >
            {t("tagline", "hero")}
          </motion.p>

          {/* Mission/Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: ANIMATION.DURATION.NORMAL, 
              delay: ANIMATION.DELAY.MISSION 
            }}
            className="text-base sm:text-lg md:text-xl
                       text-gray-600 dark:text-gray-400
                       max-w-3xl leading-relaxed"
          >
            {t("mission", "hero")}
          </motion.p>

          {/* CTA Buttons - Full Liquid Glass Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: ANIMATION.DURATION.NORMAL, 
              delay: ANIMATION.DELAY.CTA 
            }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            {/* Primary CTA */}
            <Link
              href="#team"
              className="group relative px-8 py-4 rounded-2xl
                       bg-white dark:bg-gradient-to-r dark:from-purple-600 dark:to-pink-600
                       backdrop-blur-2xl
                       border border-gray-300 dark:border-transparent
                       text-gray-900 dark:text-white
                       font-bold text-lg
                       shadow-xl shadow-gray-900/20 dark:shadow-purple-500/50
                       hover:shadow-2xl hover:shadow-gray-900/30 dark:hover:shadow-purple-500/70
                       hover:border-gray-400 dark:hover:border-transparent
                       transform hover:scale-105 hover:-translate-y-1
                       transition-all duration-300
                       overflow-hidden"
            >
              {/* Glass Shine Effect - Only Dark Mode */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-50 hidden dark:block" aria-hidden="true" />
              
              <span className="relative z-10 flex items-center gap-2">
                {t("cta.primary", "hero")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              
              {/* Animated Shine on Hover - Only Dark Mode */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                            translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000
                            hidden dark:block" 
                   aria-hidden="true" />
            </Link>

            {/* Secondary CTA */}
            <Link
              href="#projects"
              className="group relative px-8 py-4 rounded-2xl
                       bg-white dark:bg-white/5
                       backdrop-blur-2xl
                       border-2 border-gray-900 dark:border-purple-500
                       text-gray-900 dark:text-purple-400
                       font-bold text-lg
                       shadow-lg shadow-gray-900/10 dark:shadow-purple-500/20
                       hover:bg-gray-50 dark:hover:bg-purple-500/10
                       hover:border-gray-700 dark:hover:border-purple-400
                       hover:shadow-xl hover:shadow-gray-900/20 dark:hover:shadow-purple-500/30
                       transform hover:scale-105 hover:-translate-y-1
                       transition-all duration-300
                       overflow-hidden"
            >
              {/* Glass Shine Effect - Only Dark Mode */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50 hidden dark:block" aria-hidden="true" />
              
              <span className="relative z-10 flex items-center gap-2">
                {t("cta.secondary", "hero")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: ANIMATION.DURATION.SLOW, delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <Link
              href="#team"
              className="flex flex-col items-center gap-2 
                       text-gray-600 dark:text-gray-400
                       hover:text-gray-900 dark:hover:text-purple-400
                       transition-colors duration-300 group"
              aria-label="Scroll to team section"
            >
              <span className="text-sm font-medium">{t("scroll", "hero")}</span>
              <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-2">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-current"
                />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
