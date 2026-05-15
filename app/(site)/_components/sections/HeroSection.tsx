"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { Zap, Rocket, Users } from "lucide-react";
import { teamData } from "@lib/teamData";
import { useRevealAnimation } from "@hooks/useRevealAnimation";
import HeroTitle from "@components/features/hero/HeroTitle";
import AnimatedTagline from "@components/features/hero/AnimatedTagline";
import StatCard from "@components/features/hero/StatCard";
import CTAButtons from "@components/features/hero/CTAButtons";
import ScrollIndicator from "@components/features/hero/ScrollIndicator";

// Animation configuration constants
const ANIMATION_CONFIG = {
  THRESHOLD: 0.2,
  MISSION_DELAY: 0.4,
  STATS_DELAY: 0.6,
  DURATION: 0.8,
} as const;

/**
 * HeroSection Component - Professional Team Portfolio
 * 
 * Architecture:
 * - Modular component structure for maintainability
 * - Memoized data for performance optimization
 * - Type-safe props and configurations
 * - Accessibility-first design (ARIA labels, keyboard navigation)
 * - Responsive design with mobile-first approach
 * 
 * Features:
 * - Gradient animated title
 * - Typing animation for tagline
 * - Interactive stat cards with icons
 * - Dual CTA buttons with hover effects
 * - Scroll indicator for UX guidance
 * 
 * @returns {JSX.Element} Hero section component
 */
export default function HeroSection(): JSX.Element {
  const { ref, isVisible } = useRevealAnimation({ 
    threshold: ANIMATION_CONFIG.THRESHOLD 
  });

  // Memoize stats to prevent recreation on every render
  const stats = useMemo(() => [
    {
      value: teamData.team.experience,
      label: "Years Experience",
      icon: Zap,
    },
    {
      value: teamData.team.projectsCompleted,
      label: "Projects Completed",
      icon: Rocket,
    },
    {
      value: `${teamData.members.length}`,
      label: "Expert Developers",
      icon: Users,
    },
  ], []);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center"
      aria-label="Hero section"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          
          {/* Team Name with Gradient */}
          <HeroTitle 
            title={teamData.team.name} 
            isVisible={isVisible} 
          />

          {/* Animated Tagline */}
          <AnimatedTagline 
            text={teamData.team.tagline} 
            isVisible={isVisible} 
          />

          {/* Mission Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: ANIMATION_CONFIG.DURATION, 
              delay: ANIMATION_CONFIG.MISSION_DELAY 
            }}
            className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-white
                       max-w-3xl mx-auto leading-relaxed
                       drop-shadow-sm"
            role="heading"
            aria-level={3}
          >
            {teamData.team.mission}
          </motion.p>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: ANIMATION_CONFIG.DURATION, 
              delay: ANIMATION_CONFIG.STATS_DELAY 
            }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 max-w-3xl mx-auto mt-10"
            role="region"
            aria-label="Team statistics"
          >
            {stats.map((stat, index) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                label={stat.label}
                icon={stat.icon}
                index={index}
                isVisible={isVisible}
                delay={ANIMATION_CONFIG.STATS_DELAY}
              />
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <CTAButtons isVisible={isVisible} />
        </div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator targetId="team" />
    </section>
  );
}
