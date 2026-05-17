import { motion } from "framer-motion";
import { Check, Star, FileCheck, Shield } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$79",
    desc: "Essential compliance mapping for growing teams starting their core security journey.",
    features: [
      "Up to 5 team members",
      "ISO 27001 & SECP compliance mapping",
      "AI-powered control mapping",
      "Compliance Graph dashboard",
      "Evidence Summary & Gap Reports",
      "Audit Readiness Checklist",
      "Email support",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "$219",
    desc: "Full GRC automation with multi-framework coverage and continuous auto-remediation.",
    features: [
      "Unlimited team members",
      "All 10 Global & Regional Frameworks",
      "AI Governance (ISO 42001) & NIST CSF 2.0",
      "Financial Standards: ISO 20022 & GLBA",
      "Payments & Healthcare: PCI-DSS & HIPAA",
      "11 AI-generated audit-ready reports",
      "Urdu & Arabic language support",
      "Priority 24/7 support",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$349",
    desc: "Tailored compliance infrastructure with custom frameworks, dedicated GRC experts, and full scale.",
    features: [
      "Unlimited Global & Custom Frameworks",
      "Custom GRC Framework Builder",
      "Full White-Label platform & reports",
      "Multi-entity parallel mapping",
      "SSO & Custom API integration",
      "Dedicated account manager",
      "Risk Treatment Plan automation",
      "SLA-backed priority support",
    ],
    popular: false,
  },
];

interface PricingSectionProps {
  onBooking: () => void;
}

const PricingSection = ({ onBooking }: PricingSectionProps) => (
  <section className="py-24 relative overflow-hidden">
    {/* Animated background */}
    <div className="absolute inset-0 pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 70% 80%, hsl(160 84% 39% / 0.03) 0%, transparent 40%), radial-gradient(circle at 30% 20%, hsl(210 100% 56% / 0.03) 0%, transparent 40%)`,
        }}
      />
      {/* Animated dots grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(160 84% 39% / 0.05) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />
      <div className="absolute top-16 left-[5%] opacity-[0.03] animate-drift" style={{ animationDelay: "2s" }}>
        <FileCheck className="w-36 h-36 text-primary" />
      </div>
      <div className="absolute bottom-16 right-[5%] opacity-[0.03] animate-drift" style={{ animationDelay: "5s" }}>
        <Shield className="w-28 h-28 text-secondary" />
      </div>
      {/* Pulse rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-primary/[0.03] animate-pulse-ring" />
    </div>

    <div className="container mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Choose Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-300 to-teal-400">
            Plan
          </span>
        </h2>
        <p className="text-muted-foreground text-lg">
          Every account begins with a <strong>5-day free trial</strong> so you can map your compliance with zero risk.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative rounded-2xl border p-8 flex flex-col backdrop-blur-sm ${
              p.popular
                ? "border-primary bg-card/90 shadow-glow scale-105"
                : "border-border bg-card/80"
            }`}
          >
            {p.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-hero rounded-full px-4 py-1 text-sm font-semibold text-primary-foreground flex items-center gap-1">
                <Star className="w-3.5 h-3.5" /> Most Popular
              </div>
            )}
            <h3 className="text-xl font-bold mb-1">{p.name}</h3>
            <div className="mb-3">
              <span className="text-4xl font-bold text-gradient">{p.price}</span>
              <span className="text-muted-foreground"> / month</span>
            </div>
            <p className="text-muted-foreground text-sm mb-6">{p.desc}</p>
            <ul className="space-y-3 mb-8 flex-1">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={onBooking}
              className={`inline-flex items-center justify-center rounded-lg font-semibold px-6 py-3 transition-all text-center cursor-pointer ${
                p.popular
                  ? "bg-hero text-primary-foreground hover:opacity-90"
                  : "bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              Get Started
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
