import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ShieldCheck, FileCheck, BarChart3, Globe, Cpu } from "lucide-react";

const images = [
  "/images/dashboard/dash-1.png",
  "/images/dashboard/dash-2.png",
  "/images/dashboard/dash-3.png",
];

  const stats = [
  { icon: Globe, label: "Frameworks", value: "10" },
  { icon: FileCheck, label: "AI Reports", value: "11" },
  { icon: Cpu, label: "AI Agents", value: "24/7" },
  { icon: BarChart3, label: "Faster Audits", value: "10×" },
];

interface HeroProps {
  onBooking: () => void;
  onContact: () => void;
}

const Hero = ({ onBooking, onContact }: HeroProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-slate-900 overflow-hidden pt-28 pb-0">
      {/* Animated grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-teal-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Scanning line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent animate-scan-line" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Center-Aligned Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            10 Frameworks. One Autonomous Engine.
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] mb-6 tracking-tight">
            ReguLattice is an{" "}
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-300 to-teal-400">
              Autonomous GRC Engine
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-300 mb-10 max-w-4xl mx-auto leading-relaxed">
            that maps your evidence, monitors your risk, and keeps you audit-ready — continuously, across every framework your business operates under.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onBooking}
              className="inline-flex items-center justify-center rounded-xl bg-teal-600 text-white font-semibold px-10 py-4 text-lg hover:bg-teal-500 hover:shadow-[0_0_30px_rgba(13,148,136,0.4)] transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              Start Free 5-Day Trial
            </button>
            <button
              onClick={onContact}
              className="inline-flex items-center justify-center rounded-xl border border-slate-600 text-slate-300 font-semibold px-10 py-4 text-lg hover:bg-slate-800/80 hover:text-white hover:border-slate-500 transition-all cursor-pointer"
            >
              Talk to an Expert
            </button>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 md:gap-12 mt-14 mb-12"
        >
          {stats.map((s, i) => (
            <div key={i} className="flex items-center gap-3 text-center">
              <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700/50 flex items-center justify-center">
                <s.icon className="w-5 h-5 text-teal-400" />
              </div>
              <div className="text-left">
                <div className="text-xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">{s.label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Full-Width Dashboard Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative max-w-6xl mx-auto"
        >
          {/* Glow behind mockup */}
          <div className="absolute -inset-4 bg-gradient-to-t from-teal-500/10 via-transparent to-transparent rounded-3xl blur-2xl pointer-events-none" />
          
          <div className="relative rounded-2xl border border-slate-700/60 bg-slate-800/50 backdrop-blur-xl shadow-2xl overflow-hidden ring-1 ring-white/5">
            {/* Window Header */}
            <div className="h-10 flex items-center px-5 gap-2 border-b border-slate-700/50 bg-slate-900/60">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <div className="mx-auto text-[11px] text-slate-500 font-mono tracking-widest font-semibold">REGULATTICE_OS</div>
            </div>

            {/* Screenshot */}
            <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={images[currentImageIndex]}
                  alt="ReguLattice Dashboard"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Floating badges */}
          <motion.div 
            className="absolute -top-4 -right-4 md:right-8 bg-slate-800/95 backdrop-blur border border-teal-500/30 text-white rounded-xl p-3 shadow-xl z-20 flex items-center gap-3 hidden md:flex"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <div className="w-9 h-9 rounded-lg bg-teal-500/20 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Compliance Score</div>
              <div className="text-sm font-bold text-emerald-400">94% Audit Ready</div>
            </div>
          </motion.div>

          <motion.div 
            className="absolute -bottom-4 -left-4 md:left-8 bg-slate-800/95 backdrop-blur border border-indigo-500/30 text-white rounded-xl p-3 shadow-xl z-20 flex items-center gap-3 hidden md:flex"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-500/20 flex items-center justify-center">
              <FileCheck className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">AI Agent</div>
              <div className="text-sm font-bold text-white">Policy Generated ✓</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Fade-to-next-section gradient */}
        <div className="h-24 bg-gradient-to-b from-transparent to-slate-900" />
      </div>
    </section>
  );
};

export default Hero;
