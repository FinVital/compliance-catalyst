import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$35",
    desc: "The essential toolkit for growing teams to map compliance.",
    features: ["Up to 5 team members", "Unlimited AI mapping", "Basic reports", "Email support"],
    popular: false,
  },
  {
    name: "Pro",
    price: "$74",
    desc: "Advanced AI workflows and multilingual support to accelerate sales.",
    features: ["Unlimited team members", "Contract-Win Mode", "Urdu & Arabic training videos", "Priority support", "Clean report exports"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$109",
    desc: "Tailored compliance infrastructure and dedicated consulting.",
    features: ["Custom API access", "Dedicated account manager", "On-site audit prep", "Custom training content"],
    popular: false,
  },
];

const PricingSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Choose Your <span className="text-gradient">Plan</span>
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
            className={`relative rounded-2xl border p-8 flex flex-col ${
              p.popular
                ? "border-primary bg-card shadow-glow scale-105"
                : "border-border bg-card"
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
            <a
              href="https://regulattice-pro.vercel.app/"
              className={`inline-flex items-center justify-center rounded-lg font-semibold px-6 py-3 transition-all text-center ${
                p.popular
                  ? "bg-hero text-primary-foreground hover:opacity-90"
                  : "bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              Get Started
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
