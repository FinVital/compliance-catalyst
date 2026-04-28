import { motion } from "framer-motion";

const integrations = [
  { name: "AWS", logo: "AWS" },
  { name: "Google Cloud", logo: "GCP" },
  { name: "Microsoft Azure", logo: "Azure" },
  { name: "Jira", logo: "Jira" },
  { name: "GitHub", logo: "GitHub" },
  // Duplicate for seamless scroll
  { name: "AWS", logo: "AWS" },
  { name: "Google Cloud", logo: "GCP" },
  { name: "Microsoft Azure", logo: "Azure" },
  { name: "Jira", logo: "Jira" },
  { name: "GitHub", logo: "GitHub" },
];

const IntegrationStrip = () => {
  return (
    <section className="py-12 border-y border-border bg-card/30 overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="container mx-auto px-6 mb-6 text-center">
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
          Connect once. Monitor continuously.
        </p>
      </div>

      <div className="flex relative overflow-hidden">
        <motion.div
          className="flex gap-16 min-w-max items-center px-16"
          animate={{ x: [0, "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20,
          }}
        >
          {integrations.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 text-2xl font-bold text-muted-foreground/60 hover:text-primary transition-colors cursor-default"
            >
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <span className="text-sm">{item.logo[0]}</span>
              </div>
              {item.name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default IntegrationStrip;
