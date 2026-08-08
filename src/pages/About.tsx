import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormModal from "@/components/ContactFormModal";
import { 
  Sparkles, Award, ArrowRight, CheckCircle2, Target, Eye, Lock, 
  Bot, BarChart3, Shield, Scale, Check, AlertTriangle, Search, FileText, Settings
} from "lucide-react";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
    };
  }
}

// 7 Autonomous Agents Data for Grid Cards
const agentsList = [
  {
    id: "01",
    name: "Discovery Agent",
    icon: Search,
    desc: "Finds un-declared AI models, local RAG servers, and shadow integrations across enterprise networks.",
    standard: "ISO 42001 A.8.2.1"
  },
  {
    id: "02",
    name: "Classification Agent",
    icon: Target,
    desc: "Assigns risk tiers and scopes models under legal systems (like EU AI Act Annex III) automatically.",
    standard: "EU AI Act Compliance"
  },
  {
    id: "03",
    name: "Control Agent",
    icon: Settings,
    desc: "Maps model boundaries to safety rules, ensuring a single control satisfies multiple standards.",
    standard: "NIST AI RMF Gov & Map"
  },
  {
    id: "04",
    name: "Evidence Agent",
    icon: Lock,
    desc: "Collects and timestamps proof chains as models run to ensure you are always audit-ready.",
    standard: "ISO 42001 A.9 Verification"
  },
  {
    id: "05",
    name: "Monitoring Agent",
    icon: BarChart3,
    desc: "Watches inference logs for semantic drift, toxicity, policy breaches, and output biases.",
    standard: "Post-Market Monitoring"
  },
  {
    id: "06",
    name: "Authority Agent",
    icon: Scale,
    desc: "Enforces action boundaries and records human-in-the-loop overrides in the reversibility ledger.",
    standard: "ISO 38507 Governance"
  },
  {
    id: "07",
    name: "Assurance Agent",
    icon: Award,
    desc: "Generates exportable conformity packs, Statement of Applicability, and legal audit evidence.",
    standard: "Audit Evidence Pack"
  }
];

// Interactive Systems for the Authority Matrix
const mockSystems = [
  {
    id: "rag-kb",
    name: "Internal Helpdesk RAG Bot",
    desc: "Provides customer support agents with manual query assistance from internal documents. Has no autonomous write access.",
    quadrant: "MONITOR",
    control: "Log all prompt histories and sample 5% of responses weekly for bias or hallucinations. Minimal deployment friction."
  },
  {
    id: "clinical-copilot",
    name: "Clinical Cancer Diagnostic Assistant",
    desc: "Assists oncologists by recommending tumor treatment therapy options based on research database matches.",
    quadrant: "SIGN-OFF",
    control: "AI provides options, but a certified clinical physician must review, edit, and sign off on all drug therapy prescriptions before execution."
  },
  {
    id: "purchase-agent",
    name: "Autonomous Purchase Order Agent",
    desc: "Automated agent that evaluates supply inventory and issues vendor purchase orders up to $5,000.",
    quadrant: "GUARDRAIL",
    control: "Strict transaction cap at $5k; real-time validation checks verify merchant metadata before payment. Transactions >$5k auto-escalate."
  },
  {
    id: "fx-trader",
    name: "Algorithmic FX Trading Bot",
    desc: "High-frequency autonomous agent that executes currency trades directly on external exchanges.",
    quadrant: "BLOCKED",
    control: "Hard stop. Autonomous execution disabled due to lack of real-time human rollback guarantees. Requires board-level override."
  }
];

