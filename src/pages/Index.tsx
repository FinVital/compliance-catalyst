import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FounderSection from "@/components/FounderSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import PricingSection from "@/components/PricingSection";
import BottomCTA from "@/components/BottomCTA";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <Hero />
    <FounderSection />
    <div id="features">
      <FeaturesSection />
    </div>
    <div id="how-it-works">
      <HowItWorks />
    </div>
    <div id="pricing">
      <PricingSection />
    </div>
    <BottomCTA />
    <div id="contact">
      <Footer />
    </div>
  </div>
);

export default Index;
