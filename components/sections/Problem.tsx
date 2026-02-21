"use client";

import { motion } from "framer-motion";

function PercentSVG() {
  return (
    <motion.svg width="26" height="26" viewBox="0 0 24 24" fill="none"
      initial={{ scale: 0, rotate: -30 }} whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true }} transition={{ type: "spring", delay: 0.1 }}
    >
      <motion.circle cx="7.5" cy="7.5" r="2.5" stroke="#7C3AED" strokeWidth="1.8"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
      />
      <motion.circle cx="16.5" cy="16.5" r="2.5" stroke="#7C3AED" strokeWidth="1.8"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}
      />
      <motion.line x1="19" y1="5" x2="5" y2="19"
        stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
      />
    </motion.svg>
  );
}

function EuroSVG() {
  return (
    <motion.svg width="26" height="26" viewBox="0 0 24 24" fill="none"
      initial={{ scale: 0, rotate: -30 }} whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true }} transition={{ type: "spring", delay: 0.2 }}
    >
      <motion.circle cx="12" cy="12" r="9" stroke="#7C3AED" strokeWidth="1.8"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
      />
      <motion.path
        d="M15 8.5C13.5 7.5 11.5 7.5 10 8.5C8.5 9.5 7.5 11 7.5 12.5C7.5 14 8.5 15.5 10 16.5C11.5 17.5 13.5 17.5 15 16.5M7 11H14M7 13.5H14"
        stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}
      />
    </motion.svg>
  );
}

function UsersSVG() {
  return (
    <motion.svg width="26" height="26" viewBox="0 0 24 24" fill="none"
      initial={{ scale: 0, rotate: -30 }} whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true }} transition={{ type: "spring", delay: 0.3 }}
    >
      <motion.path
        d="M16 11C17.66 11 19 9.66 19 8C19 6.34 17.66 5 16 5M20 17C20 15.5 18.5 14 16 13.5"
        stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }}
      />
      <motion.path
        d="M8 11C9.66 11 11 9.66 11 8C11 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM3 19C3 17 5.34 15.5 8 15.5C10.66 15.5 13 17 13 19"
        stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
      />
    </motion.svg>
  );
}

const stats = [
  {
    value: "23%",
    label: "de votre semaine",
    context: "C'est le temps que vos équipes passent sur des tâches entièrement automatisables",
    source: "McKinsey, 2023",
    Icon: PercentSVG,
  },
  {
    value: "35€",
    label: "par heure répétitive",
    context: "Vous payez en masse salariale pour du travail qu'une IA fait en 2 secondes",
    source: "coût moyen PME belge",
    Icon: EuroSVG,
  },
  {
    value: "72%",
    label: "des dirigeants de PME",
    context: "N'ont pas le temps de se concentrer sur la croissance à cause des tâches opérationnelles",
    source: "Deloitte, 2024",
    Icon: UsersSVG,
  },
];

export default function Problem() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#7C3AED] text-sm font-semibold uppercase tracking-widest mb-4">
            La réalité
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F0F1A] mb-8">
            Vous perdez de l&apos;argent.
            <br />
            Chaque semaine.{" "}
            <span className="gradient-text">Sans le savoir.</span>
          </h2>
        </motion.div>

        {/* Narrative block */}
        <motion.div
          className="bg-[#F5F7FF] border border-[#E2E8F0] rounded-2xl p-8 md:p-12 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="space-y-6 text-[#64748B] text-lg leading-relaxed">
            <p>
              En ce moment, pendant que vous lisez ces lignes — un de vos
              employés recopie manuellement des données d&apos;un outil à l&apos;autre.
              Un autre répond pour la{" "}
              <span className="text-[#0F0F1A] font-semibold">dixième fois ce mois-ci</span>{" "}
              à la même question client. Et vous, vous payez ces heures sans
              vous en rendre compte.
            </p>
            <p className="text-xl text-[#0F0F1A] font-semibold">
              Ce n&apos;est pas un manque de volonté. C&apos;est un manque d&apos;information.
            </p>
            <p>
              Personne ne vous a encore montré comment automatiser tout ça —
              sans dépenser 10.000€ ni attendre 6 mois. Et pendant ce temps,
              chaque heure répétitive vous coûte en moyenne{" "}
              <span className="text-[#7C3AED] font-semibold">35€ en masse salariale</span>{" "}
              — pour du travail qu&apos;une IA fait en 2 secondes.
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-6 text-center hover:border-[#7C3AED]/40 hover:shadow-md transition-all shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#F5F7FF] flex items-center justify-center">
                  <stat.Icon />
                </div>
              </div>
              <div className="text-5xl font-extrabold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-[#0F0F1A] font-semibold text-sm mb-2">
                {stat.label}
              </div>
              <div className="text-[#64748B] text-sm leading-relaxed mb-3">
                {stat.context}
              </div>
              <div className="text-[#7C3AED]/60 text-xs italic">
                — {stat.source}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
