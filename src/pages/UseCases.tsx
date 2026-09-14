import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormModal from "@/components/ContactFormModal";
import { Shield, Database, Lock, Server, Eye, Check, ChevronRight, Terminal, ArrowRight, Heart } from "lucide-react";
import { initPixel, trackPageview, trackPixelEvent } from "@/lib/pixels";
import { initGA, trackGAPageview, trackGAEvent } from "@/lib/google-analytics";

export default function UseCases() {
  const [contactOpen, setContactOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Book a Live Demo");
  const [modalDesc, setModalDesc] = useState("We'll response within an hour.");

  useEffect(() => {
    initPixel();
    trackPageview();
    initGA();
    trackGAPageview();
  }, []);

  const handleConversionClick = (section: string, action: string, label: string) => {
    trackPixelEvent("ClickCTA", { section, action, label });
    trackGAEvent("click_cta", { section, action, label });
  };

  const openBooking = () => {
    handleConversionClick("Navbar", "book_a_demo", "Navbar Get a demo");
    setModalTitle("Book a Live Demo");
    setModalDesc("We will response within an hour.");
    setContactOpen(true);
  };

  return (
    <div className="bg-[#F7F9FB] text-[#0B1F2A] regulattice-site min-h-screen flex flex-col justify-between">
      <SEO 
        title="AI Governance Use Cases | RAG & Private Model Compliance"
        description="Explore how ReguLattice secures private RAG systems, audits local LLMs, and monitors shadow AI integrations within your private residency."
        canonicalPath="/use-cases"
      />

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:ital,wght@0,400..800;1,400..800&family=Newsreader:ital,wght@0,300..700;1,300..700&family=IBM+Plex+Mono:ital,wght@0,300..700;1,300..700&display=swap');

        body, #root {
          background: #F0F6F8 !important;
        }

        .regulattice-site {
          font-family: "Inter", -apple-system, sans-serif !important;
          font-size: 16.5px !important;
          line-height: 1.6 !important;
          letter-spacing: -0.005em !important;
          color: #0F172A !important;
          background: #F0F6F8 !important;
        }

        .regulattice-site h1,
        .regulattice-site h2,
        .regulattice-site h3,
        .regulattice-site h4 {
          font-family: "Crimson Pro", Georgia, serif !important;
          margin: 0 !important;
          font-weight: 700 !important;
          letter-spacing: -.02em !important;
          line-height: 1.08 !important;
        }

        .regulattice-site h1 {
          font-size: clamp(38px, 5.5vw, 68px) !important;
          color: #0B1F2A !important;
        }

        .regulattice-site h2 {
          font-size: clamp(28px, 4vw, 42px) !important;
          color: #0B1F2A !important;
          line-height: 1.12 !important;
        }

        .regulattice-site h3 {
          font-size: clamp(18px, 2.4vw, 22px) !important;
          color: #0B1F2A !important;
        }

        .regulattice-site p {
          margin: 0;
        }

        :root {
          --navy: #0F2233;
          --navy-2: #123240;
          --paper: #F7F9FB;
          --white: #FFFFFF;
          --mint: #E4EFEA;
          --mint-2: #F1F7F4;
          --teal: #0E7C6B;
          --teal-deep: #07463D;
          --slate: #566A72;
          --slate-2: #82918F;
          --line: #DFE5E2;
          --line-2: #C7D2CD;
          --r: 6px;
          --shadow-1: 0 1px 2px rgba(11,31,42,.05);
          --shadow-2: 0 1px 2px rgba(11,31,42,.05), 0 18px 40px -26px rgba(11,31,42,.45);
          --ease: cubic-bezier(.22,.61,.36,1);
        }

        .sec {
          padding: clamp(74px, 8.5vw, 124px) 0;
          position: relative;
          background: #F7F9FB;
        }
        .sec--white {
          background: #FFFFFF;
          border-block: 1px solid var(--line);
        }
        .sec--dark {
          background-color: #0F2233;
          background-image: 
            linear-gradient(rgba(14, 124, 107, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14, 124, 107, 0.05) 1px, transparent 1px);
          background-size: 36px 36px;
          background-position: center;
          color: #EAF1EE;
          position: relative;
        }
        .sec--dark::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(14, 124, 107, 0.1) 0%, transparent 70%);
          pointer-events: none;
          z-index: 1;
        }
        .sec--dark h2,
        .sec--dark h3,
        .sec--dark h4 {
          color: #FFFFFF !important;
        }
        .sec--dark .lead {
          color: #A9BDB8 !important;
        }
        .sec--dark .eyebrow {
          color: #7FD9C4 !important;
        }

        /* Hero radial glow with animation */
        .hero {
          background: #FFFFFF;
          position: relative;
          overflow: hidden;
          padding-top: clamp(120px, 12vw, 180px);
          padding-bottom: clamp(60px, 8vw, 100px);
        }
        @keyframes softGlowFade {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        .hero::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: 
            radial-gradient(circle at 20% 20%, rgba(8, 145, 178, 0.06) 0%, transparent 60%),
            linear-gradient(rgba(14, 124, 107, 0.05) 1px, transparent 1px), 
            linear-gradient(90deg, rgba(14, 124, 107, 0.05) 1px, transparent 1px);
          background-size: 100% 100%, 64px 64px, 64px 64px;
          z-index: 0;
          animation: softGlowFade 5s ease-out forwards;
        }
        .hero::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: 
            linear-gradient(to right, #FFFFFF 0%, transparent 15%, transparent 85%, #FFFFFF 100%),
            linear-gradient(to bottom, transparent 60%, #FFFFFF 100%);
          z-index: 1;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          color: var(--teal);
          margin-bottom: 18px;
        }
        .eyebrow::before {
          content: "";
          width: 10px;
          height: 10px;
          flex: none;
          background:
            linear-gradient(currentColor, currentColor) center/100% 1px no-repeat,
            linear-gradient(currentColor, currentColor) center/1px 100% no-repeat;
        }

        /* ---------- buttons ---------- */
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 13px 22px;
          border-radius: var(--r);
          font-weight: 600;
          font-size: 15px;
          letter-spacing: -.01em;
          text-decoration: none;
          transition: .22s var(--ease);
          cursor: pointer;
          border: 1px solid transparent;
        }
        .btn--pri {
          background: var(--teal);
          color: #FFFFFF !important;
        }
        .btn--pri:hover {
          background: var(--teal-deep);
          transform: translateY(-1px);
        }
        .btn--sec {
          background: transparent;
          color: #0F2233 !important;
          border-color: var(--line);
        }
        .btn--sec:hover {
          background: #FFFFFF;
          border-color: var(--slate-2);
          transform: translateY(-1px);
        }
        .btn--ghost {
          background: transparent;
          color: var(--teal) !important;
          font-weight: 600;
          padding-inline: 0;
        }
        .btn--ghost:hover {
          color: var(--teal-deep) !important;
        }

        /* Use Cases Grid Styles */
        .usecase-layout {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: clamp(40px, 6vw, 84px);
          align-items: start;
        }
        @media (max-width: 1024px) {
          .usecase-layout {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .usecase-info {
          position: sticky;
          top: 100px;
        }

        .usecase-stack {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .usecase-card {
          background: var(--white);
          border: 1px solid var(--line);
          border-radius: 8px;
          padding: 24px;
          box-shadow: var(--shadow-1);
          transition: all 0.25s var(--ease);
          text-align: left;
        }
        .usecase-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-2);
          border-color: var(--teal);
        }

        .usecase-card-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 14px;
        }

        .usecase-card-icon {
          width: 40px;
          height: 40px;
          border-radius: 6px;
          background: var(--mint-2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--teal);
          flex-shrink: 0;
        }

        .usecase-bullets {
          list-style: none;
          padding: 0;
          margin: 16px 0 0;
          display: grid;
          gap: 10px;
        }
        .usecase-bullets li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14.5px;
          color: var(--slate);
          line-height: 1.5;
        }
        .usecase-bullets li svg {
          flex-shrink: 0;
          margin-top: 3px;
          color: var(--teal);
        }

        /* Final section layout */
        .final-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 60px;
          align-items: center;
        }
        @media (max-width: 900px) {
          .final-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}} />

      <Navbar onBooking={openBooking} />

      <main>
        {/* ============ HERO SECTION ============ */}
        <section className="hero text-left">
          <div className="wrap relative z-10">
            <span className="eyebrow mono">Applications</span>
            <h1>AI Governance built for private data residencies.</h1>
            <p className="lead" style={{ fontSize: "19px", color: "var(--slate)", marginTop: "24px", maxWidth: "800px", lineHeight: "1.55" }}>
              ReguLattice operates inside your security perimeter to scan, index, and audit your AI agents and models — protecting proprietary intelligence and meeting global compliance standards with zero data egress.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <a href="/assessment" className="btn btn--pri" onClick={() => handleConversionClick("Hero", "free_scan", "Hero Scan")}>Start free assessment</a>
              <button onClick={openBooking} className="btn btn--sec">Book a live demo</button>
            </div>
          </div>
        </section>

        {/* ============ USE CASE 1: RAG & VECTOR DB ============ */}
        <section className="sec sec--white">
          <div className="wrap">
            <div className="usecase-layout">
              {/* Left Info Column */}
              <div className="usecase-info text-left">
                <span className="eyebrow mono">Secure RAG & Search</span>
                <h2>Govern Retrieval-Augmented Generation & private vector stores.</h2>
                <p className="lead" style={{ fontSize: "16px", color: "var(--slate)", marginTop: "18px", marginBottom: "24px", lineHeight: "1.6" }}>
                  Custom search interfaces and vector databases index your most sensitive enterprise documents. ReguLattice continuously monitors the RAG ingestion pipeline and model query layers to ensure proprietary IP is never leaked.
                </p>
                <div className="flex flex-col gap-3">
                  <a href="/assessment" className="btn btn--ghost text-left" style={{ display: "inline-flex", width: "fit-content" }} onClick={() => handleConversionClick("UseCase1", "assess_rag", "RAG Assessment Link")}>
                    Score your RAG safety setup <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>

              {/* Right Stack Column */}
              <div className="usecase-stack">
                <div className="usecase-card">
                  <div className="usecase-card-header">
                    <div className="usecase-card-icon">
                      <Database className="w-5 h-5" />
                    </div>
                    <h3>Vector Ingestion Filtering</h3>
                  </div>
                  <p style={{ fontSize: "14.5px", color: "var(--slate)" }}>
                    Inspects uploaded source files for PII, API tokens, and confidential records before they are vectorized and stored.
                  </p>
                  <ul className="usecase-bullets">
                    <li><Check className="w-4 h-4" /> Filters sensitive fields at the vector pipeline boundary</li>
                    <li><Check className="w-4 h-4" /> Prevents knowledge-base contamination before indexing</li>
                  </ul>
                </div>

                <div className="usecase-card">
                  <div className="usecase-card-header">
                    <div className="usecase-card-icon">
                      <Shield className="w-5 h-5" />
                    </div>
                    <h3>Semantic Access Boundaries</h3>
                  </div>
                  <p style={{ fontSize: "14.5px", color: "var(--slate)" }}>
                    Aligns user authentication directories directly with vector embedding access rights.
                  </p>
                  <ul className="usecase-bullets">
                    <li><Check className="w-4 h-4" /> Verifies that user queries only pull allowed vector chunks</li>
                    <li><Check className="w-4 h-4" /> Restricts LLM references to matched security roles</li>
                  </ul>
                </div>

                <div className="usecase-card">
                  <div className="usecase-card-header">
                    <div className="usecase-card-icon">
                      <Lock className="w-5 h-5" />
                    </div>
                    <h3>Source Citation Audits</h3>
                  </div>
                  <p style={{ fontSize: "14.5px", color: "var(--slate)" }}>
                    Maintains a transparent audit log detailing which records and metadata contributed to every model answer.
                  </p>
                  <ul className="usecase-bullets">
                    <li><Check className="w-4 h-4" /> Cryptographically traces RAG responses back to source files</li>
                    <li><Check className="w-4 h-4" /> Generates evidence maps for internal audit reviews</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ USE CASE 2: ON-PREM MODEL COMPLIANCE ============ */}
        <section className="sec sec--dark">
          <div className="wrap">
            <div className="usecase-layout">
              {/* Left Info Column */}
              <div className="usecase-info text-left">
                <span className="eyebrow mono">Data Residency</span>
                <h2>Monitor local, open-weights, and private LLMs.</h2>
                <p className="lead" style={{ fontSize: "16px", color: "#A9BDB8", marginTop: "18px", marginBottom: "24px", lineHeight: "1.6" }}>
                  Running models locally (like Llama 3, Mistral, or custom fine-tuned weights) protects your residency. ReguLattice runs fully containerized inside your infrastructure, providing local governance checks with zero external egress.
                </p>
                <div>
                  <button onClick={openBooking} className="btn btn--pri" style={{ background: "#0E7C6B", borderColor: "#0E7C6B" }}>
                    Request on-prem trial
                  </button>
                </div>
              </div>

              {/* Right Stack Column */}
              <div className="usecase-stack">
                <div className="usecase-card" style={{ color: "#0F2233" }}>
                  <div className="usecase-card-header">
                    <div className="usecase-card-icon" style={{ background: "rgba(14, 124, 107, 0.08)", color: "#0E7C6B" }}>
                      <Server className="w-5 h-5" />
                    </div>
                    <h3 style={{ color: "#0F2233" }}>Local Guardrail Interceptor</h3>
                  </div>
                  <p style={{ fontSize: "14.5px", color: "var(--slate)" }}>
                    Intercepts user queries and model outputs locally to scan for toxicity, hallucinations, and alignment metrics.
                  </p>
                  <ul className="usecase-bullets">
                    <li><Check className="w-4 h-4" /> Zero-egress architecture guarantees raw data remains in your VPC</li>
                    <li><Check className="w-4 h-4" /> Runs real-time safety classification locally on your GPU stack</li>
                  </ul>
                </div>

                <div className="usecase-card" style={{ color: "#0F2233" }}>
                  <div className="usecase-card-header">
                    <div className="usecase-card-icon" style={{ background: "rgba(14, 124, 107, 0.08)", color: "#0E7C6B" }}>
                      <Terminal className="w-5 h-5" />
                    </div>
                    <h3 style={{ color: "#0F2233" }}>Portable GRC Archives</h3>
                  </div>
                  <p style={{ fontSize: "14.5px", color: "var(--slate)" }}>
                    Compiles evidence, decision logs, and model cards into locally stored, machine-readable archives.
                  </p>
                  <ul className="usecase-bullets">
                    <li><Check className="w-4 h-4" /> Export comprehensive compliance packs without uploading telemetry</li>
                    <li><Check className="w-4 h-4" /> Integrates directly into your existing on-prem backup vaults</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ USE CASE 3: SHADOW AI DISCOVERY ============ */}
        <section className="sec">
          <div className="wrap">
            <div className="usecase-layout">
              {/* Left Info Column */}
              <div className="usecase-info text-left">
                <span className="eyebrow mono">System Inventory</span>
                <h2>Uncover shadow AI and connector-scoped integrations.</h2>
                <p className="lead" style={{ fontSize: "16px", color: "var(--slate)", marginTop: "18px", marginBottom: "24px", lineHeight: "1.6" }}>
                  Employees frequently embed external APIs and copilots into daily workflows. Our discovery agents perform read-only sweeps across your connected platforms to index, categorize, and map every active AI system.
                </p>
                <div className="flex flex-col gap-3">
                  <a href="/assessment" className="btn btn--ghost text-left" style={{ display: "inline-flex", width: "fit-content" }} onClick={() => handleConversionClick("UseCase3", "assess_shadow", "Shadow AI Assessment Link")}>
                    Scan your developer stack <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>

              {/* Right Stack Column */}
              <div className="usecase-stack">
                <div className="usecase-card">
                  <div className="usecase-card-header">
                    <div className="usecase-card-icon">
                      <Eye className="w-5 h-5" />
                    </div>
                    <h3>Automated Endpoint Discovery</h3>
                  </div>
                  <p style={{ fontSize: "14.5px", color: "var(--slate)" }}>
                    Audits code repos, SaaS access tokens, and cloud identity logs to locate undocumented model endpoints and copilots.
                  </p>
                  <ul className="usecase-bullets">
                    <li><Check className="w-4 h-4" /> Scans endpoints to find hidden AI usage outside security channels</li>
                    <li><Check className="w-4 h-4" /> Keeps your centralized AI systems inventory dynamically up-to-date</li>
                  </ul>
                </div>

                <div className="usecase-card">
                  <div className="usecase-card-header">
                    <div className="usecase-card-icon">
                      <Shield className="w-5 h-5" />
                    </div>
                    <h3>EU AI Act Classification</h3>
                  </div>
                  <p style={{ fontSize: "14.5px", color: "var(--slate)" }}>
                    Automatically analyzes system signals to assign preliminary risk bands and regulatory duties.
                  </p>
                  <ul className="usecase-bullets">
                    <li><Check className="w-4 h-4" /> Matches systems to risk bands based on tool access and input scope</li>
                    <li><Check className="w-4 h-4" /> Maps endpoints directly to corresponding ISO 42001 controls</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ BOTTOM BRIEFING BANNER ============ */}
        <section className="sec sec--dark text-center" style={{ paddingBlock: "64px" }}>
          <div className="wrap">
            <p style={{ fontSize: "18px", color: "#FFFFFF", fontWeight: "600", letterSpacing: "-0.01em", margin: 0 }}>
              Every model, dataset, and vector store mapped to one compliance catalog.
            </p>
          </div>
        </section>

        {/* ============ FINAL CTA ============ */}
        <section className="sec sec--white text-center" style={{ paddingBlock: "100px" }}>
          <div className="wrap">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Put your private AI stack to the test.
            </h2>
            <p className="lead" style={{ color: "var(--slate)", maxW: "600px", margin: "16px auto 32px" }}>
              Get a live demonstration showing how ReguLattice isolates vector DB queries and intercepts local LLM drift.
            </p>
            <div className="flex justify-center gap-4">
              <button onClick={openBooking} className="btn btn--pri">Schedule a live demo</button>
              <a href="/assessment" className="btn btn--sec">Run 60s scan assessment</a>
            </div>
          </div>
        </section>
      </main>

      <Footer onContact={() => setContactOpen(true)} />

      <ContactFormModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        title={modalTitle}
        description={modalDesc}
      />
    </div>
  );
}
