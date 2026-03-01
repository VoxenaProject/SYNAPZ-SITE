"use client";

import { useState } from "react";
import { useReveal } from "@/lib/useReveal";
import BookingModal from "@/components/ui/BookingModal";
import { GA } from "@/lib/analytics";
import WebsiteMockup from "@/components/product/WebsiteMockup";
import WorkflowMockup from "@/components/product/WorkflowMockup";
import DashboardMockup from "@/components/product/DashboardMockup";
import ChatbotMockup from "@/components/product/ChatbotMockup";

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
      <circle cx="8" cy="8" r="7" stroke="#7C3AED" strokeWidth="1.2" fill="#7C3AED" fillOpacity={0.08} />
      <path d="M5 8L7 10L11 6" stroke="#7C3AED" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const tabs = [
  { label: "Sites Web" },
  { label: "Automatisation" },
  { label: "CRM & Prospection" },
  { label: "Chatbot IA" },
];

const tabContent = [
  {
    bullets: [
      "Convertissez jusqu\u2019\u00e0 40% de visiteurs en plus",
      "1\u00e8re page Google gr\u00e2ce \u00e0 l\u2019optimisation technique",
      "En ligne en 1-2 semaines, pas en 3 mois",
    ],
  },
  {
    bullets: [
      "R\u00e9cup\u00e9rez 8-15h/semaine sur les t\u00e2ches r\u00e9p\u00e9titives",
      "Z\u00e9ro changement d\u2019outil \u2014 on s\u2019int\u00e8gre \u00e0 votre stack",
      "ROI moyen : le co\u00fbt d\u2019un mi-temps r\u00e9cup\u00e9r\u00e9",
    ],
  },
  {
    bullets: [
      "Ne perdez plus jamais un lead qualifi\u00e9",
      "Prospection 24/7, m\u00eame quand vous dormez",
      "Chaque opportunit\u00e9 track\u00e9e, scor\u00e9e, relanc\u00e9e automatiquement",
    ],
  },
  {
    bullets: [
      "R\u00e9pondez \u00e0 70% des demandes sans intervention humaine",
      "Vos clients obtiennent une r\u00e9ponse en 2 secondes, pas en 2 jours",
      "Escalade intelligente : l\u2019humain intervient uniquement quand c\u2019est n\u00e9cessaire",
    ],
  },
];

function TabMockup({ index }: { index: number }) {
  switch (index) {
    case 0:
      return <WebsiteMockup />;
    case 1:
      return <WorkflowMockup />;
    case 2:
      return <DashboardMockup />;
    case 3:
      return <ChatbotMockup />;
    default:
      return null;
  }
}

export default function ProductShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <>
      <section id="livrables" className="py-32 md:py-40 px-6 below-fold">
        <div ref={revealRef} className="max-w-[1100px] mx-auto">
          {/* Header */}
          <div className="text-center mb-16 reveal">
            <p className="text-[#7C3AED] text-[11px] font-semibold uppercase tracking-[0.05em] mb-5">
              Impact concret
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Ce que vous gagnez concr&egrave;tement
            </h2>
            <p className="text-[#94a3b8] text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
              Chaque solution est mesur&eacute;e par son impact sur votre business. Pas par ses features.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 justify-center mb-12 reveal reveal-d1 flex-wrap">
            {tabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(i)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  activeTab === i
                    ? "bg-[#7C3AED]/10 text-white border border-[#7C3AED]/30"
                    : "text-[#64748b] hover:text-white border border-transparent"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content area */}
          <div
            key={activeTab}
            className="animate-fade-in reveal reveal-d2"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              {/* Left — Mockup */}
              <div className="flex items-center justify-center">
                <TabMockup index={activeTab} />
              </div>

              {/* Right — Bullets */}
              <div className="space-y-5">
                {tabContent[activeTab].bullets.map((bullet, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-[#94a3b8] text-sm leading-relaxed">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16 reveal reveal-d3">
            <button
              onClick={() => { GA.bookingModalOpened("product_showcase"); setModalOpen(true); }}
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
