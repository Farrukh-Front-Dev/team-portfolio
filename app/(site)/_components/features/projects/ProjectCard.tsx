"use client";

import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

interface ProjectCardProps {
  project: {
    name: string;
    description: string;
    imageLight: string;
    imageDark?: string;
    link: string;
    demo: string;
    technologies: string[] | {
      frontend: string[];
      backend: string[];
    };
    type?: 'individual' | 'team';
  };
  index: number;
  labels: {
    viewCode: string;
    viewDemo: string;
  };
}

export default function ProjectCard({ project, index, labels }: ProjectCardProps) {
  // Normalize technologies to array
  const technologies = Array.isArray(project.technologies)
    ? project.technologies
    : [...project.technologies.frontend, ...project.technologies.backend];

  return (
    <article
      style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)" }}
      className="relative dark:backdrop-blur-md group rounded-md sm:rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden
                 flex flex-col transition-all duration-500 ease-out
                 hover:scale-[1.02] sm:hover:scale-[1.03] md:hover:scale-105 
                 hover:-translate-y-0.5 sm:hover:-translate-y-1 md:hover:-translate-y-2"
    >
      {/* Project Type Badge */}
      {project.type === 'team' && (
        <div className="absolute top-2 right-2 z-30 px-3 py-1 rounded-full bg-cyan-500/90 backdrop-blur-sm text-white text-xs font-semibold">
          Team Project
        </div>
      )}

      {/* Liquid Glass Background - only dark mode */}
      <div className="absolute inset-0 rounded-md sm:rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden z-0 hidden dark:block">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl 
                       border border-white/30 
                       shadow-xl sm:shadow-2xl transition-all duration-400 
                       group-hover:bg-white/15 group-hover:backdrop-blur-2xl" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-500"
             style={{
               background: "radial-gradient(135% 135% at 50% 0%, rgba(59,130,246,0.15) 0%, rgba(168,85,247,0.1) 50%, transparent 100%)"
             }} />
      </div>

      {/* Light mode background */}
      <div className="absolute inset-0 rounded-md sm:rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden z-0 dark:hidden bg-white" />

      {/* Liquid Shine Effect - only dark mode */}
      <span className="absolute -top-1 -left-2 sm:-left-4 md:-left-8 w-4 h-8 sm:w-8 sm:h-16 md:w-16 md:h-32 
                      bg-white/30 dark:bg-white/20 rounded-full blur-xl sm:blur-2xl 
                      transform rotate-45 scale-150 dark:animate-pulse pointer-events-none z-0 hidden dark:block" />

      {/* Image Preview */}
      <div className="relative h-40 sm:h-44 md:h-48 lg:h-56 overflow-hidden z-10 rounded-t-md sm:rounded-t-lg md:rounded-t-xl lg:rounded-t-2xl">
        <Image
          src={project.imageLight}
          alt={`${project.name} preview`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 33vw"
          className="object-cover object-top block dark:hidden transition-transform duration-500 
                    group-hover:scale-110"
          {...(index < 2 ? { priority: true } : { loading: "lazy" as const })}
        />

        {project.imageDark && (
          <Image
            src={project.imageDark}
            alt={`${project.name} preview`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 33vw"
            className="object-cover object-top hidden dark:block transition-transform duration-500 
                      group-hover:scale-110"
            {...(index < 2 ? { priority: true } : { loading: "lazy" as const })}
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent z-10" />

        {/* Action Buttons Overlay */}
        <div className="absolute inset-0 z-20 flex flex-row items-center justify-center gap-3
                       bg-black/40 backdrop-blur-sm
                       opacity-100 scale-100
                       md:opacity-0 md:scale-95
                       md:group-hover:opacity-100 md:group-hover:scale-100
                       transition-all duration-300 p-2">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={labels.viewCode}
            className="relative group/btn overflow-hidden
                      w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
                      rounded-full
                      flex items-center justify-center
                      transition-all duration-300
                      hover:scale-110 active:scale-95"
          >
            {/* Liquid Glass Button Background - only dark mode */}
            <div className="absolute inset-0 rounded-full overflow-hidden hidden dark:block">
              <div className="absolute inset-0 bg-white/25 dark:bg-white/15 backdrop-blur-xl 
                             border border-white/60 dark:border-white/50 
                             shadow-lg transition-all duration-300 
                             group-hover/btn:bg-white/35 dark:group-hover/btn:bg-white/25" />
              <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                   style={{
                     background: "radial-gradient(circle at center, rgba(59,130,246,0.3) 0%, transparent 70%)"
                   }} />
            </div>

            {/* Light mode button background - white with shadow */}
            <div className="absolute inset-0 rounded-full overflow-hidden dark:hidden bg-white" style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)" }} />
            
            {/* Button Shine - only dark mode */}
            <span className="absolute -top-1 -left-2 w-4 h-8 bg-white/40 rounded-full blur-xl 
                            transform rotate-45 scale-150 dark:animate-pulse pointer-events-none hidden dark:block" />
            
            <FaGithub className="relative z-10 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-gray-700 dark:text-white drop-shadow-sm" />
          </a>

          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={labels.viewDemo}
            className="relative group/btn overflow-hidden
                      w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
                      rounded-full
                      flex items-center justify-center
                      transition-all duration-300
                      hover:scale-110 active:scale-95"
          >
            {/* Liquid Glass Button Background - only dark mode */}
            <div className="absolute inset-0 rounded-full overflow-hidden hidden dark:block">
              <div className="absolute inset-0 bg-white/25 dark:bg-white/15 backdrop-blur-xl 
                             border border-white/60 dark:border-white/50 
                             shadow-lg transition-all duration-300 
                             group-hover/btn:bg-white/35 dark:group-hover/btn:bg-white/25" />
              <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                   style={{
                     background: "radial-gradient(circle at center, rgba(168,85,247,0.3) 0%, transparent 70%)"
                   }} />
            </div>

            {/* Light mode button background - white with shadow */}
            <div className="absolute inset-0 rounded-full overflow-hidden dark:hidden bg-white" style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)" }} />
            
            {/* Button Shine - only dark mode */}
            <span className="absolute -top-1 -left-2 w-4 h-8 bg-white/40 rounded-full blur-xl 
                            transform rotate-45 scale-150 dark:animate-pulse pointer-events-none hidden dark:block" />
            
            <FaExternalLinkAlt className="relative z-10 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-gray-700 dark:text-white drop-shadow-sm" />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-2.5 sm:p-3 md:p-4 lg:p-6 space-y-1 sm:space-y-1.5 md:space-y-2 lg:space-y-3 grow flex flex-col z-10">
        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold 
                      text-gray-900 dark:text-white
                      transition-colors duration-300
                      line-clamp-1">
          {project.name}
        </h3>

        <p className="text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-400 
                     line-clamp-2 sm:line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Technologies Pills */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 sm:pt-2">
          {technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 
                        text-[10px] sm:text-xs md:text-sm font-medium
                        rounded-full
                        bg-gray-200 dark:bg-white/10
                        text-gray-700 dark:text-gray-300
                        border border-gray-300 dark:border-white/20
                        transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 4 && (
            <span className="px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 
                           text-[10px] sm:text-xs md:text-sm font-medium
                           rounded-full
                           bg-gray-200 dark:bg-white/10
                           text-gray-700 dark:text-gray-300
                           border border-gray-300 dark:border-white/20">
              +{technologies.length - 4}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
