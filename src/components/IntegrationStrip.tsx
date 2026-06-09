const logos = [
  { name: "AWS", color: "#FF9900" },
  { name: "Google Cloud", color: "#4285F4" },
  { name: "Azure", color: "#0078D4" },
  { name: "Jira", color: "#0052CC" },
  { name: "GitHub", color: "#ffffff" },
  { name: "Slack", color: "#4A154B" },
  { name: "Okta", color: "#007DC1" },
  { name: "Cloudflare", color: "#F38020" },
  { name: "Datadog", color: "#7B4FFF" },
  { name: "PagerDuty", color: "#06AC38" },
];

const IntegrationStrip = () => (
  <section style={{ background: "#0d111c", borderTop: "1px solid rgba(62,207,178,0.08)", borderBottom: "1px solid rgba(62,207,178,0.08)" }} className="py-12 overflow-hidden">
    <p className="text-center text-xs font-bold uppercase tracking-[0.2em] mb-8" style={{ color: "#4a5568" }}>
      Connects With Your Entire Stack
    </p>
    <div className="relative -mx-8">
      <div className="relative flex overflow-hidden py-2">
        <div className="absolute left-0 top-0 bottom-0 w-40 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #0d111c, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-40 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #0d111c, transparent)" }} />
        <div className="flex animate-marquee gap-6 items-center whitespace-nowrap w-max">
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-5 py-3 rounded-xl shrink-0 transition-all"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: logo.color }} />
              <span className="text-sm font-semibold" style={{ color: "#8b9ab0" }}>{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default IntegrationStrip;
