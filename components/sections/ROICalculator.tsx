"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import BookingModal from "@/components/ui/BookingModal";

function ClockSVG() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#7C3AED" strokeWidth="1.8" />
      <path d="M12 7V12L15 14" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function EuroSVG() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#7C3AED" strokeWidth="1.8" />
      <path d="M15 8.5C13.5 7.5 11.5 7.5 10 8.5C8.5 9.5 7.5 11 7.5 12.5C7.5 14 8.5 15.5 10 16.5C11.5 17.5 13.5 17.5 15 16.5M7 11H14M7 13.5H14" stroke="#7C3AED" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function TrendSVG() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M3 17L9 11L13 15L21 7" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 7H21V12" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const PRESETS = [
  {
    id: "tpe",
    label: "TPE / Indépendant",
    description: "1–4 employés, tâches admin légères",
    employees: 3,
    hoursPerWeek: 4,
    hourlyRate: 25,
  },
  {
    id: "pme",
    label: "PME Classique",
    description: "5–15 employés, processus répétitifs",
    employees: 8,
    hoursPerWeek: 6,
    hourlyRate: 30,
  },
  {
    id: "pme_grow",
    label: "PME en Croissance",
    description: "15–50 employés, volume élevé",
    employees: 20,
    hoursPerWeek: 9,
    hourlyRate: 40,
  },
] as const;

