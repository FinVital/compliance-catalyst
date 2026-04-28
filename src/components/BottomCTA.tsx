import { motion } from "framer-motion";

interface BottomCTAProps {
  onBooking: () => void;
  onContact: () => void;
}

const BottomCTA = ({ onBooking, onContact }: BottomCTAProps) => (
  <section className="py-24 relative overflow-hidden bg-slate-900">
    {/* Animated Background */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-600/20 rounded-full blur-[120px]" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
    </div>

    <div className="container mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-12 md:p-16 text-center shadow-2xl"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
          Ready to put your compliance on autopilot?
        </h2>
        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
          Join the forward-thinking teams mastering their regulatory landscape with ReguLattice. Achieve continuous compliance without the continuous headache.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onBooking}
            className="inline-flex items-center justify-center rounded-lg bg-teal-600 text-white font-semibold px-8 py-4 text-lg hover:bg-teal-500 hover:shadow-[0_0_20px_rgba(13,148,136,0.4)] transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            Get Started Today
            <span className="ml-2 text-teal-200 text-sm font-normal">(No Credit Card Required)</span>
          </button>
          <button
            onClick={onContact}
            className="inline-flex items-center justify-center rounded-lg border-2 border-slate-600 text-white font-semibold px-8 py-4 text-lg hover:bg-slate-700 transition-all cursor-pointer"
          >
            Talk to an Expert
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default BottomCTA;
