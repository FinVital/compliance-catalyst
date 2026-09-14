import { motion } from "framer-motion";
import { 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  ShieldAlert, 
  Lock, 
  Cpu, 
  FileSpreadsheet, 
  Users, 
  Terminal,
  FileCheck
} from "lucide-react";

const problems = [
  {
    icon: Terminal,
    title: "Unchecked Velocity",
    desc: "Engineering teams deploy large models and internal agents faster than corporate governance and security policies adapt.",
  },
  {
    icon: ShieldAlert,
    title: "Shadow Software",
    desc: "Employees integrate unvetted SaaS copilots, public LLM tabs, and external web APIs without IT or compliance oversight.",
  },
  {
    icon: Users,
    title: "Fragmented Ownership",
    desc: "Responsibility for AI risk is split across HR, Legal, InfoSec, and Compliance departments with no single ground truth.",
  },
  {
    icon: FileSpreadsheet,
    title: "Outdated Spreadsheets",
    desc: "Manual compliance tracking produces stale documentation that immediately fails formal audit inspection and statutory reviews.",
  },
];

const solutions = [
  {
    phase: "PHASE 01",
    title: "Zero-Touch Cataloging",
    desc: "Detects and catalogs all active AI tools, host assets, internal scripts, and third-party vendor integrations automatically.",
  },
  {
    phase: "PHASE 02",
    title: "Dual Model Router Split",
    desc: "Directs internal reasoning to local host Ollama models (zero data egress) while probing and auditing hosted third-party endpoints.",
  },
  {
    phase: "PHASE 03",
    title: "Continuous Telemetry Tracking",
    desc: "Logs empirical validation continuously with dynamic decay metrics (0-100% freshness score with TTL expiration handling).",
  },
  {
    phase: "PHASE 04",
    title: "Runtime Enforcement Gateway",
    desc: "Applies policy decisions in real-time: ALLOW (low risk), SIGN_OFF (human review queue), or BLOCK (policy breach).",
  },
];

const ProblemSolutionSection = () => {
  return (
    <section className="py-24 bg-[#F0F6F8] border-b border-slate-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <div className="ca-badge mb-4 mx-auto">
            The Governance Gap & Operational Control
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-serif mb-4">
            Accelerated Adoption Creates Blindspots. <br />
            <span className="text-[#00A896] italic font-serif">ReguLattice Provides Total Control.</span>
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Ungrounded LLM outputs create binding corporate liabilities while confidential data leaks to public endpoints. Here is how we fix it.
          </p>
        </motion.div>

        {/* 2-Column Split: Problem vs Solution */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Column: The Problem */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="outlined_card bg-white border-rose-200/60 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="p-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-200">
                  <AlertTriangle className="w-5 h-5" />
                </span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-600">
                  THE PROBLEM — CRITICAL RISK
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-6 font-serif">
                4 Industry Pain Points Driving Legal Exposure
              </h3>

              <div className="space-y-4">
                {problems.map((p, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5">
                    <div className="p-2 rounded-lg bg-white border border-slate-200 shrink-0 text-slate-700">
                      <p.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 font-sans mb-0.5">{p.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-rose-600">
              <span>OPERATIONAL IMPACT:</span>
              <span className="font-bold">UNGROUNDED OUTPUTS & DATA LEAKS</span>
            </div>
          </motion.div>

          {/* Right Column: The Solution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="filled_card bg-[#09141D] text-white border-[#1E3447] flex flex-col justify-between dark-lattice-grid-bg"
          >
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="p-2 rounded-xl bg-[#00F2C8]/10 text-[#00F2C8] border border-[#00F2C8]/30">
                  <CheckCircle2 className="w-5 h-5" />
                </span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00F2C8]">
                  THE SOLUTION — END-TO-END PIPELINE
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-6 font-serif">
                4-Phase Execution Pipeline
              </h3>

              <div className="space-y-4">
                {solutions.map((s, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3.5">
                    <span className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-[#00F2C8]/10 text-[#00F2C8] border border-[#00F2C8]/30 shrink-0">
                      {s.phase}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white font-sans mb-0.5">{s.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-mono">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-[#00F2C8]">
              <span>TARGET OUTCOME:</span>
              <span className="font-bold">ACTIVE, VERIFIED MATRIX</span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default ProblemSolutionSection;
