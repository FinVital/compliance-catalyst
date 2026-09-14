import { motion } from "framer-motion";
import { 
  Search, 
  Tag, 
  Sliders, 
  Database, 
  Activity, 
  Lock, 
  FileText,
  ShieldCheck,
  Zap,
  CheckCircle2
} from "lucide-react";

const agents = [
  {
    code: "01",
    id: "DISCOVERY",
    title: "Discovery Agent",
    icon: Search,
    color: "#0EA5E9",
    bg: "rgba(14, 165, 233, 0.08)",
    border: "rgba(14, 165, 233, 0.25)",
    desc: "Scans endpoints, local dev ports, and connectors to discover unmapped shadow AI assets and copilot scripts.",
    metric: "100% Endpoint Scan",
  },
  {
    code: "02",
    id: "CLASSIFICATION",
    title: "Classification Agent",
    icon: Tag,
    color: "#8B5CF6",
    bg: "rgba(139, 92, 246, 0.08)",
    border: "rgba(139, 92, 246, 0.25)",
    desc: "Auto-assigns EU regulatory risk tiers, data sensitivity levels, and system inventory tags across active models.",
    metric: "Auto Risk Tagging",
  },
  {
    code: "03",
    id: "CONTROL",
    title: "Control Agent",
    icon: Sliders,
    color: "#059669",
    bg: "rgba(5, 150, 105, 0.08)",
    border: "rgba(5, 150, 105, 0.25)",
    desc: "Maps system parameters continuously across ISO 42001, EU AI Act, and corporate security guidelines.",
    metric: "Multi-Standard Crosswalk",
  },
  {
    code: "04",
    id: "EVIDENCE",
    title: "Evidence Agent",
    icon: Database,
    color: "#D97706",
    bg: "rgba(217, 119, 6, 0.08)",
    border: "rgba(217, 119, 6, 0.25)",
    desc: "Captures empirical telemetry, calculates real-time freshness scores (0–100%), and handles TTL expiration logs.",
    metric: "Freshness Ledger",
  },
  {
    code: "05",
    id: "MONITORING",
    title: "Monitoring Agent",
    icon: Activity,
    color: "#00A896",
    bg: "rgba(0, 168, 150, 0.08)",
    border: "rgba(0, 168, 150, 0.25)",
    desc: "Detects model drift, policy exceptions, stale proof decay, and hallucination signals in live reasoning output.",
    metric: "Hallucination Alerts",
  },
  {
    code: "06",
    id: "AUTHORITY",
    title: "Authority Agent",
    icon: Lock,
    color: "#E11D48",
    bg: "rgba(225, 29, 72, 0.08)",
    border: "rgba(225, 29, 72, 0.25)",
    desc: "Manages decision gateway queues (ALLOW / SIGN_OFF / BLOCK), boundary rules, and reversibility matrices.",
    metric: "Human Sign-off Queue",
  },
  {
    code: "07",
    id: "ASSURANCE",
    title: "Assurance Agent",
    icon: FileText,
    color: "#2563EB",
    bg: "rgba(37, 99, 235, 0.08)",
    border: "rgba(37, 99, 235, 0.25)",
    desc: "Assembles audit-ready technical dossiers, system model cards, and certified compliance crosswalk packs.",
    metric: "1-Click Dossiers",
  },
];

const SevenAgentsSection = () => {
  return (
    <section className="py-24 bg-[#F0F6F8] border-b border-slate-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-left"
        >
          <div className="ca-badge mb-4">
            <Zap className="w-3.5 h-3.5 text-[#00A896]" />
            Multi-Agent Execution Framework
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-serif mb-4">
            Seven Autonomous Agents. <br />
            <span className="text-[#00A896] italic font-serif">One Unified Governance Loop.</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl leading-relaxed">
            Our multi-agent architecture operates continuously across your entire AI estate. High-impact authorizations remain strictly under named human sign-off.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {agents.map((agent, i) => {
            const Icon = agent.icon;
            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="outlined_card bg-white flex flex-col justify-between group hover:border-slate-300"
              >
                <div>
                  {/* Top Row */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border transition-transform duration-200 group-hover:scale-105"
                      style={{ background: agent.bg, borderColor: agent.border }}
                    >
                      <Icon className="w-5 h-5" style={{ color: agent.color }} />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {agent.code}
                    </span>
                  </div>

                  {/* ID Tag */}
                  <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase mb-3 text-slate-700 bg-slate-100 border border-slate-200">
                    AGENT::{agent.id}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2 font-serif">
                    {agent.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {agent.desc}
                  </p>
                </div>

                {/* Metric footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">Capability</span>
                  <span className="font-bold" style={{ color: agent.color }}>
                    {agent.metric}
                  </span>
                </div>
              </motion.div>
            );
          })}

          {/* Special Feature Highlight Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="outlined_card bg-[#09141D] text-white border-[#1E3447] flex flex-col justify-between md:col-span-2 lg:col-span-1 dark-lattice-grid-bg"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="w-5 h-5 text-[#00F2C8]" />
                <span className="text-xs font-mono font-bold text-[#00F2C8]">HUMAN-IN-THE-LOOP</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-serif">
                Strict Governance Principle
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                High-risk actions, policy overrides, and binding model deployments require named human approval through the decision gateway queue.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-[#00F2C8]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00F2C8]" />
                <span>Zero Autonomous Drift</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default SevenAgentsSection;
