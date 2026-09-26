import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../contexts/PortfolioContext';

const ExperienceSection: React.FC = () => {
  const { data } = usePortfolio();
  const experience = data.experience || [];
  return (
    <section id="experience" className="relative w-full max-w-6xl px-8 py-32 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-24 text-center"
      >
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white drop-shadow-xl">
          Professional <span className="text-orange-500 italic font-serif">Experience</span>
        </h2>
        <div className="mt-6 mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
      </motion.div>

      <div className="relative space-y-16 before:absolute before:inset-0 before:left-8 md:before:left-1/2 before:-translate-x-1/2 before:w-1 before:bg-gradient-to-b before:from-transparent before:via-orange-500/30 before:to-transparent before:z-0">
        {experience.map((exp, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50, rotateY: idx % 2 === 0 ? -15 : 15, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            style={{ perspective: 1000 }}
            className="relative z-10 flex flex-col md:flex-row justify-between items-center w-full group"
          >
            {/* Timeline Dot */}
            <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4 border-slate-950 bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.6)] z-20 transition-transform duration-500 group-hover:scale-125" />

            {/* Spacer for alternating desktop layout */}
            <div className={`hidden md:block w-[calc(50%-4rem)] ${idx % 2 !== 0 ? 'order-1' : 'order-2'}`}></div>

            {/* Glassmorphic Card */}
            <div className={`w-[calc(100%-5rem)] ml-auto md:ml-0 md:w-[calc(50%-4rem)] ${idx % 2 !== 0 ? 'order-2' : 'order-1'} p-8 md:p-10 rounded-3xl bg-[#0A0F1C]/80 border border-white/10 shadow-[0_0_30px_rgba(249,115,22,0.05)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_0_50px_rgba(249,115,22,0.2)] hover:border-orange-500/40`}>
              
              <div className={`flex flex-col ${idx % 2 === 0 ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} items-start text-left`}>
                <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-orange-400 uppercase bg-orange-500/10 rounded-full border border-orange-500/20">
                  {exp.period}
                </span>
                
                <h3 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight group-hover:text-orange-400 transition-colors">
                  {exp.title}
                </h3>
                
                <h4 className="text-lg font-bold text-slate-400 mb-8">
                  {exp.company}
                </h4>
                
                <ul className="space-y-4 text-left w-full">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="text-slate-300 text-sm md:text-base flex items-start gap-4 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                      <span className="text-orange-500 mt-1 text-sm shrink-0">❖</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
