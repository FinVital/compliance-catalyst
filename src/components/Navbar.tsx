import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Platform", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Frameworks", href: "#frameworks" },
  { label: "Pricing", href: "#pricing" },
];

interface NavbarProps {
  onBooking: () => void;
}

const Navbar = ({ onBooking }: NavbarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50">
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">ReguLattice</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={onBooking}
            className="bg-teal-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-teal-500 hover:shadow-[0_0_20px_rgba(13,148,136,0.3)] transition-all cursor-pointer"
          >
            Book a Call
          </button>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-slate-400">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-6 py-4 space-y-3">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-slate-400 hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => { setOpen(false); onBooking(); }}
            className="block w-full bg-teal-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl text-center cursor-pointer"
          >
            Book a Call
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
