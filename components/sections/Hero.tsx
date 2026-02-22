"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const BookingModal = dynamic(() => import("@/components/ui/BookingModal"));

function NeuralBackground() {
  const nodes = [
    { x: 120, y: 160 },
    { x: 280, y: 75 },
    { x: 680, y: 95 },
    { x: 830, y: 210 },
    { x: 160, y: 410 },
    { x: 750, y: 450 },
    { x: 480, y: 270 },
    { x: 370, y: 490 },
    { x: 580, y: 55 },
    { x: 950, y: 370 },
    { x: 55, y: 290 },
    { x: 900, y: 130 },
  ];
  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 5], [0, 4], [4, 7],
    [7, 5], [1, 6], [6, 3], [2, 6], [6, 5], [8, 2],
    [3, 9], [5, 9], [10, 0], [10, 4], [11, 3], [11, 8],
  ];

  return (
    <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 560"
        preserveAspectRatio="xMidYMid slice"
      >
        {connections.map(([from, to], i) => (
          <line
            key={i}
            x1={nodes[from].x} y1={nodes[from].y}
            x2={nodes[to].x} y2={nodes[to].y}
            stroke="#7C3AED"
            strokeOpacity={0.06}
            strokeWidth={1}
          />
        ))}
        {nodes.map((node, i) => (
          <circle
            key={i}
            cx={node.x}
            cy={node.y}
            r={i === 6 ? 5 : 2.5}
            fill="#7C3AED"
            fillOpacity={i === 6 ? 0.2 : 0.1}
          />
        ))}
      </svg>
    </div>
  );
}

const stats = [
  { value: "72h", label: "premier résultat livré" },
  { value: "0€", label: "pour commencer" },
  { value: "5h/sem", label: "minimum garanti" },
];

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        <NeuralBackground />

        {/* Subtle ambient glow — hidden on mobile (blur-3xl is GPU-expensive) */}
        <div className="hidden md:block absolute bottom-0 left-1/4 w-[500px] h-[280px] bg-[#7C3AED]/4 rounded-full blur-3xl pointer-events-none" />
        <div className="hidden md:block absolute top-1/3 right-0 w-[300px] h-[200px] bg-[#06B6D4]/3 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-40 pb-24 text-center">
          {/* Pill badge */}
          <div className="animate-fade-in inline-flex items-center gap-2 bg-[#7C3AED]/8 border border-[#7C3AED]/15 rounded-full px-5 py-2 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-pulse" />
            <span className="text-[#7C3AED] text-xs font-semibold uppercase tracking-[0.05em]">
              Impulsions IA pour PME
            </span>
          </div>

          {/* H1 — no animation: this is the LCP element, must render instantly */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-8 text-[#0F0F1A]">
            Vos équipes perdent des heures
            <br />
            <span className="gradient-text">
              sur des tâches qu&apos;une IA fait en 3 secondes.
            </span>
          </h1>

          {/* Subtitle — no animation delay for faster LCP context */}
          <p className="text-[#64748B] text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            On identifie vos pertes de temps. On les automatise en 72h.
            Si vous ne gagnez pas{" "}
            <span className="text-[#0F0F1A] font-semibold">5h/semaine</span>{" "}
            —{" "}
            <span className="text-[#7C3AED] font-semibold">vous ne payez rien.</span>
          </p>

          {/* 3 Stat badges */}
          <div className="animate-fade-in-d3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center border border-[#E2E8F0] rounded-xl px-7 py-4 bg-white/80"
              >
                <span className="text-2xl font-extrabold gradient-text">
                  {stat.value}
                </span>
                <span className="text-[10px] text-[#64748B] uppercase tracking-wider mt-1 font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="animate-fade-in-d4 flex flex-col items-center gap-3">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-[#7C3AED] text-white font-semibold text-lg px-10 py-4 rounded-xl hover:bg-[#6D28D9] transition-all shadow-lg shadow-[#7C3AED]/20 hover:shadow-xl hover:shadow-[#7C3AED]/30 cursor-pointer"
            >
              Obtenir mon audit gratuit →
            </button>
            <span className="text-[#94A3B8] text-sm">
              30 min · Gratuit · Sans engagement
            </span>
            <div className="flex items-center gap-2 mt-2">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M12 2L4 6V12C4 14.5 7.5 16 12 16C16.5 16 20 14.5 20 12V6L12 2Z" stroke="#7C3AED" strokeWidth="1.2" strokeLinejoin="round" transform="scale(0.7) translate(1,1)" />
                <path d="M5.5 8L7 9.5L10.5 6" stroke="#7C3AED" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[#7C3AED] text-xs font-medium">
                Garanti : 5h récupérées/semaine ou remboursé
              </span>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="mt-24">
            <div className="w-px h-14 bg-gradient-to-b from-[#7C3AED]/40 to-transparent mx-auto animate-pulse" />
          </div>
        </div>
      </section>

      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
