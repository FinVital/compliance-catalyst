const logos = [
  "AWS", "Google Cloud", "Azure", "Jira", "GitHub",
  "Slack", "Okta", "Cloudflare", "Datadog", "PagerDuty",
];

const IntegrationStrip = () => (
  <section className="py-24 bg-slate-900 overflow-hidden relative">
    <div className="container mx-auto px-6 mb-12 relative z-20">
      <p className="text-center text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
        Connects With Your Entire Stack
      </p>
    </div>
    <div className="relative -mx-8">
      {/* Straight container */}
      <div className="relative flex overflow-hidden border-y border-slate-800/50 bg-slate-900/50 backdrop-blur-sm py-4">
        
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

        {/* Marquee Track */}
        <div className="flex animate-marquee gap-12 items-center whitespace-nowrap w-max">
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-800/60 border border-slate-700/50 shadow-lg shrink-0 hover:bg-slate-700/60 transition-colors"
            >
              <div className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center text-xs font-bold text-teal-400 border border-teal-500/20">
                {logo.charAt(0)}
              </div>
              <span className="text-base font-bold text-slate-300">{logo}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default IntegrationStrip;
