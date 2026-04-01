import { motion } from "framer-motion";

const BottomCTA = () => (
  <section className="py-24 bg-hero relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-primary-foreground/5 animate-blob" />
      <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-primary-foreground/5 animate-blob" style={{ animationDelay: "3s" }} />
    </div>
    <div className="container mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
          Ready to make compliance your competitive advantage?
        </h2>
        <p className="text-primary-foreground/80 text-lg mb-10">
          Join forward-thinking organizations streamlining their ISO 27001 journey. Gain full access on us for 5 days.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://regulattice-pro.vercel.app/"
            className="inline-flex items-center justify-center rounded-lg bg-primary-foreground text-foreground font-semibold px-8 py-4 text-lg hover:shadow-glow transition-all hover:scale-105"
          >
            Get Started Free (5-Day Trial)
          </a>
          <a
            href="https://calendly.com/moazzamwaheed/15min"
            className="inline-flex items-center justify-center rounded-lg border-2 border-primary-foreground/40 text-primary-foreground font-semibold px-8 py-4 text-lg hover:bg-primary-foreground/10 transition-all"
          >
            Book a Demo
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

export default BottomCTA;
