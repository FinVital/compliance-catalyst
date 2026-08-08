import { useState, useEffect, useRef } from "react";

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

  const totalQuestions = 6;
  const bands = [
    {min:0,  label:'Foundational',  copy:'You have AI in the organisation and very little visibility over it. The fastest win is a complete inventory — almost every other gap resolves once you can see what you are running.'},
    {min:35, label:'Developing',    copy:'The basics exist but they are manual and go stale between reviews. Continuous evidence collection and automated discovery are where the effort pays back first.'},
    {min:65, label:'Managed',       copy:'You are governing deliberately. The remaining gaps are usually monitoring between reviews and a defensible record of who authorised what.'},
    {min:85, label:'Audit-ready',   copy:'Strong position. Focus now shifts to proving it on demand across multiple frameworks, and to authority and reversibility for your highest-impact systems.'}
  ];

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
    } else if (quizFormRef.current) {
      quizFormRef.current.reportValidity();
    }
  };

  const onDemoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (demoFormRef.current && demoFormRef.current.checkValidity()) {
      setDemoSent(true);
    } else if (demoFormRef.current) {
      demoFormRef.current.reportValidity();
    }
  };

  return (
    <div className="bg-[#F6F7F5] text-[#0B1F2A]">
      <style dangerouslySetInnerHTML={{ __html: `
        /* ============================================================
           ReguLattice — design tokens
           Palette: petrol navy ink, pale archival paper, brand teal,
           logo mint. Signal amber/rust reserved for the authority matrix.
           ============================================================ */
        :root {
          --navy: #0B1F2A;
          --navy-2: #123240;
          --paper: #F6F7F5;
          --white: #FFFFFF;
          --mint: #E4EFEA;
          --mint-2: #F1F7F4;
          --teal: #0E7C6B;
          --teal-deep: #07463D;
          --slate: #566A72;
          --slate-2: #82918F;
          --line: #DFE5E2;
          --line-2: #C7D2CD;
          --amber: #8A6412; --amber-bg: #F8F1DE; --amber-line: #E6D5A8;
          --rust: #8E332B;  --rust-bg: #F9EBE8;  --rust-line: #EBCCC5;
          --r: 6px;
          --shadow-1: 0 1px 2px rgba(11,31,42,.05);
          --shadow-2: 0 1px 2px rgba(11,31,42,.05), 0 18px 40px -26px rgba(11,31,42,.45);
          --ease: cubic-bezier(.22,.61,.36,1);
        }

        /* ---------- type system ---------- */
        .mono {
          font-family: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 11px;
          letter-spacing: .14em;
          text-transform: uppercase;
          font-weight: 500;
        }
        .em {
          font-family: "Newsreader", Georgia, serif;
          font-style: italic;
          font-weight: 400;
          letter-spacing: -.01em;
        }

        .small {
          font-size: 14.5px;
          line-height: 1.55;
          color: var(--slate);
        }

        /* ---------- layout ---------- */
        .wrap {
          width: min(1180px, 92vw);
          margin-inline: auto;
        }
        .sec {
          padding: clamp(74px, 8.5vw, 124px) 0;
          position: relative;
        }
        .sec--white {
          background: var(--white);
          border-block: 1px solid var(--line);
        }
        .sec--mint {
          background: var(--mint-2);
          border-block: 1px solid #DCE8E2;
        }
        .sec--dark {
          background: var(--navy);
          color: #EAF1EE;
        }
        .sec--tight {
          padding-block: clamp(56px, 6vw, 86px);
        }

        /* section heading block */
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
        .head {
          max-width: 760px;
          margin-bottom: clamp(38px, 4vw, 58px);
        }
        .head p {
          margin-top: 18px;
        }
        .head--center {
          margin-inline: auto;
          text-align: center;
        }
        .head--center .eyebrow {
          justify-content: center;
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
          border: 1px solid transparent;
          transition: .22s var(--ease);
          white-space: nowrap;
        }
        .btn--pri {
          background: var(--teal);
          color: #fff;
          box-shadow: 0 1px 0 rgba(255,255,255,.2) inset;
        }
        .btn--pri:hover {
          background: var(--teal-deep);
          transform: translateY(-1px);
        }
        .btn--ghost {
          background: transparent;
          border-color: var(--line-2);
          color: var(--navy);
        }
        .btn--ghost:hover {
          border-color: var(--navy);
          background: rgba(11,31,42,.03);
        }
        .btn--dark {
          background: var(--navy);
          color: #fff;
        }
        .btn--dark:hover {
          background: #04141d;
          transform: translateY(-1px);
        }
        .btn--onDark {
          background: #fff;
          color: var(--navy);
        }
        .btn--onDark:hover {
          background: var(--mint);
        }
        .btn--ghostDark {
          background: transparent;
          border-color: rgba(255,255,255,.28);
          color: #fff;
        }
        .btn--ghostDark:hover {
          border-color: #fff;
          background: rgba(255,255,255,.07);
        }
        .btn--wide {
          width: 100%;
        }
        .btn-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .arrow {
          transition: transform .22s var(--ease);
        }
        .btn:hover .arrow {
          transform: translateX(3px);
        }

        /* ---------- nav ---------- */
        .nav {
          position: sticky;
          top: 0;
          z-index: 60;
          background: rgba(246,247,245,.82);
          backdrop-filter: saturate(160%) blur(14px);
          border-bottom: 1px solid transparent;
          transition: .3s var(--ease);
        }
        .nav.is-stuck {
          border-bottom-color: var(--line);
          background: rgba(246,247,245,.94);
        }
        .nav-in {
          display: flex;
          align-items: center;
          gap: 26px;
          height: 70px;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 11px;
          font-weight: 700;
          letter-spacing: -.03em;
          font-size: 19px;
        }
        .brand-mark {
          width: 30px;
          height: 30px;
          flex: none;
          border-radius: 7px;
          background: var(--navy);
          display: grid;
          place-items: center;
        }
        .nav-links {
          display: flex;
          gap: 26px;
          margin-left: auto;
          align-items: center;
        }
        .nav-links a {
          font-size: 14.5px;
          font-weight: 500;
          color: var(--slate);
          transition: color .2s;
        }
        .nav-links a:hover {
          color: var(--navy);
        }
        .nav-cta {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .nav-cta .btn {
          padding: 10px 18px;
          font-size: 14.5px;
        }
        .burger {
          display: none;
          margin-left: auto;
          background: none;
          border: 1px solid var(--line-2);
          border-radius: var(--r);
          width: 40px;
          height: 38px;
          align-items: center;
          justify-content: center;
        }
        .burger span {
          display: block;
          width: 16px;
          height: 1.5px;
          background: var(--navy);
          position: relative;
        }
        .burger span::before, .burger span::after {
          content: "";
          position: absolute;
          left: 0;
          width: 16px;
          height: 1.5px;
          background: var(--navy);
        }
        .burger span::before {
          top: -5px;
        }
        .burger span::after {
          top: 5px;
        }
        .mobile-menu {
          display: none;
          border-top: 1px solid var(--line);
          background: var(--white);
          padding: 14px 0 20px;
        }
        .mobile-menu.open {
          display: block;
        }
        .mobile-menu a {
          display: block;
          padding: 11px 0;
          font-weight: 500;
          border-bottom: 1px solid var(--line);
        }
        .mobile-menu .btn {
          margin-top: 16px;
        }

        /* ---------- hero ---------- */
        .hero {
          padding: clamp(48px, 6vw, 84px) 0 clamp(64px, 7vw, 104px);
          position: relative;
          overflow: hidden;
        }
        .hero::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px);
          background-size: 64px 64px;
          -webkit-mask-image: radial-gradient(120% 80% at 72% 22%, #000 0%, transparent 68%);
          mask-image: radial-gradient(120% 80% at 72% 22%, #000 0%, transparent 68%);
          opacity: .55;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1.02fr .98fr;
          gap: clamp(34px, 4.5vw, 64px);
          align-items: center;
          position: relative;
        }
        .pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 13px 6px 10px;
          border: 1px solid var(--line-2);
          border-radius: 999px;
          background: var(--white);
          color: var(--teal);
          margin-bottom: 26px;
        }
        .pill i {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--teal);
          display: block;
          box-shadow: 0 0 0 3px rgba(14, 124, 107, .16);
        }
        .hero h1 {
          margin-bottom: 22px;
        }
        .hero .lead {
          max-width: 560px;
        }
        .hero-note {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          margin-top: 24px;
          padding-top: 22px;
          border-top: 1px solid var(--line);
          max-width: 560px;
        }
        .hero-note .mono {
          color: var(--teal);
          flex: none;
          padding-top: 2px;
        }
        .hero-note p {
          font-size: 14.5px;
          color: var(--slate);
          line-height: 1.55;
        }
        .hero .btn-row {
          margin-top: 30px;
        }
        .microtrust {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 20px;
          margin-top: 22px;
        }
        .microtrust span {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 13.5px;
          color: var(--slate-2);
        }
        .microtrust svg {
          flex: none;
        }

        /* ---------- hero panel : the discovery lattice ---------- */
        .panel {
          background: var(--white);
          border: 1px solid var(--line);
          border-radius: 10px;
          box-shadow: var(--shadow-2);
          overflow: hidden;
          position: relative;
        }
        .panel-head {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 13px 16px;
          border-bottom: 1px solid var(--line);
          background: linear-gradient(var(--white), #FBFCFB);
        }
        .live {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--teal);
          flex: none;
          animation: pulse 2.4s infinite;
        }
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(14, 124, 107, .45);
          }
          50% {
            box-shadow: 0 0 0 5px rgba(14, 124, 107, 0);
          }
        }
        .panel-head .mono {
          color: var(--navy);
        }
        .panel-head .stat {
          margin-left: auto;
          color: var(--teal);
          white-space: nowrap;
        }
        .panel-head .mono:first-of-type {
          white-space: nowrap;
        }
        .scanline {
          position: absolute;
          left: 0;
          right: 0;
          top: 47px;
          height: 70px;
          pointer-events: none;
          background: linear-gradient(180deg, rgba(14, 124, 107, 0), rgba(14, 124, 107, .09), rgba(14, 124, 107, 0));
          animation: sweep 3.4s var(--ease) 1 forwards;
        }
        @keyframes sweep {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          92% {
            opacity: 1;
          }
          100% {
            transform: translateY(320px);
            opacity: 0;
          }
        }
        .inv {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .inv li {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 4px 12px;
          padding: 13px 16px;
          border-bottom: 1px solid var(--line);
          opacity: 0;
          transform: translateY(6px);
          animation: rowIn .5s var(--ease) forwards;
        }
        .inv li:nth-child(1) { animation-delay: .35s; }
        .inv li:nth-child(2) { animation-delay: .85s; }
        .inv li:nth-child(3) { animation-delay: 1.35s; }
        .inv li:nth-child(4) { animation-delay: 1.85s; }
        .inv li:nth-child(5) { animation-delay: 2.35s; }
        @keyframes rowIn {
          to {
            opacity: 1;
            transform: none;
          }
        }
        .inv-name {
          grid-column: 1;
          grid-row: 1;
          font-weight: 600;
          font-size: 14.5px;
          letter-spacing: -.015em;
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .inv-meta {
          grid-column: 1;
          grid-row: 2;
          font-family: "IBM Plex Mono", monospace;
          font-size: 11px;
          color: var(--slate-2);
          letter-spacing: .02em;
          text-transform: none;
        }
        .tag {
          font-family: "IBM Plex Mono", monospace;
          font-size: 9.5px;
          letter-spacing: .1em;
          text-transform: uppercase;
          padding: 3px 7px;
          border-radius: 3px;
          font-weight: 500;
        }
        .tag--new {
          background: var(--amber-bg);
          color: var(--amber);
          border: 1px solid var(--amber-line);
        }
        .tag--drift {
          background: var(--rust-bg);
          color: var(--rust);
          border: 1px solid var(--rust-line);
        }
        .tag--ok {
          background: var(--mint);
          color: var(--teal-deep);
          border: 1px solid #C6DCD3;
        }
        .tier {
          grid-column: 2;
          grid-row: 1/3;
          align-self: center;
          justify-self: end;
          font-family: "IBM Plex Mono", monospace;
          font-size: 10px;
          letter-spacing: .1em;
          text-transform: uppercase;
          padding: 5px 9px;
          border-radius: 3px;
          border: 1px solid var(--line-2);
          color: var(--slate);
        }
        .tier--high {
          background: #FDF6F5;
          border-color: var(--rust-line);
          color: var(--rust);
        }
        .tier--ltd {
          background: var(--amber-bg);
          border-color: var(--amber-line);
          color: var(--amber);
        }
        .panel-foot {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 16px;
          background: #FBFCFB;
        }
        .ring {
          --p: 92;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          flex: none;
          display: grid;
          place-items: center;
          background: conic-gradient(var(--teal) calc(var(--p)*1%), var(--line) 0);
        }
        .ring::after {
          content: "92%";
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: var(--white);
          display: grid;
          place-items: center;
          font-family: "IBM Plex Mono", monospace;
          font-size: 10.5px;
          font-weight: 500;
          color: var(--navy);
        }
        .foot-txt strong {
          display: block;
          font-size: 13.5px;
          letter-spacing: -.01em;
        }
        .foot-txt span {
          font-size: 12.5px;
          color: var(--slate-2);
        }
        .agent-dots {
          margin-left: auto;
          display: flex;
          gap: 4px;
        }
        .agent-dots i {
          width: 5px;
          height: 16px;
          border-radius: 2px;
          background: var(--teal);
          opacity: .28;
          display: block;
        }
        .agent-dots i:nth-child(-n+7) {
          animation: bar 2.6s ease-in-out infinite;
        }
        .agent-dots i:nth-child(2) { animation-delay: .2s; }
        .agent-dots i:nth-child(3) { animation-delay: .4s; }
        .agent-dots i:nth-child(4) { animation-delay: .6s; }
        .agent-dots i:nth-child(5) { animation-delay: .8s; }
        .agent-dots i:nth-child(6) { animation-delay: 1s; }
        .agent-dots i:nth-child(7) { animation-delay: 1.2s; }
        @keyframes bar {
          0%, 100% {
            opacity: .25;
            height: 10px;
          }
          50% {
            opacity: 1;
            height: 18px;
          }
        }

        /* ---------- framework strip ---------- */
        .strip {
          border-block: 1px solid var(--line);
          background: var(--white);
          padding: 22px 0;
        }
        .strip-in {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 13px;
        }
        .strip-label {
          color: var(--slate-2);
        }
        .strip-items {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 11px clamp(16px, 2.4vw, 32px);
        }
        .strip-item {
          font-weight: 600;
          font-size: 14.5px;
          letter-spacing: -.015em;
          color: var(--navy);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .strip-item::before {
          content: "";
          width: 5px;
          height: 5px;
          background: var(--teal);
          border-radius: 1px;
          flex: none;
          transform: rotate(45deg);
        }

        /* ---------- insight band ---------- */
        .insight {
          text-align: center;
          padding: clamp(58px, 7vw, 92px) 0;
        }
        .insight q {
          quotes: none;
          display: block;
          font-size: clamp(24px, 3.4vw, 42px);
          font-weight: 700;
          letter-spacing: -.035em;
          line-height: 1.15;
          max-width: 900px;
          margin-inline: auto;
        }
        .insight q .em {
          color: #7FD9C4;
        }
        .insight .mono {
          color: #7FD9C4;
          display: block;
          margin-top: 22px;
        }
        .insight p {
          max-width: 640px;
          margin: 20px auto 0;
          color: #A9BDB8;
          font-size: 16px;
        }

        /* problem list */
        .prob {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--line);
          border: 1px solid var(--line);
          border-radius: var(--r);
          overflow: hidden;
        }
        .prob-item {
          background: var(--paper);
          padding: 26px 24px;
        }
        .prob-item .mono {
          color: var(--slate-2);
          display: block;
          margin-bottom: 12px;
        }
        .prob-item h3 {
          font-size: 17.5px;
          margin-bottom: 8px;
          letter-spacing: -.02em;
        }
        .prob-item p {
          font-size: 14.6px;
          line-height: 1.56;
          color: var(--slate);
        }
        .prob-result {
          margin-top: 26px;
          display: flex;
          gap: 14px;
          align-items: flex-start;
          padding: 22px 24px;
          background: var(--navy);
          color: #EAF1EE;
          border-radius: var(--r);
        }
        .prob-result .mono {
          color: #7FD9C4;
          flex: none;
          padding-top: 3px;
        }
        .prob-result p {
          font-size: 16.5px;
          letter-spacing: -.015em;
          line-height: 1.5;
        }

        /* flywheel */
        .fly {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border: 1px solid var(--line);
          border-radius: var(--r);
          overflow: hidden;
          background: var(--white);
        }
        .fly-step {
          padding: 32px 28px;
          border-right: 1px solid var(--line);
          position: relative;
        }
        .fly-step:last-child {
          border-right: 0;
        }
        .fly-num {
          font-family: "IBM Plex Mono", monospace;
          font-size: 11px;
          letter-spacing: .14em;
          color: var(--teal);
          display: block;
          margin-bottom: 16px;
        }
        .fly-step h3 {
          font-size: 26px;
          letter-spacing: -.03em;
          margin-bottom: 10px;
        }
        .fly-step p {
          font-size: 15px;
          color: var(--slate);
          line-height: 1.6;
        }
        .fly-step::after {
          content: "";
          position: absolute;
          right: -7px;
          top: 50%;
          width: 13px;
          height: 13px;
          background: var(--white);
          border-right: 1px solid var(--line);
          border-top: 1px solid var(--line);
          transform: translateY(-50%) rotate(45deg);
          z-index: 2;
        }
        .fly-step:last-child::after {
          display: none;
        }
        .fly-bridge {
          margin-top: 22px;
          text-align: center;
          color: var(--slate);
          font-size: 15.5px;
        }

        /* agents */
        .agents {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        .agent {
          background: var(--white);
          border: 1px solid var(--line);
          border-radius: var(--r);
          padding: 22px;
          display: flex;
          flex-direction: column;
          transition: .25s var(--ease);
        }
        .agent:hover {
          border-color: var(--teal);
          box-shadow: var(--shadow-2);
          transform: translateY(-3px);
        }
        .agent-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .agent-id {
          font-family: "IBM Plex Mono", monospace;
          font-size: 11px;
          letter-spacing: .12em;
          color: var(--slate-2);
        }
        .agent-ico {
          width: 32px;
          height: 32px;
          border-radius: var(--r);
          background: var(--mint);
          display: grid;
          place-items: center;
          color: var(--teal-deep);
        }
        .agent h3 {
          font-size: 16.5px;
          letter-spacing: -.02em;
          margin-bottom: 8px;
        }
        .agent p {
          font-size: 14.2px;
          line-height: 1.55;
          color: var(--slate);
          flex: 1;
        }
        .agent-tag {
          margin-top: 16px;
          padding-top: 13px;
          border-top: 1px solid var(--line);
          color: var(--slate-2);
        }
        .agents-close {
          margin-top: 24px;
          text-align: center;
          font-size: 15.5px;
          color: var(--slate);
        }

        /* authority matrix */
        .matrix-wrap {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 14px;
          align-items: stretch;
        }
        .axis-y {
          display: grid;
          grid-template-rows: 1fr 1fr;
          gap: 14px;
          padding-top: 40px;
          border-right: 1px solid var(--line-2);
        }
        .axis-y span {
          display: grid;
          place-items: center;
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-family: "IBM Plex Mono", monospace;
          font-size: 10.5px;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: var(--slate);
          padding-inline: 9px;
        }
        .matrix {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .axis-x {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 0;
        }
        .axis-x span {
          font-family: "IBM Plex Mono", monospace;
          font-size: 10.5px;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: var(--slate);
          padding-bottom: 10px;
          border-bottom: 1px solid var(--line-2);
          text-align: center;
        }
        .cell {
          border: 1px solid var(--line);
          border-radius: var(--r);
          padding: 24px;
          background: var(--white);
          min-height: 172px;
          display: flex;
          flex-direction: column;
        }
        .cell h4 {
          font-family: "IBM Plex Mono", monospace;
          font-size: 12px;
          letter-spacing: .16em;
          text-transform: uppercase;
          font-weight: 500;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 9px;
        }
        .cell strong {
          font-size: 17px;
          font-weight: 700;
          letter-spacing: -.022em;
          display: block;
          margin-bottom: 9px;
        }
        .cell p {
          font-size: 14.3px;
          line-height: 1.55;
          color: var(--slate);
        }
        .cell--monitor {
          background: var(--white);
        }
        .cell--monitor h4 {
          color: var(--slate);
        }
        .cell--signoff {
          background: var(--amber-bg);
          border-color: var(--amber-line);
        }
        .cell--signoff h4 {
          color: var(--amber);
        }
        .cell--guard {
          background: var(--mint-2);
          border-color: #C6DCD3;
        }
        .cell--guard h4 {
          color: var(--teal-deep);
        }
        .cell--blocked {
          background: var(--rust-bg);
          border-color: var(--rust-line);
        }
        .cell--blocked h4 {
          color: var(--rust);
        }
        .matrix-note {
          margin-top: 26px;
          padding: 22px 24px;
          border-left: 2px solid var(--teal);
          background: var(--white);
          border-radius: 0 var(--r) var(--r) 0;
          border-block: 1px solid var(--line);
          border-right: 1px solid var(--line);
        }
        .matrix-note p {
          font-size: 17px;
          letter-spacing: -.02em;
          line-height: 1.5;
        }
        .matrix-note .em {
          color: var(--teal-deep);
        }

        /* ---------- lifecycle ---------- */
        .life {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0;
          border-top: 1px solid var(--line-2);
        }
        .life-step {
          padding: 26px 20px 0;
          border-right: 1px solid var(--line);
          position: relative;
        }
        .life-step:last-child {
          border-right: 0;
        }
        .life-step::before {
          content: "";
          position: absolute;
          top: -5px;
          left: 0;
          width: 9px;
          height: 9px;
          background: var(--paper);
          border: 1px solid var(--teal);
          border-radius: 50%;
        }
        .life-step.is-first::before {
          background: var(--teal);
        }
        .life-step .mono {
          color: var(--teal);
          display: block;
          margin-bottom: 10px;
        }
        .life-step h3 {
          font-size: 18px;
          margin-bottom: 8px;
        }
        .life-step p {
          font-size: 14.3px;
          color: var(--slate);
          line-height: 1.55;
        }

        /* ---------- frameworks ---------- */
        .fw-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: var(--line);
          border: 1px solid var(--line);
          border-radius: var(--r);
          overflow: hidden;
        }
        .fw {
          background: var(--white);
          padding: 22px 24px;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 4px 16px;
          align-items: baseline;
        }
        .fw-rank {
          font-family: "IBM Plex Mono", monospace;
          font-size: 11px;
          color: var(--slate-2);
          letter-spacing: .1em;
        }
        .fw h3 {
          font-size: 16.5px;
          letter-spacing: -.02em;
        }
        .fw p {
          grid-column: 2;
          font-size: 14.2px;
          color: var(--slate);
          line-height: 1.55;
        }
        .map {
          margin-top: 34px;
          background: var(--white);
          border: 1px solid var(--line);
          border-radius: var(--r);
          padding: clamp(24px, 3vw, 38px);
          text-align: center;
        }
        .map-node {
          display: inline-block;
          max-width: 520px;
          padding: 16px 22px;
          border: 1px solid var(--teal);
          background: var(--mint-2);
          border-radius: var(--r);
          text-align: left;
        }
        .map-node .mono {
          color: var(--teal);
          display: block;
          margin-bottom: 6px;
        }
        .map-node strong {
          font-size: 16px;
          letter-spacing: -.02em;
          line-height: 1.4;
          display: block;
        }
        .map-stem {
          width: 1px;
          height: 26px;
          background: var(--line-2);
          margin: 0 auto;
        }
        .map-bus {
          height: 1px;
          background: var(--line-2);
          margin: 0 auto;
          width: 88%;
        }
        .map-chips {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          padding-top: 26px;
          position: relative;
        }
        .map-chips::before {
          content: "";
          position: absolute;
          top: 0;
          left: 50%;
          width: 1px;
          height: 26px;
          background: transparent;
        }
        .chip {
          border: 1px solid var(--line-2);
          border-radius: 999px;
          padding: 8px 15px;
          font-size: 13.5px;
          font-weight: 500;
          background: var(--white);
          position: relative;
        }
        .chip::before {
          content: "";
          position: absolute;
          top: -26px;
          left: 50%;
          width: 1px;
          height: 26px;
          background: var(--line-2);
        }
        .map cite {
          display: block;
          margin-top: 24px;
          font-style: normal;
          font-size: 14.5px;
          color: var(--slate);
        }

        /* ---------- capabilities ---------- */
        .usp {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--line);
          border: 1px solid var(--line);
          border-radius: var(--r);
          overflow: hidden;
        }
        .usp-item {
          background: var(--white);
          padding: 24px;
        }
        .usp-item h3 {
          font-size: 16px;
          margin-bottom: 8px;
          display: flex;
          gap: 9px;
          align-items: flex-start;
        }
        .usp-item h3 svg {
          flex: none;
          margin-top: 3px;
          color: var(--teal);
        }
        .usp-item p {
          font-size: 14.1px;
          line-height: 1.55;
          color: var(--slate);
        }

        /* ---------- outcomes ---------- */
        .out {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .out-item {
          border-left: 2px solid var(--teal);
          padding: 4px 0 4px 18px;
        }
        .out-item strong {
          display: block;
          font-size: 16.5px;
          letter-spacing: -.022em;
          margin-bottom: 6px;
        }
        .out-item p {
          font-size: 14.4px;
          color: var(--slate);
          line-height: 1.55;
        }

        /* ---------- trust & deployment ---------- */
        .trust {
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          gap: clamp(30px, 4vw, 60px);
          align-items: center;
        }
        .trust-list {
          list-style: none;
          margin: 22px 0 0;
          padding: 0;
          display: grid;
          gap: 14px;
        }
        .trust-list li {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          font-size: 15px;
          line-height: 1.55;
        }
        .trust-list svg {
          flex: none;
          margin-top: 4px;
          color: var(--teal);
        }
        .deploy {
          background: var(--white);
          border: 1px solid var(--line);
          border-radius: var(--r);
          overflow: hidden;
        }
        .deploy-row {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 16px;
          padding: 20px 22px;
          border-bottom: 1px solid var(--line);
          align-items: start;
        }
        .deploy-row:last-child {
          border-bottom: 0;
        }
        .deploy-row .mono {
          color: var(--teal);
          padding-top: 3px;
        }
        .deploy-row strong {
          display: block;
          font-size: 15.5px;
          letter-spacing: -.02em;
          margin-bottom: 5px;
        }
        .deploy-row p {
          font-size: 14.2px;
          color: var(--slate);
          line-height: 1.55;
        }

        /* ---------- snapshot form ---------- */
        .snap {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: clamp(24px, 3vw, 40px);
          align-items: start;
        }
        .snap-form {
          background: var(--white);
          border: 1px solid var(--line);
          border-radius: var(--r);
          overflow: hidden;
        }
        .q {
          padding: 20px 24px;
          border-bottom: 1px solid var(--line);
        }
        .q:last-of-type {
          border-bottom: 0;
        }
        .q-label {
          display: flex;
          gap: 12px;
          align-items: baseline;
          margin-bottom: 12px;
        }
        .q-label .mono {
          color: var(--slate-2);
          flex: none;
        }
        .q-label p {
          font-size: 15.2px;
          font-weight: 600;
          letter-spacing: -.018em;
          line-height: 1.4;
        }
        .opts {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          padding-left: 31px;
        }
        .opt {
          border: 1px solid var(--line-2);
          background: var(--white);
          border-radius: 999px;
          padding: 7px 14px;
          font-size: 13.5px;
          color: var(--slate);
          transition: .18s var(--ease);
        }
        .opt:hover {
          border-color: var(--teal);
          color: var(--teal-deep);
        }
        .opt.sel {
          background: var(--teal);
          border-color: var(--teal);
          color: #fff;
          font-weight: 600;
        }
        .score {
          position: sticky;
          top: 90px;
          background: var(--navy);
          color: #EAF1EE;
          border-radius: var(--r);
          padding: 26px;
          overflow: hidden;
        }
        .score .mono {
          color: #7FD9C4;
        }
        .meter {
          margin: 20px 0 6px;
          height: 6px;
          border-radius: 3px;
          background: rgba(255, 255, 255, .14);
          overflow: hidden;
        }
        .meter i {
          display: block;
          height: 100%;
          width: 0;
          background: linear-gradient(90deg, #7FD9C4, #38A991);
          transition: width .5s var(--ease);
        }
        .score-num {
          font-size: 56px;
          font-weight: 800;
          letter-spacing: -.05em;
          line-height: 1;
          margin-top: 14px;
        }
        .score-num span {
          font-size: 22px;
          font-weight: 600;
          color: #7FD9C4;
          letter-spacing: -.02em;
        }
        .score-band {
          font-size: 15.5px;
          font-weight: 600;
          letter-spacing: -.02em;
          margin-top: 8px;
        }
        .score-copy {
          font-size: 14px;
          color: #A9BDB8;
          line-height: 1.55;
          margin-top: 10px;
          min-height: 66px;
        }
        .score-form {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, .14);
          display: grid;
          gap: 10px;
        }
        .score-form input {
          width: 100%;
          padding: 12px 14px;
          border-radius: var(--r);
          border: 1px solid rgba(255, 255, 255, .2);
          background: rgba(255, 255, 255, .06);
          color: #fff;
          font: inherit;
          font-size: 14.5px;
        }
        .score-form input::placeholder {
          color: #8AA09B;
        }
        .score-form input:focus {
          outline: 2px solid #7FD9C4;
          outline-offset: 1px;
        }
        .score-hint {
          font-size: 12px;
          color: #8AA09B;
          line-height: 1.5;
        }
        .ok-msg {
          display: none;
          font-size: 14.5px;
          line-height: 1.55;
          color: #7FD9C4;
          padding-top: 8px;
        }
        .ok-msg.show {
          display: block;
        }

        /* ---------- pricing ---------- */
        .plans {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          align-items: start;
        }
        .plan {
          background: var(--white);
          border: 1px solid var(--line);
          border-radius: 8px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          transition: .25s var(--ease);
        }
        .plan:hover {
          box-shadow: var(--shadow-2);
          transform: translateY(-2px);
        }
        .plan--best {
          border-color: var(--teal);
          box-shadow: 0 0 0 1px var(--teal), var(--shadow-2);
          position: relative;
        }
        .plan-flag {
          position: absolute;
          top: -11px;
          left: 28px;
          background: var(--teal);
          color: #fff;
          border-radius: 999px;
          padding: 4px 12px;
          font-family: "IBM Plex Mono", monospace;
          font-size: 10px;
          letter-spacing: .14em;
          text-transform: uppercase;
          font-weight: 500;
        }
        .plan h3 {
          font-size: 20px;
          margin-bottom: 6px;
        }
        .plan-for {
          font-size: 13.8px;
          color: var(--slate);
          line-height: 1.5;
          min-height: 42px;
        }
        .price {
          display: flex;
          align-items: baseline;
          gap: 6px;
          margin: 18px 0 4px;
          padding-top: 18px;
          border-top: 1px solid var(--line);
        }
        .price b {
          font-size: 42px;
          font-weight: 800;
          letter-spacing: -.045em;
          line-height: 1;
        }
        .price span {
          font-size: 14px;
          color: var(--slate);
        }
        .price-note {
          font-size: 12.5px;
          color: var(--slate-2);
          margin-bottom: 20px;
        }
        .plan .btn {
          margin-bottom: 22px;
        }
        .feat-title {
          color: var(--slate-2);
          margin-bottom: 12px;
          display: block;
        }
        .feats {
          list-style: none;
          margin: 0 0 0;
          padding: 0;
          display: grid;
          gap: 9px;
          flex: 1;
        }
        .feats li {
          display: flex;
          gap: 9px;
          font-size: 14px;
          line-height: 1.5;
          color: var(--navy);
        }
        .feats svg {
          flex: none;
          margin-top: 4px;
          color: var(--teal);
        }
        .limits {
          list-style: none;
          margin: 18px 0 0;
          padding: 16px 0 0;
          border-top: 1px solid var(--line);
          display: grid;
          gap: 8px;
        }
        .limits li {
          display: flex;
          gap: 9px;
          font-size: 13.4px;
          line-height: 1.5;
          color: var(--slate-2);
        }
        .limits svg {
          flex: none;
          margin-top: 4px;
          color: var(--slate-2);
        }
        .plans-note {
          margin-top: 22px;
          text-align: center;
          font-size: 14.6px;
          color: var(--slate);
          max-width: 760px;
          margin-inline: auto;
        }
        .shared {
          margin-top: 20px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px 10px;
        }
        .shared span {
          border: 1px solid var(--line-2);
          background: var(--white);
          border-radius: 999px;
          padding: 6px 13px;
          font-size: 13px;
          color: var(--slate);
        }

        /* ---------- competitive ---------- */
        .cmp-scroll {
          overflow-x: auto;
          border: 1px solid var(--line);
          border-radius: var(--r);
          background: var(--white);
        }
        table.cmp {
          width: 100%;
          border-collapse: collapse;
          min-width: 720px;
        }
        table.cmp th, table.cmp td {
          text-align: left;
          padding: 16px 20px;
          border-bottom: 1px solid var(--line);
          vertical-align: top;
          font-size: 14.4px;
          line-height: 1.5;
        }
        table.cmp thead th {
          font-family: "IBM Plex Mono", monospace;
          font-size: 10.5px;
          letter-spacing: .14em;
          text-transform: uppercase;
          font-weight: 500;
          color: var(--slate);
          background: #FBFCFB;
        }
        table.cmp tbody th {
          font-weight: 600;
          color: var(--navy);
          width: 190px;
          letter-spacing: -.015em;
        }
        table.cmp td {
          color: var(--slate);
        }
        table.cmp .own {
          background: var(--mint-2);
          color: var(--navy);
          font-weight: 500;
          border-left: 1px solid #C6DCD3;
          border-right: 1px solid #C6DCD3;
        }
        table.cmp thead .own {
          background: var(--mint);
          color: var(--teal-deep);
          border-top: 1px solid #C6DCD3;
        }
        table.cmp tr:last-child td, table.cmp tr:last-child th {
          border-bottom: 0;
        }
        table.cmp tbody tr:last-child .own {
          border-bottom: 1px solid #C6DCD3;
        }

        /* ---------- faq ---------- */
        .faq {
          border: 1px solid var(--line);
          border-radius: var(--r);
          background: var(--white);
          overflow: hidden;
        }
        .faq details {
          border-bottom: 1px solid var(--line);
        }
        .faq details:last-child {
          border-bottom: 0;
        }
        .faq summary {
          list-style: none;
          cursor: pointer;
          padding: 19px 24px;
          font-weight: 600;
          font-size: 15.6px;
          letter-spacing: -.02em;
          display: flex;
          align-items: center;
          gap: 14px;
          transition: background .2s;
        }
        .faq summary::-webkit-details-marker {
          display: none;
        }
        .faq summary:hover {
          background: #FBFCFB;
        }
        .faq summary::after {
          content: "+";
          margin-left: auto;
          font-family: "IBM Plex Mono", monospace;
          font-size: 18px;
          color: var(--teal);
          font-weight: 400;
        }
        .faq details[open] summary::after {
          content: "–";
        }
        .faq .ans {
          padding: 0 24px 20px 24px;
          font-size: 14.6px;
          line-height: 1.6;
          color: var(--slate);
          max-width: 820px;
        }

        /* ---------- final CTA ---------- */
        .final {
          display: grid;
          grid-template-columns: 1fr 440px;
          gap: clamp(30px, 4vw, 64px);
          align-items: center;
        }
        .final h2 {
          color: #fff;
        }
        .final .lead {
          color: #A9BDB8;
          margin-top: 18px;
          max-width: 520px;
        }
        .final-points {
          list-style: none;
          margin: 26px 0 0;
          padding: 0;
          display: grid;
          gap: 11px;
        }
        .final-points li {
          display: flex;
          gap: 11px;
          font-size: 14.8px;
          color: #CBDAD6;
        }
        .final-points svg {
          flex: none;
          margin-top: 4px;
          color: #7FD9C4;
        }
        .leadform {
          background: var(--white);
          border-radius: 8px;
          padding: 26px;
          color: var(--navy);
          text-align: left;
        }
        .leadform h3 {
          font-size: 19px;
          margin-bottom: 6px;
        }
        .leadform > p {
          font-size: 14px;
          color: var(--slate);
          margin-bottom: 18px;
        }
        .field {
          display: grid;
          gap: 6px;
          margin-bottom: 12px;
        }
        .field label {
          font-family: "IBM Plex Mono", monospace;
          font-size: 10.5px;
          letter-spacing: .13em;
          text-transform: uppercase;
          color: var(--slate);
        }
        .field input, .field select {
          width: 100%;
          max-width: 100%;
          appearance: none;
          -webkit-appearance: none;
          padding: 12px 13px;
          border: 1px solid var(--line-2);
          border-radius: var(--r);
          font: inherit;
          font-size: 14.8px;
          background: var(--white);
          color: var(--navy);
        }
        .field input:focus, .field select:focus {
          outline: 2px solid var(--teal);
          outline-offset: 1px;
          border-color: var(--teal);
        }
        .f2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .field select {
          background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none'%3E%3Cpath d='M2.5 4.5 6 8l3.5-3.5' stroke='%23566A72' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          padding-right: 34px;
        }
        .field {
          min-width: 0;
        }
        .leadform .fine {
          font-size: 12px;
          color: var(--slate-2);
          line-height: 1.5;
          margin-top: 12px;
        }

        /* ---------- footer ---------- */
        .foot {
          background: var(--navy);
          color: #CBDAD6;
          padding: clamp(52px, 6vw, 76px) 0 0;
          border-top: 1px solid rgba(255, 255, 255, .09);
        }
        .foot-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1fr;
          gap: clamp(24px, 3vw, 48px);
        }
        .foot .brand {
          color: #fff;
          margin-bottom: 16px;
        }
        .foot .brand-mark {
          background: rgba(255, 255, 255, .1);
        }
        .foot-about {
          font-size: 14.2px;
          line-height: 1.6;
          color: #9DB2AD;
          max-width: 320px;
        }
        .foot-contact {
          margin-top: 20px;
          display: grid;
          gap: 8px;
          font-size: 14px;
          color: #9DB2AD;
          text-align: left;
        }
        .foot-contact a:hover {
          color: #7FD9C4;
        }
        .foot h4 {
          font-family: "IBM Plex Mono", monospace;
          font-size: 10.5px;
          letter-spacing: .15em;
          text-transform: uppercase;
          font-weight: 500;
          color: #7FD9C4;
          margin-bottom: 16px;
        }
        .foot ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 10px;
        }
        .foot ul a {
          font-size: 14.2px;
          color: #9DB2AD;
          transition: color .2s;
        }
        .foot ul a:hover {
          color: #fff;
        }
        .foot-bottom {
          margin-top: clamp(38px, 4vw, 56px);
          border-top: 1px solid rgba(255, 255, 255, .09);
          padding: 20px 0;
          display: flex;
          flex-wrap: wrap;
          gap: 12px 24px;
          align-items: center;
          font-size: 13px;
          color: #7F9490;
        }
        .foot-bottom .mono {
          color: #7F9490;
        }
        .foot-bottom nav {
          margin-left: auto;
          display: flex;
          gap: 20px;
        }

        /* ---------- mobile sticky CTA ---------- */
        .stickybar {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 70;
          display: none;
          gap: 10px;
          padding: 10px 14px;
          background: rgba(255, 255, 255, .96);
          backdrop-filter: blur(12px);
          border-top: 1px solid var(--line);
        }
        .stickybar .btn {
          flex: 1;
          padding: 12px 14px;
        }

        /* ---------- scroll reveal ---------- */
        .rise {
          opacity: 0;
          transform: translateY(16px);
        }
        .rise.in {
          opacity: 1;
          transform: none;
          transition: opacity .65s var(--ease), transform .65s var(--ease);
        }

        /* ---------- responsive ---------- */
        @media (max-width: 1080px) {
          .agents, .usp {
            grid-template-columns: repeat(2, 1fr);
          }
          .life {
            grid-template-columns: repeat(3, 1fr);
          }
          .life-step:nth-child(3) {
            border-right: 0;
          }
          .snap {
            grid-template-columns: 1fr;
          }
          .score {
            position: static;
          }
          .final {
            grid-template-columns: 1fr;
          }
          .foot-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 900px) {
          .nav-links {
            display: none;
          }
          .nav-cta .btn--ghost {
            display: none;
          }
          .burger {
            display: flex;
          }
          .nav-cta {
            display: none;
          }
          .hero-grid {
            grid-template-columns: 1fr;
          }
          .hero::before {
            -webkit-mask-image: radial-gradient(120% 60% at 50% 10%, #000 0%, transparent 70%);
            mask-image: radial-gradient(120% 60% at 50% 10%, #000 0%, transparent 70%);
          }
          .prob, .out, .fw-list, .plans, .trust {
            grid-template-columns: 1fr;
          }
          .fly {
            grid-template-columns: 1fr;
          }
          .fly-step {
            border-right: 0;
            border-bottom: 1px solid var(--line);
          }
          .fly-step:last-child {
            border-bottom: 0;
          }
          .fly-step::after {
            right: auto;
            left: 50%;
            top: auto;
            bottom: -7px;
            transform: translateX(-50%) rotate(135deg);
          }
          .matrix-wrap {
            grid-template-columns: 1fr;
          }
          .map-bus {
            display: none;
          }
          .map-stem {
            height: 18px;
          }
          .chip::before {
            display: none;
          }
          .map-chips {
            padding-top: 14px;
          }
          .axis-y {
            display: none;
          }
          .stickybar {
            display: flex;
          }
          body {
            padding-bottom: 66px;
          }
          .plan--best {
            order: -1;
          }
        }
        @media (max-width: 620px) {
          .agents, .usp, .matrix, .axis-x, .f2 {
            grid-template-columns: 1fr;
          }
          .life {
            grid-template-columns: 1fr;
          }
          .life-step {
            border-right: 0;
            padding-bottom: 22px;
          }
          .axis-x span {
            text-align: left;
          }
          .cell {
            min-height: 0;
          }
          .foot-grid {
            grid-template-columns: 1fr;
          }
          .strip-items {
            gap: 10px 16px;
          }
          .opts {
            padding-left: 0;
          }
          .panel-head {
            flex-wrap: wrap;
          }
          .panel-head .stat {
            margin-left: 0;
            white-space: normal;
            flex-basis: 100%;
          }
          .pill-more {
            display: none;
          }
          .axis-x {
            display: none;
          }
          .matrix {
            margin-top: 0 !important;
          }
          .inv li {
            grid-template-columns: 1fr;
          }
          .tier {
            grid-column: 1;
            grid-row: auto;
            justify-self: start;
            margin-top: 6px;
          }
        }
      `}} />

      {/* ============ NAV ============ */}
      <header className={`nav ${isStuck ? "is-stuck" : ""}`} id="nav">
        <div className="wrap nav-in">
          <a className="brand" href="#top">
            <span className="brand-mark" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1.2 14 4v5.1c0 3.2-2.5 5-6 5.7-3.5-.7-6-2.5-6-5.7V4L8 1.2Z" stroke="#7FD9C4" strokeWidth="1.1" strokeLinejoin="round" />
                <path d="M8 4.4v7.2M4.6 6.2h6.8M4.6 9.4h6.8" stroke="#7FD9C4" strokeWidth=".9" strokeLinecap="round" />
              </svg>
            </span>
            ReguLattice
          </a>
          <nav className="nav-links" aria-label="Primary">
            <a href="#problem">Why now</a>
            <a href="#agents">Agents</a>
            <a href="#authority">Authority Engine</a>
            <a href="#frameworks">Frameworks</a>
            <a href="#pricing">Pricing</a>
          </nav>
          <div className="nav-cta">
            <a className="btn btn--ghost" href="#snapshot">Check my readiness</a>
            <a class="btn btn--pri" href="#demo">Book a demo</a>
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
          <a href="#pricing" onClick={() => setMobileOpen(false)}>Pricing</a>
          <a className="btn btn--pri btn--wide" href="#demo" onClick={() => setMobileOpen(false)}>Book a demo</a>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <main id="top">
        <section className="hero">
          <div className="wrap hero-grid">
            <div className="text-left">
              <span className="pill mono"><i></i>AI-native governance<span className="pill-more"> · not another GRC tool</span></span>
              <h1>You can't govern the AI <span className="em">you don't know exists.</span></h1>
              <p className="lead">ReguLattice puts seven autonomous agents to work across your organisation: they find every model, copilot, agent and third-party AI API you're running, place each one under the controls that actually apply, and keep the evidence current — across ISO/IEC 42001, NIST AI RMF and the EU AI Act at the same time.</p>

              <div className="hero-note">
                <span className="mono">Local</span>
                <p>Run ReguLattice in our cloud, or entirely inside your own perimeter with private inference on your infrastructure. In on-premise mode, your data never leaves your network.</p>
              </div>

              <div className="btn-row">
                <a className="btn btn--pri" href="#demo">Book a 20-minute demo <svg className="arrow" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
                <a className="btn btn--ghost" href="#snapshot">Score my AI governance in 60 seconds</a>
              </div>

              <div className="microtrust">
                <span><svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="#0E7C6B" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>No training on your data by default</span>
                <span><svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="#0E7C6B" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>Humans stay accountable for high-impact decisions</span>
                <span><svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="#0E7C6B" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>On-prem and air-gapped deployment available</span>
              </div>
            </div>

            {/* signature element: the live discovery lattice */}
            <div className="panel" role="img" aria-label="Product view: the AI inventory being populated live by the Discovery Agent, showing five discovered AI systems with risk tiers and evidence freshness at 92 percent.">
              <div className="panel-head text-left">
                <i className="live" aria-hidden="true"></i>
                <span className="mono">AI Inventory · live</span>
                <span className="mono stat" id="scanStat">{scanStat}</span>
              </div>
              <div className="scanline" aria-hidden="true"></div>
              <ul className="inv text-left">
                <li>
                  <span className="inv-name">hr-screening-copilot <span className="tag tag--new">undeclared</span></span>
                  <span className="inv-meta">third-party API · recruitment · EU AI Act Annex III</span>
                  <span className="tier tier--high">High</span>
                </li>
                <li>
                  <span className="inv-name">claims-triage-agent <span className="tag tag--ok">governed</span></span>
                  <span className="inv-meta">internal model · claims operations · 42001 A.6</span>
                  <span className="tier tier--high">High</span>
                </li>
                <li>
                  <span className="inv-name">credit-scoring-v4 <span className="tag tag--drift">drift detected</span></span>
                  <span className="inv-meta">internal model · lending · retrained 4d ago</span>
                  <span className="tier tier--high">High</span>
                </li>
                <li>
                  <span className="inv-name">support-summariser <span className="tag tag--ok">governed</span></span>
                  <span className="inv-meta">SaaS copilot · customer service</span>
                  <span className="tier tier--ltd">Limited</span>
                </li>
                <li>
                  <span className="inv-name">eng-code-assistant <span className="tag tag--new">undeclared</span></span>
                  <span className="inv-meta">SaaS copilot · engineering · no owner assigned</span>
                  <span className="tier">Minimal</span>
                </li>
              </ul>
              <div className="panel-foot text-left">
                <div className="ring" aria-hidden="true"></div>
                <div className="foot-txt">
                  <strong>Evidence freshness</strong>
                  <span>3 artefacts approaching TTL expiry</span>
                </div>
                <div className="agent-dots" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ FRAMEWORK STRIP ============ */}
        <div className="strip">
          <div className="wrap strip-in">
            <span className="mono strip-label">One inventory, mapped to</span>
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
        <section className="sec--dark insight">
          <div className="wrap">
            <span className="mono">The premise</span>
            <q>Most organisations are deploying AI far faster than they can <span className="em">see, classify, or account for it.</span></q>
            <p>ReguLattice closes that gap by making governance continuous, machine-assisted and audit-ready — with people still accountable for the decisions that matter.</p>
          </div>
        </section>

        {/* ============ PROBLEM ============ */}
        <section className="sec" id="problem">
          <div className="wrap">
            <div className="head text-left">
              <span className="eyebrow mono">Why now</span>
              <h2>AI moved faster than the governance model built to hold it.</h2>
              <p className="lead">Every one of these is normal. Together they mean your governance is permanently describing an estate that no longer exists.</p>
            </div>

            <div className="prob text-left">
              <div className="prob-item">
                <span className="mono">Shadow AI</span>
                <h3>Systems nobody registered</h3>
                <p>Teams ship copilots, agents and third-party AI APIs on a corporate card. Your inventory is a spreadsheet that was accurate last quarter.</p>
              </div>
              <div className="prob-item">
                <span class="mono">Stale evidence</span>
                <h3>Proof with an expiry date</h3>
                <p>Screenshots gathered for the last audit are already out of date, and nobody can say which controls are still operating today.</p>
              </div>
              <div className="prob-item">
                <span class="mono">Framework sprawl</span>
                <h3>The same answer, five times</h3>
                <p>ISO 42001, NIST AI RMF, the EU AI Act and ISO 23894 ask overlapping questions — and your team answers each one from scratch.</p>
              </div>
              <div className="prob-item">
                <span class="mono">Questionnaires</span>
                <h3>Assessment after the fact</h3>
                <p>Model owners self-assess in forms they don't understand, months after the system went live and started making decisions.</p>
              </div>
              <div className="prob-item">
                <span class="mono">Authority gap</span>
                <h3>No record of who allowed what</h3>
                <p>When an AI system makes a consequential call, nobody can show who approved that scope, what its limits were, or whether the outcome can be undone.</p>
              </div>
              <div className="prob-item">
                <span class="mono">Silent drift</span>
                <h3>Change without signal</h3>
                <p>Models get retrained, prompts get edited, connectors change. Control effectiveness degrades quietly, and the first sign is an incident.</p>
              </div>
            </div>

            <div className="prob-result text-left">
              <span className="mono">Result</span>
              <p>Governance that is permanently behind the estate it is meant to govern — and an audit you brace for instead of pass.</p>
            </div>
          </div>
        </section>

        {/* ============ FLYWHEEL ============ */}
        <section className="sec sec--white">
          <div className="wrap">
            <div className="head head--center">
              <span class="eyebrow mono">The model</span>
              <h2>See it. Govern it. Prove it.</h2>
              <p class="lead">Three moves, running continuously instead of once a year.</p>
            </div>

            <div className="fly text-left">
              <div className="fly-step">
                <span className="fly-num">01 / Discovery</span>
                <h3>See it</h3>
                <p>ReguLattice builds one live AI Inventory — models, agents, copilots, RAG stacks and third-party AI APIs, including the ones nobody declared. Every system gets an owner, a purpose and a risk tier.</p>
              </div>
              <div className="fly-step">
                <span className="fly-num">02 / Control</span>
                <h3>Govern it</h3>
                <p>Each system is mapped to the controls that genuinely apply to it, across every framework at once, with decision boundaries and human sign-off points set before it operates — not after.</p>
              </div>
              <div className="fly-step">
                <span className="fly-num">03 / Assurance</span>
                <h3>Prove it</h3>
                <p>Evidence is collected, timestamped and refreshed on a schedule, so a conformity pack, model card or gap report is something you export — not something you assemble for six weeks.</p>
              </div>
            </div>
            <p className="fly-bridge">Seven autonomous agents run this loop. Here's what each one does.</p>
          </div>
        </section>

        {/* ============ 7 AGENTS ============ */}
        <section class="sec" id="agents">
          <div className="wrap">
            <div className="head head--center">
              <span className="eyebrow mono">The platform</span>
              <h2>Seven autonomous agents, one governance loop.</h2>
              <p className="lead">Not a checklist with a chatbot on top. Each agent owns a stage of the lifecycle, runs on a schedule or on change, and hands its output to the next one.</p>
            </div>

            <div className="agents text-left">
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
                  <span className="agent-ico"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" /><circle cx="8" cy="8" r="2.6" stroke="currentColor" stroke-width="1.3" /><circle cx="8" cy="8" r=".9" fill="currentColor" /></svg></span>
                </div>
                <h3>Classification Agent</h3>
                <p>Assigns risk tier, intended purpose and regulatory scope — including EU AI Act categorisation — from system signals, so owners answer a handful of questions instead of a form.</p>
                <span className="agent-tag mono">Risk tiering · Scope</span>
              </article>

              <article className="agent rise">
                <div className="agent-top"><span className="agent-id">Agent 03</span>
                  <span className="agent-ico"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.6 13.4 4.5v4.2c0 3-2.3 4.9-5.4 5.7-3.1-.8-5.4-2.7-5.4-5.7V4.5L8 1.6Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="m5.8 8 1.6 1.6 3-3.2" stroke="currentColor" stroke-width="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
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
                  <span className="agent-ico"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v12M3.4 4.6h9.2M4.6 4.6 2.4 9.2h4.4L4.6 4.6ZM11.4 4.6 9.2 9.2h4.4l-2.2-4.6ZM5.6 14h4.8" stroke="currentColor" stroke-width="1.25" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                </div>
                <h3>Authority Agent</h3>
                <p>Records who authorised what, the decision boundaries each system operates inside, and whether its outputs can be reversed — a durable authority ledger.</p>
                <span className="agent-tag mono">Authority · Reversibility</span>
              </article>

              <article className="agent rise">
                <div className="agent-top"><span className="agent-id">Agent 07</span>
                  <span className="agent-ico"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6.2" r="4.2" stroke="currentColor" strokeWidth="1.3" /><path d="M5.6 9.8 4.8 14.4 8 12.8l3.2 1.6-.8-4.6" stroke="currentColor" stroke-width="1.3" strokeLinejoin="round" /></svg></span>
                </div>
                <h3>Assurance Agent</h3>
                <p>Generates audit-ready evidence packs, model cards and conformity documentation on demand — formatted for the framework the auditor is actually asking about.</p>
                <span className="agent-tag mono">Conformity packs</span>
              </article>

              <article className="agent rise" style={{ background: "var(--mint-2)", borderColor: "#C6DCD3" }}>
                <div className="agent-top"><span className="agent-id">Orchestration</span>
                  <span className="agent-ico" style={{ background: "#fff" }}><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="1.7" fill="currentColor" /><circle cx="2.6" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.2" /><circle cx="13.4" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.2" /><circle cx="2.6" cy="13" r="1.5" stroke="currentColor" strokeWidth="1.2" /><circle cx="13.4" cy="13" r="1.5" stroke="currentColor" strokeWidth="1.2" /><path d="M3.7 4.1 6.7 6.7M12.3 4.1 9.3 6.7M3.7 11.9l3-2.6M12.3 11.9l-3-2.6" stroke="currentColor" strokeWidth="1.1" /></svg></span>
                </div>
                <h3>They work as a system</h3>
                <p>Discovery feeds classification, classification drives controls, controls define what evidence is needed, monitoring invalidates evidence that goes stale — and the loop runs again.</p>
                <span className="agent-tag mono" style={{ borderColor: "#C6DCD3" }}>Multi-agent orchestration</span>
              </article>
            </div>

            <p className="agents-close">You set the autonomy level per agent — from suggest-only to full assist. High-impact approvals always stay with a named person.</p>
          </div>
        </section>

        {/* ============ AUTHORITY & REVERSIBILITY ============ */}
        <section className="sec sec--white" id="authority">
          <div className="wrap">
            <div className="head text-left">
              <span className="eyebrow mono">The differentiator</span>
              <h2>The AI Authority &amp; Reversibility Engine</h2>
              <p className="lead">Two questions decide how an AI system should be supervised: how much authority has been handed to it, and whether what it does can be undone. ReguLattice asks both, records the answers, and enforces the result.</p>
            </div>

            <div className="matrix-wrap text-left">
              <div className="axis-y" aria-hidden="true">
                <span>Authority retained</span>
                <span>Authority delegated</span>
              </div>
              <div>
                <div className="axis-x">
                  <span>Reversible outcome</span>
                  <span>Irreversible outcome</span>
                </div>
                <div className="matrix" style={{ marginTop: "14px" }}>
                  <div className="cell cell--monitor">
                    <h4><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M1.4 8S3.9 3.6 8 3.6 14.6 8 14.6 8 12.1 12.4 8 12.4 1.4 8 1.4 8Z" stroke="currentColor" strokeWidth="1.3" /><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" /></svg> Authority retained · Reversible</h4>
                    <strong>Monitor</strong>
                    <p>The system recommends, a person acts, and the outcome can be rolled back. Log everything, sample for quality, and review on a cadence.</p>
                  </div>
                  <div className="cell cell--signoff">
                    <h4><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2.6 12.4c2-3.8 3.6-6 4.6-6.6 1-.6 1.4.2.8 1.4-.6 1.2-1.4 2.4-1 2.9.5.5 1.6-.5 2.6-1.4 1-.9 1.7-.5 1.6.6-.1 1.1.4 1.6 2.2.9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg> Authority retained · Irreversible</h4>
                    <strong>Sign-off</strong>
                    <p>A named human is accountable before execution. ReguLattice blocks the action until that approval is recorded, with the reasoning attached to the ledger.</p>
                  </div>
                  <div className="cell cell--guard">
                    <h4><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1.8 13.2 4.4v4c0 2.9-2.2 4.7-5.2 5.5-3-.8-5.2-2.6-5.2-5.5v-4L8 1.8Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg> Authority delegated · Reversible</h4>
                    <strong>Guardrail</strong>
                    <p>The system acts on its own inside limits you define — scope, volume, thresholds — under continuous evaluation, with an audited path to undo.</p>
                  </div>
                  <div className="cell cell--blocked">
                    <h4><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.2" stroke="currentColor" strokeWidth="1.3" /><path d="m4.4 4.4 7.2 7.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg> Authority delegated · Irreversible</h4>
                    <strong>Blocked</strong>
                    <p>Autonomous and unrecoverable is not a configuration ReguLattice will let you ship. Hard stop until authority is escalated to a person or the action is made reversible.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="matrix-note text-left">
              <p>Most tools track controls. ReguLattice also tracks <span className="em">how much authority an AI system holds — and whether its decisions can be undone.</span></p>
            </div>
          </div>
        </section>

        {/* ============ HOW IT WORKS ============ */}
        <section className="sec">
          <div className="wrap">
            <div className="head text-left">
              <span className="eyebrow mono">How it works</span>
              <h2>The lifecycle, running on a loop.</h2>
              <p className="lead">From first connection to continuous operation, usually inside the first two weeks.</p>
            </div>

            <div className="life text-left">
              <div className="life-step is-first">
                <span className="mono">Discover</span>
                <h3>Find it all</h3>
                <p>Connect your cloud, SaaS, code and network sources. The inventory populates itself, including systems nobody declared.</p>
              </div>
              <div className="life-step">
                <span className="mono">Assess</span>
                <h3>Tier the risk</h3>
                <p>Each system gets a purpose, an owner, a risk tier and its regulatory scope — agent-assisted, confirmed by a human.</p>
              </div>
              <div className="life-step">
                <span className="mono">Govern</span>
                <h3>Apply controls</h3>
                <p>Required controls, policies and decision boundaries are applied across every framework in scope simultaneously.</p>
              </div>
              <div className="life-step">
                <span className="mono">Monitor</span>
                <h3>Watch for change</h3>
                <p>Drift, retraining, policy breaches and expiring evidence raise alerts and land on a remediation board with an owner.</p>
              </div>
              <div className="life-step">
                <span className="mono">Improve</span>
                <h3>Close the gap</h3>
                <p>Maturity and gap reporting shows what moved, what regressed, and what to fix next — then the loop restarts.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ FRAMEWORKS ============ */}
        <section className="sec sec--mint" id="frameworks">
          <div className="wrap">
            <div className="head text-left">
              <span className="eyebrow mono">Coverage</span>
              <h2>Implement one control. Satisfy several standards.</h2>
              <p className="lead">ReguLattice treats frameworks as lenses over a single control library, not as separate projects with separate spreadsheets.</p>
            </div>

            <div className="fw-list text-left">
              <div className="fw"><span className="fw-rank">01</span><h3>ISO/IEC 42001</h3><p>The AI management system that forms the backbone — governance structure, roles, objectives and the operating rhythm everything else hangs from.</p></div>
              <div className="fw"><span class="fw-rank">02</span><h3>NIST AI RMF</h3><p>The risk function: Govern, Map, Measure and Manage, applied per system and evidenced continuously rather than asserted annually.</p></div>
              <div className="fw"><span class="fw-rank">03</span><h3>EU AI Act</h3><p>Regulatory obligation depth — risk categorisation, high-risk duties, transparency requirements and conformity documentation.</p></div>
              <div className="fw"><span class="fw-rank">04</span><h3>ISO/IEC 23894</h3><p>AI-specific risk management: identifying, analysing and treating risks unique to AI systems across their lifecycle.</p></div>
              <div className="fw"><span class="fw-rank">05</span><h3>ISO/IEC 38507</h3><p>The governing-body view — leadership accountability, guiding principles and where the organisation's risk appetite actually sits.</p></div>
              <div className="fw"><span class="fw-rank">06</span><h3>OECD &amp; UNESCO</h3><p>Principle alignment for fairness, transparency, human oversight and human rights, mapped to the controls that demonstrate them.</p></div>
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
                <span class="chip">EU AI Act</span>
                <span class="chip">ISO/IEC 23894</span>
                <span class="chip">ISO/IEC 38507</span>
                <span class="chip">OECD &amp; UNESCO</span>
              </div>
              <cite>Evidence is collected once, then presented in the language each framework expects.</cite>
            </div>
          </div>
        </section>

        {/* ============ CAPABILITIES ============ */}
        <section className="sec">
          <div className="wrap">
            <div className="head text-left">
              <span className="eyebrow mono">Capabilities</span>
              <h2>What you get on day one.</h2>
            </div>

            <div className="usp text-left">
              <div className="usp-item"><h3><svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="4.6" stroke="currentColor" strokeWidth="1.4" /><path d="m10.6 10.6 3.1 3.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>Shadow AI discovery</h3><p>Surface undeclared models, agents, copilots and AI APIs across cloud, SaaS and code — with an owner assigned to each.</p></div>
              <div className="usp-item"><h3><svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 2 14 5.4v5.2L8 14 2 10.6V5.4L8 2Z" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" /></svg>Agent-assisted risk tiering</h3><p>Purpose, risk tier and regulatory scope proposed from system signals, confirmed by a human in minutes.</p></div>
              <div className="usp-item"><h3><svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M2.4 4.6h11.2M2.4 8h11.2M2.4 11.4h11.2M5.6 2.4v11.2" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" /></svg>Multi-framework lens</h3><p>One control library, many standards. Implement once and see coverage move across every framework in scope.</p></div>
              <div className="usp-item"><h3><svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.1" stroke="currentColor" strokeWidth="1.35" /><path d="M8 4.6V8l2.4 1.6" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" /></svg>Continuous evidence &amp; freshness</h3><p>Proof is collected on a schedule, scored 0–100%, and flagged as it decays past its TTL — no more audit-week archaeology.</p></div>
              <div className="usp-item"><h3><svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M1.8 12.4V4M14.2 12.4V4M1.8 12.4h12.4M4.6 9.8V7M8 9.8V5.4M11.4 9.8V6.4" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" /></svg>Live monitoring &amp; drift</h3><p>Model changes, prompt edits, policy breaches and failing controls raise alerts before they become findings.</p></div>
              <div className="usp-item"><h3><svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 2v12M3.4 4.6h9.2M5.6 14h4.8" stroke="currentColor" stroke-width="1.35" strokeLinecap="round" /></svg>Authority &amp; reversibility ledger</h3><p>A durable record of who authorised what, the boundaries each system runs inside, and whether its decisions can be undone.</p></div>
              <div className="usp-item"><h3><svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3.4 2.2h6.2l3 3v8.6H3.4V2.2Z" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" /><path d="M9.4 2.2v3.3h3.2" stroke="currentColor" strokeWidth="1.35" /></svg>Conformity &amp; evidence packs</h3><p>Model cards, Statements of Applicability, EU AI Act readiness and auditor-ready packs exported on demand.</p></div>
              <div className="usp-item"><h3><svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="1.7" fill="currentColor" /><circle cx="3" cy="3.4" r="1.4" stroke="currentColor" strokeWidth="1.2" /><circle cx="13" cy="3.4" r="1.4" stroke="currentColor" stroke-width="1.2" /><circle cx="8" cy="13.4" r="1.4" stroke="currentColor" stroke-width="1.2" /><path d="M4.1 4.4 6.7 6.7M11.9 4.4 9.3 6.7M8 9.7v2.3" stroke="currentColor" strokeWidth="1.1" /></svg>Agentic system governance</h3><p>Built for AI that acts, not just predicts — tool access, decision scope and escalation paths are governed objects.</p></div>
            </div>
          </div>
        </section>

        {/* ============ OUTCOMES ============ */}
        <section className="sec sec--white">
          <div className="wrap">
            <div className="head text-left">
              <span className="eyebrow mono">Outcomes</span>
              <h2>What changes for your team.</h2>
            </div>
            <div className="out text-left">
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
        <section className="sec sec--mint">
          <div className="wrap trust text-left">
            <div>
              <span className="eyebrow mono">Trust &amp; deployment</span>
              <h2>Built for organisations that can't send their data anywhere.</h2>
              <p className="lead" style={{ marginTop: "18px" }}>Governance data is some of the most sensitive material an organisation holds: model behaviour, incidents, decisions, and the reasoning behind them. ReguLattice is designed so none of it has to leave your control.</p>
              <ul className="trust-list">
                <li><svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg><span><strong>Private inference on your infrastructure.</strong> Small language models run inside your environment, so prompts, evidence and findings stay in your network.</span></li>
                <li><svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg><span><strong>Humans stay accountable.</strong> Autonomy is configurable per agent, and irreversible high-impact actions always require a named approver.</span></li>
                <li><svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg><span><strong>No training on your data by default.</strong> Your evidence, policies and model records are not used to improve anyone else's system.</span></li>
                <li><svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg><span><strong>Made for regulated markets.</strong> Financial services, healthcare, public sector and defence-adjacent organisations where data residency is non-negotiable.</span></li>
              </ul>
            </div>

            <div className="deploy text-left">
              <div className="deploy-row"><span className="mono">Cloud</span><div><strong>Hosted workspace</strong><p>Fastest path to a live inventory. Managed updates, no infrastructure to run.</p></div></div>
              <div className="deploy-row"><span className="mono">Hybrid</span><div><strong>Local model assist</strong><p>Platform in the cloud, sensitive inference handled locally on your own hardware.</p></div></div>
              <div className="deploy-row"><span class="mono">On-prem</span><div><strong>Inside your perimeter</strong><p>The full two-container deployment — governance core plus agent runtime — in your environment.</p></div></div>
              <div className="deploy-row"><span class="mono">Air-gapped</span><div><strong>No external connectivity</strong><p>For classified, sovereign or fully isolated networks. Nothing egresses, ever.</p></div></div>
            </div>
          </div>
        </section>

        {/* ============ READINESS SNAPSHOT ============ */}
        <section className="sec" id="snapshot">
          <div className="wrap">
            <div className="head text-left">
              <span className="eyebrow mono">Free · 60 seconds · no login</span>
              <h2>How ready is your AI governance, really?</h2>
              <p className="lead">Six questions, scored against the ISO/IEC 42001 backbone and EU AI Act obligations. You'll get an indicative maturity score straight away — and we'll send the full gap breakdown if you want it.</p>
            </div>

            <div className="snap text-left">
              <div className="snap-form" id="quiz">
                {/* Q1 */}
                <div className="q" data-q="0">
                  <div className="q-label"><span className="mono">Q1</span><p>Do you have a complete, current inventory of every AI system in use across the organisation?</p></div>
                  <div className="opts">
                    <button 
                      onClick={() => handleAnswerSelect(0, 0)}
                      className={`opt ${answers[0] === 0 ? "sel" : ""}`} 
                      type="button"
                    >No inventory</button>
                    <button 
                      onClick={() => handleAnswerSelect(0, 1)}
                      className={`opt ${answers[0] === 1 ? "sel" : ""}`} 
                      type="button"
                    >Partial / spreadsheet</button>
                    <button 
                      onClick={() => handleAnswerSelect(0, 2)}
                      className={`opt ${answers[0] === 2 ? "sel" : ""}`} 
                      type="button"
                    >Complete and maintained</button>
                  </div>
                </div>

                {/* Q2 */}
                <div className="q" data-q="1">
                  <div className="q-label"><span className="mono">Q2</span><p>Could you detect an AI tool a team started using this month without telling anyone?</p></div>
                  <div className="opts">
                    <button 
                      onClick={() => handleAnswerSelect(1, 0)}
                      className={`opt ${answers[1] === 0 ? "sel" : ""}`} 
                      type="button"
                    >Almost certainly not</button>
                    <button 
                      onClick={() => handleAnswerSelect(1, 1)}
                      className={`opt ${answers[1] === 1 ? "sel" : ""}`} 
                      type="button"
                    >Eventually, manually</button>
                    <button 
                      onClick={() => handleAnswerSelect(1, 2)}
                      className={`opt ${answers[1] === 2 ? "sel" : ""}`} 
                      type="button"
                    >Yes, automatically</button>
                  </div>
                </div>

                {/* Q3 */}
                <div className="q" data-q="2">
                  <div className="q-label"><span className="mono">Q3</span><p>Are your AI systems classified by risk tier and mapped to their regulatory scope?</p></div>
                  <div className="opts">
                    <button 
                      onClick={() => handleAnswerSelect(2, 0)}
                      className={`opt ${answers[2] === 0 ? "sel" : ""}`} 
                      type="button"
                    >Not yet</button>
                    <button 
                      onClick={() => handleAnswerSelect(2, 1)}
                      className={`opt ${answers[2] === 1 ? "sel" : ""}`} 
                      type="button"
                    >High-risk ones only</button>
                    <button 
                      onClick={() => handleAnswerSelect(2, 2)}
                      className={`opt ${answers[2] === 2 ? "sel" : ""}`} 
                      type="button"
                    >All of them</button>
                  </div>
                </div>

                {/* Q4 */}
                <div className="q" data-q="3">
                  <div className="q-label"><span className="mono">Q4</span><p>If an auditor asked for evidence today, how long would it take to produce it?</p></div>
                  <div className="opts">
                    <button 
                      onClick={() => handleAnswerSelect(3, 0)}
                      className={`opt ${answers[3] === 0 ? "sel" : ""}`} 
                      type="button"
                    >Weeks</button>
                    <button 
                      onClick={() => handleAnswerSelect(3, 1)}
                      className={`opt ${answers[3] === 1 ? "sel" : ""}`} 
                      type="button"
                    >A few days</button>
                    <button 
                      onClick={() => handleAnswerSelect(3, 2)}
                      className={`opt ${answers[3] === 2 ? "sel" : ""}`} 
                      type="button"
                    >Same day, exported</button>
                  </div>
                </div>

                {/* Q5 */}
                <div className="q" data-q="4">
                  <div className="q-label"><span className="mono">Q5</span><p>Do you monitor deployed AI systems for drift, retraining and control failure between reviews?</p></div>
                  <div className="opts">
                    <button 
                      onClick={() => handleAnswerSelect(4, 0)}
                      className={`opt ${answers[4] === 0 ? "sel" : ""}`} 
                      type="button"
                    >No</button>
                    <button 
                      onClick={() => handleAnswerSelect(4, 1)}
                      className={`opt ${answers[4] === 1 ? "sel" : ""}`} 
                      type="button"
                    >Ad hoc</button>
                    <button 
                      onClick={() => handleAnswerSelect(4, 2)}
                      className={`opt ${answers[4] === 2 ? "sel" : ""}`} 
                      type="button"
                    >Continuously</button>
                  </div>
                </div>

                {/* Q6 */}
                <div className="q" data-q="5">
                  <div className="q-label"><span className="mono">Q6</span><p>For a consequential AI decision, can you show who authorised its scope and whether it can be reversed?</p></div>
                  <div className="opts">
                    <button 
                      onClick={() => handleAnswerSelect(5, 0)}
                      className={`opt ${answers[5] === 0 ? "sel" : ""}`} 
                      type="button"
                    >No record</button>
                    <button 
                      onClick={() => handleAnswerSelect(5, 1)}
                      className={`opt ${answers[5] === 1 ? "sel" : ""}`} 
                      type="button"
                    >Partially documented</button>
                    <button 
                      onClick={() => handleAnswerSelect(5, 2)}
                      className={`opt ${answers[5] === 2 ? "sel" : ""}`} 
                      type="button"
                    >Fully logged</button>
                  </div>
                </div>
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

                <form className="score-form" id="snapForm" ref={quizFormRef} onSubmit={onQuizSubmit} novalidate>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Full name" 
                    autocomplete="name" 
                    required 
                    value={quizName}
                    onChange={(e) => setQuizName(e.target.value)}
                  />
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Work email" 
                    autocomplete="email" 
                    required 
                    value={quizEmail}
                    onChange={(e) => setQuizEmail(e.target.value)}
                  />
                  <button className="btn btn--onDark btn--wide" type="submit" disabled={quizSent}>
                    {quizSent ? "Sent" : "Send me the full gap report"}
                  </button>
                  <p className="score-hint">We'll email a breakdown of the gaps behind your score. No spam, and you can opt out in one click.</p>
                  <p className={`ok-msg ${quizSent ? "show" : ""}`} id="snapOk">Thanks — your gap report is on its way. We'll follow up within one working day.</p>
                </form>
              </aside>
            </div>
          </div>
        </section>

        {/* ============ PRICING ============ */}
        <section className="sec sec--white" id="pricing">
          <div className="wrap">
            <div className="head head--center">
              <span className="eyebrow mono">Pricing</span>
              <h2>Priced by the size of your AI estate.</h2>
              <p className="lead">Every plan includes the core AI Inventory and multi-framework control mapping. Upgrade when you need continuous evidence, EU AI Act depth, email support or local deployment.</p>
            </div>

            <div className="plans text-left">
              {/* Starter */}
              <div className="plan">
                <h3>Starter</h3>
                <p className="plan-for">For startups and small teams getting AI governance off the ground.</p>
                <div className="price"><b>$79</b><span>/ month</span></div>
                <p className="price-note">Cloud-hosted · self-serve</p>
                <a className="btn btn--ghost btn--wide" href="#demo">Start free trial</a>
                <span className="feat-title mono">Includes</span>
                <ul className="feats">
                  <li><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>Up to 5 AI systems in the Inventory</li>
                  <li><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>Core agents: Discovery, Classification, Control, Evidence (limited runs)</li>
                  <li><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>ISO/IEC 42001 + NIST AI RMF</li>
                  <li><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>AI Risk Register (basic)</li>
                  <li><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>Policy library with acknowledgement tracking</li>
                  <li><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>Manual and guided evidence upload</li>
                  <li><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>Basic evidence freshness scoring</li>
                  <li><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>Standard maturity and gap reports</li>
                  <li><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>In-app help centre and knowledge base</li>
                </ul>
                <ul className="limits">
                  <li><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 7h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>Self-serve support only (no email support)</li>
                  <li><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 7h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>Cloud only — no local deployment</li>
                  <li><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 7h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>No EU AI Act deep obligation packs</li>
                </ul>
              </div>

              {/* Pro */}
              <div className="plan plan--best">
                <span className="plan-flag">Most chosen</span>
                <h3>Pro</h3>
                <p className="plan-for">For growing companies with real AI in production and audit pressure on the calendar.</p>
                <div className="price"><b>$219</b><span>/ month</span></div>
                <p className="price-note">Everything in Starter, plus:</p>
                <a className="btn btn--pri btn--wide" href="#demo">Start Pro trial</a>
                <span className="feat-title mono">Includes</span>
                <ul className="feats">
                  <li><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>Up to 25 AI systems in the Inventory</li>
                  <li><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>All seven autonomous agents enabled</li>
                  <li><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>Higher agent run volume</li>
                  <li><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>Full framework set: ISO/IEC 42001, NIST AI RMF, EU AI Act, ISO 23894, ISO 38507</li>
                  <li><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>Continuous monitoring feed</li>
                  <li><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>Autonomous evidence collection via connectors and agents</li>
                  <li><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>Freshness scoring with stale-evidence alerts</li>
                  <li><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>Authority &amp; Reversibility ledger</li>
                  <li><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>Risk remediation Kanban</li>
                  <li><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>Advanced reports: EU AI Act readiness, evidence packs, drift</li>
                  <li><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>Team roles and permissions (Governance Lead, Model Owner, Risk Owner)</li>
                  <li><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>Email support</li>
                  <li><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>Optional local model assist (hybrid)</li>
                </ul>
              </div>

              {/* Enterprise */}
              <div className="plan">
                <h3>Partner / Enterprise</h3>
                <p className="plan-for">For regulated organisations, audit firms and multi-team deployments.</p>
                <div className="price"><b>$349</b><span>/ month</span></div>
                <p className="price-note">Or custom annual · everything in Pro, plus:</p>
                <a className="btn btn--dark btn--wide" href="#demo">Contact sales</a>
                <span className="feat-title mono">Includes</span>
                <ul className="feats">
                  <li><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>Higher or unlimited AI systems (fair use / custom)</li>
                  <li><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>Full local, on-premise or air-gapped deployment</li>
                  <li><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>Private inference running on your own infrastructure</li>
                  <li><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>White-label partner mode for audit and advisory firms</li>
                  <li><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>Custom framework packs and control libraries</li>
                  <li><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>Advanced autonomy controls, from suggest-only to full assist</li>
                  <li><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>SSO / SAML and advanced audit logs</li>
                  <li><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>Dedicated success and partner support</li>
                  <li><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>Custom report templates and branded evidence packs</li>
                  <li><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>Multi-workspace and multi-entity options</li>
                  <li><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>Contract and security review support</li>
                </ul>
              </div>
            </div>

            <p className="plans-note">Starter gets you a real inventory and your first framework. Pro is where governance becomes continuous. Enterprise is for when the data can't leave the building.</p>
            <div className="shared">
              <span>Seat-based access with role permissions</span>
              <span>Continuous product updates</span>
              <span>Humans accountable for high-impact approvals</span>
              <span>No training on customer data by default</span>
            </div>
          </div>
        </section>

        {/* ============ COMPETITIVE ============ */}
        <section className="sec">
          <div className="wrap">
            <div className="head text-left">
              <span className="eyebrow mono">Where we sit</span>
              <h2>Legacy GRC wasn't built for this. Checklists never were.</h2>
              <p className="lead">AI governance has a different shape: the systems change themselves, the frameworks overlap, and the evidence expires.</p>
            </div>

            <div className="cmp-scroll text-left">
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
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section className="sec sec--white">
          <div className="wrap" style={{ maxWidth: "900px" }}>
            <div className="head head--center">
              <span className="eyebrow mono">Questions</span>
              <h2>Before you book.</h2>
            </div>
            <div className="faq text-left">
              <details open><summary>How long until we see our first real inventory?</summary><p className="ans">Most teams connect their first sources and see a populated inventory in the same session. A full sweep across cloud, SaaS and code typically settles within the first week, and classification follows as owners confirm what the agents propose.</p></details>
              <details><summary>Does ReguLattice replace our auditor or consultant?</summary><p className="ans">No. It replaces the six weeks of evidence gathering that happens before they arrive. Auditors and advisory firms use the partner mode to work inside the same workspace, which is usually faster for everyone.</p></details>
              <details><summary>What actually runs on our infrastructure in on-premise mode?</summary><p className="ans">Both containers — the governance core and the agent runtime — plus private inference for the language models the agents use. Nothing about your models, evidence or findings egresses your network.</p></details>
              <details><summary>We already have ISO 27001 and SOC 2. Isn't this covered?</summary><p className="ans">Those cover how you protect information, not how you govern AI decisions. ISO/IEC 42001 and the EU AI Act ask different questions: intended purpose, risk tier, human oversight, transparency, and what happens when a model drifts. ReguLattice is built for that second set.</p></details>
              <details><summary>Can we start with one framework and add more later?</summary><p class="ans">Yes, and that's the usual path. Because everything maps to a single control library, adding the EU AI Act or ISO 23894 later shows you existing coverage immediately rather than starting you at zero.</p></details>
              <details><summary>How much of this is automated versus human?</summary><p class="ans">Agents do the finding, mapping, collecting and watching. People decide. Autonomy is configurable per agent, and any irreversible high-impact action requires a named approver before it executes.</p></details>
            </div>
          </div>
        </section>

        {/* ============ FINAL CTA ============ */}
        <section className="sec sec--dark" id="demo">
          <div className="wrap final text-left">
            <div>
              <span className="eyebrow mono" style={{ color: "#7FD9C4" }}>Get started</span>
              <h2>See your own shadow AI in the first twenty minutes.</h2>
              <p className="lead">Book a working session, not a slide deck. We'll connect a source, run the Discovery Agent live, and show you what's already running inside your organisation — then map one real system to ISO/IEC 42001 and the EU AI Act together.</p>
              <ul className="final-points">
                <li><svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>20 minutes, live product, no obligation</li>
                <li><svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>You leave with a gap summary for your estate</li>
                <li><svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M11.7 4 5.6 10.1 2.3 6.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>On-premise and air-gapped options walked through if you need them</li>
              </ul>
            </div>

            <form className="leadform" id="demoForm" ref={demoFormRef} onSubmit={onDemoSubmit} novalidate>
              <h3>Book a demo</h3>
              <p>We reply within one working day.</p>
              <div className="f2">
                <div className="field">
                  <label htmlFor="fn">Full name</label>
                  <input 
                    id="fn" 
                    name="name" 
                    type="text" 
                    autocomplete="name" 
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
                    autocomplete="organization" 
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
                  autocomplete="email" 
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
                {demoSent ? "Booked" : "Book my demo"}
              </button>
              <p className="fine">By submitting you agree to be contacted about ReguLattice. We don't share your details, and you can opt out at any time.</p>
              <p className={`ok-msg ${demoSent ? "show" : ""}`} id="demoOk" style={{ color: "var(--teal)" }}>Thanks — we've got it. Expect an email within one working day with two proposed times.</p>
            </form>
          </div>
        </section>
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="foot text-left">
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <a className="brand" href="#top">
                <span className="brand-mark" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1.2 14 4v5.1c0 3.2-2.5 5-6 5.7-3.5-.7-6-2.5-6-5.7V4L8 1.2Z" stroke="#7FD9C4" strokeWidth="1.1" strokeLinejoin="round" />
                    <path d="M8 4.4v7.2M4.6 6.2h6.8M4.6 9.4h6.8" stroke="#7FD9C4" strokeWidth=".9" strokeLinecap="round" />
                  </svg>
                </span>
                ReguLattice
              </a>
              <p className="foot-about">An AI-native governance platform. We help organisations see, govern and prove their AI — continuously, with humans accountable for the decisions that matter.</p>
              <div className="foot-contact">
                <span>Karachi, Pakistan</span>
                <a href="mailto:hello@regulattice.com">hello@regulattice.com</a>
              </div>
            </div>
            <div>
              <h4>Platform</h4>
              <ul>
                <li><a href="#agents">Autonomous agents</a></li>
                <li><a href="#authority">Authority Engine</a></li>
                <li><a href="#frameworks">Frameworks</a></li>
                <li><a href="#snapshot">Readiness snapshot</a></li>
                <li><a href="#pricing">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4>Use cases</h4>
              <ul>
                <li><a href="#problem">Shadow AI discovery</a></li>
                <li><a href="#frameworks">ISO/IEC 42001 readiness</a></li>
                <li><a href="#frameworks">EU AI Act preparation</a></li>
                <li><a href="#agents">Continuous evidence</a></li>
                <li><a href="#pricing">Audit &amp; advisory partners</a></li>
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
            <span>Humans remain accountable for high-impact decisions.</span>
            <nav><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Security</a></nav>
          </div>
        </div>
      </footer>

      <div className="stickybar">
        <a className="btn btn--ghost" href="#snapshot">Score my readiness</a>
        <a className="btn btn--pri" href="#demo">Book a demo</a>
      </div>
    </div>
  );
}
