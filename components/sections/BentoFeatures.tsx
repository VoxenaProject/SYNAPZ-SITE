"use client";

import { useState } from "react";
import { useReveal } from "@/lib/useReveal";
import BookingModal from "@/components/ui/BookingModal";
import { GA } from "@/lib/analytics";
import WebsiteMockup from "@/components/product/WebsiteMockup";
import WorkflowMockup from "@/components/product/WorkflowMockup";
import ChatbotMockup from "@/components/product/ChatbotMockup";

function DatabaseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="5" rx="8" ry="3" stroke="#7C3AED" strokeWidth="1.8" />
      <path d="M4 5V19C4 20.66 7.58 22 12 22C16.42 22 20 20.66 20 19V5" stroke="#7C3AED" strokeWidth="1.8" />
      <path d="M4 12C4 13.66 7.58 15 12 15C16.42 15 20 13.66 20 12" stroke="#7C3AED" strokeWidth="1.8" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="#7C3AED" strokeWidth="1.8" />
      <path d="M16 16L21 21" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="#7C3AED" strokeWidth="1.8" />
      <path d="M3 7L12 13L21 7" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <span className="inline-flex bg-[#7C3AED]/[0.08] text-[#9D6FF0] rounded-full px-3 py-1 text-[10px] font-semibold">
      {text}
    </span>
  );
}

export default function BentoFeatures() {
  const [modalOpen, setModalOpen] = useState(false);
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <>
      <section id="services" className="py-32 md:py-40 px-6 below-fold">
        <div ref={revealRef} className="max-w-[1100px] mx-auto">
          {/* Header */}
          <div className="text-center mb-16 reveal">
            <p className="text-[#7C3AED] text-[11px] font-semibold uppercase tracking-[0.05em] mb-5">
              Nos Services
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Tout ce dont votre business a besoin
            </h2>
            <p className="text-[#94a3b8] text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
              Sites web, automatisations, CRM, SEO &mdash; on s&apos;occupe de tout
              pour que vous vous occupiez de votre m&eacute;tier.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. Sites Web Premium — large */}
            <div className="glass-card rounded-2xl p-6 hover:border-[#7C3AED]/25 transition-all duration-300 reveal reveal-d1 md:col-span-2">
              <div className="overflow-hidden rounded-xl h-[200px] mb-5 flex items-center justify-center bg-[#060612]">
                <WebsiteMockup />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Sites Web Premium</h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed mb-3">
                Sites vitrines, e-commerce, landing pages &mdash; design premium, performance optimale.
              </p>
              <Badge text="Next.js &middot; Tailwind &middot; Vercel" />
            </div>

            {/* 2. CRM Personnalis&eacute; — standard */}
            <div className="glass-card rounded-2xl p-6 hover:border-[#7C3AED]/25 transition-all duration-300 reveal reveal-d2">
              <div className="w-10 h-10 rounded-lg bg-[#7C3AED]/10 flex items-center justify-center mb-4">
                <DatabaseIcon />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">CRM Personnalis&eacute;</h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed mb-3">
                Pipeline commercial, scoring IA, s&eacute;quences email automatis&eacute;es.
              </p>
              <Badge text="Sur-mesure" />
            </div>

            {/* 3. SEO & R&eacute;f&eacute;rencement — standard */}
            <div className="glass-card rounded-2xl p-6 hover:border-[#7C3AED]/25 transition-all duration-300 reveal reveal-d3">
              <div className="w-10 h-10 rounded-lg bg-[#7C3AED]/10 flex items-center justify-center mb-4">
                <SearchIcon />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">SEO &amp; R&eacute;f&eacute;rencement</h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed mb-3">
                Audit technique, optimisation on-page, strat&eacute;gie de contenu.
              </p>
              <Badge text="Google-first" />
            </div>

            {/* 4. Emails & Prospection IA — standard */}
            <div className="glass-card rounded-2xl p-6 hover:border-[#7C3AED]/25 transition-all duration-300 reveal reveal-d4">
              <div className="w-10 h-10 rounded-lg bg-[#7C3AED]/10 flex items-center justify-center mb-4">
                <MailIcon />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Emails &amp; Prospection IA</h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed mb-3">
                S&eacute;quences automatis&eacute;es, personnalisation Claude AI, tracking temps r&eacute;el.
              </p>
              <Badge text="4 &eacute;tapes auto" />
            </div>

            {/* 5. Automatisations Sur-mesure — large */}
            <div className="glass-card rounded-2xl p-6 hover:border-[#7C3AED]/25 transition-all duration-300 reveal reveal-d5 md:col-span-2">
              <div className="overflow-hidden rounded-xl h-[200px] mb-5 flex items-center justify-center bg-[#060612]">
                <WorkflowMockup />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Automatisations Sur-mesure</h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed mb-3">
                Factures, reporting, synchro outils &mdash; tout ce qui est r&eacute;p&eacute;titif, on l&apos;&eacute;limine.
              </p>
              <Badge text="Gain : 5-15h/sem" />
            </div>

            {/* 6. Chatbot & Support IA — full width */}
            <div className="glass-card rounded-2xl p-6 hover:border-[#7C3AED]/25 transition-all duration-300 reveal reveal-d3 md:col-span-3">
              <div className="overflow-hidden rounded-xl h-[200px] mb-5 flex items-center justify-center bg-[#060612]">
                <ChatbotMockup />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Chatbot &amp; Support IA</h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed mb-3">
                Assistant intelligent 24/7, FAQ dynamique, escalade humaine quand n&eacute;cessaire.
              </p>
              <Badge text="70% des demandes trait&eacute;es auto" />
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12 reveal reveal-d3">
            <button
              onClick={() => { GA.bookingModalOpened("bento_features"); setModalOpen(true); }}
              className="bg-[#7C3AED] text-white font-semibold text-base px-8 py-4 rounded-xl hover:bg-[#9D6FF0] transition-all shadow-lg shadow-[#7C3AED]/25 hover:shadow-xl hover:shadow-[#7C3AED]/35 cursor-pointer"
            >
              Quelle solution pour votre business ? &rarr;
            </button>
          </div>
        </div>
      </section>

      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
