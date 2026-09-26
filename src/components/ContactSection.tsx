import React, { useState } from 'react';
import { usePortfolio } from '../contexts/PortfolioContext';
import { Mail, MessageCircle, Send, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { FiverrIcon } from './icons/FiverrIcon';

const ContactSection: React.FC = () => {
  const { data } = usePortfolio();
  const footer = data.footer || {};
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSent(false), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const contactActions = data.hero?.contactActions || {};

  return (
    <section id="contact" className="w-full max-w-6xl px-8 py-32 mx-auto text-white relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[600px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="text-center mb-16 relative z-10">
        <h2 className="mb-6 text-4xl md:text-6xl font-black uppercase tracking-tighter drop-shadow-lg">Let's Work Together</h2>
        <p className="max-w-2xl mx-auto text-lg text-slate-400 font-medium">
          I am currently Available for Remote & Full-Stack Engineering Roles & Digital Growth Marketing and Data Specialist.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-12 relative z-10">
        {/* Query Section / Contact Form */}
        <div className="lg:col-span-3 p-8 md:p-10 rounded-[2rem] bg-[#0A0F1C]/80 border border-white/10 shadow-2xl backdrop-blur-xl">
          <h3 className="text-2xl font-bold text-white mb-2">Send a Message</h3>
          <p className="text-slate-400 mb-8 text-sm">Got a question or proposal, or just want to say hello? Go ahead.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold text-slate-300">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-slate-300">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-semibold text-slate-300">Your Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Hi, I think we need a design system for our products..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all resize-none"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              type="submit"
              className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 font-bold text-lg transition-all shadow-lg ${
                isSent 
                  ? 'bg-teal-500 text-black' 
                  : 'bg-orange-500 text-black hover:bg-orange-400'
              }`}
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : isSent ? (
                <>Message Sent Successfully!</>
              ) : (
                <>
                  Shoot Message <Send className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-2 flex flex-col justify-center gap-4">
          <h3 className="text-2xl font-bold text-white mb-4 hidden lg:block">Quick Links</h3>
          
          <motion.a 
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            href={contactActions.email || `mailto:${footer.contact?.email}`} 
            className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-blue-500/20 to-blue-600/5 border border-blue-500/30 hover:border-blue-500/60 transition-colors shadow-lg group"
          >
            <div className="shrink-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <span className="block text-sm font-bold text-blue-400 uppercase">Email Me</span>
              <span className="block text-xs font-medium text-slate-400 mt-0.5">Fastest way to reach me</span>
            </div>
            <ExternalLink className="w-5 h-5 text-blue-500/50 group-hover:text-blue-500 transition-colors" />
          </motion.a>

          <motion.a 
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            href={`https://wa.me/${footer.contact?.whatsapp?.replace(/[^0-9]/g, '')}`} 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-emerald-600/5 border border-emerald-500/30 hover:border-emerald-500/60 transition-colors shadow-lg group"
          >
            <div className="shrink-0 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(16,185,129,0.5)] group-hover:scale-110 transition-transform">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <span className="block text-sm font-bold text-emerald-400 uppercase">WhatsApp</span>
              <span className="block text-xs font-medium text-slate-400 mt-0.5">Let's chat directly</span>
            </div>
            <ExternalLink className="w-5 h-5 text-emerald-500/50 group-hover:text-emerald-500 transition-colors" />
          </motion.a>

          {contactActions?.linkedin && (
            <motion.a 
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              href={contactActions.linkedin} 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-sky-500/20 to-sky-600/5 border border-sky-500/30 hover:border-sky-500/60 transition-colors shadow-lg group"
            >
              <div className="shrink-0 w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(14,165,233,0.5)] group-hover:scale-110 transition-transform">
                <LinkedInIcon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="block text-sm font-bold text-sky-400 uppercase">LinkedIn</span>
                <span className="block text-xs font-medium text-slate-400 mt-0.5">Professional network</span>
              </div>
              <ExternalLink className="w-5 h-5 text-sky-500/50 group-hover:text-sky-500 transition-colors" />
            </motion.a>
          )}

          {contactActions?.fiverr && (
            <motion.a 
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              href={contactActions.fiverr} 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-green-500/20 to-green-600/5 border border-green-500/30 hover:border-green-500/60 transition-colors shadow-lg group"
            >
              <div className="shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(34,197,94,0.5)] group-hover:scale-110 transition-transform">
                <FiverrIcon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <span className="block text-sm font-bold text-green-400 uppercase">Fiverr</span>
                <span className="block text-xs font-medium text-slate-400 mt-0.5">Hire me on Fiverr</span>
              </div>
              <ExternalLink className="w-5 h-5 text-green-500/50 group-hover:text-green-500 transition-colors" />
            </motion.a>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
