import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Map, Activity, Wrench, FileText, ShieldCheck, CheckCircle } from "lucide-react";

const tabs = [
  {
    id: "discover", label: "Discover AI", icon: Map,
    title: "Autonomous AI System Discovery",
    description: "Intelligent AI agents automatically scan your software codebases, model registries, cloud infrastructure, and APIs to map and discover all active AI models and data pipelines, identifying shadow AI deployments instantly.",
    highlights: ["Automatic model registry mapping", "API & data pipeline detection", "Shadow AI discovery"],
  },
  {
    id: "risk", label: "Assess Risk", icon: Wrench,
    title: "Dynamic Governance Risk Assessment",
    description: "Identify compliance gaps, evaluate potential model biases, track data privacy leaks, and assess safety hazards across your model footprint with automated risk assessments mapped directly to regulation.",
    highlights: ["Automated bias & safety checks", "Regulation-mapped risk scores", "Prioritized mitigation suggestions"],
  },
  {
    id: "policy", label: "Generate Policies", icon: FileText,
    title: "AI Policy & Documentation Generator",
    description: "Automatically draft custom AI governance policies, system descriptions, data usage guidelines, and detailed model cards required by regulations with zero manual typing.",
    highlights: ["Automated custom policy drafting", "Audit-ready model card generation", "Standardized system descriptions"],
  },
  {
    id: "impact", label: "Impact Assessments", icon: ShieldCheck,
    title: "AI & Algorithmic Impact Assessments",
    description: "Perform automated AI Impact Assessments (AIA) tailored to high-risk AI definitions, testing model behavior and compliance inputs against current global standards.",
    highlights: ["Algorithmic Impact Assessments (AIA)", "High-risk system categorization", "Compliance readiness scoring"],
  },
  {
    id: "monitor", label: "Continuous Monitoring", icon: Activity,
    title: "Continuous Compliance Monitoring",
    description: "Track compliance activities and live model alignment in real-time. Our system continuously monitors model configurations, training datasets, and outputs, alerting you immediately to drift or policy violations.",
    highlights: ["Live compliance pulse graph", "Real-time drift & policy alerts", "Always-on audit trail logs"],
  },
];

const FeaturesSection = () => {
  const [active, setActive] = useState(0);
  return (
    <section className="py-24" style={{ background: "#f4f4ef" }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <div className="ca-badge mb-4">Platform Capabilities</div>
          <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: "#141927", letterSpacing: "-0.03em" }}>
            Responsible AI Governance on a Single Platform
          </h2>
          <p className="text-lg max-w-2xl" style={{ color: "#5e6278" }}>
            Five core pillars designed to discover, document, and monitor AI systems autonomously.
          </p>
        </motion.div>

        {/* Tab buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${active === i ? "text-white" : "text-gray-600 bg-white border border-gray-200 hover:border-gray-300"}`}
              style={active === i ? { background: "#141927" } : {}}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden"
            style={{ border: "1px solid #e2e2dc" }}
          >
            {/* Left: text */}
            <div className="p-8 md:p-12 bg-white flex flex-col justify-center">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: "rgba(62,207,178,0.1)" }}>
                {(() => { const Icon = tabs[active].icon; return <Icon className="w-6 h-6" style={{ color: "#3ecfb2" }} />; })()}
              </div>
              <h3 className="text-2xl font-black mb-4" style={{ color: "#141927", letterSpacing: "-0.02em" }}>{tabs[active].title}</h3>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#5e6278" }}>{tabs[active].description}</p>
              <ul className="space-y-3">
                {tabs[active].highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 shrink-0" style={{ color: "#3ecfb2" }} />
                    <span className="text-sm font-medium" style={{ color: "#141927" }}>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Right: visual */}
            <div className="p-8 md:p-12 flex flex-col justify-center" style={{ background: "#141927" }}>
              <div className="space-y-3">
                {tabs[active].highlights.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl"
                    style={{ background: "rgba(62,207,178,0.08)", border: "1px solid rgba(62,207,178,0.15)" }}
                  >
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ background: "#3ecfb2" }} />
                    <span className="text-sm font-medium text-white">{h}</span>
                  </motion.div>
                ))}
                <div className="mt-6 p-4 rounded-xl" style={{ background: "rgba(245,166,35,0.06)", border: "1px solid rgba(245,166,35,0.15)" }}>
                  <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#f5a623" }}>AI Status</div>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#3ecfb2" }}></span>
                      <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#3ecfb2" }}></span>
                    </span>
                    <span className="text-sm text-white font-medium">Agents running — 24/7 autonomous mode</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FeaturesSection;
