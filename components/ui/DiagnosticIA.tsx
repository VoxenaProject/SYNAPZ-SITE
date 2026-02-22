"use client";

import { useState } from "react";
import { GA, setSessionFlag, SESSION_KEYS } from "@/lib/analytics";
import BookingModal from "@/components/ui/BookingModal";

/* ───────────── Types ───────────── */

interface SingleQuestion {
  id: string;
  module: string;
  question: string;
  type: "single";
  options: { label: string; value: string }[];
}
interface MultiQuestion {
  id: string;
  module: string;
  question: string;
  type: "multi";
  max?: number;
  options: { label: string; value: string }[];
}
interface SliderQuestion {
  id: string;
  module: string;
  question: string;
  type: "slider";
  min: number;
  max: number;
  step: number;
  unit: string;
  defaultValue: number;
}
type Question = SingleQuestion | MultiQuestion | SliderQuestion;

/* ───────────── Questions ───────────── */

const QUESTIONS: Question[] = [
  // Module A — Votre entreprise
  {
    id: "sector", module: "Votre entreprise", question: "Dans quel secteur êtes-vous ?", type: "single",
    options: [
      { label: "Commerce / Retail", value: "commerce" },
      { label: "Services (conseil, agence, cabinet)", value: "services" },
      { label: "Horeca / Restauration", value: "horeca" },
      { label: "Industrie / Production", value: "industrie" },
      { label: "Santé / Bien-être", value: "sante" },
      { label: "Immobilier", value: "immobilier" },
      { label: "Autre", value: "autre" },
    ],
  },
  {
    id: "teamSize", module: "Votre entreprise", question: "Combien de personnes dans votre équipe ?", type: "single",
    options: [
      { label: "1–3 personnes", value: "1-3" },
      { label: "4–10 personnes", value: "4-10" },
      { label: "11–30 personnes", value: "11-30" },
      { label: "30+ personnes", value: "30+" },
    ],
  },
  {
    id: "tools", module: "Votre entreprise", question: "Quels outils utilisez-vous au quotidien ?", type: "multi",
    options: [
      { label: "Email (Gmail, Outlook...)", value: "email" },
      { label: "CRM (HubSpot, Salesforce...)", value: "crm" },
      { label: "Comptabilité (Exact, Yuki...)", value: "accounting" },
      { label: "Tableurs (Excel, Sheets...)", value: "spreadsheets" },
      { label: "Aucun outil spécialisé", value: "none" },
    ],
  },
  // Module B — Vos pertes de temps
  {
    id: "hoursWasted", module: "Vos pertes de temps", question: "Combien d'heures/semaine votre équipe passe sur des tâches répétitives ?", type: "slider",
    min: 2, max: 40, step: 1, unit: "h", defaultValue: 8,
  },
  {
    id: "topTasks", module: "Vos pertes de temps", question: "Quelles tâches vous prennent le plus de temps ?", type: "multi", max: 3,
    options: [
      { label: "Répondre aux emails et messages", value: "emails" },
      { label: "Saisie de données / copier-coller", value: "data_entry" },
      { label: "Facturation et relances", value: "invoicing" },
      { label: "Rapports et reporting", value: "reporting" },
      { label: "Service client / questions fréquentes", value: "support" },
      { label: "Planification et agenda", value: "planning" },
      { label: "Gestion réseaux sociaux", value: "social" },
      { label: "Autre", value: "other" },
    ],
  },
  {
    id: "frequency", module: "Vos pertes de temps", question: "À quelle fréquence faites-vous ces tâches ?", type: "single",
    options: [
      { label: "Plusieurs fois par jour", value: "multiple_daily" },
      { label: "Tous les jours", value: "daily" },
      { label: "Quelques fois par semaine", value: "few_weekly" },
      { label: "Une fois par semaine", value: "weekly" },
    ],
  },
  {
    id: "hourlyCost", module: "Vos pertes de temps", question: "Quel est le coût horaire moyen d'un employé (charges comprises) ?", type: "slider",
    min: 15, max: 65, step: 5, unit: "€/h", defaultValue: 30,
  },
  // Module C — Maturité IA
  {
    id: "aiUsage", module: "Votre maturité IA", question: "Avez-vous déjà utilisé des outils IA (ChatGPT, etc.) ?", type: "single",
    options: [
      { label: "Jamais", value: "never" },
      { label: "J'ai testé une ou deux fois", value: "tested" },
      { label: "Occasionnellement", value: "occasional" },
      { label: "Régulièrement", value: "regular" },
    ],
  },
  {
    id: "mainBlocker", module: "Votre maturité IA", question: "Quel est votre principal frein à l'automatisation ?", type: "single",
    options: [
      { label: "Je ne sais pas par où commencer", value: "where_start" },
      { label: "J'ai peur que ça coûte trop cher", value: "cost" },
      { label: "Pas le temps de l'implémenter", value: "time" },
      { label: "Pas sûr que ça marche pour mon métier", value: "relevance" },
      { label: "Mon équipe résisterait au changement", value: "resistance" },
    ],
  },
  {
    id: "urgency", module: "Votre maturité IA", question: "En combien de temps souhaitez-vous voir des résultats ?", type: "single",
    options: [
      { label: "Dès cette semaine", value: "this_week" },
      { label: "Dans le mois", value: "this_month" },
      { label: "Dans les 3 mois", value: "3_months" },
      { label: "Je ne suis pas pressé", value: "no_rush" },
    ],
  },
];

