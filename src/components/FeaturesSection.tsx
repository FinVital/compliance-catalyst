import { motion } from "framer-motion";
import { FileSearch, Gauge, FileText, LayoutDashboard } from "lucide-react";

const features = [
  {
    icon: FileSearch,
    title: "Contract-Win Mode™",
    subtitle: "AI RFP Parsing",
    description: "Drop your RFP into ReguLattice. Our AI maps questions against your evidence and SoA, generating high-fidelity answers with confidence scores and source citations.",
  },
  {
    icon: Gauge,
    title: "Dynamic ISO 27001 Readiness Engine",
    subtitle: "Real-Time Scoring",
    description: "Know exactly where you stand before the auditor arrives. Continuously evaluates your controls, tasks, and evidence to generate a real-time Compliance Readiness Score.",
  },
  {
    icon: FileText,
    title: "Automated SoA & Policy Builder",
    subtitle: "Minutes, Not Months",
    description: "Draft your Statement of Applicability and core security policies instantly. Dynamically generates Risk Treatment Plans based on your existing control coverage.",
  },
  {
    icon: LayoutDashboard,
    title: "Comprehensive Control & Evidence Tracking",
    subtitle: "Unified Dashboard",
    description: "Manage your entire compliance lifecycle in one place. From defining scope to managing evidence folders and tasks—zero blind spots in your compliance pulse.",
  },
];

const FeaturesSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          An Intelligent Ecosystem for{" "}
          <span className="text-gradient">Security & Governance</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Powerful AI-driven tools that transform how you manage compliance.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group rounded-2xl border border-border bg-card p-8 hover:shadow-glow hover:border-primary/30 transition-all"
          >
            <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-5">
              <f.icon className="w-7 h-7 text-accent-foreground" />
            </div>
            <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-1">{f.subtitle}</p>
            <h3 className="text-xl font-bold mb-3 text-foreground">{f.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{f.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
