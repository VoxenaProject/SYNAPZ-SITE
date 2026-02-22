"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import BookingModal from "@/components/ui/BookingModal";

const ease = [0.25, 0.1, 0.25, 1] as const;

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
    desc: "Chatbot intelligent, FAQ dynamique, escalade vers l'humain",
    quote: "Résultat moyen : 70% des demandes traitées automatiquement",
    delay: "1 semaine",
    impact: "-70% de tickets",
  },
  {
    category: "Marketing",
    title: "Génération de contenu automatisée",
    desc: "Posts LinkedIn, newsletters, visuels — créés et planifiés par l'IA",
    quote: "Résultat moyen : 5h/semaine économisées sur le contenu",
    delay: "1 semaine",
    impact: "5h/sem. économisées",
  },
  {
    category: "RH",
    title: "Onboarding et gestion administrative",
    desc: "Documents générés, welcome packs, réponses RH automatisées",
    quote: "Résultat moyen : onboarding réduit de 3 jours à 30 minutes",
    delay: "2 semaines",
    impact: "Équipe RH libérée",
  },
  {
    category: "Opérations",
    title: "Synchronisation d'outils et reporting",
    desc: "Connexion CRM/ERP/Sheets, dashboards automatiques en temps réel",
    quote: "Résultat moyen : rapports générés en temps réel, 0 saisie manuelle",
    delay: "1 semaine",
    impact: "Rapports temps réel",
  },
];

export default function UseCases() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
    <section className="py-28 md:py-32 px-6 bg-[#F5F7FF] below-fold">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="text-[#7C3AED] text-[11px] font-semibold uppercase tracking-[0.05em] mb-5">
            Nos Impulsions IA
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0F0F1A] leading-tight">
            Une Impulsion. Un problème résolu.
            <br />
            <span className="gradient-text">En quelques jours, pas en 6 mois.</span>
          </h2>
          <p className="text-[#64748B] text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            Chaque Impulsion est une micro-automatisation IA ciblée sur un problème
            métier concret. Pas besoin d&apos;équipe data ou de budget à 5 chiffres.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {impulses.map((imp, i) => (
            <motion.div
              key={i}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-7 hover:border-[#7C3AED]/25 hover:shadow-md transition-all duration-300 flex flex-col"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
            >
              {/* Category pill */}
              <span className="inline-flex self-start bg-[#7C3AED]/8 text-[#7C3AED] rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                {imp.category}
              </span>

              {/* Title */}
              <h3 className="text-lg font-bold text-[#0F0F1A] mt-3 leading-snug">
                {imp.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[#64748B] mt-2 leading-relaxed">
                {imp.desc}
              </p>

              {/* Result */}
              <p className="text-sm font-medium text-[#7C3AED] mt-4 border-l-2 border-[#7C3AED]/25 pl-4">
                {imp.quote}
              </p>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Separator + metrics */}
              <div className="border-t border-[#E2E8F0] mt-6 pt-4 flex justify-between">
                <div>
                  <p className="text-[10px] uppercase text-[#94A3B8] tracking-wider font-medium">
                    Délai
                  </p>
                  <p className="text-sm font-semibold text-[#0F0F1A] mt-0.5">
                    {imp.delay}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase text-[#94A3B8] tracking-wider font-medium">
                    Impact
                  </p>
                  <p className="text-sm font-semibold text-[#7C3AED] mt-0.5">
                    {imp.impact}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button
            onClick={() => setModalOpen(true)}
            className="bg-[#7C3AED] text-white font-semibold text-base px-8 py-4 rounded-xl hover:bg-[#9D6FF0] transition-all shadow-lg shadow-[#7C3AED]/25 hover:shadow-xl hover:shadow-[#7C3AED]/35 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Quelle Impulsion pour votre business ? →
          </motion.button>
        </motion.div>
      </div>
    </section>

    <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
