"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import BookingModal from "@/components/ui/BookingModal";

const ease = [0.25, 0.1, 0.25, 1] as const;

function CrossIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="8" fill="#FEE2E2" />
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
    <motion.svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      initial={{ scale: 0 }} whileInView={{ scale: 1 }}
      viewport={{ once: true }} transition={{ duration: 0.5, ease }}
    >
      <circle cx="12" cy="12" r="9" stroke="#64748B" strokeWidth="1.5" />
      <path d="M12 7V12L15 14" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
    </motion.svg>
  );
}

function UsersIcon() {
  return (
    <motion.svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      initial={{ scale: 0 }} whileInView={{ scale: 1 }}
      viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1, ease }}
    >
      <path d="M16 11C17.66 11 19 9.66 19 8C19 6.34 17.66 5 16 5M20 17C20 15.5 18.5 14 16 13.5" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 11C9.66 11 11 9.66 11 8C11 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM3 19C3 17 5.34 15.5 8 15.5C10.66 15.5 13 17 13 19" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
    </motion.svg>
  );
}

function AlertIcon() {
  return (
    <motion.svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      initial={{ scale: 0 }} whileInView={{ scale: 1 }}
      viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2, ease }}
    >
      <path d="M12 2L2 20H22L12 2Z" stroke="#64748B" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 10V14" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="17" r="0.5" fill="#64748B" stroke="#64748B" />
    </motion.svg>
  );
}

function DoorIcon() {
  return (
    <motion.svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      initial={{ scale: 0 }} whileInView={{ scale: 1 }}
      viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3, ease }}
    >
      <rect x="4" y="2" width="12" height="20" rx="1" stroke="#64748B" strokeWidth="1.5" />
      <circle cx="13" cy="12" r="1" fill="#64748B" />
      <path d="M16 5L20 8L16 11" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  );
}

const beforeItems = [
  "6 mois de projet minimum",
  "Budget de 10.000€+",
  "Équipe data requise",
  "ROI incertain",
];

const afterItems = [
  "Résultats en 72 heures",
  "0€ pour commencer",
  "Zéro compétence technique",
  "ROI garanti ou remboursé",
];

const costCards = [
  {
    Icon: ClockIcon,
    title: "Des heures gaspillées chaque semaine",
    desc: "Tâches répétitives qui empêchent vos équipes de se concentrer sur l'essentiel",
    cost: "~400€/semaine",
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

  return (
    <>
    <section className="py-28 md:py-32 px-6 bg-white below-fold">
      <div className="max-w-5xl mx-auto">

        {/* ── Part A: Hook + Before/After ── */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="text-[#7C3AED] text-[11px] font-semibold uppercase tracking-[0.05em] mb-5">
            La réalité
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0F0F1A] leading-tight">
            Pourquoi 80% des projets IA échouent.
            <br />
            <span className="gradient-text italic">(et comment les éviter)</span>
          </h2>
          <p className="text-[#64748B] text-lg mt-6 max-w-2xl mx-auto">
            Trop longs. Trop techniques. Trop flous.
            Chez SYNAPZ, on fait l&apos;inverse : des{" "}
            <span className="text-[#0F0F1A] font-semibold">Impulsions IA</span>{" "}
            ciblées, à impact immédiat.
          </p>
        </motion.div>

        {/* Before / After grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-24 md:mb-32">
          {/* Before */}
          <motion.div
            className="bg-[#FEF2F2] border border-red-200/60 rounded-2xl p-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-1">Avant</p>
            <h3 className="text-lg font-bold text-red-900 mb-6">Projets IA traditionnels</h3>
            <ul className="space-y-4">
              {beforeItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[#64748B] text-[15px]">
                  <span className="mt-0.5 shrink-0"><CrossIcon /></span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* After */}
          <motion.div
            className="bg-[#7C3AED]/5 border border-[#7C3AED]/20 rounded-2xl p-8 relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            <div className="absolute top-4 right-4 bg-[#7C3AED] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Recommandé
            </div>
            <p className="text-sm font-semibold text-[#7C3AED] uppercase tracking-wider mb-1">Après</p>
            <h3 className="text-lg font-bold text-[#0F0F1A] mb-6">Impulsions IA SYNAPZ</h3>
            <ul className="space-y-4">
              {afterItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[#64748B] text-[15px]">
                  <span className="mt-0.5 shrink-0"><CheckIcon /></span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ── Part B: Cost of Inaction ── */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F0F1A]">
            Ce que vous coûte{" "}
            <span className="gradient-text italic">l&apos;inaction</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {costCards.map((card, i) => (
            <motion.div
              key={i}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#F5F7FF] flex items-center justify-center shrink-0">
                  <card.Icon />
                </div>
                <div className="flex-1">
                  <h3 className="text-[#0F0F1A] font-bold text-base mb-2">
                    {card.title}
                  </h3>
                  <p className="text-[#64748B] text-sm leading-relaxed mb-4">
                    {card.desc}
                  </p>
                  <span className="inline-flex items-center bg-red-50 text-red-600 border border-red-200 rounded-full px-3 py-1 text-xs font-bold">
                    Coût : {card.cost}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button
            onClick={() => setModalOpen(true)}
            className="bg-[#7C3AED] text-white font-semibold text-base px-8 py-4 rounded-xl hover:bg-[#9D6FF0] transition-all shadow-lg shadow-[#7C3AED]/25 hover:shadow-xl hover:shadow-[#7C3AED]/35 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Éviter tout ça — Obtenir mon audit gratuit →
          </motion.button>
        </motion.div>
      </div>
    </section>

    <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
