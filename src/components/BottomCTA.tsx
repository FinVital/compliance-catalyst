import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, Sparkles } from "lucide-react";

interface BottomCTAProps {
  onBooking: () => void;
  onContact: () => void;
}

const BottomCTA = ({ onBooking, onContact }: BottomCTAProps) => (
  <section className="py-28 bg-white relative overflow-hidden">
    {/* Subtle bg pattern */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(37,99,235,0.05) 0%, transparent 60%)`,
      }}
    />

    {/* Decorative rings */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="w-[600px] h-[600px] rounded-full border border-dashed border-blue-200/60 opacity-40" 
      />
      <motion.div 
        animate={{ 
          scale: [0.95, 1.05, 0.95], 
          opacity: [0.2, 0.4, 0.2] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-8 rounded-full border border-blue-200/40" 
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-20 rounded-full border border-dashed border-blue-200/50 opacity-30" 
      />
    </div>

    <div className="container mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-blue-700 border border-blue-200 bg-blue-50 text-xs font-semibold uppercase tracking-widest mb-6">
          <Sparkles className="w-3 h-3" />
          Get Started Today
        </div>

        <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-5">
          The Future of Compliance{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(90deg, #2563eb, #4f46e5)" }}
          >
            is Autonomous.
          </span>
        </h2>

        <p className="text-slate-500 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
          See how ReguLattice can automate your entire compliance lifecycle. Start free or talk to our team.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onBooking}
            className="inline-flex items-center justify-center gap-2 rounded-full text-white font-semibold px-10 py-4 text-lg transition-all hover:-translate-y-0.5 cursor-pointer shadow-lg"
            style={{ background: "#1e40af", boxShadow: "0 10px 30px rgba(30,64,175,0.2)" }}
          >
            Free Assessment
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={onContact}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 text-slate-700 font-semibold px-10 py-4 text-lg hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer"
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
