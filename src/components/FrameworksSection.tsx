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
  teal: { bg: "bg-teal-50/50", text: "text-teal-600", border: "border-teal-100", tagBg: "bg-teal-50", tagText: "text-teal-600", shadow: "group-hover:shadow-teal-500/5" },
  indigo: { bg: "bg-indigo-50/50", text: "text-indigo-600", border: "border-indigo-100", tagBg: "bg-indigo-50", tagText: "text-indigo-600", shadow: "group-hover:shadow-indigo-500/5" },
  rose: { bg: "bg-rose-50/50", text: "text-rose-600", border: "border-rose-100", tagBg: "bg-rose-50", tagText: "text-rose-600", shadow: "group-hover:shadow-rose-500/5" },
  emerald: { bg: "bg-emerald-50/50", text: "text-emerald-600", border: "border-emerald-100", tagBg: "bg-emerald-50", tagText: "text-emerald-600", shadow: "group-hover:shadow-emerald-500/5" },
  amber: { bg: "bg-blue-50/50", text: "text-blue-600", border: "border-blue-100", tagBg: "bg-blue-50", tagText: "text-blue-600", shadow: "group-hover:shadow-blue-500/5" },
  pink: { bg: "bg-indigo-50/50", text: "text-indigo-600", border: "border-indigo-100", tagBg: "bg-indigo-50", tagText: "text-indigo-600", shadow: "group-hover:shadow-indigo-500/5" },
  cyan: { bg: "bg-cyan-50/50", text: "text-cyan-600", border: "border-cyan-100", tagBg: "bg-cyan-50", tagText: "text-cyan-600", shadow: "group-hover:shadow-cyan-500/5" },
  violet: { bg: "bg-violet-50/50", text: "text-violet-600", border: "border-violet-100", tagBg: "bg-violet-50", tagText: "text-violet-600", shadow: "group-hover:shadow-violet-500/5" },
  green: { bg: "bg-emerald-50/50", text: "text-emerald-600", border: "border-emerald-100", tagBg: "bg-emerald-50", tagText: "text-emerald-600", shadow: "group-hover:shadow-emerald-500/5" },
  lime: { bg: "bg-blue-50/50", text: "text-blue-600", border: "border-blue-100", tagBg: "bg-blue-50", tagText: "text-blue-600", shadow: "group-hover:shadow-blue-500/5" },
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
          Complete Compliance Stack
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          10 Frameworks.{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(90deg, #1e40af, #3b82f6)" }}
          >
            One Autonomous Engine.
          </span>
        </h2>
        <p className="text-slate-500 text-lg max-w-3xl mx-auto leading-relaxed">
          Not a checklist. Not a consultant. ReguLattice is the self-driving GRC engine that maps your evidence, monitors your posture, and keeps you ready globally — across every framework your business operates under.
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
