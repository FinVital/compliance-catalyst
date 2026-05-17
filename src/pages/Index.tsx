import { useState } from "react";
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

  const openBooking = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: "https://calendly.com/moazzamwaheed/15min",
      });
    }
  };

  const openContact = () => setContactOpen(true);

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar onBooking={openBooking} />
      <Hero onBooking={openBooking} onContact={openContact} />
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
      <BottomCTA onBooking={openBooking} onContact={openContact} />
      <Footer />

      <ContactFormModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
};

export default Index;
