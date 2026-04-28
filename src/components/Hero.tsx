import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Shield, Lock, FileCheck, ShieldCheck } from "lucide-react";

const images = [
  "/images/dashboard/dash-1.png",
  "/images/dashboard/dash-2.png",
  "/images/dashboard/dash-3.png",
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
    <section className="relative min-h-[95vh] bg-slate-900 overflow-hidden flex items-center pt-24 pb-12">
      {/* Animated grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          animation: "grid-fade 6s ease-in-out infinite",
        }}
      />

      {/* Scanning line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent animate-scan-line" />
      </div>

      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-teal-600/10 rounded-full blur-[100px] animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] animate-blob" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 text-center lg:text-left pt-10 lg:pt-0"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              Next-Gen Compliance OS
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
              The AI Agentic Platform for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">Continuous Compliance.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Automate evidence collection, generate policies autonomously, and turn ISO 27001 & global compliance from a bottleneck into your competitive edge.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={onBooking}
                className="inline-flex items-center justify-center rounded-lg bg-teal-600 text-white font-semibold px-8 py-4 text-lg hover:bg-teal-500 hover:shadow-[0_0_20px_rgba(13,148,136,0.4)] transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                Start Free 5-Day Trial
              </button>
              <button
                onClick={onContact}
                className="inline-flex items-center justify-center rounded-lg border-2 border-slate-700 text-slate-300 font-semibold px-8 py-4 text-lg hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
              >
                Watch Demo Video
              </button>
            </div>
          </motion.div>

          {/* Floating Glassmorphic Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 relative hidden md:block"
          >
            {/* Pulsing rings behind mockup */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
              <div className="w-[120%] h-[120%] rounded-full border border-teal-500/5 animate-pulse-ring" />
              <div className="w-[100%] h-[100%] rounded-full border border-teal-500/10 animate-pulse-ring" style={{ animationDelay: "1.5s" }} />
            </div>

            <div className="relative z-10 w-full aspect-[4/3] rounded-2xl border border-slate-700/50 bg-slate-800/40 backdrop-blur-xl shadow-2xl p-2 overflow-hidden ring-1 ring-white/10 flex flex-col">
              {/* Fake Window Header */}
              <div className="h-8 flex items-center px-4 gap-2 border-b border-slate-700/50 bg-slate-900/50 rounded-t-xl shrink-0">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <div className="mx-auto text-[10px] text-slate-500 font-mono tracking-wider font-semibold">REGULATTICE_OS</div>
              </div>

              {/* Dashboard Screenshots */}
              <div className="relative w-full h-full bg-slate-50 rounded-b-xl overflow-hidden flex-1">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={images[currentImageIndex]}
                    alt="ReguLattice Dashboard"
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 w-full h-full object-cover object-top rounded-b-xl"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_15px_rgba(0,0,0,0.08)] rounded-b-xl" />
              </div>
            </div>

            {/* Floating Badges */}
            <motion.div 
              className="absolute -top-6 -right-6 bg-slate-800/90 backdrop-blur border border-teal-500/30 text-white rounded-xl p-4 shadow-xl z-20 flex items-center gap-3"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-teal-400" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">Compliance Score</div>
                <div className="text-lg font-bold text-emerald-400">94% Audit Ready</div>
              </div>
            </motion.div>

            <motion.div 
              className="absolute -bottom-8 -left-8 bg-slate-800/90 backdrop-blur border border-indigo-500/30 text-white rounded-xl p-4 shadow-xl z-20 flex items-center gap-3"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            >
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <FileCheck className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">AI Agent</div>
                <div className="text-lg font-bold text-white">Policy Generated</div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
