import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 flex w-full flex-col md:flex-row items-center justify-between px-6 md:px-12 py-4 md:py-6 backdrop-blur-xl bg-black/60 md:bg-black/40 border-b border-white/5 transition-all duration-300">
      <div className="flex w-full md:w-auto items-center justify-between">
        <div className="flex items-center gap-2 flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
          <div className="flex flex-wrap gap-1 w-6">
            <div className="w-2 h-2 bg-orange-500 rounded-sm"></div>
            <div className="w-2 h-2 bg-teal-500 rounded-sm"></div>
            <div className="w-2 h-2 bg-teal-500 rounded-sm"></div>
            <div className="w-2 h-2 bg-orange-500 rounded-sm"></div>
          </div>
          <span className="text-xl font-black text-white tracking-widest hidden md:block">Reajul Hasan</span>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      
      {/* Navigation Links */}
      <div className={`${isOpen ? 'flex' : 'hidden'} md:flex w-full md:w-auto flex-col md:flex-row mt-6 md:mt-0 pb-4 md:pb-0 justify-center flex-1`}>
        <ul className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-6 lg:gap-8 text-sm font-semibold text-slate-300 w-full">
<li><a href="#home" onClick={() => setIsOpen(false)} className="hover:text-orange-400 transition-colors">Home</a></li>
          <li><a href="#services" onClick={() => setIsOpen(false)} className="hover:text-orange-400 transition-colors">Services</a></li>
          <li><a href="#skills" onClick={() => setIsOpen(false)} className="hover:text-orange-400 transition-colors">Skills</a></li>
          <li><a href="#pipeline" onClick={() => setIsOpen(false)} className="hover:text-orange-400 transition-colors">Tactics</a></li>
          <li><a href="#projects" onClick={() => setIsOpen(false)} className="hover:text-orange-400 transition-colors">Projects</a></li>
          <li><a href="#experience" onClick={() => setIsOpen(false)} className="hover:text-orange-400 transition-colors">Experience</a></li>
          <li><a href="#education" onClick={() => setIsOpen(false)} className="hover:text-orange-400 transition-colors">Education</a></li>
          <li><a href="#contact" onClick={() => setIsOpen(false)} className="hover:text-orange-400 transition-colors">Connect</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
