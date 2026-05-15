"use client";

import { motion } from "motion/react";
import { memo } from "react";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  value: string;
  label: string;
  icon: LucideIcon;
  index: number;
  isVisible: boolean;
  delay?: number;
}

/**
 * StatCard Component
 * 
 * Displays a single statistic card with icon, value, and label
 * Memoized for performance optimization
 */
const StatCard = memo(({ 
  value, 
  label, 
  icon: Icon, 
  index, 
  isVisible,
  delay = 0.7
}: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: delay + index * 0.1 }}
      className="relative group"
      role="article"
      aria-label={`${label}: ${value}`}
    >
      <div className="p-4 sm:p-5 rounded-xl
                    bg-white dark:bg-white/5
                    backdrop-blur-xl
                    border border-gray-200 dark:border-white/10
                    shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                    dark:shadow-2xl dark:shadow-purple-500/10
                    hover:shadow-[0_20px_60px_rgb(147,51,234,0.3)]
                    dark:hover:shadow-purple-500/20
                    hover:border-purple-400 dark:hover:border-purple-500
                    transition-all duration-300
                    hover:scale-105
                    hover:-translate-y-1">
        <Icon 
          className="w-7 h-7 sm:w-8 sm:h-8 mx-auto mb-2 text-purple-600 dark:text-white
                     drop-shadow-lg" 
          aria-hidden="true"
        />
        <div className="text-3xl sm:text-4xl font-black
                      bg-gradient-to-r from-purple-600 to-pink-600
                      dark:from-white dark:to-white
                      bg-clip-text text-transparent
                      mb-1
                      drop-shadow-sm">
          {value}
        </div>
        <div className="text-xs sm:text-sm font-medium
                      text-gray-700 dark:text-white">
          {label}
        </div>
      </div>
    </motion.div>
  );
});

StatCard.displayName = "StatCard";

export default StatCard;
