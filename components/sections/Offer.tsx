"use client";

import { useState } from "react";
import { useReveal } from "@/lib/useReveal";
import BookingModal from "@/components/ui/BookingModal";
import { GA } from "@/lib/analytics";

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
    tag: "VALEUR : 500\u20AC",
    title: "L\u2019Audit IA",
    subtitle: "Offert — 0\u20AC",
    description:
      "En 30 minutes de call, on cartographie vos 5 processus les plus chronophages. On vous remet un rapport écrit : les 3 automatisations prioritaires, le temps récupéré par semaine, et le coût de mise en place.",
    bonus:
      "Même si on ne travaille jamais ensemble, vous repartez avec un plan d\u2019action concret.",
    Icon: SearchSVG,
    highlight: false,
  },
  {
    step: "02",
    tag: "VALEUR : 2.000\u20AC",
    title: "L\u2019Impulsion IA",
    subtitle: "Offert — 0\u20AC",
    description:
      "On déploie votre première solution IA. Vous la voyez fonctionner dans votre business en 1 semaine. Zéro ligne de code, zéro outil à installer, zéro formation.",
    bonus: "Vous voyez les résultats. Ensuite vous décidez.",
    Icon: BoltSVG,
    highlight: false,
  },
  {
    step: "03",
    tag: "GARANTI",
    title: "La Garantie Absolue",
    subtitle: "Satisfait ou 0\u20AC",
    description:
      "Si dans les 30 jours suivant le déploiement vous n\u2019avez pas récupéré au moins 5h/semaine, on continue gratuitement — ou on vous rembourse intégralement.",
    bonus: "Le risque est entièrement sur nous. Pas sur vous.",
    Icon: ShieldCheckSVG,
    highlight: true,
  },
];

export default function Offer() {
  const [modalOpen, setModalOpen] = useState(false);
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <>
      <section id="offre" className="py-32 md:py-40 px-6 bg-[#0c0c20] below-fold">
        <div ref={revealRef} className="max-w-[1100px] mx-auto">
          {/* Headline */}
          <div className="text-center mb-16 reveal">
            <p className="text-[#7C3AED] text-sm font-semibold uppercase tracking-widest mb-4">
              L&apos;offre Grand Slam
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              2.500&euro; de valeur.
              <br />
              <span className="gradient-text">Votre investissement : 0&euro;.</span>
            </h2>
            <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
              Voici exactement ce que vous obtenez — avant de prendre la moindre décision.
            </p>
          </div>

          {/* Offer stack */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {offerItems.map((item, i) => (
              <div
                key={i}
                className={`relative rounded-2xl p-8 border flex flex-col reveal reveal-d${Math.min(i + 1, 5)} ${
                  item.highlight
                    ? "border-[#7C3AED]/40 bg-[#060612] shadow-lg shadow-[#7C3AED]/10"
                    : "border-white/[0.06] bg-[#060612]"
                }`}
              >
                {/* Icon + Tag */}
                <div className="flex items-center justify-between mb-6">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      item.highlight
                        ? "bg-[#7C3AED] text-white"
                        : "bg-[#7C3AED]/[0.08] text-[#7C3AED] border border-white/[0.06]"
                    }`}
                  >
                    {item.tag}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center">
                    <item.Icon />
                  </div>
                </div>

                {/* Step number */}
                <span className="text-[#7C3AED]/15 text-6xl font-extrabold absolute top-6 right-8 leading-none select-none">
                  {item.step}
                </span>

                <div className="mb-4">
                  <h3 className="text-xl font-extrabold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className={`text-sm font-semibold ${item.highlight ? "text-[#7C3AED]" : "text-[#64748b]"}`}>
                    {item.subtitle}
                  </p>
                </div>

                <p className="text-[#94a3b8] text-sm leading-relaxed mb-4 flex-1">
                  {item.description}
                </p>

                <p className={`text-sm font-medium italic ${item.highlight ? "text-[#7C3AED]" : "text-[#7C3AED]/70"}`}>
                  &ldquo;{item.bonus}&rdquo;
                </p>
              </div>
            ))}
          </div>

          {/* Value stack — Hormozi */}
          <div className="bg-[#060612] border border-white/[0.06] rounded-2xl p-8 mb-10 reveal reveal-d2">
            <div className="max-w-sm mx-auto font-mono text-sm space-y-3">
              <div className="flex justify-between text-[#94a3b8]">
                <span>Audit IA</span>
                <span className="text-[#64748b] line-through">500&euro;</span>
              </div>
              <div className="flex justify-between text-[#94a3b8]">
                <span>Première Impulsion IA</span>
                <span className="text-[#64748b] line-through">2.000&euro;</span>
              </div>
              <div className="flex justify-between text-[#94a3b8]">
                <span>Garantie résultats 30 jours</span>
                <span>Inclus</span>
              </div>
              <div className="h-px bg-white/[0.06] my-2" />
              <div className="flex justify-between text-[#94a3b8]">
                <span>Valeur totale</span>
                <span className="text-[#64748b] line-through">2.500&euro;</span>
              </div>
              <div className="flex justify-between font-extrabold text-lg">
                <span className="text-white">Votre investissement</span>
                <span className="gradient-text">0&euro;</span>
              </div>
            </div>
          </div>

          {/* How it works — 3 steps */}
          <div className="mb-12 reveal reveal-d3">
            <p className="text-center text-[#7C3AED] text-xs font-semibold uppercase tracking-widest mb-8">
              Comment ça marche
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { step: "01", title: "Vous parlez", desc: "30 min de call — on cartographie vos processus", effort: "30 min de votre agenda" },
                { step: "02", title: "On livre", desc: "On déploie votre première solution IA — gratuitement", effort: "1 semaine de notre côté" },
                { step: "03", title: "Vous décidez", desc: "Si la valeur est là, vous continuez. Sinon, 0€.", effort: "Zéro effort" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <span className="text-[#7C3AED] font-extrabold text-2xl">{s.step}</span>
                  <h4 className="text-white font-bold text-lg mt-2">{s.title}</h4>
                  <p className="text-[#94a3b8] text-sm mt-1">{s.desc}</p>
                  <p className="text-[#64748b] text-xs mt-2 italic">Votre effort : {s.effort}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center reveal reveal-d4">
            <p className="text-[#94a3b8] text-sm mb-6">
              On ne travaille qu&apos;avec{" "}
              <span className="text-white font-semibold">
                5 nouvelles PME par mois.
              </span>
            </p>
            <button
              onClick={() => { GA.bookingModalOpened("offer"); setModalOpen(true); }}
              className="bg-[#7C3AED] text-white font-semibold text-lg px-10 py-4 rounded-xl hover:bg-[#9D6FF0] transition-all shadow-lg shadow-[#7C3AED]/25 hover:shadow-xl hover:shadow-[#7C3AED]/35 cursor-pointer"
            >
              Obtenir mon audit gratuit →
            </button>
          </div>
        </div>
      </section>

      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
