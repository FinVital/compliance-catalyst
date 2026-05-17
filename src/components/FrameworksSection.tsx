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
    icon: Lock,
    emoji: "🔐",
    name: "ISO 27001",
    desc: "Information Security Management — the global gold standard for enterprise security compliance.",
    tag: "Security",
    color: "teal",
  },
  {
    icon: Bot,
    emoji: "🤖",
    name: "ISO 42001",
    desc: "AI Governance — structural guidelines for managing safe and responsible AI system deployments.",
    tag: "AI Governance",
    color: "indigo",
  },
  {
    icon: Shield,
    emoji: "🛡️",
    name: "NIST CSF 2.0",
    desc: "Cybersecurity Framework — standard protocols for assessing and mitigating infrastructure risks.",
    tag: "Cybersecurity",
    color: "rose",
  },
  {
    icon: CheckCircle2,
    emoji: "✅",
    name: "SOC 2",
    desc: "Service Controls — thorough trust procedures ensuring customer data security and privacy.",
    tag: "Operations",
    color: "emerald",
  },
  {
    icon: CreditCard,
    emoji: "💳",
    name: "PCI-DSS",
    desc: "Payment Security — robust standards for storing and processing cardholder transaction data safely.",
    tag: "Payments",
    color: "amber",
  },
  {
    icon: HeartPulse,
    emoji: "🏥",
    name: "HIPAA",
    desc: "Healthcare Privacy — mandatory safeguards protecting sensitive medical records and health data.",
    tag: "Healthcare",
    color: "pink",
  },
  {
    icon: Landmark,
    emoji: "🏦",
    name: "GLBA",
    desc: "Financial Data Protection — strict consumer privacy acts for financial services firms.",
    tag: "Finance",
    color: "cyan",
  },
  {
    icon: Coins,
    emoji: "💱",
    name: "ISO 20022",
    desc: "Financial Messaging — advanced schemas for reliable, frictionless global payment messaging.",
    tag: "Messaging",
    color: "violet",
  },
  {
    icon: Globe,
    emoji: "🇸🇦",
    name: "SAMA",
    desc: "Saudi Central Bank — comprehensive cybersecurity framework mandated for financial institutions in KSA.",
    tag: "MENA Regional",
    color: "green",
  },
  {
    icon: Scale,
    emoji: "🇵🇰",
    name: "SECP",
    desc: "Pakistan Securities — state-level compliance mandates and securities readiness for corporates.",
    tag: "South Asia Regional",
    color: "lime",
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; tagBg: string; tagText: string; shadow: string }> = {
  teal: { bg: "bg-teal-500/10", text: "text-teal-400", border: "border-teal-500/20", tagBg: "bg-teal-500/15", tagText: "text-teal-400", shadow: "group-hover:shadow-teal-500/10" },
  indigo: { bg: "bg-indigo-500/10", text: "text-indigo-400", border: "border-indigo-500/20", tagBg: "bg-indigo-500/15", tagText: "text-indigo-400", shadow: "group-hover:shadow-indigo-500/10" },
  rose: { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/20", tagBg: "bg-rose-500/15", tagText: "text-rose-400", shadow: "group-hover:shadow-rose-500/10" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", tagBg: "bg-emerald-500/15", tagText: "text-emerald-400", shadow: "group-hover:shadow-emerald-500/10" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20", tagBg: "bg-amber-500/15", tagText: "text-amber-400", shadow: "group-hover:shadow-amber-500/10" },
  pink: { bg: "bg-pink-500/10", text: "text-pink-400", border: "border-pink-500/20", tagBg: "bg-pink-500/15", tagText: "text-pink-400", shadow: "group-hover:shadow-pink-500/10" },
  cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20", tagBg: "bg-cyan-500/15", tagText: "text-cyan-400", shadow: "group-hover:shadow-cyan-500/10" },
  violet: { bg: "bg-violet-500/10", text: "text-violet-400", border: "border-violet-500/20", tagBg: "bg-violet-500/15", tagText: "text-violet-400", shadow: "group-hover:shadow-violet-500/10" },
  green: { bg: "bg-green-500/10", text: "text-green-400", border: "border-green-500/20", tagBg: "bg-green-500/15", tagText: "text-green-400", shadow: "group-hover:shadow-green-500/10" },
  lime: { bg: "bg-lime-500/10", text: "text-lime-400", border: "border-lime-500/20", tagBg: "bg-lime-500/15", tagText: "text-lime-400", shadow: "group-hover:shadow-lime-500/10" },
};

const FrameworksSection = () => (
  <section className="py-28 bg-slate-900 relative overflow-hidden">
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

    <div className="container mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-semibold uppercase tracking-widest mb-4">
          Complete Compliance Stack
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          10 Frameworks.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-300 to-teal-400">
            One Autonomous Engine.
          </span>
        </h2>
        <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
          Not a checklist. Not a consultant. ReguLattice is the self-driving GRC engine that maps your evidence, monitors your posture, and keeps you ready globally—across every framework your business operates under.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5 max-w-7xl mx-auto">
        {frameworks.map((fw, i) => {
          const c = colorMap[fw.color];
          return (
            <motion.div
              key={fw.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-2xl border border-slate-700/50 bg-slate-800/40 backdrop-blur-sm p-6 hover:border-slate-500/40 hover:bg-slate-800/80 transition-all group flex flex-col justify-between hover:${c.shadow}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center`}>
                    <fw.icon className={`w-6 h-6 ${c.text}`} />
                  </div>
                  <span className="text-lg">{fw.emoji}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{fw.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{fw.desc}</p>
              </div>
              <div className="mt-auto pt-2">
                <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${c.tagBg} ${c.tagText} block text-center`}>
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
