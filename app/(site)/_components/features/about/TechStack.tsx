import { SkillGroup } from "@content/skills";

type Props = {
  groups?: SkillGroup[];
};

export default function TechStack({ groups }: Props) {
  if (!groups?.length) return null;

  return (
    <section className="mb-16 sm:mb-20 md:mb-24">
      <h3 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 md:mb-10 animate-fadeInUp animation-delay-200">Skills</h3>

      <div className="space-y-8 sm:space-y-10">
        {groups.map((group, groupIndex) => (
          <div key={group.title} className="animate-fadeInUp" style={{ animationDelay: `${200 + (groupIndex + 1) * 100}ms` }}>
            <h4 className="mb-3 sm:mb-4 font-medium text-sm sm:text-base text-gray-700 dark:text-gray-300 animate-fadeInUp" style={{ animationDelay: `${200 + (groupIndex + 1) * 100}ms` }}>
              {group.title}
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {group.items.map((item, itemIndex) => (
                <div
                  key={item.name}
                  className="relative p-3 sm:p-4 rounded-xl flex flex-col items-center gap-2
                             group transition-all duration-400 ease-out
                             hover:scale-105 hover:-translate-y-3 overflow-hidden
                             animate-fadeInUp will-change-transform"
                  style={{ 
                    animationDelay: `${200 + (groupIndex + 1) * 100 + itemIndex * 50}ms`,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)"
                  }}
                >
                  {/* Base + Gradient + Glow - only dark mode */}
                  <div className="absolute inset-0 rounded-xl overflow-hidden hidden dark:block">
                    <div 
                      className="absolute inset-0 transition-all duration-400"
                      style={{
                        background: "rgba(255, 255, 255, 0.20)",
                        backdropFilter: "blur(48px)",
                        WebkitBackdropFilter: "blur(48px)",
                        border: "1px solid rgba(255, 255, 255, 0.4)",
                        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)"
                      }}
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-700"
                      style={{
                        background: "radial-gradient(135% 135% at 50% 0%, rgba(59,130,246,0.15) 0%, rgba(168,85,247,0.1) 50%, transparent 100%)"
                      }}
                    />
                  </div>

                  {/* Light mode - simple background */}
                  <div className="absolute inset-0 rounded-xl overflow-hidden dark:hidden">
                    <div className="absolute inset-0 bg-white transition-all duration-400" />
                  </div>

                  {/* Content */}
                  <div className="text-2xl sm:text-3xl relative z-10 text-gray-700 dark:text-gray-200 transition-colors duration-700">
                    {item.icon}
                  </div>
                  <span className="text-xs sm:text-sm font-medium relative z-10 text-gray-900 dark:text-white text-center transition-colors duration-700">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
