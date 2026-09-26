import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Brain, Code, Database, Layout, Cloud, BarChart, Server, Bot, Wrench, Film, FileSpreadsheet, LucideIcon } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';

// Helper to get an icon and distinct color based on skill name
const getSkillStyle = (skill: string): { icon: LucideIcon; color: string } => {
  const lower = skill.toLowerCase();
  if (lower.includes('kobo') || lower.includes('survey')) return { icon: FileSpreadsheet, color: 'text-emerald-400' };
  if (lower.includes('video') || lower.includes('premiere') || lower.includes('capcut')) return { icon: Film, color: 'text-pink-500' };
  if (lower.includes('react')) return { icon: Layout, color: 'text-cyan-400' };
  if (lower.includes('python')) return { icon: Code, color: 'text-blue-500' };
  if (lower.includes('javascript') || lower.includes('js')) return { icon: Code, color: 'text-yellow-400' };
  if (lower.includes('typescript')) return { icon: Code, color: 'text-blue-400' };
  if (lower.includes('node') || lower.includes('express')) return { icon: Server, color: 'text-green-500' };
  if (lower.includes('mongo') || lower.includes('database')) return { icon: Database, color: 'text-green-400' };
  if (lower.includes('ai') || lower.includes('prompt') || lower.includes('generative')) return { icon: Brain, color: 'text-purple-400' };
  if (lower.includes('tailwind') || lower.includes('css')) return { icon: Layout, color: 'text-sky-400' };
  if (lower.includes('analytics') || lower.includes('ga4') || lower.includes('data')) return { icon: BarChart, color: 'text-orange-400' };
  if (lower.includes('firebase') || lower.includes('cloud')) return { icon: Cloud, color: 'text-amber-500' };
  if (lower.includes('automation')) return { icon: Bot, color: 'text-red-400' };
  return { icon: Wrench, color: 'text-teal-400' };
};

const SkillTunnelItem: React.FC<{ category: any; index: number; total: number; scrollYProgress: any }> = ({ category, index, total, scrollYProgress }) => {
  const step = 1 / total;
  const start = index * step;
  const mid = start + step / 2;
  const end = start + step;

  // Fade in as it approaches, fade out as it passes
  const opacity = useTransform(scrollYProgress, [start, mid, end], [0, 1, 0]);
  
  // Starts small in distance, grows massive as it hits screen
  const scale = useTransform(scrollYProgress, [start, mid, end], [0.7, 1, 1.3]);
  
  // Moves slightly upwards as it scales
  const y = useTransform(scrollYProgress, [start, mid, end], [50, 0, -50]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 origin-center pointer-events-none"
      style={{ opacity, scale, y }}
    >
      <h3 className="mb-12 text-3xl md:text-5xl font-black uppercase tracking-tight text-white drop-shadow-2xl">
        {category.title}
      </h3>
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl">
        {category.skills.map((skill: string, sIdx: number) => {
          const { icon: Icon, color } = getSkillStyle(skill);
          return (
            <div
              key={sIdx}
              className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-[#0A0F1C]/80 p-5 min-w-[120px] min-h-[120px] md:min-w-[144px] md:min-h-[144px] max-w-[260px] h-auto shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:bg-white/10 hover:border-white/30"
            >
              <Icon className={`h-10 w-10 md:h-12 md:w-12 shrink-0 ${color} drop-shadow-[0_0_10px_currentColor]`} />
              <span className="text-xs md:text-sm font-bold text-slate-200 text-center leading-tight">
                {skill}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

const SkillsSection: React.FC = () => {
  const { data } = usePortfolio();
  const skills = data.skills || [];
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Blur the headline as we scroll into the tunnel
  const headlineBlur = useTransform(scrollYProgress, [0, 0.05, 0.1], ['blur(0px)', 'blur(10px)', 'blur(20px)']);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.05, 0.1], [1, 0.4, 0.1]);
  const headlineScale = useTransform(scrollYProgress, [0, 0.1], [1, 1.1]);

  return (
    <section id="skills" ref={containerRef} className="relative w-full h-[800vh]">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-black/50 backdrop-blur-sm">
        
        {/* Background gradient for depth */}
        <div className="absolute inset-0 z-0 bg-gradient-radial from-transparent to-black/90 pointer-events-none" />

        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none"
          style={{ 
            filter: headlineBlur, 
            opacity: headlineOpacity,
            scale: headlineScale 
          }}
        >
          <h2 className="text-2xl md:text-4xl font-black tracking-[0.4em] text-teal-400 uppercase drop-shadow-[0_0_20px_rgba(45,212,191,0.6)] text-center max-w-4xl leading-tight">
            TECHNICAL & CORE COMPETENCIES
          </h2>
        </motion.div>

        {/* Simulated 3D Tunnel via Scale & Opacity */}
        <div className="relative z-10 flex w-full h-full items-center justify-center">
          {skills.map((category, idx) => (
            <SkillTunnelItem
              key={idx}
              category={category}
              index={idx}
              total={skills.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default SkillsSection;
