import { Layers, Database, BarChart3, Terminal } from "lucide-react";

export const PORTFOLIO_DATA = {
  hero: {
    name: "REAJUL HASAN",
    role: "AI-POWERED FULL-STACK & 3D WEB DEVELOPER • DIGITAL GROWTH SPECIALIST",
    tagline: "Engineering Zero-Code 3D WebGL SaaS & Near-Zero Latency Web Applications",
    availability: "Available for New Opportunities",
    metrics: [
      { value: "5+", label: "FULL-STACK PRODUCTS" },
      { value: "C1", label: "ADVANCED ENGLISH" },
      { value: "98%", label: "DATA ACCURACY" },
      { value: "100%", label: "CROSS-DEVICE" }
    ],
    techMarquee: ["React.js", "React Three Fiber", "WebGL", "Next.js", "Supabase", "OpenAI API", "Tailwind CSS", "Python"]
  },
  services: [
    {
      title: "Full-Stack & 3D Web Development",
      description: "Building responsive, near-zero latency web applications and immersive 3D WebGL user experiences using React, Three.js, and Supabase.",
      icon: Layers
    },
    {
      title: "AI & Automated Web Architecture",
      description: "Integrating OpenAI API systems, crafting prompt engineering logic, and building generative AI asset tools with Python automation.",
      icon: Terminal
    },
    {
      title: "Field Data Analytics & Growth",
      description: "Executing multi-channel SEO campaigns, managing GA4 tracking, and engineering field survey architectures using KoboToolbox.",
      icon: BarChart3
    }
  ],
  projects: [
    {
      title: "Stomak Solution",
      category: "Commercial OS",
      description: "Architected an end-to-end smart restaurant management system unifying POS billing, live kitchen tracking, and CRM modules within a dark glassmorphic UI.",
      tech: ["React.js", "Tailwind CSS", "Firebase"],
      link: "https://stomak-app.vercel.app"
    },
    {
      title: "3D Universe",
      category: "SaaS & 3D WebGL",
      description: "Engineered a zero-code SaaS platform transforming static business metrics into interactive 3D WebGL landing pages with automated OpenAI copywriting.",
      tech: ["React Three Fiber", "MERN Stack", "Supabase", "OpenAI API"],
      link: "https://3duniverse04.vercel.app"
    },
    {
      title: "My 3D Portfolio",
      category: "SaaS & 3D WebGL",
      description: "Dynamic 3D portfolio engine fusing fluid camera physics, micro-bounce interactions, and reactive mouse-tracking effects with real-time administrative control.",
      tech: ["React.js", "Three.js", "Framer Motion"],
      link: "https://my3dportfolioo.vercel.app"
    },
    {
      title: "Client Web Suites",
      category: "Frontend",
      description: "Designed and deployed optimized, responsive professional web portals with top Google PageSpeed scores for multiple clients.",
      tech: ["UI/UX Layout", "Frontend Optimization"],
      link: "https://alomgirhossain.netlify.app"
    }
  ],
  pipeline: [
    "01 IDEA [START]", "02 DISCOVER", "03 DEFINE", "04 DESIGN", 
    "05 BUILD", "06 AI API INTEGRATION", "07 TEST", "08 SHIP [LIVE]"
  ],
  contact: {
    email: "reaj.hasan786@gmail.com",
    whatsapp: "+8801400016634",
    linkedin: "https://linkedin.com/in/reajul-hasan-930355167"
  }
};