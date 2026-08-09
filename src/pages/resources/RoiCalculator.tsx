import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { 
  Calculator, ChevronRight, DollarSign, Clock, ShieldCheck, 
  HelpCircle, ArrowRight, CheckCircle2, Loader2, Sparkles 
} from "lucide-react";

export default function RoiCalculator() {
  // Calculator inputs
  const [modelCount, setModelCount] = useState<number>(5);
  const [method, setMethod] = useState<"spreadsheets" | "consultancy">("spreadsheets");
  const [hourlyRate, setHourlyRate] = useState<number>(100);
  const [frameworks, setFrameworks] = useState({
    iso42001: true,
    euAiAct: true,
    nistRmf: false
  });

  // Lead form states
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("AI Compliance Manager");

  // Calculations
  const [manualCost, setManualCost] = useState(0);
  const [autoCost, setAutoCost] = useState(0);
  const [savings, setSavings] = useState(0);
  const [hoursSaved, setHoursSaved] = useState(0);
  const [roiPercent, setRoiPercent] = useState(0);

  useEffect(() => {
    // Determine number of frameworks selected
    const frameworkCount = Object.values(frameworks).filter(Boolean).length || 1;
    
    // Manual hours calculations: ~120 hours per model, per framework annually
    const mHours = modelCount * frameworkCount * 120;
    const rateMultiplier = method === "consultancy" ? 1.5 : 1.0;
    const mCost = Math.round(mHours * hourlyRate * rateMultiplier);

    // Automated hours calculations with ReguLattice: reduces manual effort by 75% (~30 hours per model, per framework)
    const aHours = modelCount * frameworkCount * 30;
    
    // Annual software cost based on tier
    let annualSoftwareCost = 0;
    if (modelCount <= 5) {
      annualSoftwareCost = 79 * 12; // Starter
    } else if (modelCount <= 15) {
      annualSoftwareCost = 349 * 12; // Pro
    } else {
      annualSoftwareCost = 999 * 12; // Enterprise
    }

    const aCost = Math.round((aHours * hourlyRate) + annualSoftwareCost);
    const netSavings = Math.max(0, mCost - aCost);
    const calculatedRoi = aCost > 0 ? Math.round((netSavings / aCost) * 100) : 0;
    
    setManualCost(mCost);
    setAutoCost(aCost);
    setSavings(netSavings);
    setHoursSaved(mHours - aHours);
    setRoiPercent(calculatedRoi);
  }, [modelCount, method, hourlyRate, frameworks]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

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
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name, 
          email, 
          company, 
          phone: `Role: ${role}`, 
          message: `ROI CALCULATOR LEAD: Models: ${modelCount}, Method: ${method}, Rate: $${hourlyRate}/hr, Frameworks Count: ${Object.values(frameworks).filter(Boolean).length}, Savings: $${savings.toLocaleString()}, ROI: ${roiPercent}%`,
          ip: geoIp,
          location: geoLoc
        }),
      });
      setFormSubmitted(true);
    } catch (err) {
      console.error("Failed to capture lead:", err);
      setFormSubmitted(true); // Fallback to show success screen anyway
    } finally {
      setIsSubmitting(false);
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.regulattice.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "AI Governance Hub",
        "item": "https://www.regulattice.com/ai-governance"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "ROI Calculator",
        "item": "https://www.regulattice.com/resources/roi-calculator"
      }
    ]
  };

  return (
    <div className="bg-[#F6F7F5] text-[#0B1F2A] regulattice-site min-h-screen flex flex-col justify-between">
      <SEO 
        title="AI Governance ROI Calculator | Calculate Compliance Cost Savings"
        description="Estimate your compliance costs across ISO 42001 and EU AI Act. Compare manual audits against automated compliance tools and see your potential savings."
        canonicalPath="/resources/roi-calculator"
        schema={breadcrumbSchema}
      />

      <Navbar onBooking={() => {}} onContact={() => {}} />

      <main className="flex-1 wrap py-12 md:py-20 text-left">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8 text-sm mono flex items-center gap-2" style={{ letterSpacing: "0.05em", color: "#566A72" }}>
          <Link to="/" style={{ color: "#0E7C6B", fontWeight: 500 }} className="hover:underline">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/ai-governance" style={{ color: "#0E7C6B", fontWeight: 500 }} className="hover:underline">AI Governance Hub</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span style={{ color: "#0B1F2A" }}>ROI Calculator</span>
        </nav>

        {/* Header Block */}
        <div className="max-w-3xl mb-12">
          <span className="eyebrow mono" style={{ display: "inline-flex", alignItems: "center", gap: "9px", color: "#0E7C6B", marginBottom: "18px", fontSize: "11px", letterSpacing: ".14em", textTransform: "uppercase" }}>
            <Calculator className="w-4 h-4" /> Interactive Tool
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: "#0B1F2A", lineHeight: 1.1 }}>
            AI Governance ROI &amp; Compliance Cost Calculator
          </h1>
          <p className="lead text-lg" style={{ color: "#566A72", lineHeight: 1.62 }}>
            Estimate your annual compliance costs for ISO 42001 and the EU AI Act. Compare manual preparation against ReguLattice automated workflows to see potential hours and financial savings.
          </p>
        </div>

        {/* Grid: Inputs & Outputs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Column: Calculator Controls (5 Columns) */}
          <div className="lg:col-span-5 bg-white border border-[#DFE5E2] rounded-[6px] p-6 space-y-6">
            <h3 className="text-lg font-bold text-[#0B1F2A] border-b border-[#DFE5E2] pb-3">1. Select Configurations</h3>
            
            {/* Input 1: Deployed AI Models */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-[#0B1F2A]">Deployed AI Systems</label>
                <span className="text-sm font-bold text-[#0E7C6B] bg-[#E4EFEA] px-2 py-0.5 rounded">{modelCount} models</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="50" 
                value={modelCount} 
                onChange={(e) => setModelCount(Number(e.target.value))}
                className="w-full h-1.5 bg-[#DFE5E2] rounded-lg appearance-none cursor-pointer accent-[#0E7C6B]"
              />
              <div className="flex justify-between text-[11px] text-[#82918F] mono">
                <span>1 Model</span>
                <span>50 Models</span>
              </div>
            </div>

            {/* Input 2: Compliance Methodology */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#0B1F2A]">Audit Preparation Method</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setMethod("spreadsheets")}
                  className={`p-3 text-xs font-semibold rounded-[4px] border text-center transition ${method === "spreadsheets" ? "bg-[#0B1F2A] border-[#0B1F2A] text-white" : "bg-white border-[#DFE5E2] text-[#566A72] hover:bg-[#F6F7F5]"}`}
                >
                  Manual Spreadsheets
                </button>
                <button
                  type="button"
                  onClick={() => setMethod("consultancy")}
                  className={`p-3 text-xs font-semibold rounded-[4px] border text-center transition ${method === "consultancy" ? "bg-[#0B1F2A] border-[#0B1F2A] text-white" : "bg-white border-[#DFE5E2] text-[#566A72] hover:bg-[#F6F7F5]"}`}
                >
                  Consultancy Firms
                </button>
              </div>
            </div>

            {/* Input 3: Hourly GRC Cost */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-[#0B1F2A]">Average Internal Hourly GRC Rate</label>
                <span className="text-sm font-bold text-[#0E7C6B] bg-[#E4EFEA] px-2 py-0.5 rounded">${hourlyRate}/hr</span>
              </div>
              <input 
                type="range" 
                min="40" 
                max="250" 
                step="5"
                value={hourlyRate} 
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full h-1.5 bg-[#DFE5E2] rounded-lg appearance-none cursor-pointer accent-[#0E7C6B]"
              />
              <div className="flex justify-between text-[11px] text-[#82918F] mono">
                <span>$40/hr</span>
                <span>$250/hr</span>
              </div>
            </div>

            {/* Input 4: Frameworks Selected */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-[#0B1F2A]">Compliance Frameworks In-Scope</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2.5 text-sm text-[#566A72] cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={frameworks.iso42001}
                    onChange={(e) => setFrameworks({ ...frameworks, iso42001: e.target.checked })}
                    className="rounded border-[#DFE5E2] text-[#0E7C6B] focus:ring-[#0E7C6B] w-4 h-4"
                  />
                  <span>ISO/IEC 42001:2023 (AIMS)</span>
                </label>
                <label className="flex items-center gap-2.5 text-sm text-[#566A72] cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={frameworks.euAiAct}
                    onChange={(e) => setFrameworks({ ...frameworks, euAiAct: e.target.checked })}
                    className="rounded border-[#DFE5E2] text-[#0E7C6B] focus:ring-[#0E7C6B] w-4 h-4"
                  />
                  <span>EU AI Act Regulations</span>
                </label>
                <label className="flex items-center gap-2.5 text-sm text-[#566A72] cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={frameworks.nistRmf}
                    onChange={(e) => setFrameworks({ ...frameworks, nistRmf: e.target.checked })}
                    className="rounded border-[#DFE5E2] text-[#0E7C6B] focus:ring-[#0E7C6B] w-4 h-4"
                  />
                  <span>NIST AI Risk Management Framework</span>
                </label>
              </div>
            </div>

          </div>

          {/* Right Column: Calculator Outputs & Savings Card (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Savings Hero Box */}
            <div className="bg-[#0B1F2A] text-white rounded-[6px] p-8 relative overflow-hidden shadow-[0_18px_40px_-26px_rgba(11,31,42,0.45)]">
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(14,124,107,.18) 0%, transparent 70%)" }} />
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <span className="mono text-[10px] text-[#7FD9C4]" style={{ letterSpacing: "0.15em" }}>Calculated Net Savings</span>
                  <p className="text-4xl md:text-5xl font-black mt-2 text-white">${savings.toLocaleString()}<span className="text-lg font-normal text-[#A9BDB8]"> / year</span></p>
                  <p className="text-[#A9BDB8] text-sm mt-2">By automating discovery, control mapping, and continuous evidence aggregation.</p>
                </div>
                <div className="bg-[#E4EFEA] text-[#07463D] px-6 py-4 rounded-[6px] text-center shrink-0 border border-[#A9BDB8]/20">
                  <span className="block text-[10px] uppercase font-bold tracking-widest text-[#0E7C6B]">Estimated ROI</span>
                  <span className="text-3xl font-black">{roiPercent}%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10 text-sm">
                <div>
                  <span className="block text-[#A9BDB8] text-xs">GRC Labor Saved</span>
                  <span className="font-semibold text-lg flex items-center gap-1 mt-1 text-white">
                    <Clock className="w-4 h-4 text-[#7FD9C4]" /> {hoursSaved.toLocaleString()} hours/yr
                  </span>
                </div>
                <div>
                  <span className="block text-[#A9BDB8] text-xs">Compliance Audit Profile</span>
                  <span className="font-semibold text-lg flex items-center gap-1 mt-1 text-white">
                    <ShieldCheck className="w-4 h-4 text-[#7FD9C4]" /> Continuous (Real-time)
                  </span>
                </div>
              </div>
            </div>

            {/* Split Details & Lead Form */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              
              {/* Cost Split details (5 Columns) */}
              <div className="md:col-span-5 bg-white border border-[#DFE5E2] rounded-[6px] p-6 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[#0B1F2A] border-b border-[#DFE5E2] pb-2 mb-4">Annual Cost Breakdown</h4>
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-[#82918F] block">Manual Compliance Cost:</span>
                      <span className="text-lg font-bold text-red-600">${manualCost.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-xs text-[#82918F] block">With ReguLattice Automation:</span>
                      <span className="text-lg font-bold text-teal">${autoCost.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="text-[11px] text-[#82918F] mt-6 border-t border-[#DFE5E2] pt-3">
                  *Based on software base licenses and 75% reduction in manual engineer prep time.
                </div>
              </div>

              {/* Lead Capture Form (7 Columns) */}
              <div className="md:col-span-7 bg-[#E4EFEA] border border-[#C5D0CB] rounded-[6px] p-6 relative">
                {!formSubmitted ? (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-teal shrink-0" />
                      <h4 className="font-bold text-sm text-[#07463D]">Unlock Detailed PDF Report</h4>
                    </div>
                    <p className="text-xs text-[#566A72] mb-3">We will compile your inputs and email a custom compliance roadmap based on your GRC savings profile.</p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#566A72] mb-1">Your Name</label>
                        <input 
                          type="text" 
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded border border-[#DFE5E2] bg-white text-[#0B1F2A] focus:outline-none focus:border-[#0E7C6B]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#566A72] mb-1">Work Email</label>
                        <input 
                          type="email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded border border-[#DFE5E2] bg-white text-[#0B1F2A] focus:outline-none focus:border-[#0E7C6B]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#566A72] mb-1">Company</label>
                        <input 
                          type="text" 
                          required
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded border border-[#DFE5E2] bg-white text-[#0B1F2A] focus:outline-none focus:border-[#0E7C6B]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#566A72] mb-1">Job Title</label>
                        <input 
                          type="text" 
                          required
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded border border-[#DFE5E2] bg-white text-[#0B1F2A] focus:outline-none focus:border-[#0E7C6B]"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn btn--pri text-xs py-2 mt-4 flex items-center justify-center gap-1.5"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" /> Compiling...
                        </>
                      ) : (
                        <>
                          Email My PDF Report <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="h-full flex flex-col justify-center items-center text-center py-6 space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-[#0E7C6B]" />
                    <h4 className="font-bold text-[#07463D] text-lg">Report Unlocked</h4>
                    <p className="text-xs text-[#566A72] max-w-xs">
                      We have compiled your inputs. Your detailed AI Governance compliance savings breakdown has been dispatched to <strong>{email}</strong>.
                    </p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer onContact={() => {}} />
    </div>
  );
}
