import { motion } from "framer-motion";
import { Target, Upload, Brain, Trophy } from "lucide-react";

const steps = [
  { icon: Target, title: "Define Your Scope", desc: "Tailor the platform to your organization's specific boundaries and risk appetite." },
  { icon: Upload, title: "Map Your Evidence", desc: "Securely upload and link internal evidence to globally recognized security controls." },
  { icon: Brain, title: "Analyze & Remediate", desc: "Leverage AI-driven insights to prioritize high-risk gaps and execute remediation tasks." },
  { icon: Trophy, title: "Close Enterprise Deals", desc: "Generate branded addendums and auto-fill RFPs using your validated security posture." },
];

const HowItWorks = () => (
  <section className="py-24 bg-surface-cool">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          From Setup to Certification Readiness in{" "}
          <span className="text-gradient">4 Steps</span>
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-hero mx-auto mb-5 flex items-center justify-center">
              <s.icon className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="text-sm font-bold text-primary mb-2">Step {i + 1}</div>
            <h3 className="text-lg font-bold mb-2">{s.title}</h3>
            <p className="text-muted-foreground text-sm">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
