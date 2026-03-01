"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BookingModal from "@/components/ui/BookingModal";
import { GA } from "@/lib/analytics";
import { useReveal } from "@/lib/useReveal";

const faqs = [
  {
    question: "C'est vraiment gratuit au départ ?",
    answer:
      "Complètement. L'audit (500\u20AC de valeur) et la première Impulsion IA (2.000\u20AC de valeur) sont offerts. Vous ne payez que si vous décidez de continuer — et seulement si vous êtes satisfait des résultats. Si dans les 30 jours vous n'avez pas récupéré au moins 5h/semaine, on continue gratuitement ou on vous rembourse. Vous choisissez.",
  },
  {
    question: "On a besoin d'une équipe technique en interne ?",
    answer:
      "Non. C'est précisément pour ça que vous faites appel à nous. Zéro compétence technique requise de votre côté. Zéro code à écrire. Zéro outil à apprendre. On s'occupe de tout — de l'audit au déploiement.",
  },
  {
    question: "Quels types de processus vous automatisez ?",
    answer:
      "Tout ce qui est répétitif et basé sur des règles : traitement d'emails et de formulaires, saisie de données, génération de rapports, réponses aux questions fréquentes, synchronisation d'outils (CRM, comptabilité, calendriers), suivi de commandes, onboarding clients. Si vous le faites plus de 3 fois par semaine, il y a de bonnes chances qu'on puisse l'automatiser.",
  },
  {
    question: "Combien de temps avant de voir des résultats ?",
    answer:
      "Votre première solution IA est en production en 1 semaine. Pas en 3 mois. Pas en 6 mois. 1 semaine. Et vous ne payez rien tant que vous n'avez pas vu les résultats fonctionner dans votre business.",
  },
  {
    question: "On est une petite PME de 5 personnes, c'est pour nous ?",
    answer:
      "C'est exactement pour vous. Les grandes entreprises ont des équipes IT et des millions de budget. Vous, vous n'avez ni l'un ni l'autre — et c'est normal. SYNAPZ existe pour donner aux PME accès aux mêmes outils IA que les grandes boîtes, sans les coûts et sans la complexité. Plus votre équipe est petite, plus chaque heure récupérée a de la valeur.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const [modalOpen, setModalOpen] = useState(false);
  const sectionRef = useReveal<HTMLElement>();

  return (
    <>
    <section id="faq" ref={sectionRef} className="py-32 md:py-40 px-6 bg-[#060612]">
      <div className="max-w-[1100px] mx-auto">
        <div className="reveal text-center mb-16">
          <p className="text-[#7C3AED] text-sm font-semibold uppercase tracking-widest mb-4">
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Vos questions.
            <br />
            <span className="gradient-text">Nos réponses directes.</span>
          </h2>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`reveal reveal-d${Math.min(i + 1, 5)} bg-[#0c0c20] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-[#7C3AED]/25 transition-colors`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer"
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span id={`faq-question-${i}`} className="text-white font-semibold text-base">
                  {faq.question}
                </span>
                <span
                  className="text-[#7C3AED] flex-shrink-0 text-xl leading-none transition-transform duration-200"
                  style={{ transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}
                >
                  +
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-question-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="px-6 pb-5 text-[#94a3b8] text-sm leading-relaxed border-t border-white/[0.06] pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal reveal-d3 text-center mt-10">
          <button
            onClick={() => { GA.bookingModalOpened("faq"); setModalOpen(true); }}
            className="text-[#7C3AED] font-semibold text-sm hover:text-[#9D6FF0] transition-colors cursor-pointer"
          >
            Encore une question ? Parlons-en &rarr;
          </button>
        </div>
      </div>
    </section>

    <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
