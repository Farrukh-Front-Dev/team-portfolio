"use client";
import { motion } from "motion/react";
import TeamMemberCard from "@components/features/team/TeamMemberCard";
import { teamData } from "@lib/teamData";
import { useRevealAnimation } from "@hooks/useRevealAnimation";
import { useI18n } from "@context/I18nContext";
import { Clock, Rocket, Users, Code2, Server, Wrench } from "lucide-react";

export default function TeamSection() {
  const { ref, isVisible } = useRevealAnimation({ threshold: 0.2 });
  const { t } = useI18n();

  const stats = [
    {
      value: teamData.team.experience,
      label: t("stats.experience", "team"),
      icon: Clock
    },
    {
      value: teamData.team.projectsCompleted,
      label: t("stats.projects", "team"),
      icon: Rocket
    },
    {
      value: teamData.teamProjects.length.toString(),
      label: t("stats.teamProjects", "team"),
      icon: Users
    }
  ];

  const techCategories = [
    {
      title: t("techStack.frontend", "team"),
      items: teamData.team.technologies.frontend,
      icon: Code2
    },
    {
      title: t("techStack.backend", "team"),
      items: teamData.team.technologies.backend,
      icon: Server
    },
    {
      title: t("techStack.tools", "team"),
      items: teamData.team.technologies.tools,
      icon: Wrench
    }
  ];

  return (
    <section 
      ref={ref}
      id="team" 
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8"
      aria-labelledby="team-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isVisible ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/10"
          >
            <Users className="w-4 h-4 text-white/60" />
            <span className="text-white/80 font-medium text-sm">
              {t("badge", "team")}
            </span>
          </motion.div>
          
          <h2 
            id="team-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
          >
            {t("heading", "team")}
          </h2>
          
          <p className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {t("subtitle", "team")}
          </p>
        </motion.div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-16"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden text-center p-8 rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <Icon className="w-8 h-8 mx-auto mb-4 text-white/40 group-hover:text-white/60 transition-colors" />
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-sm md:text-base font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Team Members */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-20">
          {teamData.members.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} index={index} />
          ))}
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t("techStack.title", "team")}
            </h3>
            <p className="text-white/60 max-w-2xl mx-auto">
              {t("techStack.description", "team")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {techCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                  className="group relative overflow-hidden p-8 rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-center gap-2 mb-6">
                      <Icon className="w-5 h-5 text-white/60" />
                      <h4 className="text-white font-bold text-lg">
                        {category.title}
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {category.items.map((tech) => (
                        <motion.span
                          key={tech}
                          whileHover={{ scale: 1.05 }}
                          className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-default"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
