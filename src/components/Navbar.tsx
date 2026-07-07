import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, Menu, Shield, FileText, BarChart3, Globe, Cpu, Users, BookOpen, MessageSquare, Award, Map, Lock, Bot, Heart } from "lucide-react";

// Removed solutionsMenu and resourcesMenu arrays

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
          {/* Home */}
          <a href="/" onClick={() => setActiveMenu(null)} className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
            Home
          </a>

          {/* Pricing */}
          <a href="/#pricing" onClick={() => setActiveMenu(null)} className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
            Pricing
          </a>

          {/* How It Works */}
          <a href="/#how-it-works" onClick={() => setActiveMenu(null)} className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
            How It Works
          </a>

          {/* Frameworks */}
          <a href="/#frameworks" onClick={() => setActiveMenu(null)} className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
            Frameworks
          </a>
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

      {/* Solutions, Resources, and Company menus removed */}

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 right-0 lg:hidden bg-white border-t border-gray-100 shadow-2xl z-50 overflow-y-auto max-h-[calc(100vh-4rem)]">
          <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
            <a href="/" className="block text-sm font-medium text-gray-700 py-2 border-b border-gray-100" onClick={() => setMobileOpen(false)}>Home</a>
            <a href="/#pricing" className="block text-sm font-medium text-gray-700 py-2 border-b border-gray-100" onClick={() => setMobileOpen(false)}>Pricing</a>
            <a href="/#how-it-works" className="block text-sm font-medium text-gray-700 py-2 border-b border-gray-100" onClick={() => setMobileOpen(false)}>How It Works</a>
            <a href="/#frameworks" className="block text-sm font-medium text-gray-700 py-2 border-b border-gray-100" onClick={() => setMobileOpen(false)}>Frameworks</a>
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
