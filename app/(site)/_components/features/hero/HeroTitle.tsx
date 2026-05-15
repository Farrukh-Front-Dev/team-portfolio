"use client";

import { motion } from "motion/react";
import { memo } from "react";

interface HeroTitleProps {
  title: string;
  isVisible: boolean;
}

/**
 * HeroTitle Component
 * 
 * Displays the main hero title with gradient effect and animation
 * Memoized for performance optimization
 */
const HeroTitle = memo(({ title, isVisible }: HeroTitleProps) => {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black
                 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700
                 dark:from-white dark:via-white dark:to-white
                 bg-clip-text text-transparent
                 tracking-tight leading-none
                 drop-shadow-lg"
      style={{
        filter: 'drop-shadow(0 4px 6px rgba(147, 51, 234, 0.3))'
      }}
      aria-label={`Team name: ${title}`}
    >
      {title}
    </motion.h1>
  );
});

HeroTitle.displayName = "HeroTitle";

export default HeroTitle;
