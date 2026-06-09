import { motion } from "framer-motion";
import { Upload, Cpu, ShieldCheck } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Upload,
    title: "Connect & Import",
    desc: "Link your cloud infrastructure, upload existing policies, and define your compliance scope. Our AI ingests everything in minutes — AWS, Azure, GCP, Jira, GitHub, and 10+ more.",
    tag: "Onboarding",
  },
  {
    num: "02",
    icon: Cpu,
    title: "AI Maps & Remediates",
    desc: "Autonomous agents map controls, collect evidence, generate policies, and close gaps across all active frameworks — running continuously without human intervention.",
    tag: "Automation",
  },
  {
    num: "03",
    icon: ShieldCheck,
    title: "Stay Audit-Ready",
    desc: "Monitor your live Compliance Graph, export audit-ready reports for any framework, and run AI mock audits. When your auditor arrives, you're already done.",
    tag: "Certification",
  },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-24" style={{ background: "#141927" }}>
    <div className="max-w-6xl mx-auto px-6">
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
        <div className="ca-badge mb-4">How It Works</div>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ letterSpacing: "-0.03em" }}>
          Three steps to <span className="text-teal-gradient">continuous compliance</span>
        </h2>
        <p className="text-lg max-w-xl" style={{ color: "#8b9ab0" }}>
          From onboarding to audit sign-off — ReguLattice handles every step autonomously.
        </p>
      </motion.div>

      <div className="space-y-4">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group flex flex-col md:flex-row gap-6 p-8 rounded-2xl transition-all duration-300 cursor-default hover:scale-[1.01]"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            {/* Step number */}
            <div className="text-7xl font-black shrink-0 leading-none select-none" style={{ color: "rgba(62,207,178,0.12)", fontVariantNumeric: "tabular-nums" }}>
              {s.num}
            </div>

            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 self-start" style={{ background: "rgba(62,207,178,0.1)", border: "1px solid rgba(62,207,178,0.2)" }}>
              <s.icon className="w-7 h-7" style={{ color: "#3ecfb2" }} />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-xl font-bold text-white">{s.title}</h3>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded" style={{ background: "rgba(245,166,35,0.12)", color: "#f5a623" }}>
                  {s.tag}
                </span>
              </div>
              <p className="text-base leading-relaxed" style={{ color: "#8b9ab0" }}>{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
