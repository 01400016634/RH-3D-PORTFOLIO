import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../contexts/PortfolioContext';
import { GraduationCap, Award, Globe, BookOpen } from 'lucide-react';

const EducationSection: React.FC = () => {
  const { data } = usePortfolio();
  const education = data.education || [];
  const certifications = data.certifications || [];
  return (
    <section id="education" className="relative w-full max-w-7xl px-8 py-32 mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-12">
        {/* Education Column */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white drop-shadow-xl flex items-center gap-4">
              <GraduationCap className="w-10 h-10 md:w-12 md:h-12 text-orange-500" />
              Education
            </h2>
            <div className="mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-orange-500 to-transparent"></div>
          </motion.div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-8 md:before:left-10 before:-translate-x-1/2 before:w-1 before:bg-gradient-to-b before:from-transparent before:via-orange-500/30 before:to-transparent before:z-0">
            {education.map((edu, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.15, type: "spring", bounce: 0.3 }}
                className="relative z-10 flex gap-6 md:gap-8 group"
              >
                <div className="relative shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-[#0A0F1C] bg-slate-900 flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.3)] group-hover:scale-110 group-hover:bg-orange-500 transition-all duration-300">
                  <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-orange-500 group-hover:text-black transition-colors" />
                </div>
                
                <div className="p-6 md:p-8 rounded-[2rem] bg-[#0A0F1C]/80 border border-white/10 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(249,115,22,0.2)] hover:border-orange-500/40 w-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[40px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-orange-500/20 transition-colors duration-500" />
                  
                  <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-orange-400 uppercase bg-orange-500/10 rounded-full border border-orange-500/20">
                    {edu.period}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-2 leading-tight group-hover:text-orange-300 transition-colors">{edu.degree}</h3>
                  <p className="text-slate-400 font-medium mb-4">{edu.institution}</p>
                  
                  {edu.details && (
                    <div className="inline-block mt-2 px-3 py-1.5 rounded-lg border border-teal-500/30 bg-teal-500/10 text-sm font-bold text-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.1)]">
                      {edu.details}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications & Languages Column */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 mt-24 lg:mt-0"
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white drop-shadow-xl flex items-center gap-4">
              <Award className="w-10 h-10 md:w-12 md:h-12 text-teal-400" />
              Credentials
            </h2>
            <div className="mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-teal-400 to-transparent"></div>
          </motion.div>

          <div className="space-y-8">
            {certifications.map((cert, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.15, type: "spring", bounce: 0.4 }}
                className="relative group p-8 rounded-[2rem] bg-[#0A0F1C]/80 border border-white/10 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(45,212,191,0.2)] hover:border-teal-500/40 overflow-hidden cursor-default"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex items-start gap-5">
                  <div className="mt-1 flex-shrink-0 w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-110 group-hover:bg-teal-400 group-hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(45,212,191,0.2)]">
                    {cert.title.toLowerCase().includes('language') ? <Globe className="w-7 h-7" /> : <Award className="w-7 h-7" />}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-white mb-3 group-hover:text-teal-300 transition-colors">{cert.title}</h3>
                    <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium group-hover:text-slate-200 transition-colors">{cert.details}</p>
                  </div>
                </div>
                
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-teal-500/10 blur-[40px] rounded-full translate-x-1/2 translate-y-1/2 group-hover:bg-teal-500/30 transition-colors duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
