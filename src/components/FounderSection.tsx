import { motion } from "framer-motion";
import founderImg from "@/assets/founder.png";
import { Quote } from "lucide-react";

const FounderSection = () => (
  <section id="founder" className="py-28 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #111625 0%, #181e30 100%)" }}>
    {/* Grid bg */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }}
    />

    <div className="container mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-widest mb-4" style={{ background: "rgba(37,99,235,0.1)", borderColor: "rgba(37,99,235,0.2)", color: "#93c5fd" }}>
            Our Story
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            A Message From Our{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(90deg, #3b82f6, #60a5fa)" }}
            >
              Founder
            </span>
          </h2>
        </div>

        <div className="rounded-3xl border overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="flex flex-col md:flex-row gap-0">
            {/* Left: Founder image column */}
            <div className="md:w-72 shrink-0 flex flex-col items-center justify-center p-10" style={{ background: "rgba(30,64,175,0.04)", borderRight: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="relative mb-5">
                <div className="absolute inset-0 rounded-full blur-xl" style={{ background: "rgba(30,64,175,0.15)" }} />
                <img
                  src={founderImg}
                  alt="Moazzam Waheed, Founder & CEO"
                  className="relative w-36 h-36 rounded-full object-cover ring-4"
                  style={{ ringColor: "rgba(30,64,175,0.3)" }}
                />
              </div>
              <p className="font-bold text-white text-lg text-center">Moazzam Waheed</p>
              <p className="text-blue-400 text-sm text-center font-medium">Founder & CEO</p>
              <div className="mt-4 flex flex-col items-center gap-1 text-xs text-slate-500 text-center">
                <span>16+ Years in AI & SWE</span>
                <span>GRC & RegTech Expert</span>
              </div>
            </div>

            {/* Right: Quote */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
              <Quote className="w-10 h-10 text-blue-500/30 mb-6" />
              <blockquote className="text-slate-300 text-lg leading-relaxed italic">
                "As the Founder & CEO of ReguLattice, I bring over 16 years of hands-on expertise in Software Engineering and Artificial Intelligence. Having witnessed firsthand the immense friction companies face when proving their security posture to close enterprise deals, I realized the compliance industry needed a paradigm shift.
                <br /><br />
                ReguLattice was engineered as a 100% air-gapped, sovereign Autonomous GRC Engine. It acts as your ultimate vCISO force multiplier — continuously mapping evidence, validating controls with our localized AI architecture, and keeping you audit-ready across multiple global frameworks. Our mission is to make compliance an automated accelerator for your business growth, not a roadblock."
              </blockquote>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default FounderSection;
