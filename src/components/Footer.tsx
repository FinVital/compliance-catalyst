import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground/70 py-16">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-3 gap-10 mb-12">
        <div>
          <h3 className="font-display text-2xl font-bold text-primary-foreground mb-2">ReguLattice</h3>
          <p className="text-sm">Empowering Secure Growth</p>
        </div>
        <div>
          <h4 className="font-semibold text-primary-foreground mb-4">Headquarters</h4>
          <p className="flex items-start gap-2 text-sm">
            <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
            271 BMCHS, Karachi, Pakistan
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-primary-foreground mb-4">Contact Us</h4>
          <p className="flex items-center gap-2 text-sm mb-2">
            <Phone className="w-4 h-4" /> +92 3346250250
          </p>
          <p className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4" /> info@regulattice.com
          </p>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 pt-6 text-xs text-center">
        <p>ReguLattice assists ISMS preparation. Actual implementation & certification remain the responsibility of the organization.</p>
        <p className="mt-2">© {new Date().getFullYear()} ReguLattice. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
