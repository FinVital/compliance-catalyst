import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { articlesData } from "./articlesData";
import { ChevronRight, BookOpen, Shield, ClipboardList, Settings, Scale, Eye, Activity, Database, AlertTriangle, Layers } from "lucide-react";

export default function Pillar() {
  const articles = Object.values(articlesData);

  const getIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "standards": return <ClipboardList className="w-5 h-5 text-teal" />;
      case "frameworks": return <Layers className="w-5 h-5 text-teal" />;
      case "regulations": return <Scale className="w-5 h-5 text-teal" />;
      case "discovery": return <Eye className="w-5 h-5 text-teal" />;
      case "risk": return <AlertTriangle className="w-5 h-5 text-teal" />;
      case "assurance": return <Shield className="w-5 h-5 text-teal" />;
      case "automation": return <Settings className="w-5 h-5 text-teal" />;
      case "deployment": return <Database className="w-5 h-5 text-teal" />;
      case "monitoring": return <Activity className="w-5 h-5 text-teal" />;
      default: return <BookOpen className="w-5 h-5 text-teal" />;
    }
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "AI Governance and Compliance Resource Hub",
    "description": "A comprehensive directory of guides and standards for enterprise AI risk management, including ISO 42001, NIST AI RMF, and the EU AI Act.",
    "url": "https://www.regulattice.com/ai-governance",
    "hasPart": articles.map(art => ({
      "@type": "WebPage",
      "name": art.title,
      "url": `https://www.regulattice.com/ai-governance/${art.slug}`
    }))
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
      }
    ]
  };

  return (
    <div className="bg-[#F6F7F5] text-[#0B1F2A] regulattice-site min-h-screen flex flex-col justify-between">
      <SEO 
        title="AI Governance & Compliance Hub | ISO 42001, NIST, EU AI Act Guides"
        description="Access comprehensive guides on ISO/IEC 42001, NIST AI Risk Management Framework, and the EU AI Act compliance. Discover shadow AI, manage risk, and automate audits."
        schema={[collectionSchema, breadcrumbSchema]}
      />
      
      <Navbar onBooking={() => {}} onContact={() => {}} />

      <main className="flex-1 wrap py-12 md:py-20 text-left">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8 text-sm mono flex items-center gap-2" style={{ letterSpacing: "0.05em", color: "#566A72" }}>
          <Link to="/" style={{ color: "#0E7C6B", fontWeight: 500 }} className="hover:underline">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span style={{ color: "#0B1F2A" }}>AI Governance Hub</span>
        </nav>

        {/* Header Block */}
        <div className="max-w-3xl mb-12">
          <span className="eyebrow mono" style={{ display: "inline-flex", alignItems: "center", gap: "9px", color: "#0E7C6B", marginBottom: "18px", fontSize: "11px", letterSpacing: ".14em", textTransform: "uppercase" }}>
            Resources
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: "#0B1F2A", lineHeight: 1.1 }}>
            AI Governance &amp; Compliance Hub
          </h1>
          <p className="lead text-lg" style={{ color: "#566A72", lineHeight: 1.62 }}>
            Deep dive into standards, regulations, and blueprints for managing enterprise artificial intelligence systems responsibly, transparently, and continuously.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {articles.map((art) => (
            <Link 
              key={art.slug} 
              to={`/ai-governance/${art.slug}`}
              className="bg-white border border-[#DFE5E2] rounded-[6px] p-6 hover:border-[#0E7C6B] hover:shadow-[0_18px_40px_-26px_rgba(11,31,42,0.45)] transition duration-220 flex flex-col justify-between"
              style={{ transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)" }}
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-[6px] bg-[#E4EFEA] flex items-center justify-center">
                    {getIcon(art.category)}
                  </div>
                  <div>
                    <span className="mono text-[10px]" style={{ color: "#0E7C6B" }}>{art.category}</span>
                    <p className="text-[12px] text-[#82918F]">{art.readTime}</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 tracking-tight text-[#0B1F2A]">{art.title}</h3>
                <p className="text-[#566A72] text-[14.5px] leading-relaxed">{art.summary}</p>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-[#0E7C6B] hover:text-[#07463D]">
                Read Guide <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer onContact={() => {}} />
    </div>
  );
}
