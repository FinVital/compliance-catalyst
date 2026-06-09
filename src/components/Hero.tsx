import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const rotatingPhrases = [
  "the age of AI.",
  "regulatory confidence.",
  "zero manual effort.",
  "global frameworks.",
  "autonomous audits.",
];

const clientLogos = [
  "SAMA", "ISO 27001", "SOC 2", "NIST CSF", "PCI-DSS",
  "HIPAA", "ISO 42001", "GLBA", "ISO 20022", "SECP",
];

interface HeroProps {
  onBooking: () => void;
  onContact: () => void;
}

export default function Hero({ onBooking }: HeroProps) {
  const [phraseIdx, setPhraseIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIdx(p => (p + 1) % rotatingPhrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative pt-32 pb-0 overflow-hidden"
      style={{ background: "#141927", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(62,207,178,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(62,207,178,0.03) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Glow orb */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(62,207,178,0.06) 0%, transparent 70%)" }}
      />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1
            className="font-black text-white leading-[1.08] mb-6"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", letterSpacing: "-0.035em" }}
          >
            GRC compliance
            <br />
            re-engineered for
            <br />
            <span className="relative inline-block overflow-hidden" style={{ minWidth: "8ch", minHeight: "1.1em" }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={phraseIdx}
                  className="text-teal-gradient block"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                >
                  {rotatingPhrases[phraseIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <p
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#8b9ab0" }}
          >
            The AI-native GRC platform with autonomous agents that map evidence, remediate gaps, and keep you audit-ready across 10 global compliance frameworks.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={onBooking} className="btn-amber text-base px-8 py-4 gap-2 justify-center">
              Get a demo
            </button>
            <a
              href="#how-it-works"
              className="btn-dark-outline text-base px-8 py-4 justify-center"
            >
              See how it works
            </a>
          </div>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 mb-0"
        >
          <p className="text-xs uppercase tracking-widest font-semibold mb-6" style={{ color: "#4a5568" }}>
            Covering all frameworks your business needs
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {clientLogos.map(logo => (
              <span
                key={logo}
                className="text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider transition-colors"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  color: "#8b9ab0",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {logo}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Dashboard preview fade in from below */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="relative mt-16 mx-auto max-w-5xl"
        >
          {/* Gradient fade at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, #141927)" }} />

          <div
            className="rounded-t-2xl overflow-hidden"
            style={{ border: "1px solid rgba(62,207,178,0.15)", borderBottom: "none", background: "#0d111c" }}
          >
            {/* Window bar */}
            <div className="h-10 flex items-center px-4 gap-2 border-b" style={{ background: "#141927", borderColor: "rgba(62,207,178,0.1)" }}>
              <div className="w-3 h-3 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }} />
              <span className="mx-auto text-[10px] font-mono tracking-widest" style={{ color: "#4a5568" }}>
                REGULATTICE — COMPLIANCE COMMAND CENTER
              </span>
            </div>

            {/* Placeholder dashboard area */}
            <div className="aspect-[16/9] relative" style={{ background: "linear-gradient(135deg, #0d111c 0%, #141927 100%)" }}>
              {/* Stat cards row */}
              <div className="absolute top-8 left-8 right-8 grid grid-cols-4 gap-4">
                {[
                  { label: "Compliance Score", value: "94%", delta: "+3% this week", color: "#3ecfb2" },
                  { label: "Controls Mapped", value: "847", delta: "Across 10 frameworks", color: "#f5a623" },
                  { label: "Open Gaps", value: "12", delta: "↓ 8 from last month", color: "#60a5fa" },
                  { label: "Audit Readiness", value: "Ready", delta: "ISO 27001 ✓", color: "#a78bfa" },
                ].map(stat => (
                  <div key={stat.label} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="text-xs mb-1" style={{ color: "#4a5568" }}>{stat.label}</div>
                    <div className="text-2xl font-black mb-1" style={{ color: stat.color }}>{stat.value}</div>
                    <div className="text-[10px]" style={{ color: "#8b9ab0" }}>{stat.delta}</div>
                  </div>
                ))}
              </div>

              {/* Compliance bar */}
              <div className="absolute top-44 left-8 right-8 rounded-xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-semibold text-white">Framework Compliance Overview</span>
                  <span className="text-xs" style={{ color: "#3ecfb2" }}>10 frameworks active</span>
                </div>
                <div className="space-y-2">
                  {[
                    { name: "ISO 27001", pct: 94 },
                    { name: "SOC 2", pct: 87 },
                    { name: "NIST CSF 2.0", pct: 79 },
                    { name: "SAMA", pct: 91 },
                  ].map(fw => (
                    <div key={fw.name} className="flex items-center gap-3">
                      <span className="text-xs w-24 shrink-0" style={{ color: "#8b9ab0" }}>{fw.name}</span>
                      <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
                        <div className="h-full rounded-full" style={{ width: `${fw.pct}%`, background: "linear-gradient(90deg, #3ecfb2, #f5a623)" }} />
                      </div>
                      <span className="text-xs font-semibold" style={{ color: "#3ecfb2" }}>{fw.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
