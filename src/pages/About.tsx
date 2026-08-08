import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormModal from "@/components/ContactFormModal";
import { 
  Sparkles, Award, ArrowRight, CheckCircle2, Target, Eye, Heart, 
  Globe, Lock, Bot, BarChart3, Shield, Scale, Info, Check, HelpCircle, AlertTriangle
} from "lucide-react";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
    };
  }
}

// 7 Autonomous Agents Data
const agentsList = [
  {
    id: "01",
    name: "Discovery Agent",
    tag: "Continuous Asset Discovery",
    icon: Eye,
    desc: "Continuously scans repositories, model registries, cloud infrastructure, and internal networks to map every active AI model, LLM, custom agent, and third-party API in use. Instantly identifies shadow AI deployments.",
    status: "Active Scanning",
    color: "text-teal-400",
    glowColor: "rgba(20,184,166,0.15)",
    borderColor: "border-teal-500/20",
    standard: "ISO 42001 A.8.2.1 (AI Cataloging)"
  },
  {
    id: "02",
    name: "Classification Agent",
    tag: "Autonomous Risk Tiering",
    icon: Target,
    desc: "Analyzes model purpose, training datasets, and system boundaries to assign risk tiers (e.g., Annex III High Risk under the EU AI Act) and regulatory scopes without requiring manual questionnaires.",
    status: "Analyzing Models",
    color: "text-indigo-400",
    glowColor: "rgba(99,102,241,0.15)",
    borderColor: "border-indigo-500/20",
    standard: "EU AI Act Title III Compliance"
  },
  {
    id: "03",
    name: "Control Agent",
    tag: "Automated Control Mapping",
    icon: Shield,
    desc: "Translates high-level legal guidelines and safety standards into technical guardrails and mappings, ensuring a single control satisfies multiple standards (ISO 42001, NIST, EU AI Act) simultaneously.",
    status: "Enforcing Controls",
    color: "text-rose-400",
    glowColor: "rgba(244,63,94,0.15)",
    borderColor: "border-rose-500/20",
    standard: "NIST AI RMF Gov & Map"
  },
  {
    id: "04",
    name: "Evidence Agent",
    tag: "Immutable Cryptographic Proof",
    icon: Lock,
    desc: "Collects model evaluation data, training logs, and runtime inputs, creating cryptographically timestamped evidence chains that record conformity as work happens, eliminating audit-prep panic.",
    status: "Logging Evidence",
    color: "text-purple-400",
    glowColor: "rgba(168,85,247,0.15)",
    borderColor: "border-purple-500/20",
    standard: "ISO 42001 A.9 (Evaluation)"
  },
  {
    id: "05",
    name: "Monitoring Agent",
    tag: "Drift & Safety Telemetry",
    icon: BarChart3,
    desc: "Watches inference logs in real-time, tracking semantic drift, output bias, toxicity alerts, and policy violations to re-trigger risk evaluation automatically in production.",
    status: "Monitoring Signals",
    color: "text-emerald-400",
    glowColor: "rgba(16,185,129,0.15)",
    borderColor: "border-emerald-500/20",
    standard: "EU AI Act Post-Market Monitor"
  },
  {
    id: "06",
    name: "Authority Agent",
    tag: "Decision Reversibility Ledger",
    icon: Scale,
    desc: "Tracks the level of autonomy delegated to each agentic pipeline, recording human-in-the-loop sign-offs, authority escalations, and verifying active paths for reversing decisions.",
    status: "Ledger Synced",
    color: "text-cyan-400",
    glowColor: "rgba(6,182,212,0.15)",
    borderColor: "border-cyan-500/20",
    standard: "ISO 38507 (Corporate Governance)"
  },
  {
    id: "07",
    name: "Assurance Agent",
    tag: "Conformity Docs Generator",
    icon: Award,
    desc: "Autonomously drafts model cards, system descriptions, and compliance conformity packs, outputting audit-ready Statements of Applicability and legal files in seconds.",
    status: "Ready to Export",
    color: "text-amber-400",
    glowColor: "rgba(245,158,11,0.15)",
    borderColor: "border-amber-500/20",
    standard: "ISO 42001 Statement of Applicability"
  }
];

