"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import BookingAgent from "@/components/ui/BookingAgent";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type View = "home" | "booking" | "form";

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [view, setView] = useState<View>("home");
  const [formData, setFormData] = useState({
    name: "", email: "", company: "", message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function handleClose() {
    onClose();
    setTimeout(() => {
      setView("home");
      setStatus("idle");
      setFormData({ name: "", email: "", company: "", message: "" });
    }, 300);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("sent");
        setTimeout(() => {
          handleClose();
        }, 2500);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass = "w-full bg-[#F5F7FF] border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[#0F0F1A] text-sm focus:outline-none focus:border-[#7C3AED] transition-colors placeholder:text-[#94A3B8]";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="bg-white border border-[#E2E8F0] rounded-2xl w-full max-w-xl shadow-2xl shadow-black/10 overflow-hidden max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    {view === "home" && (
                      <>
                        <h3 className="text-2xl font-extrabold text-[#0F0F1A]">
                          Obtenir mon audit gratuit
                        </h3>
                        <p className="text-[#64748B] text-sm mt-1">
                          On revient vers vous en moins de 24h.
                        </p>
                      </>
                    )}
                    {view === "booking" && (
                      <>
                        <h3 className="text-2xl font-extrabold text-[#0F0F1A]">
                          Réserver un call
                        </h3>
                        <p className="text-[#64748B] text-sm mt-1">
                          30 minutes — 100% gratuit
                        </p>
                      </>
                    )}
                    {view === "form" && (
                      <>
                        <h3 className="text-2xl font-extrabold text-[#0F0F1A]">
                          Nous écrire
                        </h3>
                        <p className="text-[#64748B] text-sm mt-1">
                          Réponse garantie sous 24h.
                        </p>
                      </>
                    )}
                  </div>
                  <button
                    onClick={handleClose}
                    className="text-[#64748B] hover:text-[#0F0F1A] transition-colors text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F5F7FF] cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                {/* Home view — 4 contact options */}
                {view === "home" && (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setView("booking")}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[#E2E8F0] hover:border-[#7C3AED]/50 hover:bg-[#7C3AED]/5 transition-all text-center group cursor-pointer"
                    >
                      <span className="text-2xl">📅</span>
                      <div>
                        <div className="text-xs font-semibold text-[#0F0F1A] group-hover:text-[#7C3AED] transition-colors">
                          Réserver un call
                        </div>
                        <div className="text-[10px] text-[#94A3B8]">30 min — gratuit</div>
                      </div>
                    </button>

                    <a
                      href="https://wa.me/32483596627"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[#E2E8F0] hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all text-center group"
                    >
                      <span className="text-2xl">💬</span>
                      <div>
                        <div className="text-xs font-semibold text-[#0F0F1A] group-hover:text-[#25D366] transition-colors">
                          WhatsApp Dejvi
                        </div>
                        <div className="text-[10px] text-[#94A3B8]">CEO · Automatisation</div>
                      </div>
                    </a>

                    <a
                      href="https://wa.me/32488448370"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[#E2E8F0] hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all text-center group"
                    >
                      <span className="text-2xl">💬</span>
                      <div>
                        <div className="text-xs font-semibold text-[#0F0F1A] group-hover:text-[#25D366] transition-colors">
                          WhatsApp Daniele
                        </div>
                        <div className="text-[10px] text-[#94A3B8]">Stratégie IA · Conseil</div>
                      </div>
                    </a>

                    <button
                      onClick={() => setView("form")}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[#E2E8F0] hover:border-[#7C3AED]/50 hover:bg-[#7C3AED]/5 transition-all text-center group cursor-pointer"
                    >
                      <span className="text-2xl">📩</span>
                      <div>
                        <div className="text-xs font-semibold text-[#0F0F1A] group-hover:text-[#7C3AED] transition-colors">
                          Nous écrire
                        </div>
                        <div className="text-[10px] text-[#94A3B8]">Formulaire rapide</div>
                      </div>
                    </button>
                  </div>
                )}

                {/* Booking agent view */}
                {view === "booking" && (
                  <BookingAgent onBack={() => setView("home")} />
                )}

                {/* Contact form view */}
                {view === "form" && (
                  <>
                    {status === "sent" ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-8"
                      >
                        <div className="text-4xl mb-3">✅</div>
                        <p className="text-[#0F0F1A] font-semibold text-lg">Message reçu !</p>
                        <p className="text-[#64748B] text-sm mt-1">On revient vers vous sous 24h.</p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-[#64748B] mb-1 font-medium">Prénom *</label>
                            <input required type="text" value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className={inputClass} placeholder="Dejvi" />
                          </div>
                          <div>
                            <label className="block text-xs text-[#64748B] mb-1 font-medium">Entreprise</label>
                            <input type="text" value={formData.company}
                              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                              className={inputClass} placeholder="Ma PME" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs text-[#64748B] mb-1 font-medium">Email *</label>
                          <input required type="email" value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={inputClass} placeholder="vous@entreprise.be" />
                        </div>
                        <div>
                          <label className="block text-xs text-[#64748B] mb-1 font-medium">Message (optionnel)</label>
                          <textarea value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            rows={3} className={`${inputClass} resize-none`}
                            placeholder="Quelles tâches vous prennent le plus de temps ?" />
                        </div>
                        <div className="flex gap-3">
                          <button type="button" onClick={() => setView("home")}
                            className="flex-1 border border-[#E2E8F0] text-[#64748B] font-medium py-2.5 rounded-lg text-sm hover:bg-[#F5F7FF] transition-colors cursor-pointer">
                            ← Retour
                          </button>
                          <button type="submit" disabled={status === "sending"}
                            className="flex-1 bg-[#7C3AED] text-white font-semibold py-3 rounded-lg hover:bg-[#9D6FF0] transition-all shadow-md shadow-[#7C3AED]/20 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer">
                            {status === "sending" ? "Envoi..." : "Envoyer →"}
                          </button>
                        </div>
                        {status === "error" && (
                          <p className="text-red-500 text-xs text-center">
                            Une erreur s&apos;est produite. Contactez-nous sur WhatsApp.
                          </p>
                        )}
                      </form>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