/* ───────────── Scoring ───────────── */

type Answers = Record<string, string | string[] | number>;

interface ScoreBreakdown {
  total: number;
  axes: {
    volume: { score: number; max: number };
    financial: { score: number; max: number };
    readiness: { score: number; max: number };
  };
}

function calculateScore(answers: Answers): ScoreBreakdown {
  // Axe 1: Volume de tâches automatisables (max 75)
  let volumeScore = 0;
  const hours = (answers.hoursWasted as number) || 8;
  if (hours <= 5) volumeScore += 5;
  else if (hours <= 10) volumeScore += 15;
  else if (hours <= 20) volumeScore += 25;
  else volumeScore += 40;

  const tasks = (answers.topTasks as string[]) || [];
  const highAutoTasks = ["emails", "data_entry", "invoicing", "reporting", "support"];
  tasks.forEach((t) => { if (highAutoTasks.includes(t)) volumeScore += 5; });
  volumeScore = Math.min(volumeScore, 65); // cap hours + tasks

  const freq = answers.frequency as string;
  if (freq === "multiple_daily" || freq === "daily") volumeScore += 10;

  // Axe 2: Impact financier (max 30)
  const teamMap: Record<string, number> = { "1-3": 2, "4-10": 7, "11-30": 20, "30+": 40 };
  const teamCount = teamMap[(answers.teamSize as string)] || 7;
  const hourlyCost = (answers.hourlyCost as number) || 30;
  const financialImpact = teamCount * hourlyCost * hours * 0.6;
  const financialScore = Math.min(30, Math.round((financialImpact / 20000) * 30));

  // Axe 3: Maturité digitale (max 55)
  let readinessScore = 0;
  const tools = (answers.tools as string[]) || [];
  tools.forEach((t) => { if (t !== "none") readinessScore += 5; });

  const aiMap: Record<string, number> = { never: 5, tested: 10, occasional: 20, regular: 25 };
  readinessScore += aiMap[(answers.aiUsage as string)] || 5;

  const urgencyMap: Record<string, number> = { this_week: 10, this_month: 7, "3_months": 4, no_rush: 1 };
  readinessScore += urgencyMap[(answers.urgency as string)] || 4;

  const total = Math.min(100, Math.max(0, volumeScore + financialScore + readinessScore));

  return {
    total,
    axes: {
      volume: { score: volumeScore, max: 75 },
      financial: { score: financialScore, max: 30 },
      readiness: { score: readinessScore, max: 55 },
    },
  };
}

