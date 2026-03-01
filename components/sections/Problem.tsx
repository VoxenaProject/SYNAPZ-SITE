"use client";

import { useState } from "react";
import { useReveal } from "@/lib/useReveal";
import BookingModal from "@/components/ui/BookingModal";
import { GA } from "@/lib/analytics";

function CrossIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="8" fill="#7f1d1d" fillOpacity="0.5" />
      <path d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="8" fill="#7C3AED" fillOpacity="0.12" />
      <path d="M5 8L7 10L11 6" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#64748B" strokeWidth="1.5" />
      <path d="M12 7V12L15 14" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M16 11C17.66 11 19 9.66 19 8C19 6.34 17.66 5 16 5M20 17C20 15.5 18.5 14 16 13.5" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 11C9.66 11 11 9.66 11 8C11 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM3 19C3 17 5.34 15.5 8 15.5C10.66 15.5 13 17 13 19" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L2 20H22L12 2Z" stroke="#64748B" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 10V14" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="17" r="0.5" fill="#64748B" stroke="#64748B" />
    </svg>
  );
}

function DoorIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="2" width="12" height="20" rx="1" stroke="#64748B" strokeWidth="1.5" />
      <circle cx="13" cy="12" r="1" fill="#64748B" />
      <path d="M16 5L20 8L16 11" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const beforeItems = [
  "6 mois de projet minimum",
  "Budget de 10.000\u20AC+",
  "Équipe data requise",
  "ROI incertain",
];

const afterItems = [
  "Résultats en 1 semaine",
  "0\u20AC pour commencer",
  "Zéro compétence technique",
  "ROI garanti ou remboursé",
];

const costCards = [
  {
    Icon: ClockIcon,
    title: "Des heures gaspillées chaque semaine",
    desc: "Tâches répétitives qui empêchent vos équipes de se concentrer sur l\u2019essentiel",
    cost: "~400\u20AC/semaine",
  },
  {
    Icon: UsersIcon,
    title: "Des équipes frustrées",
    desc: "Démotivation due aux processus manuels inefficaces et chronophages",
    cost: "Turnover +30%",
  },
  {
    Icon: AlertIcon,
    title: "Des erreurs invisibles mais coûteuses",
    desc: "Erreurs humaines dans les processus manuels qui impactent la rentabilité",
    cost: "5-15% du CA",
  },
  {
    Icon: DoorIcon,
    title: "Des clients qui partent ailleurs",
    desc: "Lenteur de réaction face à la concurrence plus agile et automatisée",
    cost: "20% de clients perdus",
  },
];

export default function Problem() {
  const [modalOpen, setModalOpen] = useState(false);
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <>
    <section className="py-32 md:py-40 px-6 bg-[#060612] below-fold">
      <div ref={revealRef} className="max-w-[1100px] mx-auto">

        {/* Part A: Hook + Before/After */}
        <div className="text-center mb-16 reveal">
          <p className="text-[#7C3AED] text-[11px] font-semibold uppercase tracking-[0.05em] mb-5">
            La réalité
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Pourquoi 80% des projets IA échouent.
            <br />
            <span className="gradient-text italic">(et comment les éviter)</span>
          </h2>
          <p className="text-[#94a3b8] text-lg mt-6 max-w-2xl mx-auto">
            Trop longs. Trop techniques. Trop flous.
            Chez SYNAPZ, on fait l&apos;inverse : des{" "}
            <span className="text-white font-semibold">Impulsions IA</span>{" "}
            ciblées, à impact immédiat.
          </p>
        </div>

        {/* Before / After grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-24 md:mb-32">
          {/* Before */}
          <div className="bg-red-950/20 border border-red-500/15 rounded-2xl p-8 reveal reveal-d1">
            <p className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-1">Avant</p>
            <h3 className="text-lg font-bold text-red-300 mb-6">Projets IA traditionnels</h3>
            <ul className="space-y-4">
              {beforeItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[#94a3b8] text-[15px]">
                  <span className="mt-0.5 shrink-0"><CrossIcon /></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div className="bg-[#7C3AED]/[0.05] border border-[#7C3AED]/20 rounded-2xl p-8 relative reveal reveal-d2">
            <div className="absolute top-4 right-4 bg-[#7C3AED] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Recommandé
            </div>
            <p className="text-sm font-semibold text-[#7C3AED] uppercase tracking-wider mb-1">Après</p>
            <h3 className="text-lg font-bold text-white mb-6">Impulsions IA SYNAPZ</h3>
            <ul className="space-y-4">
              {afterItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[#94a3b8] text-[15px]">
                  <span className="mt-0.5 shrink-0"><CheckIcon /></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Part B: Cost of Inaction */}
        <div className="text-center mb-12 reveal reveal-d1">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Ce que vous coûte{" "}
            <span className="gradient-text italic">l&apos;inaction</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {costCards.map((card, i) => (
            <div
              key={i}
              className={`bg-[#0c0c20] border border-white/[0.06] rounded-2xl p-8 hover:border-[#7C3AED]/25 transition-all duration-300 reveal reveal-d${Math.min(i + 1, 5)}`}
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/[0.04] flex items-center justify-center shrink-0">
                  <card.Icon />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-base mb-2">
                    {card.title}
                  </h3>
                  <p className="text-[#94a3b8] text-sm leading-relaxed mb-4">
                    {card.desc}
                  </p>
                  <span className="inline-flex items-center bg-red-950/30 text-red-400 border border-red-500/20 rounded-full px-3 py-1 text-xs font-bold">
                    Coût : {card.cost}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 reveal reveal-d3">
          <button
            onClick={() => { GA.bookingModalOpened("problem"); setModalOpen(true); }}
            className="bg-[#7C3AED] text-white font-semibold text-base px-8 py-4 rounded-xl hover:bg-[#9D6FF0] transition-all shadow-lg shadow-[#7C3AED]/25 hover:shadow-xl hover:shadow-[#7C3AED]/35 cursor-pointer"
          >
            Éviter tout ça — Obtenir mon audit gratuit →
          </button>
        </div>
      </div>
    </section>

    <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
