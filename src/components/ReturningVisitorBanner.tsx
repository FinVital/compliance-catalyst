import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, X, ShieldAlert, CheckCircle2 } from "lucide-react";

interface ReturningVisitorBannerProps {
  geoData: { ip: string | null; location: string | null };
}

export default function ReturningVisitorBanner({ geoData }: ReturningVisitorBannerProps) {
  const [visitorInfo, setVisitorInfo] = useState<{
    name: string | null;
    email: string | null;
    visitCount: number;
  } | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const visitorId = localStorage.getItem("rl_visitor_id");
    if (!visitorId) return;

    // Log return session and fetch details
    const registerReturnVisit = async () => {
      try {
        const res = await fetch("/api/visitor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            visitorId,
            ip: geoData.ip,
            location: geoData.location,
            page: "home",
            referrer: document.referrer || null,
            userAgent: navigator.userAgent,
          }),
        });
        const data = await res.json();
        if (data.success) {
          setVisitorInfo({
            name: data.name,
            email: data.email,
            visitCount: data.visitCount,
          });
          // Show the banner shortly after loading if we have their details or multiple visits
          setTimeout(() => setVisible(true), 1500);
        }
      } catch (err) {
        console.error("Failed to log return visit:", err);
      }
    };

    registerReturnVisit();
  }, [geoData]);

  if (!visitorInfo) return null;

  const displayName = visitorInfo.name ? visitorInfo.name.split(" ")[0] : "Friend";
  const hasProvidedDetails = !!visitorInfo.email;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-[100] max-w-md w-full p-1 rounded-2xl shadow-2xl backdrop-blur-md overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(62, 207, 178, 0.15) 0%, rgba(30, 64, 175, 0.15) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div className="relative p-5 rounded-[14px] overflow-hidden" style={{ background: "#0b0f19" }}>
            {/* Background glowing gradients */}
            <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-blue-500/10 blur-xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-teal-500/10 blur-xl pointer-events-none" />

            <button
              onClick={() => setVisible(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(62, 207, 178, 0.1)", border: "1px solid rgba(62, 207, 178, 0.2)" }}>
                <Sparkles className="w-6 h-6" style={{ color: "#3ecfb2" }} />
              </div>

              <div className="flex-1 pr-6">
                <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#3ecfb2" }}>
                  Welcome Back!
                </p>
                <h4 className="text-white font-bold text-base leading-tight mb-1">
                  Great to see you again, {displayName}!
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed mb-3">
                  This is your <span className="text-white font-semibold">visit #{visitorInfo.visitCount}</span>. 
                  {hasProvidedDetails 
                    ? "Ready to schedule your customized ISO 27001 assessment?" 
                    : "Unlock your free compliance dashboard to track your readiness score."
                  }
                </p>

                <div className="flex gap-2">
                  {hasProvidedDetails ? (
                    <a
                      href="#booking"
                      onClick={() => setVisible(false)}
                      className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-all bg-blue-600 hover:bg-blue-500 cursor-pointer"
                    >
                      Book 1-on-1 Call <ArrowRight className="w-3 h-3" />
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        setVisible(false);
                        // Trigger the Lead capture popup by clearing POPUP_SHOWN_KEY and reloading/showing it
                        localStorage.removeItem("rl_popup_shown");
                        window.dispatchEvent(new Event("trigger_lead_popup"));
                      }}
                      className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-all bg-teal-500 hover:bg-teal-400 cursor-pointer"
                    >
                      Unlock Free Access <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                  <button
                    onClick={() => setVisible(false)}
                    className="text-xs text-slate-400 hover:text-white px-3 py-1.5 transition-colors"
                  >
                    Maybe later
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
