"use client";

import { useState } from "react";
import { GA, setLocalFlag, SESSION_KEYS } from "@/lib/analytics";

interface ROIEmailGateProps {
  savedHours: number;
  savedMoneyPerMonth: number;
  savedMoneyPerYear: number;
  employees: number;
  hoursPerWeek: number;
  hourlyRate: number;
  onUnlocked: () => void;
}

export default function ROIEmailGate({
  savedHours,
  savedMoneyPerMonth,
  savedMoneyPerYear,
  employees,
  hoursPerWeek,
  hourlyRate,
  onUnlocked,
}: ROIEmailGateProps) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/roi-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          company,
          savedHours,
          savedMoneyPerMonth,
          savedMoneyPerYear,
          employees,
          hoursPerWeek,
          hourlyRate,
        }),
      });

      if (!res.ok) throw new Error("Erreur");

      GA.roiEmailGateCaptured(savedMoneyPerMonth);
      setLocalFlag(SESSION_KEYS.ROI_GATE_UNLOCKED);

      // Store email for cross-module use
      if (typeof window !== "undefined") {
        sessionStorage.setItem(SESSION_KEYS.LEAD_EMAIL, email);
      }

      onUnlocked();
    } catch {
      setError("Une erreur est survenue. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  const formatEuro = (n: number) =>
    new Intl.NumberFormat("fr-BE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

  return (
    <div className="space-y-4">
      {/* Teaser: hours visible */}
      <div className="bg-[#0c0c20] border border-white/[0.06] rounded-2xl p-6 flex items-center gap-5">
        <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/[0.08] flex items-center justify-center flex-shrink-0">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="#7C3AED" strokeWidth="1.8" />
            <path d="M12 7V12L15 14" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <div className="text-3xl font-extrabold gradient-text">{savedHours}h</div>
          <div className="text-[#94a3b8] text-sm">récupérées par mois</div>
        </div>
      </div>

      {/* Blurred results + gate */}
      <div className="relative bg-[#0c0c20] border border-[#7C3AED]/30 rounded-2xl p-8 shadow-lg shadow-[#7C3AED]/10 overflow-hidden">
        {/* Blurred background results */}
        <div className="absolute inset-0 p-8 select-none pointer-events-none" aria-hidden="true">
          <div className="space-y-6 blur-md opacity-50">
            <div>
              <div className="text-3xl font-extrabold text-[#7C3AED]">{formatEuro(savedMoneyPerMonth)}</div>
              <div className="text-[#94a3b8] text-sm">économisés par mois</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#7C3AED]">{formatEuro(savedMoneyPerYear)}</div>
              <div className="text-[#94a3b8] text-sm">économisés par an</div>
            </div>
          </div>
        </div>

        {/* Gate form */}
        <div className="relative z-10">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-[#7C3AED]/[0.08] rounded-full px-4 py-1.5 mb-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="11" width="18" height="11" rx="2" stroke="#7C3AED" strokeWidth="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" stroke="#7C3AED" strokeWidth="2" />
              </svg>
              <span className="text-[#7C3AED] text-xs font-semibold">Rapport personnalisé</span>
            </div>
            <h3 className="text-lg font-extrabold text-white mb-2">
              Débloquez vos résultats complets
            </h3>
            <p className="text-[#94a3b8] text-sm">
              Économies mensuelles + annuelles + les 3 automatisations
              prioritaires pour votre profil.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              required
              placeholder="Votre email professionnel"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-white/[0.06] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 transition-all"
            />
            <input
              type="text"
              placeholder="Nom de votre entreprise (optionnel)"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full border border-white/[0.06] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 transition-all"
            />
            {error && (
              <p className="text-red-500 text-xs text-center">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#7C3AED] text-white font-semibold py-3.5 rounded-xl hover:bg-[#6D28D9] transition-all shadow-lg shadow-[#7C3AED]/20 disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Envoi en cours..." : "Recevoir mon rapport →"}
            </button>
            <p className="text-[#64748b] text-xs text-center">
              Gratuit. Zéro spam. Un seul email.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
