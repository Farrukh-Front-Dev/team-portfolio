"use client";

import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { memo } from "react";

interface ScrollIndicatorProps {
  targetId?: string;
  ariaLabel?: string;
}

/**
 * ScrollIndicator Component
 * 
 * Displays an animated scroll indicator at the bottom of hero section
 * Memoized for performance optimization
 */
const ScrollIndicator = memo(({ 
  targetId = "team",
  ariaLabel = "Scroll to next section"
}: ScrollIndicatorProps) => {
  const handleClick = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.2 }}
      onClick={handleClick}
      className="absolute bottom-8 left-1/2 -translate-x-1/2
                 text-gray-600 dark:text-gray-400
                 hover:text-purple-600 dark:hover:text-purple-400
                 transition-colors duration-300
                 focus:outline-none focus:ring-4 focus:ring-purple-500/50
                 rounded-full p-2"
      aria-label={ariaLabel}
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <ChevronDown className="w-8 h-8" aria-hidden="true" />
      </motion.div>
    </motion.button>
  );
});

ScrollIndicator.displayName = "ScrollIndicator";

export default ScrollIndicator;
