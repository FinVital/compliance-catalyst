import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormModal from "@/components/ContactFormModal";
import FounderSection from "@/components/FounderSection";
import { Sparkles, Award, ArrowRight, CheckCircle2, Target, Eye, Heart, Globe, Lock, Bot, BarChart3 } from "lucide-react";

export default function About() {
  const [contactOpen, setContactOpen] = useState(false);

  const [activeLifecycleStep, setActiveLifecycleStep] = useState<number>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openBooking = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: "https://calendly.com/moazzamwaheed/15min",
      });
    }
  };

  const openContact = () => {
    setContactOpen(true);
  };

  // Continuous step rotation for the GRC Lifecycle circle
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLifecycleStep((prev) => (prev + 1) % lifecycleSteps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d111c] text-white flex flex-col justify-between overflow-x-hidden">
      <Navbar onBooking={openBooking} onContact={openContact} />

      <style>{`
        @keyframes dash-flow {
          to { stroke-dashoffset: -40; }
        }
        @keyframes radar-pulse {
          0% { transform: scale(0.9); opacity: 0.8; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes radar-pulse-slow {
          0% { transform: scale(0.95); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes float-subtle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes orbit-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-ccw {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes particle-travel {
          0% { offset-distance: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        @keyframes hex-breathe {
          0%, 100% { 
            filter: drop-shadow(0 0 8px rgba(62,207,178,0.3));
            stroke-opacity: 0.6;
          }
          50% { 
            filter: drop-shadow(0 0 20px rgba(62,207,178,0.7));
            stroke-opacity: 1;
          }
        }
        @keyframes scanner-sweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes data-blink {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes node-appear {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
        .circuit-path {
          stroke-dasharray: 8, 4;
          animation: dash-flow 2s linear infinite;
        }
        .circuit-path-reverse {
          stroke-dasharray: 8, 4;
          animation: dash-flow 2s linear infinite reverse;
        }
        .circuit-path-fast {
          stroke-dasharray: 6, 3;
          animation: dash-flow 1.2s linear infinite;
        }
        .glow-filter {
          filter: drop-shadow(0 0 10px rgba(62, 207, 178, 0.6));
        }
        .glow-blue {
          filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.5));
        }
        .glow-cyan {
          filter: drop-shadow(0 0 8px rgba(6, 182, 212, 0.5));
        }
        .glow-emerald {
          filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.5));
        }
        .pulse-orb {
          animation: radar-pulse 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
        .pulse-orb-slow {
          animation: radar-pulse-slow 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
        .float-animation {
          animation: float-subtle 6s ease-in-out infinite;
        }
        .orbit-ring-cw {
          animation: orbit-cw 20s linear infinite;
          transform-origin: center;
        }
        .orbit-ring-ccw {
          animation: orbit-ccw 25s linear infinite;
          transform-origin: center;
        }
        .hex-shield {
          animation: hex-breathe 3s ease-in-out infinite;
        }
        .scanner-line {
          animation: scanner-sweep 8s linear infinite;
          transform-origin: center;
        }
        .data-blink-1 { animation: data-blink 2s ease-in-out infinite; }
        .data-blink-2 { animation: data-blink 2s ease-in-out infinite 0.5s; }
        .data-blink-3 { animation: data-blink 2s ease-in-out infinite 1s; }
        .data-blink-4 { animation: data-blink 2s ease-in-out infinite 1.5s; }
      `}</style>

      {/* ──────────────────────────────────────────────────────────────── */}
      {/* 1. HERO - Interactive GRC Command Center                       */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-[#0d111c] border-b border-slate-800/60">
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(62,207,178,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(62,207,178,0.015) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/4 w-[700px] h-[350px] pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(62,207,178,0.04) 0%, transparent 70%)" }} />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left Content */}
            <div className="w-full lg:w-1/2 text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div 
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest mb-6" 
                  style={{ background: "rgba(62,207,178,0.08)", borderColor: "rgba(62,207,178,0.2)", color: "#7ee8d5" }}
                >
                  <Sparkles className="w-3 h-3 text-[#3ecfb2]" /> Sovereign GRC Core
                </div>
                
                <h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-6 text-white uppercase"
                  style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
                >
                  Reimagining GRC <br />
                  for the <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #3ecfb2, #2563eb)" }}>AI Era</span>
                </h1>
                
                <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
                  ReguLattice operates a sovereign, 100% air-gapped GRC platform. We map evidence, close security gaps, and automate compliance audits dynamically.
                </p>

                <div className="flex gap-4 flex-wrap">
                  <a 
                    href="#lifecycle" 
                    className="px-6 py-3 rounded-full bg-[#3ecfb2] hover:bg-[#2ebfa2] text-slate-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-[#3ecfb2]/10"
                  >
                    Explore Lifecycle
                  </a>
                  <button 
                    onClick={openContact}
                    className="px-6 py-3 rounded-full border border-slate-700 hover:border-slate-500 text-white font-semibold text-sm tracking-wide transition-all"
                  >
                    Consult an Expert
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Right Content: Holographic GRC Command Center v3 */}
            <motion.div 
              className="w-full lg:w-1/2 flex items-center justify-center relative"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ minHeight: "520px" }}
            >
              {/* ── Ambient glow backdrop ── */}
              <div className="absolute w-[450px] h-[450px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(62,207,178,0.08) 0%, rgba(37,99,235,0.04) 50%, transparent 80%)" }} />
              
              {/* ── Outer Rotating Ring with tick marks ── */}
              <div 
                className="absolute w-[440px] h-[440px] rounded-full border border-[#3ecfb2]/[0.06] orbit-ring-cw"
                style={{ borderStyle: "dashed", borderWidth: "1px" }}
              />
              <div 
                className="absolute w-[380px] h-[380px] rounded-full border border-blue-500/[0.06] orbit-ring-ccw"
              />
              <div 
                className="absolute w-[320px] h-[320px] rounded-full border border-[#3ecfb2]/[0.04]"
                style={{ borderStyle: "dotted" }}
              />

              {/* ── Scanner sweep (CSS animated) ── */}
              <div className="absolute w-[440px] h-[440px] rounded-full overflow-hidden pointer-events-none">
                <div 
                  className="w-full h-full scanner-line"
                  style={{ 
                    background: "conic-gradient(from 0deg, transparent 0deg, transparent 340deg, rgba(62,207,178,0.12) 355deg, rgba(62,207,178,0.25) 360deg)",
                    borderRadius: "50%",
                  }}
                />
              </div>

              {/* ── Connection Beams (gradient lines from center to nodes) ── */}
              <svg className="absolute w-[440px] h-[440px] pointer-events-none" viewBox="0 0 440 440" style={{ zIndex: 1 }}>
                <defs>
                  <linearGradient id="beam1" x1="50%" y1="50%" x2="50%" y2="0%">
                    <stop offset="0%" stopColor="#3ecfb2" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#3ecfb2" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="beam2" x1="50%" y1="50%" x2="88%" y2="15%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="beam3" x1="50%" y1="50%" x2="88%" y2="85%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="beam4" x1="50%" y1="50%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="beam5" x1="50%" y1="50%" x2="12%" y2="85%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="beam6" x1="50%" y1="50%" x2="12%" y2="15%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Beams from center to each node */}
                <line x1="220" y1="220" x2="220" y2="30" stroke="url(#beam1)" strokeWidth="2" />
                <line x1="220" y1="220" x2="220" y2="30" stroke="#3ecfb2" strokeWidth="1.5" className="circuit-path-fast" opacity="0.3" />
                
                <line x1="220" y1="220" x2="385" y2="65" stroke="url(#beam2)" strokeWidth="2" />
                <line x1="220" y1="220" x2="385" y2="65" stroke="#ef4444" strokeWidth="1.5" className="circuit-path" opacity="0.25" />
                
                <line x1="220" y1="220" x2="385" y2="375" stroke="url(#beam3)" strokeWidth="2" />
                <line x1="220" y1="220" x2="385" y2="375" stroke="#3b82f6" strokeWidth="1.5" className="circuit-path-reverse" opacity="0.25" />
                
                <line x1="220" y1="220" x2="220" y2="410" stroke="url(#beam4)" strokeWidth="2" />
                <line x1="220" y1="220" x2="220" y2="410" stroke="#a855f7" strokeWidth="1.5" className="circuit-path" opacity="0.25" />
                
                <line x1="220" y1="220" x2="55" y2="375" stroke="url(#beam5)" strokeWidth="2" />
                <line x1="220" y1="220" x2="55" y2="375" stroke="#f59e0b" strokeWidth="1.5" className="circuit-path-reverse" opacity="0.25" />
                
                <line x1="220" y1="220" x2="55" y2="65" stroke="url(#beam6)" strokeWidth="2" />
                <line x1="220" y1="220" x2="55" y2="65" stroke="#06b6d4" strokeWidth="1.5" className="circuit-path" opacity="0.25" />

                {/* Outer hexagonal connecting path between nodes */}
                <path d="M 220,30 L 385,65 L 385,375 L 220,410 L 55,375 L 55,65 Z" fill="none" stroke="rgba(62,207,178,0.06)" strokeWidth="1" strokeDasharray="4,8" />
              </svg>

              {/* ── CENTRAL CORE ── */}
              <div className="absolute z-20 flex items-center justify-center">
                {/* Pulse rings */}
                <div className="absolute w-[130px] h-[130px] rounded-full border border-[#3ecfb2]/30 pulse-orb" />
                <div className="absolute w-[130px] h-[130px] rounded-full border border-[#3ecfb2]/15 pulse-orb-slow" />
                
                {/* Core hexagonal container */}
                <div 
                  className="relative w-[110px] h-[110px] flex items-center justify-center"
                  style={{ 
                    background: "linear-gradient(135deg, #0d1520 0%, #111c2e 100%)",
                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    boxShadow: "0 0 40px rgba(62,207,178,0.15), inset 0 0 20px rgba(62,207,178,0.05)",
                  }}
                >
                  {/* Inner hex border */}
                  <div 
                    className="absolute inset-[3px] flex flex-col items-center justify-center hex-shield"
                    style={{
                      clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                      border: "1.5px solid rgba(62,207,178,0.5)",
                      background: "linear-gradient(180deg, rgba(62,207,178,0.06) 0%, rgba(13,21,32,0.95) 100%)",
                    }}
                  >
                    {/* Shield SVG icon */}
                    <svg viewBox="0 0 32 32" className="w-8 h-8 mb-0.5" fill="none">
                      <path d="M16 3L6 8v7c0 6.5 4.3 12.6 10 14 5.7-1.4 10-7.5 10-14V8L16 3z" stroke="#3ecfb2" strokeWidth="1.5" fill="rgba(62,207,178,0.06)" />
                      <path d="M12 16l3 3 6-7" stroke="#3ecfb2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[10px] font-black tracking-[0.3em] text-[#3ecfb2] uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>GRC</span>
                  </div>
                </div>
              </div>

              {/* ── SATELLITE NODE CARDS ── */}
              {/* Each node is a glassmorphic card with icon, label, and arc progress */}
              
              {/* 1. Governance — Top */}
              <motion.div 
                className="absolute z-10 group cursor-pointer"
                style={{ top: "2%", left: "50%", transform: "translateX(-50%)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                whileHover={{ scale: 1.08, y: -4 }}
              >
                <div className="relative flex flex-col items-center">
                  {/* Glow ring */}
                  <div className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(circle, rgba(62,207,178,0.2) 0%, transparent 70%)" }} />
                  <div 
                    className="relative w-[62px] h-[62px] rounded-2xl flex items-center justify-center border border-[#3ecfb2]/30 group-hover:border-[#3ecfb2]/60 transition-all duration-300"
                    style={{ background: "linear-gradient(135deg, rgba(62,207,178,0.1) 0%, rgba(13,17,28,0.95) 100%)", backdropFilter: "blur(12px)", boxShadow: "0 0 20px rgba(62,207,178,0.1), inset 0 1px 0 rgba(255,255,255,0.05)" }}
                  >
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
                      <path d="M12 2L4 6v5c0 5.5 3.4 10.6 8 12 4.6-1.4 8-6.5 8-12V6L12 2z" stroke="#3ecfb2" strokeWidth="1.5" fill="rgba(62,207,178,0.08)" />
                    </svg>
                  </div>
                  <span className="mt-1.5 text-[9px] font-bold tracking-widest text-[#7ee8d5] uppercase" style={{ fontFamily: "Inter, sans-serif" }}>Governance</span>
                </div>
              </motion.div>

              {/* 2. Risk — Top Right */}
              <motion.div 
                className="absolute z-10 group cursor-pointer"
                style={{ top: "10%", right: "2%" }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                whileHover={{ scale: 1.08 }}
              >
                <div className="relative flex flex-col items-center">
                  <div className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, transparent 70%)" }} />
                  <div 
                    className="relative w-[62px] h-[62px] rounded-2xl flex items-center justify-center border border-red-500/30 group-hover:border-red-400/60 transition-all duration-300"
                    style={{ background: "linear-gradient(135deg, rgba(239,68,68,0.08) 0%, rgba(13,17,28,0.95) 100%)", backdropFilter: "blur(12px)", boxShadow: "0 0 20px rgba(239,68,68,0.08), inset 0 1px 0 rgba(255,255,255,0.05)" }}
                  >
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
                      <path d="M12 3L2 21h20L12 3z" stroke="#fca5a5" strokeWidth="1.5" fill="rgba(239,68,68,0.06)" />
                      <line x1="12" y1="10" x2="12" y2="14" stroke="#fca5a5" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx="12" cy="17" r="0.8" fill="#fca5a5" />
                    </svg>
                  </div>
                  <span className="mt-1.5 text-[9px] font-bold tracking-widest text-red-300 uppercase" style={{ fontFamily: "Inter, sans-serif" }}>Risk</span>
                  {/* Mini metric badge */}
                  <div className="absolute -top-1 -right-3 px-1.5 py-0.5 rounded-md text-[7px] font-bold text-red-400 border border-red-500/30 data-blink-2" style={{ background: "rgba(239,68,68,0.1)" }}>2</div>
                </div>
              </motion.div>

              {/* 3. Compliance — Bottom Right */}
              <motion.div 
                className="absolute z-10 group cursor-pointer"
                style={{ bottom: "10%", right: "2%" }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                whileHover={{ scale: 1.08 }}
              >
                <div className="relative flex flex-col items-center">
                  <div className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)" }} />
                  <div 
                    className="relative w-[62px] h-[62px] rounded-2xl flex items-center justify-center border border-blue-500/30 group-hover:border-blue-400/60 transition-all duration-300"
                    style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(13,17,28,0.95) 100%)", backdropFilter: "blur(12px)", boxShadow: "0 0 20px rgba(59,130,246,0.08), inset 0 1px 0 rgba(255,255,255,0.05)" }}
                  >
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
                      <circle cx="12" cy="12" r="9" stroke="#93c5fd" strokeWidth="1.5" fill="rgba(59,130,246,0.06)" />
                      <path d="M9 12l2 2 4-4" stroke="#93c5fd" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="mt-1.5 text-[9px] font-bold tracking-widest text-blue-300 uppercase" style={{ fontFamily: "Inter, sans-serif" }}>Compliance</span>
                  <div className="absolute -top-1 -right-5 px-1.5 py-0.5 rounded-md text-[7px] font-bold text-blue-400 border border-blue-500/30 data-blink-1" style={{ background: "rgba(59,130,246,0.1)" }}>SOC2</div>
                </div>
              </motion.div>

              {/* 4. Evidence — Bottom */}
              <motion.div 
                className="absolute z-10 group cursor-pointer"
                style={{ bottom: "2%", left: "50%", transform: "translateX(-50%)" }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                whileHover={{ scale: 1.08, y: 4 }}
              >
                <div className="relative flex flex-col items-center">
                  <div className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)" }} />
                  <div 
                    className="relative w-[62px] h-[62px] rounded-2xl flex items-center justify-center border border-purple-500/30 group-hover:border-purple-400/60 transition-all duration-300"
                    style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.08) 0%, rgba(13,17,28,0.95) 100%)", backdropFilter: "blur(12px)", boxShadow: "0 0 20px rgba(168,85,247,0.08), inset 0 1px 0 rgba(255,255,255,0.05)" }}
                  >
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
                      <ellipse cx="12" cy="7" rx="8" ry="3.5" stroke="#c4b5fd" strokeWidth="1.3" fill="rgba(168,85,247,0.06)" />
                      <path d="M4,7 v10 c0,1.9 3.6,3.5 8,3.5 s8-1.6 8-3.5 V7" stroke="#c4b5fd" strokeWidth="1.3" />
                      <path d="M4,12 c0,1.9 3.6,3.5 8,3.5 s8-1.6 8-3.5" stroke="#c4b5fd" strokeWidth="0.8" opacity="0.5" />
                    </svg>
                  </div>
                  <span className="mt-1.5 text-[9px] font-bold tracking-widest text-purple-300 uppercase" style={{ fontFamily: "Inter, sans-serif" }}>Evidence</span>
                  <div className="absolute -top-1 -right-5 px-1.5 py-0.5 rounded-md text-[7px] font-bold text-purple-400 border border-purple-500/30 data-blink-3" style={{ background: "rgba(168,85,247,0.1)" }}>247</div>
                </div>
              </motion.div>

              {/* 5. Audit — Bottom Left */}
              <motion.div 
                className="absolute z-10 group cursor-pointer"
                style={{ bottom: "10%", left: "2%" }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                whileHover={{ scale: 1.08 }}
              >
                <div className="relative flex flex-col items-center">
                  <div className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)" }} />
                  <div 
                    className="relative w-[62px] h-[62px] rounded-2xl flex items-center justify-center border border-amber-500/30 group-hover:border-amber-400/60 transition-all duration-300"
                    style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(13,17,28,0.95) 100%)", backdropFilter: "blur(12px)", boxShadow: "0 0 20px rgba(245,158,11,0.08), inset 0 1px 0 rgba(255,255,255,0.05)" }}
                  >
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
                      <circle cx="10" cy="10" r="6" stroke="#fcd34d" strokeWidth="1.3" fill="rgba(245,158,11,0.06)" />
                      <line x1="14.5" y1="14.5" x2="20" y2="20" stroke="#fcd34d" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span className="mt-1.5 text-[9px] font-bold tracking-widest text-amber-300 uppercase" style={{ fontFamily: "Inter, sans-serif" }}>Audit</span>
                </div>
              </motion.div>

              {/* 6. Policy — Top Left */}
              <motion.div 
                className="absolute z-10 group cursor-pointer"
                style={{ top: "10%", left: "2%" }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                whileHover={{ scale: 1.08 }}
              >
                <div className="relative flex flex-col items-center">
                  <div className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)" }} />
                  <div 
                    className="relative w-[62px] h-[62px] rounded-2xl flex items-center justify-center border border-cyan-500/30 group-hover:border-cyan-400/60 transition-all duration-300"
                    style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.08) 0%, rgba(13,17,28,0.95) 100%)", backdropFilter: "blur(12px)", boxShadow: "0 0 20px rgba(6,182,212,0.08), inset 0 1px 0 rgba(255,255,255,0.05)" }}
                  >
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
                      <rect x="5" y="3" width="14" height="18" rx="2" stroke="#67e8f9" strokeWidth="1.3" fill="rgba(6,182,212,0.06)" />
                      <line x1="9" y1="8" x2="15" y2="8" stroke="#67e8f9" strokeWidth="0.8" />
                      <line x1="9" y1="11" x2="14" y2="11" stroke="#67e8f9" strokeWidth="0.8" />
                      <line x1="9" y1="14" x2="15" y2="14" stroke="#67e8f9" strokeWidth="0.8" />
                    </svg>
                  </div>
                  <span className="mt-1.5 text-[9px] font-bold tracking-widest text-cyan-300 uppercase" style={{ fontFamily: "Inter, sans-serif" }}>Policy</span>
                </div>
              </motion.div>

              {/* ── Floating HUD Metric Cards ── */}
              {/* Top-right: Posture score */}
              <motion.div 
                className="absolute z-30 data-blink-1"
                style={{ top: "0%", right: "-4%" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.5 }}
              >
                <div className="px-3 py-2 rounded-xl border border-[#3ecfb2]/20" style={{ background: "rgba(17,22,37,0.9)", backdropFilter: "blur(10px)" }}>
                  <div className="text-[10px] font-black text-[#3ecfb2]" style={{ fontFamily: "'Plus Jakarta Sans'" }}>98.7%</div>
                  <div className="text-[7px] font-semibold text-slate-500 tracking-widest uppercase">Posture</div>
                  {/* Mini progress bar */}
                  <div className="w-12 h-[3px] rounded-full bg-slate-800 mt-1">
                    <div className="h-full rounded-full" style={{ width: "98.7%", background: "linear-gradient(90deg, #3ecfb2, #2563eb)" }} />
                  </div>
                </div>
              </motion.div>

              {/* Bottom-left: Frameworks */}
              <motion.div 
                className="absolute z-30 data-blink-4"
                style={{ bottom: "5%", left: "-6%" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                <div className="px-3 py-2 rounded-xl border border-amber-500/20" style={{ background: "rgba(17,22,37,0.9)", backdropFilter: "blur(10px)" }}>
                  <div className="text-[10px] font-black text-amber-400" style={{ fontFamily: "'Plus Jakarta Sans'" }}>6 Active</div>
                  <div className="text-[7px] font-semibold text-slate-500 tracking-widest uppercase">Frameworks</div>
                  <div className="flex gap-0.5 mt-1">
                    {[...Array(6)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />)}
                  </div>
                </div>
              </motion.div>

              {/* Right-center: Controls mapped */}
              <motion.div 
                className="absolute z-30 data-blink-2"
                style={{ top: "42%", right: "-8%" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                <div className="px-3 py-2 rounded-xl border border-blue-500/20" style={{ background: "rgba(17,22,37,0.9)", backdropFilter: "blur(10px)" }}>
                  <div className="text-[10px] font-black text-blue-400" style={{ fontFamily: "'Plus Jakarta Sans'" }}>342</div>
                  <div className="text-[7px] font-semibold text-slate-500 tracking-widest uppercase">Controls</div>
                </div>
              </motion.div>

              {/* ── Orbiting particles ── */}
              <div className="absolute w-[440px] h-[440px] orbit-ring-cw pointer-events-none" style={{ zIndex: 5 }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#3ecfb2] shadow-[0_0_8px_rgba(62,207,178,0.8)]" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(59,130,246,0.6)]" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_6px_rgba(168,85,247,0.6)]" />
              </div>
              <div className="absolute w-[320px] h-[320px] orbit-ring-ccw pointer-events-none" style={{ zIndex: 5 }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-red-400 shadow-[0_0_6px_rgba(239,68,68,0.6)]" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.6)]" />
              </div>

            </motion.div>
            
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────── */}
      {/* 2. THREE PILLARS — Vision, Mission, Values                     */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#111625] relative">
        {/* Subtle ambient glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[300px] pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(37,99,235,0.03) 0%, transparent 70%)" }} />
        
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="text-[#3ecfb2] font-bold uppercase tracking-wider text-xs block mb-3">Who We Are</span>
            <h2 
              className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
            >
              Our Foundation
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillarsList.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-2xl p-8 border text-center flex flex-col items-center justify-start group hover:-translate-y-1 transition-all duration-300"
                style={{ background: "#1e2538", borderColor: "rgba(62, 207, 178, 0.15)" }}
              >
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-[#3ecfb2] mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{ background: "rgba(62, 207, 178, 0.1)" }}
                >
                  <pillar.icon className="w-7 h-7" />
                </div>
                <h3 
                  className="text-xl font-bold text-white mb-3 tracking-wide uppercase"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {pillar.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────── */}
      {/* 3. WHY REGULATTICE — Stats + Key Differentiators               */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0d111c] relative overflow-hidden border-t border-slate-800/40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(62,207,178,0.03) 0%, transparent 70%)" }} />
        
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="text-[#3ecfb2] font-bold uppercase tracking-wider text-xs block mb-3">Why ReguLattice</span>
            <h2 
              className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
            >
              What Sets Us Apart
            </h2>
          </motion.div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {statsList.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="text-center p-6 rounded-2xl border"
                style={{ background: "#141927", borderColor: "rgba(62,207,178,0.1)" }}
              >
                <div 
                  className="text-3xl md:text-4xl font-black text-transparent bg-clip-text mb-2"
                  style={{ backgroundImage: "linear-gradient(135deg, #3ecfb2, #2563eb)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {stat.value}
                </div>
                <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Differentiators grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {differentiatorsList.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex items-start gap-5 p-6 rounded-2xl border group hover:border-[#3ecfb2]/30 transition-all duration-300"
                style={{ background: "#1e2538", borderColor: "rgba(255,255,255,0.06)" }}
              >
                <div 
                  className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{ background: "rgba(62,207,178,0.08)" }}
                >
                  <item.icon className="w-6 h-6 text-[#3ecfb2]" />
                </div>
                <div>
                  <h4 
                    className="text-white font-bold text-base mb-1.5"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {item.title}
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────── */}
      {/* 4. GRC LIFECYCLE — Circular Workflow                           */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <section id="lifecycle" className="py-24 bg-[#111625] relative overflow-hidden border-t border-slate-800/40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="text-[#3ecfb2] font-bold uppercase tracking-wider text-xs block mb-3">GRC Lifecycle</span>
            <h2 
              className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
            >
              Continual Improvement for GRC
            </h2>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
            
            {/* Left: Interactive Circular Diagram */}
            <div className="w-full lg:w-1/2 flex items-center justify-center relative">
              <div className="w-[300px] h-[300px] md:w-[360px] md:h-[360px] rounded-full border border-slate-800/60 relative flex items-center justify-center">
                {/* Central Status Core */}
                <div className="w-[140px] h-[140px] md:w-[160px] md:h-[160px] rounded-full bg-[#111625] border border-[#3ecfb2]/30 flex flex-col items-center justify-center text-center p-3 shadow-lg shadow-[#3ecfb2]/5 relative z-10">
                  <div className="w-8 h-8 rounded-lg bg-[#3ecfb2]/10 text-[#3ecfb2] flex items-center justify-center mb-2">
                    <Award className="w-5 h-5" />
                  </div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Step</h4>
                  <p className="text-xs font-bold text-[#3ecfb2] mt-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {lifecycleSteps[activeLifecycleStep].name}
                  </p>
                </div>

                {/* Orbital nodes */}
                {lifecycleSteps.map((step, idx) => {
                  const angle = (idx * 360) / lifecycleSteps.length;
                  const isActive = activeLifecycleStep === idx;
                  return (
                    <button
                      key={step.name}
                      onClick={() => setActiveLifecycleStep(idx)}
                      className="absolute w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-300 focus:outline-none z-20 group"
                      style={{
                        transform: `rotate(${angle}deg) translate(150px) rotate(-${angle}deg)`,
                        background: isActive ? "#3ecfb2" : "#111625",
                        color: isActive ? "#0d111c" : "#94a3b8",
                        borderColor: isActive ? "#3ecfb2" : "rgba(255,255,255,0.08)",
                        boxShadow: isActive ? "0 0 15px rgba(62,207,178,0.4)" : "none",
                      }}
                    >
                      <span className="group-hover:scale-110 transition-transform">{idx + 1}</span>
                      <span className="absolute bottom-14 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-white text-[9px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-30">
                        {step.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Step Explanations */}
            <div className="w-full lg:w-1/2 text-left">
              <div className="bg-[#1e2538] border border-slate-800/80 rounded-3xl p-8 max-w-lg shadow-xl relative">
                <AnimatePresence mode="wait">
                  {lifecycleSteps.map((step, idx) => {
                    if (idx !== activeLifecycleStep) return null;
                    return (
                      <motion.div
                        key={step.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 rounded-lg bg-[#3ecfb2]/10 text-[#3ecfb2] font-black text-sm flex items-center justify-center">
                            {idx + 1}
                          </div>
                          <h3 
                            className="text-2xl font-bold text-white tracking-wide uppercase"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                          >
                            {step.name}
                          </h3>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed mb-6">
                          {step.desc}
                        </p>
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Key Deliverable:</h4>
                          <div className="flex items-center gap-2.5 text-xs text-[#7ee8d5]">
                            <CheckCircle2 className="w-4 h-4 text-[#3ecfb2]" />
                            <span>{step.deliverable}</span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────── */}
      {/* 5. TECHNOLOGY & FRAMEWORKS GRID                                */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0d111c] relative border-t border-slate-800/40">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Grid of Framework Badges */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 order-2 lg:order-1"
            >
              {frameworksList.map((fw) => (
                <div 
                  key={fw}
                  className="rounded-xl p-4 border border-slate-800/60 bg-[#141927] hover:border-[#3ecfb2]/20 hover:bg-[#1a2133] text-center transition-all duration-300"
                >
                  <div className="text-[10px] font-bold text-[#3ecfb2]/85 uppercase tracking-widest mb-1.5">Standard</div>
                  <div 
                    className="text-base font-extrabold text-white tracking-wide"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {fw}
                  </div>
                </div>
              ))}
              {/* Certifications Badges */}
              {certificationsList.map((cert) => (
                <div 
                  key={cert}
                  className="rounded-xl p-4 border border-blue-500/25 bg-[#141927]/90 hover:border-blue-400/45 text-center transition-all"
                >
                  <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1.5">Expertise</div>
                  <div 
                    className="text-base font-extrabold text-white tracking-wide"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {cert}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Right details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-left order-1 lg:order-2"
            >
              <span className="font-bold uppercase tracking-wider text-xs block mb-3 text-[#3ecfb2]">Global Standards</span>
              <h2 
                className="text-3xl md:text-4xl font-extrabold text-white uppercase mb-6 tracking-tight"
                style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
              >
                Our Technology and Expertise
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                ReguLattice automates evidence mapping and continuous audit validation across leading compliance frameworks. Our system works seamlessly, keeping you secure globally.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Our advisors hold top cybersecurity credentials, assuring our localized automation engine aligns with standard auditing protocols globally.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────── */}
      {/* 6. FOUNDER SECTION                                             */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <FounderSection />

      {/* ──────────────────────────────────────────────────────────────── */}
      {/* 7. BOTTOM CTA                                                  */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden bg-[#0d111c]">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(62,207,178,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(62,207,178,0.02) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(62,207,178,0.04) 0%, transparent 70%)" }} />

        <div className="container mx-auto px-6 text-center relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-12 border bg-[#1e2538] shadow-2xl relative overflow-hidden"
            style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}
          >
            {/* Glow orbs */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#3ecfb2]/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />

            <h2 
              className="text-3xl md:text-5xl font-black text-white mb-6 uppercase relative z-10"
              style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
            >
              Ready to experience autonomous compliance?
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto relative z-10">
              Take a 15-minute mock audit to see how ReguLattice evaluates your security posture in real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
              <button onClick={openBooking} className="btn-amber text-sm gap-2">
                Book a Demo
              </button>
              <a href="/assessment" className="flex items-center gap-2 font-semibold text-[#3ecfb2] hover:text-[#7ee8d5] transition-colors text-sm">
                Start Assessment <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer onContact={openContact} />
      <ContactFormModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}

/* ─── DATA ────────────────────────────────────────────────────────────── */

const pillarsList = [
  {
    icon: Eye,
    title: "Our Vision",
    desc: "To deliver zero-friction, sovereign compliance infrastructure that runs autonomously on customer premises without leaking metadata.",
  },
  {
    icon: Target,
    title: "Our Mission",
    desc: "To automate 100% of GRC evidence mapping, screenshot collections, and mock audits, cutting enterprise sales cycles by 10x.",
  },
  {
    icon: Heart,
    title: "Our Core Values",
    desc: "We stand on absolute engineering excellence, metadata isolation (sovereignty), and continuous audit readiness.",
  },
];

const statsList = [
  { value: "10+", label: "Frameworks Supported" },
  { value: "100%", label: "Air-Gapped Deployment" },
  { value: "24/7", label: "Autonomous Monitoring" },
  { value: "10x", label: "Faster Audit Cycles" },
];

const differentiatorsList = [
  {
    icon: Lock,
    title: "Sovereign & Air-Gapped",
    desc: "Your data never leaves your infrastructure. Fully on-premises with zero cloud dependency for evidence processing.",
  },
  {
    icon: Bot,
    title: "AI-Powered Agents",
    desc: "Autonomous agents that continuously collect evidence, remediate gaps, and simulate auditor queries 24/7.",
  },
  {
    icon: Globe,
    title: "Multi-Framework Coverage",
    desc: "Single unified platform covering ISO 27001, SOC 2, SAMA, NIST CSF, PCI-DSS, HIPAA, and more.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Compliance Dashboard",
    desc: "Live posture scoring and gap analysis that keeps your team always audit-ready with actionable insights.",
  },
];

const lifecycleSteps = [
  {
    name: "Gap Assessment",
    desc: "We scan current stack infrastructure against frameworks to identify control deficiencies immediately.",
    deliverable: "Gap Assessment Score & Vulnerability Report",
  },
  {
    name: "Control Mapping",
    desc: "Our engine maps physical cloud configs, code pipelines, and policies to specific standards like ISO 27001 and SAMA.",
    deliverable: "Control Lattice Graph Model",
  },
  {
    name: "Evidence Collection",
    desc: "Agents autonomously collect audit-ready logs, configuration states, and screenshot evidence.",
    deliverable: "Secure evidence locker files",
  },
  {
    name: "Auto Remediation",
    desc: "Identified security gaps are fixed automatically or provided with one-click patches.",
    deliverable: "One-click gap closures & patches",
  },
  {
    name: "Mock Audits",
    desc: "Localized GRC agents run mock audits to simulate real auditor queries and verify readiness.",
    deliverable: "Simulated Auditor Scorecard",
  },
  {
    name: "Continuous Certification",
    desc: "Once audit-ready, the system continuously logs updates and maintains compliance trails dynamically.",
    deliverable: "Always-on posture dashboard",
  },
];

const frameworksList = [
  "ISO 27001",
  "SOC 2",
  "SAMA",
  "NIST CSF",
  "PCI-DSS",
  "HIPAA",
];

const certificationsList = [
  "CISSP",
  "CISA",
  "ISO AUDITOR",
  "CISM",
];