export default function About() {
  const [contactOpen, setContactOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Talk to an Expert");
  const [modalDesc, setModalDesc] = useState("We'll get back to you within 24 hours.");
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

  const selectedSystem = mockSystems.find(s => s.id === selectedSystemId) || mockSystems[0];

  return (
    <div className="min-h-screen bg-[#0d111c] text-white">
      <Navbar onBooking={openBooking} onContact={openContact} />

      <style>{`
        @keyframes dash-flow {
          to { stroke-dashoffset: -40; }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        .circuit-wire {
          stroke-dasharray: 6, 4;
          animation: dash-flow 4s linear infinite;
        }
        .pulse-indicator {
          animation: pulse-dot 2s ease-in-out infinite;
        }
      `}</style>

      {/* ──────────────────────────────────────────────────────────────── */}
      {/* SECTION A: HERO SECTION (Mockup Layout)                         */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-[#0d111c]">
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(62,207,178,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(62,207,178,0.01) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute top-0 left-1/4 w-[700px] h-[350px] pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(62,207,178,0.02) 0%, transparent 70%)" }} />

        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left Title and Sub-Headline */}
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
                  <Sparkles className="w-3.5 h-3.5 text-[#3ecfb2]" /> Sovereign AI Governance
                </div>
                
                <h1 
                  className="text-4xl md:text-5xl lg:text-[54px] font-black leading-[1.1] tracking-tight mb-6 text-white"
                  style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
                >
                  Continuous AI Governance <br />
                  Powered by 7 Autonomous Agents
                </h1>
                
                <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl">
                  From Shadow AI discovery to continuous evidence & authority ledgers. ReguLattice auto-discovers models, enforces decision boundaries, and keeps you audit-ready for ISO/IEC 42001 and the EU AI Act.
                </p>
              </motion.div>
            </div>

            {/* Right: SVG Agent Branching diagram (Agent 8, 9, 10) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center relative min-h-[340px]">
              <motion.div 
                className="w-full max-w-[500px] aspect-[4/3] relative flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
              >
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 300" fill="none">
                  {/* Branching Wires from DB to Agents */}
                  <path d="M 120,150 Q 200,60 320,60" stroke="rgba(16,185,129,0.3)" strokeWidth="1.5" className="circuit-wire" />
                  <path d="M 120,150 H 320" stroke="rgba(16,185,129,0.3)" strokeWidth="1.5" className="circuit-wire" />
                  <path d="M 120,150 Q 200,240 320,240" stroke="rgba(16,185,129,0.3)" strokeWidth="1.5" className="circuit-wire" />

                  {/* Flow Particles */}
                  <circle r="3.5" fill="#3ecfb2">
                    <animateMotion dur="3.2s" repeatCount="indefinite" path="M 120,150 Q 200,60 320,60" />
                  </circle>
                  <circle r="3.5" fill="#3ecfb2">
                    <animateMotion dur="2.5s" repeatCount="indefinite" path="M 120,150 H 320" />
                  </circle>
                  <circle r="3.5" fill="#3ecfb2">
                    <animateMotion dur="3.8s" repeatCount="indefinite" path="M 120,150 Q 200,240 320,240" />
                  </circle>
                </svg>

                {/* Left side: Central Database Node */}
                <div className="absolute left-[8%] z-10">
                  <div className="w-18 h-18 rounded-2xl border border-slate-700 bg-[#0f172a] shadow-lg flex items-center justify-center p-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center mb-1">
                        <svg className="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>
                      </div>
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">PLATFORM</span>
                    </div>
                  </div>
                </div>

                {/* Right side: Agents cards */}
                <div className="absolute right-[6%] flex flex-col gap-6 w-[230px]">
                  {/* Agent 8 */}
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-slate-800 bg-[#141927] shadow-lg text-left">
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px] font-black text-emerald-400">Agent 8</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-indicator" />
                      </div>
                      <div className="text-xs font-semibold text-slate-200">Asset Intelligence Agent</div>
                    </div>
                  </div>
                  {/* Agent 9 */}
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-slate-800 bg-[#141927] shadow-lg text-left">
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px] font-black text-emerald-400">Agent 9</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-indicator" />
                      </div>
                      <div className="text-xs font-semibold text-slate-200">Risk Classification Agent</div>
                    </div>
                  </div>
                  {/* Agent 10 */}
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-slate-800 bg-[#141927] shadow-lg text-left">
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px] font-black text-emerald-400">Agent 10</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-indicator" />
                      </div>
                      <div className="text-xs font-semibold text-slate-200">Continuous Evidence Agent</div>
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────── */}
      {/* QUOTE BANNER                                                    */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <section className="py-8 bg-[#0a1c18] border-y border-emerald-950">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
            <span className="text-emerald-400 text-lg md:text-xl font-serif">“</span>
            <span className="text-base md:text-lg font-bold text-emerald-300 italic tracking-wide">
              Continuous compliance is not a static check-box; it is an active state of being.
            </span>
            <span className="text-emerald-400 text-lg md:text-xl font-serif">”</span>
          </div>
          <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">
            ReguLattice Principle: <span className="text-[#3ecfb2]">“The platform remains machine-executed, provable, and always-on.”</span>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────── */}
      {/* SECTION B: THE 3-STEP GOVERNANCE FLYWHEEL                       */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#111625] relative border-b border-slate-800/40">
        <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
          
          <h2 
            className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider mb-14"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            The 3-Step Governance Flywheel
          </h2>

          {/* Cards with Curved SVG Arrows */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
            
            {/* Card 1 */}
            <div className="w-full md:w-[30%] bg-[#141927] border border-slate-800 rounded-2xl p-6 text-center hover:border-slate-700 transition-all shadow-md relative">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-white mb-2 uppercase tracking-wide">1. SEE IT</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Finds and catalogs shadow AI models & API integrations.
              </p>
            </div>

            {/* Connecting Arrow 1 */}
            <div className="hidden md:block w-[5%] h-8 text-slate-500 shrink-0">
              <svg className="w-full h-full" viewBox="0 0 50 30" fill="none">
                <path d="M 5,15 Q 25,25 45,15" stroke="#3ecfb2" strokeWidth="2" fill="none" strokeDasharray="3 3" />
                <polygon points="45,15 40,11 38,15" fill="#3ecfb2" />
              </svg>
            </div>

            {/* Card 2 */}
            <div className="w-full md:w-[30%] bg-[#141927] border border-slate-800 rounded-2xl p-6 text-center hover:border-slate-700 transition-all shadow-md relative">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-white mb-2 uppercase tracking-wide">2. GOVERN IT</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Applies risk tiering & controls continuously across systems.
              </p>
            </div>

            {/* Connecting Arrow 2 */}
            <div className="hidden md:block w-[5%] h-8 text-slate-500 shrink-0">
              <svg className="w-full h-full" viewBox="0 0 50 30" fill="none">
                <path d="M 5,15 Q 25,25 45,15" stroke="#3ecfb2" strokeWidth="2" fill="none" strokeDasharray="3 3" />
                <polygon points="45,15 40,11 38,15" fill="#3ecfb2" />
              </svg>
            </div>

            {/* Card 3 */}
            <div className="w-full md:w-[30%] bg-[#141927] border border-slate-800 rounded-2xl p-6 text-center hover:border-slate-700 transition-all shadow-md relative">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-white mb-2 uppercase tracking-wide">3. PROVE IT</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Generates conformity packs & evidence logs on demand.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────── */}
      {/* SECTION C: THE 7 AUTONOMOUS AGENTS (Directory Cards Grid)        */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0d111c] relative">
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          
          <div className="text-center mb-16">
            <h2 
              className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              The 7 Autonomous Agents
            </h2>
            <p className="text-slate-400 text-xs mt-3 max-w-md mx-auto">
              A sovereign, agentic compliance network enforcing security boundaries in real-time.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {agentsList.map((agent) => {
              const IconComponent = agent.icon;
              return (
                <div 
                  key={agent.id}
                  className="bg-[#141927] border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700 transition-all text-left flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black text-blue-400">{agent.id}</span>
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                        <IconComponent className="w-4.5 h-4.5" />
                      </div>
                    </div>
                    <h3 className="text-sm font-extrabold text-white mb-2 uppercase tracking-wider">
                      {agent.name}
                    </h3>
                    <p className="text-slate-400 text-[11px] leading-relaxed font-normal">
                      {agent.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800/60 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                    {agent.standard}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────── */}
      {/* SECTION D: THE AI AUTHORITY & REVERSIBILITY ENGINE MATRIX        */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#111625] relative border-t border-slate-800/40">
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          
          <div className="text-center mb-16">
            <h2 
              className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              The AI Authority & Reversibility Engine Matrix
            </h2>
            <p className="text-slate-400 text-xs mt-3 max-w-xl mx-auto">
              Every system is evaluated on its decision delegation level and the operational reversibility of its actions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: 2x2 Matrix */}
            <div className="lg:col-span-8 flex flex-col items-center">
              
              <div className="relative w-full max-w-[480px] aspect-square flex flex-col justify-between border-l-2 border-b-2 border-slate-600 p-2">
                
                {/* Y-Axis labels */}
                <div className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 text-[9px] font-black uppercase tracking-widest text-slate-400 flex gap-12">
                  <span>DELEGATED</span>
                  <span>AUTHORITY</span>
                  <span>RETAINED</span>
                </div>

                {/* X-Axis labels */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase tracking-widest text-slate-400 flex gap-12">
                  <span>REVERSIBLE</span>
                  <span>ACTIONS</span>
                  <span>IRREVERSIBLE</span>
                </div>

                {/* Row 1 */}
                <div className="flex h-[48%] justify-between mb-[4%]">
                  {/* MONITOR */}
                  <div className={`w-[48%] h-full rounded-xl p-4 flex flex-col justify-between border transition-all duration-300 ${selectedSystem.quadrant === "MONITOR" ? "border-blue-500 bg-blue-950/20" : "border-slate-800 bg-[#141927]"}`}>
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-blue-400 mb-1">
                        <Eye className="w-3.5 h-3.5" /> MONITOR
                      </div>
                      <div className="text-[8px] text-slate-500 font-semibold uppercase tracking-wider">Retained + Reversible</div>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-normal">
                      Log all prompt histories and sample outputs. Minimal integration friction.
                    </p>
                  </div>

                  {/* SIGN-OFF */}
                  <div className={`w-[48%] h-full rounded-xl p-4 flex flex-col justify-between border transition-all duration-300 ${selectedSystem.quadrant === "SIGN-OFF" ? "border-cyan-500 bg-cyan-950/20" : "border-slate-800 bg-[#141927]"}`}>
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> SIGN-OFF
                      </div>
                      <div className="text-[8px] text-slate-500 font-semibold uppercase tracking-wider">Retained + Irreversible</div>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-normal">
                      A named human practitioner must sign off on prescriptions before execution.
                    </p>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="flex h-[48%] justify-between">
                  {/* GUARDRAIL */}
                  <div className={`w-[48%] h-full rounded-xl p-4 flex flex-col justify-between border transition-all duration-300 ${selectedSystem.quadrant === "GUARDRAIL" ? "border-purple-500 bg-purple-950/20" : "border-slate-800 bg-[#141927]"}`}>
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-purple-400 mb-1">
                        <Shield className="w-3.5 h-3.5" /> GUARDRAIL
                      </div>
                      <div className="text-[8px] text-slate-500 font-semibold uppercase tracking-wider">Delegated + Reversible</div>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-normal">
                      Automated caps, circuit breakers, and verification before API submission.
                    </p>
                  </div>

                  {/* BLOCKED */}
                  <div className={`w-[48%] h-full rounded-xl p-4 flex flex-col justify-between border transition-all duration-300 ${selectedSystem.quadrant === "BLOCKED" ? "border-rose-500 bg-rose-950/20" : "border-slate-800 bg-[#141927]"}`}>
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 mb-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> BLOCKED
                      </div>
                      <div className="text-[8px] text-slate-500 font-semibold uppercase tracking-wider">Delegated + Irreversible</div>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-normal">
                      Hard stop until authority is manually escalated and verified.
                    </p>
                  </div>
                </div>

                {/* Glowing Tracer node */}
                <div 
                  className="absolute w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_12px_#10b981] transition-all duration-700 ease-out z-10"
                  style={{
                    left: selectedSystem.quadrant === "MONITOR" || selectedSystem.quadrant === "GUARDRAIL" ? "25%" : "75%",
                    top: selectedSystem.quadrant === "MONITOR" || selectedSystem.quadrant === "SIGN-OFF" ? "25%" : "75%",
                    transform: "translate(-8px, -8px)"
                  }}
                />

              </div>

            </div>

            {/* Right: System selector tracer */}
            <div className="lg:col-span-4 text-left">
              <div className="bg-[#1e2538] border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
                <div>
                  <h4 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-3">System Tracer</h4>
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

                <div className="pt-5 border-t border-slate-800/80 space-y-3">
                  <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Enforced Control strategy:</div>
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
      {/* QUOTE BANNER (Repeated)                                         */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <section className="py-8 bg-[#0a1c18] border-y border-emerald-950">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
            <span className="text-emerald-400 text-lg md:text-xl font-serif">“</span>
            <span className="text-base md:text-lg font-bold text-emerald-300 italic tracking-wide">
              Continuous compliance is not a static check-box; it is an active state of being.
            </span>
            <span className="text-emerald-400 text-lg md:text-xl font-serif">”</span>
          </div>
          <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">
            ReguLattice Principle: <span className="text-[#3ecfb2]">“The platform remains machine-executed, provable, and always-on.”</span>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────── */}
      {/* SECTION E: PRICING & BUSINESS MODEL                             */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 bg-[#0d111c] relative overflow-hidden border-b border-slate-800/40">
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          
          <div className="text-center mb-16">
            <h2 
              className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Transparent Pricing & Business Model
            </h2>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            
            {/* Starter */}
            <div className="bg-[#141927] border border-slate-800 rounded-3xl p-8 flex flex-col justify-between hover:border-slate-700 transition-all text-left">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Starter</h3>
                <div className="text-xs text-slate-400 mb-6">over regulattics starter area conds</div>
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
                    <span>Continuous Dependency</span>
                  </li>
                </ul>
              </div>
              <button onClick={openContact} className="mt-8 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition-all uppercase tracking-wider">
                Get It Free
              </button>
            </div>

            {/* Pro */}
            <div className="bg-[#1e2538] border-2 border-emerald-500/80 rounded-3xl p-8 flex flex-col justify-between shadow-2xl text-left relative">
              <div className="absolute top-0 right-8 -translate-y-1/2 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-bold text-[9px] uppercase tracking-wider">Recommended</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
                <div className="text-xs text-slate-400 mb-6">on assessments pro-rated aristeted cleoitons</div>
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
                </ul>
              </div>
              <button onClick={openContact} className="mt-8 w-full py-3 rounded-xl bg-emerald-500 hover:bg-[#2ebfa2] text-xs font-bold text-slate-950 transition-all uppercase tracking-wider">
                Get It Now
              </button>
            </div>

            {/* Partner/Enterprise */}
            <div className="bg-[#141927] border border-slate-800 rounded-3xl p-8 flex flex-col justify-between hover:border-slate-700 transition-all text-left">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Partner / Enterprise</h3>
                <div className="text-xs text-slate-400 mb-6">our engagement liminary resisted wistics</div>
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
                    <span>Multi-Framework Writs</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Auto Conformity Packs</span>
                  </li>
                </ul>
              </div>
              <button onClick={openContact} className="mt-8 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition-all uppercase tracking-wider">
                Get It Now
              </button>
            </div>

          </div>

          {/* Business Metrics text */}
          <div className="text-center py-4 text-sm font-bold text-slate-400 uppercase tracking-widest max-w-4xl mx-auto">
            75%+ Gross Margin &bull; 18.2x LTV/CAC &bull; Zero Cloud Dependency
          </div>

          {/* Bottom Green CTA Banner Button */}
          <div className="mt-10 text-center">
            <button 
              onClick={openBooking}
              className="px-10 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base uppercase tracking-widest transition-all shadow-xl shadow-emerald-500/20"
            >
              Get ReguLattice and Automate Your GRC
            </button>
          </div>

        </div>
      </section>

      <Footer onContact={openContact} />
      <ContactFormModal isOpen={contactOpen} onClose={() => setContactOpen(false)} title={modalTitle} description={modalDesc} />
    </div>
  );
}
