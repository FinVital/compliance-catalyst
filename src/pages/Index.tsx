import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import IntegrationStrip from "@/components/IntegrationStrip";
import ProblemSolutionSection from "@/components/ProblemSolutionSection";
import SevenAgentsSection from "@/components/SevenAgentsSection";
import FeaturesSection from "@/components/FeaturesSection";
import FrameworksSection from "@/components/FrameworksSection";
import UseCasesSection from "@/components/UseCasesSection";
import BottomCTA from "@/components/BottomCTA";
import Footer from "@/components/Footer";
import ContactFormModal from "@/components/ContactFormModal";
import LeadCapturePopup from "@/components/LeadCapturePopup";
import ReturningVisitorBanner from "@/components/ReturningVisitorBanner";
import { initPixel, trackPageview, trackPixelEvent } from "@/lib/pixels";
import { initGA, trackGAPageview, trackGAEvent } from "@/lib/google-analytics";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
    };
  }
}

const Index = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Talk to an Expert");
  const [modalDesc, setModalDesc] = useState("We'll get back to you within 24 hours.");
  const [geoData, setGeoData] = useState<{ ip: string | null; location: string | null }>({
    ip: null,
    location: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize Pixel and track page view
    initPixel();
    trackPageview();

    // Initialize Google Analytics and track page view
    initGA();
    trackGAPageview();

    // Fetch visitor IP and location via server-side proxy (avoids CORS)
    fetch("/api/geo")
      .then((res) => res.json())
      .then((data) => {
        const { ip, city, region, country_name } = data;
        const location = `${city || ""}, ${region || ""}, ${country_name || ""}`.trim().replace(/^,|,$/g, "");
        
        setGeoData({ ip: ip || null, location: location || null });

        // Record page visit in Turso DB with IP and Location
        fetch("/api/visit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            page: "home", 
            ip: ip || "Unknown", 
            location: location || "Unknown" 
          }),
        }).catch((err) => console.error("Failed to track visit:", err));
      })
      .catch((err) => {
        console.error("Failed to get geo info:", err);
        // Fallback without geo info
        fetch("/api/visit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ page: "home" }),
        }).catch((err) => console.error("Failed to track visit:", err));
      });
  }, []);

  const openBooking = () => {
    trackPixelEvent("ClickCTA", { label: "Book Call", location: "Demo Modal" });
    trackGAEvent("click_cta", { label: "Book Call", location: "Demo Modal" });
    setModalTitle("Book a Live Demo");
    setModalDesc("We will respond within an hour.");
    setContactOpen(true);
  };

  const openContact = () => {
    trackPixelEvent("ClickCTA", { label: "Talk to Expert" });
    trackGAEvent("click_cta", { label: "Talk to Expert" });
    setModalTitle("Talk to an Expert");
    setModalDesc("We'll get back to you within 24 hours.");
    setContactOpen(true);
  };

  const openAssessment = () => {
    trackPixelEvent("ClickCTA", { label: "Get a demo / Start Assessment" });
    trackGAEvent("click_cta", { label: "Get a demo / Start Assessment" });
    navigate("/assessment");
  };

  return (
    <div className="min-h-screen bg-[#F0F6F8]">
      <SEO 
        title="ReguLattice AI Governance Platform — Autonomous Control & Residency"
        description="ReguLattice is the autonomous AI governance platform providing zero-touch footprint tracking, host-based inference routing (Ollama), and continuous audit validation."
      />
      <Navbar onBooking={openBooking} onContact={openContact} />
      
      {/* 1. Hero Section */}
      <Hero onBooking={openBooking} onContact={openContact} />
      
      {/* 2. Integration Logos Strip */}
      <IntegrationStrip />

      {/* 3. Problem & Solution Pipeline */}
      <ProblemSolutionSection />

      {/* 4. Seven Autonomous Agents, One Loop */}
      <div id="pillars">
        <SevenAgentsSection />
      </div>

      {/* 5. Platform Core Capabilities */}
      <div id="features">
        <FeaturesSection />
      </div>

      {/* 6. Global Standards Frameworks */}
      <div id="frameworks">
        <FrameworksSection />
      </div>

      {/* 7. Stakeholder Use Cases */}
      <UseCasesSection />

      {/* 8. Bottom CTA Banner */}
      <BottomCTA onBooking={openAssessment} onContact={openContact} />

      {/* 9. Footer */}
      <Footer onContact={openContact} />

      <ContactFormModal isOpen={contactOpen} onClose={() => setContactOpen(false)} title={modalTitle} description={modalDesc} />
      
      {/* Lead Capture & Retention Components */}
      <LeadCapturePopup geoData={geoData} />
      <ReturningVisitorBanner geoData={geoData} />
    </div>
  );
};

export default Index;
