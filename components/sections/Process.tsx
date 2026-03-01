"use client";

import { useReveal } from "@/lib/useReveal";

function MicSVG() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="9" y="3" width="6" height="10" rx="3" stroke="#7C3AED" strokeWidth="1.8" />
      <path
        d="M5 11C5 14.87 8.13 18 12 18C15.87 18 19 14.87 19 11"
        stroke="#7C3AED"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line x1="12" y1="18" x2="12" y2="22" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CodeSVG() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M8 8L3 12L8 16" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 8L21 12L16 16" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="14" y1="4" x2="10" y2="20" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CheckCircleSVG() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#7C3AED" strokeWidth="1.8" fill="#7C3AED" fillOpacity={0.08} />
      <path d="M8 12L11 15L16 9" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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
    duration: "1 semaine",
    description:
      "On construit votre solution. On vous la présente. Vous approuvez. Elle est en production — gratuitement.",
    detail: "Zéro compétence technique. Zéro outil à installer. Zéro formation. Zéro facture à ce stade.",
    effort: "Votre effort : 15 minutes pour valider.",
    Icon: CodeSVG,
  },
  {
    number: "03",
    title: "Vous récupérez votre temps.",
    duration: "dès J+7",
    description:
      "Le système tourne en arrière-plan. Vous ne faites plus rien. On mesure les résultats avec vous à J+30.",
    detail: "Si la valeur n'est pas au rendez-vous, vous ne payez rien. C'est aussi simple que ça.",
    effort: "Votre effort : zéro.",
    Icon: CheckCircleSVG,
  },
];

export default function Process() {
  const headerRef = useReveal<HTMLDivElement>();
  const step0Ref = useReveal<HTMLDivElement>();
  const step1Ref = useReveal<HTMLDivElement>();
  const step2Ref = useReveal<HTMLDivElement>();
  const stepRefs = [step0Ref, step1Ref, step2Ref];

  return (
    <section id="approche" className="py-32 md:py-40 px-6 bg-[#0c0c20]">
      <div className="max-w-[1100px] mx-auto">
        <div ref={headerRef} className="reveal text-center mb-20">
          <p className="text-[#7C3AED] text-sm font-semibold uppercase tracking-widest mb-4">
            Notre approche
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Trois &eacute;tapes.
            <br />
            <span className="gradient-text">Z&eacute;ro effort de votre c&ocirc;t&eacute;.</span>
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/[0.06] -translate-x-1/2 hidden md:block" />

          <div className="space-y-16">
            {steps.map((step, i) => (
              <div
                key={i}
                ref={stepRefs[i]}
                className={`reveal reveal-d${i + 1} flex flex-col md:flex-row gap-8 items-start ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className={`flex-1 ${i % 2 === 1 ? "md:text-right" : ""}`}>
                  <div className={`flex items-center gap-3 mb-4 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                    <span className="bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-bold px-3 py-1 rounded-full border border-[#7C3AED]/20">
                      {step.duration}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#94a3b8] leading-relaxed mb-3">
                    {step.description}
                  </p>
                  <p className="text-[#64748b] text-sm leading-relaxed mb-4">
                    {step.detail}
                  </p>
                  <div className="inline-flex items-center gap-2 bg-[#060612] border border-white/[0.06] rounded-lg px-4 py-2">
                    <span className="text-[#7C3AED]">&rarr;</span>
                    <span className="text-white text-sm font-semibold">
                      {step.effort}
                    </span>
                  </div>
                </div>

                {/* Circle with icon + number */}
                <div className="relative flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto md:mx-0">
                  <div className="w-16 h-16 rounded-full bg-[#0c0c20] border-2 border-[#7C3AED] shadow-md shadow-[#7C3AED]/15 flex flex-col items-center justify-center gap-0.5 z-10">
                    <step.Icon />
                    <span className="text-[10px] font-extrabold gradient-text leading-none">
                      {step.number}
                    </span>
                  </div>
                </div>

                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
