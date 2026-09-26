import React from 'react';
import { usePortfolio } from '../contexts/PortfolioContext';

const AboutSection: React.FC = () => {
  const { data } = usePortfolio();
  const hero = data.hero || {};
  return (
    <section id="about" className="w-full max-w-5xl px-8 py-24 mx-auto text-white">
      <h2 className="mb-12 text-3xl font-bold uppercase tracking-widest text-slate-200 border-b border-white/10 pb-4">
        About Me
      </h2>
      <div className="text-lg leading-relaxed text-slate-400">
        {hero.bio}
      </div>
    </section>
  );
};

export default AboutSection;
