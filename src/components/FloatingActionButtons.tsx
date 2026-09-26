import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../contexts/PortfolioContext';

const FloatingActionButtons: React.FC = () => {
  const { data } = usePortfolio();
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const whatsappLink = `https://wa.me/${data.footer?.contact?.whatsapp || ''.replace(/[^0-9]/g, '')}`;

  return (
    <div className="fixed bottom-6 right-4 md:right-8 z-50 flex flex-col gap-4 items-center">
      {/* Scroll Up Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            onClick={scrollToTop}
            className="p-3 md:p-3.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-white shadow-lg hover:bg-orange-500 hover:border-orange-500 hover:text-black transition-all duration-300 flex items-center justify-center group"
            initial={{ opacity: 0, y: 20, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="absolute right-full mr-4 px-3 py-1 bg-black/80 backdrop-blur-sm text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block">
              Scroll to Top
            </span>
            <ArrowUp className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <motion.a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group p-3.5 md:p-4 rounded-full bg-[#25D366] text-white shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] flex items-center justify-center transition-all duration-300"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="absolute right-full mr-4 px-3 py-1 bg-black/80 backdrop-blur-sm text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block">
          Chat on WhatsApp
        </span>
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
      </motion.a>
    </div>
  );
};

export default FloatingActionButtons;
