"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import BookingModal from "@/components/ui/BookingModal";

export default function CTAFinal() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="py-24 px-6 relative overflow-hidden bg-[#0F0F1A]">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/20 via-[#0F0F1A] to-[#06B6D4]/10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#7C3AED]/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(124,58,237,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#7C3AED] text-sm font-semibold uppercase tracking-widest mb-6">
              Prêt à commencer ?
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              Audit gratuit. Résultats en 72h.
              <br />
              <span className="gradient-text">Ou c&apos;est remboursé.</span>
            </h2>
          </motion.div>

          <motion.p
            className="text-white/60 text-lg mb-4 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Pas de carte bancaire. Pas de contrat. Pas de jargon. Si vous ne
            repartez pas avec des pistes concrètes, on vous offre 1h de
            conseil supplémentaire — gratuitement.
          </motion.p>

          <motion.div
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2.5 mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
            <span className="text-white/60 text-sm">
              On ne prend que{" "}
              <span className="text-white font-semibold">5 nouvelles PME par mois</span>{" "}
              — pas pour créer l&apos;urgence, pour garantir la qualité.
            </span>
          </motion.div>

          {/* 3 booking options */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-3 bg-white/5 border border-white/10 hover:border-[#7C3AED]/60 text-white font-medium px-6 py-4 rounded-xl transition-all cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-xl">📅</span>
              <div className="text-left">
                <div className="text-sm font-semibold">Booker un call</div>
                <div className="text-xs text-white/50">30 min — gratuit</div>
              </div>
            </motion.button>
            <motion.a
              href="https://wa.me/32483596627"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white/5 border border-white/10 hover:border-[#25D366] text-white font-medium px-6 py-4 rounded-xl transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-xl">💬</span>
              <div className="text-left">
                <div className="text-sm font-semibold">WhatsApp</div>
                <div className="text-xs text-white/50">Réponse sous 2h</div>
              </div>
            </motion.a>
            <motion.button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-3 bg-[#7C3AED] hover:bg-[#9D6FF0] text-white font-medium px-6 py-4 rounded-xl transition-all shadow-lg shadow-[#7C3AED]/30 hover:shadow-xl hover:shadow-[#7C3AED]/40 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-xl">📩</span>
              <div className="text-left">
                <div className="text-sm font-semibold">Nous écrire</div>
                <div className="text-xs text-white/70">Formulaire rapide</div>
              </div>
            </motion.button>
          </motion.div>

          <motion.p
            className="text-white/30 text-xs"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            🛡 Satisfait ou 0€ — c&apos;est notre engagement, pas une clause en
            petits caractères.
          </motion.p>
        </div>
      </section>

      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
