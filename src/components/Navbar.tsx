import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, Menu, Shield, FileText, BarChart3, Globe, Cpu, Users, BookOpen, MessageSquare, Award, Map, Lock, Bot, Heart } from "lucide-react";

const solutionsMenu = [
  {
    heading: "GRC Automation",
    description: "Autonomously map your controls, collect evidence, and stay audit-ready across all frameworks.",
    links: [
      { icon: Map, label: "Control Mapping", sub: "AI maps controls to 10+ frameworks" },
      { icon: Shield, label: "Risk Assessment", sub: "Continuous risk scoring & alerts" },
      { icon: FileText, label: "Policy Generation", sub: "Auto-draft compliant policies" },
      { icon: BarChart3, label: "Compliance Graph", sub: "Live posture dashboard" },
    ],
  },
  {
    heading: "AI Compliance Agents",
    description: "24/7 autonomous agents that remediate gaps, answer questionnaires, and prep your audit pack.",
    links: [
      { icon: Cpu, label: "Autonomous Remediation", sub: "One-click gap closure" },
      { icon: Lock, label: "Evidence Collection", sub: "Auto-gather screenshots & logs" },
      { icon: Bot, label: "AI Mock Audits", sub: "Simulate auditor interviews" },
      { icon: Award, label: "Report Generation", sub: "11 AI-ready audit reports" },
    ],
  },
];

const companyMenu = [
  {
    heading: "Company",
    description: "Behind ReguLattice is a team reimagining how compliance is done — autonomously, at scale.",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Founder", href: "/about#founder" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    heading: "Careers",
    description: "We're building the future of autonomous GRC. Explore open roles.",
    links: [
      { label: "Open Positions", href: "/careers#open-positions" },
    ],
  },
];

const resourcesMenu = [
  {
    heading: "Resources",
    description: "Guides, reports, and insights for compliance leaders and GRC practitioners.",
    links: [
      { icon: BookOpen, label: "Documentation", href: "#" },
      { icon: Globe, label: "Blog & Insights", href: "#" },
      { icon: Users, label: "Customer Stories", href: "#" },
      { icon: MessageSquare, label: "Webinars", href: "#" },
    ],
  },
];

interface NavbarProps {
  onBooking: () => void;
  onContact?: () => void;
}

