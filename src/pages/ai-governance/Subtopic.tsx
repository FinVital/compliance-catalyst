import { useParams, Link } from "react-router-dom";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { articlesData } from "./articlesData";
import { ChevronRight, FileText, ChevronLeft, Award } from "lucide-react";

export default function Subtopic() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? articlesData[slug] : null;

  if (!article) {
    return (
      <div className="bg-[#F6F7F5] text-[#0B1F2A] regulattice-site min-h-screen flex flex-col justify-between">
        <Navbar onBooking={() => {}} onContact={() => {}} />
        <main className="flex-1 wrap py-24 text-center">
          <h1 className="text-3xl font-bold mb-4">Guide Not Found</h1>
          <p className="mb-8 text-[#566A72]">The requested AI Governance subtopic does not exist.</p>
          <Link to="/ai-governance" className="btn btn--pri">Back to Governance Hub</Link>
        </main>
        <Footer onContact={() => {}} />
      </div>
    );
  }

  const allArticles = Object.values(articlesData);

  const schema = {
    "@context": "https://schema.org",
    "@type": article.schemaType === "HowTo" ? "HowTo" : "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.regulattice.com/ai-governance/${article.slug}`
    },
    "headline": article.title,
    "description": article.description,
    "author": {
      "@type": "Organization",
      "name": "ReguLattice"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ReguLattice",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.regulattice.com/logo.png"
      }
    },
    "datePublished": "2026-08-09"
  };

  return (
    <div className="bg-[#F6F7F5] text-[#0B1F2A] regulattice-site min-h-screen flex flex-col justify-between">
      <SEO 
        title={`${article.title} | ReguLattice`}
        description={article.description}
        canonicalPath={`/ai-governance/${article.slug}`}
        schema={schema}
      />
      
      <Navbar onBooking={() => {}} onContact={() => {}} />

      <main className="flex-1 wrap py-12 md:py-20 text-left">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8 text-sm mono flex items-center gap-2" style={{ letterSpacing: "0.05em", color: "#566A72" }}>
          <Link to="/" style={{ color: "#0E7C6B", fontWeight: 500 }} className="hover:underline">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/ai-governance" style={{ color: "#0E7C6B", fontWeight: 500 }} className="hover:underline">AI Governance Hub</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span style={{ color: "#0B1F2A" }}>{article.breadcrumbName}</span>
        </nav>

        {/* Dynamic Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-10">
          
          {/* Main Article Content (7 Columns) */}
          <article className="lg:col-span-7">
            <header className="mb-8 pb-8 border-b border-[#DFE5E2]">
              <span className="mono text-xs uppercase" style={{ color: "#0E7C6B", letterSpacing: "0.14em" }}>{article.category}</span>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-2 mb-4 text-[#0B1F2A] leading-tight">{article.title}</h1>
              <div className="flex items-center gap-4 text-sm text-[#82918F]">
                <span>{article.date}</span>
                <span>•</span>
                <span>{article.readTime}</span>
              </div>
            </header>

            {/* Render HTML Content */}
            <div 
              className="prose prose-slate max-w-none text-[#566A72] text-[16px] leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: article.contentHtml }}
              style={{
                fontFamily: '"Schibsted Grotesk", sans-serif'
              }}
            />

            {/* Contextual Cluster Internal Links Panel */}
            <div className="mt-12 p-6 bg-white border border-[#DFE5E2] rounded-[6px]">
              <h4 className="font-bold text-sm text-[#0B1F2A] mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal" /> Related Governance Topics
              </h4>
              <p className="text-xs text-[#82918F] mb-4">Deepen your knowledge of other controls and processes in this cluster:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                {article.internalLinks.map((lnk) => (
                  <Link 
                    key={lnk.slug} 
                    to={`/ai-governance/${lnk.slug}`} 
                    className="flex items-center gap-1.5 text-[#0E7C6B] hover:text-[#07463D] hover:underline"
                  >
                    <ChevronRight className="w-3.5 h-3.5" /> {lnk.text}
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom CTA Box */}
            <div className="mt-12 p-8 bg-[#0B1F2A] text-white rounded-[6px] relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6 shadow-[0_18px_40px_-26px_rgba(11,31,42,0.45)]">
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(14,124,107,.15) 0%, transparent 70%)" }} />
              <div>
                <span className="mono text-[10px] text-[#7FD9C4]" style={{ letterSpacing: "0.15em" }}>Quick Assessment</span>
                <h3 className="text-xl font-bold mt-1 text-white leading-tight">Score Your AI Governance Maturity</h3>
                <p className="text-[#A9BDB8] text-[13.5px] mt-1">Get an instant roadmap against ISO 42001 &amp; EU AI Act obligations.</p>
              </div>
              <Link to="/assessment" className="btn btn--pri" style={{ minWidth: "180px" }}>
                Start Free Quiz
              </Link>
            </div>

            {/* Hub Return Link */}
            <div className="mt-8">
              <Link to="/ai-governance" className="inline-flex items-center gap-1 text-sm font-semibold text-[#0E7C6B] hover:underline">
                <ChevronLeft className="w-4 h-4" /> Back to Resources Directory
              </Link>
            </div>
          </article>

          {/* Sidebar Cluster Directory (3 Columns) */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24 bg-white border border-[#DFE5E2] rounded-[6px] p-6 shadow-sm">
              <h4 className="font-bold text-sm text-[#0B1F2A] mb-4 pb-2 border-b border-[#DFE5E2] flex items-center gap-2">
                <Award className="w-4 h-4 text-teal" /> Topic Cluster Guide
              </h4>
              <nav aria-label="Topic Cluster Directory" className="flex flex-col gap-1.5 text-[14px]">
                {allArticles.map((art) => (
                  <Link 
                    key={art.slug} 
                    to={`/ai-governance/${art.slug}`}
                    className={`block py-2 px-3 rounded-[4px] transition-colors leading-tight ${art.slug === article.slug ? "bg-[#E4EFEA] text-[#07463D] font-semibold" : "text-[#566A72] hover:bg-[#F6F7F5] hover:text-[#0B1F2A]"}`}
                  >
                    {art.breadcrumbName}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

        </div>
      </main>

      <Footer onContact={() => {}} />
    </div>
  );
}
