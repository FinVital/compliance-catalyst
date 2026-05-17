import { motion } from "framer-motion";
import { Upload, Cpu, ShieldCheck } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Upload,
    title: "Connect & Import",
    desc: "Link your cloud infrastructure, upload existing policies, and define your compliance scope. Our AI ingests everything in minutes.",
  },
  {
    num: "02",
    icon: Cpu,
    title: "AI Maps & Remediates",
    desc: "Autonomous agents map controls, collect evidence, generate policies, and close gaps across all active frameworks — continuously.",
  },
  {
    num: "03",
    icon: ShieldCheck,
    title: "Stay Audit-Ready",
    desc: "Monitor your live Compliance Graph, export audit-ready reports, and run mock audits. When the auditor arrives, you're already done.",
  },
];

const HowItWorks = () => (
  <section className="py-28 bg-slate-900 relative overflow-hidden">
    {/* Gradient accent */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

    <div className="container mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-semibold uppercase tracking-widest mb-4">
          How It Works
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          Three Steps to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">
            Continuous Compliance
          </span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
        {/* Connecting line */}
        <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-px bg-gradient-to-r from-teal-500/30 via-teal-500/50 to-teal-500/30" />

        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="text-center relative"
          >
            <div className="relative mx-auto mb-6">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700/50 flex items-center justify-center mx-auto relative z-10">
                <s.icon className="w-7 h-7 text-teal-400" />
              </div>
              <div className="absolute -top-2 -right-2 w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center text-[11px] font-bold text-white z-20">
                {s.num}
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
