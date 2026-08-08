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

// 7 Autonomous Agents Data
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
    <div className="min-h-screen bg-[#f4f6fa] text-slate-800 geom-bg">
      <Navbar onBooking={openBooking} onContact={openContact} />

      <style>{`
        @keyframes dash-flow {
          to { stroke-dashoffset: -40; }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        .geom-bg {
          background-color: #f4f6fa;
          background-image: 
            radial-gradient(circle at 10% 20%, rgba(37,99,235,0.015) 0%, transparent 40%),
            radial-gradient(circle at 90% 80%, rgba(16,185,129,0.015) 0%, transparent 40%),
            linear-gradient(rgba(37,99,235,0.02) 1.5px, transparent 1.5px),
            linear-gradient(90deg, rgba(37,99,235,0.02) 1.5px, transparent 1.5px);
          background-size: 100% 100%, 100% 100%, 50px 50px, 50px 50px;
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
      {/* SECTION A: HERO SECTION (Light Theme Alignment)                 */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left Content (Light mode text contrast) */}
            <div className="w-full lg:w-1/2 text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div 
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest mb-6" 
                  style={{ background: "rgba(16,185,129,0.08)", borderColor: "rgba(16,185,129,0.2)", color: "#065f46" }}
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Sovereign AI Governance
                </div>
                
                <h1 
                  className="text-4xl md:text-5xl lg:text-[54px] font-black leading-[1.1] tracking-tight mb-6 text-slate-950"
                  style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
                >
                  Continuous AI Governance <br />
                  Powered by 7 Autonomous Agents
                </h1>
                
                <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-xl">
                  From Shadow AI discovery to continuous evidence & authority ledgers. ReguLattice auto-discovers models, enforces decision boundaries, and keeps you audit-ready for ISO/IEC 42001 and the EU AI Act.
                </p>
              </motion.div>
            </div>

            {/* Right: SVG Agent Branching diagram (Light mode theme) */}
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
                  <circle r="3.5" fill="#10b981">
                    <animateMotion dur="3.2s" repeatCount="indefinite" path="M 120,150 Q 200,60 320,60" />
                  </circle>
                  <circle r="3.5" fill="#10b981">
                    <animateMotion dur="2.5s" repeatCount="indefinite" path="M 120,150 H 320" />
                  </circle>
                  <circle r="3.5" fill="#10b981">
                    <animateMotion dur="3.8s" repeatCount="indefinite" path="M 120,150 Q 200,240 320,240" />
                  </circle>
                </svg>

                {/* Left side: Central Database Node */}
                <div className="absolute left-[8%] z-10">
                  <div className="w-18 h-18 rounded-2xl border border-slate-200 bg-white shadow-lg flex items-center justify-center p-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center mb-1">
                        <svg className="w-5 h-5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>
                      </div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">PLATFORM</span>
                    </div>
                  </div>
                </div>

                {/* Right side: Agents cards */}
                <div className="absolute right-[6%] flex flex-col gap-6 w-[230px]">
                  {/* Agent 8 */}
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-slate-200 bg-white shadow-lg text-left">
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px] font-black text-emerald-600">Agent 8</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-indicator" />
                      </div>
                      <div className="text-xs font-semibold text-slate-800">Asset Intelligence Agent</div>
                    </div>
                  </div>
                  {/* Agent 9 */}
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-slate-200 bg-white shadow-lg text-left">
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px] font-black text-emerald-600">Agent 9</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-indicator" />
                      </div>
                      <div className="text-xs font-semibold text-slate-800">Risk Classification Agent</div>
                    </div>
                  </div>
                  {/* Agent 10 */}
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-slate-200 bg-white shadow-lg text-left">
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px] font-black text-emerald-600">Agent 10</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-indicator" />
                      </div>
                      <div className="text-xs font-semibold text-slate-800">Continuous Evidence Agent</div>
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────── */}
      {/* QUOTE BANNER (Dark Navy Theme)                                  */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <section className="py-8 bg-[#0b1629] border-y border-[#1e293b]">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
            <span className="text-emerald-400 text-lg md:text-xl font-serif">“</span>
            <span className="text-base md:text-lg font-bold text-white italic tracking-wide">
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
      <section className="py-20 relative">
        <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
          
          <h2 
            className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-wider mb-14"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            The 3-Step Governance Flywheel
          </h2>

          {/* Cards with Curved SVG Arrows */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
            
            {/* Card 1 */}
            <div className="w-full md:w-[30%] bg-white border border-slate-200/80 rounded-2xl p-6 text-center hover:border-slate-300 hover:shadow-lg transition-all shadow-md relative">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 mb-2 uppercase tracking-wide">1. SEE IT</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Finds and catalogs shadow AI models & API integrations.
              </p>
            </div>

            {/* Connecting Arrow 1 */}
            <div className="hidden md:block w-[5%] h-8 text-slate-500 shrink-0">
              <svg className="w-full h-full" viewBox="0 0 50 30" fill="none">
                <path d="M 5,15 Q 25,25 45,15" stroke="#10b981" strokeWidth="2" fill="none" strokeDasharray="3 3" />
                <polygon points="45,15 40,11 38,15" fill="#10b981" />
              </svg>
            </div>

            {/* Card 2 */}
            <div className="w-full md:w-[30%] bg-white border border-slate-200/80 rounded-2xl p-6 text-center hover:border-slate-300 hover:shadow-lg transition-all shadow-md relative">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 mb-2 uppercase tracking-wide">2. GOVERN IT</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Applies risk tiering & controls continuously across systems.
              </p>
            </div>

            {/* Connecting Arrow 2 */}
            <div className="hidden md:block w-[5%] h-8 text-slate-500 shrink-0">
              <svg className="w-full h-full" viewBox="0 0 50 30" fill="none">
                <path d="M 5,15 Q 25,25 45,15" stroke="#10b981" strokeWidth="2" fill="none" strokeDasharray="3 3" />
                <polygon points="45,15 40,11 38,15" fill="#10b981" />
              </svg>
            </div>

            {/* Card 3 */}
            <div className="w-full md:w-[30%] bg-white border border-slate-200/80 rounded-2xl p-6 text-center hover:border-slate-300 hover:shadow-lg transition-all shadow-md relative">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 mb-2 uppercase tracking-wide">3. PROVE IT</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Generates conformity packs & evidence logs on demand.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────── */}
      {/* SECTION C: THE 7 AUTONOMOUS AGENTS                              */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          
          <div className="text-center mb-16">
            <h2 
              className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-wider"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              The 7 Autonomous Agents
            </h2>
            <p className="text-slate-500 text-xs mt-3 max-w-md mx-auto">
              A sovereign, agentic compliance network enforcing security boundaries in real-time.
            </p>
          </div>

          {/* Cards Grid (White theme alignment) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {agentsList.map((agent) => {
              const IconComponent = agent.icon;
              return (
                <div 
                  key={agent.id}
                  className="bg-white border border-slate-200/80 rounded-2xl p-6 hover:border-slate-300 hover:shadow-lg transition-all text-left flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black text-blue-600">{agent.id}</span>
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600">
                        <IconComponent className="w-4.5 h-4.5" />
                      </div>
                    </div>
                    <h3 className="text-sm font-extrabold text-slate-900 mb-2 uppercase tracking-wider">
                      {agent.name}
                    </h3>
                    <p className="text-slate-500 text-[11px] leading-relaxed font-normal">
                      {agent.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/60 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
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
      <section className="py-24 relative border-t border-slate-200/40">
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          
          <div className="text-center mb-12">
            <h2 
              className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-wider"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              The AI Authority & Reversibility Engine Matrix
            </h2>
          </div>

          {/* Matrix Container Card */}
          <div className="w-full max-w-4xl mx-auto bg-white border border-blue-200 rounded-3xl p-8 md:p-12 shadow-lg relative">
            
            {/* Top Column Headers */}
            <div className="flex justify-between mb-4 pl-12 md:pl-16 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-[#0f2e5c]">
              <div className="w-[47%] text-center">AUTHORITY RETAINED</div>
              <div className="w-[47%] text-center">REVERSIBLE</div>
            </div>

            {/* Main Grid with Left Vertical Labels */}
            <div className="flex gap-4 md:gap-6">
              
              {/* Left Vertical Labels column */}
              <div className="w-12 md:w-16 flex flex-col justify-between shrink-0 text-[10px] md:text-xs font-black uppercase tracking-widest text-[#0f2e5c]">
                {/* Row 1 Label: DELAUNEY / DELEGATED */}
                <div 
                  className="h-[47%] flex items-center justify-center border-r-2 border-slate-300 pr-2 select-none"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  DELAUNEY / DELEGATED
                </div>
                {/* Row 2 Label: IRREVERSIBLE */}
                <div 
                  className="h-[47%] flex items-center justify-center border-r-2 border-slate-300 pr-2 select-none"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  IRREVERSIBLE
                </div>
              </div>

              {/* The 2x2 Quadrant Grid */}
              <div className="flex-1 grid grid-cols-2 gap-4 md:gap-6">
                
                {/* Quadrant 1: MONITOR */}
                <div className="rounded-2xl p-5 md:p-6 bg-[#f4f7fb] border border-slate-200/80 shadow-sm flex flex-col justify-between min-h-[160px] relative hover:shadow-md transition-shadow text-left">
                  <div>
                    <h3 className="text-sm md:text-base font-black text-slate-800 uppercase tracking-wider mb-2">MONITOR</h3>
                    <p className="text-slate-500 text-[11px] md:text-xs leading-relaxed">
                      Discovery spouse models enforces revenue asset; retaint and autoresation. nons to authority and assec assets.
                    </p>
                  </div>
                  <div className="self-end mt-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
                      <Eye className="w-4.5 h-4.5" />
                    </div>
                  </div>
                </div>

                {/* Quadrant 2: SIGN-OFF */}
                <div className="rounded-2xl p-5 md:p-6 bg-[#f4f7fb] border border-slate-200/80 shadow-sm flex flex-col justify-between min-h-[160px] relative hover:shadow-md transition-shadow text-left">
                  <div className="absolute top-5 right-5 text-teal-500">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="pr-8">
                    <h3 className="text-sm md:text-base font-black text-slate-800 uppercase tracking-wider mb-2">SIGN-OFF</h3>
                    <p className="text-slate-500 text-[11px] md:text-xs leading-relaxed">
                      ReguLattice auto-discovers models, enforces assumes connection ar loriess decision boundaries.
                    </p>
                  </div>
                  <div className="mt-4 h-6"></div> {/* Spacer for symmetry */}
                </div>

                {/* Quadrant 3: GUARDRAIL */}
                <div className="rounded-2xl p-5 md:p-6 bg-[#f0fbf7] border border-emerald-100 shadow-sm flex flex-col justify-between min-h-[160px] relative hover:shadow-md transition-shadow text-left">
                  <div className="absolute top-5 right-5 text-emerald-600">
                    <Settings className="w-6 h-6" />
                  </div>
                  <div className="pr-8">
                    <h3 className="text-sm md:text-base font-black text-slate-800 uppercase tracking-wider mb-2">GUARDRAIL</h3>
                    <p className="text-slate-500 text-[11px] md:text-xs leading-relaxed">
                      Dotalsrate marouriontion needeii to garirdeate recording on vontoct algorithm and authority boundarylaty.
                    </p>
                  </div>
                  <div className="mt-4 h-6"></div>
                </div>

                {/* Quadrant 4: BLOCKED */}
                <div className="rounded-2xl p-5 md:p-6 bg-[#fff2f2] border border-rose-100 shadow-sm flex flex-col justify-between min-h-[160px] relative hover:shadow-md transition-shadow text-left">
                  <div className="absolute top-5 left-5 text-rose-600">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div className="pl-8">
                    <h3 className="text-sm md:text-base font-black text-rose-700 uppercase tracking-wider mb-2">BLOCKED</h3>
                    <p className="text-slate-600 text-[11px] md:text-xs leading-relaxed">
                      Blocked auto acrnse monitors of authority modele and assecnt towns accounting to assorseilie peilnology.
                    </p>
                  </div>
                  <div className="mt-4 h-6"></div>
                </div>

              </div>

            </div>

            {/* Bottom Row Header */}
            <div className="mt-4 pl-12 md:pl-16 text-center text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-[#0f2e5c]">
              REVERSIBLE
            </div>

          </div>

        </div>
      </section>


      {/* ──────────────────────────────────────────────────────────────── */}
      {/* SECTION E: PRICING & BUSINESS MODEL                             */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          
          <div className="text-center mb-16">
            <h2 
              className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-wider"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Transparent Pricing & Business Model
            </h2>
          </div>

          {/* Pricing Grid (White mode card alignment) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            
            {/* Starter */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between hover:border-slate-300 hover:shadow-lg transition-all text-left shadow-sm">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Starter</h3>
                <div className="text-xs text-slate-500 mb-6">over regulattics starter area conds</div>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-black text-slate-900">$79</span>
                  <span className="text-slate-400 text-sm">/month</span>
                </div>
                <ul className="space-y-4 text-xs text-slate-600">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Shadow AI discovery</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>EU AI Risk Tiering</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Continuous Dependency</span>
                  </li>
                </ul>
              </div>
              <button onClick={openContact} className="mt-8 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white transition-all uppercase tracking-wider">
                Get It Free
              </button>
            </div>

            {/* Pro */}
            <div className="bg-white border-2 border-emerald-500 rounded-3xl p-8 flex flex-col justify-between shadow-lg text-left relative">
              <div className="absolute top-0 right-8 -translate-y-1/2 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-bold text-[9px] uppercase tracking-wider">Recommended</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Pro</h3>
                <div className="text-xs text-slate-500 mb-6">on assessments pro-rated aristeted cleoitons</div>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-black text-slate-900">$219</span>
                  <span className="text-slate-400 text-sm">/month</span>
                </div>
                <ul className="space-y-4 text-xs text-slate-600">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Local RAG Mapping</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Risk Risk Tiering</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Multi-Framework Ring</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>TTL Continuous</span>
                  </li>
                </ul>
              </div>
              <button onClick={openContact} className="mt-8 w-full py-3 rounded-xl bg-emerald-500 hover:bg-[#2ebfa2] text-xs font-bold text-slate-950 transition-all uppercase tracking-wider">
                Get It Now
              </button>
            </div>

            {/* Partner/Enterprise */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between hover:border-slate-300 hover:shadow-lg transition-all text-left shadow-sm">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Partner / Enterprise</h3>
                <div className="text-xs text-slate-500 mb-6">our engagement liminary resisted wistics</div>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-black text-slate-900">$349</span>
                  <span className="text-slate-400 text-sm">/month</span>
                </div>
                <ul className="space-y-4 text-xs text-slate-600">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Zero Execution (Isolated)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Multi-Framework Writs</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Auto Conformity Packs</span>
                  </li>
                </ul>
              </div>
              <button onClick={openContact} className="mt-8 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white transition-all uppercase tracking-wider">
                Get It Now
              </button>
            </div>

          </div>


          {/* Bottom Green CTA Banner Button */}
          <div className="mt-10 text-center">
            <button 
              onClick={openBooking}
              className="px-10 py-4 rounded-xl bg-emerald-600 hover:bg-[#0a8f6b] text-white font-black text-base uppercase tracking-widest transition-all shadow-xl shadow-emerald-500/10"
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