export default function Navbar({ onBooking, onContact }: NavbarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoState, setLogoState] = useState<"brand" | "appreciation">("brand");
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Show appreciation message on the logo for first-time visitors
    const hasSeenWelcome = localStorage.getItem("rl_header_welcome_seen");
    const hasVisitorId = localStorage.getItem("rl_visitor_id");

    if (!hasSeenWelcome && !hasVisitorId) {
      // Delay initial switch to let page load first (2.5 seconds)
      const timerStart = setTimeout(() => {
        setLogoState("appreciation");

        // Switch back to brand name after 4.5 seconds
        const timerEnd = setTimeout(() => {
          setLogoState("brand");
          localStorage.setItem("rl_header_welcome_seen", "true");
        }, 4500);

        return () => clearTimeout(timerEnd);
      }, 2500);

      return () => clearTimeout(timerStart);
    }
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggle = (id: string) => setActiveMenu(prev => prev === id ? null : id);

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-200 ${scrolled ? "shadow-md" : "border-b border-gray-100"}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo — wordmark style */}
        <a href="/" className="flex items-center gap-3 group min-w-[200px]">
          {/* Animated GRC Shield and Network Traces Logo matching the image */}
          <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
            <style>{`
              @keyframes logo-glow {
                0%, 100% {
                  box-shadow: 0 0 12px rgba(6, 182, 212, 0.25), 0 0 4px rgba(16, 185, 129, 0.15);
                  border-color: rgba(6, 182, 212, 0.35);
                }
                50% {
                  box-shadow: 0 0 22px rgba(6, 182, 212, 0.55), 0 0 10px rgba(16, 185, 129, 0.35);
                  border-color: rgba(6, 182, 212, 0.75);
                }
              }
              @keyframes sheen-sweep {
                0% {
                  transform: translateX(-150%) skewX(-25deg);
                }
                100% {
                  transform: translateX(150%) skewX(-25deg);
                }
              }
              @keyframes pulse-radar {
                0% {
                  transform: scale(0.95);
                  opacity: 0.8;
                }
                100% {
                  transform: scale(1.4);
                  opacity: 0;
                }
              }
              .logo-container {
                position: relative;
                width: 44px;
                height: 44px;
                border-radius: 12px;
                overflow: hidden;
                background: #0f172a;
                border: 1.5px solid rgba(6, 182, 212, 0.35);
                transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                animation: logo-glow 3s ease-in-out infinite;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .logo-container:hover {
                transform: scale(1.08) translateY(-1px);
                border-color: rgba(6, 182, 212, 0.85);
                box-shadow: 0 0 25px rgba(6, 182, 212, 0.75), 0 0 12px rgba(16, 185, 129, 0.45);
              }
              .logo-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
              }
              .logo-container:hover .logo-image {
                transform: scale(1.15);
              }
              .sheen {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(
                  90deg,
                  transparent,
                  rgba(255, 255, 255, 0.3),
                  transparent
                );
                transform: translateX(-150%) skewX(-25deg);
                pointer-events: none;
              }
              .logo-container:hover .sheen {
                animation: sheen-sweep 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
              }
              .radar-ring {
                position: absolute;
                inset: -4px;
                border-radius: 16px;
                border: 2px solid rgba(6, 182, 212, 0.5);
                pointer-events: none;
                opacity: 0;
                transition: all 0.3s ease;
              }
              .logo-container:hover .radar-ring {
                animation: pulse-radar 1.5s cubic-bezier(0.25, 0, 0, 1) infinite;
              }
            `}</style>
            
            <motion.div 
              className="logo-container"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <img 
                src="/logo.jpg" 
                alt="ReguLattice Shield Logo" 
                className="logo-image"
              />
              <div className="sheen" />
              <div className="radar-ring" />
            </motion.div>
          </div>
          
          <div className="relative overflow-hidden h-7 flex items-center">
            <AnimatePresence mode="wait">
              {logoState === "brand" ? (
                <motion.span
                  key="brand-logo"
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -15, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-[21px] font-bold tracking-tight flex items-center"
                  style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
                >
                  <span className="text-[#0f2e5c]">Regu</span>
                  <span className="text-[#2563eb]">Lattice</span>
                </motion.span>
              ) : (
                <motion.span
                  key="appreciation-logo"
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -15, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-0.5 shadow-sm"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <Heart className="w-3 h-3 text-emerald-500 fill-emerald-500/25" />
                  <span>We Appreciate You!</span>
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* Solutions */}
          <button
            onClick={() => toggle("solutions")}
            className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeMenu === "solutions" ? "text-gray-900 bg-gray-50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}
          >
            Solutions
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === "solutions" ? "rotate-180" : ""}`} />
          </button>

          {/* Pricing */}
          <a href="/#pricing" onClick={() => setActiveMenu(null)} className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
            Pricing
          </a>

          {/* Resources */}
          <button
            onClick={() => toggle("resources")}
            className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeMenu === "resources" ? "text-gray-900 bg-gray-50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}
          >
            Resources
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === "resources" ? "rotate-180" : ""}`} />
          </button>

          {/* Frameworks */}
          <a href="/#frameworks" onClick={() => setActiveMenu(null)} className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
            Frameworks
          </a>

          {/* Company */}
          <button
            onClick={() => toggle("company")}
            className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeMenu === "company" ? "text-gray-900 bg-gray-50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}
          >
            Company
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === "company" ? "rotate-180" : ""}`} />
          </button>
        </nav>

        {/* Right buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onBooking}
            className="btn-amber text-sm gap-2"
          >
            Get a demo
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Dropdown Panels — Solutions */}
      {activeMenu === "solutions" && (
        <div className="absolute top-full left-0 right-0 z-50 shadow-2xl" style={{ background: "#1e2537" }}>
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-2 gap-12">
              {solutionsMenu.map((col) => (
                <div key={col.heading}>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#3ecfb2" }}>{col.heading}</h3>
                  <p className="text-xs mb-5" style={{ color: "#8b9ab0" }}>{col.description}</p>
                  <ul className="space-y-3">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href="/#features"
                          onClick={() => setActiveMenu(null)}
                          className="flex items-start gap-3 group"
                        >
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(62,207,178,0.1)" }}>
                            <link.icon className="w-4 h-4" style={{ color: "#3ecfb2" }} />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white group-hover:text-[#3ecfb2] transition-colors">{link.label}</div>
                            <div className="text-xs" style={{ color: "#8b9ab0" }}>{link.sub}</div>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Dropdown — Resources */}
      {activeMenu === "resources" && (
        <div className="absolute top-full left-0 right-0 z-50 shadow-2xl" style={{ background: "#1e2537" }}>
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-2 gap-12">
              {resourcesMenu.map((col) => (
                <div key={col.heading}>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#3ecfb2" }}>{col.heading}</h3>
                  <p className="text-xs mb-5" style={{ color: "#8b9ab0" }}>{col.description}</p>
                  <ul className="space-y-3">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <a href="/" onClick={() => setActiveMenu(null)} className="flex items-center gap-3 group">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(62,207,178,0.1)" }}>
                            <link.icon className="w-4 h-4" style={{ color: "#3ecfb2" }} />
                          </div>
                          <span className="text-sm font-semibold text-white group-hover:text-[#3ecfb2] transition-colors">{link.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#3ecfb2" }}>Featured</h3>
                <div className="rounded-xl p-4 border" style={{ background: "rgba(62,207,178,0.05)", borderColor: "rgba(62,207,178,0.15)" }}>
                  <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "#3ecfb2" }}>Whitepaper</div>
                  <div className="text-sm font-semibold text-white mb-2">The State of GRC Automation 2025</div>
                  <div className="text-xs" style={{ color: "#8b9ab0" }}>How AI is reshaping compliance for enterprise teams.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dropdown — Company */}
      {activeMenu === "company" && (
        <div className="absolute top-full left-0 right-0 z-50 shadow-2xl" style={{ background: "#1e2537" }}>
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-2 gap-12">
              {companyMenu.map((col) => (
                <div key={col.heading}>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#3ecfb2" }}>{col.heading}</h3>
                  <p className="text-xs mb-5" style={{ color: "#8b9ab0" }}>{col.description}</p>
                  <ul className="space-y-2">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <a 
                          href={link.href} 
                          onClick={(e) => {
                            if (link.label === "Contact Us" && onContact) {
                              e.preventDefault();
                              onContact();
                            }
                            setActiveMenu(null);
                          }} 
                          className="text-sm font-medium text-white hover:text-[#3ecfb2] transition-colors"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 right-0 lg:hidden bg-white border-t border-gray-100 shadow-2xl z-50 overflow-y-auto max-h-[calc(100vh-4rem)]">
          <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
            <a href="/#features" className="block text-sm font-medium text-gray-700 py-2 border-b border-gray-100" onClick={() => setMobileOpen(false)}>Solutions</a>
            <a href="/#pricing" className="block text-sm font-medium text-gray-700 py-2 border-b border-gray-100" onClick={() => setMobileOpen(false)}>Pricing</a>
            <a href="/#frameworks" className="block text-sm font-medium text-gray-700 py-2 border-b border-gray-100" onClick={() => setMobileOpen(false)}>Frameworks</a>
            <a href="/#how-it-works" className="block text-sm font-medium text-gray-700 py-2 border-b border-gray-100" onClick={() => setMobileOpen(false)}>Resources</a>
            <a href="/about" className="block text-sm font-medium text-gray-700 py-2 border-b border-gray-100" onClick={() => setMobileOpen(false)}>About Us</a>
            <a href="/careers" className="block text-sm font-medium text-gray-700 py-2 border-b border-gray-100" onClick={() => setMobileOpen(false)}>Careers & Openings</a>
            {onContact && (
              <button 
                onClick={() => {
                  setMobileOpen(false);
                  onContact();
                }} 
                className="block w-full text-left text-sm font-medium text-gray-700 py-2 border-b border-gray-100"
              >
                Contact Us
              </button>
            )}
            <div className="flex gap-3 pt-2">
              <button 
                onClick={() => {
                  setMobileOpen(false);
                  onBooking();
                }} 
                className="btn-amber text-sm flex-1 justify-center"
              >
                Get a demo
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
