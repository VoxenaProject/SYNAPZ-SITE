"use client";

import { motion } from "framer-motion";

function MicSVG() {
  return (
    <motion.svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      initial={{ scale: 0 }} whileInView={{ scale: 1 }}
      viewport={{ once: true }} transition={{ type: "spring", delay: 0.2 }}
    >
      <motion.rect x="9" y="3" width="6" height="10" rx="3"
        stroke="#7C3AED" strokeWidth="1.8"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
      />
      <motion.path d="M5 11C5 14.87 8.13 18 12 18C15.87 18 19 14.87 19 11"
        stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.5 }}
      />
      <motion.line x1="12" y1="18" x2="12" y2="22"
        stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.8 }}
      />
    </motion.svg>
  );
}

function CodeSVG() {
  return (
    <motion.svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      initial={{ scale: 0 }} whileInView={{ scale: 1 }}
      viewport={{ once: true }} transition={{ type: "spring", delay: 0.2 }}
    >
      <motion.path d="M8 8L3 12L8 16"
        stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 }}
      />
      <motion.path d="M16 8L21 12L16 16"
        stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.4 }}
      />
      <motion.line x1="14" y1="4" x2="10" y2="20"
        stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.6 }}
      />
    </motion.svg>
  );
}

function CheckCircleSVG() {
  return (
    <motion.svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      initial={{ scale: 0 }} whileInView={{ scale: 1 }}
      viewport={{ once: true }} transition={{ type: "spring", delay: 0.2 }}
    >
      <motion.circle cx="12" cy="12" r="9"
        stroke="#7C3AED" strokeWidth="1.8" fill="#7C3AED" fillOpacity={0.08}
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
      />
      <motion.path d="M8 12L11 15L16 9"
        stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.7 }}
      />
    </motion.svg>
  );
}

const steps = [
  {
    number: "01",
    title: "Vous parlez. On écoute.",
    duration: "30 min",
    description:
      "Un appel de 30 minutes. Vous décrivez votre quotidien. Pas de préparation. On pose les bonnes questions.",
    detail: "En sortant, vous avez déjà votre liste des 3-5 automatisations prioritaires.",
    effort: "Votre effort : 30 minutes de votre agenda.",
    Icon: MicSVG,
  },
  {
    number: "02",
    title: "On livre.",
    duration: "72h",
    description:
      "On construit l'automatisation. On vous la présente. Vous approuvez. Elle est en production.",
    detail: "Zéro compétence technique. Zéro outil à installer. Zéro formation.",
    effort: "Votre effort : 15 minutes pour valider.",
    Icon: CodeSVG,
  },
  {
    number: "03",
    title: "Vous récupérez votre temps.",
    duration: "dès J+3",
    description:
      "Le système tourne en arrière-plan. Vous ne faites plus rien. On mesure les résultats avec vous à J+30.",
    detail: "Si vous n'avez pas récupéré 5h/semaine, on continue gratuitement.",
    effort: "Votre effort : zéro.",
    Icon: CheckCircleSVG,
  },
];

export default function Process() {
  return (
    <section id="approche" className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#7C3AED] text-sm font-semibold uppercase tracking-widest mb-4">
            Notre approche
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F0F1A] mb-4">
            Trois étapes.
            <br />
            <span className="gradient-text">Zéro effort de votre côté.</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-[#E2E8F0] -translate-x-1/2 hidden md:block" />

          <div className="space-y-16">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className={`flex flex-col md:flex-row gap-8 items-start ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
              >
                <div className={`flex-1 ${i % 2 === 1 ? "md:text-right" : ""}`}>
                  <div className={`flex items-center gap-3 mb-4 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                    <span className="bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-bold px-3 py-1 rounded-full border border-[#7C3AED]/20">
                      {step.duration}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-[#0F0F1A] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#64748B] leading-relaxed mb-3">
                    {step.description}
                  </p>
                  <p className="text-[#64748B] text-sm leading-relaxed mb-4">
                    {step.detail}
                  </p>
                  <div className="inline-flex items-center gap-2 bg-[#F5F7FF] border border-[#E2E8F0] rounded-lg px-4 py-2">
                    <span className="text-[#7C3AED]">→</span>
                    <span className="text-[#0F0F1A] text-sm font-semibold">
                      {step.effort}
                    </span>
                  </div>
                </div>

                {/* Circle with icon + number */}
                <div className="relative flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto md:mx-0">
                  <div className="w-16 h-16 rounded-full bg-white border-2 border-[#7C3AED] shadow-md shadow-[#7C3AED]/15 flex flex-col items-center justify-center gap-0.5 z-10">
                    <step.Icon />
                    <span className="text-[10px] font-extrabold gradient-text leading-none">
                      {step.number}
                    </span>
                  </div>
                </div>

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
