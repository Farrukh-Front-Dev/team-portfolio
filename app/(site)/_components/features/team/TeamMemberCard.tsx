"use client";
import { TeamMember } from "@/_types";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTelegram, FaEnvelope } from "react-icons/fa";
import { Award, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useI18n } from "@context/I18nContext";

type TeamMemberCardProps = {
  member: TeamMember;
  index: number;
};

export default function TeamMemberCard({ member, index }: TeamMemberCardProps) {
  const { t } = useI18n();

  const socialLinks = [
    {
      href: member.contact.github,
      icon: FaGithub,
      label: "GitHub"
    },
    {
      href: member.contact.linkedin,
      icon: FaLinkedin,
      label: "LinkedIn"
    },
    {
      href: member.contact.telegram,
      icon: FaTelegram,
      label: "Telegram"
    },
    {
      href: `mailto:${member.contact.email}`,
      icon: FaEnvelope,
      label: "Email"
    }
  ];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative h-full"
    >
      <div className="relative h-full overflow-hidden rounded-3xl bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 p-8 transition-all duration-500 hover:border-white/20">
        {/* Subtle Hover Overlay */}
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Role Badge */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="absolute top-6 right-6 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white/80 text-xs font-medium"
        >
          {t(`members.${member.id}.role`, "team")}
        </motion.div>

        {/* Profile Image */}
        <div className="flex justify-center mb-8">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative w-36 h-36 md:w-40 md:h-40"
          >
            <div className="absolute inset-0 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20 transition-all duration-500" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/20 group-hover:border-white/30 transition-all duration-500">
              <Image
                src={member.image}
                alt={`${member.name} - ${member.role}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 144px, 160px"
              />
            </div>
          </motion.div>
        </div>

        {/* Name & Title */}
        <div className="text-center mb-6 relative z-10">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {t(`members.${member.id}.name`, "team")}
          </h3>
          <p className="text-white/60 font-medium text-base md:text-lg">
            {t(`members.${member.id}.title`, "team")}
          </p>
        </div>

        {/* Bio */}
        <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 text-center relative z-10 line-clamp-4">
          {t(`members.${member.id}.bio`, "team")}
        </p>

        {/* Experience Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-medium">
            <Award className="w-4 h-4 text-white/60" />
            <span className="text-white font-semibold">{member.experience}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-8 relative z-10">
          <h4 className="text-white/80 font-semibold mb-4 text-xs uppercase tracking-wider text-center">
            {t("labels.skills", "team")}
          </h4>
          <div className="flex flex-wrap gap-2 justify-center">
            {member.skills.slice(0, 8).map((skill) => (
              <motion.span
                key={skill}
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-default"
              >
                {skill}
              </motion.span>
            ))}
            {member.skills.length > 8 && (
              <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold">
                +{member.skills.length - 8}
              </span>
            )}
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-3 mb-6 relative z-10">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <motion.div key={social.label} whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  aria-label={`${member.name} ${social.label}`}
                >
                  <Icon className="w-4 h-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View Profile Button */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            href={`/team/${member.id}`}
            className="group/btn relative flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-white/80 text-center font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            <span>{t("labels.viewProfile", "team")}</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </motion.article>
  );
}
