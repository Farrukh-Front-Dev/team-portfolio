"use client";
import { TeamMember } from "@/_types";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa";
import { motion } from "motion/react";

type TeamMemberCardProps = {
  member: TeamMember;
  index: number;
};

export default function TeamMemberCard({ member, index }: TeamMemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/10 p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-xl">
        {/* Role Badge */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-medium">
          {member.role}
        </div>

        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-cyan-500/30 group-hover:border-cyan-500/50 transition-all duration-300">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Name & Title */}
        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold text-white mb-1">
            {member.name}
          </h3>
          <p className="text-cyan-400 font-medium">
            {member.title}
          </p>
        </div>

        {/* Bio */}
        <p className="text-gray-300 text-sm leading-relaxed mb-6 text-center">
          {member.bio}
        </p>

        {/* Skills */}
        <div className="mb-6">
          <h4 className="text-white font-semibold mb-3 text-sm">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {member.skills.slice(0, 6).map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs"
              >
                {skill}
              </span>
            ))}
            {member.skills.length > 6 && (
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs">
                +{member.skills.length - 6} more
              </span>
            )}
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-4">
          <Link
            href={member.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaGithub size={20} />
          </Link>
          <Link
            href={member.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <FaLinkedin size={20} />
          </Link>
          <Link
            href={member.contact.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <FaTelegram size={20} />
          </Link>
        </div>

        {/* View Profile Button */}
        <Link
          href={`/team/${member.id}`}
          className="block w-full py-2 px-4 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-center font-medium hover:bg-cyan-500/30 hover:border-cyan-500/50 transition-all duration-300"
        >
          View Full Profile
        </Link>
      </div>
    </motion.div>
  );
}
