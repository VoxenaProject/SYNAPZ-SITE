"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Step = "consultant" | "date" | "time" | "form" | "success";
type ConsultantKey = "dejvi" | "daniele";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

const CONSULTANTS = {
  dejvi: {
    key: "dejvi" as ConsultantKey,
    name: "Dejvi Prifti",
    role: "CEO & Automatisation IA",
    initials: "DP",
    color: "#7C3AED",
    description: "Construction des automatisations, livraison en 72h.",
  },
  daniele: {
    key: "daniele" as ConsultantKey,
    name: "Daniele Rutigliano",
    role: "Stratégie IA & Conseil",
    initials: "DR",
    color: "#06B6D4",
    description: "Cartographie IA, intégration sans disruption.",
  },
} as const;

const TIME_SLOTS = [
  "9h00", "9h30", "10h00", "10h30", "11h00", "11h30",
  "12h00", "12h30", "13h00", "13h30", "14h00", "14h30",
  "15h00", "15h30", "16h00", "16h30", "17h00", "17h30",
];

const STEPS: Step[] = ["consultant", "date", "time", "form"];
const STEP_LABELS = ["Consultant", "Date", "Heure", "Coordonnées"];

function getNext14BusinessDays(): Date[] {
  const days: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let d = new Date(today);
  d.setDate(d.getDate() + 1); // start from tomorrow
  while (days.length < 14) {
    const dow = d.getDay();
    if (dow !== 0) days.push(new Date(d)); // skip Sunday only
    d.setDate(d.getDate() + 1);
  }
  return days;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("fr-BE", { weekday: "short", day: "numeric", month: "short" });
}

function toISO(d: Date): string {
  return d.toISOString().split("T")[0];
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
};

interface BookingAgentProps {
  onBack: () => void;
}

