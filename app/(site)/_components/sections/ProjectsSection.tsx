"use client";

import { useState } from "react";
import { teamData } from "@lib/teamData";
import ProjectCard from "../features/projects/ProjectCard";
import { useScrollAnimation } from "@hooks/useScrollAnimation";
import { motion } from "motion/react";

type ProjectFilter = "all" | "team" | "individual";

export default function ProjectsSection() {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const sectionRef = useScrollAnimation({ threshold: 0.05, rootMargin: "0px 0px -100px 0px" });

  // Get all projects
  const allProjects = [
    ...teamData.teamProjects,
    ...teamData.members.flatMap(member => member.projects)
  ];

  // Filter projects
  const filteredProjects = filter === "all" 
    ? allProjects 
    : allProjects.filter(project => project.type === filter);

  const labels = {
    projects: "Projects",
    viewCode: "View Code",
    viewDemo: "View Demo"
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-12 sm:py-16 md:py-24 lg:py-32 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold 
                       mb-4 tracking-tight
                       text-gray-900
                       dark:bg-linear-to-r dark:from-white dark:to-gray-300
                       dark:bg-clip-text dark:text-transparent">
          Our Projects
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Explore our team collaborations and individual contributions
        </p>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex justify-center gap-4 mb-12"
      >
        <button
          onClick={() => setFilter("all")}
          className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
            filter === "all"
              ? "bg-cyan-500 text-white"
              : "bg-white/5 dark:bg-white/5 border border-white/10 text-gray-700 dark:text-gray-300 hover:bg-white/10"
          }`}
        >
          All Projects ({allProjects.length})
        </button>
        <button
          onClick={() => setFilter("team")}
          className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
            filter === "team"
              ? "bg-cyan-500 text-white"
              : "bg-white/5 dark:bg-white/5 border border-white/10 text-gray-700 dark:text-gray-300 hover:bg-white/10"
          }`}
        >
          Team Projects ({teamData.teamProjects.length})
        </button>
        <button
          onClick={() => setFilter("individual")}
          className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
            filter === "individual"
              ? "bg-cyan-500 text-white"
              : "bg-white/5 dark:bg-white/5 border border-white/10 text-gray-700 dark:text-gray-300 hover:bg-white/10"
          }`}
        >
          Individual ({allProjects.filter(p => p.type === "individual").length})
        </button>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:gap-5 lg:gap-8">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProjectCard
              project={project}
              index={index}
              labels={labels}
            />
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No projects found for this filter
          </p>
        </div>
      )}
    </section>
  );
}
