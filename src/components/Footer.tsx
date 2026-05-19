import { Linkedin } from "lucide-react";

const Footer = () => (
  <footer className="bg-slate-950 border-t border-slate-800/50 py-12">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">ReguLattice</span>
        </div>
        <div className="flex items-center gap-8 text-sm text-slate-500">
          <a href="#features" className="hover:text-slate-300 transition-colors">Platform</a>
          <a href="#pricing" className="hover:text-slate-300 transition-colors">Pricing</a>
          <a href="mailto:info@regulattice.com" className="hover:text-slate-300 transition-colors">Contact</a>
          <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
          <a href="https://www.linkedin.com/company/regulattice/" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors flex items-center gap-2">
            <Linkedin className="w-4 h-4" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
        </div>
        <p className="text-xs text-slate-600">
          © {new Date().getFullYear()} ReguLattice. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
