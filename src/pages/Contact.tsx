import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormModal from "@/components/ContactFormModal";
import { 
  Send, User, Mail, Building2, Phone, MessageSquare, 
  CheckCircle2, Loader2, MapPin, Clock, Calendar,
  Linkedin, Twitter, ArrowRight, Shield,
  Globe, ChevronRight
} from "lucide-react";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Talk to an Expert");
  const [modalDesc, setModalDesc] = useState("We'll get back to you within 24 hours.");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [activeField, setActiveField] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Contact ReguLattice | RegTech Pakistan & AI Powered Compliance Support";
  }, []);

  const openBooking = () => {
    setModalTitle("Book a Live Demo");
    setModalDesc("We will response within an hour.");
    setContactModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    let geoIp = null;
    let geoLoc = null;
    try {
      const geoResp = await fetch("/api/geo");
      if (geoResp.ok) {
        const geoData = await geoResp.json();
        geoIp = geoData.ip || null;
        geoLoc = `${geoData.city || ""}, ${geoData.region || ""}, ${geoData.country_name || ""}`.trim().replace(/^,|,$/g, "").trim() || null;
      }
    } catch (err) {
      console.error("Geo fetch failed:", err);
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, phone, message, ip: geoIp, location: geoLoc }),
      });
      const data = await response.json();
      if (response.ok && data?.success === true) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setCompany("");
    setPhone("");
    setMessage("");
    setStatus("idle");
  };

  return (
    <div className="min-h-screen bg-[#0d111c] text-white flex flex-col justify-between overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar onBooking={openBooking} onContact={() => setContactModalOpen(true)} />

      <style>{`
        @keyframes float-y {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes typing-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .float-slow { animation: float-y 8s ease-in-out infinite; }
        .float-medium { animation: float-y 6s ease-in-out infinite 1s; }
        .float-fast { animation: float-y 5s ease-in-out infinite 2s; }
        .gradient-animate {
          background-size: 200% 200%;
          animation: gradient-shift 4s ease infinite;
        }
        .form-field-glow {
          transition: all 0.3s ease;
        }
        .form-field-glow:focus-within {
          box-shadow: 0 0 0 2px rgba(62, 207, 178, 0.15), 0 0 20px rgba(62, 207, 178, 0.05);
          border-color: rgba(62, 207, 178, 0.5);
        }
      `}</style>

      {/* ──────────────────────────────────────────────────────────────── */}
      {/*  HERO SECTION                                                   */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-8 overflow-hidden bg-[#0d111c]">
        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(rgba(62,207,178,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(62,207,178,0.012) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
        {/* Glow orbs */}
        <div className="absolute top-20 right-1/4 w-[500px] h-[300px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(62,207,178,0.04) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[250px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.03) 0%, transparent 70%)" }} />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div 
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest mb-6"
              style={{ background: "rgba(62,207,178,0.08)", borderColor: "rgba(62,207,178,0.2)", color: "#7ee8d5" }}
            >
              <MessageSquare className="w-3 h-3 text-[#3ecfb2]" /> Get In Touch
            </div>
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight mb-5 text-white uppercase"
              style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
            >
              Let's Build Your <br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #3ecfb2, #2563eb)" }}>
                Compliance Future
              </span>
            </h1>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Whether you're exploring GRC automation or ready to deploy, our compliance architects are here to help you every step of the way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────── */}
      {/*  MAIN CONTENT: Split Layout                                     */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <section className="py-12 pb-24 bg-[#0d111c] relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-6xl mx-auto">

            {/* ── LEFT PANEL: Info & Quick Actions (2 cols) ── */}
            <div className="lg:col-span-2 space-y-6">

              {/* Response Commitment Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="rounded-2xl border p-6 relative overflow-hidden group"
                style={{ background: "linear-gradient(135deg, rgba(62,207,178,0.06) 0%, rgba(13,17,28,0.98) 100%)", borderColor: "rgba(62,207,178,0.15)" }}
              >
                <div className="absolute top-4 right-4">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-[#3ecfb2]" />
                    <div className="absolute inset-0 w-3 h-3 rounded-full bg-[#3ecfb2]" style={{ animation: "pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite" }} />
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(62,207,178,0.1)" }}>
                    <Clock className="w-5 h-5 text-[#3ecfb2]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>Quick Response Guaranteed</h3>
                    <p className="text-xs text-slate-500" style={{ fontFamily: "'Inter', sans-serif" }}>Our team is currently online</p>
                  </div>
                </div>
                <p className="text-[15px] font-bold text-[#3ecfb2] leading-snug" style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>
                  We will respond within an hour
                </p>
                <p className="text-[11px] text-slate-500 mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>Mon–Fri, 9 AM – 6 PM PKT</p>
              </motion.div>

              {/* Quick Action Cards */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="space-y-3"
              >
                {/* Book a Demo */}
                <button
                  onClick={openBooking}
                  className="w-full rounded-2xl border p-5 text-left group hover:border-[#3ecfb2]/30 transition-all duration-300 flex items-center gap-4"
                  style={{ background: "#141927", borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 gradient-animate" style={{ background: "linear-gradient(135deg, #3ecfb2, #2563eb)" }}>
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white group-hover:text-[#3ecfb2] transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>Book a Live Demo</h4>
                    <p className="text-xs text-slate-500 mt-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>15-minute personalized walkthrough</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-[#3ecfb2] group-hover:translate-x-1 transition-all" />
                </button>

                {/* Start Assessment */}
                <a
                  href="/assessment"
                  className="w-full rounded-2xl border p-5 text-left group hover:border-blue-500/30 transition-all duration-300 flex items-center gap-4 block"
                  style={{ background: "#141927", borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300" style={{ background: "rgba(59,130,246,0.15)" }}>
                    <Shield className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>Free Compliance Assessment</h4>
                    <p className="text-xs text-slate-500 mt-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>AI-powered gap analysis in minutes</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </a>
              </motion.div>

              {/* Contact Info Cards */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="rounded-2xl border p-6 space-y-5"
                style={{ background: "#141927", borderColor: "rgba(255,255,255,0.06)" }}
              >
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest" style={{ fontFamily: "'Inter', sans-serif" }}>Direct Contact</h3>
                
                <div className="space-y-4">
                  <a href="mailto:info@regulattice.com" className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(62,207,178,0.08)" }}>
                      <Mail className="w-4 h-4 text-[#3ecfb2]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white group-hover:text-[#3ecfb2] transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>info@regulattice.com</p>
                      <p className="text-[10px] text-slate-500" style={{ fontFamily: "'Inter', sans-serif" }}>General inquiries</p>
                    </div>
                  </a>

                  <a href="tel:+923346250250" className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(59,130,246,0.08)" }}>
                      <Phone className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>+92 334 6250250</p>
                      <p className="text-[10px] text-slate-500" style={{ fontFamily: "'Inter', sans-serif" }}>Mon–Fri, 9AM–6PM PKT</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(168,85,247,0.08)" }}>
                      <MapPin className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white" style={{ fontFamily: "'Inter', sans-serif" }}>271 BMCHS Rd. 18 Karachi, Pakistan</p>
                      <p className="text-[10px] text-slate-500" style={{ fontFamily: "'Inter', sans-serif" }}>Head Office</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-4 border-t border-slate-800/60">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Follow Us</p>
                  <div className="flex gap-3">
                    <a href="#" className="w-9 h-9 rounded-lg border border-slate-800 flex items-center justify-center hover:border-[#3ecfb2]/40 hover:bg-[#3ecfb2]/5 transition-all group">
                      <Linkedin className="w-4 h-4 text-slate-500 group-hover:text-[#3ecfb2] transition-colors" />
                    </a>
                    <a href="#" className="w-9 h-9 rounded-lg border border-slate-800 flex items-center justify-center hover:border-[#3ecfb2]/40 hover:bg-[#3ecfb2]/5 transition-all group">
                      <Twitter className="w-4 h-4 text-slate-500 group-hover:text-[#3ecfb2] transition-colors" />
                    </a>
                    <a href="#" className="w-9 h-9 rounded-lg border border-slate-800 flex items-center justify-center hover:border-[#3ecfb2]/40 hover:bg-[#3ecfb2]/5 transition-all group">
                      <Globe className="w-4 h-4 text-slate-500 group-hover:text-[#3ecfb2] transition-colors" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT PANEL: Contact Form (3 cols) ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="lg:col-span-3"
            >
              <div 
                className="rounded-3xl border p-8 md:p-10 relative overflow-hidden"
                style={{ background: "linear-gradient(180deg, #141927 0%, #111625 100%)", borderColor: "rgba(255,255,255,0.06)" }}
              >
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none" style={{ background: "radial-gradient(circle at top right, rgba(62,207,178,0.06) 0%, transparent 70%)" }} />
                <div className="absolute bottom-0 left-0 w-40 h-40 pointer-events-none" style={{ background: "radial-gradient(circle at bottom left, rgba(37,99,235,0.04) 0%, transparent 70%)" }} />

                {/* Form Header */}
                <div className="mb-8 relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(62,207,178,0.1)" }}>
                      <Send className="w-5 h-5 text-[#3ecfb2]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>Send Us a Message</h2>
                      <p className="text-xs text-slate-500" style={{ fontFamily: "'Inter', sans-serif" }}>We'll respond within an hour</p>
                    </div>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center py-12 relative z-10"
                    >
                      <div className="relative inline-block mb-6">
                        <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "rgba(62,207,178,0.1)" }}>
                          <CheckCircle2 className="w-10 h-10 text-[#3ecfb2]" />
                        </div>
                        <div className="absolute inset-0 w-20 h-20 rounded-full border border-[#3ecfb2]/30" style={{ animation: "pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite" }} />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Plus Jakarta Sans'" }}>Message Sent!</h3>
                      <p className="text-slate-400 text-sm mb-8 max-w-sm mx-auto">
                        Thanks {name}! Our compliance architects will review your inquiry and get back to you shortly.
                      </p>
                      <button
                        onClick={resetForm}
                        className="px-6 py-3 rounded-xl border border-slate-700 hover:border-[#3ecfb2]/40 text-white font-semibold text-sm transition-all hover:bg-[#3ecfb2]/5"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-5 relative z-10"
                    >
                      {/* Name & Email Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                            Full Name <span className="text-[#3ecfb2]">*</span>
                          </label>
                          <div 
                            className={`relative rounded-xl border form-field-glow ${activeField === 'name' ? 'border-[#3ecfb2]/50' : 'border-slate-800'}`}
                            style={{ background: "rgba(13,17,28,0.6)" }}
                          >
                            <User className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${activeField === 'name' ? 'text-[#3ecfb2]' : 'text-slate-600'}`} />
                            <input
                              type="text"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              onFocus={() => setActiveField('name')}
                              onBlur={() => setActiveField(null)}
                              placeholder="John Doe"
                              className="w-full pl-11 pr-4 py-3 bg-transparent text-sm text-white placeholder:text-slate-600 focus:outline-none"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                            Work Email <span className="text-[#3ecfb2]">*</span>
                          </label>
                          <div 
                            className={`relative rounded-xl border form-field-glow ${activeField === 'email' ? 'border-[#3ecfb2]/50' : 'border-slate-800'}`}
                            style={{ background: "rgba(13,17,28,0.6)" }}
                          >
                            <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${activeField === 'email' ? 'text-[#3ecfb2]' : 'text-slate-600'}`} />
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              onFocus={() => setActiveField('email')}
                              onBlur={() => setActiveField(null)}
                              placeholder="john@company.com"
                              className="w-full pl-11 pr-4 py-3 bg-transparent text-sm text-white placeholder:text-slate-600 focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Company & Phone Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                            Company
                          </label>
                          <div 
                            className={`relative rounded-xl border form-field-glow ${activeField === 'company' ? 'border-[#3ecfb2]/50' : 'border-slate-800'}`}
                            style={{ background: "rgba(13,17,28,0.6)" }}
                          >
                            <Building2 className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${activeField === 'company' ? 'text-[#3ecfb2]' : 'text-slate-600'}`} />
                            <input
                              type="text"
                              value={company}
                              onChange={(e) => setCompany(e.target.value)}
                              onFocus={() => setActiveField('company')}
                              onBlur={() => setActiveField(null)}
                              placeholder="Acme Corp"
                              className="w-full pl-11 pr-4 py-3 bg-transparent text-sm text-white placeholder:text-slate-600 focus:outline-none"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                            Phone / WhatsApp
                          </label>
                          <div 
                            className={`relative rounded-xl border form-field-glow ${activeField === 'phone' ? 'border-[#3ecfb2]/50' : 'border-slate-800'}`}
                            style={{ background: "rgba(13,17,28,0.6)" }}
                          >
                            <Phone className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${activeField === 'phone' ? 'text-[#3ecfb2]' : 'text-slate-600'}`} />
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              onFocus={() => setActiveField('phone')}
                              onBlur={() => setActiveField(null)}
                              placeholder="+92 300 1234567"
                              className="w-full pl-11 pr-4 py-3 bg-transparent text-sm text-white placeholder:text-slate-600 focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                          How can we help? <span className="text-[#3ecfb2]">*</span>
                        </label>
                        <div 
                          className={`relative rounded-xl border form-field-glow ${activeField === 'message' ? 'border-[#3ecfb2]/50' : 'border-slate-800'}`}
                          style={{ background: "rgba(13,17,28,0.6)" }}
                        >
                          <textarea
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onFocus={() => setActiveField('message')}
                            onBlur={() => setActiveField(null)}
                            rows={5}
                            placeholder="Tell us about your compliance goals, team size, frameworks you need, and timeline..."
                            className="w-full px-4 py-3 bg-transparent text-sm text-white placeholder:text-slate-600 focus:outline-none resize-none"
                          />
                        </div>
                      </div>

                      {/* Quick Topic Chips */}
                      <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Common Topics</p>
                        <div className="flex flex-wrap gap-2">
                          {topicChips.map((topic) => (
                            <button
                              key={topic}
                              type="button"
                              onClick={() => setMessage(prev => prev ? `${prev}\n${topic}` : topic)}
                              className="px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] font-semibold text-slate-400 hover:border-[#3ecfb2]/30 hover:text-[#3ecfb2] hover:bg-[#3ecfb2]/5 transition-all"
                            >
                              {topic}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Error */}
                      {status === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
                        >
                          Something went wrong. Please try again or reach out directly via email.
                        </motion.div>
                      )}

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer relative overflow-hidden group"
                        style={{
                          background: "linear-gradient(135deg, #3ecfb2, #2aac96)",
                          color: "#0d111c",
                          boxShadow: "0 4px 20px rgba(62,207,178,0.2)",
                        }}
                      >
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {status === "sending" ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Send Message</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>

                      {/* Privacy note */}
                      <p className="text-[10px] text-slate-600 text-center">
                        By submitting, you agree to our <a href="#" className="text-slate-400 hover:text-[#3ecfb2] underline">Privacy Policy</a>. We'll never share your data.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────── */}
      {/*  TRUST SIGNALS / FAQ STRIP                                      */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#111625] border-t border-slate-800/40">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="text-[#3ecfb2] font-bold uppercase tracking-wider text-xs block mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>Frequently Asked</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>
              Common Questions
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {faqItems.map((item, idx) => (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="rounded-2xl border p-6 hover:border-[#3ecfb2]/20 transition-all group"
                style={{ background: "#1e2538", borderColor: "rgba(255,255,255,0.06)" }}
              >
                <h4 className="text-sm font-bold text-white mb-2 group-hover:text-[#3ecfb2] transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {item.q}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────── */}
      {/*  BOTTOM CTA                                                     */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#0d111c] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(62,207,178,0.04) 0%, transparent 70%)" }} />
        <div className="container mx-auto px-6 text-center relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-10 md:p-14 border relative overflow-hidden"
            style={{ background: "#1e2538", borderColor: "rgba(255,255,255,0.08)" }}
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#3ecfb2]/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />
            
            <h2 className="text-2xl md:text-4xl font-black text-white mb-4 uppercase relative z-10" style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>
              Prefer a live conversation?
            </h2>
            <p className="text-slate-400 text-sm md:text-base mb-8 max-w-lg mx-auto relative z-10">
              Schedule a 15-minute call with our compliance architect. No sales pitch — just honest answers about your GRC challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
              <button 
                onClick={openBooking} 
                className="px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all"
                style={{ background: "linear-gradient(135deg, #3ecfb2, #2aac96)", color: "#0d111c", boxShadow: "0 4px 20px rgba(62,207,178,0.2)" }}
              >
                Book a Call Now
              </button>
              <a href="/assessment" className="flex items-center gap-2 font-semibold text-[#3ecfb2] hover:text-[#7ee8d5] transition-colors text-sm">
                Start Free Assessment <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer onContact={() => setContactModalOpen(true)} />
      <ContactFormModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} title={modalTitle} description={modalDesc} />
    </div>
  );
}

/* ─── DATA ────────────────────────────────────────────────────────────── */

const topicChips = [
  "SOC 2 Readiness",
  "ISO 27001 Certification",
  "SAMA Compliance",
  "AI GRC Automation",
  "Pricing Inquiry",
  "Partnership",
];

const faqItems = [
  {
    q: "How quickly can I get started with ReguLattice?",
    a: "Most customers are up and running within 48 hours. Our air-gapped deployment requires minimal configuration, and our onboarding team handles the heavy lifting.",
  },
  {
    q: "Do you offer a free trial or pilot program?",
    a: "Yes! We offer a free compliance assessment and a 14-day pilot program so you can experience the platform with your own data before committing.",
  },
  {
    q: "Which frameworks do you support?",
    a: "We support ISO 27001, SOC 2, SAMA CSF, NIST CSF, PCI-DSS, HIPAA, and more. Our platform continuously adds new frameworks based on customer demand.",
  },
  {
    q: "Is my data secure with ReguLattice?",
    a: "Absolutely. ReguLattice is 100% air-gapped and deploys on your infrastructure. Your data never leaves your corporate boundary — zero cloud dependency.",
  },
  {
    q: "Can I schedule a call instead of filling the form?",
    a: "Of course! Click the 'Book a Live Demo' button above to schedule a 15-minute call with our compliance architects at a time that works for you.",
  },
  {
    q: "Do you support enterprise and startup plans?",
    a: "Yes, we have flexible pricing for startups, mid-market, and enterprise. Contact us with your team size and requirements for a custom quote.",
  },
];
