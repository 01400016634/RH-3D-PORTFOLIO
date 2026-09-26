import React from 'react';
import { motion } from 'framer-motion';

const pipelineStages = [
  { stage: "01", name: "IDEA [START]", desc: "Strategic inspiration, problem framing & opportunity mapping." },
  { stage: "02", name: "DISCOVER", desc: "Deep user research, audience empathy & behavioral analysis." },
  { stage: "03", name: "DEFINE", desc: "Information architecture, wireframes & system specifications." },
  { stage: "04", name: "DESIGN", desc: "High-fidelity UI, spatial typography & micro-interactions." },
  { stage: "05", name: "BUILD", desc: "Fast, responsive frontend & robust server-side architecture." },
  { stage: "06", name: "AI", desc: "Intelligent neural workflows, cognitive models & adaptive flows." },
  { stage: "07", name: "TEST", desc: "Performance audits, cross-device QA & latency optimization." },
  { stage: "08", name: "SHIP [LIVE]", desc: "Zero-downtime deployment, telemetry monitoring & launch." }
];

const PipelineSection: React.FC = () => {
  return (
    <section className="relative w-full px-6 md:px-24 py-24 bg-black text-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 flex items-center justify-between border-b border-zinc-800 pb-6">
          <div>
            <span className="text-xs font-mono text-orange-400 uppercase tracking-widest">ROADMAP</span>
            <h2 className="text-4xl font-bold tracking-tight mt-1">PRODUCT PIPELINE</h2>
          </div>
          <span className="px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900 text-xs font-mono text-zinc-400">8 STAGES</span>
        </div>

        <div className="space-y-4">
          {pipelineStages.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:border-orange-500/50 hover:bg-zinc-900/80 transition-all backdrop-blur-md"
            >
              <div className="flex items-center gap-4 mb-2 md:mb-0">
                <span className="text-xl font-mono font-bold text-orange-500">{item.stage}</span>
                <h3 className="text-lg font-bold tracking-wide text-white">{item.name}</h3>
              </div>
              <p className="text-sm text-zinc-400 max-w-md md:text-right">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PipelineSection;