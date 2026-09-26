import React from 'react';
import Navbar from '../components/Navbar';
import FloatingActionButtons from '../components/FloatingActionButtons';
import VideoBackground from '../components/VideoBackground';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import ServicesSection from '../components/ServicesSection';
import HowIThinkSection from '../components/HowIThinkSection';
import ProjectsSection from '../components/ProjectsSection';
import ExperienceSection from '../components/ExperienceSection';
import EducationSection from '../components/EducationSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Portfolio: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full bg-transparent font-sans selection:bg-orange-500/30">
      <Navbar />
      <FloatingActionButtons />
      <VideoBackground />

      <main className="relative z-10 flex flex-col items-center w-full pt-16">
        <HeroSection />
        <AboutSection />
        <HowIThinkSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <ServicesSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
