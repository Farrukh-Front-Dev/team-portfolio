"use client";

import { motion } from "motion/react";
import { useEffect, useState, memo } from "react";

interface AnimatedTaglineProps {
  text: string;
  isVisible: boolean;
  typingSpeed?: number;
}

/**
 * AnimatedTagline Component
 * 
 * Displays tagline with typing animation effect
 * Memoized for performance optimization
 */
const AnimatedTagline = memo(({ 
  text, 
  isVisible, 
  typingSpeed = 50 
}: AnimatedTaglineProps) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!isVisible) return;
    
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [isVisible, text, typingSpeed]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="min-h-[60px] flex items-center justify-center"
      role="heading"
      aria-level={2}
      aria-label={`Tagline: ${text}`}
    >
      <p className="text-2xl sm:text-3xl md:text-4xl font-semibold
                   text-gray-800 dark:text-white
                   drop-shadow-md">
        {displayedText}
        <span className="animate-pulse text-purple-600 dark:text-white" aria-hidden="true">|</span>
      </p>
    </motion.div>
  );
});

AnimatedTagline.displayName = "AnimatedTagline";

export default AnimatedTagline;
