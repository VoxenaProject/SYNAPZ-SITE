"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import BookingModal from "@/components/ui/BookingModal";
import ROIEmailGate from "@/components/ui/ROIEmailGate";
import { GA, getLocalFlag, SESSION_KEYS } from "@/lib/analytics";
import { useReveal } from "@/lib/useReveal";

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
  const [emailGateUnlocked, setEmailGateUnlocked] = useState(false);
  const hasTrackedStart = useRef(false);

  const headerRef = useReveal<HTMLDivElement>();
  const slidersRef = useReveal<HTMLDivElement>();
  const resultsRef = useReveal<HTMLDivElement>();

  useEffect(() => {
    if (getLocalFlag(SESSION_KEYS.ROI_GATE_UNLOCKED)) {
      setEmailGateUnlocked(true);
    }
  }, []);

  function applyPreset(preset: typeof PRESETS[number]) {
    setEmployees(preset.employees);
    setHoursPerWeek(preset.hoursPerWeek);
    setHourlyRate(preset.hourlyRate);
    setActivePreset(preset.id);
  }

  function handleSliderChange(setter: (v: number) => void, value: number) {
    if (!hasTrackedStart.current) {
      GA.roiCalculatorStarted();
      hasTrackedStart.current = true;
    }
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

  const sliderClass =
    "w-full h-2 rounded-full appearance-none cursor-pointer bg-white/[0.06] [&::-webkit-slider-runnable-track]:bg-white/[0.06] [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#7C3AED] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:shadow-[#7C3AED]/30 [&::-webkit-slider-thumb]:-mt-[6px]";

  return (
    <>
      <section className="py-32 md:py-40 px-6 bg-[#060612] below-fold">
        <div className="max-w-[1100px] mx-auto">
          <div
            ref={headerRef}
            className="reveal text-center mb-16"
          >
            <p className="text-[#7C3AED] text-sm font-semibold uppercase tracking-widest mb-4">
              Calculateur ROI
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Combien vous co&ucirc;te r&eacute;ellement
              <br />
              <span className="gradient-text">votre fa&ccedil;on de travailler ?</span>
            </h2>
            <p className="text-[#94a3b8] text-lg">
              Entrez vos chiffres. Soyez pr&ecirc;t &agrave; &ecirc;tre surpris.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Sliders */}
            <div
              ref={slidersRef}
              className="reveal bg-[#0c0c20] border border-white/[0.06] rounded-2xl p-8 space-y-8"
            >
              {/* Preset profiles */}
              <div>
                <p className="text-xs text-[#64748b] mb-2.5">Choisissez votre profil :</p>
                <div className="grid grid-cols-3 gap-2">
                  {PRESETS.map((preset) => {
                    const isActive = activePreset === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => applyPreset(preset)}
                        className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                          isActive
                            ? "border-[#7C3AED] bg-[#7C3AED]/[0.05]"
                            : "border-white/[0.06] bg-[#0c0c20]"
                        }`}
                      >
                        <div
                          className="font-bold text-[11px] leading-tight"
                          style={{ color: isActive ? "#7C3AED" : "#FFFFFF" }}
                        >
                          {preset.label}
                        </div>
                        <div className="text-[#64748b] text-[10px] mt-0.5 leading-snug">
                          {preset.description}
                        </div>
                        <div
                          className="mt-1.5 text-[10px] font-semibold"
                          style={{ color: isActive ? "#7C3AED" : "#64748b" }}
                        >
                          {preset.employees} pers · {preset.hoursPerWeek}h/sem · {preset.hourlyRate}&euro;/h
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-white font-semibold text-sm">
                    Nombre d&apos;employ&eacute;s
                  </label>
                  <span className="text-[#7C3AED] font-extrabold text-xl">{employees}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={50}
                  value={employees}
                  onChange={(e) => handleSliderChange(setEmployees, Number(e.target.value))}
                  className={sliderClass}
                  aria-label={`Nombre d'employés : ${employees}`}
                />
                <div className="flex justify-between text-xs text-[#64748b] mt-1">
                  <span>1</span>
                  <span>50</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-white font-semibold text-sm">
                    Heures/semaine en t&acirc;ches r&eacute;p&eacute;titives
                  </label>
                  <span className="text-[#7C3AED] font-extrabold text-xl">{hoursPerWeek}h</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={20}
                  value={hoursPerWeek}
                  onChange={(e) => handleSliderChange(setHoursPerWeek, Number(e.target.value))}
                  className={sliderClass}
                  aria-label={`Heures par semaine en tâches répétitives : ${hoursPerWeek}h`}
                />
                <div className="flex justify-between text-xs text-[#64748b] mt-1">
                  <span>1h</span>
                  <span>20h</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-white font-semibold text-sm">
                    Co&ucirc;t horaire moyen (&euro;/h)
                  </label>
                  <span className="text-[#7C3AED] font-extrabold text-xl">{hourlyRate}&euro;</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={hourlyRate}
                  onChange={(e) => handleSliderChange(setHourlyRate, Number(e.target.value))}
                  className={sliderClass}
                  aria-label={`Coût horaire moyen : ${hourlyRate}€ par heure`}
                />
                <div className="flex justify-between text-xs text-[#64748b] mt-1">
                  <span>10&euro;</span>
                  <span>100&euro;</span>
                </div>
              </div>

              <p className="text-[#64748b]/60 text-xs italic">
                * Hypoth&egrave;se : l&apos;IA r&eacute;cup&egrave;re 60% du temps r&eacute;p&eacute;titif (source : McKinsey Digital)
              </p>
            </div>

            {/* Results */}
            <div
              ref={resultsRef}
              className="reveal reveal-d1 space-y-4"
            >
              {emailGateUnlocked ? (
                <>
                  {[
                    { SVG: ClockSVG, value: `${results.savedHoursPerMonth}h`, label: "récupérées par mois" },
                    { SVG: EuroSVG, value: formatEuro(results.savedMoneyPerMonth), label: "économisés par mois" },
                    { SVG: TrendSVG, value: formatEuro(results.savedMoneyPerYear), label: "économisés par an" },
                  ].map((result, i) => (
                    <div
                      key={i}
                      className="bg-[#0c0c20] border border-white/[0.06] rounded-2xl p-6 flex items-center gap-5"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/[0.08] flex items-center justify-center flex-shrink-0">
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
                        <div className="text-[#64748b] text-sm">{result.label}</div>
                      </div>
                    </div>
                  ))}

                  {results.fullTimeEquivalentMonths > 0 && (
                    <div className="bg-[#7C3AED]/[0.06] border border-[#7C3AED]/20 rounded-2xl p-6">
                      <p className="text-[#94a3b8] text-sm">
                        Soit l&apos;&eacute;quivalent de{" "}
                        <span className="text-white font-bold">
                          {results.fullTimeEquivalentMonths} mois
                        </span>{" "}
                        d&apos;un employ&eacute; &agrave; temps plein.
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      GA.roiCalculatorCompleted(results.savedMoneyPerMonth);
                      GA.bookingModalOpened("roi_calculator");
                      setModalOpen(true);
                    }}
                    className="w-full bg-[#7C3AED] text-white font-semibold text-base py-4 rounded-xl hover:bg-[#9D6FF0] transition-all shadow-lg shadow-[#7C3AED]/25 hover:shadow-xl hover:shadow-[#7C3AED]/35 cursor-pointer mt-4"
                  >
                    Vous perdez{" "}
                    <strong>{formatEuro(results.savedMoneyPerMonth)}/mois</strong>{" "}
                    en t&acirc;ches automatisables.
                    <br />
                    <span className="text-sm font-normal opacity-90">
                      On peut vous aider &agrave; les r&eacute;cup&eacute;rer — gratuitement. &rarr;
                    </span>
                  </button>
                </>
              ) : (
                <ROIEmailGate
                  savedHours={results.savedHoursPerMonth}
                  savedMoneyPerMonth={results.savedMoneyPerMonth}
                  savedMoneyPerYear={results.savedMoneyPerYear}
                  employees={employees}
                  hoursPerWeek={hoursPerWeek}
                  hourlyRate={hourlyRate}
                  onUnlocked={() => setEmailGateUnlocked(true)}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
