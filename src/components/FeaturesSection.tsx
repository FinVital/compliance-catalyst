import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Map, Activity, Wrench, FileText, ShieldCheck } from "lucide-react";

const tabs = [
  {
    id: "map",
    label: "Map Controls",
    icon: Map,
    title: "Intelligent Control Mapping",
    description:
      "AI agents automatically map your existing infrastructure against ISO 27001, ISO 42001, NIST CSF 2.0, SOC 2, SAMA, and SECP controls. No spreadsheets, no guesswork — just precise, gap-aware mapping across 10 frameworks simultaneously.",
    highlights: ["Auto-detect controls across 10 frameworks", "Multi-framework parallel mapping", "Real-time gap identification"],
  },
  {
    id: "monitor",
    label: "Monitor",
    icon: Activity,
    title: "Continuous Compliance Monitoring",
    description:
      "The Compliance Graph gives you a live pulse on your security posture. Track structural readiness, AI-adjusted scores, coverage percentages, and vendor compliance — all updating in real time as your organization evolves.",
    highlights: ["Live Compliance Graph dashboard", "AI-adjusted risk scoring", "Vendor & asset tracking"],
  },
  {
    id: "remediate",
    label: "Auto-Remediate",
    icon: Wrench,
    title: "AI-Powered Auto-Remediation",
    description:
      "Stop triaging manually. Our AI agents surface prioritized actions, identify protection gaps, and suggest one-click fixes. From drafting access control policies to configuring AWS CloudTrail — remediation happens autonomously.",
    highlights: ["AI Priorities & Protection Gaps", "One-click remediation actions", "Auto-generated policy drafts"],
  },
  {
    id: "report",
    label: "Generate Reports",
    icon: FileText,
    title: "AI-Generated Audit Reports",
    description:
      "From Evidence Summaries to Privacy Impact Assessments, generate comprehensive audit-ready reports with a single click. Each report is mapped to your active standards and exportable for auditor review.",
    highlights: ["Risk & Gap Analysis reports", "Executive Compliance Summary", "Data Transfer Impact reports"],
  },
  {
    id: "audit",
    label: "Audit Ready",
    icon: ShieldCheck,
    title: "Always Audit-Ready",
    description:
      "Mock audits simulate real auditor interviews. The Audit Readiness Checklist ensures documentation, evidence, and team preparedness are always current. When the auditor arrives, you're already done.",
    highlights: ["AI Mock Audit simulations", "Evidence confidence scoring", "Certification readiness tracker"],
  },
];

const FeaturesSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-28 bg-slate-900 relative overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(13,148,136,0.04) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-semibold uppercase tracking-widest mb-4">
            Platform Capabilities
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Your Entire Compliance Lifecycle.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">
              Automated.
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Five core pillars that take you from zero to audit-ready with autonomous AI agents.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === i
                  ? "bg-teal-600 text-white shadow-[0_0_20px_rgba(13,148,136,0.3)]"
                  : "bg-slate-800/60 text-slate-400 border border-slate-700/50 hover:bg-slate-800 hover:text-slate-300"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl border border-slate-700/50 bg-slate-800/40 backdrop-blur-xl p-8 md:p-12"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-teal-600/15 border border-teal-500/20 flex items-center justify-center shrink-0">
                  {(() => {
                    const Icon = tabs[activeTab].icon;
                    return <Icon className="w-8 h-8 text-teal-400" />;
                  })()}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {tabs[activeTab].title}
                  </h3>
                  <p className="text-slate-400 text-lg leading-relaxed mb-6">
                    {tabs[activeTab].description}
                  </p>
                  <ul className="space-y-3">
                    {tabs[activeTab].highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                        <span className="text-sm font-medium">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tab indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {tabs.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                activeTab === i ? "bg-teal-400 w-6" : "bg-slate-700"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
