"use client";

import { motion } from "framer-motion";
import { GA } from "@/lib/analytics";
import { useDiagnosticTrigger } from "@/components/ui/ConversionLayer";

export default function DiagnosticTeaser() {
  const openDiagnostic = useDiagnosticTrigger();

  return (
    <section className="py-16 px-6 below-fold">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="bg-gradient-to-r from-[#7C3AED]/5 to-[#06B6D4]/5 border border-[#7C3AED]/15 rounded-2xl p-10 md:p-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-[#7C3AED]/10 rounded-full px-4 py-1.5 mb-5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="#7C3AED" strokeWidth="2" />
              <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="text-[#7C3AED] text-xs font-bold uppercase tracking-wider">
              Diagnostic IA Gratuit
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F0F1A] mb-4 leading-tight">
            Découvrez en 3 minutes combien de temps
            <br className="hidden md:block" />
            <span className="gradient-text"> et d&apos;argent votre PME perd chaque semaine.</span>
          </h2>

          <p className="text-[#64748B] text-base mb-8 max-w-xl mx-auto">
            Score personnalisé + recommandations concrètes pour votre situation.
          </p>

          <button
            onClick={() => {
              GA.diagnosticStarted();
              openDiagnostic();
            }}
            className="bg-[#7C3AED] text-white font-semibold text-lg px-10 py-4 rounded-xl hover:bg-[#6D28D9] transition-all shadow-lg shadow-[#7C3AED]/20 hover:shadow-xl hover:shadow-[#7C3AED]/30 cursor-pointer"
          >
            Faire mon diagnostic →
          </button>

          <div className="flex items-center justify-center gap-6 mt-5 text-[#94A3B8] text-xs">
            <span className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 8L7 11L12 5" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              3 minutes
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 8L7 11L12 5" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              100% gratuit
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 8L7 11L12 5" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Résultats immédiats
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
