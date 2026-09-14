import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  ShieldCheck, 
  Cpu, 
  FileCheck2, 
  AlertOctagon,
  CheckCircle2,
  Terminal,
  Activity,
  Server
} from "lucide-react";

const consoleModules = [
  {
    id: "dashboard",
    title: "Executive Dashboard",
    icon: LayoutDashboard,
    badge: "HEALTH INDEX 98.4%",
    tagline: "Real-time workspace health index, open remediation items, and active agent status.",
    details: [
      { label: "Active Workspace Health", val: "98.4% Compliant" },
      { label: "Open Remediation Items", val: "2 Minor Flags" },
      { label: "Active Autonomous Agents", val: "7/7 Operational" },
      { label: "Endpoint Coverage", val: "100% Monitored" },
    ],
    codeSnippet: `GET /api/v1/workspace/health
RESPONSE: {
  "status": "HEALTHY",
  "freshness_decay": "0.02%",
  "active_agents": ["DISCOVERY", "CLASSIFICATION", "CONTROL", "EVIDENCE", "MONITORING", "AUTHORITY", "ASSURANCE"],
  "open_findings": 2
}`,
  },
  {
    id: "controls",
    title: "Controls Hub",
    icon: ShieldCheck,
    badge: "CROSSWALK MATRIX",
    tagline: "Multi-standard crosswalk mapping parameters live across ISO 42001 & EU AI Act.",
    details: [
      { label: "ISO/IEC 42001 Clause 6.1", val: "Fully Mapped" },
      { label: "EU AI Act Article 14", val: "Human-in-Loop Active" },
      { label: "Proof Decay Metric", val: "Fresh (TTL 30 Days)" },
      { label: "Evidence Telemetry", val: "Empirical & Signed" },
    ],
    codeSnippet: `POLICY_ENFORCE --framework ISO42001 --control A.6.1.2
RESULT: [PASS] Evidence telemetry captured at 2026-09-07T12:00:00Z
TTL: 2592000s (Freshness: 100%)`,
  },
  {
    id: "architecture",
    title: "Architecture Console",
    icon: Cpu,
    badge: "LOCAL OLLAMA CASCADE",
    tagline: "Local Ollama routing cascade versus hosted cloud endpoints for maximum data residency.",
    details: [
      { label: "Local Host Reasoning", val: "sage-reasoning:3b" },
      { label: "Fast Classification", val: "qwen2.5:3b" },
      { label: "General Inference", val: "llama3.1:latest" },
      { label: "Multimodal Vision", val: "qwen2.5vl:3b" },
    ],
    codeSnippet: `ROUTER_SPLIT:
├─ [AIR-GAPPED] Local Host Ollama (qwen2.5:3b) -> 0 Bytes Egress
└─ [MONITORED] Cloud API -> Audited & Guardrailed (DGR Gated)`,
  },
  {
    id: "hallucination",
    title: "Hallucination Evaluator",
    icon: FileCheck2,
    badge: "CLAIM-TESTING SUITE",
    tagline: "Automated claim-testing suite detecting ungrounded output commitments before deployment.",
    details: [
      { label: "Grounding Accuracy", val: "99.2% Verified" },
      { label: "Ungrounded Commitments", val: "0 Detected" },
      { label: "Factuality Checker", val: "Vector DB Grounded" },
      { label: "Hallucination Score", val: "0.008 (Pass)" },
    ],
    codeSnippet: `EVALUATE_OUTPUT --input "Model Response #8491"
STATUS: GROUNDED
CLAIM_TEST: 14 facts verified against corporate RAG vectors.
HAL_RISK: ZERO_COMMITMENT_EXPOSURE`,
  },
  {
    id: "risk",
    title: "Risk Register",
    icon: AlertOctagon,
    badge: "AUTOMATED TREATMENT",
    tagline: "Inherent versus residual risk scoring paired with automated treatment tasks and owner queues.",
    details: [
      { label: "Inherent Risk Score", val: "High (8.4/10)" },
      { label: "Residual Risk Score", val: "Low (1.8/10)" },
      { label: "Treatment Workflow", val: "Auto-Assigned" },
      { label: "Auditor Sign-Off", val: "Verified by CISO" },
    ],
    codeSnippet: `RISK_MATRIX:
  Inherent:  8.4/10 (High - Unvetted API call)
  Treatment: [ENFORCED] DGR Sign-off required
  Residual:  1.8/10 (Low - Approved)`,
  },
];

const CommandCenterModules = () => {
  const [activeTab, setActiveTab] = useState(0);
  const current = consoleModules[activeTab];

  return (
    <section className="py-24 bg-[#09141D] text-white relative border-b border-[#1E3447] dark-lattice-grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[#00F2C8] border border-[#00F2C8]/30 bg-[#00F2C8]/10 text-xs font-mono font-semibold uppercase tracking-widest mb-4">
            <Activity className="w-3.5 h-3.5" />
            PRODUCT DEMONSTRATION
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white font-serif mb-4">
            Integrated Command Center Console
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
            Explore live platform modules engineered to give CISOs, risk directors, and legal counsel full visibility into their AI estates.
          </p>
        </motion.div>

        {/* Console Module Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-800 pb-4">
          {consoleModules.map((mod, i) => {
            const Icon = mod.icon;
            const isActive = activeTab === i;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#112231] text-[#00F2C8] border border-[#00F2C8]/50 shadow-[0_0_15px_rgba(0,242,200,0.15)]"
                    : "bg-slate-900/60 text-slate-400 border border-slate-800 hover:bg-slate-900 hover:text-slate-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{mod.title}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid lg:grid-cols-12 gap-6 items-stretch"
          >
            {/* Left Box: Module Overview & Key Metrics */}
            <div className="lg:col-span-6 p-8 rounded-2xl bg-[#112231] border border-[#1E3447] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#00F2C8] bg-[#00F2C8]/10 border border-[#00F2C8]/30 px-2.5 py-1 rounded-full">
                    {current.badge}
                  </span>
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <span className="live-dot" />
                    <span>Live Console Module</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 font-serif">
                  {current.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6 font-sans">
                  {current.tagline}
                </p>

                {/* Key Metrics Grid */}
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {current.details.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                      <span className="text-[10px] font-mono text-slate-400 block mb-1">{item.label}</span>
                      <span className="text-xs font-mono font-bold text-[#00F2C8]">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center gap-2 text-xs font-mono text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-[#00F2C8]" />
                <span>Verified with Dynamic Freshness Ledger</span>
              </div>
            </div>

            {/* Right Box: Live Code Telemetry Terminal */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#00F2C8]" />
                    <span className="text-slate-400 font-bold">TELEMETRY STREAM :: {current.id.toUpperCase()}</span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                </div>

                <pre className="p-4 rounded-xl bg-black/60 border border-slate-800/80 text-[#00F2C8] overflow-x-auto whitespace-pre-wrap leading-relaxed">
                  {current.codeSnippet}
                </pre>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-500">
                <span>Ollama Cascade Host: Active</span>
                <span className="text-[#0EA5E9]">Zero Data Transmission Logged</span>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default CommandCenterModules;
