import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, LayoutTemplate, Layers, Rocket, MonitorPlay } from 'lucide-react';

const enhancedProjects = [
  {
    title: "Stomak Solution — Smart Restaurant Operating System",
    image: "/images/media_1790367528309.jpg",
    links: [
      { name: "Live Demo", url: "https://stomak-app.vercel.app" }
    ],
    tech: ["React.js (Vite)", "Tailwind CSS", "Framer Motion", "Firebase", "Browser Local Storage"],
    description: "All-in-One Commercial OS: Unifies online order dispatching, POS billing, table/event booking, live kitchen tracking, and customer CRM modules.",
    details: [
      {
        title: "All-in-One Commercial OS",
        desc: "Unifies online order dispatching, POS billing, table/event booking, live kitchen tracking, and customer CRM modules into a single powerful system."
      },
      {
        title: "Dark Glassmorphic Admin Panel",
        desc: "Features an instant control panel for real-time branding, video background updates, and client configuration adjustments without editing code."
      },
      {
        title: "Near-Zero Latency",
        desc: "Implemented a client-side data persistence engine using browser storage to eliminate backend delays and ensure instantaneous interactions."
      }
    ]
  },
  {
    title: "3D Universe — Zero-Code 3D Web Ecosystem",
    image: "/images/media_1790367548760.png",
    links: [
      { name: "Live Demo", url: "https://3duniverse04.vercel.app" }
    ],
    tech: ["MERN Stack", "React Three Fiber", "Three.js", "Spline", "Tailwind CSS", "Supabase", "OpenAI API"],
    description: "SaaS Platform: Transforms static business metrics into interactive, real-time 3D WebGL landing pages.",
    details: [
      {
        title: "Spatial WebGL Builder",
        desc: "Transforms static business metrics into interactive, real-time 3D WebGL landing pages without writing code."
      },
      {
        title: "Tri-Tier Architecture",
        desc: "Built with an Owner CMS, Client Builder, and Public Landing View driven by a 4-phase, 11-step creation engine."
      },
      {
        title: "AI & Environmental Loops",
        desc: "Includes 15 AAA 3D environmental loops (e.g., Cyber Neon, Command Center, Crystal Vault) paired with OpenAI API copywriting engines to automate landing page copy and asset generation."
      }
    ]
  },
  {
    title: "My 3D Portfolio — Interactive 3D Showcase",
    image: "/images/media_1790367516753.jpg",
    links: [
      { name: "Live Demo", url: "https://my3dportfolioo.vercel.app" }
    ],
    tech: ["React.js", "React Three Fiber", "Three.js", "Tailwind CSS", "Framer Motion", "MERN Stack"],
    description: "Built a dynamic 3D portfolio engine fusing fluid camera physics, micro-bounce interactions, and reactive mouse-tracking effects.",
    details: [
      {
        title: "3D Physics & Motion",
        desc: "Features fluid camera physics, micro-bounce interactions, and reactive mouse-tracking visual effects for an immersive experience."
      },
      {
        title: "No-Code Admin Control",
        desc: "Includes an administrative dashboard allowing real-time content updates, project additions, and text synchronization without touching code."
      }
    ]
  },
  {
    title: "Interactive 2D Web Showcase & Client Portfolio Collection",
    image: "/images/media_1790367642814.png",
    links: [
      { name: "Alomgir Hossain", url: "https://alomgirhossain.netlify.app" },
      { name: "Labonno Sultana", url: "https://labonnosultana.netlify.app" },
      { name: "Dina Akter", url: "https://dinaakter04.netlify.app" },
      { name: "ASM Moniruzzaman", url: "https://asmmoniruzzaman.netlify.app" },
      { name: "Nushrat Nishat", url: "https://nushratnishat.netlify.app" }
    ],
    tech: ["Responsive UI Layouts", "Frontend Optimization", "Google PageSpeed Standards", "Tailwind CSS", "React.js"],
    description: "Custom-built responsive web portals designed for professional clients ensuring high Google PageSpeed scores.",
    details: [
      {
        title: "Client Suite Engineering",
        desc: "Custom-built responsive web portals designed for professional clients, uniquely tailored to their brand identity and career goals."
      },
      {
        title: "Performance & Compatibility",
        desc: "Achieves 100% cross-device compatibility, modern UI layout standards, and high Google PageSpeed scores for superior UX and SEO."
      }
    ]
  }
];

