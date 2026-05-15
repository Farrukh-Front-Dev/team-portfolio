"use client";
import { motion } from "motion/react";
import TeamMemberCard from "@components/features/team/TeamMemberCard";
import { teamData } from "@lib/teamData";
import { useRevealAnimation } from "@hooks/useRevealAnimation";

export default function TeamSection() {
  const { ref, isVisible } = useRevealAnimation({ threshold: 0.2 });

  return (
    <section 
      ref={ref as any}
      id="team" 
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Meet Our Team
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            {teamData.team.description}
          </p>
        </motion.div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-4xl font-bold text-cyan-400 mb-2">
              {teamData.team.experience}
            </div>
            <div className="text-gray-300">Combined Experience</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-4xl font-bold text-cyan-400 mb-2">
              {teamData.team.projectsCompleted}
            </div>
            <div className="text-gray-300">Projects Completed</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-4xl font-bold text-cyan-400 mb-2">
              {teamData.teamProjects.length}
            </div>
            <div className="text-gray-300">Team Projects</div>
          </div>
        </motion.div>

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Our Tech Stack
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Frontend */}
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <h4 className="text-cyan-400 font-semibold mb-4 text-center">
                Frontend
              </h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {teamData.team.technologies.frontend.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <h4 className="text-cyan-400 font-semibold mb-4 text-center">
                Backend
              </h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {teamData.team.technologies.backend.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <h4 className="text-cyan-400 font-semibold mb-4 text-center">
                Tools
              </h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {teamData.team.technologies.tools.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
