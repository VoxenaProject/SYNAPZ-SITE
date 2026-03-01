"use client";

import { useReveal } from "@/lib/useReveal";

const team = [
  {
    name: "Dejvi Prifti",
    role: "CEO & Automatisation IA",
    initials: "DP",
    credentials: "Co-fondateur SYNAPZ",
    linkedin: "https://www.linkedin.com/in/dejvi-prifti/",
    quote:
      "Mon obsession : que chaque PME qu'on accompagne récupère au minimum 5 heures par semaine. Si on n'y arrive pas, c'est gratuit.",
    color: "#7C3AED",
  },
  {
    name: "Daniele Rutigliano",
    role: "Stratégie IA & Conseil",
    initials: "DR",
    credentials: "Co-fondateur SYNAPZ",
    linkedin: "https://www.linkedin.com/in/daniele-rutigliano/",
    quote:
      "Chaque euro investi doit rapporter 10x. Je m'assure que chaque solution qu'on déploie a un impact mesurable sur votre rentabilité.",
    color: "#06B6D4",
  },
];

export default function Team() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section
      id="equipe"
      ref={sectionRef}
      className="py-32 md:py-40 px-6 bg-[#0c0c20] below-fold"
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="reveal text-center mb-16">
          <p className="text-[#7C3AED] text-sm font-semibold uppercase tracking-widest mb-4">
            L&apos;équipe
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Deux personnes. Pas une agence
            <br />
            <span className="gradient-text">de 200 consultants anonymes.</span>
          </h2>
          <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
            Quand vous bookez un call avec SYNAPZ, vous parlez à la personne
            qui va construire votre automatisation. Pas à un commercial.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {team.map((member, i) => (
            <div
              key={i}
              className={`reveal ${i === 0 ? "reveal-d1" : "reveal-d2"} bg-[#060612] border border-white/[0.06] rounded-2xl p-8 hover:border-[#7C3AED]/25 transition-all`}
            >
              {/* Avatar */}
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center text-3xl font-extrabold text-white mb-6"
                style={{
                  background: `linear-gradient(135deg, ${member.color}30, ${member.color}60)`,
                  border: `2px solid ${member.color}40`,
                }}
              >
                <span style={{ color: member.color }}>{member.initials}</span>
              </div>

              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-xl font-extrabold text-white">
                  {member.name}
                </h3>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#64748b] hover:text-[#0A66C2] transition-colors"
                  aria-label={`LinkedIn de ${member.name}`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
              <p className="text-sm font-semibold mb-1" style={{ color: member.color }}>
                {member.role}
              </p>
              <p className="text-xs text-[#64748b] mb-4">
                {member.credentials}
              </p>
              <p className="text-[#94a3b8] text-sm leading-relaxed italic">
                &ldquo;{member.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>

        <div className="reveal reveal-d3 text-center">
          <div className="inline-flex items-center gap-3 bg-[#0c0c20] border border-white/[0.06] rounded-full px-6 py-3">
            <span className="text-[#7C3AED]">&rarr;</span>
            <span className="text-white font-semibold text-sm">
              On ne délègue pas votre projet. On le fait nous-mêmes.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
