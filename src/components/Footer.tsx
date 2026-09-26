import React from 'react';
import { Mail, MessageCircle, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';
import { LinkedInIcon } from './icons/LinkedInIcon';

const Footer: React.FC = () => {
  const { data } = usePortfolio();
  const footer = data.footer || {};

  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/40 px-4 py-16 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-12">
        <div className="flex flex-col items-center">
          <h3 className="mb-6 text-xl font-bold text-white">Let's Connect</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${footer.contact.email}`}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Mail className="h-4 w-4" /> Email
            </a>
            <a
              href={`https://wa.me/${footer.contact.whatsapp.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a
              href={`https://${footer.contact.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              <LinkedInIcon className="h-4 w-4" /> LinkedIn
            </a>
            <a
              href={`https://${footer.contact.fiverr}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ExternalLink className="h-4 w-4" /> Fiverr
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-6xl border-t border-white/10 pt-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} REAJUL HASAN. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
