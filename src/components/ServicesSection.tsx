import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Bot, Cuboid, Settings, TrendingUp, CheckCircle2, ChevronRight } from 'lucide-react';

const serviceCategories = [
  {
    id: "web-dev",
    category: "Web Development",
    icon: Rocket,
    description: "Business websites, landing pages and full-stack applications.",
    services: [
      {
        title: "AI-Powered Business Website",
        provide: ["Responsive website", "Modern UI/UX", "Contact/lead forms", "AI chatbot", "AI content generation", "Booking/request forms", "Analytics", "Deployment"],
        gets: "A professional website that can present their business and automate parts of customer interaction."
      },
      {
        title: "Full-Stack Web Application",
        provide: ["React / Next.js frontend", "Node.js / Express backend", "MongoDB / Firebase / Supabase", "Authentication", "REST APIs", "User dashboard", "Admin dashboard", "Deployment"],
        gets: "A complete web application rather than just a static website."
      },
      {
        title: "Landing Page / Product Website",
        provide: ["Hero section", "Product/service presentation", "Features", "Testimonials", "Pricing", "CTA", "Contact/lead form", "Responsive design", "Animation", "Analytics"],
        gets: "A focused website designed around one product, service, campaign or business objective."
      }
    ]
  },
  {
    id: "ai-automation",
    category: "AI & Automation",
    icon: Bot,
    description: "AI APIs, chatbots, document processing and business automation.",
    services: [
      {
        title: "AI Integration & Automation",
        provide: ["AI chatbot", "OpenAI/Gemini API integration", "AI text generation", "PDF/document processing", "AI data extraction", "Automated workflows", "AI-assisted customer support", "AI content generation"],
        gets: "Manual tasks converted into automated AI workflows."
      }
    ]
  },
  {
    id: "3d-experiences",
    category: "3D Experiences",
    icon: Cuboid,
    description: "Three.js, WebGL, 3D portfolios and interactive websites.",
    services: [
      {
        title: "3D Interactive Website",
        provide: ["Three.js", "React Three Fiber", "WebGL", "3D environments", "3D objects", "Scroll-driven animation", "Interactive camera", "Particle effects", "3D transitions", "Interactive storytelling"],
        gets: "A website that feels more like an interactive digital experience than a normal website."
      },
      {
        title: "3D Portfolio Website",
        provide: ["For Developers", "For Designers", "For Engineers", "For Architects", "For Freelancers", "For Creators", "For Professionals"],
        gets: "A unique portfolio with 3D animation, projects, skills, experience, contact section and optional admin control."
      },
      {
        title: "AI Portfolio / Resume Website",
        provide: ["Resume/CV upload", "PDF information extraction", "AI-generated bio", "AI-generated skills", "Portfolio generation", "Project sections", "Theme selection", "3D themes", "Public portfolio URL", "Admin editing"],
        gets: "CV → AI → Professional Portfolio. This could be marketed to students, job seekers and freelancers."
      }
    ]
  },
  {
    id: "business-systems",
    category: "Business Systems",
    icon: Settings,
    description: "POS, booking, CRM, ordering systems and custom dashboards.",
    services: [
      {
        title: "Admin Dashboard / CMS",
        provide: ["Secure login", "Dashboard", "Add/edit/delete content", "User management", "Portfolio/project management", "Orders/leads management", "Website settings", "Analytics"],
        gets: "The ability to control their website/application without editing code."
      },
      {
        title: "Business Management System",
        provide: ["Restaurant POS & Ordering", "Clinic Appointments & Records", "Salon Booking & Staff", "Training Center Management"],
        gets: "One system to manage important business operations."
      }
    ]
  },
  {
    id: "digital-growth",
    category: "Digital Growth",
    icon: TrendingUp,
    description: "SEO, analytics, social media, video and email automation.",
    services: [
      {
        title: "SEO + Analytics",
        provide: ["On-page SEO", "Meta titles/descriptions", "Search-friendly structure", "Google Analytics 4", "Event tracking", "Conversion tracking", "Basic performance optimization"],
        gets: "Better understanding of where visitors come from and what they do on the website."
      },
      {
        title: "Digital Marketing & Content",
        provide: ["Social media content", "YouTube content", "LinkedIn content", "Facebook content", "Short-form video", "Video editing", "Email campaigns", "Mailchimp automation"],
        gets: "Ongoing digital content and campaign support."
      },
      {
        title: "Website Maintenance & Support",
        provide: ["Bug fixing", "Content updates", "New sections", "Security/basic maintenance", "Performance improvements", "Analytics reports", "Small feature additions", "Deployment support"],
        gets: "Someone available after the website is delivered. Useful for recurring income."
      }
    ]
  }
];

const ServicesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(serviceCategories[0].id);

  const activeCategory = serviceCategories.find(c => c.id === activeTab) || serviceCategories[0];

  return (
    <section id="services" className="relative w-full max-w-7xl px-4 md:px-12 py-32 mx-auto">
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white drop-shadow-xl mb-4">
          My <span className="text-orange-500 italic font-serif">Services</span>
        </h2>
        <p className="text-xl text-slate-300 font-medium max-w-2xl mx-auto">
          Build → Automate → Manage → Grow
        </p>
        <div className="mt-6 mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-12 items-start relative">
        
        {/* Sticky Sidebar / Tabs */}
        <div className="w-full lg:w-1/3 lg:sticky lg:top-32 z-10 flex flex-col gap-4">
          <div className="flex overflow-x-auto lg:flex-col gap-3 pb-4 lg:pb-0 hide-scrollbar snap-x snap-mandatory">
            {serviceCategories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.id;
              
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`
                    flex items-center gap-4 p-5 rounded-2xl transition-all duration-500 text-left snap-start min-w-[280px] lg:min-w-0
                    ${isActive 
                      ? 'bg-orange-500/20 border-orange-500/50 shadow-[0_0_30px_rgba(249,115,22,0.2)]' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                    } border backdrop-blur-md relative overflow-hidden group
                  `}
                >
                  {/* Highlight animated background */}
                  {isActive && (
                    <motion.div 
                      layoutId="active-tab-indicator"
                      className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent pointer-events-none"
                    />
                  )}
                  
                  <div className={`p-3 rounded-xl transition-colors duration-500 ${isActive ? 'bg-orange-500 text-white shadow-lg' : 'bg-white/10 text-slate-400 group-hover:text-white group-hover:bg-white/20'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={`font-bold tracking-wide transition-colors ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                      {cat.category}
                    </h3>
                  </div>
                  
                  <ChevronRight className={`w-5 h-5 transition-transform duration-500 ${isActive ? 'text-orange-500 translate-x-1' : 'text-slate-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="w-full lg:w-2/3 min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
              className="flex flex-col gap-8"
            >
              {/* Category Header */}
              <div className="mb-4">
                <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4 flex items-center gap-4">
                  {activeCategory.category}
                </h3>
                <p className="text-xl text-orange-400 font-medium">
                  {activeCategory.description}
                </p>
              </div>

              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 gap-8">
                {activeCategory.services.map((service, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="group relative flex flex-col bg-[#0f172a]/60 border border-white/10 shadow-2xl backdrop-blur-2xl rounded-[2rem] p-8 lg:p-10 hover:border-orange-500/40 hover:shadow-[0_0_50px_rgba(249,115,22,0.15)] transition-all duration-500 overflow-hidden"
                  >
                    {/* Glowing Accent Gradient */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-orange-500/20 transition-all duration-700 pointer-events-none" />
                    
                    <h4 className="text-2xl lg:text-3xl font-black text-white mb-8 tracking-tight relative z-10">
                      {service.title}
                    </h4>
                    
                    <div className="flex flex-col md:flex-row gap-8 relative z-10">
                      
                      {/* What I Provide */}
                      <div className="flex-1">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold uppercase tracking-widest text-slate-300 mb-6 shadow-inner">
                          What I Provide
                        </div>
                        <ul className="grid grid-cols-1 gap-y-3 gap-x-6">
                          {service.provide.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-slate-200 font-medium">
                              <CheckCircle2 className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                              <span className="leading-snug">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Divider */}
                      <div className="hidden md:block w-px bg-gradient-to-b from-white/0 via-white/10 to-white/0" />
                      <div className="block md:hidden h-px w-full bg-gradient-to-r from-white/0 via-white/10 to-white/0" />

                      {/* What Client Gets */}
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-bold uppercase tracking-widest text-orange-400 mb-6 shadow-inner w-max">
                          What Client Gets
                        </div>
                        <p className="text-lg md:text-xl text-teal-300 font-medium leading-relaxed bg-black/20 p-6 rounded-2xl border border-white/5 shadow-inner">
                          {service.gets}
                        </p>
                      </div>
                      
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
