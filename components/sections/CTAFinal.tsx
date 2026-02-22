"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import BookingModal from "@/components/ui/BookingModal";

function getNextMonth(): string {
  const months = [
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre",
  ];
  const now = new Date();
  return months[now.getMonth()];
}

export default function CTAFinal() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="py-28 px-6 relative overflow-hidden bg-[#0F0F1A] below-fold">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/20 via-[#0F0F1A] to-[#06B6D4]/10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#7C3AED]/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(124,58,237,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left — Copy */}
            <div>
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
                className="text-white/60 text-lg mb-8 max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Pas de carte bancaire. Pas de contrat. Pas de jargon.
                Choisissez un créneau, on s&apos;occupe du reste.
              </motion.p>

              {/* Scarcity */}
              <motion.div
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2.5 mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                <span className="text-white/60 text-sm">
                  5 nouvelles PME par mois.{" "}
                  <span className="text-white font-semibold">
                    Places limitées en {getNextMonth()}.
                  </span>
                </span>
              </motion.div>

              {/* Contact options */}
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <a
                  href="https://wa.me/32483596627"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white/5 border border-white/10 hover:border-[#25D366] text-white font-medium px-5 py-3.5 rounded-xl transition-all w-full max-w-xs"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-sm font-semibold">WhatsApp Dejvi</div>
                    <div className="text-xs text-white/50">Réponse sous 2h</div>
                  </div>
                </a>

                <a
                  href="https://wa.me/32488448370"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white/5 border border-white/10 hover:border-[#25D366] text-white font-medium px-5 py-3.5 rounded-xl transition-all w-full max-w-xs"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-sm font-semibold">WhatsApp Daniele</div>
                    <div className="text-xs text-white/50">Réponse sous 2h</div>
                  </div>
                </a>

                <button
                  onClick={() => setModalOpen(true)}
                  className="flex items-center gap-3 bg-white/5 border border-white/10 hover:border-[#7C3AED]/60 text-white font-medium px-5 py-3.5 rounded-xl transition-all w-full max-w-xs cursor-pointer"
                >
                  <span className="text-lg">📩</span>
                  <div className="text-left">
                    <div className="text-sm font-semibold">Nous écrire</div>
                    <div className="text-xs text-white/50">Formulaire rapide</div>
                  </div>
                </button>
              </motion.div>

              <motion.p
                className="text-white/30 text-xs mt-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Satisfait ou 0€ — c&apos;est notre engagement, pas une clause en petits caractères.
              </motion.p>
            </div>

            {/* Right — Calendly embed */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl shadow-[#7C3AED]/10">
                <iframe
                  src="https://calendly.com/daniele-synapz/strategie-meeting"
                  width="100%"
                  height="660"
                  frameBorder="0"
                  title="Réserver un call stratégie"
                  className="block"
                />
              </div>
              <p className="text-white/40 text-xs text-center mt-3">
                30 min · Gratuit · Sans engagement
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