export default function BookingAgent({ onBack }: BookingAgentProps) {
  const [step, setStep] = useState<Step>("consultant");
  const [direction, setDirection] = useState(1);
  const [consultant, setConsultant] = useState<ConsultantKey | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "", email: "", phone: "", company: "", message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  const businessDays = useMemo(() => getNext14BusinessDays(), []);
  const stepIndex = STEPS.indexOf(step);
  const autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function goTo(nextStep: Step, dir = 1) {
    setDirection(dir);
    setStep(nextStep);
  }

  function scheduleNext(nextStep: Step) {
    if (autoTimer.current) clearTimeout(autoTimer.current);
    autoTimer.current = setTimeout(() => goTo(nextStep), 280);
  }

  function pickConsultant(key: ConsultantKey) {
    setConsultant(key);
    scheduleNext("date");
  }

  function pickDate(d: Date) {
    setSelectedDate(d);
    scheduleNext("time");
  }

  function pickTime(slot: string) {
    setSelectedTime(slot);
    scheduleNext("form");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consultant || !selectedDate || !selectedTime) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          consultant,
          date: toISO(selectedDate),
          time: selectedTime,
          ...formData,
        }),
      });
      if (res.ok) {
        setDirection(1);
        setStep("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputClass = "w-full bg-[#F5F7FF] border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[#0F0F1A] text-sm focus:outline-none focus:border-[#7C3AED] transition-colors placeholder:text-[#94A3B8]";
  const activeConsultant = consultant ? CONSULTANTS[consultant] : null;

  return (
    <div className="w-full">
      {/* Progress bar */}
      {step !== "success" && (
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            {STEP_LABELS.map((label, i) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    i < stepIndex
                      ? "bg-[#7C3AED] text-white"
                      : i === stepIndex
                      ? "bg-[#7C3AED] text-white ring-2 ring-[#7C3AED]/30"
                      : "bg-[#E2E8F0] text-[#94A3B8]"
                  }`}
                >
                  {i < stepIndex ? "✓" : i + 1}
                </div>
                <span className={`text-[10px] font-medium ${i <= stepIndex ? "text-[#7C3AED]" : "text-[#94A3B8]"}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
          <div className="h-1 bg-[#E2E8F0] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#7C3AED] rounded-full transition-all duration-500"
              style={{ width: `${((stepIndex) / (STEPS.length - 1)) * 100}%` }}
            />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait" custom={direction}>
        {/* Step 1 — Consultant */}
        {step === "consultant" && (
          <motion.div key="consultant" custom={direction} variants={slideVariants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <h4 className="text-[#0F0F1A] font-bold text-base mb-1">Avec qui souhaitez-vous parler ?</h4>
            <p className="text-[#64748B] text-xs mb-4">Cliquez pour sélectionner — le wizard avance automatiquement.</p>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {(Object.values(CONSULTANTS) as typeof CONSULTANTS[ConsultantKey][]).map((c) => (
                <button
                  key={c.key}
                  onClick={() => pickConsultant(c.key)}
                  className="relative p-4 rounded-xl border-2 text-left transition-all cursor-pointer"
                  style={{
                    borderColor: consultant === c.key ? c.color : "#E2E8F0",
                    background: consultant === c.key ? `${c.color}08` : "white",
                  }}
                >
                  {consultant === c.key && (
                    <span className="absolute top-2 right-2 text-xs" style={{ color: c.color }}>✓</span>
                  )}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-extrabold mb-3"
                    style={{ background: `${c.color}20`, color: c.color }}
                  >
                    {c.initials}
                  </div>
                  <div className="text-[#0F0F1A] font-bold text-sm leading-tight">{c.name}</div>
                  <div className="text-xs mt-0.5 mb-2" style={{ color: c.color }}>{c.role}</div>
                  <div className="text-[#64748B] text-[11px] leading-relaxed">{c.description}</div>
                </button>
              ))}
            </div>
            <button onClick={onBack} className="w-full border border-[#E2E8F0] text-[#64748B] font-medium py-2.5 rounded-lg text-sm hover:bg-[#F5F7FF] transition-colors cursor-pointer">
              ← Retour
            </button>
          </motion.div>
        )}

        {/* Step 2 — Date */}
        {step === "date" && (
          <motion.div key="date" custom={direction} variants={slideVariants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <h4 className="text-[#0F0F1A] font-bold text-base mb-1">Choisissez une date</h4>
            <p className="text-[#64748B] text-xs mb-4">
              Call avec{" "}
              <span className="font-semibold" style={{ color: activeConsultant?.color }}>
                {activeConsultant?.name}
              </span>
              {" "}— lundi au samedi.
            </p>
            <div className="grid grid-cols-3 gap-1.5 mb-5 max-h-48 overflow-y-auto pr-1">
              {businessDays.map((d) => {
                const iso = toISO(d);
                const isSelected = selectedDate ? toISO(selectedDate) === iso : false;
                return (
                  <button
                    key={iso}
                    onClick={() => pickDate(d)}
                    className="p-2 rounded-lg border-2 text-center transition-all cursor-pointer text-xs"
                    style={{
                      borderColor: isSelected ? (activeConsultant?.color ?? "#7C3AED") : "#E2E8F0",
                      background: isSelected ? `${activeConsultant?.color ?? "#7C3AED"}12` : "white",
                      color: isSelected ? (activeConsultant?.color ?? "#7C3AED") : "#374151",
                      fontWeight: isSelected ? "700" : "400",
                    }}
                  >
                    {formatDate(d)}
                  </button>
                );
              })}
            </div>
            <button onClick={() => goTo("consultant", -1)} className="w-full border border-[#E2E8F0] text-[#64748B] font-medium py-2.5 rounded-lg text-sm hover:bg-[#F5F7FF] transition-colors cursor-pointer">
              ← Retour
            </button>
          </motion.div>
        )}

        {/* Step 3 — Time */}
        {step === "time" && (
          <motion.div key="time" custom={direction} variants={slideVariants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <h4 className="text-[#0F0F1A] font-bold text-base mb-1">Choisissez un créneau</h4>
            <p className="text-[#64748B] text-xs mb-4">
              {selectedDate && formatDate(selectedDate)} · 30 minutes · gratuit
            </p>
            <div className="grid grid-cols-3 gap-2 mb-5 max-h-44 overflow-y-auto pr-1">
              {TIME_SLOTS.map((slot) => {
                const isSelected = selectedTime === slot;
                return (
                  <button
                    key={slot}
                    onClick={() => pickTime(slot)}
                    className="py-2 rounded-lg border-2 text-center transition-all cursor-pointer text-sm font-medium"
                    style={{
                      borderColor: isSelected ? (activeConsultant?.color ?? "#7C3AED") : "#E2E8F0",
                      background: isSelected ? `${activeConsultant?.color ?? "#7C3AED"}12` : "white",
                      color: isSelected ? (activeConsultant?.color ?? "#7C3AED") : "#374151",
                      fontWeight: isSelected ? "700" : "500",
                    }}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
            <button onClick={() => goTo("date", -1)} className="w-full border border-[#E2E8F0] text-[#64748B] font-medium py-2.5 rounded-lg text-sm hover:bg-[#F5F7FF] transition-colors cursor-pointer">
              ← Retour
            </button>
          </motion.div>
        )}

        {/* Step 4 — Form */}
        {step === "form" && (
          <motion.div key="form" custom={direction} variants={slideVariants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <h4 className="text-[#0F0F1A] font-bold text-base mb-1">Vos coordonnées</h4>
            <div className="flex items-center gap-2 bg-[#F5F7FF] border border-[#E2E8F0] rounded-lg px-3 py-2 mb-4 text-xs text-[#64748B]">
              <span style={{ color: activeConsultant?.color }}>📅</span>
              <span>
                <strong style={{ color: activeConsultant?.color }}>{activeConsultant?.name}</strong>
                {" · "}{selectedDate && formatDate(selectedDate)}{" · "}{selectedTime}
              </span>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#64748B] mb-1 font-medium">Prénom *</label>
                  <input required type="text" value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputClass} placeholder="Dejvi" />
                </div>
                <div>
                  <label className="block text-xs text-[#64748B] mb-1 font-medium">Téléphone</label>
                  <input type="tel" value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={inputClass} placeholder="+32 4XX XX XX XX" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-[#64748B] mb-1 font-medium">Email *</label>
                <input required type="email" value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClass} placeholder="vous@entreprise.be" />
              </div>
              <div>
                <label className="block text-xs text-[#64748B] mb-1 font-medium">Entreprise</label>
                <input type="text" value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className={inputClass} placeholder="Ma PME" />
              </div>
              <div>
                <label className="block text-xs text-[#64748B] mb-1 font-medium">Décrivez votre situation (optionnel)</label>
                <textarea value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={2} className={`${inputClass} resize-none`}
                  placeholder="Quelles tâches vous prennent le plus de temps ?" />
              </div>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => goTo("time", -1)}
                  className="flex-1 border border-[#E2E8F0] text-[#64748B] font-medium py-2.5 rounded-lg text-sm hover:bg-[#F5F7FF] transition-colors cursor-pointer">
                  ← Retour
                </button>
                <button type="submit" disabled={status === "sending"}
                  className="flex-1 bg-[#7C3AED] text-white font-semibold py-2.5 rounded-lg text-sm hover:bg-[#9D6FF0] transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer">
                  {status === "sending" ? "Envoi..." : "Confirmer →"}
                </button>
              </div>
              {status === "error" && (
                <p className="text-red-500 text-xs text-center">
                  Une erreur s&apos;est produite. Contactez-nous sur WhatsApp.
                </p>
              )}
            </form>
          </motion.div>
        )}

        {/* Success */}
        {step === "success" && (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }} className="text-center py-6"
          >
            <div className="text-5xl mb-4">✅</div>
            <h4 className="text-[#0F0F1A] font-extrabold text-lg mb-2">
              Demande envoyée, {formData.name} !
            </h4>
            <p className="text-[#64748B] text-sm mb-5 leading-relaxed max-w-xs mx-auto">
              <strong style={{ color: activeConsultant?.color }}>{activeConsultant?.name}</strong>{" "}
              vous confirme par email sous 1h. Vérifiez vos spams si besoin.
            </p>
            <div className="bg-[#F5F7FF] border border-[#E2E8F0] rounded-xl p-4 mb-5 text-xs text-[#64748B] inline-block">
              <div className="font-semibold text-[#0F0F1A] mb-1">Récapitulatif</div>
              <div>{activeConsultant?.name} · {selectedDate && formatDate(selectedDate)} · {selectedTime}</div>
            </div>
            <div className="flex justify-center">
              <a
                href={activeConsultant?.key === "dejvi" ? "https://wa.me/32483596627" : "https://wa.me/32488448370"}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-[#1fb956] transition-colors"
              >
                <span>💬</span> Contacter {activeConsultant?.name.split(" ")[0]} sur WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
