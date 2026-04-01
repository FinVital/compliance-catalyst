import { motion } from "framer-motion";
import { Shield, Zap, BookOpen, BarChart3 } from "lucide-react";

const Hero = () => (
  <section className="relative min-h-[90vh] bg-hero overflow-hidden flex items-center">
    {/* Animated blobs */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary-foreground/10 animate-blob" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-primary-foreground/5 animate-blob" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-foreground/5 animate-blob" style={{ animationDelay: "4s" }} />
    </div>

    <div className="container mx-auto px-6 relative z-10 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground leading-tight mb-6">
          Turn Compliance into Contracts.{" "}
          <span className="opacity-90">Master ISO 27001 with AI.</span>
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
          ReguLattice transforms your security posture from an operational burden into a revenue-driving asset. Automate ISO 27001 readiness, calculate real-time compliance scores, and conquer complex security questionnaires instantly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://regulattice-pro.vercel.app/"
            className="inline-flex items-center justify-center rounded-lg bg-primary-foreground text-foreground font-semibold px-8 py-4 text-lg hover:shadow-glow transition-all hover:scale-105"
          >
            Start Your 5-Day Free Trial
          </a>
          <a
            href="https://calendly.com/moazzamwaheed/15min"
            className="inline-flex items-center justify-center rounded-lg border-2 border-primary-foreground/40 text-primary-foreground font-semibold px-8 py-4 text-lg hover:bg-primary-foreground/10 transition-all"
          >
            Book a Demo
          </a>
        </div>
      </motion.div>

      {/* Floating icons */}
      <div className="hidden lg:block">
        {[
          { Icon: Shield, cls: "top-20 left-10", delay: 0 },
          { Icon: Zap, cls: "top-32 right-20", delay: 1 },
          { Icon: BookOpen, cls: "bottom-20 left-20", delay: 2 },
          { Icon: BarChart3, cls: "bottom-32 right-10", delay: 3 },
        ].map(({ Icon, cls, delay }) => (
          <div
            key={cls}
            className={`absolute ${cls} bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-4 animate-float`}
            style={{ animationDelay: `${delay}s` }}
          >
            <Icon className="w-8 h-8 text-primary-foreground/70" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Hero;
