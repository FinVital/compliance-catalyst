import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const frameworks = [
  {
    name: "ISO 27001",
    subtitle: "Core Foundation",
    description: "The absolute standard for Information Security Management Systems.",
    color: "bg-teal-500",
  },
  {
    name: "SECP Pakistan",
    subtitle: "Regional Compliance",
    description: "Tailored controls for Pakistani financial and corporate sectors.",
    color: "bg-indigo-500",
  },
  {
    name: "ISO 20022",
    subtitle: "Financial Messaging",
    description: "Security and data structuring for modern global payments.",
    color: "bg-emerald-500",
  },
  {
    name: "ISO 27701",
    subtitle: "Privacy Management",
    description: "Extends 27001 to cover PII and global privacy regulations like GDPR.",
    color: "bg-purple-500",
  },
];

const FrameworksSection = () => {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
            Extend Your Compliance. <br className="hidden md:block" />
            <span className="text-teal-600">Without Extending Your Effort.</span>
          </h2>
          <p className="text-lg text-slate-600">
            Master the absolute framework dictionaries. Built on a foundational ISO 27001 core, our AI seamlessly orchestrates, maps, and automates your entire regulatory landscape.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {frameworks.map((fw, idx) => (
            <motion.div
              key={fw.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-shadow relative overflow-hidden group"
            >
              <div className={`absolute top-0 left-0 w-full h-1 ${fw.color} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
              
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-slate-900">{fw.name}</h3>
                <CheckCircle2 className={`w-5 h-5 ${fw.color.replace('bg-', 'text-')}`} />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">{fw.subtitle}</p>
              <p className="text-slate-600 text-sm leading-relaxed">{fw.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-sm font-medium text-slate-600">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            Toggle controls in or out of your active scope with a single click.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FrameworksSection;
