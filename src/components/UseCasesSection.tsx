import { motion } from "framer-motion";
import { Briefcase, Handshake, ShieldCheck, ArrowRight, AlertTriangle, CheckCircle2 } from "lucide-react";

const useCases = [
  {
    icon: Briefcase,
    title: "vCISO & GRC Consultants",
    badge: "Consultant Force Multiplier",
    problem: "Consultants spend 80% of their billing hours manually requesting screenshots, chasing down client stakeholders, and copying text into static spreadsheets.",
    solution: "Manage 15+ clients from a single white-labeled GRC command center. ReguLattice autonomously maps client infrastructure, highlights gaps, and auto-generates policy templates, letting you focus on high-margin strategic advisory.",
  },
  {
    icon: Handshake,
    title: "Fintechs & High-Growth Startups",
    badge: "Enterprise Sales Accelerator",
    problem: "Landing a major enterprise bank or financial contract stalls for weeks when the buyer's procurement team dumps a grueling 400-question compliance spreadsheet.",
    solution: "Drop the questionnaire into ReguLattice. The AI engine cross-references your live evidence, auto-fills the document in minutes, and generates an audit-ready pack showing your active ISO 27001, SOC 2, and SAMA posture, cutting sales cycles by 10x.",
  },
  {
    icon: ShieldCheck,
    title: "Auditors & Compliance Officers",
    badge: "Frictionless Auditing",
    problem: "The annual certification audit is a high-stress scramble of screenshot gathering, sample testing, and developer interviews, draining weeks of engineering time.",
    solution: "Provide your external auditor with a read-only secure dashboard to your live Compliance Graph. Auditors can inspect automatically logged evidence trails, verify control mappings, and approve samples directly, turning weeks of chaos into a 2-hour sign-off.",
  },
];

const UseCasesSection = () => (
  <section className="py-28 bg-slate-900 relative overflow-hidden">
    {/* Animated background styling */}
    <div className="absolute inset-0 pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 15% 85%, hsl(160 84% 39% / 0.04) 0%, transparent 45%), radial-gradient(circle at 85% 15%, hsl(210 100% 56% / 0.04) 0%, transparent 45%)`,
        }}
      />
      {/* Dashed background lines */}
      <svg className="absolute inset-0 w-full h-full opacity-40" preserveAspectRatio="none">
        <path d="M0,50 Q250,10 500,50 T1000,50" fill="none" stroke="rgba(13, 148, 136, 0.08)" strokeWidth="2" strokeDasharray="10 6" vectorEffect="non-scaling-stroke">
          <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="4s" repeatCount="indefinite" />
        </path>
        <path d="M0,80 Q300,40 600,80 T1200,80" fill="none" stroke="rgba(99, 102, 241, 0.06)" strokeWidth="1.5" strokeDasharray="8 8" vectorEffect="non-scaling-stroke">
          <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="5s" repeatCount="indefinite" />
        </path>
      </svg>
    </div>

    <div className="container mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-semibold uppercase tracking-widest mb-4">
          Real-World Applications
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Real-World Scenarios Where{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-300 to-teal-400">
            ReguLattice Delivers Value
          </span>
        </h2>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          How our autonomous engine eliminates compliance bottlenecks for every stakeholder.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {useCases.map((uc, i) => (
          <motion.div
            key={uc.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="rounded-2xl border border-slate-700/50 bg-slate-800/40 backdrop-blur-sm overflow-hidden hover:border-slate-500/40 hover:bg-slate-800/60 hover:shadow-[0_0_30px_rgba(13,148,136,0.1)] transition-all flex flex-col justify-between"
          >
            {/* Header */}
            <div className="bg-slate-800/80 p-6 flex items-center gap-4 border-b border-slate-700/50">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center flex-shrink-0">
                <uc.icon className="w-6 h-6 text-teal-400" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-teal-400 font-bold bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">{uc.badge}</span>
                <h3 className="text-lg font-bold text-white mt-1.5">{uc.title}</h3>
              </div>
            </div>

            <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
              {/* Problem */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-400 font-mono">The Friction Point</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{uc.problem}</p>
              </div>

              {/* Transition Indicator */}
              <div className="flex justify-center my-2">
                <ArrowRight className="w-5 h-5 text-teal-400 rotate-90 opacity-60" />
              </div>

              {/* Solution */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">The Autonomous Solution</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{uc.solution}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default UseCasesSection;
