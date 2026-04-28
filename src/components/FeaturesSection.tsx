import { motion } from "framer-motion";
import { Gauge, Shield, Lock, Brain, FileCheck, Radar } from "lucide-react";

const FeaturesSection = () => (
  <section className="py-24 relative overflow-hidden bg-white">
    <div className="container mx-auto px-6 relative z-10">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 tracking-tight">
          Everything You Need to Pass Your Next Audit
        </h2>
        <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto">
          Stop managing complex regulatory requirements in spreadsheets. ReguLattice transforms compliance from a manual burden into an automated, continuous process.
        </p>
      </motion.div>

      {/* Bento Box Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        
        {/* Large Feature 1: Pre-Enforced Governance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="md:col-span-2 md:row-span-2 rounded-3xl border border-slate-200 bg-slate-50 p-8 flex flex-col justify-between hover:shadow-xl transition-shadow overflow-hidden relative group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-100 rounded-full blur-[80px] -mr-20 -mt-20 transition-all group-hover:bg-teal-200" />
          
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-teal-600 flex items-center justify-center mb-6 shadow-lg">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <p className="text-sm font-bold text-teal-600 uppercase tracking-wider mb-2">Policy-Based AI Control</p>
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Pre-Enforced System Governance</h3>
            <p className="text-slate-600 text-lg leading-relaxed max-w-md">
              True system-level governance. Configure AI confidence thresholds, mandate auditor approvals for high-risk actions, and lock down your compliance state before an audit. AI decisions don't just sit in a dashboard—they are governed by strict policy.
            </p>
          </div>
          
          <div className="mt-8 relative z-10 rounded-xl border border-slate-200 bg-white shadow-sm p-4 w-full md:w-3/4 max-w-md transform translate-y-4 group-hover:-translate-y-1 transition-transform">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-slate-700">AWS Evidence Auto-Mapping</span>
              <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full font-bold">Pending Approval</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-teal-500 h-full w-[85%]" />
            </div>
            <p className="text-xs text-slate-500 mt-2">Confidence Score: 85% — Requires Auditor Review</p>
          </div>
        </motion.div>

        {/* Feature 2: Continuous Monitoring */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl border border-slate-200 bg-slate-50 p-8 flex flex-col hover:shadow-xl transition-shadow relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-100 rounded-full blur-[40px] -ml-10 -mt-10" />
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center mb-4">
              <Radar className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-1">Connect & Collect</p>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Continuous Monitoring</h3>
            <p className="text-slate-600">
              Connect your stack and let ReguLattice pull evidence automatically. Watch your compliance pulse update in real-time.
            </p>
          </div>
        </motion.div>

        {/* Feature 3: RAG Mapping */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="rounded-3xl border border-slate-200 bg-slate-50 p-8 flex flex-col hover:shadow-xl transition-shadow relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-1">Generative Compliance</p>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Autonomous AI Agents</h3>
            <p className="text-slate-600">
              Our LLMs don't just advise—they actively draft policies, map controls via RAG, and remediate risks on your behalf.
            </p>
          </div>
        </motion.div>

        {/* Feature 4: Audit Reporting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="md:col-span-3 rounded-3xl border border-slate-200 bg-slate-900 p-8 flex flex-col md:flex-row items-center justify-between hover:shadow-xl transition-shadow relative overflow-hidden"
        >
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
          
          <div className="relative z-10 md:w-1/2 mb-6 md:mb-0">
            <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4">
              <FileCheck className="w-6 h-6 text-teal-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Board-Ready Reporting in Seconds</h3>
            <p className="text-slate-400">
              Generate Statements of Applicability (SoA), Executive Summaries, and Gap Analysis reports instantly. Your official documentation dynamically adapts to your active standards.
            </p>
          </div>
          
          <div className="relative z-10 w-full md:w-auto flex gap-4">
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex flex-col items-center justify-center min-w-[120px]">
              <span className="text-3xl font-bold text-white mb-1">SoA</span>
              <span className="text-xs text-slate-400 uppercase tracking-wide">Generated</span>
            </div>
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex flex-col items-center justify-center min-w-[120px]">
              <span className="text-3xl font-bold text-teal-400 mb-1">100%</span>
              <span className="text-xs text-slate-400 uppercase tracking-wide">Audit Ready</span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  </section>
);

export default FeaturesSection;
