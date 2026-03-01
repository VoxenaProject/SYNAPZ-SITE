"use client";

import { motion } from "framer-motion";

const rows = [
  { label: "Coût d'entrée", classic: "3.000 – 10.000€", freelance: "1.500 – 5.000€", synapz: "0€" },
  { label: "Délai avant résultats", classic: "3 – 6 mois", freelance: "1 – 3 mois", synapz: "1 semaine" },
  { label: "Garantie résultats", classic: false, freelance: false, synapz: true },
  { label: "Engagement", classic: "Contrat 12 mois", freelance: "Projet fixe", synapz: "Zéro engagement" },
  { label: "Parle votre langue", classic: false, freelance: false, synapz: true },
  { label: "Risque financier", classic: "Vous", freelance: "Vous", synapz: "SYNAPZ" },
];

function CheckSVG() {
  return (
    <motion.svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      initial={{ scale: 0 }} whileInView={{ scale: 1 }}
      viewport={{ once: true }} transition={{ type: "spring" }}
    >
      <circle cx="12" cy="12" r="9" fill="#22C55E" fillOpacity={0.15} stroke="#22C55E" strokeWidth="1.5" />
      <motion.path d="M8 12L11 15L16 9"
        stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.1 }}
      />
    </motion.svg>
  );
}

function CrossSVG() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" fill="#EF4444" fillOpacity={0.1} stroke="#EF4444" strokeWidth="1.5" />
      <path d="M9 9L15 15M15 9L9 15" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Cell({ value, isSynapz }: { value: string | boolean; isSynapz: boolean }) {
  if (typeof value === "boolean") {
    return value ? <CheckSVG /> : <CrossSVG />;
  }
  return (
    <span className={`text-sm font-semibold ${isSynapz ? "text-[#0F0F1A]" : "text-[#64748B]"}`}>
      {value}
    </span>
  );
}

export default function Comparison() {
  return (
    <section className="py-28 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#7C3AED] text-sm font-semibold uppercase tracking-widest mb-4">
            Comparatif
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F0F1A] mb-4">
            Pourquoi les autres agences IA
            <br />
            <span className="gradient-text">ne fonctionnent pas pour les PME.</span>
          </h2>
        </motion.div>

        <motion.div
          className="overflow-x-auto rounded-2xl border border-[#E2E8F0] shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F5F7FF]">
                <th className="text-left text-[#64748B] text-sm font-medium px-6 py-4 w-1/4">
                  Critère
                </th>
                <th className="text-center text-[#64748B] text-sm font-medium px-4 py-4">
                  Agences IA classiques
                </th>
                <th className="text-center text-[#64748B] text-sm font-medium px-4 py-4">
                  Freelances tech
                </th>
                <th className="text-center text-sm font-bold px-4 py-4 bg-[#7C3AED]/8">
                  <span className="gradient-text">SYNAPZ</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <motion.tr
                  key={i}
                  className={`border-b border-[#E2E8F0] last:border-0 ${
                    i % 2 === 0 ? "bg-white" : "bg-[#F5F7FF]/50"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 * i }}
                >
                  <td className="text-[#0F0F1A] text-sm font-medium px-6 py-4">
                    {row.label}
                  </td>
                  <td className="text-center px-4 py-4">
                    <Cell value={row.classic} isSynapz={false} />
                  </td>
                  <td className="text-center px-4 py-4">
                    <Cell value={row.freelance} isSynapz={false} />
                  </td>
                  <td className="text-center px-4 py-4 bg-[#7C3AED]/5">
                    <Cell value={row.synapz} isSynapz={true} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.p
          className="text-center text-[#64748B] mt-8 text-base max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Toutes les agences IA vous demandent de leur faire confiance{" "}
          <em>avant</em> de vous prouver quoi que ce soit.{" "}
          <span className="text-[#0F0F1A] font-semibold">
            Nous, on prouve d&apos;abord. Vous décidez ensuite.
          </span>
        </motion.p>
      </div>
    </section>
  );
}
