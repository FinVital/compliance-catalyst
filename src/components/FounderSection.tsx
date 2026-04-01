import { motion } from "framer-motion";
import founderImg from "@/assets/founder.png";

const FounderSection = () => (
  <section className="py-24 bg-surface-warm">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          A Message From Our <span className="text-gradient">Founder</span>
        </h2>
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-shrink-0">
            <img
              src={founderImg}
              alt="Moazzam Waheed, Founder & CEO"
              className="w-48 h-48 rounded-full object-cover shadow-glow"
            />
          </div>
          <div>
            <blockquote className="text-muted-foreground text-lg leading-relaxed italic">
              "As the Founder & CEO of ReguLattice, I bring over 16 years of hands-on expertise in Software Engineering and Artificial Intelligence. Having witnessed firsthand the immense friction companies face when proving their security posture to close enterprise deals, I realized the compliance industry needed a paradigm shift.
              <br /><br />
              ReguLattice was engineered to actively synthesize your data, evaluate your evidence, and generate high-confidence RFP responses. Our mission is to make ISO 27001 an accelerator for your business growth, not a roadblock."
            </blockquote>
            <p className="mt-6 font-display font-bold text-foreground text-lg">
              — Moazzam Waheed, <span className="text-primary">Founder & CEO</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default FounderSection;
