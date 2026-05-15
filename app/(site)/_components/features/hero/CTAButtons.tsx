"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { memo } from "react";
import { ArrowRight, Users } from "lucide-react";

interface CTAButtonsProps {
  isVisible: boolean;
  primaryText?: string;
  primaryHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
  delay?: number;
}

/**
 * CTAButtons Component
 * 
 * Displays primary and secondary call-to-action buttons
 * Memoized for performance optimization
 */
const CTAButtons = memo(({ 
  isVisible,
  primaryText = "Meet the Team",
  primaryHref = "#team",
  secondaryText = "View Projects",
  secondaryHref = "#projects",
  delay = 0.9
}: CTAButtonsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className="flex flex-wrap justify-center gap-4 mt-12"
    >
      {/* Primary CTA - Liquid Glass Style */}
      <Link
        href={primaryHref}
        className="group relative px-8 py-4 rounded-2xl
                 bg-white/10 dark:bg-white/10
                 backdrop-blur-2xl
                 border border-white/20 dark:border-white/20
                 text-gray-900 dark:text-white
                 font-bold text-lg
                 shadow-[0_8px_32px_rgba(147,51,234,0.3)]
                 hover:shadow-[0_12px_48px_rgba(147,51,234,0.5)]
                 hover:bg-white/20 dark:hover:bg-white/20
                 hover:border-white/30 dark:hover:border-white/30
                 transform hover:scale-105 hover:-translate-y-1
                 transition-all duration-300
                 overflow-hidden
                 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
        aria-label={primaryText}
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
             aria-hidden="true" />
        
        {/* Glass shine effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent
                      opacity-50" 
             aria-hidden="true" />
        
        <span className="relative z-10 flex items-center gap-2">
          <Users className="w-5 h-5" aria-hidden="true" />
          {primaryText}
        </span>
      </Link>
      
      {/* Secondary CTA - Liquid Glass Style */}
      <Link
        href={secondaryHref}
        className="group relative px-8 py-4 rounded-2xl
                 bg-white/10 dark:bg-white/5
                 backdrop-blur-2xl
                 border border-white/20 dark:border-white/10
                 text-gray-900 dark:text-white
                 font-bold text-lg
                 shadow-[0_8px_32px_rgba(0,0,0,0.1)]
                 hover:shadow-[0_12px_48px_rgba(147,51,234,0.3)]
                 hover:bg-white/20 dark:hover:bg-white/10
                 hover:border-purple-400/50 dark:hover:border-purple-400/30
                 transform hover:scale-105 hover:-translate-y-1
                 transition-all duration-300
                 overflow-hidden
                 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
        aria-label={secondaryText}
      >
        {/* Glass shine effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent
                      opacity-50" 
             aria-hidden="true" />
        
        <span className="relative z-10 flex items-center gap-2">
          {secondaryText}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                      aria-hidden="true" />
        </span>
      </Link>
    </motion.div>
  );
});

CTAButtons.displayName = "CTAButtons";

export default CTAButtons;
