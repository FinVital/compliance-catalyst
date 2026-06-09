import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Building2, Phone, Shield, ArrowRight, Loader2, CheckCircle2, Gift, Heart, Sparkles } from "lucide-react";
import { trackPixelEvent } from "@/lib/pixels";
import { trackGAEvent } from "@/lib/google-analytics";

const STORAGE_KEY = "rl_visitor_id";
const POPUP_SHOWN_KEY = "rl_popup_shown";

interface LeadCapturePopupProps {
  geoData: { ip: string | null; location: string | null };
}

type Status = "idle" | "sending" | "success";
type Step = "welcome" | "form";

export default function LeadCapturePopup({ geoData }: LeadCapturePopupProps) {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<Step>("welcome");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const handleTrigger = () => {
      setStep("form"); // Direct form if triggered manually
      setVisible(true);
    };
    window.addEventListener("trigger_lead_popup", handleTrigger);

    // Only show for brand-new visitors who haven't seen the popup
    const alreadyShown = localStorage.getItem(POPUP_SHOWN_KEY);
    const existingId = localStorage.getItem(STORAGE_KEY);

    if (alreadyShown || existingId) {
      return () => {
        window.removeEventListener("trigger_lead_popup", handleTrigger);
      };
    }

    // Show after 6 seconds
    const timer = setTimeout(() => {
      setStep("welcome");
      setVisible(true);
    }, 6000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("trigger_lead_popup", handleTrigger);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem(POPUP_SHOWN_KEY, "true");

    // Register as anonymous visitor so we don't keep showing the popup
    registerAnonymous();
  };

  const registerAnonymous = async () => {
    try {
      const res = await fetch("/api/visitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ip: geoData.ip,
          location: geoData.location,
          page: "home",
          referrer: document.referrer || null,
          userAgent: navigator.userAgent,
        }),
      });
      const data = await res.json();
      if (data.visitorId) {
        localStorage.setItem(STORAGE_KEY, data.visitorId);
      }
    } catch (err) {
      console.error("Failed to register anonymous visitor:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/visitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          phone,
          ip: geoData.ip,
          location: geoData.location,
          page: "home",
          referrer: document.referrer || null,
          userAgent: navigator.userAgent,
        }),
      });
      const data = await res.json();

      if (data.visitorId) {
        localStorage.setItem(STORAGE_KEY, data.visitorId);
        localStorage.setItem(POPUP_SHOWN_KEY, "true");
      }

      trackPixelEvent("Lead", { type: "Welcome Pack Popup", company, email });
      trackGAEvent("generate_lead", { type: "Welcome Pack Popup", company });
      setStatus("success");

      // Auto-close after 2.5s
      setTimeout(() => setVisible(false), 2500);
    } catch (err) {
      console.error("Lead capture failed:", err);
      setStatus("idle");
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-md"
            onClick={dismiss}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-md rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(62,207,178,0.15)]" style={{ background: "#0b0f19", border: "1px solid rgba(255,255,255,0.08)" }}>

              {/* Glowing header bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-600" />

              {/* Close Button */}
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={dismiss}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content Panel */}
              <div className="p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 blur-2xl rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 blur-2xl rounded-full pointer-events-none" />

                <AnimatePresence mode="wait">
                  {step === "welcome" ? (
                    <motion.div
                      key="welcome"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      className="text-center py-4"
                    >
                      <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center bg-gradient-to-tr from-emerald-500/10 to-teal-500/20 border border-emerald-500/30">
                        <Heart className="w-8 h-8 text-emerald-400 fill-emerald-400/20 animate-pulse" />
                      </div>

                      <h3 className="text-white font-extrabold text-2xl tracking-tight mb-2">
                        We Appreciate You! 🌟
                      </h3>
                      
                      <p className="text-sm text-slate-300 leading-relaxed mb-6 px-2">
                        Thank you for visiting ReguLattice. We are thrilled to welcome you to the future of autonomous GRC. 
                        To show our gratitude, we've unlocked a complimentary <strong className="text-emerald-400">ISO 27001 Readiness Plan</strong> and expert checklist.
                      </p>

                      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6 flex gap-3 text-left">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-400/10 border border-emerald-400/20 shrink-0">
                          <Gift className="w-4.5 h-4.5 text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white uppercase tracking-wider">Free Gift Included</p>
                          <p className="text-xs text-slate-400">Complete template library & initial roadmap score.</p>
                        </div>
                      </div>

                      <button
                        onClick={() => setStep("form")}
                        className="w-full flex items-center justify-center gap-2 rounded-xl font-bold py-3.5 px-6 text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer text-sm"
                      >
                        Claim My Welcome Pack <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={dismiss}
                        className="mt-4 text-xs text-slate-500 hover:text-slate-400 transition-colors"
                      >
                        No thanks, just browsing
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      {status === "success" ? (
                        <div className="text-center py-8">
                          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-emerald-500/10 border border-emerald-500/20">
                            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                          </div>
                          <h4 className="text-white font-bold text-xl mb-2">Welcome Aboard! 🎉</h4>
                          <p className="text-sm text-slate-400 px-4">
                            We've saved your details! Your customized GRC readiness package is being prepared.
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-500/10 border border-emerald-500/20 shrink-0">
                              <Sparkles className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Step 2 of 2</p>
                              <h3 className="text-white font-bold text-lg">Where should we send your pack?</h3>
                            </div>
                          </div>

                          <form onSubmit={handleSubmit} className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                                <input
                                  type="text"
                                  required
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  placeholder="Full name"
                                  className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm text-white placeholder:text-slate-500 bg-white/5 border border-white/10 focus:border-emerald-500 focus:outline-none transition-all"
                                />
                              </div>
                              <div className="relative">
                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                                <input
                                  type="text"
                                  value={company}
                                  onChange={(e) => setCompany(e.target.value)}
                                  placeholder="Company"
                                  className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm text-white placeholder:text-slate-500 bg-white/5 border border-white/10 focus:border-emerald-500 focus:outline-none transition-all"
                                />
                              </div>
                            </div>

                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                              <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Work email address"
                                className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm text-white placeholder:text-slate-500 bg-white/5 border border-white/10 focus:border-emerald-500 focus:outline-none transition-all"
                              />
                            </div>

                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                              <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Phone / WhatsApp (optional)"
                                className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm text-white placeholder:text-slate-500 bg-white/5 border border-white/10 focus:border-emerald-500 focus:outline-none transition-all"
                              />
                            </div>

                            <button
                              type="submit"
                              disabled={status === "sending"}
                              className="w-full flex items-center justify-center gap-2 rounded-xl font-bold py-3 text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 transition-all disabled:opacity-60 cursor-pointer text-sm"
                            >
                              {status === "sending" ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                              ) : (
                                <>Get My Welcome Pack <ArrowRight className="w-4 h-4" /></>
                              )}
                            </button>

                            <p className="text-center text-[10px] text-slate-500">
                              🔒 Your data stays private. Unsubscribe anytime.
                            </p>
                          </form>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
