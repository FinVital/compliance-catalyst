import { Linkedin, Twitter, Mail, Instagram, MapPin, Phone } from "lucide-react";

interface FooterProps {
  onContact: () => void;
}

const footerLinks = [
  {
    title: "Platform",
    links: [
      { label: "AI Engine", href: "/#features" },
      { label: "Integrations", href: "/#frameworks" },
      { label: "Security", href: "/#features" },
      { label: "How It Works", href: "/#how-it-works" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

const Footer = ({ onContact }: FooterProps) => (
  <footer className="bg-slate-950 border-t border-slate-800/50">
    {/* Main footer */}
    <div className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand column */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
              style={{ background: "linear-gradient(135deg, #2563eb, #4f46e5)" }}
            >
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">ReguLattice</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
            The world's first Autonomous GRC Engine. Maps your evidence, monitors your risk, and keeps you audit-ready — continuously, across every framework.
          </p>
          <div className="flex flex-col gap-2 mb-6">
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <MapPin className="w-4 h-4 text-slate-500" />
              <span>Pakistan</span>
            </div>
            <a 
              href="tel:+923346250250" 
              className="flex items-center gap-2 text-slate-400 text-sm hover:text-blue-400 transition-colors"
            >
              <Phone className="w-4 h-4 text-slate-500" />
              <span>+92 334 6250250</span>
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://www.linkedin.com/company/regulattice/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/30 transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://x.com/regulattice"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/30 transition-all"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com/regulattice"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/30 transition-all"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <button
              onClick={onContact}
              className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/30 transition-all"
            >
              <Mail className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Link columns */}
        {footerLinks.map((col) => (
          <div key={col.title}>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">{col.title}</h4>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 text-sm hover:text-slate-200 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {col.title === "Company" && (
                <li>
                  <button
                    onClick={onContact}
                    className="text-slate-400 text-sm hover:text-slate-200 transition-colors"
                  >
                    Contact
                  </button>
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-slate-800/50">
      <div className="container mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-600">
          © {new Date().getFullYear()} ReguLattice. All rights reserved.
        </p>
        <div className="flex items-center gap-1 text-xs text-slate-600">
          <span>Built with</span>
          <span className="text-red-500">♥</span>
          <span>for compliance teams worldwide</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
