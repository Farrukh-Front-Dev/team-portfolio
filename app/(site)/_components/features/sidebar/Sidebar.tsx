"use client";
import { useState, useCallback, useMemo } from "react";
import ToggleButton from "@components/ui/ToggleButton";
import LanguageSwitcher from "@components/ui/LanguageSwitcher";
import SidebarItem from "./SidebarItem";
import useActiveSection from "@hooks/useActiveSection";
import { useI18n } from "@context/I18nContext";

// Team portfolio navigation
const sidebarContent = [
  { id: "hero", label: "Home" },
  { id: "team", label: "Team" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" }
];

export default function Sidebar() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const activeSection = useActiveSection(["hero", "team", "services", "projects", "contact"]);
  const { t } = useI18n();

  const handleSetHoveredId = useCallback((id: string | null) => {
    setHoveredId(id);
  }, []);

  const sidebarItems = useMemo(
    () =>
      sidebarContent.map((item) => (
        <SidebarItem
          key={item.id}
          item={item}
          activeSection={activeSection}
          hoveredId={hoveredId}
          setHoveredId={handleSetHoveredId}
        />
      )),
    [activeSection, hoveredId, handleSetHoveredId]
  );

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <aside className="fixed bottom-0 left-0 right-0 h-20 md:hidden flex justify-center items-center p-2 z-50 pointer-events-auto">
        <div className="flex gap-4 pointer-events-auto bg-gray-100 dark:bg-white/5 dark:backdrop-blur-md rounded-full px-6 py-3 border border-gray-300 dark:border-white/20 dark:shadow-lg shadow-md">
          {sidebarItems}
        </div>
        {/* Controls in Mobile Sidebar */}
        <div className="absolute right-4 flex items-center gap-2">
          <LanguageSwitcher />
          <ToggleButton />
        </div>
      </aside>

      {/* Desktop Right Sidebar */}
      <aside className="hidden md:fixed md:right-0 md:top-0 md:bottom-0 md:flex md:flex-col md:items-center md:w-20 lg:w-24 md:p-4 md:pt-8 text-gray-900 dark:text-white z-50 pointer-events-auto">
        {/* Controls at Top */}
        <div className="flex flex-col gap-3 items-center">
          <LanguageSwitcher />
          <ToggleButton />
        </div>
        
        {/* Navigation Items */}
        <div className="flex flex-col gap-5 lg:gap-7 pointer-events-auto items-center flex-1 justify-center">
          {sidebarItems}
        </div>
      </aside>
    </>
  );
}
