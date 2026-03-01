"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { GA } from "@/lib/analytics";
import DashboardMockup from "@/components/product/DashboardMockup";

const BookingModal = dynamic(() => import("@/components/ui/BookingModal"));

const stats = [
  { value: "1 sem", label: "premier résultat livré" },
  { value: "0€", label: "pour commencer" },
  { value: "5h/sem", label: "minimum garanti" },
];

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#060612]">
        {/* Radial glows */}
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#7C3AED]/[0.07] rounded-full blur-[120px] pointer-events-none" />
        <div className="hidden lg:block absolute top-1/3 right-1/4 w-[300px] h-[200px] bg-[#06B6D4]/[0.04] rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-[1100px] mx-auto px-6 pt-32 md:pt-40 pb-16 md:pb-24 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* Left — Text content */}
            <div className="flex-1 text-center lg:text-left">
              {/* Pill badge */}
              <div className="animate-fade-in inline-flex items-center gap-2 bg-[#7C3AED]/[0.08] border border-[#7C3AED]/15 rounded-full px-5 py-2 mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[#9D6FF0] text-xs font-semibold uppercase tracking-[0.05em]">
                  Zéro risque · Zéro engagement
                </span>
              </div>

              {/* H1 */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-6xl font-extrabold leading-[1.05] mb-8 text-white">
                On identifie. On livre.
                <br />
                <span className="gradient-text">
                  Vous payez uniquement si satisfait.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-[#94a3b8] text-lg md:text-xl max-w-xl mb-10 leading-relaxed mx-auto lg:mx-0">
                Sites web, CRM, automatisations, chatbots, SEO — on construit la solution parfaite pour votre business.
                Si elle ne vous fait pas gagner{" "}
                <span className="text-white font-semibold">du temps et de l&apos;argent</span>{" "}
                —{" "}
                <span className="text-[#7C3AED] font-semibold">c&apos;est gratuit.</span>
              </p>

              {/* 3 Stat badges */}
              <div className="animate-fade-in-d3 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 mb-8">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center border border-white/[0.06] rounded-xl px-6 py-3 bg-[#0c0c20]/80"
                  >
                    <span className="text-xl font-extrabold gradient-text">
                      {stat.value}
                    </span>
                    <span className="text-[9px] text-[#64748b] uppercase tracking-wider mt-0.5 font-medium">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="animate-fade-in-d4 flex flex-col items-center lg:items-start gap-3">
                <button
                  onClick={() => { GA.bookingModalOpened("hero"); setModalOpen(true); }}
                  className="bg-[#7C3AED] text-white font-semibold text-lg px-10 py-4 rounded-xl hover:bg-[#9D6FF0] transition-all shadow-lg shadow-[#7C3AED]/25 hover:shadow-xl hover:shadow-[#7C3AED]/35 cursor-pointer"
                >
                  Obtenir mon audit gratuit →
                </button>
                <span className="text-[#64748b] text-sm">
                  30 min · Gratuit · Sans engagement
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M12 2L4 6V12C4 14.5 7.5 16 12 16C16.5 16 20 14.5 20 12V6L12 2Z" stroke="#7C3AED" strokeWidth="1.2" strokeLinejoin="round" transform="scale(0.7) translate(1,1)" />
                    <path d="M5.5 8L7 9.5L10.5 6" stroke="#7C3AED" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[#9D6FF0] text-xs font-medium">
                    Garanti : 5h récupérées/semaine ou remboursé
                  </span>
                </div>
              </div>
            </div>

            {/* Right — Dashboard Mockup */}
            <div className="flex-1 relative hidden md:block">
              {/* Glow behind mockup */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-[#7C3AED]/[0.08] rounded-full blur-[100px] pointer-events-none" />

              <div className="mockup-perspective relative">
                <div className="mockup-3d animate-float">
                  <DashboardMockup />
                </div>

                {/* Floating badge — top right */}
                <div className="absolute -top-4 -right-4 animate-float-delayed bg-[#0c0c20] border border-white/[0.08] rounded-xl px-4 py-2.5 shadow-xl shadow-black/20" style={{ animationDelay: "1s" }}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-400 text-xs font-bold">+32h/mois</span>
                  </div>
                  <span className="text-[#64748b] text-[8px]">récupérées</span>
                </div>

                {/* Floating badge — bottom */}
                <div className="absolute -bottom-3 left-4 animate-float-delayed bg-[#0c0c20] border border-[#7C3AED]/20 rounded-xl px-4 py-2 shadow-xl shadow-black/20" style={{ animationDelay: "2s" }}>
                  <div className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#7C3AED" fillOpacity="0.2" stroke="#7C3AED" strokeWidth="1.5" />
                      <path d="M8 12l2.5 2.5L16 9" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[#9D6FF0] text-[10px] font-semibold">Powered by Claude AI</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Scroll indicator */}
          <div className="mt-16 lg:mt-12">
            <div className="w-px h-14 bg-gradient-to-b from-white/30 to-transparent mx-auto animate-pulse" />
          </div>
        </div>
      </section>

      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
