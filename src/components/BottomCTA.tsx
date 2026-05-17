import { motion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";

interface BottomCTAProps {
  onBooking: () => void;
  onContact: () => void;
}

const BottomCTA = ({ onBooking, onContact }: BottomCTAProps) => (
  <section className="py-28 bg-slate-900 relative overflow-hidden">
    {/* Background effects */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-teal-600/6 rounded-full blur-[120px]" />
    </div>

    <div className="container mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-semibold uppercase tracking-widest mb-6">
          Get Started Today
        </div>

        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-5">
          The Future of Compliance{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">
            is Autonomous.
          </span>
        </h2>

        <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
          See how ReguLattice can automate your entire compliance lifecycle. Start free or talk to our team.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onBooking}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 text-white font-semibold px-10 py-4 text-lg hover:bg-teal-500 hover:shadow-[0_0_30px_rgba(13,148,136,0.4)] transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            Start Free Trial
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={onContact}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-600 text-slate-300 font-semibold px-10 py-4 text-lg hover:bg-slate-800/80 hover:text-white hover:border-slate-500 transition-all cursor-pointer"
          >
            <MessageSquare className="w-5 h-5" />
            Talk to an Expert
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default BottomCTA;
