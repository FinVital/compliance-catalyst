import { motion } from "framer-motion";
import { 
  Lock, 
  Bot, 
  Shield, 
  CheckCircle2, 
  CreditCard, 
  HeartPulse, 
  Landmark, 
  Coins, 
  Globe, 
  Scale 
} from "lucide-react";

const frameworks = [
  {
    icon: Bot,
    emoji: "🤖",
    name: "ISO/IEC 42001",
    desc: "AI Management System (AIMS) — the global standard for certifying safe, ethical, and responsible AI system development.",
    tag: "Certification Standard",
    color: "teal",
  },
  {
    icon: Shield,
    emoji: "🛡️",
    name: "NIST AI RMF",
    desc: "A voluntary framework designed to improve the incorporation of trustworthiness considerations into AI product design and use.",
    tag: "Risk Framework",
    color: "indigo",
  },
  {
    icon: Scale,
    emoji: "⚖️",
    name: "EU AI Act",
    desc: "The world's first comprehensive horizontal legal framework on AI, categorizing systems by risk levels and enforcing strict rules.",
    tag: "Legal Regulation",
    color: "rose",
  },
  {
    icon: Globe,
    emoji: "🌐",
    name: "OECD AI Principles",
    desc: "Global principles for trustworthy AI adopted by member countries, promoting transparency, accountability, and safety.",
    tag: "Global Guidance",
    color: "emerald",
  },
  {
    icon: Landmark,
    emoji: "🏛️",
    name: "UNESCO AI Recommendation",
    desc: "The first global standard-setting instrument on the ethics of AI, providing a policy action framework for human-centric AI.",
    tag: "Ethical Standard",
    color: "cyan",
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; tagBg: string; tagText: string; shadow: string }> = {
  teal: { bg: "bg-teal-50/50", text: "text-teal-600", border: "border-teal-100", tagBg: "bg-teal-50", tagText: "text-teal-600", shadow: "group-hover:shadow-teal-500/5" },
  indigo: { bg: "bg-indigo-50/50", text: "text-indigo-600", border: "border-indigo-100", tagBg: "bg-indigo-50", tagText: "text-indigo-600", shadow: "group-hover:shadow-indigo-500/5" },
  rose: { bg: "bg-rose-50/50", text: "text-rose-600", border: "border-rose-100", tagBg: "bg-rose-50", tagText: "text-rose-600", shadow: "group-hover:shadow-rose-500/5" },
  emerald: { bg: "bg-emerald-50/50", text: "text-emerald-600", border: "border-emerald-100", tagBg: "bg-emerald-50", tagText: "text-emerald-600", shadow: "group-hover:shadow-emerald-500/5" },
  cyan: { bg: "bg-cyan-50/50", text: "text-cyan-600", border: "border-cyan-100", tagBg: "bg-cyan-50", tagText: "text-cyan-600", shadow: "group-hover:shadow-cyan-500/5" },
};

const FrameworksSection = () => (
  <section className="py-28 bg-white relative overflow-hidden">
    {/* Subtle pattern */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `radial-gradient(circle at 15% 50%, rgba(37,99,235,0.04) 0%, transparent 40%), radial-gradient(circle at 85% 50%, rgba(79,70,229,0.04) 0%, transparent 40%)`,
      }}
    />

    <div className="container mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-blue-600 border border-blue-100 bg-blue-50/50 text-xs font-semibold uppercase tracking-widest mb-4">
          Leading Standards Coverage
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Leading AI Standards.{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(90deg, #1e40af, #3b82f6)" }}
          >
            One Sovereign Platform.
          </span>
        </h2>
        <p className="text-slate-500 text-lg max-w-3xl mx-auto leading-relaxed">
          Designed around the world's most rigorous AI governance guidelines. ReguLattice is the self-driving engine that maps your AI system configurations, discovers shadow models, and monitors compliance continuously.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5 max-w-7xl mx-auto">
        {frameworks.map((fw, i) => {
          const c = colorMap[fw.color];
          return (
            <motion.div
              key={fw.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -8, 
                scale: 1.03,
                boxShadow: "0 20px 30px rgba(59, 130, 246, 0.08), 0 4px 12px rgba(0, 0, 0, 0.03)"
              }}
              viewport={{ once: true }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 20,
                delay: i * 0.05 
              }}
              className="rounded-2xl border border-slate-200 bg-white p-6 hover:border-blue-300 hover:shadow-2xl transition-colors group flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300`}>
                    <fw.icon className={`w-6 h-6 ${c.text}`} />
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{fw.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">{fw.desc}</p>
              </div>
              <div className="mt-auto pt-2">
                <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${c.tagBg} ${c.tagText} block text-center transition-all group-hover:brightness-95`}>
                  {fw.tag}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default FrameworksSection;
