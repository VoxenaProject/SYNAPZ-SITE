"use client";

import { useState, useEffect } from "react";
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

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-2xl mx-auto animate-fade-in">
      <div className="bg-[#0c0c20] border border-white/[0.06] rounded-2xl shadow-xl shadow-black/30 px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-semibold mb-0.5">
            Ce site utilise des cookies
          </p>
          <p className="text-[#64748b] text-xs leading-relaxed">
            Uniquement des cookies techniques essentiels au bon fonctionnement du site. Aucun cookie publicitaire ni de tracking.{" "}
            <Link href="/politique-de-confidentialite" className="text-[#7C3AED] hover:underline">
              En savoir plus
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm text-[#94a3b8] font-medium border border-white/[0.06] rounded-lg hover:bg-white/[0.05] transition-colors cursor-pointer"
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
    </div>
  );
}
