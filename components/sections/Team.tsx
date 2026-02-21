"use client";

import { motion } from "framer-motion";

const team = [
  {
    name: "Dejvi Prifti",
    role: "CEO & Automatisation IA",
    initials: "DP",
    quote:
      "Je construis les systèmes concrets. Si quelque chose peut être automatisé dans votre business, je l'identifie et je le livre en 72h.",
    color: "#7C3AED",
  },
  {
    name: "Daniele Rutigliano",
    role: "Stratégie IA & Conseil",
    initials: "DR",
    quote:
      "Je cartographie comment l'IA s'intègre dans votre business sans tout bouleverser. La stratégie avant la technologie.",
    color: "#06B6D4",
  },
];

export default function Team() {
  return (
    <section id="equipe" className="py-24 px-6 bg-[#F5F7FF]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#7C3AED] text-sm font-semibold uppercase tracking-widest mb-4">
            L&apos;équipe
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F0F1A] mb-4">
            Deux personnes. Pas une agence
            <br />
            <span className="gradient-text">de 200 consultants anonymes.</span>
          </h2>
          <p className="text-[#64748B] text-lg max-w-2xl mx-auto">
            Quand vous bookez un call avec SYNAPZ, vous parlez à la personne
            qui va construire votre automatisation. Pas à un commercial.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {team.map((member, i) => (
            <motion.div
              key={i}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-8 hover:border-[#7C3AED]/30 hover:shadow-md transition-all shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
            >
              {/* Avatar */}
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-extrabold text-white mb-6"
                style={{
                  background: `linear-gradient(135deg, ${member.color}30, ${member.color}60)`,
                  border: `2px solid ${member.color}40`,
                }}
              >
                <span style={{ color: member.color }}>{member.initials}</span>
              </div>

              <h3 className="text-xl font-extrabold text-[#0F0F1A] mb-1">
                {member.name}
              </h3>
              <p className="text-sm font-semibold mb-4" style={{ color: member.color }}>
                {member.role}
              </p>
              <p className="text-[#64748B] text-sm leading-relaxed italic">
                &ldquo;{member.quote}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-3 bg-white border border-[#E2E8F0] rounded-full px-6 py-3 shadow-sm">
            <span className="text-[#7C3AED]">→</span>
            <span className="text-[#0F0F1A] font-semibold text-sm">
              On ne délègue pas votre projet. On le fait nous-mêmes.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
