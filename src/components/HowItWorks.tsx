import { motion } from "framer-motion";
import { Target, Upload, ShieldCheck, Activity } from "lucide-react";

const steps = [
  { 
    icon: Target, 
    title: "AI-Driven Scoping", 
    desc: "Our Scope Wizard analyzes your business to instantly generate a narrow, audit-ready compliance roadmap tailored to your specific frameworks." 
  },
  { 
    icon: Upload, 
    title: "Intelligent Mapping", 
    desc: "Upload your documents. Our RAG AI instantly scans and maps evidence directly to your exact framework controls with cited sources." 
  },
  { 
    icon: ShieldCheck, 
    title: "Enforce Policies", 
    desc: "Set confidence scores and approval workflows. Ensure no AI decision impacts your system without proper auditor-approved governance." 
  },
  { 
    icon: Activity, 
    title: "Continuous Pulse", 
    desc: "Watch your readiness score update live as risks are mitigated, vendors are assessed, and evidence is continuously collected." 
  },
];

const HowItWorks = () => (
  <section className="py-24 bg-white relative overflow-hidden">
    <div className="container mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
          From Setup to Certification Readiness in{" "}
          <span className="text-teal-600">4 Steps</span>
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto relative">
        {/* Connecting Line (Desktop) */}
        <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-[2px] bg-slate-100 z-0">
           <div className="h-full bg-teal-500 w-full origin-left animate-scan-line" />
        </div>

        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center relative z-10"
          >
            <div className="w-24 h-24 rounded-3xl bg-slate-50 border border-slate-200 mx-auto mb-6 flex items-center justify-center shadow-sm relative group hover:border-teal-300 transition-colors">
              <div className="absolute inset-0 bg-teal-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <s.icon className="w-10 h-10 text-teal-600 relative z-10" />
              
              {/* Step number badge */}
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-sm border-2 border-white shadow-sm">
                {i + 1}
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900">{s.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