function getTier(score: number): "moderate" | "strong" | "critical" {
  if (score <= 35) return "moderate";
  if (score <= 65) return "strong";
  return "critical";
}

function getPriorities(answers: Answers) {
  const tasks = (answers.topTasks as string[]) || [];
  const taskMap: Record<string, { title: string; gain: string }> = {
    emails: { title: "Traitement automatique des emails entrants", gain: "3-5h/semaine" },
    data_entry: { title: "Automatisation de la saisie de données", gain: "4-8h/semaine" },
    invoicing: { title: "Facturation et relances automatisées", gain: "2-4h/semaine" },
    reporting: { title: "Génération automatique de rapports", gain: "3-6h/semaine" },
    support: { title: "Réponses automatiques aux questions fréquentes", gain: "4-8h/semaine" },
    planning: { title: "Planification et gestion d'agenda automatisée", gain: "2-4h/semaine" },
    social: { title: "Automatisation du contenu réseaux sociaux", gain: "3-5h/semaine" },
    other: { title: "Automatisation de processus métier sur mesure", gain: "2-6h/semaine" },
  };

  const priorities = tasks.map((t) => taskMap[t]).filter(Boolean).slice(0, 3);

  // Fill up to 3 if needed
  const defaults = [
    { title: "Synchronisation des outils (CRM, comptabilité)", gain: "2-3h/semaine" },
    { title: "Extraction et classification de documents", gain: "3-5h/semaine" },
  ];
  while (priorities.length < 3 && defaults.length > 0) {
    priorities.push(defaults.shift()!);
  }

  return priorities;
}

/* ───────────── Component ───────────── */

interface DiagnosticIAProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DiagnosticIA({ isOpen, onClose }: DiagnosticIAProps) {
  const [step, setStep] = useState(0); // 0-9 = questions, 10 = email gate, 11 = results
  const [answers, setAnswers] = useState<Answers>({
    hoursWasted: 8,
    hourlyCost: 30,
  });
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  if (!isOpen) return null;

  const currentQuestion = step < QUESTIONS.length ? QUESTIONS[step] : null;
  const totalSteps = QUESTIONS.length + 2; // questions + email gate + results
  const progress = Math.min(((step + 1) / totalSteps) * 100, 100);

  function setAnswer(id: string, value: string | string[] | number) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function handleSingleSelect(value: string) {
    if (!currentQuestion) return;
    setAnswer(currentQuestion.id, value);
    setTimeout(() => setStep((s) => s + 1), 200);
  }

  function handleMultiToggle(value: string) {
    if (!currentQuestion || currentQuestion.type !== "multi") return;
    const current = (answers[currentQuestion.id] as string[]) || [];
    const maxItems = currentQuestion.max;

    if (current.includes(value)) {
      setAnswer(currentQuestion.id, current.filter((v) => v !== value));
    } else if (!maxItems || current.length < maxItems) {
      setAnswer(currentQuestion.id, [...current, value]);
    }
  }

  function handleNext() {
    if (step < QUESTIONS.length) {
      setStep((s) => s + 1);
    }
  }

  function handleBack() {
    if (step > 0) setStep((s) => s - 1);
  }

  const scoreData = calculateScore(answers);
  const score = scoreData.total;
  const tier = getTier(score);
  const priorities = getPriorities(answers);

