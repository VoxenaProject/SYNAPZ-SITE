"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import BookingModal from "@/components/ui/BookingModal";

function SearchSVG() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="#7C3AED" strokeWidth="1.8" />
      <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function BoltSVG() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M13 2L4.5 13.5H11.5L10.5 22L20 10.5H13L13 2Z" stroke="#7C3AED" strokeWidth="1.8" strokeLinejoin="round" fill="#7C3AED" fillOpacity={0.1} />
    </svg>
  );
}

function ShieldCheckSVG() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L4 6V12C4 16.5 7.5 20.6 12 22C16.5 20.6 20 16.5 20 12V6L12 2Z" fill="#7C3AED" fillOpacity={0.1} stroke="#7C3AED" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 12L11 14L15 10" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const offerItems = [
  {
    step: "01",
    tag: "VALEUR : 500€",
    title: "L'Audit IA",
    subtitle: "Offert — 0€",
    description:
      "En 30 minutes de call, on cartographie vos 5 processus les plus chronophages. On vous remet un rapport écrit : les 3 automatisations prioritaires, le temps récupéré par semaine, et le coût de mise en place.",
    bonus:
      "Même si on ne travaille jamais ensemble, vous repartez avec un plan d'action concret.",
    Icon: SearchSVG,
    highlight: false,
  },
  {
    step: "02",
    tag: "VALEUR : 2.000€",
    title: "L'Impulsion IA",
    subtitle: "Offert — 0€",
    description:
      "On déploie votre première Impulsion IA. Vous la voyez fonctionner dans votre business en 72 heures. Zéro ligne de code, zéro outil à installer, zéro formation.",
    bonus: "Vous voyez les résultats. Ensuite vous décidez.",
    Icon: BoltSVG,
    highlight: false,
  },
  {
    step: "03",
    tag: "GARANTI",
    title: "La Garantie Absolue",
    subtitle: "Satisfait ou 0€",
    description:
      "Si dans les 30 jours suivant le déploiement vous n'avez pas récupéré au moins 5h/semaine, on continue gratuitement — ou on vous rembourse intégralement.",
    bonus: "Le risque est entièrement sur nous. Pas sur vous.",
    Icon: ShieldCheckSVG,
    highlight: true,
  },
];

export default function Offer() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section id="offre" className="py-28 px-6 bg-[#F5F7FF] below-fold">
        <div className="max-w-5xl mx-auto">
          {/* Headline */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#7C3AED] text-sm font-semibold uppercase tracking-widest mb-4">
              L&apos;offre Grand Slam
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F0F1A] mb-4">
              2.500€ de valeur.
              <br />
              <span className="gradient-text">Votre investissement : 0€.</span>
            </h2>
            <p className="text-[#64748B] text-lg max-w-2xl mx-auto">
              Voici exactement ce que vous obtenez — avant de prendre la moindre décision.
            </p>
          </motion.div>

          {/* Offer stack */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {offerItems.map((item, i) => (
              <motion.div
                key={i}
                className={`relative rounded-2xl p-8 border flex flex-col ${
                  item.highlight
                    ? "border-[#7C3AED]/50 bg-white shadow-lg shadow-[#7C3AED]/10"
                    : "border-[#E2E8F0] bg-white shadow-sm"
                }`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 * i }}
              >
                {/* Icon + Tag */}
                <div className="flex items-center justify-between mb-6">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      item.highlight
                        ? "bg-[#7C3AED] text-white"
                        : "bg-[#F5F7FF] text-[#7C3AED] border border-[#E2E8F0]"
                    }`}
                  >
                    {item.tag}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#F5F7FF] flex items-center justify-center">
                    <item.Icon />
                  </div>
                </div>

                {/* Step number */}
                <span className="text-[#7C3AED]/15 text-6xl font-extrabold absolute top-6 right-8 leading-none select-none">
                  {item.step}
                </span>

                <div className="mb-4">
                  <h3 className="text-xl font-extrabold text-[#0F0F1A] mb-1">
                    {item.title}
                  </h3>
                  <p className={`text-sm font-semibold ${item.highlight ? "text-[#7C3AED]" : "text-[#64748B]"}`}>
                    {item.subtitle}
                  </p>
                </div>

                <p className="text-[#64748B] text-sm leading-relaxed mb-4 flex-1">
                  {item.description}
                </p>

                <p className={`text-sm font-medium italic ${item.highlight ? "text-[#7C3AED]" : "text-[#7C3AED]/70"}`}>
                  &ldquo;{item.bonus}&rdquo;
                </p>
              </motion.div>
            ))}
          </div>

          {/* Value stack — Hormozi */}
          <motion.div
            className="bg-white border border-[#E2E8F0] rounded-2xl p-8 mb-10 shadow-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="max-w-sm mx-auto font-mono text-sm space-y-3">
              <div className="flex justify-between text-[#64748B]">
                <span>Audit IA</span>
                <span className="line-through">500€</span>
              </div>
              <div className="flex justify-between text-[#64748B]">
                <span>Première Impulsion IA</span>
                <span className="line-through">2.000€</span>
              </div>
              <div className="flex justify-between text-[#64748B]">
                <span>Garantie résultats 30 jours</span>
                <span>Inclus</span>
              </div>
              <div className="h-px bg-[#E2E8F0] my-2" />
              <div className="flex justify-between text-[#64748B]">
                <span>Valeur totale</span>
                <span className="line-through">2.500€</span>
              </div>
              <div className="flex justify-between font-extrabold text-lg">
                <span className="text-[#0F0F1A]">Votre investissement</span>
                <span className="gradient-text">0€</span>
              </div>
            </div>
          </motion.div>

          {/* How it works — 3 steps */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <p className="text-center text-[#7C3AED] text-xs font-semibold uppercase tracking-widest mb-8">
              Comment ça marche
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { step: "01", title: "Vous parlez", desc: "30 min de call — on cartographie vos processus", effort: "30 min de votre agenda" },
                { step: "02", title: "On livre", desc: "On déploie votre première Impulsion IA", effort: "72h de notre côté" },
                { step: "03", title: "Vous récupérez", desc: "Votre temps libre dès J+3, garanti", effort: "Zéro effort" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <span className="text-[#7C3AED] font-extrabold text-2xl">{s.step}</span>
                  <h4 className="text-[#0F0F1A] font-bold text-lg mt-2">{s.title}</h4>
                  <p className="text-[#64748B] text-sm mt-1">{s.desc}</p>
                  <p className="text-[#94A3B8] text-xs mt-2 italic">Votre effort : {s.effort}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-[#64748B] text-sm mb-6">
              On ne travaille qu&apos;avec{" "}
              <span className="text-[#0F0F1A] font-semibold">
                5 nouvelles PME par mois.
              </span>
            </p>
            <motion.button
              onClick={() => setModalOpen(true)}
              className="bg-[#7C3AED] text-white font-semibold text-lg px-10 py-4 rounded-xl hover:bg-[#9D6FF0] transition-all shadow-lg shadow-[#7C3AED]/25 hover:shadow-xl hover:shadow-[#7C3AED]/35 cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Obtenir mon audit gratuit →
            </motion.button>
          </motion.div>
        </div>
      </section>

      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
