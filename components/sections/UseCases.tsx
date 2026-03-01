"use client";

import { useState } from "react";
import { useReveal } from "@/lib/useReveal";
import BookingModal from "@/components/ui/BookingModal";
import { GA } from "@/lib/analytics";

const impulses = [
  {
    category: "Admin",
    title: "Traitement automatique de factures",
    desc: "Extraction, classification et rapprochement bancaire — automatiquement",
    quote: "Résultat moyen : 8h/semaine récupérées",
    delay: "1 semaine",
    impact: "8h/sem. récupérées",
  },
  {
    category: "Commercial",
    title: "Prospection et qualification de leads",
    desc: "Scraping ciblé, séquences emails IA, scoring automatique",
    quote: "Résultat moyen : pipeline actif 24/7 sans intervention",
    delay: "2 semaines",
    impact: "Pipeline 24/7",
  },
  {
    category: "Support",
    title: "Réponses automatiques aux questions fréquentes",
    desc: "Chatbot intelligent, FAQ dynamique, escalade vers l\u2019humain",
    quote: "Résultat moyen : 70% des demandes traitées automatiquement",
    delay: "1 semaine",
    impact: "-70% de tickets",
  },
  {
    category: "Opérations",
    title: "Synchronisation d\u2019outils et reporting",
    desc: "Connexion CRM/ERP/Sheets, dashboards automatiques en temps réel",
    quote: "Résultat moyen : rapports générés en temps réel, 0 saisie manuelle",
    delay: "1 semaine",
    impact: "Rapports temps réel",
  },
];

export default function UseCases() {
  const [modalOpen, setModalOpen] = useState(false);
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <>
    <section className="py-32 md:py-40 px-6 bg-[#0c0c20] below-fold">
      <div ref={revealRef} className="max-w-[1100px] mx-auto">

        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p className="text-[#7C3AED] text-[11px] font-semibold uppercase tracking-[0.05em] mb-5">
            Nos Impulsions IA
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Une Impulsion. Un problème résolu.
            <br />
            <span className="gradient-text">En quelques jours, pas en 6 mois.</span>
          </h2>
          <p className="text-[#94a3b8] text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            Chaque Impulsion est une micro-automatisation IA ciblée sur un problème
            métier concret. Pas besoin d&apos;équipe data ou de budget à 5 chiffres.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {impulses.map((imp, i) => (
            <div
              key={i}
              className={`bg-[#060612] border border-white/[0.06] rounded-2xl p-7 hover:border-[#7C3AED]/25 transition-all duration-300 flex flex-col reveal reveal-d${Math.min(i + 1, 5)}`}
            >
              {/* Category pill */}
              <span className="inline-flex self-start bg-[#7C3AED]/[0.08] text-[#7C3AED] rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                {imp.category}
              </span>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mt-3 leading-snug">
                {imp.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[#94a3b8] mt-2 leading-relaxed">
                {imp.desc}
              </p>

              {/* Result */}
              <p className="text-sm font-medium text-[#7C3AED] mt-4 border-l-2 border-[#7C3AED]/25 pl-4">
                {imp.quote}
              </p>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Separator + metrics */}
              <div className="border-t border-white/[0.06] mt-6 pt-4 flex justify-between">
                <div>
                  <p className="text-[10px] uppercase text-[#64748b] tracking-wider font-medium">
                    Délai
                  </p>
                  <p className="text-sm font-semibold text-white mt-0.5">
                    {imp.delay}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase text-[#64748b] tracking-wider font-medium">
                    Impact
                  </p>
                  <p className="text-sm font-semibold text-[#7C3AED] mt-0.5">
                    {imp.impact}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 reveal reveal-d3">
          <button
            onClick={() => { GA.bookingModalOpened("usecases"); setModalOpen(true); }}
            className="bg-[#7C3AED] text-white font-semibold text-base px-8 py-4 rounded-xl hover:bg-[#9D6FF0] transition-all shadow-lg shadow-[#7C3AED]/25 hover:shadow-xl hover:shadow-[#7C3AED]/35 cursor-pointer"
          >
            Quelle Impulsion pour votre business ? →
          </button>
        </div>
      </div>
    </section>

    <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
