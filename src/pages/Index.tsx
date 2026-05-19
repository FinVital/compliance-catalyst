import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import IntegrationStrip from "@/components/IntegrationStrip";
import FounderSection from "@/components/FounderSection";
import FeaturesSection from "@/components/FeaturesSection";
import FrameworksSection from "@/components/FrameworksSection";
import HowItWorks from "@/components/HowItWorks";
import UseCasesSection from "@/components/UseCasesSection";
import PricingSection from "@/components/PricingSection";
import BottomCTA from "@/components/BottomCTA";
import Footer from "@/components/Footer";
import ContactFormModal from "@/components/ContactFormModal";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
    };
  }
}

const Index = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Record page visit in Turso DB
    fetch("/api/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: "home" }),
    }).catch((err) => console.error("Failed to track visit:", err));
  }, []);

  const openBooking = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: "https://calendly.com/moazzamwaheed/15min",
      });
    }
  };

  const openContact = () => setContactOpen(true);
  const openAssessment = () => navigate("/assessment");

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar onBooking={openBooking} />
      <Hero onBooking={openAssessment} onContact={openContact} />
      <IntegrationStrip />
      <div id="features">
        <FeaturesSection />
      </div>
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <div id="frameworks">
        <FrameworksSection />
      </div>
      <FounderSection />
      <UseCasesSection />
      <div id="pricing">
        <PricingSection onBooking={openBooking} />
      </div>
      <BottomCTA onBooking={openAssessment} onContact={openContact} />
      <Footer onContact={openContact} />

      <ContactFormModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
};

export default Index;
