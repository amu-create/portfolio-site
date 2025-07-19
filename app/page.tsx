"use client";

import Navigation from '@/components/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import AIMLShowcase from '@/components/sections/AIMLShowcase';
import FrontendShowcase from '@/components/sections/FrontendShowcase';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <AIMLShowcase />
      <FrontendShowcase />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </main>
  );
}