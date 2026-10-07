import { useState, useEffect, useRef } from "react";
import SEO from "@/components/SEO";
import { initPixel, trackPageview, trackPixelEvent } from "@/lib/pixels";
import { initGA, trackGAPageview, trackGAEvent } from "@/lib/google-analytics";
import "./home.css";

export default function About() {
  const [isStuck, setIsStuck] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scanStat, setScanStat] = useState("scanning…");
  
  // Quiz states
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [quizName, setQuizName] = useState("");
  const [quizEmail, setQuizEmail] = useState("");
  const [quizSent, setQuizSent] = useState(false);

  // Demo form states
  const [demoName, setDemoName] = useState("");
  const [demoCompany, setDemoCompany] = useState("");
  const [demoEmail, setDemoEmail] = useState("");
  const [demoRole, setDemoRole] = useState("AI Governance Lead");
  const [demoSystems, setDemoSystems] = useState("1–5");
  const [demoSent, setDemoSent] = useState(false);

  const quizQuestions = [
    { text: "Do you have a complete, current inventory of every AI system in use across the organisation?", options: ["No inventory", "Partial / spreadsheet", "Complete and maintained"] },
    { text: "Could you detect an AI tool a team started using this month without telling anyone?", options: ["Almost certainly not", "Eventually, manually", "Yes, automatically"] },
    { text: "Are your AI systems classified by risk tier and mapped to their regulatory scope?", options: ["Not yet", "High-risk ones only", "All of them"] },
    { text: "If an auditor asked for evidence today, how long would it take to produce it?", options: ["Weeks", "A few days", "Same day, exported"] },
    { text: "Do you monitor deployed AI systems for drift, retraining and control failure between reviews?", options: ["No", "Ad hoc", "Continuously"] },
    { text: "For a consequential AI decision, can you show who authorised its scope and whether it can be reversed?", options: ["No record", "Partially documented", "Fully logged"] },
  ];
  const totalQuestions = quizQuestions.length;
  const bands = [
    {min:0,  label:'Foundational',  copy:'You have AI in the organisation and very little visibility over it. The fastest win is a complete inventory — almost every other gap resolves once you can see what you are running.'},
    {min:35, label:'Developing',    copy:'The basics exist but they are manual and go stale between reviews. Continuous evidence collection and automated discovery are where the effort pays back first.'},
    {min:65, label:'Managed',       copy:'You are governing deliberately. The remaining gaps are usually monitoring between reviews and a defensible record of who authorised what.'},
    {min:85, label:'Audit-ready',   copy:'Strong position. Focus now shifts to proving it on demand across multiple frameworks, and to authority and reversibility for your highest-impact systems.'}
  ];

  // Initialize tracking on mount
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

  // stuck nav on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsStuck(window.scrollY > 8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // scanStat delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setScanStat("5 found · 2 undeclared");
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  // scroll reveal effect
  useEffect(() => {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

      const elements = document.querySelectorAll('.rise');
      elements.forEach((el, i) => {
        (el as HTMLElement).style.transitionDelay = `${(i % 4) * 60}ms`;
        io.observe(el);
      });

      return () => io.disconnect();
    } else {
      document.querySelectorAll('.rise').forEach((el) => el.classList.add('in'));
    }
  }, []);

  // quiz scoring calculation
  const handleAnswerSelect = (qIdx: number, val: number) => {
    setAnswers(prev => ({ ...prev, [qIdx]: val }));
  };

  const answeredCount = Object.keys(answers).length;
  const scoreSum = Object.values(answers).reduce((a, b) => a + b, 0);
  const pct = answeredCount > 0 ? Math.round((scoreSum / (totalQuestions * 2)) * 100) : 0;

  let scoreBandText = "";
  let scoreCopyText = "";
  if (answeredCount < totalQuestions) {
    const diff = totalQuestions - answeredCount;
    scoreBandText = `${diff} question${diff > 1 ? 's' : ''} to go`;
    scoreCopyText = "Your score is weighted towards the two areas auditors probe first: whether your inventory is complete, and whether your evidence is current.";
  } else {
    const currentBand = bands.reduce((acc, curr) => pct >= curr.min ? curr : acc, bands[0]);
    scoreBandText = currentBand.label;
    scoreCopyText = currentBand.copy;
  }

  // form validation
  const quizFormRef = useRef<HTMLFormElement>(null);
  const demoFormRef = useRef<HTMLFormElement>(null);

  const onQuizSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (quizFormRef.current && quizFormRef.current.checkValidity()) {
      setQuizSent(true);
      trackPixelEvent("CompleteRegistration", { 
        category: "Readiness Assessment",
        label: "Quiz Submission",
        name: quizName,
        email: quizEmail,
        score: pct
      });
      trackGAEvent("submit_readiness_assessment", {
        category: "Readiness Assessment",
        label: "Quiz Submission",
        score: pct
      });
    } else if (quizFormRef.current) {
      quizFormRef.current.reportValidity();
    }
  };

  const onDemoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (demoFormRef.current && demoFormRef.current.checkValidity()) {
      setDemoSent(true);
      trackPixelEvent("Lead", { 
        category: "Demo Booking",
        label: "Demo Submit Form",
        name: demoName,
        email: demoEmail,
        company: demoCompany,
        role: demoRole,
        systems: demoSystems
      });
      trackGAEvent("submit_demo", {
        category: "Demo Booking",
        label: "Demo Submit Form"
      });
    } else if (demoFormRef.current) {
      demoFormRef.current.reportValidity();
    }
  };

  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "ReguLattice AI Governance Platform",
      "description": "An AI-native governance platform that discovers, governs, and evidences AI systems continuously across ISO/IEC 42001, NIST AI RMF, and the EU AI Act.",
      "brand": {
        "@type": "Brand",
        "name": "ReguLattice"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "lowPrice": "79",
        "highPrice": "349",
        "offerCount": "3"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How long until we see our first real inventory?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most teams connect their first sources and see a populated inventory in the same session. A full sweep across cloud, SaaS and code typically settles within the first week, and classification follows as owners confirm what the agents propose."
          }
        },
        {
          "@type": "Question",
          "name": "Does ReguLattice replace our auditor or consultant?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. It replaces the six weeks of evidence gathering that happens before they arrive. Auditors and advisory firms use the partner mode to work inside the same workspace, which is usually faster for everyone."
          }
        },
        {
          "@type": "Question",
          "name": "What actually runs on our infrastructure in on-premise mode?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Both containers — the governance core and the agent runtime — plus private inference for the language models the agents use. Nothing about your models, evidence or findings egresses your network."
          }
        },
        {
          "@type": "Question",
          "name": "We already have ISO 27001 and SOC 2. Isn't this covered?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Those cover how you protect information, not how you govern AI decisions. ISO/IEC 42001 and the EU AI Act ask different questions: intended purpose, risk tier, human oversight, transparency, and what happens when a model drifts. ReguLattice is built for that second set."
          }
        },
        {
          "@type": "Question",
          "name": "Can we start with one framework and add more later?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, and that's the usual path. Because everything maps to a single control library, adding the EU AI Act or ISO 23894 later shows you existing coverage immediately rather than starting you at zero."
          }
        },
        {
          "@type": "Question",
          "name": "How much of this is automated versus human?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Agents do the finding, mapping, collecting and watching. People decide. Autonomy is configurable per agent, and any irreversible high-impact action requires a named approver before it executes."
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "AI Governance Lifecycle Process",
      "description": "How to implement continuous AI governance from discovery to audit-ready compliance using ReguLattice.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Discover: Find it all",
          "text": "Connect your cloud, SaaS, code and network sources. The inventory populates itself, including systems nobody declared."
        },
        {
          "@type": "HowToStep",
          "name": "Assess: Tier the risk",
          "text": "Each system gets a purpose, an owner, a risk tier and its regulatory scope — agent-assisted, confirmed by a human."
        },
        {
          "@type": "HowToStep",
          "name": "Govern: Apply controls",
          "text": "Required controls, policies and decision boundaries are applied across every framework in scope simultaneously."
        },
        {
          "@type": "HowToStep",
          "name": "Monitor: Watch for change",
          "text": "Drift, retraining, policy breaches and expiring evidence raise alerts and land on a remediation board with an owner."
        },
        {
          "@type": "HowToStep",
          "name": "Improve: Close the gap",
          "text": "Maturity and gap reporting shows what moved, what regressed, and what to fix next — then the loop restarts."
        }
      ]
    }
  ];

  const scanned = scanStat !== "scanning…";

  const check = (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
  );
  const arrow = (
    <svg className="arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  );
  const brandMark = (
    <span className="brand-mark" aria-hidden="true">
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
        <path d="M8 1.2 14 4v5.1c0 3.2-2.5 5-6 5.7-3.5-.7-6-2.5-6-5.7V4L8 1.2Z" stroke="#34D399" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M8 4.4v7.2M4.6 6.2h6.8M4.6 9.4h6.8" stroke="#34D399" strokeWidth="1" strokeLinecap="round" />
      </svg>
    </span>
  );

  const inventory = [
    { name: "hr-screening-copilot", tag: "new", tagLabel: "Undeclared", meta: "Third-party API · recruitment · EU AI Act Annex III", tier: "high", tierLabel: "High" },
    { name: "claims-triage-agent", tag: "ok", tagLabel: "Governed", meta: "Internal model · claims operations · 42001 A.6", tier: "high", tierLabel: "High" },
    { name: "credit-scoring-v4", tag: "drift", tagLabel: "Drift", meta: "Internal model · lending · retrained 4d ago", tier: "high", tierLabel: "High" },
    { name: "support-summariser", tag: "ok", tagLabel: "Governed", meta: "SaaS copilot · customer service", tier: "ltd", tierLabel: "Limited" },
    { name: "eng-code-assistant", tag: "new", tagLabel: "Undeclared", meta: "SaaS copilot · engineering · no owner assigned", tier: "", tierLabel: "Minimal" },
  ];
  const visibleInventory = scanned ? inventory : inventory.filter((s) => s.tag !== "new");

  return (
    <div className="rl">
      <SEO
        title="ReguLattice — AI-Native Governance Platform | ISO/IEC 42001, NIST AI RMF, EU AI Act"
        description="ReguLattice discovers every AI system you run — including shadow AI — then governs and evidences it continuously across ISO/IEC 42001, NIST AI RMF and the EU AI Act. Cloud or fully on-premise."
        schema={seoSchema}
      />

      {/* ============ NAV ============ */}
      <header className={`nav ${isStuck ? "is-stuck" : ""}`} id="nav">
        <div className="wrap nav-in">
          <a className="brand" href="#top">{brandMark}ReguLattice</a>
          <nav className="nav-links" aria-label="Primary">
            <a href="#problem">Why now</a>
            <a href="#agents">Agents</a>
            <a href="#authority">Authority Engine</a>
            <a href="#frameworks">Frameworks</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="nav-cta">
            <a className="btn btn--ghost btn--sm" href="#snapshot" onClick={() => handleConversionClick("HeaderNav", "free_scan", "Header Check Readiness")}>Check my readiness</a>
            <a className="btn btn--pri btn--sm" href="#demo" onClick={() => handleConversionClick("HeaderNav", "book_a_demo", "Header Book Demo")}>Book a demo</a>
          </div>
          <button
            className="burger"
            id="burger"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span></span>
          </button>
        </div>
        <div className={`mobile-menu wrap ${mobileOpen ? "open" : ""}`} id="mobileMenu">
          <a href="#problem" onClick={() => setMobileOpen(false)}>Why now</a>
          <a href="#agents" onClick={() => setMobileOpen(false)}>Agents</a>
          <a href="#authority" onClick={() => setMobileOpen(false)}>Authority Engine</a>
          <a href="#frameworks" onClick={() => setMobileOpen(false)}>Frameworks</a>
          <a href="#faq" onClick={() => setMobileOpen(false)}>FAQ</a>
          <a className="btn btn--pri btn--wide" href="#demo" onClick={() => { setMobileOpen(false); handleConversionClick("MobileNav", "book_a_demo", "Mobile Book Demo"); }}>Book a demo</a>
        </div>
      </header>

      <main id="top">
        {/* ============ HERO ============ */}
        <section className="hero">
          <div className="hero-bg" aria-hidden="true"></div>
          <div className="wrap hero-center">
            <a className="announce" href="#snapshot" onClick={() => handleConversionClick("Hero", "free_scan", "Hero Announcement Pill")}>
              <span className="announce-tag"><i></i>Free</span>
              <span>Score your AI governance in 60 seconds<span className="announce-text-more"> — no login</span></span>
              {arrow}
            </a>
            <h1>You can't govern the AI <span className="grad">you don't know exists.</span></h1>
            <p className="lead">ReguLattice puts seven autonomous agents to work finding every model, copilot, agent and third-party AI API you run — then governs and evidences each one continuously across ISO/IEC 42001, NIST AI RMF and the EU AI Act.</p>

            <div className="btn-row">
              <a className="btn btn--pri btn--lg" href="#demo" onClick={() => handleConversionClick("Hero", "book_a_demo", "Hero Primary Demo")}>Book a 20-minute demo {arrow}</a>
              <a className="btn btn--ghost btn--lg" href="#snapshot" onClick={() => handleConversionClick("Hero", "free_scan", "Hero Secondary Scan")}>Check my readiness</a>
            </div>

            <div className="microtrust">
              <span>{check}No training on your data</span>
              <span>{check}Humans approve high-impact decisions</span>
              <span>{check}Cloud, on-prem or air-gapped</span>
            </div>
          </div>

          {/* signature element: the live discovery workspace */}
          <div className="wrap">
            <div className="shot">
              <div className="app" role="img" aria-label="Product view: the AI inventory being populated live by the Discovery Agent, showing five discovered AI systems with risk tiers and evidence freshness at 92 percent.">
                <div className="app-bar">
                  <div className="app-dots" aria-hidden="true"><i></i><i></i><i></i></div>
                  <span className="app-url">
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.5" /></svg>
                    app.regulattice.com/inventory
                  </span>
                </div>
                <div className="scanline" aria-hidden="true"></div>
                <div className="app-body">
                  <aside className="app-side" aria-hidden="true">
                    <div className="side-org"><i></i>Acme Financial</div>
                    <span className="side-item on">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" /><rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" /><rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" /><rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" /></svg>
                      AI Inventory<b>{scanned ? 5 : 3}</b>
                    </span>
                    <span className="side-item">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1.6 13.4 4.5v4.2c0 3-2.3 4.9-5.4 5.7-3.1-.8-5.4-2.7-5.4-5.7V4.5L8 1.6Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
                      Controls<b>142</b>
                    </span>
                    <span className="side-item">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3.4 2.2h6.2l3 3v8.6H3.4V2.2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
                      Evidence
                    </span>
                    <span className="side-item">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 2v12M3.4 4.6h9.2M5.6 14h4.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
                      Authority ledger
                    </span>
                    <span className="side-item">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 13V6.6M6 13V3.2M10 13V8.4M14 13V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                      Reports
                    </span>
                    <span className="side-label">Agents</span>
                    <span className="side-agent"><i className={scanned ? "" : "busy"}></i>Discovery</span>
                    <span className="side-agent"><i></i>Classification</span>
                    <span className="side-agent"><i></i>Evidence</span>
                    <span className="side-agent"><i className="busy"></i>Monitoring</span>
                  </aside>

                  <div className="app-main">
                    <div className="app-head">
                      <h4>AI Inventory</h4>
                      <span className="live-chip"><i></i>Live</span>
                      <span className="stat" id="scanStat">{scanStat}</span>
                    </div>
                    <div className="kpis">
                      <div className="kpi"><span>Systems found</span><strong>{scanned ? 5 : 3}{scanned && <em>+2</em>}</strong></div>
                      <div className="kpi"><span>Undeclared</span><strong>{scanned ? 2 : 0}{scanned && <em className="warn">needs owner</em>}</strong></div>
                      <div className="kpi"><span>High risk</span><strong>3</strong></div>
                      <div className="kpi"><span>Evidence fresh</span><strong>92%</strong></div>
                    </div>
                    <div className="inv">
                      <div className="inv-row th" aria-hidden="true"><span>System</span><span>Context</span><span>Status</span><span>Tier</span></div>
                      {visibleInventory.map((s) => (
                        <div key={s.name} className={`inv-row ${s.tag === "new" ? "is-new" : ""}`}>
                          <span className="inv-name">{s.name}</span>
                          <span className="inv-meta">{s.meta}</span>
                          <span className={`tag tag--${s.tag}`}>{s.tagLabel}</span>
                          <span className={`tier ${s.tier ? `tier--${s.tier}` : ""}`}>{s.tierLabel}</span>
                        </div>
                      ))}
                    </div>
                    <div className="app-foot">
                      <div className="ring" aria-hidden="true"></div>
                      <div className="foot-txt">
                        <strong>Evidence freshness</strong>
                        <span>3 artefacts approaching TTL expiry</span>
                      </div>
                      <div className="agent-dots" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ FRAMEWORK STRIP ============ */}
        <div className="strip">
          <div className="wrap">
            <span className="strip-label">One inventory, mapped to every major AI framework</span>
            <div className="strip-items">
              <span className="strip-item">ISO/IEC 42001</span>
              <span className="strip-item">NIST AI RMF</span>
              <span className="strip-item">EU AI Act</span>
              <span className="strip-item">ISO/IEC 23894</span>
              <span className="strip-item">ISO/IEC 38507</span>
              <span className="strip-item">OECD AI Principles</span>
              <span className="strip-item">UNESCO AI Ethics</span>
            </div>
          </div>
        </div>

        {/* ============ INSIGHT BAND ============ */}
        <section className="sec sec--dark insight">
          <div className="wrap">
            <span className="eyebrow">The premise</span>
            <q>Most organisations are deploying AI far faster than they can <span className="grad">see, classify, or account for it.</span></q>
            <p className="lead">ReguLattice closes that gap by making governance continuous, machine-assisted and audit-ready — with people still accountable for the decisions that matter.</p>
          </div>
        </section>

        {/* ============ PROBLEM ============ */}
        <section className="sec" id="problem">
          <div className="wrap">
            <div className="head">
              <span className="eyebrow">Why now</span>
              <h2>AI moved faster than the governance model built to hold it.</h2>
              <p className="lead">Every one of these is normal. Together they mean your governance is permanently describing an estate that no longer exists.</p>
            </div>

            <div className="prob grid-cards">
              <div className="prob-item card">
                <span className="mono">01 · Shadow AI</span>
                <h3>Systems nobody registered</h3>
                <p>Teams ship copilots, agents and third-party AI APIs on a corporate card. Your inventory is a spreadsheet that was accurate last quarter.</p>
              </div>
              <div className="prob-item card">
                <span className="mono">02 · Stale evidence</span>
                <h3>Proof with an expiry date</h3>
                <p>Screenshots gathered for the last audit are already out of date, and nobody can say which controls are still operating today.</p>
              </div>
              <div className="prob-item card">
                <span className="mono">03 · Framework sprawl</span>
                <h3>The same answer, five times</h3>
                <p>ISO 42001, NIST AI RMF, the EU AI Act and ISO 23894 ask overlapping questions — and your team answers each one from scratch.</p>
              </div>
              <div className="prob-item card">
                <span className="mono">04 · Questionnaires</span>
                <h3>Assessment after the fact</h3>
                <p>Model owners self-assess in forms they don't understand, months after the system went live and started making decisions.</p>
              </div>
              <div className="prob-item card">
                <span className="mono">05 · Authority gap</span>
                <h3>No record of who allowed what</h3>
                <p>When an AI system makes a consequential call, nobody can show who approved that scope, what its limits were, or whether the outcome can be undone.</p>
              </div>
              <div className="prob-item card">
                <span className="mono">06 · Silent drift</span>
                <h3>Change without signal</h3>
                <p>Models get retrained, prompts get edited, connectors change. Control effectiveness degrades quietly, and the first sign is an incident.</p>
              </div>
            </div>

            <div className="prob-result">
              <span className="mono">Result</span>
              <p>Governance that is permanently behind the estate it is meant to govern — and an audit you brace for instead of pass.</p>
            </div>
          </div>
        </section>

        {/* ============ FLYWHEEL ============ */}
        <section className="sec sec--alt">
          <div className="wrap">
            <div className="head head--center">
              <span className="eyebrow">The model</span>
              <h2>See it. Govern it. Prove it.</h2>
              <p className="lead">Three moves, running continuously instead of once a year.</p>
            </div>

            <div className="fly">
              <div className="fly-step">
                <span className="fly-num">Discovery</span>
                <span className="fly-big" aria-hidden="true">01</span>
                <h3>See it</h3>
                <p>ReguLattice builds one live AI Inventory — models, agents, copilots, RAG stacks and third-party AI APIs, including the ones nobody declared. Every system gets an owner, a purpose and a risk tier.</p>
              </div>
              <div className="fly-step">
                <span className="fly-num">Control</span>
                <span className="fly-big" aria-hidden="true">02</span>
                <h3>Govern it</h3>
                <p>Each system is mapped to the controls that genuinely apply to it, across every framework at once, with decision boundaries and human sign-off points set before it operates — not after.</p>
              </div>
              <div className="fly-step">
                <span className="fly-num">Assurance</span>
                <span className="fly-big" aria-hidden="true">03</span>
                <h3>Prove it</h3>
                <p>Evidence is collected, timestamped and refreshed on a schedule, so a conformity pack, model card or gap report is something you export — not something you assemble for six weeks.</p>
              </div>
            </div>
            <p className="fly-bridge">Seven autonomous agents run this loop. Here's what each one does.</p>
          </div>
        </section>

        {/* ============ 7 AGENTS ============ */}
        <section className="sec" id="agents">
          <div className="wrap">
            <div className="head head--center">
              <span className="eyebrow">The platform</span>
              <h2>Seven autonomous agents, one governance loop.</h2>
              <p className="lead">Not a checklist with a chatbot on top. Each agent owns a stage of the lifecycle, runs on a schedule or on change, and hands its output to the next one.</p>
            </div>

            <div className="agents">
              <article className="agent rise">
                <div className="agent-top"><span className="agent-id">Agent 01</span>
                  <span className="agent-ico"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="4.6" stroke="currentColor" strokeWidth="1.4" /><path d="m10.6 10.6 3.1 3.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg></span>
                </div>
                <h3>Discovery Agent</h3>
                <p>Finds every model, agent, copilot and third-party AI API in use — including shadow AI running outside any approval process — and keeps the inventory live.</p>
                <span className="agent-tag mono">Inventory · Shadow AI</span>
              </article>

              <article className="agent rise">
                <div className="agent-top"><span className="agent-id">Agent 02</span>
                  <span className="agent-ico"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" /><circle cx="8" cy="8" r="2.6" stroke="currentColor" strokeWidth="1.3" /><circle cx="8" cy="8" r=".9" fill="currentColor" /></svg></span>
                </div>
                <h3>Classification Agent</h3>
                <p>Assigns risk tier, intended purpose and regulatory scope — including EU AI Act categorisation — from system signals, so owners answer a handful of questions instead of a form.</p>
                <span className="agent-tag mono">Risk tiering · Scope</span>
              </article>

              <article className="agent rise">
                <div className="agent-top"><span className="agent-id">Agent 03</span>
                  <span className="agent-ico"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.6 13.4 4.5v4.2c0 3-2.3 4.9-5.4 5.7-3.1-.8-5.4-2.7-5.4-5.7V4.5L8 1.6Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="m5.8 8 1.6 1.6 3-3.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                </div>
                <h3>Control Agent</h3>
                <p>Maps each system to the controls it actually needs, across every applicable framework at once — so one implemented control satisfies several standards instead of one.</p>
                <span className="agent-tag mono">Multi-framework mapping</span>
              </article>

              <article className="agent rise">
                <div className="agent-top"><span className="agent-id">Agent 04</span>
                  <span className="agent-ico"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3.4 2.2h6.2l3 3v8.6H3.4V2.2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M9.4 2.2v3.3h3.2M5.8 9h4.4M5.8 11.2h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg></span>
                </div>
                <h3>Evidence Agent</h3>
                <p>Collects, timestamps and maps proof continuously, then scores its freshness from 0–100% with a TTL so you know what's still valid and what has decayed.</p>
                <span className="agent-tag mono">Continuous evidence · TTL</span>
              </article>

              <article className="agent rise">
                <div className="agent-top"><span className="agent-id">Agent 05</span>
                  <span className="agent-ico"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 13V6.6M6 13V3.2M10 13V8.4M14 13V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg></span>
                </div>
                <h3>Monitoring Agent</h3>
                <p>Watches for drift, model and prompt changes, policy breaches and failing controls — and raises the signal while it's still a finding, not an incident.</p>
                <span className="agent-tag mono">Drift · Control effectiveness</span>
              </article>

              <article className="agent rise">
                <div className="agent-top"><span className="agent-id">Agent 06</span>
                  <span className="agent-ico"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v12M3.4 4.6h9.2M4.6 4.6 2.4 9.2h4.4L4.6 4.6ZM11.4 4.6 9.2 9.2h4.4l-2.2-4.6ZM5.6 14h4.8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                </div>
                <h3>Authority Agent</h3>
                <p>Records who authorised what, the decision boundaries each system operates inside, and whether its outputs can be reversed — a durable authority ledger.</p>
                <span className="agent-tag mono">Authority · Reversibility</span>
              </article>

              <article className="agent rise">
                <div className="agent-top"><span className="agent-id">Agent 07</span>
                  <span className="agent-ico"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6.2" r="4.2" stroke="currentColor" strokeWidth="1.3" /><path d="M5.6 9.8 4.8 14.4 8 12.8l3.2 1.6-.8-4.6" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg></span>
                </div>
                <h3>Assurance Agent</h3>
                <p>Generates audit-ready evidence packs, model cards and conformity documentation on demand — formatted for the framework the auditor is actually asking about.</p>
                <span className="agent-tag mono">Conformity packs</span>
              </article>

              <article className="agent agent--feature rise">
                <div className="agent-top"><span className="agent-id">Orchestration</span>
                  <span className="agent-ico"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="1.7" fill="currentColor" /><circle cx="2.6" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.2" /><circle cx="13.4" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.2" /><circle cx="2.6" cy="13" r="1.5" stroke="currentColor" strokeWidth="1.2" /><circle cx="13.4" cy="13" r="1.5" stroke="currentColor" strokeWidth="1.2" /><path d="M3.7 4.1 6.7 6.7M12.3 4.1 9.3 6.7M3.7 11.9l3-2.6M12.3 11.9l-3-2.6" stroke="currentColor" strokeWidth="1.1" /></svg></span>
                </div>
                <h3>They work as a system</h3>
                <p>Discovery feeds classification, classification drives controls, controls define what evidence is needed, monitoring invalidates evidence that goes stale — and the loop runs again.</p>
                <span className="agent-tag mono">Multi-agent orchestration</span>
              </article>
            </div>

            <p className="agents-close">You set the autonomy level per agent — from suggest-only to full assist. High-impact approvals always stay with a named person.</p>
          </div>
        </section>

        {/* ============ AUTHORITY & REVERSIBILITY ============ */}
        <section className="sec sec--alt" id="authority">
          <div className="wrap">
            <div className="head">
              <span className="eyebrow">The differentiator</span>
              <h2>The AI Authority &amp; Reversibility Engine</h2>
              <p className="lead">Two questions decide how an AI system should be supervised: how much authority has been handed to it, and whether what it does can be undone. ReguLattice asks both, records the answers, and enforces the result.</p>
            </div>

            <div className="matrix-wrap">
              <div className="axis-y" aria-hidden="true">
                <span>Authority retained</span>
                <span>Authority delegated</span>
              </div>
              <div>
                <div className="axis-x" aria-hidden="true">
                  <span>Reversible outcome</span>
                  <span>Irreversible outcome</span>
                </div>
                <div className="matrix">
                  <div className="cell cell--monitor">
                    <h4><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M1.4 8S3.9 3.6 8 3.6 14.6 8 14.6 8 12.1 12.4 8 12.4 1.4 8 1.4 8Z" stroke="currentColor" strokeWidth="1.3" /><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" /></svg> Retained · Reversible</h4>
                    <strong>Monitor</strong>
                    <p>The system recommends, a person acts, and the outcome can be rolled back. Log everything, sample for quality, and review on a cadence.</p>
                  </div>
                  <div className="cell cell--signoff">
                    <h4><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2.6 12.4c2-3.8 3.6-6 4.6-6.6 1-.6 1.4.2.8 1.4-.6 1.2-1.4 2.4-1 2.9.5.5 1.6-.5 2.6-1.4 1-.9 1.7-.5 1.6.6-.1 1.1.4 1.6 2.2.9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg> Retained · Irreversible</h4>
                    <strong>Sign-off</strong>
                    <p>A named human is accountable before execution. ReguLattice blocks the action until that approval is recorded, with the reasoning attached to the ledger.</p>
                  </div>
                  <div className="cell cell--guard">
                    <h4><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1.8 13.2 4.4v4c0 2.9-2.2 4.7-5.2 5.5-3-.8-5.2-2.6-5.2-5.5v-4L8 1.8Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg> Delegated · Reversible</h4>
                    <strong>Guardrail</strong>
                    <p>The system acts on its own inside limits you define — scope, volume, thresholds — under continuous evaluation, with an audited path to undo.</p>
                  </div>
                  <div className="cell cell--blocked">
                    <h4><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.2" stroke="currentColor" strokeWidth="1.3" /><path d="m4.4 4.4 7.2 7.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg> Delegated · Irreversible</h4>
                    <strong>Blocked</strong>
                    <p>Autonomous and unrecoverable is not a configuration ReguLattice will let you ship. Hard stop until authority is escalated to a person or the action is made reversible.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="matrix-note">
              <p>Most tools track controls. ReguLattice also tracks <span className="hl">how much authority an AI system holds — and whether its decisions can be undone.</span></p>
            </div>
          </div>
        </section>

        {/* ============ HOW IT WORKS ============ */}
        <section className="sec">
          <div className="wrap">
            <div className="sec-split">
              <div className="head">
                <span className="eyebrow">How it works</span>
                <h2>The lifecycle, running on a loop.</h2>
                <p className="lead">From first connection to continuous operation, usually inside the first two weeks.</p>
              </div>
              <a className="btn btn--ghost" href="#snapshot" onClick={() => handleConversionClick("HowItWorks", "free_scan", "HowItWorks Take Assessment")}>Take the 2-minute assessment {arrow}</a>
            </div>

            <div className="life">
              <div className="life-step is-first" data-n="1">
                <span className="mono">Discover</span>
                <h3>Find it all</h3>
                <p>Connect your cloud, SaaS, code and network sources. The inventory populates itself, including systems nobody declared.</p>
              </div>
              <div className="life-step" data-n="2">
                <span className="mono">Assess</span>
                <h3>Tier the risk</h3>
                <p>Each system gets a purpose, an owner, a risk tier and its regulatory scope — agent-assisted, confirmed by a human.</p>
              </div>
              <div className="life-step" data-n="3">
                <span className="mono">Govern</span>
                <h3>Apply controls</h3>
                <p>Required controls, policies and decision boundaries are applied across every framework in scope simultaneously.</p>
              </div>
              <div className="life-step" data-n="4">
                <span className="mono">Monitor</span>
                <h3>Watch for change</h3>
                <p>Drift, retraining, policy breaches and expiring evidence raise alerts and land on a remediation board with an owner.</p>
              </div>
              <div className="life-step" data-n="5">
                <span className="mono">Improve</span>
                <h3>Close the gap</h3>
                <p>Maturity and gap reporting shows what moved, what regressed, and what to fix next — then the loop restarts.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ FRAMEWORKS ============ */}
        <section className="sec sec--alt" id="frameworks">
          <div className="wrap">
            <div className="head">
              <span className="eyebrow">Coverage</span>
              <h2>Implement one control. Satisfy several standards.</h2>
              <p className="lead">ReguLattice treats frameworks as lenses over a single control library, not as separate projects with separate spreadsheets.</p>
            </div>

            <div className="fw-list grid-cards">
              <div className="fw card"><span className="fw-rank">01</span><h3>ISO/IEC 42001</h3><p>The AI management system that forms the backbone — governance structure, roles, objectives and the operating rhythm everything else hangs from.</p></div>
              <div className="fw card"><span className="fw-rank">02</span><h3>NIST AI RMF</h3><p>The risk function: Govern, Map, Measure and Manage, applied per system and evidenced continuously rather than asserted annually.</p></div>
              <div className="fw card"><span className="fw-rank">03</span><h3>EU AI Act</h3><p>Regulatory obligation depth — risk categorisation, high-risk duties, transparency requirements and conformity documentation.</p></div>
              <div className="fw card"><span className="fw-rank">04</span><h3>ISO/IEC 23894</h3><p>AI-specific risk management: identifying, analysing and treating risks unique to AI systems across their lifecycle.</p></div>
              <div className="fw card"><span className="fw-rank">05</span><h3>ISO/IEC 38507</h3><p>The governing-body view — leadership accountability, guiding principles and where the organisation's risk appetite actually sits.</p></div>
              <div className="fw card"><span className="fw-rank">06</span><h3>OECD &amp; UNESCO</h3><p>Principle alignment for fairness, transparency, human oversight and human rights, mapped to the controls that demonstrate them.</p></div>
            </div>

            <div className="map">
              <div className="map-node">
                <span className="mono">Control · one implementation</span>
                <strong>Human oversight of high-impact AI decisions is defined, assigned and evidenced.</strong>
              </div>
              <div className="map-stem"></div>
              <div className="map-bus"></div>
              <div className="map-chips">
                <span className="chip">ISO/IEC 42001</span>
                <span className="chip">NIST AI RMF</span>
                <span className="chip">EU AI Act</span>
                <span className="chip">ISO/IEC 23894</span>
                <span className="chip">ISO/IEC 38507</span>
                <span className="chip">OECD &amp; UNESCO</span>
              </div>
              <cite>Evidence is collected once, then presented in the language each framework expects.</cite>
            </div>
          </div>
        </section>

        {/* ============ CAPABILITIES ============ */}
        <section className="sec">
          <div className="wrap">
            <div className="head">
              <span className="eyebrow">Capabilities</span>
              <h2>What you get on day one.</h2>
            </div>

            <div className="usp grid-cards">
              <div className="usp-item card"><h3><span className="ico"><svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="4.6" stroke="currentColor" strokeWidth="1.4" /><path d="m10.6 10.6 3.1 3.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg></span>Shadow AI discovery</h3><p>Surface undeclared models, agents, copilots and AI APIs across cloud, SaaS and code — with an owner assigned to each.</p></div>
              <div className="usp-item card"><h3><span className="ico"><svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 2 14 5.4v5.2L8 14 2 10.6V5.4L8 2Z" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" /></svg></span>Agent-assisted risk tiering</h3><p>Purpose, risk tier and regulatory scope proposed from system signals, confirmed by a human in minutes.</p></div>
              <div className="usp-item card"><h3><span className="ico"><svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M2.4 4.6h11.2M2.4 8h11.2M2.4 11.4h11.2M5.6 2.4v11.2" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" /></svg></span>Multi-framework lens</h3><p>One control library, many standards. Implement once and see coverage move across every framework in scope.</p></div>
              <div className="usp-item card"><h3><span className="ico"><svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.1" stroke="currentColor" strokeWidth="1.35" /><path d="M8 4.6V8l2.4 1.6" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" /></svg></span>Continuous evidence &amp; freshness</h3><p>Proof is collected on a schedule, scored 0–100%, and flagged as it decays past its TTL — no more audit-week archaeology.</p></div>
              <div className="usp-item card"><h3><span className="ico"><svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M1.8 12.4V4M14.2 12.4V4M1.8 12.4h12.4M4.6 9.8V7M8 9.8V5.4M11.4 9.8V6.4" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" /></svg></span>Live monitoring &amp; drift</h3><p>Model changes, prompt edits, policy breaches and failing controls raise alerts before they become findings.</p></div>
              <div className="usp-item card"><h3><span className="ico"><svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 2v12M3.4 4.6h9.2M5.6 14h4.8" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" /></svg></span>Authority &amp; reversibility ledger</h3><p>A durable record of who authorised what, the boundaries each system runs inside, and whether its decisions can be undone.</p></div>
              <div className="usp-item card"><h3><span className="ico"><svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3.4 2.2h6.2l3 3v8.6H3.4V2.2Z" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" /><path d="M9.4 2.2v3.3h3.2" stroke="currentColor" strokeWidth="1.35" /></svg></span>Conformity &amp; evidence packs</h3><p>Model cards, Statements of Applicability, EU AI Act readiness and auditor-ready packs exported on demand.</p></div>
              <div className="usp-item card"><h3><span className="ico"><svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="1.7" fill="currentColor" /><circle cx="3" cy="3.4" r="1.4" stroke="currentColor" strokeWidth="1.2" /><circle cx="13" cy="3.4" r="1.4" stroke="currentColor" strokeWidth="1.2" /><circle cx="8" cy="13.4" r="1.4" stroke="currentColor" strokeWidth="1.2" /><path d="M4.1 4.4 6.7 6.7M11.9 4.4 9.3 6.7M8 9.7v2.3" stroke="currentColor" strokeWidth="1.1" /></svg></span>Agentic system governance</h3><p>Built for AI that acts, not just predicts — tool access, decision scope and escalation paths are governed objects.</p></div>
            </div>
          </div>
        </section>

        {/* ============ OUTCOMES ============ */}
        <section className="sec sec--alt">
          <div className="wrap">
            <div className="head">
              <span className="eyebrow">Outcomes</span>
              <h2>What changes for your team.</h2>
            </div>
            <div className="out">
              <div className="out-item"><strong>You know what you're running</strong><p>A single AI inventory that stays true between audits, not a spreadsheet rebuilt every quarter.</p></div>
              <div className="out-item"><strong>Audit prep stops being a project</strong><p>Evidence is already collected, mapped and current, so a pack is exported rather than assembled.</p></div>
              <div className="out-item"><strong>One effort covers many frameworks</strong><p>Adding a standard becomes a mapping exercise, not a new programme with its own budget.</p></div>
              <div className="out-item"><strong>Model owners stop drowning in forms</strong><p>Agents pre-fill what they can. People confirm, decide, and get back to their day.</p></div>
              <div className="out-item"><strong>Risk surfaces earlier</strong><p>Drift and control failures show up as alerts with an owner and a due date, not as post-incident findings.</p></div>
              <div className="out-item"><strong>Accountability is provable</strong><p>For any AI decision, you can show who authorised it, within what limits, and whether it can be reversed.</p></div>
            </div>
          </div>
        </section>

        {/* ============ TRUST & DEPLOYMENT ============ */}
        <section className="sec sec--dark">
          <div className="wrap trust">
            <div>
              <span className="eyebrow">Trust &amp; deployment</span>
              <h2>Built for organisations that can't send their data anywhere.</h2>
              <p className="lead" style={{ marginTop: "18px" }}>Governance data is some of the most sensitive material an organisation holds: model behaviour, incidents, decisions, and the reasoning behind them. ReguLattice is designed so none of it has to leave your control.</p>
              <ul className="trust-list">
                <li>{check}<span><strong>Private inference on your infrastructure.</strong> Small language models run inside your environment, so prompts, evidence and findings stay in your network.</span></li>
                <li>{check}<span><strong>Humans stay accountable.</strong> Autonomy is configurable per agent, and irreversible high-impact actions always require a named approver.</span></li>
                <li>{check}<span><strong>No training on your data by default.</strong> Your evidence, policies and model records are not used to improve anyone else's system.</span></li>
                <li>{check}<span><strong>Made for regulated markets.</strong> Financial services, healthcare, public sector and defence-adjacent organisations where data residency is non-negotiable.</span></li>
              </ul>
            </div>

            <div className="deploy">
              <div className="deploy-row"><span className="mono">Cloud</span><div><strong>Hosted workspace</strong><p>Fastest path to a live inventory. Managed updates, no infrastructure to run.</p></div></div>
              <div className="deploy-row"><span className="mono">Hybrid</span><div><strong>Local model assist</strong><p>Platform in the cloud, sensitive inference handled locally on your own hardware.</p></div></div>
              <div className="deploy-row"><span className="mono">On-prem</span><div><strong>Inside your perimeter</strong><p>The full two-container deployment — governance core plus agent runtime — in your environment.</p></div></div>
              <div className="deploy-row"><span className="mono">Air-gapped</span><div><strong>No external connectivity</strong><p>For classified, sovereign or fully isolated networks. Nothing egresses, ever.</p></div></div>
            </div>
          </div>
        </section>

        {/* ============ READINESS SNAPSHOT ============ */}
        <section className="sec" id="snapshot">
          <div className="wrap">
            <div className="head">
              <span className="eyebrow">Free · 60 seconds · no login</span>
              <h2>How ready is your AI governance, really?</h2>
              <p className="lead">Six questions, scored against the ISO/IEC 42001 backbone and EU AI Act obligations. You'll get an indicative maturity score straight away — and we'll send the full gap breakdown if you want it.</p>
            </div>

            <div className="snap">
              <div className="snap-form" id="quiz">
                {quizQuestions.map((q, qi) => (
                  <div className="q" data-q={qi} key={qi}>
                    <div className="q-label"><span className="mono">Q{qi + 1}</span><p>{q.text}</p></div>
                    <div className="opts">
                      {q.options.map((label, oi) => (
                        <button
                          key={label}
                          onClick={() => handleAnswerSelect(qi, oi)}
                          className={`opt ${answers[qi] === oi ? "sel" : ""}`}
                          aria-pressed={answers[qi] === oi}
                          type="button"
                        >{label}</button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <aside className="score">
                <span className="mono">Indicative maturity</span>
                <div className="meter">
                  <i id="meterFill" style={{ width: `${pct}%` }}></i>
                </div>
                <div className="score-num">
                  <span id="scoreVal">{answeredCount > 0 ? pct : "—"}</span>
                  <span>/100</span>
                </div>
                <div className="score-band" id="scoreBand">{scoreBandText}</div>
                <p className="score-copy" id="scoreCopy">{scoreCopyText}</p>

                <form className="score-form" id="snapForm" ref={quizFormRef} onSubmit={onQuizSubmit} noValidate>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full name"
                    aria-label="Full name"
                    autoComplete="name"
                    required
                    value={quizName}
                    onChange={(e) => setQuizName(e.target.value)}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Work email"
                    aria-label="Work email"
                    autoComplete="email"
                    required
                    value={quizEmail}
                    onChange={(e) => setQuizEmail(e.target.value)}
                  />
                  <button className="btn btn--onDark btn--wide" type="submit" disabled={quizSent}>
                    {quizSent ? "Sent" : "Get your full readiness report"}
                  </button>
                  <p className="score-hint">We'll email a breakdown of the gaps behind your score. No spam, and you can opt out in one click.</p>
                  <p className={`ok-msg ${quizSent ? "show" : ""}`} id="snapOk">Thanks — your gap report is on its way. We'll follow up within one working day.</p>
                </form>
              </aside>
            </div>
          </div>
        </section>

        {/* ============ COMPETITIVE ============ */}
        <section className="sec sec--alt">
          <div className="wrap">
            <div className="head">
              <span className="eyebrow">Where we sit</span>
              <h2>Legacy GRC wasn't built for this. Checklists never were.</h2>
              <p className="lead">AI governance has a different shape: the systems change themselves, the frameworks overlap, and the evidence expires.</p>
            </div>

            <div className="cmp-scroll">
              <table className="cmp">
                <thead>
                  <tr><th></th><th>Legacy GRC platforms</th><th>Modern compliance checklists</th><th className="own">ReguLattice</th></tr>
                </thead>
                <tbody>
                  <tr><th scope="row">Built for</th><td>Enterprise risk and IT controls, retrofitted for AI</td><td>Fast security certifications</td><td className="own">AI systems, from the first line of the data model</td></tr>
                  <tr><th scope="row">Finding AI systems</th><td>Manual registration by the team</td><td>Manual registration by the team</td><td className="own">Autonomous discovery, including shadow AI</td></tr>
                  <tr><th scope="row">Assessment method</th><td>Long questionnaires and consultants</td><td>Static checklists and templates</td><td className="own">Multi-agent orchestration with human confirmation</td></tr>
                  <tr><th scope="row">Evidence</th><td>Uploaded, point-in-time</td><td>Integration-based, mostly infrastructure</td><td className="own">Continuous, timestamped, freshness-scored with TTL</td></tr>
                  <tr><th scope="row">Framework handling</th><td>Separate projects per standard</td><td>One or two flagship standards</td><td className="own">One control library seen through many framework lenses</td></tr>
                  <tr><th scope="row">AI authority tracking</th><td>Not modelled</td><td>Not modelled</td><td className="own">Authority &amp; reversibility ledger per system</td></tr>
                  <tr><th scope="row">Deployment</th><td>Vendor cloud</td><td>Vendor cloud</td><td className="own">Cloud, hybrid, on-premise or air-gapped</td></tr>
                </tbody>
              </table>
            </div>
            <div className="cmp-more">
              <a href="#demo" className="btn btn--ghost" onClick={() => handleConversionClick("Differentiation", "compare_in_detail", "Differentiation Compare In Detail")}>Compare us in detail {arrow}</a>
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section className="sec" id="faq">
          <div className="wrap faq-grid">
            <div className="head">
              <span className="eyebrow">Questions</span>
              <h2>Before you book.</h2>
              <p className="lead">Can't find what you're looking for? Email <a href="mailto:info@regulattice.com" style={{ color: "var(--ink)", textDecoration: "underline", textUnderlineOffset: "3px" }}>info@regulattice.com</a>.</p>
            </div>
            <div className="faq">
              <details open><summary>How long until we see our first real inventory?</summary><p className="ans">Most teams connect their first sources and see a populated inventory in the same session. A full sweep across cloud, SaaS and code typically settles within the first week, and classification follows as owners confirm what the agents propose.</p></details>
              <details><summary>Does ReguLattice replace our auditor or consultant?</summary><p className="ans">No. It replaces the six weeks of evidence gathering that happens before they arrive. Auditors and advisory firms use the partner mode to work inside the same workspace, which is usually faster for everyone.</p></details>
              <details><summary>What actually runs on our infrastructure in on-premise mode?</summary><p className="ans">Both containers — the governance core and the agent runtime — plus private inference for the language models the agents use. Nothing about your models, evidence or findings egresses your network.</p></details>
              <details><summary>We already have ISO 27001 and SOC 2. Isn't this covered?</summary><p className="ans">Those cover how you protect information, not how you govern AI decisions. ISO/IEC 42001 and the EU AI Act ask different questions: intended purpose, risk tier, human oversight, transparency, and what happens when a model drifts. ReguLattice is built for that second set.</p></details>
              <details><summary>Can we start with one framework and add more later?</summary><p className="ans">Yes, and that's the usual path. Because everything maps to a single control library, adding the EU AI Act or ISO 23894 later shows you existing coverage immediately rather than starting you at zero.</p></details>
              <details><summary>How much of this is automated versus human?</summary><p className="ans">Agents do the finding, mapping, collecting and watching. People decide. Autonomy is configurable per agent, and any irreversible high-impact action requires a named approver before it executes.</p></details>
            </div>
          </div>
        </section>

        {/* ============ FINAL CTA ============ */}
        <section className="sec sec--dark" id="demo">
          <div className="wrap final">
            <div>
              <span className="eyebrow">Get started</span>
              <h2>See your own shadow AI in the <span className="grad">first twenty minutes.</span></h2>
              <p className="lead">Book a working session, not a slide deck. We'll connect a source, run the Discovery Agent live, and show you what's already running inside your organisation — then map one real system to ISO/IEC 42001 and the EU AI Act together.</p>
              <ul className="final-points">
                <li>{check}20 minutes, live product, no obligation</li>
                <li>{check}You leave with a gap summary for your estate</li>
                <li>{check}On-premise and air-gapped options walked through if you need them</li>
              </ul>
            </div>

            <form className="leadform" id="demoForm" ref={demoFormRef} onSubmit={onDemoSubmit} noValidate>
              <h3>Book a demo</h3>
              <p>We reply within one working day.</p>
              <div className="f2">
                <div className="field">
                  <label htmlFor="fn">Full name</label>
                  <input
                    id="fn"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={demoName}
                    onChange={(e) => setDemoName(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="fc">Company</label>
                  <input
                    id="fc"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    required
                    value={demoCompany}
                    onChange={(e) => setDemoCompany(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="fe">Work email</label>
                <input
                  id="fe"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={demoEmail}
                  onChange={(e) => setDemoEmail(e.target.value)}
                />
              </div>
              <div className="f2">
                <div className="field">
                  <label htmlFor="fr">Your role</label>
                  <select
                    id="fr"
                    name="role"
                    value={demoRole}
                    onChange={(e) => setDemoRole(e.target.value)}
                  >
                    <option value="AI Governance Lead">AI Governance Lead</option>
                    <option value="CISO / Security">CISO / Security</option>
                    <option value="Compliance / Risk">Compliance / Risk</option>
                    <option value="Data or ML leadership">Data or ML leadership</option>
                    <option value="Audit or advisory firm">Audit or advisory firm</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="fs">AI systems in use</label>
                  <select
                    id="fs"
                    name="systems"
                    value={demoSystems}
                    onChange={(e) => setDemoSystems(e.target.value)}
                  >
                    <option value="1–5">1–5</option>
                    <option value="6–25">6–25</option>
                    <option value="26–100">26–100</option>
                    <option value="100+">100+</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                </div>
              </div>
              <button className="btn btn--pri btn--wide" type="submit" disabled={demoSent}>
                {demoSent ? "Booked" : <>Book my demo {arrow}</>}
              </button>
              <p className="fine">By submitting you agree to be contacted about ReguLattice. We don't share your details, and you can opt out at any time.</p>
              <p className={`ok-msg ${demoSent ? "show" : ""}`} id="demoOk">Thanks — we've got it. Expect an email within one working day with two proposed times.</p>
            </form>
          </div>
        </section>
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="foot">
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <a className="brand" href="#top">{brandMark}ReguLattice</a>
              <p className="foot-about">An AI-native governance platform. We help organisations see, govern and prove their AI — continuously, with humans accountable for the decisions that matter.</p>
              <div className="foot-contact">
                <span>Karachi, Pakistan</span>
                <a href="mailto:info@regulattice.com">info@regulattice.com</a>
              </div>
              <div className="foot-social">
                <a href="https://www.linkedin.com/company/regulattice/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" /></svg>
                </a>
                <a href="https://www.instagram.com/regulattice/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".6" fill="currentColor" /></svg>
                </a>
              </div>
            </div>
            <div>
              <h4>Platform</h4>
              <ul>
                <li><a href="#agents">Autonomous agents</a></li>
                <li><a href="#authority">Authority Engine</a></li>
                <li><a href="#frameworks">Frameworks</a></li>
                <li><a href="#snapshot">Readiness snapshot</a></li>
              </ul>
            </div>
            <div>
              <h4>Use cases</h4>
              <ul>
                <li><a href="#problem">Shadow AI discovery</a></li>
                <li><a href="#frameworks">ISO/IEC 42001 readiness</a></li>
                <li><a href="#frameworks">EU AI Act preparation</a></li>
                <li><a href="#agents">Continuous evidence</a></li>
                <li><a href="#demo">Audit &amp; advisory partners</a></li>
              </ul>
            </div>
            <div>
              <h4>Company</h4>
              <ul>
                <li><a href="#demo">Book a demo</a></li>
                <li><a href="#demo">Contact</a></li>
                <li><a href="#">Privacy policy</a></li>
                <li><a href="#">Terms of service</a></li>
                <li><a href="#">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="foot-bottom">
            <span className="mono">© 2026 ReguLattice</span>
            <span className="status"><i></i>Humans remain accountable for high-impact decisions.</span>
            <nav><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Security</a></nav>
          </div>
        </div>
      </footer>

      <div className="stickybar">
        <a className="btn btn--ghost" href="#snapshot" onClick={() => handleConversionClick("StickyBar", "free_scan", "StickyBar Score Readiness")}>Score readiness</a>
        <a className="btn btn--pri" href="#demo" onClick={() => handleConversionClick("StickyBar", "book_a_demo", "StickyBar Book Demo")}>Book a demo</a>
      </div>
    </div>
  );
}
