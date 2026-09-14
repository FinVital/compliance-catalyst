import { motion } from "framer-motion";
import { Award, Users, CheckCircle2, Shield, Landmark } from "lucide-react";

const team = [
  {
    name: "Madiha Mukarram",
    role: "CEO & Co-Founder",
    credentials: "M.S. Cyber-Security, Strayer University",
    bio: "Cybersecurity Leader. Directs corporate strategy, go-to-market execution, and enterprise client scaling.",
    tag: "Strategy & GTM",
  },
  {
    name: "Moazzam Waheed",
    role: "CTO & Co-Founder",
    credentials: "AI Architect (15+ Yrs Experience)",
    bio: "Designed private RAG engine, dual model router cascade, and air-gapped on-premise governance package.",
    tag: "AI Architecture",
  },
  {
    name: "Nazim Khan",
    role: "Co-Founder — Audit Assurance",
    credentials: "CISM · CISA · ISO 27001 ISA",
    bio: "Regulatory & Audit Lead. Oversees multi-standard framework crosswalks and auditor credibility.",
    tag: "Regulatory Lead",
  },
];

const milestones = [
  {
    title: "Production Software Shipped",
    desc: "Discovers assets, maps rules, and executes offline RAG & inference on host Ollama.",
  },
  {
    title: "Built-in Framework Set",
    desc: "Pre-loaded with ISO 42001, EU AI Act, ISO 23894, ISO 38507, OECD & UNESCO.",
  },
  {
    title: "Auditor Validation & Incubator Backing",
    desc: "Tested with 20+ risk managers; backed by NIC · IGNITE · MoITT.",
  },
];

const TractionAndLeadership = () => {
  return (
    <section className="py-24 bg-[#F0F6F8] border-b border-slate-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top: Traction & Validation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-left"
        >
          <div className="ca-badge mb-4">
            <Award className="w-3.5 h-3.5 text-[#00A896]" />
            Traction & Validation
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-serif mb-4">
            Tested with Real Telemetry. <br />
            <span className="text-[#00A896] italic font-serif">Validated by Risk Leaders.</span>
          </h2>

          {/* Institutional Backing Banner */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                <Landmark className="w-6 h-6 text-[#059669]" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">INSTITUTIONAL BACKING</span>
                <span className="text-lg font-bold text-slate-900 font-serif">Backed by NIC · IGNITE · MoITT</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-700">
                20+ Risk Managers Tested
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-[#00F2C8]/10 border border-[#00F2C8]/30 text-xs font-mono font-bold text-[#00A896]">
                Production Ready
              </span>
            </div>
          </div>

          {/* Milestones 3-Col */}
          <div className="grid md:grid-cols-3 gap-6">
            {milestones.map((m, i) => (
              <div key={i} className="outlined_card bg-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-[#00A896]" />
                    <span className="text-xs font-mono font-bold text-[#00A896]">MILESTONE 0{i + 1}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 font-serif">{m.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom: Core Leadership */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left"
        >
          <div className="ca-badge mb-4">
            <Users className="w-3.5 h-3.5 text-[#00A896]" />
            Founding Leadership
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-serif mb-8">
            Founder-Led Engineering & Regulatory Expertise
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="outlined_card bg-white flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#00A896] bg-[#00F2C8]/10 border border-[#00F2C8]/30 px-2.5 py-1 rounded-full">
                      {member.tag}
                    </span>
                    <Shield className="w-4 h-4 text-slate-400" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-1 font-serif">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#00A896] mb-2 font-mono">
                    {member.role}
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono mb-4">
                    {member.credentials}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default TractionAndLeadership;