const ProjectsSection: React.FC = () => {
  const targetRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<typeof enhancedProjects[0] | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  return (
    <section ref={targetRef} id="projects" className="relative w-full h-[400vh]">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-start overflow-hidden bg-transparent">
        
        <div className="w-full px-8 md:px-16 lg:px-24 mb-6 md:mb-12 mt-16 md:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl uppercase drop-shadow-md">
              FEATURED WEB DEVELOPMENT DEMO PROJECTS
            </h2>
            <div className="mt-4 h-1 w-24 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]"></div>
          </motion.div>
        </div>

        {/* The horizontal scrolling track */}
        <div className="w-full overflow-hidden flex-1 flex items-center">
          <motion.div 
            style={{ x }} 
            className="flex w-[400vw] items-center pl-8 md:pl-16 lg:pl-24 pb-8"
          >
            {enhancedProjects.map((project, idx) => (
              <div key={idx} className="w-[90vw] sm:w-[75vw] md:w-[60vw] lg:w-[45vw] flex-shrink-0 pr-8 md:pr-12">
                <div className="group flex flex-col h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden rounded-[2rem] bg-[#0A0F1C]/90 backdrop-blur-xl border border-white/10 shadow-2xl transition-all hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] relative">
                  
                  {project.image && (
                    <div className="w-full h-48 md:h-64 shrink-0 relative overflow-hidden bg-black/80 border-b border-white/5">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C]/90 to-transparent pointer-events-none" />
                    </div>
                  )}
                
                  <div className="p-6 md:p-8 flex flex-col flex-grow overflow-y-auto custom-scrollbar relative z-10">
                    <h3 className="mb-3 text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
                      {project.title.split('—')[0].trim()}
                    </h3>
                    
                    <p className="mb-6 text-base md:text-lg text-slate-300 leading-relaxed font-medium">
                      {project.description}
                    </p>
                    
                    <div className="mb-8 flex flex-wrap gap-2">
                      {project.tech.map((t, i) => (
                        <span 
                          key={i} 
                          className="px-4 py-1.5 rounded-full border border-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider bg-blue-500/10 backdrop-blur-sm"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-auto flex flex-col sm:flex-row flex-wrap items-center gap-4">
                      <button 
                        onClick={() => setSelectedProject(project)}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-500/25 active:scale-95"
                      >
                        Project Details <LayoutTemplate className="w-5 h-5" />
                      </button>
                      
                      <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                        {project.links.slice(0, 2).map((link, i) => (
                          <a 
                            key={i}
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-white/20 hover:bg-white/10 hover:border-white/40 text-white font-bold transition-all active:scale-95 flex-1 sm:flex-none whitespace-nowrap"
                          >
                            {link.name} <ExternalLink className="w-4 h-4" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", bounce: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl max-h-[90vh] bg-[#0A0F1C] border border-blue-500/30 shadow-[0_0_100px_rgba(59,130,246,0.15)] rounded-3xl overflow-hidden flex flex-col relative"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Header Image */}
              <div className="w-full h-48 md:h-64 shrink-0 relative overflow-hidden bg-black">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-60" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-[#0A0F1C]/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight drop-shadow-xl leading-tight">
                    {selectedProject.title.split('—')[0].trim()}
                  </h3>
                  <p className="text-blue-400 font-bold mt-2 text-lg">
                    {selectedProject.title.split('—')[1]?.trim()}
                  </p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                
                <div className="mb-10">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-3 border-b border-white/10 pb-3">
                    <Rocket className="w-6 h-6 text-blue-500" /> Technology Stack
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.tech.map((t, i) => (
                      <span key={i} className="px-5 py-2 rounded-xl border border-white/10 bg-white/5 text-white font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-10">
                  <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3 border-b border-white/10 pb-3">
                    <Layers className="w-6 h-6 text-orange-500" /> Key Features & Architecture
                  </h4>
                  <div className="grid gap-6">
                    {selectedProject.details.map((detail, idx) => (
                      <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h5 className="text-lg font-bold text-white mb-2">{detail.title}</h5>
                        <p className="text-slate-300 leading-relaxed">{detail.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3 border-b border-white/10 pb-3">
                    <MonitorPlay className="w-6 h-6 text-teal-500" /> Live Demo Links
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedProject.links.map((link, idx) => (
                      <a 
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 rounded-xl border border-white/10 hover:border-teal-500/50 hover:bg-teal-500/10 text-white font-bold transition-all group"
                      >
                        {link.name}
                        <ExternalLink className="w-5 h-5 text-slate-500 group-hover:text-teal-400 transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
