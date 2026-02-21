"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import BookingModal from "@/components/ui/BookingModal";

// Animated neural network — signature SYNAPZ background
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
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 560"
        preserveAspectRatio="xMidYMid slice"
      >
        {connections.map(([from, to], i) => (
          <motion.line
            key={i}
            x1={nodes[from].x} y1={nodes[from].y}
            x2={nodes[to].x} y2={nodes[to].y}
            stroke="#7C3AED"
            strokeOpacity={0.1}
            strokeWidth={1.5}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, delay: 0.3 + i * 0.06, ease: "easeOut" }}
          />
        ))}
        {nodes.map((node, i) => (
          <motion.circle
            key={i}
            cx={node.x}
            cy={node.y}
            r={i === 6 ? 6 : 3.5}
            fill="#7C3AED"
            fillOpacity={i === 6 ? 0.35 : 0.18}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.3, 1], opacity: [0, 0.5, i === 6 ? 0.35 : 0.18] }}
            transition={{ duration: 0.5, delay: 0.9 + i * 0.07 }}
          />
        ))}
        {/* Pulsing center node */}
        <motion.circle
          cx={480} cy={270} r={12}
          fill="none"
          stroke="#7C3AED"
          strokeOpacity={0.15}
          animate={{ r: [12, 22, 12], strokeOpacity: [0.15, 0, 0.15] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

function BoltSVG() {
  return (
    <motion.svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.9, type: "spring" }}
    >
      <motion.path
        d="M13 2L4.5 13.5H11.5L10.5 22L20 10.5H13L13 2Z"
        fill="#7C3AED"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      />
    </motion.svg>
  );
}

function ShieldSVG() {
  return (
    <motion.svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.1, type: "spring" }}
    >
      <motion.path
        d="M12 2L4 6V12C4 16.5 7.5 20.6 12 22C16.5 20.6 20 16.5 20 12V6L12 2Z"
        fill="#7C3AED" fillOpacity={0.15}
        stroke="#7C3AED" strokeWidth="1.5" strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      />
      <motion.path
        d="M9 12L11 14L15 10"
        stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 1.7 }}
      />
    </motion.svg>
  );
}

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white grid-bg">
        <NeuralBackground />

        {/* Soft ambient glow */}
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[280px] bg-[#7C3AED]/6 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-[300px] h-[200px] bg-[#06B6D4]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
          {/* Qualification tag */}
          <motion.p
            className="text-[#64748B] text-sm md:text-base mb-6 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Pour les dirigeants de PME qui perdent du temps sur des tâches répétitives
          </motion.p>

          {/* H1 */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-[64px] font-extrabold leading-[1.1] mb-6 text-[#0F0F1A]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Automatisez vos tâches répétitives.
            <br />
            <span className="gradient-text">
              Résultats en 72h — garanti.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-[#64748B] text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            Un call de 30 minutes. On identifie vos 3 plus grandes pertes de
            temps. On les automatise. Si vous ne récupérez pas au moins{" "}
            <span className="text-[#0F0F1A] font-semibold">5h/semaine</span>{" "}
            d&apos;ici 30 jours —{" "}
            <span className="text-[#7C3AED] font-semibold">vous ne payez rien.</span>
          </motion.p>

          {/* Trust badges */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 mb-10 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <div className="flex items-center gap-2.5 bg-white border border-[#E2E8F0] shadow-sm rounded-full px-5 py-2.5">
              <BoltSVG />
              <span className="text-[#64748B]">
                Premiers résultats en{" "}
                <span className="text-[#0F0F1A] font-semibold">72h</span>
              </span>
            </div>
            <div className="flex items-center gap-2.5 bg-white border border-[#E2E8F0] shadow-sm rounded-full px-5 py-2.5">
              <ShieldSVG />
              <span className="text-[#64748B]">
                <span className="text-[#0F0F1A] font-semibold">5h/semaine garanties</span>{" "}
                — ou 0€
              </span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <motion.button
              onClick={() => setModalOpen(true)}
              className="bg-[#7C3AED] text-white font-semibold text-lg px-8 py-4 rounded-xl hover:bg-[#9D6FF0] transition-all shadow-lg shadow-[#7C3AED]/25 hover:shadow-xl hover:shadow-[#7C3AED]/35 cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Obtenir mon audit gratuit →
            </motion.button>
            <a
              href="#approche"
              className="text-[#64748B] hover:text-[#0F0F1A] transition-colors font-medium text-base underline-offset-4 hover:underline"
            >
              Voir comment ça marche ↓
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="mt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <motion.div
              className="w-0.5 h-12 bg-gradient-to-b from-[#7C3AED] to-transparent mx-auto rounded-full"
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </section>

      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