  const teamMap: Record<string, number> = { "1-3": 2, "4-10": 7, "11-30": 20, "30+": 40 };
  const teamCount = teamMap[(answers.teamSize as string)] || 7;
  const hours = (answers.hoursWasted as number) || 8;
  const hourlyCost = (answers.hourlyCost as number) || 30;
  const savedHoursWeek = Math.round(hours * 0.6);
  const savedMoneyMonth = Math.round(teamCount * savedHoursWeek * hourlyCost * 4.33);
  const savedMoneyYear = savedMoneyMonth * 12;

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !firstName) return;

    setLoading(true);
    try {
      await fetch("/api/diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          email,
          score,
          tier,
          sector: (answers.sector as string) || "",
          teamSize: (answers.teamSize as string) || "",
          hoursWasted: hours,
          hourlyCost,
          topTasks: (answers.topTasks as string[]) || [],
          savedHoursWeek,
          savedMoneyMonth,
          savedMoneyYear,
          priorities,
          axes: scoreData.axes,
        }),
      });

      GA.diagnosticEmailCaptured();
      setSessionFlag(SESSION_KEYS.DIAGNOSTIC_COMPLETED);
      if (typeof window !== "undefined") {
        sessionStorage.setItem(SESSION_KEYS.LEAD_EMAIL, email);
      }
      setStep(QUESTIONS.length + 1); // Go to results
    } catch {
      // Still show results even if API fails
      setStep(QUESTIONS.length + 1);
    } finally {
      setLoading(false);
    }
  }

  const formatEuro = (n: number) =>
    new Intl.NumberFormat("fr-BE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

  const tierConfig = {
    moderate: { color: "#0891B2", bg: "#E0F2FE", label: "Potentiel modéré" },
    strong: { color: "#7C3AED", bg: "#EDE9FE", label: "Fort potentiel" },
    critical: { color: "#D97706", bg: "#FEF3C7", label: "Potentiel critique" },
  };

  const tc = tierConfig[tier];

  // ─── Email gate step ───
  if (step === QUESTIONS.length) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-8">
          <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#0F0F1A] cursor-pointer" aria-label="Fermer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>

          {/* Progress bar */}
          <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full mb-8">
            <div className="h-full bg-[#7C3AED] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>

          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-[#7C3AED]/10 flex items-center justify-center mx-auto mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M9 12L11 14L15 10" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="9" stroke="#7C3AED" strokeWidth="1.8" />
              </svg>
            </div>
            <h3 className="text-xl font-extrabold text-[#0F0F1A] mb-2">
              Votre diagnostic est prêt !
            </h3>
            <p className="text-[#64748B] text-sm mb-6">
              Où l&apos;envoyer ?
            </p>

            <form onSubmit={handleEmailSubmit} className="space-y-3 text-left">
              <input
                type="text"
                required
                placeholder="Votre prénom"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20"
              />
              <input
                type="email"
                required
                placeholder="Votre email professionnel"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#7C3AED] text-white font-semibold py-3.5 rounded-xl hover:bg-[#6D28D9] transition-all shadow-lg shadow-[#7C3AED]/20 disabled:opacity-60 cursor-pointer"
              >
                {loading ? "Envoi..." : "Recevoir mon diagnostic →"}
              </button>
              <p className="text-[#94A3B8] text-xs text-center">
                On vous l&apos;envoie instantanément. Zéro spam.
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ─── Results step ───
  if (step === QUESTIONS.length + 1) {
    GA.diagnosticCompleted(score);

    return (
      <>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-8">
            <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#0F0F1A] cursor-pointer" aria-label="Fermer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>

            {/* Score */}
            <div className="text-center mb-6">
              <p className="text-[#94A3B8] text-xs uppercase tracking-widest mb-3">Votre Score IA</p>
              <div className="text-5xl font-extrabold mb-3" style={{ color: tc.color }}>{score}/100</div>

              {/* Progress bar */}
              <div className="w-full h-3 bg-[#E2E8F0] rounded-full mb-3">
                <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${score}%`, background: tc.color }} />
              </div>

              <span className="inline-block text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full" style={{ background: tc.bg, color: tc.color }}>
                {tc.label}
              </span>

              {/* Axis breakdown */}
              <div className="mt-6 space-y-3 text-left">
                <p className="text-[#94A3B8] text-[10px] uppercase tracking-widest font-medium">Détail par axe</p>
                {([
                  {
                    key: "volume" as const,
                    label: "Volume de tâches automatisables",
                    getComment: (pct: number) =>
                      pct >= 70 ? "Beaucoup de tâches répétitives à fort potentiel"
                      : pct >= 40 ? "Potentiel d'automatisation présent sur plusieurs tâches"
                      : "Peu de tâches répétitives identifiées pour le moment",
                  },
                  {
                    key: "financial" as const,
                    label: "Impact financier",
                    getComment: (pct: number) =>
                      pct >= 70 ? "Les économies potentielles sont très significatives"
                      : pct >= 40 ? "Un gain financier réel mais encore à optimiser"
                      : "Impact financier limité avec la configuration actuelle",
                  },
                  {
                    key: "readiness" as const,
                    label: "Maturité digitale",
                    getComment: (pct: number) =>
                      pct >= 70 ? "Votre équipe est prête à intégrer l'IA rapidement"
                      : pct >= 40 ? "Bonne base, quelques ajustements faciliteront l'adoption"
                      : "Un accompagnement structuré sera clé pour démarrer",
                  },
                ]).map((axis) => {
                  const axisData = scoreData.axes[axis.key];
                  const pct = Math.min(100, Math.round((axisData.score / axisData.max) * 100));
                  return (
                    <div key={axis.key}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[#0F0F1A] text-xs font-semibold">{axis.label}</span>
                        <span className="text-[#7C3AED] text-xs font-bold">{pct}%</span>
                      </div>
                      <div className="w-full h-2 bg-[#E2E8F0] rounded-full">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ width: `${pct}%`, background: "linear-gradient(90deg, #9D6FF0, #7C3AED)" }}
                        />
                      </div>
                      <p className="text-[#94A3B8] text-[11px] mt-1">{axis.getComment(pct)}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="h-px bg-[#E2E8F0] my-6" />

            {/* Financial impact */}
            <div className="mb-6">
              <p className="text-[#64748B] text-xs uppercase tracking-wider mb-3 font-medium">Économies potentielles estimées</p>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="text-xl font-extrabold gradient-text">{savedHoursWeek}h</div>
                  <div className="text-[10px] text-[#94A3B8] uppercase mt-1">par semaine</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-extrabold gradient-text">{formatEuro(savedMoneyMonth)}</div>
                  <div className="text-[10px] text-[#94A3B8] uppercase mt-1">par mois</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-extrabold gradient-text">{formatEuro(savedMoneyYear)}</div>
                  <div className="text-[10px] text-[#94A3B8] uppercase mt-1">par an</div>
                </div>
              </div>
            </div>

            <div className="h-px bg-[#E2E8F0] my-6" />

            {/* Priorities */}
            <div className="mb-6">
              <p className="text-[#64748B] text-xs uppercase tracking-wider mb-3 font-medium">Vos 3 priorités d&apos;automatisation</p>
              <div className="space-y-3">
                {priorities.map((p, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-[#7C3AED] font-extrabold text-sm mt-0.5">{i + 1}.</span>
                    <div>
                      <p className="text-[#0F0F1A] font-semibold text-sm">{p.title}</p>
                      <p className="text-[#64748B] text-xs">Gain estimé : {p.gain}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-[#E2E8F0] my-6" />

            {/* CTA */}
            <div className="text-center">
              <p className="text-[#64748B] text-sm mb-4">
                Vous voulez savoir comment implémenter ces automatisations ?
              </p>
              <button
                onClick={() => {
                  GA.bookingModalOpened("diagnostic_results");
                  setModalOpen(true);
                }}
                className="w-full bg-[#7C3AED] text-white font-semibold py-4 rounded-xl hover:bg-[#6D28D9] transition-all shadow-lg shadow-[#7C3AED]/20 cursor-pointer"
              >
                Réserver mon audit gratuit (30 min) →
              </button>
              <p className="text-[#94A3B8] text-xs mt-3">Gratuit · Sans engagement · Résultats en 72h</p>
            </div>
          </div>
        </div>

        <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </>
    );
  }

  // ─── Question steps ───
  if (!currentQuestion) return null;

  const canProceed = (() => {
    const val = answers[currentQuestion.id];
    if (currentQuestion.type === "slider") return true;
    if (currentQuestion.type === "multi") return Array.isArray(val) && val.length > 0;
    return !!val;
  })();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-8">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#0F0F1A] cursor-pointer" aria-label="Fermer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>

        {/* Progress */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[#94A3B8] text-xs font-medium">{currentQuestion.module}</span>
          <span className="text-[#94A3B8] text-xs">{step + 1}/{QUESTIONS.length}</span>
        </div>
        <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full mb-8">
          <div className="h-full bg-[#7C3AED] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>

        <h3 className="text-lg font-extrabold text-[#0F0F1A] mb-6">
          {currentQuestion.question}
        </h3>

        {/* Single select */}
        {currentQuestion.type === "single" && (
          <div className="space-y-2">
            {currentQuestion.options.map((opt) => {
              const selected = answers[currentQuestion.id] === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => handleSingleSelect(opt.value)}
                  className="w-full text-left px-4 py-3 rounded-xl border-2 transition-all cursor-pointer text-sm font-medium"
                  style={{
                    borderColor: selected ? "#7C3AED" : "#E2E8F0",
                    background: selected ? "#7C3AED0D" : "white",
                    color: selected ? "#7C3AED" : "#0F0F1A",
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Multi select */}
        {currentQuestion.type === "multi" && (
          <>
            {currentQuestion.max && (
              <p className="text-[#94A3B8] text-xs mb-3">Sélectionnez jusqu&apos;à {currentQuestion.max} réponses</p>
            )}
            <div className="space-y-2">
              {currentQuestion.options.map((opt) => {
                const selected = ((answers[currentQuestion.id] as string[]) || []).includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleMultiToggle(opt.value)}
                    className="w-full text-left px-4 py-3 rounded-xl border-2 transition-all cursor-pointer text-sm font-medium flex items-center gap-3"
                    style={{
                      borderColor: selected ? "#7C3AED" : "#E2E8F0",
                      background: selected ? "#7C3AED0D" : "white",
                      color: selected ? "#7C3AED" : "#0F0F1A",
                    }}
                  >
                    <span className="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0" style={{ borderColor: selected ? "#7C3AED" : "#CBD5E1", background: selected ? "#7C3AED" : "transparent" }}>
                      {selected && (
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 8L7 11L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      )}
                    </span>
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Slider */}
        {currentQuestion.type === "slider" && (
          <div>
            <div className="text-center mb-6">
              <span className="text-4xl font-extrabold gradient-text">
                {(answers[currentQuestion.id] as number) ?? currentQuestion.defaultValue}{currentQuestion.unit}
              </span>
            </div>
            <input
              type="range"
              min={currentQuestion.min}
              max={currentQuestion.max}
              step={currentQuestion.step}
              value={(answers[currentQuestion.id] as number) ?? currentQuestion.defaultValue}
              onChange={(e) => setAnswer(currentQuestion.id, Number(e.target.value))}
              className="w-full h-2 bg-[#E2E8F0] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#7C3AED] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:shadow-[#7C3AED]/30"
            />
            <div className="flex justify-between text-xs text-[#64748B] mt-2">
              <span>{currentQuestion.min}{currentQuestion.unit}</span>
              <span>{currentQuestion.max}{currentQuestion.unit}+</span>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={step === 0}
            className="text-[#94A3B8] text-sm font-medium hover:text-[#0F0F1A] disabled:opacity-30 transition-colors cursor-pointer"
          >
            ← Retour
          </button>
          {(currentQuestion.type === "multi" || currentQuestion.type === "slider") && (
            <button
              onClick={handleNext}
              disabled={!canProceed}
              className="bg-[#7C3AED] text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-[#6D28D9] transition-all disabled:opacity-40 cursor-pointer text-sm"
            >
              Continuer →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
