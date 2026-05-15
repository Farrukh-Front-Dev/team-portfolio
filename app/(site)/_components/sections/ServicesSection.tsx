"use client";
import { motion } from "motion/react";
import { FaCode, FaServer, FaPlug } from "react-icons/fa";
import { MdOutlineWebAsset } from "react-icons/md";
import { teamData } from "@lib/teamData";

const iconMap: Record<string, React.ReactNode> = {
  code: <FaCode size={32} />,
  layout: <MdOutlineWebAsset size={32} />,
  server: <FaServer size={32} />,
  plug: <FaPlug size={32} />,
};

export default function ServicesSection() {
  return (
    <section id="services" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Services
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            We offer comprehensive web development services from frontend to backend
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamData.services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/10 p-8 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-xl">
                {/* Icon */}
                <div className="mb-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                  {iconMap[service.icon]}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3 text-sm">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Deliverables */}
                <div>
                  <h4 className="text-white font-semibold mb-3 text-sm">
                    What You Get
                  </h4>
                  <ul className="space-y-2">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start text-gray-300 text-sm"
                      >
                        <span className="text-cyan-400 mr-2">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
