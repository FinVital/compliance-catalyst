import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$79",
    target: "Emerging Startups",
    seats: "Up to 5 Members",
    frameworks: "1 Included",
    desc: "Essential compliance mapping for growing teams starting their core security journey.",
    features: [
      "Dashboard",
      "Risk Monitoring",
      "Basic Registry",
    ],
    popular: false,
    cta: "Get Started Free",
  },
  {
    name: "Pro",
    price: "$219",
    target: "Scaling Startups",
    seats: "Up to 20 Members",
    frameworks: "5 Included",
    desc: "Full GRC automation with multi-framework coverage and continuous auto-remediation.",
    features: [
      "Full Risk & Remediation",
      "Unlimited controls registry",
      "Contract-Win Mode",
      "Continuous Pulse Monitoring",
    ],
    popular: true,
    cta: "Start Pro Trial",
  },
  {
    name: "Partner",
    price: "$349",
    target: "Audit Consultant",
    seats: "per client",
    frameworks: "10 Included",
    desc: "Advanced compliance pulse telemetry and white-label tools for consultants.",
    features: [
      "Advanced Compliance Pulse telemetry",
      "Dedicated support",
      "White-Label platform",
    ],
    popular: false,
    cta: "Contact Sales",
  },
];

interface PricingSectionProps {
  onBooking: () => void;
}

const PricingSection = ({ onBooking }: PricingSectionProps) => (
  <section className="py-28 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #111625 0%, #181e30 100%)" }}>
    {/* Grid */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
        backgroundSize: "50px 50px",
      }}
    />

    <div className="container mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-widest mb-4" style={{ background: "rgba(37,99,235,0.1)", borderColor: "rgba(37,99,235,0.2)", color: "#93c5fd" }}>
          Transparent Pricing
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Choose Your{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(90deg, #60a5fa, #818cf8)" }}
          >
            Plan
          </span>
        </h2>
        <p className="text-slate-400 text-lg">
          Every account begins with a <strong className="text-white">5-day free trial</strong> — no credit card required.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
        {plans.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative rounded-3xl border flex flex-col transition-all ${
              p.popular
                ? "shadow-2xl"
                : "hover:shadow-xl"
            }`}
            style={
              p.popular
                ? { background: "white", borderColor: "#1e40af", borderWidth: "2px", boxShadow: "0 10px 30px rgba(30,64,175,0.15)" }
                : { background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }
            }
          >
            {p.popular && (
              <div
                className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-sm font-semibold text-white flex items-center gap-1.5 shadow-lg"
                style={{ background: "#1e40af" }}
              >
                <Star className="w-3.5 h-3.5 fill-current" /> Most Popular
              </div>
            )}

            <div className="p-8 flex flex-col flex-1">
              <h3 className={`text-xl font-bold mb-1 ${p.popular ? "text-slate-900" : "text-white"}`}>
                {p.name}
              </h3>
              <div className="mb-4">
                <span
                  className={`text-4xl font-black ${p.popular ? "text-blue-600" : "text-white"}`}
                >
                  {p.price}
                </span>
                <span className={p.popular ? "text-slate-500" : "text-slate-400"}> / month</span>
              </div>
              
              <p className={`text-sm mb-6 leading-relaxed ${p.popular ? "text-slate-500" : "text-slate-400"}`}>{p.desc}</p>

              {/* Target & Limits Badges */}
              <div className={`mb-6 p-4 rounded-2xl space-y-2.5 ${p.popular ? "bg-slate-50" : "bg-white/5"}`}>
                <div className={`flex items-center justify-between text-xs border-b pb-2 border-dashed ${p.popular ? "border-slate-200" : "border-white/10"}`}>
                  <span className={p.popular ? "text-slate-500" : "text-slate-400"}>Target Segment:</span>
                  <span className={`font-bold ${p.popular ? "text-slate-800" : "text-white"}`}>{p.target}</span>
                </div>
                <div className={`flex items-center justify-between text-xs border-b pb-2 border-dashed ${p.popular ? "border-slate-200" : "border-white/10"}`}>
                  <span className={p.popular ? "text-slate-500" : "text-slate-400"}>User Seats:</span>
                  <span className={`font-bold ${p.popular ? "text-slate-800" : "text-white"}`}>{p.seats}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className={p.popular ? "text-slate-500" : "text-slate-400"}>Compliance Frameworks:</span>
                  <span className={`font-bold ${p.popular ? "text-slate-800" : "text-white"}`}>{p.frameworks}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {p.features.map((f) => (
                  <li key={f} className={`flex items-start gap-2.5 text-sm ${p.popular ? "text-slate-700" : "text-slate-300"}`}>
                    <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${p.popular ? "bg-blue-100" : "bg-blue-900/40"}`}>
                      <Check className="w-3 h-3 text-blue-600" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={onBooking}
                className={`w-full rounded-xl font-semibold py-3 transition-all text-center cursor-pointer ${
                  p.popular
                    ? "text-white hover:opacity-90 hover:shadow-lg hover:shadow-blue-600/20"
                    : "text-white border border-white/10 hover:bg-white/10"
                }`}
                style={p.popular ? { background: "#1e40af" } : {}}
              >
                {p.cta}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
