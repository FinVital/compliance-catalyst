import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormModal from "@/components/ContactFormModal";

export default function Careers() {
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openBooking = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: "https://calendly.com/moazzamwaheed/15min",
      });
    }
  };

  const openContact = () => {
    setContactOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      <Navbar onBooking={openBooking} onContact={openContact} />

      {/* Centered Coming Soon message */}
      <main className="flex-1 flex flex-col items-center justify-center py-48 px-6 relative overflow-hidden bg-slate-50/30">
        {/* Subtle grid background for light theme */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(15,46,92,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(15,46,92,0.02) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Subtle cyan glow orb for light theme */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(37,99,235,0.03) 0%, transparent 70%)" }} />

        <div className="relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-[#0f2e5c] tracking-tight">
            Will open positions coming soon
          </h1>
        </div>
      </main>

      <Footer onContact={openContact} />
      <ContactFormModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
