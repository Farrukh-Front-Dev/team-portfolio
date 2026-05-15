"use client";
import dynamic from "next/dynamic";
import Sidebar from "@components/features/sidebar/Sidebar";
import { 
  HeroSection, 
  TeamSection, 
  ServicesSection, 
  ProjectsSection, 
  ContactSection, 
  Footer 
} from "@components/sections";
import { useTheme } from "@context/ThemeContext";

// Lazy load PixelBlast component
const PixelBlast = dynamic(() => import("@components/effects/PixelBlast"), {
  loading: () => null,
  ssr: false,
});

export default function Page() {
  const { darkMode } = useTheme();

  return (
    <>
      <Sidebar />

      {/* Global Background - PixelBlast in dark mode */}
      {darkMode && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <PixelBlast
            variant="square"
            pixelSize={4}
            color="#8b5cf6"
            patternScale={2}
            patternDensity={1}
            pixelSizeJitter={0}
            enableRipples
            rippleSpeed={0.4}
            rippleThickness={0.12}
            rippleIntensityScale={1.5}
            liquid={false}
            liquidStrength={0.12}
            liquidRadius={1.2}
            liquidWobbleSpeed={5}
            speed={0.5}
            edgeFade={0.25}
            transparent
          />
        </div>
      )}

      {/* Light mode background - simple white */}
      {!darkMode && (
        <div className="fixed inset-0 z-0 bg-white pointer-events-none" />
      )}

      <main className="relative z-10">
        <HeroSection />
        <TeamSection />
        <ServicesSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