export default function ROICalculator() {
  const [employees, setEmployees] = useState(8);
  const [hoursPerWeek, setHoursPerWeek] = useState(6);
  const [hourlyRate, setHourlyRate] = useState(30);
  const [activePreset, setActivePreset] = useState<string>("pme");
  const [modalOpen, setModalOpen] = useState(false);

  function applyPreset(preset: typeof PRESETS[number]) {
    setEmployees(preset.employees);
    setHoursPerWeek(preset.hoursPerWeek);
    setHourlyRate(preset.hourlyRate);
    setActivePreset(preset.id);
  }

  function handleSliderChange(setter: (v: number) => void, value: number) {
    setter(value);
    setActivePreset("custom");
  }

  const results = useMemo(() => {
    const hoursLostPerMonth = employees * hoursPerWeek * 4.33;
    const savedHoursPerMonth = Math.round(hoursLostPerMonth * 0.6);
    const savedMoneyPerMonth = Math.round(savedHoursPerMonth * hourlyRate);
    const savedMoneyPerYear = savedMoneyPerMonth * 12;
    const fullTimeEquivalentMonths = Math.round(savedHoursPerMonth / (160 / 12));
    return { savedHoursPerMonth, savedMoneyPerMonth, savedMoneyPerYear, fullTimeEquivalentMonths };
  }, [employees, hoursPerWeek, hourlyRate]);

  const formatEuro = (n: number) =>
    new Intl.NumberFormat("fr-BE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

  const sliderClass = "w-full h-2 bg-[#E2E8F0] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#7C3AED] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:shadow-[#7C3AED]/30";

  return (
    <>
      <section className="py-28 px-6 bg-[#F5F7FF] below-fold">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#7C3AED] text-sm font-semibold uppercase tracking-widest mb-4">
              Calculateur ROI
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F0F1A] mb-4">
              Combien vous coûte réellement
              <br />
              <span className="gradient-text">votre façon de travailler ?</span>
            </h2>
            <p className="text-[#64748B] text-lg">
              Entrez vos chiffres. Soyez prêt à être surpris.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Sliders */}
            <motion.div
              className="bg-white border border-[#E2E8F0] rounded-2xl p-8 space-y-8 shadow-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Preset profiles */}
              <div>
                <p className="text-xs text-[#64748B] mb-2.5">Choisissez votre profil :</p>
                <div className="grid grid-cols-3 gap-2">
                  {PRESETS.map((preset) => {
                    const isActive = activePreset === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => applyPreset(preset)}
                        className="p-3 rounded-xl border-2 text-left transition-all cursor-pointer"
                        style={{
                          borderColor: isActive ? "#7C3AED" : "#E2E8F0",
                          background: isActive ? "#7C3AED0D" : "white",
                        }}
                      >
                        <div className="text-[#0F0F1A] font-bold text-[11px] leading-tight" style={{ color: isActive ? "#7C3AED" : "#0F0F1A" }}>
                          {preset.label}
                        </div>
                        <div className="text-[#94A3B8] text-[10px] mt-0.5 leading-snug">{preset.description}</div>
                        <div className="mt-1.5 text-[10px] font-semibold" style={{ color: isActive ? "#7C3AED" : "#64748B" }}>
                          {preset.employees} pers · {preset.hoursPerWeek}h/sem · {preset.hourlyRate}€/h
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-[#0F0F1A] font-semibold text-sm">
                    Nombre d&apos;employés
                  </label>
                  <span className="text-[#7C3AED] font-extrabold text-xl">{employees}</span>
                </div>
                <input type="range" min={1} max={50} value={employees}
                  onChange={(e) => handleSliderChange(setEmployees, Number(e.target.value))}
                  className={sliderClass}
                  aria-label={`Nombre d'employés : ${employees}`}
                />
                <div className="flex justify-between text-xs text-[#64748B] mt-1">
                  <span>1</span><span>50</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-[#0F0F1A] font-semibold text-sm">
                    Heures/semaine en tâches répétitives
                  </label>
                  <span className="text-[#7C3AED] font-extrabold text-xl">{hoursPerWeek}h</span>
                </div>
                <input type="range" min={1} max={20} value={hoursPerWeek}
                  onChange={(e) => handleSliderChange(setHoursPerWeek, Number(e.target.value))}
                  className={sliderClass}
                  aria-label={`Heures par semaine en tâches répétitives : ${hoursPerWeek}h`}
                />
                <div className="flex justify-between text-xs text-[#64748B] mt-1">
                  <span>1h</span><span>20h</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-[#0F0F1A] font-semibold text-sm">
                    Coût horaire moyen (€/h)
                  </label>
                  <span className="text-[#7C3AED] font-extrabold text-xl">{hourlyRate}€</span>
                </div>
                <input type="range" min={10} max={100} step={5} value={hourlyRate}
                  onChange={(e) => handleSliderChange(setHourlyRate, Number(e.target.value))}
                  className={sliderClass}
                  aria-label={`Coût horaire moyen : ${hourlyRate}€ par heure`}
                />
                <div className="flex justify-between text-xs text-[#64748B] mt-1">
                  <span>10€</span><span>100€</span>
                </div>
              </div>

              <p className="text-[#64748B]/60 text-xs italic">
                * Hypothèse : l&apos;IA récupère 60% du temps répétitif (source : McKinsey Digital)
              </p>
            </motion.div>

            {/* Results */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {[
                { SVG: ClockSVG, value: `${results.savedHoursPerMonth}h`, label: "récupérées par mois" },
                { SVG: EuroSVG, value: formatEuro(results.savedMoneyPerMonth), label: "économisés par mois" },
                { SVG: TrendSVG, value: formatEuro(results.savedMoneyPerYear), label: "économisés par an" },
              ].map((result, i) => (
                <div
                  key={i}
                  className="bg-white border border-[#E2E8F0] rounded-2xl p-6 flex items-center gap-5 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#F5F7FF] flex items-center justify-center flex-shrink-0">
                    <result.SVG />
                  </div>
                  <div>
                    <motion.div
                      key={result.value}
                      className="text-3xl font-extrabold gradient-text"
                      initial={{ scale: 0.9, opacity: 0.5 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {result.value}
                    </motion.div>
                    <div className="text-[#64748B] text-sm">{result.label}</div>
                  </div>
                </div>
              ))}

              {results.fullTimeEquivalentMonths > 0 && (
                <div className="bg-[#7C3AED]/8 border border-[#7C3AED]/20 rounded-2xl p-6">
                  <p className="text-[#64748B] text-sm">
                    Soit l&apos;équivalent de{" "}
                    <span className="text-[#0F0F1A] font-bold">
                      {results.fullTimeEquivalentMonths} mois
                    </span>{" "}
                    d&apos;un employé à temps plein.
                  </p>
                </div>
              )}

              <button
                onClick={() => setModalOpen(true)}
                className="w-full bg-[#7C3AED] text-white font-semibold text-base py-4 rounded-xl hover:bg-[#9D6FF0] transition-all shadow-lg shadow-[#7C3AED]/25 hover:shadow-xl hover:shadow-[#7C3AED]/35 cursor-pointer mt-4"
              >
                Vous perdez{" "}
                <strong>{formatEuro(results.savedMoneyPerMonth)}/mois</strong>{" "}
                en tâches automatisables.
                <br />
                <span className="text-sm font-normal opacity-90">
                  On peut vous aider à les récupérer — gratuitement. →
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
