import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, CheckCircle2, AlertTriangle, RefreshCw, BarChart3, Database, Eye, FileSpreadsheet, Scale } from "lucide-react";

export default function Iso42001ComplianceSoftware() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is ISO 42001 compliance software?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ISO 42001 compliance software is a digital GRC platform designed to automate the creation, management, and audit of an Artificial Intelligence Management System (AIMS) in accordance with the ISO/IEC 42001 standard. Unlike manual GRC spreadsheets, it continuously monitors AI pipelines, maps controls, logs data drift, and gathers cryptographic audit evidence automatically."
        }
      },
      {
        "@type": "Question",
        "name": "How does ReguLattice discover undocumented AI systems (Shadow AI)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ReguLattice uses passive network traffic auditing, cloud service integrations, and code-level triggers to scan for undocumented API calls, third-party SaaS integrations, and locally hosted models, automatically cataloging them in a centralized AI inventory."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to prepare for an ISO 42001 audit using software?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "With manual auditing processes, preparing for an ISO 42001 audit takes 4 to 6 weeks of resource-intensive evidence collection. By automating discovery and logging continuously, ReguLattice reduces this prep time to less than one day, providing real-time, audit-ready data."
        }
      },
      {
        "@type": "Question",
        "name": "Can we map controls to other regulations like the EU AI Act?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. ReguLattice utilizes a unified control library. When you map controls for ISO 42001, the system automatically checks for overlapping requirements under the EU AI Act, NIST AI RMF, and OECD AI Principles, eliminating redundant compliance tasks."
        }
      }
    ]
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "ReguLattice ISO 42001 Compliance Software",
    "description": "Enterprise-grade GRC compliance platform designed to automate ISO/IEC 42001:2023 Artificial Intelligence Management System (AIMS) certification and continuous evidence tracking.",
    "brand": {
      "@type": "Brand",
      "name": "ReguLattice"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "299",
      "priceValidUntil": "2027-12-31",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <div className="bg-[#F6F7F5] text-[#0B1F2A] regulattice-site min-h-screen flex flex-col justify-between">
      <SEO 
        title="ISO 42001 Compliance Software | Continuous AIMS Audit Automation"
        description="Automate your Artificial Intelligence Management System (AIMS) with ReguLattice ISO 42001 compliance software. Discover shadow AI, map controls, and collect audit evidence."
        canonicalPath="/solutions/iso-42001-compliance-software"
        schema={[faqSchema, productSchema]}
      />

      <Navbar onBooking={() => {}} onContact={() => {}} />

      <main className="flex-1 wrap py-12 md:py-20 text-left">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8 text-sm mono flex items-center gap-2" style={{ letterSpacing: "0.05em", color: "#566A72" }}>
          <Link to="/" style={{ color: "#0E7C6B", fontWeight: 500 }} className="hover:underline">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/ai-governance" style={{ color: "#0E7C6B", fontWeight: 500 }} className="hover:underline">AI Governance Hub</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span style={{ color: "#0B1F2A" }}>ISO 42001 Compliance Software</span>
        </nav>

        {/* Hero Section */}
        <header className="max-w-4xl mb-12">
          <span className="eyebrow mono" style={{ display: "inline-flex", alignItems: "center", gap: "9px", color: "#0E7C6B", marginBottom: "18px", fontSize: "11px", letterSpacing: ".14em", textTransform: "uppercase" }}>
            Software Solutions
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6" style={{ color: "#0B1F2A", lineHeight: 1.1 }}>
            Continuous ISO 42001 Compliance Software
          </h1>
          
          {/* Answer-First Box */}
          <div className="p-6 bg-white border border-[#DFE5E2] rounded-[6px] border-l-4 border-l-[#0E7C6B] mb-8">
            <p className="text-[#0B1F2A] font-medium leading-relaxed">
              <strong>ISO 42001 compliance software</strong> is an enterprise-grade Governance, Risk, and Compliance (GRC) solution designed to plan, implement, audit, and automate an Artificial Intelligence Management System (AIMS) conforming to the ISO/IEC 42001:2023 international standard. Rather than relying on static, point-in-time spreadsheets that quickly go stale as models retrain, modern ISO 42001 software enables continuous automated risk discovery, control mapping, policy enforcement, and cryptographic evidence gathering. By integrating directly into cloud models, code repos, and SaaS pipelines, ReguLattice automates the evidence-gathering process, decreasing audit readiness cycles from six weeks to immediate session scans, ensuring real-time compliance with global artificial intelligence guidelines.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            <Link to="/assessment" className="btn btn--pri">Start Free Assessment</Link>
            <Link to="/contact" className="btn btn--sec">Book a Live Demo</Link>
          </div>
        </header>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-12 mt-12">
          
          {/* Main Copy Column (7 Columns) */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Section 1 */}
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#0B1F2A]">The Challenge: Traditional GRC Fails in the Era of Dynamic AI</h2>
              <p className="text-[#566A72] leading-relaxed">
                Conventional GRC systems were built for static databases and predictable software infrastructure. AI deployments do not fit this profile. Models drift, prompt templates evolve weekly, and employees continuously connect unauthorized third-party SaaS integrations.
              </p>
              
              <h3 className="text-lg md:text-xl font-bold text-[#0B1F2A] mt-6">Why Static Audits Create Vulnerability</h3>
              <p className="text-[#566A72] leading-relaxed">
                A point-in-time security audit only captures a snapshot. If your data distribution shifts or an engineer connects an unapproved model via API, your compliance posture degrades instantly. In highly regulated sectors, this leads directly to regulatory liabilities, financial risk, and brand damage.
              </p>

              <h3 className="text-lg md:text-xl font-bold text-[#0B1F2A] mt-6">Understanding ISO/IEC 42001:2023 Demands</h3>
              <p className="text-[#566A72] leading-relaxed">
                The ISO/IEC 42001:2023 standard establishes a structured approach to AI governance. Unlike general safety standards, it requires organizations to prove control implementation across system life cycles. This demands continuous data governance, transparent impact assessments, and traceable human oversight boundaries.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#0B1F2A]">Core Capabilities of ReguLattice ISO 42001 Compliance Software</h2>
              <p className="text-[#566A72] leading-relaxed">
                ReguLattice replaces manual administrative overhead with an automated, agent-assisted governance system designed to secure and evidence your AIMS on a continuous loop.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="p-6 bg-white border border-[#DFE5E2] rounded-[6px]">
                  <div className="w-10 h-10 rounded-[6px] bg-[#E4EFEA] flex items-center justify-center mb-4">
                    <Eye className="w-5 h-5 text-teal" />
                  </div>
                  <h4 className="font-bold text-lg text-[#0B1F2A] mb-2">1. Autonomous AI Discovery</h4>
                  <p className="text-sm text-[#566A72] leading-relaxed">
                    Automatically scans your cloud APIs, codebases, and local networks to catalog every active AI deployment. Instantly surface and contain <Link to="/ai-governance/shadow-ai-discovery" className="text-[#0E7C6B] hover:underline font-semibold">Shadow AI integrations</Link> before they compromise data security.
                  </p>
                </div>

                <div className="p-6 bg-white border border-[#DFE5E2] rounded-[6px]">
                  <div className="w-10 h-10 rounded-[6px] bg-[#E4EFEA] flex items-center justify-center mb-4">
                    <Scale className="w-5 h-5 text-teal" />
                  </div>
                  <h4 className="font-bold text-lg text-[#0B1F2A] mb-2">2. Automated Control Mapping</h4>
                  <p className="text-sm text-[#566A72] leading-relaxed">
                    Map controls once and project them across multiple compliance frameworks. Instantly view alignment overlap between ISO 42001, the <Link to="/ai-governance/eu-ai-act-compliance" className="text-[#0E7C6B] hover:underline font-semibold">EU AI Act</Link>, and the <Link to="/ai-governance/nist-ai-rmf-framework" className="text-[#0E7C6B] hover:underline font-semibold">NIST AI RMF</Link>.
                  </p>
                </div>

                <div className="p-6 bg-white border border-[#DFE5E2] rounded-[6px]">
                  <div className="w-10 h-10 rounded-[6px] bg-[#E4EFEA] flex items-center justify-center mb-4">
                    <Database className="w-5 h-5 text-teal" />
                  </div>
                  <h4 className="font-bold text-lg text-[#0B1F2A] mb-2">3. Cryptographic Evidence Logging</h4>
                  <p className="text-sm text-[#566A72] leading-relaxed">
                    Automatically compile metadata, model weight hashes, training lineages, and evaluation logs. Every piece of proof is stamped with a Time-To-Live (TTL), warning GRC managers before compliance proof expires.
                  </p>
                </div>

                <div className="p-6 bg-white border border-[#DFE5E2] rounded-[6px]">
                  <div className="w-10 h-10 rounded-[6px] bg-[#E4EFEA] flex items-center justify-center mb-4">
                    <Shield className="w-5 h-5 text-teal" />
                  </div>
                  <h4 className="font-bold text-lg text-[#0B1F2A] mb-2">4. Live Guardrails & Reversibility</h4>
                  <p className="text-sm text-[#566A72] leading-relaxed">
                    Configure model safety perimeters. Enforce clear escalation limits and determine reversibility paths for automated decisions, satisfying stringent accountability mandates under the ISO/IEC standard.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#0B1F2A]">Comparing Manual GRC Audits vs. ReguLattice Automated Software</h2>
              <p className="text-[#566A72] leading-relaxed">
                Enterprise compliance teams using manual approaches lose significant productive time tracking down system owners, collecting screenshots, and formatting model cards. The table below outlines how automated software restructures this operational paradigm:
              </p>
              
              <div className="overflow-x-auto mt-6">
                <table className="w-full text-sm text-left border-collapse border border-[#DFE5E2]">
                  <thead>
                    <tr className="bg-[#DFE5E2] text-[#0B1F2A]">
                      <th className="p-3 border border-[#C5D0CB] font-bold">Dimension</th>
                      <th className="p-3 border border-[#C5D0CB] font-bold">Manual Audits (Spreadsheets)</th>
                      <th className="p-3 border border-[#C5D0CB] font-bold">ReguLattice Compliance Software</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="p-3 border border-[#DFE5E2] font-semibold text-[#0B1F2A]">Discovery Rate</td>
                      <td className="p-3 border border-[#DFE5E2] text-[#566A72]">Relies on self-reporting and declarations. Misses Shadow AI.</td>
                      <td className="p-3 border border-[#DFE5E2] text-[#566A72] font-semibold" style={{ color: "#0E7C6B" }}>100% passive network scanning & API hook capture.</td>
                    </tr>
                    <tr className="bg-[#F6F7F5]">
                      <td className="p-3 border border-[#DFE5E2] font-semibold text-[#0B1F2A]">Audit Preparation</td>
                      <td className="p-3 border border-[#DFE5E2] text-[#566A72]">4–6 weeks of manual collection and developer interruption.</td>
                      <td className="p-3 border border-[#DFE5E2] text-[#566A72] font-semibold" style={{ color: "#0E7C6B" }}>Continuous compliance. Immediate, live audit exports.</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-3 border border-[#DFE5E2] font-semibold text-[#0B1F2A]">Evidence Integrity</td>
                      <td className="p-3 border border-[#DFE5E2] text-[#566A72]">Static documents, easily modified, zero proof-of-freshness.</td>
                      <td className="p-3 border border-[#DFE5E2] text-[#566A72] font-semibold" style={{ color: "#0E7C6B" }}>Cryptographic hashing of model states with TTL expiration tracking.</td>
                    </tr>
                    <tr className="bg-[#F6F7F5]">
                      <td className="p-3 border border-[#DFE5E2] font-semibold text-[#0B1F2A]">Deployment Flexibility</td>
                      <td className="p-3 border border-[#DFE5E2] text-[#566A72]">Cloud-only interfaces with external ingestion requirements.</td>
                      <td className="p-3 border border-[#DFE5E2] text-[#566A72] font-semibold" style={{ color: "#0E7C6B" }}>Available in Cloud or fully <Link to="/ai-governance/on-premise-sovereign-ai" className="hover:underline">On-Premise/Air-Gapped modes</Link>.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#0B1F2A]">Step-by-Step Implementation Roadmap to ISO 42001 Certification</h2>
              <p className="text-[#566A72] leading-relaxed">
                Leveraging ReguLattice software, organizations implement, run, and evidence their Artificial Intelligence Management System (AIMS) systematically:
              </p>
              
              <ol className="space-y-4 list-decimal pl-5 text-[#566A72]">
                <li>
                  <strong className="text-[#0B1F2A]">Establish Leadership &amp; Objectives:</strong> Configure your corporate AI Policy inside the dashboard and map it to organizational goals.
                </li>
                <li>
                  <strong className="text-[#0B1F2A]">Populate System Registry:</strong> Connect integrations to catalog models. Active discovery uncovers endpoints and checks their baseline parameters.
                </li>
                <li>
                  <strong className="text-[#0B1F2A]">Execute Impact Assessments:</strong> Draft impact assessments inside the platform. AI agents assist in mapping consequences, which are reviewed by compliance leads.
                </li>
                <li>
                  <strong className="text-[#0B1F2A]">Enforce Controls &amp; Monitor:</strong> Set up data guardrails and tracking schedules. Detect model bias or prompt breaches and send warnings automatically to remediation teams.
                </li>
                <li>
                  <strong className="text-[#0B1F2A]">Conduct Internal Audits:</strong> Export complete, cryptographically verified logs to share directly with ISO 42001 registrars for certification.
                </li>
              </ol>
            </section>

            {/* FAQ Section */}
            <section className="space-y-6 pt-8 border-t border-[#DFE5E2]">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#0B1F2A]">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-lg text-[#0B1F2A] mb-1">What is ISO 42001 compliance software?</h4>
                  <p className="text-[#566A72] text-[15px]">
                    ISO 42001 compliance software is a digital GRC platform designed to automate the creation, management, and audit of an Artificial Intelligence Management System (AIMS) in accordance with the ISO/IEC 42001 standard. Unlike manual GRC spreadsheets, it continuously monitors AI pipelines, maps controls, logs data drift, and gathers cryptographic audit evidence automatically.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-lg text-[#0B1F2A] mb-1">How does ReguLattice discover undocumented AI systems (Shadow AI)?</h4>
                  <p className="text-[#566A72] text-[15px]">
                    ReguLattice uses passive network traffic auditing, cloud service integrations, and code-level triggers to scan for undocumented API calls, third-party SaaS integrations, and locally hosted models, automatically cataloging them in a centralized AI inventory.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-lg text-[#0B1F2A] mb-1">How long does it take to prepare for an ISO 42001 audit using software?</h4>
                  <p className="text-[#566A72] text-[15px]">
                    With manual auditing processes, preparing for an ISO 42001 audit takes 4 to 6 weeks of resource-intensive evidence collection. By automating discovery and logging continuously, ReguLattice reduces this prep time to less than one day, providing real-time, audit-ready data.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-lg text-[#0B1F2A] mb-1">Can we map controls to other regulations like the EU AI Act?</h4>
                  <p className="text-[#566A72] text-[15px]">
                    Yes. ReguLattice utilizes a unified control library. When you map controls for ISO 42001, the system automatically checks for overlapping requirements under the EU AI Act, NIST AI RMF, and OECD AI Principles, eliminating redundant compliance tasks.
                  </p>
                </div>
              </div>
            </section>

          </div>

          {/* Sidebar Widget (3 Columns) */}
          <aside className="lg:col-span-3 space-y-6">
            
            {/* Box 1: Quick Specs */}
            <div className="bg-white border border-[#DFE5E2] rounded-[6px] p-6 shadow-sm">
              <h4 className="font-bold text-[#0B1F2A] mb-4 pb-2 border-b border-[#DFE5E2] flex items-center gap-2 text-sm uppercase mono tracking-wider">
                <Shield className="w-4 h-4 text-teal" /> Platform Specs
              </h4>
              <div className="space-y-4 text-sm text-[#566A72]">
                <div>
                  <span className="font-semibold block text-[#0B1F2A]">Supported Standard:</span>
                  <span>ISO/IEC 42001:2023 (AIMS)</span>
                </div>
                <div>
                  <span className="font-semibold block text-[#0B1F2A]">Automation Overhead reduction:</span>
                  <span className="text-[#0E7C6B] font-bold">Up to 70% decrease</span>
                </div>
                <div>
                  <span className="font-semibold block text-[#0B1F2A]">Audit-Ready timeline:</span>
                  <span>Immediate session export</span>
                </div>
                <div>
                  <span className="font-semibold block text-[#0B1F2A]">Deployment Profiles:</span>
                  <span>Cloud SaaS, Private VPC, On-Premise, Air-Gapped</span>
                </div>
              </div>
            </div>

            {/* Box 2: Resources List */}
            <div className="bg-white border border-[#DFE5E2] rounded-[6px] p-6 shadow-sm">
              <h4 className="font-bold text-[#0B1F2A] mb-4 pb-2 border-b border-[#DFE5E2] flex items-center gap-2 text-sm uppercase mono tracking-wider">
                Related Articles
              </h4>
              <nav className="flex flex-col gap-2.5 text-sm">
                <Link to="/ai-governance/iso-42001-guide" className="text-[#0E7C6B] hover:underline">ISO 42001 Guide</Link>
                <Link to="/ai-governance/nist-ai-rmf-framework" className="text-[#0E7C6B] hover:underline">NIST AI RMF Guide</Link>
                <Link to="/ai-governance/eu-ai-act-compliance" className="text-[#0E7C6B] hover:underline">EU AI Act Guide</Link>
                <Link to="/ai-governance/shadow-ai-discovery" className="text-[#0E7C6B] hover:underline">Shadow AI Discovery</Link>
              </nav>
            </div>

          </aside>

        </div>
      </main>

      <Footer onContact={() => {}} />
    </div>
  );
}
