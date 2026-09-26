import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight, Mail, Phone,  } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { FiverrIcon } from './icons/FiverrIcon';

const Typewriter: React.FC<{ words: string[] }> = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setBlink((prev) => !prev), 500);
    return () => clearTimeout(timeout);
  }, [blink]);

  useEffect(() => {
    if (words.length === 0) return;

    if (subIndex === words[index].length + 1 && !isDeleting) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, isDeleting ? 30 : 80);

    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting, words]);

  return (
    <span>
      {words[index].substring(0, subIndex)}
      <span className={`inline-block w-1.5 h-4 ml-1 align-middle bg-orange-500 transition-opacity duration-100 ${blink ? 'opacity-100' : 'opacity-0'}`}></span>
    </span>
  );
};

const HeroSection: React.FC = () => {
  const { data } = usePortfolio();
  const hero = data.hero;
  const roles = hero.title.split('|').map(role => role.trim());

  return (
    <section id="home" className="relative flex min-h-screen w-full flex-col justify-center px-8 md:px-16 lg:px-24 xl:px-32">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex max-w-3xl flex-col items-start mt-20"
      >
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
          </span>
          {hero.statusBadge}
        </div>

        <div className="mb-4 flex items-center gap-4 text-xs font-bold tracking-[0.2em] text-slate-300 uppercase h-6">
          <div className="h-px w-12 bg-orange-500"></div>
          <Typewriter words={roles} />
        </div>

        <h1 className="mb-6 text-[4rem] md:text-[5rem] lg:text-[6.5rem] font-bold leading-none tracking-tight text-white flex flex-wrap gap-x-6">
          <span>{hero.name.split(' ')[0]}</span>
          <span className="font-serif italic text-orange-500" style={{ fontFamily: 'Georgia, serif' }}>
            {hero.name.split(' ').slice(1).join(' ')}
          </span>
        </h1>
        
        <h2 className="mb-6 text-xl md:text-2xl font-bold tracking-wider text-white uppercase">
          BUILDING DIGITAL EXPERIENCES WITH AI AT THE CORE
        </h2>
        
        <p className="mb-10 max-w-xl text-base md:text-lg leading-relaxed text-slate-400">
          I build fast, thoughtful frontends and AI-powered product experiences - from design to shipped code. {hero.bio.split('.')[0]}.
        </p>

        <div className="mb-10 flex gap-6 text-slate-400">
          <a href={hero.contactActions.linkedin} className="group transition-all duration-300">
            <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:border-[#0077b5] group-hover:bg-[#0077b5]/10 group-hover:shadow-[0_0_15px_rgba(0,119,181,0.5)] transition-all">
              <LinkedInIcon className="h-5 w-5 text-slate-400 group-hover:text-[#0077b5] transition-colors" />
            </div>
          </a>
          <a href={hero.contactActions.email} className="group transition-all duration-300">
            <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:border-[#EA4335] group-hover:bg-[#EA4335]/10 group-hover:shadow-[0_0_15px_rgba(234,67,53,0.5)] transition-all">
              <Mail className="h-5 w-5 text-slate-400 group-hover:text-[#EA4335] transition-colors" />
            </div>
          </a>
          <a href={`tel:${hero.contactActions.phone.split(' / ')[0]}`} className="group transition-all duration-300">
            <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:border-[#25D366] group-hover:bg-[#25D366]/10 group-hover:shadow-[0_0_15px_rgba(37,211,102,0.5)] transition-all">
              <Phone className="h-5 w-5 text-slate-400 group-hover:text-[#25D366] transition-colors" />
            </div>
          </a>
          <a href={hero.contactActions.fiverr} className="group transition-all duration-300">
            <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:border-[#1dbf73] group-hover:bg-[#1dbf73]/10 group-hover:shadow-[0_0_15px_rgba(29,191,115,0.5)] transition-all">
              <FiverrIcon className="h-5 w-5 text-slate-400 group-hover:text-[#1dbf73] transition-colors" />
            </div>
          </a>
        </div>

        <div className="mb-12 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="flex items-center gap-2 rounded-full bg-purple-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-purple-700"
          >
            View My Work <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="/Reajul_Hasan_CV.pdf"
            download="Reajul_Hasan_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Download CV <Download className="h-4 w-4" />
          </a>
        </div>

        <div className="inline-flex items-center gap-4 rounded-2xl bg-black/40 border border-white/10 p-4 backdrop-blur-xl shadow-2xl mt-12">
          <div className="flex -space-x-3">
            <div className="h-10 w-10 rounded-full border-2 border-[#0A0F1C] bg-blue-500 flex items-center justify-center text-[10px] font-bold text-white shadow-lg">Data</div>
            <div className="h-10 w-10 rounded-full border-2 border-[#0A0F1C] bg-teal-500 flex items-center justify-center text-[10px] font-bold text-white shadow-lg z-10">Web</div>
            <div className="h-10 w-10 rounded-full border-2 border-[#0A0F1C] bg-purple-500 flex items-center justify-center text-[10px] font-bold text-white shadow-lg z-20">AI</div>
          </div>
          <div className="flex flex-col pr-4">
            <span className="text-sm font-black text-white uppercase tracking-wider">8+ Years Experience</span>
            <span className="text-xs text-orange-400 font-medium">From Field Data to Full-Stack</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
