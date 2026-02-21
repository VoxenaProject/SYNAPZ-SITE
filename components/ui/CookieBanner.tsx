"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("cookie_consent", "declined");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 280 }}
          className="fixed bottom-4 left-4 right-4 z-50 max-w-2xl mx-auto"
        >
          <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-xl shadow-black/8 px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-[#0F0F1A] text-sm font-semibold mb-0.5">
                🍪 Ce site utilise des cookies
              </p>
              <p className="text-[#64748B] text-xs leading-relaxed">
                Uniquement des cookies techniques essentiels au bon fonctionnement du site. Aucun cookie publicitaire ni de tracking.{" "}
                <Link href="/politique-de-confidentialite" className="text-[#7C3AED] hover:underline">
                  En savoir plus
                </Link>
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={decline}
                className="px-4 py-2 text-sm text-[#64748B] font-medium border border-[#E2E8F0] rounded-lg hover:bg-[#F5F7FF] transition-colors cursor-pointer"
              >
                Refuser
              </button>
              <button
                onClick={accept}
                className="px-4 py-2 text-sm text-white font-semibold bg-[#7C3AED] rounded-lg hover:bg-[#9D6FF0] transition-colors cursor-pointer"
              >
                Accepter
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
