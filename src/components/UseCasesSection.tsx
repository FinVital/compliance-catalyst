import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, Handshake, ShieldCheck, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";

// Local backup defaults in case database is loading/unavailable
const defaultUseCases = [
  {
    card_key: "vciso",
    title: "AI Product Managers & Devs",
    badge: "Safety & Documentation Accelerator",
    problem: "Engineering teams spend days manually writing model cards, system descriptions, and filling out compliance logs before deploying new AI models.",
    solution: "ReguLattice autonomously scans repositories, model registries, and datasets to auto-generate comprehensive system documentation and model cards, cutting time-to-deployment by 10x.",
  },
  {
    card_key: "fintech",
    title: "Risk & Compliance Officers",
    badge: "Autonomous AI Risk Management",
    problem: "With evolving AI standards like ISO 42001 and the EU AI Act, risk officers struggle to manually assess model bias, safety issues, and data privacy risks.",
    solution: "Our AI agents perform continuous automated risk and impact assessments, flagging model drift, bias, or regulatory non-compliance in real-time.",
  },
  {
    card_key: "auditor",
    title: "AI Auditors & Consultants",
    badge: "Frictionless Verification",
    problem: "Preparing for independent AI audits is chaotic, requiring manual tracing of training data, model versions, testing parameters, and compliance logs.",
    solution: "Provide third-party auditors with a read-only dashboard to a secure, automatically logged evidence trail, reducing audit validation times to a few hours.",
  },
];

const iconMap: Record<string, any> = {
  vciso: Briefcase,
  fintech: Handshake,
  auditor: ShieldCheck,
};

const UseCasesSection = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [useCases, setUseCases] = useState(defaultUseCases);

  useEffect(() => {
    fetch("/api/use-cases")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.useCases && data.useCases.length > 0) {
          setUseCases(data.useCases);
        }
      })
      .catch((err) => console.error("Failed to load use cases from Turso DB:", err));
  }, []);

  return (
    <section className="py-28 bg-[#fafbfc] relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `radial-gradient(#e2e8f0 1.5px, transparent 1.5px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-100">
            Real-World Applications
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#0f2e5c] mt-4 mb-4 tracking-tight">
            Built for Every AI Governance Stakeholder
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
            How our autonomous engine eliminates governance bottlenecks across the entire AI ecosystem.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {useCases.map((uc, i) => {
            const isHovered = hoveredIdx === i;
            const isAnyHovered = hoveredIdx !== null;
            const isDimmed = isAnyHovered && !isHovered;
            const IconComponent = iconMap[uc.card_key] || Briefcase;

            return (
              <motion.div
                key={uc.card_key || uc.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                animate={{
                  scale: isHovered ? 1.04 : 1,
                  opacity: isDimmed ? 0.6 : 1,
                  borderColor: isHovered ? "#3b82f6" : "#e2e8f0",
                }}
                className="rounded-3xl border bg-white p-8 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                style={{ 
                  boxShadow: isHovered 
                    ? "0 25px 50px -12px rgba(30, 64, 175, 0.15)" 
                    : "0 4px 20px rgba(15, 46, 92, 0.03)"
                }}
              >
                <div>
                  {/* Header: Unified Clean Styling */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-[10px] uppercase font-extrabold tracking-wider text-blue-600 bg-blue-50/50 border border-blue-100/50 px-2.5 py-1 rounded-md">
                      {uc.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0f2e5c] mb-6">{uc.title}</h3>

                  {/* Problem/Solution split block */}
                  <div className="space-y-4">
                    {/* Traditional Pain */}
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100/80">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-slate-400" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Traditional Pain</span>
                      </div>
                      <p className="text-slate-600 text-xs leading-relaxed">{uc.problem}</p>
                    </div>

                    {/* Arrow Connector */}
                    <div className="flex justify-center py-1">
                      <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-blue-400 rotate-90" />
                      </div>
                    </div>

                    {/* Autonomous Solution */}
                    <div className="p-5 rounded-2xl bg-blue-50/40 border border-blue-100/40">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">The ReguLattice Way</span>
                      </div>
                      <p className="text-slate-700 text-xs leading-relaxed font-medium">{uc.solution}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