// Interactive Systems for the Authority Matrix
const mockSystems = [
  {
    id: "rag-kb",
    name: "Internal Helpdesk RAG Bot",
    desc: "Provides customer support agents with manual query assistance from internal documents. Has no autonomous write access.",
    authority: "retained",
    reversibility: "reversible",
    quadrant: "MONITOR",
    control: "Log all prompt histories and sample 5% of responses weekly for bias or hallucinations. Minimal deployment friction."
  },
  {
    id: "clinical-copilot",
    name: "Clinical Cancer Diagnostic Assistant",
    desc: "Assists oncologists by recommending tumor treatment therapy options based on research database matches.",
    authority: "retained",
    reversibility: "irreversible",
    quadrant: "SIGN-OFF",
    control: "AI provides options, but a certified clinical physician must review, edit, and sign off on all drug therapy prescriptions before execution."
  },
  {
    id: "purchase-agent",
    name: "Autonomous Purchase Order Agent",
    desc: "Automated agent that evaluates supply inventory and issues vendor purchase orders up to $5,000.",
    authority: "delegated",
    reversibility: "reversible",
    quadrant: "GUARDRAIL",
    control: "Strict transaction cap at $5k; real-time validation checks verify merchant metadata before payment. Transactions >$5k auto-escalate."
  },
  {
    id: "fx-trader",
    name: "Algorithmic FX Trading Bot",
    desc: "High-frequency autonomous agent that executes currency trades directly on external exchanges.",
    authority: "delegated",
    reversibility: "irreversible",
    quadrant: "BLOCKED",
    control: "Hard stop. Autonomous execution disabled due to lack of real-time human rollback guarantees. Requires board-level override."
  }
];

export default function About() {
  const [contactOpen, setContactOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Talk to an Expert");
  const [modalDesc, setModalDesc] = useState("We'll get back to you within 24 hours.");
  
  const [activeAgentIndex, setActiveAgentIndex] = useState<number>(0);
  const [selectedSystemId, setSelectedSystemId] = useState<string>("rag-kb");
  
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "ReguLattice | AI-Native Governance Risk Compliance Platform";
  }, []);

  const openBooking = () => {
    setModalTitle("Book a Live Demo");
    setModalDesc("Schedule a 15-minute live walkthrough of the platform.");
    setContactOpen(true);
  };

  const openContact = () => {
    setModalTitle("Contact Sales");
    setModalDesc("Talk to our AI governance experts. We will respond within an hour.");
    setContactOpen(true);
  };

  const openAssessment = () => {
    navigate("/assessment");
  };

  const selectedSystem = mockSystems.find(s => s.id === selectedSystemId) || mockSystems[0];

  return (
    <div className="min-h-screen bg-[#0d111c] text-white">
      <Navbar onBooking={openBooking} onContact={openContact} />

      <style>{`
        @keyframes dash-flow {
          to { stroke-dashoffset: -40; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.8; }
          50% { transform: scale(1.15); opacity: 0.3; }
          100% { transform: scale(0.95); opacity: 0.8; }
        }
        @keyframes float-card {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-card-reverse {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(8px); }
        }
        @keyframes radial-pulse {
          0% { transform: scale(0.9); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .animate-float {
          animation: float-card 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-card-reverse 7s ease-in-out infinite;
        }
        .circuit-wire {
          stroke-dasharray: 6, 4;
          animation: dash-flow 4s linear infinite;
        }
        .pulse-orb {
          animation: radial-pulse 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
        .pulse-circle {
          animation: pulse-ring 4s ease-in-out infinite;
        }
      `}</style>

      {/* ──────────────────────────────────────────────────────────────── */}
      {/* SECTION A: HERO SECTION                                        */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-slate-800/60 bg-[#0d111c]">
        {/* Subtle grid backdrop */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(62,207,178,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(62,207,178,0.015) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute top-0 left-1/4 w-[700px] h-[350px] pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(62,207,178,0.03) 0%, transparent 70%)" }} />

        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Hero Left Content */}
            <div className="w-full lg:w-1/2 text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div 
                  className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest mb-6" 
                  style={{ background: "rgba(62,207,178,0.08)", borderColor: "rgba(62,207,178,0.2)", color: "#7ee8d5" }}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#3ecfb2]" /> SOVEREIGN AI GOVERNANCE
                </div>
                
                <h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-6 text-white"
                  style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
                >
                  Continuous AI Governance <br />
                  Powered by <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #3ecfb2, #3b82f6)" }}>7 Autonomous Agents</span>
                </h1>
                
                <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
                  From Shadow AI discovery to continuous evidence & authority ledgers. ReguLattice auto-discovers models, enforces decision boundaries, and keeps you audit-ready for ISO/IEC 42001 and the EU AI Act.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={openAssessment}
                    className="px-7 py-3.5 rounded-full bg-[#3ecfb2] hover:bg-[#2ebfa2] text-slate-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-[#3ecfb2]/10"
                  >
                    Start Free 14-Day Trial
                  </button>
                  <button 
                    onClick={openBooking}
                    className="px-7 py-3.5 rounded-full border border-slate-700 hover:border-slate-500 text-white font-semibold text-sm tracking-wide transition-all"
                  >
                    Schedule Live Demo
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Hero Right Content: Visual Mapping Pipeline Animation */}
            <div className="w-full lg:w-1/2 flex items-center justify-center relative min-h-[380px]">
              <motion.div 
                className="w-full max-w-[540px] aspect-[4/3] relative flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.15 }}
              >
                {/* SVG Connections and Glow particles */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 350" fill="none">
                  {/* Left connections to Center */}
                  <path d="M 90,80 Q 180,80 250,175" stroke="rgba(59,130,246,0.2)" strokeWidth="1.5" className="circuit-wire" />
                  <path d="M 90,175 H 250" stroke="rgba(6,182,212,0.2)" strokeWidth="1.5" className="circuit-wire" />
                  <path d="M 90,270 Q 180,270 250,175" stroke="rgba(168,85,247,0.2)" strokeWidth="1.5" className="circuit-wire" />
                  
                  {/* Center to Right connections */}
                  <path d="M 250,175 H 410" stroke="rgba(16,185,129,0.25)" strokeWidth="1.5" className="circuit-wire" />

                  {/* Flow Particles */}
                  <circle r="3.5" fill="#3b82f6" filter="url(#hero-glow)">
                    <animateMotion dur="4.2s" repeatCount="indefinite" path="M 90,80 Q 180,80 250,175" />
                  </circle>
                  <circle r="3.5" fill="#06b6d4" filter="url(#hero-glow)">
                    <animateMotion dur="3.5s" repeatCount="indefinite" path="M 90,175 H 250" />
                  </circle>
                  <circle r="3.5" fill="#a855f7" filter="url(#hero-glow)">
                    <animateMotion dur="4.8s" repeatCount="indefinite" path="M 90,270 Q 180,270 250,175" />
                  </circle>
                  <circle r="4" fill="#10b981" filter="url(#hero-glow)">
                    <animateMotion dur="2.8s" repeatCount="indefinite" path="M 250,175 H 410" />
                  </circle>

                  {/* Glow filter definition */}
                  <defs>
                    <filter id="hero-glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                </svg>

                {/* Left Side: Discovered AI models */}
                <div className="absolute left-[2%] flex flex-col gap-8">
                  {/* HF Model */}
                  <div className="animate-float flex items-center gap-3 px-4 py-2.5 rounded-xl border border-blue-500/20 bg-[#141927]/90 shadow-lg" style={{ backdropFilter: "blur(8px)" }}>
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                    <div className="text-left">
                      <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Registry</div>
                      <div className="text-xs font-semibold text-slate-200">Custom SLM</div>
                    </div>
                  </div>
                  {/* GPT API */}
                  <div className="animate-float-delayed flex items-center gap-3 px-4 py-2.5 rounded-xl border border-cyan-500/20 bg-[#141927]/90 shadow-lg" style={{ backdropFilter: "blur(8px)" }}>
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
                    <div className="text-left">
                      <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">AI API</div>
                      <div className="text-xs font-semibold text-slate-200">External LLM API</div>
                    </div>
                  </div>
                  {/* Custom ML Database */}
                  <div className="animate-float flex items-center gap-3 px-4 py-2.5 rounded-xl border border-purple-500/20 bg-[#141927]/90 shadow-lg" style={{ backdropFilter: "blur(8px)" }}>
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
                    <div className="text-left">
                      <div className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Vector DB</div>
                      <div className="text-xs font-semibold text-slate-200">Internal RAG Pipeline</div>
                    </div>
                  </div>
                </div>

                {/* Center: Pulsing AI Engine Core */}
                <div className="absolute z-10 flex items-center justify-center">
                  <div className="absolute w-[120px] h-[120px] rounded-full border border-emerald-500/30 pulse-orb" />
                  <div className="absolute w-[120px] h-[120px] rounded-full border border-emerald-500/15 pulse-circle" />
                  
                  <div className="relative w-24 h-24 rounded-full flex flex-col items-center justify-center border-2 border-emerald-500 bg-[#0f172a] shadow-[0_0_35px_rgba(16,185,129,0.3)]">
                    <Bot className="w-8 h-8 text-emerald-400 mb-0.5" />
                    <div className="text-[8px] font-black text-emerald-400 tracking-widest uppercase">7 AGENTS</div>
                  </div>
                </div>

                {/* Right Side: Conformity Documents */}
                <div className="absolute right-[4%] animate-float">
                  <div className="px-5 py-4 rounded-xl border border-emerald-500/20 bg-[#141927]/95 shadow-xl w-48 text-left" style={{ backdropFilter: "blur(10px)" }}>
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800">
                      <Award className="w-4 h-4 text-emerald-400" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Conformity Pack</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[10px] text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>ISO 42001 Mapped</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>EU AI Act Artifacts</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>NIST AI RMF Synced</span>
                      </div>
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────── */}
      {/* SECTION B: THE 3-STEP GOVERNANCE FLYWHEEL BANNER                 */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#111625] relative border-b border-slate-800/40">
        <div className="container mx-auto px-6 max-w-6xl text-center relative z-10">
          
          {/* Quote Block */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14 max-w-2xl mx-auto"
          >
            <span className="text-[32px] text-slate-500 font-serif leading-none block mb-2">“</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-relaxed italic px-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              You can't govern AI you don't know exists.
            </h2>
            <div className="text-slate-400 text-xs font-semibold uppercase tracking-widest mt-4">
              Value Statement: <span className="text-[#3ecfb2]">Governance becomes continuous, machine-executed, and provable.</span>
            </div>
          </motion.div>

          <h3 className="text-xs font-black uppercase tracking-[0.25em] text-slate-500 mb-8">The 3-Step Governance Flywheel</h3>

          {/* Horizontal Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <motion.div 
              className="bg-[#141927] border border-slate-800 rounded-2xl p-6 text-left hover:border-slate-700 transition-all group relative"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 font-bold flex items-center justify-center text-sm">01</div>
                <h4 className="text-base font-bold text-white uppercase tracking-wider">SEE IT</h4>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Autonomous discovery of every model, agent, copilot, and third-party AI API across the enterprise estate.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              className="bg-[#141927] border border-slate-800 rounded-2xl p-6 text-left hover:border-slate-700 transition-all group relative"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-[#3ecfb2] font-bold flex items-center justify-center text-sm">02</div>
                <h4 className="text-base font-bold text-white uppercase tracking-wider">GOVERN IT</h4>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Automated risk tiering, model card registry applications, and decision authority control mapped continuously.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              className="bg-[#141927] border border-slate-800 rounded-2xl p-6 text-left hover:border-slate-700 transition-all group relative"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold flex items-center justify-center text-sm">03</div>
                <h4 className="text-base font-bold text-white uppercase tracking-wider">PROVE IT</h4>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Conformity packs, compliance logs, and cryptographically verified evidence logs generated dynamically on demand.
              </p>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────── */}
      {/* SECTION C: THE 7 AUTONOMOUS AGENTS                              */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0d111c] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(37,99,235,0.02) 0%, transparent 70%)" }} />

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="text-[#3ecfb2] font-bold uppercase tracking-wider text-xs block mb-3">Governance that runs itself</span>
            <h2 
              className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
            >
              C. The 7 Autonomous Agents
            </h2>
            <p className="text-slate-400 text-sm mt-3 max-w-lg mx-auto">
              One platform. Seven agents. Autonomous processes handling asset cataloging, mapping, and monitoring without human overhead.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Left: Interactive Semicircle Arc (Visible on large screens) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center relative min-h-[360px] md:min-h-[420px] order-2 lg:order-1">
              {/* Outer Orbit loop line */}
              <div className="w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-full border border-slate-800/40 relative flex items-center justify-center">
                
                {/* Central Status Node */}
                <div className="w-[130px] h-[130px] md:w-[150px] md:h-[150px] rounded-full bg-[#111625] border border-slate-800 flex flex-col items-center justify-center text-center p-3 shadow-xl relative z-10">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 text-[#3ecfb2] flex items-center justify-center mb-2">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h4 className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Active Agent</h4>
                  <p className="text-[11px] font-black text-white mt-0.5 uppercase tracking-wide" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {agentsList[activeAgentIndex].name}
                  </p>
                  <div className="mt-1.5 flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                    <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-[7.5px] font-bold text-slate-400 uppercase tracking-wider">{agentsList[activeAgentIndex].status}</span>
                  </div>
                </div>

                {/* Semicircular orbital buttons */}
                {agentsList.map((agent, idx) => {
                  const total = agentsList.length;
                  // Map nodes along an arc spanning from 180 (left) to 360 (right) degrees
                  const angle = 180 + (idx * 180) / (total - 1);
                  const angleRad = (angle * Math.PI) / 180;
                  const isActive = activeAgentIndex === idx;
                  const Icon = agent.icon;
                  
                  // Radius of orbit in pixels
                  const radius = 135; // default for mobile
                  const mdRadius = 175; // for desktop

                  return (
                    <button
                      key={agent.id}
                      onClick={() => setActiveAgentIndex(idx)}
                      className={`absolute w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-all duration-300 focus:outline-none z-20 group`}
                      style={{
                        // Coordinates calculated via trigonometry
                        left: `calc(50% + ${Math.cos(angleRad) * 50}% - 20px)`,
                        top: `calc(50% + ${Math.sin(angleRad) * 50}% - 20px)`,
                        transform: `translate(${Math.cos(angleRad) * (radius - 50)}px, ${Math.sin(angleRad) * (radius - 50)}px)`,
                        background: isActive ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" : "#141927",
                        color: isActive ? "#0d111c" : "#94a3b8",
                        borderColor: isActive ? "#10b981" : "rgba(255,255,255,0.06)",
                        boxShadow: isActive ? "0 0 20px rgba(16,185,129,0.3)" : "none",
                      }}
                    >
                      <Icon className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
                      <span className="absolute bottom-12 bg-slate-900 border border-slate-700 text-white text-[8px] font-bold px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-30">
                        {agent.id} {agent.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Active Agent Details Description Card */}
            <div className="w-full lg:w-1/2 text-left order-1 lg:order-2">
              <div className="bg-[#1e2538] border border-slate-800 rounded-3xl p-8 max-w-lg shadow-2xl relative min-h-[300px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-extrabold uppercase px-2 py-1 rounded bg-[#3ecfb2]/10 text-[#3ecfb2] tracking-wider">
                      AGENT {agentsList[activeAgentIndex].id}
                    </span>
                    <h3 
                      className="text-2xl font-bold text-white tracking-wide uppercase"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {agentsList[activeAgentIndex].name}
                    </h3>
                  </div>
                  
                  <div className="text-slate-200 text-sm font-semibold mb-3">
                    {agentsList[activeAgentIndex].tag}
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {agentsList[activeAgentIndex].desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 space-y-3">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Regulatory Mapping:</div>
                  <div className="flex items-center gap-2.5 text-xs text-[#7ee8d5]">
                    <CheckCircle2 className="w-4 h-4 text-[#3ecfb2]" />
                    <span>{agentsList[activeAgentIndex].standard}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────── */}
      {/* SECTION D: THE AI AUTHORITY & REVERSIBILITY ENGINE MATRIX        */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#111625] relative border-t border-slate-800/40">
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="text-[#3ecfb2] font-bold uppercase tracking-wider text-xs block mb-3">Unique Control Capability</span>
            <h2 
              className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
            >
              D. The AI Authority & Reversibility Engine Matrix
            </h2>
            <p className="text-slate-400 text-sm mt-3 max-w-xl mx-auto">
              "The control nobody else ships." Every AI system is placed on two axes: **how much authority it holds**, and **whether its decisions can be undone**. The quadrant determines the security control.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left/Middle: The 2x2 Matrix Grid (8 cols on desktop) */}
            <div className="lg:col-span-8 flex flex-col items-center">
              
              {/* Matrix Layout */}
              <div className="relative w-full max-w-[500px] aspect-square flex flex-col justify-between border-l-2 border-b-2 border-slate-600 p-2">
                
                {/* Y-Axis Label: Authority */}
                <div className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 flex gap-12">
                  <span>Delegated</span>
                  <span>Authority</span>
                  <span>Retained</span>
                </div>

                {/* X-Axis Label: Actions */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 flex gap-12">
                  <span>Reversible</span>
                  <span>Actions</span>
                  <span>Irreversible</span>
                </div>

                {/* Quadrants Row 1 (Retained Authority) */}
                <div className="flex h-[48%] justify-between mb-[4%]">
                  {/* MONITOR Quadrant */}
                  <div 
                    className={`w-[48%] h-full rounded-xl p-4 flex flex-col justify-between border transition-all duration-300 ${selectedSystem.quadrant === "MONITOR" ? "border-blue-500 bg-blue-950/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]" : "border-slate-800 bg-[#141927]/60"}`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-blue-400 mb-1">
                        <Eye className="w-3.5 h-3.5" /> MONITOR
                      </div>
                      <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Retained + Reversible</div>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Log and sample model outputs. Minimal integration friction.
                    </p>
                  </div>

                  {/* SIGN-OFF Quadrant */}
                  <div 
                    className={`w-[48%] h-full rounded-xl p-4 flex flex-col justify-between border transition-all duration-300 ${selectedSystem.quadrant === "SIGN-OFF" ? "border-cyan-500 bg-cyan-950/20 shadow-[0_0_20px_rgba(6,182,212,0.15)]" : "border-slate-800 bg-[#141927]/60"}`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> SIGN-OFF
                      </div>
                      <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Retained + Irreversible</div>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      A named human practitioner must sign off before execution.
                    </p>
                  </div>
                </div>

                {/* Quadrants Row 2 (Delegated Authority) */}
                <div className="flex h-[48%] justify-between">
                  {/* GUARDRAIL Quadrant */}
                  <div 
                    className={`w-[48%] h-full rounded-xl p-4 flex flex-col justify-between border transition-all duration-300 ${selectedSystem.quadrant === "GUARDRAIL" ? "border-purple-500 bg-purple-950/20 shadow-[0_0_20px_rgba(168,85,247,0.15)]" : "border-slate-800 bg-[#141927]/60"}`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-purple-400 mb-1">
                        <Shield className="w-3.5 h-3.5" /> GUARDRAIL
                      </div>
                      <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Delegated + Reversible</div>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Automated limits, circuit breakers, and continuous telemetry checks.
                    </p>
                  </div>

                  {/* BLOCKED Quadrant */}
                  <div 
                    className={`w-[48%] h-full rounded-xl p-4 flex flex-col justify-between border transition-all duration-300 ${selectedSystem.quadrant === "BLOCKED" ? "border-rose-500 bg-rose-950/20 shadow-[0_0_20px_rgba(244,63,94,0.15)]" : "border-slate-800 bg-[#141927]/60"}`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 mb-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> BLOCKED
                      </div>
                      <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Delegated + Irreversible</div>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Hard stop until authority is manually escalated and verified.
                    </p>
                  </div>
                </div>

                {/* Animated active tracer node inside the matrix */}
                <div 
                  className="absolute w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_12px_#10b981] transition-all duration-700 ease-out z-10"
                  style={{
                    // Map positions: Monitor (25%, 25%), Sign-off (75%, 25%), Guardrail (25%, 75%), Blocked (75%, 75%)
                    left: selectedSystem.quadrant === "MONITOR" || selectedSystem.quadrant === "GUARDRAIL" ? "25%" : "75%",
                    top: selectedSystem.quadrant === "MONITOR" || selectedSystem.quadrant === "SIGN-OFF" ? "25%" : "75%",
                    transform: "translate(-8px, -8px)"
                  }}
                />

              </div>

            </div>

            {/* Right: Dynamic System Selector Tool (4 cols on desktop) */}
            <div className="lg:col-span-4 text-left">
              <div className="bg-[#1e2538] border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
                
                <div>
                  <h4 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-3">Live System Tracer</h4>
                  <div className="flex flex-col gap-2.5">
                    {mockSystems.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSelectedSystemId(s.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl border text-xs font-semibold tracking-wide transition-all ${selectedSystemId === s.id ? "bg-emerald-500 text-slate-950 border-emerald-500 font-bold" : "bg-[#141927] text-slate-300 border-slate-800 hover:border-slate-700"}`}
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Result Control Output */}
                <div className="pt-5 border-t border-slate-800/80 space-y-3">
                  <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Enforced Control Strategy:</div>
                  <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-white mb-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>{selectedSystem.quadrant} Pack Control</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                      {selectedSystem.control}
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────── */}
      {/* SECTION E: REDESIGNED PRICING & BUSINESS MODEL                  */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 bg-[#0d111c] relative overflow-hidden border-t border-slate-800/40">
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="text-[#3ecfb2] font-bold uppercase tracking-wider text-xs block mb-3">Pricing Models</span>
            <h2 
              className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
            >
              E. Transparent Pricing & Business Model
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              Start governing immediately. Select the capacity fits your engineering footprint.
            </p>
          </motion.div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            
            {/* Starter Plan */}
            <motion.div 
              className="bg-[#141927] border border-slate-800 rounded-3xl p-8 flex flex-col justify-between hover:border-slate-700 transition-all text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Starter</h3>
                <div className="text-xs text-slate-400 mb-6">Tier deculling, ontlox and teamonogystat features.</div>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-black text-white">$79</span>
                  <span className="text-slate-500 text-sm">/month</span>
                </div>
                <ul className="space-y-4 text-xs text-slate-300">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Shadow AI discovery</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>EU AI Risk Tiering</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>EU AI Risk Tiering</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Continuous Dependency</span>
                  </li>
                </ul>
              </div>
              <button onClick={openContact} className="mt-8 w-full py-3 rounded-xl border border-slate-800 hover:border-slate-600 bg-slate-900 text-xs font-bold text-white transition-all uppercase tracking-wider">
                Start Trial
              </button>
            </motion.div>

            {/* Pro Plan */}
            <motion.div 
              className="bg-[#1e2538] border-2 border-emerald-500/80 rounded-3xl p-8 flex flex-col justify-between shadow-2xl text-left relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="absolute top-0 right-8 -translate-y-1/2 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-bold text-[9px] uppercase tracking-wider">Recommended</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
                <div className="text-xs text-slate-400 mb-6">Business offler, enming, and quanrity trace leetons.</div>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-black text-white">$219</span>
                  <span className="text-slate-500 text-sm">/month</span>
                </div>
                <ul className="space-y-4 text-xs text-slate-300">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Local RAG Mapping</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Risk Risk Tiering</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Multi-Framework Ring</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>TTL Continuous</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Drift & Behaviouring</span>
                  </li>
                </ul>
              </div>
              <button onClick={openContact} className="mt-8 w-full py-3 rounded-xl bg-emerald-500 hover:bg-[#2ebfa2] text-xs font-bold text-slate-950 transition-all uppercase tracking-wider">
                Start Trial
              </button>
            </motion.div>

            {/* Partner/Enterprise Plan */}
            <motion.div 
              className="bg-[#141927] border border-slate-800 rounded-3xl p-8 flex flex-col justify-between hover:border-slate-700 transition-all text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Partner / Enterprise</h3>
                <div className="text-xs text-slate-400 mb-6">Partner / Enterprise and acconitable oranperionring.</div>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-black text-white">$349</span>
                  <span className="text-slate-500 text-sm">/month</span>
                </div>
                <ul className="space-y-4 text-xs text-slate-300">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Zero Execution (Isolated)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>EU AI Risk Tiering</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Multi-Framework Writs</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>TTL Behaviour</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Monitoring</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Auto Conformity</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Zero Cloud Enterprise</span>
                  </li>
                </ul>
              </div>
              <button onClick={openContact} className="mt-8 w-full py-3 rounded-xl border border-slate-800 hover:border-slate-600 bg-slate-900 text-xs font-bold text-white transition-all uppercase tracking-wider">
                Talk to Sales
              </button>
            </motion.div>

          </div>

          {/* Key Business Metrics Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl p-6 border bg-[#141927] shadow-xl text-center max-w-4xl mx-auto space-y-4"
            style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}
          >
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Key Business Metrics:</div>
            <div className="text-sm md:text-base font-extrabold text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #3ecfb2, #3b82f6)" }}>
              75%+ Gross Margin &bull; $200 ARPU &bull; 18.2x LTV/CAC &bull; Zero Cloud Dependency (Local Sovereign SLMs)
            </div>
          </motion.div>

          {/* Bottom Call to Action */}
          <div className="mt-16 text-center">
            <button 
              onClick={openBooking}
              className="px-8 py-4 rounded-xl bg-emerald-500 hover:bg-[#2ebfa2] text-slate-950 font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-emerald-500/10"
            >
              Get ReguLattice and Automate Your AI GRC
            </button>
          </div>

        </div>
      </section>

      <Footer onContact={openContact} />
      <ContactFormModal isOpen={contactOpen} onClose={() => setContactOpen(false)} title={modalTitle} description={modalDesc} />
    </div>
  );
}
