"use client";

import { useState, useEffect, useCallback } from "react";
import { GA, getSessionFlag, setSessionFlag, getLocalFlag, SESSION_KEYS } from "@/lib/analytics";

interface ExitIntentPopupProps {
  onStartDiagnostic: () => void;
}

export default function ExitIntentPopup({ onStartDiagnostic }: ExitIntentPopupProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const shouldShow = useCallback(() => {
    // Guard: don't show if any of these conditions are true
    if (getSessionFlag(SESSION_KEYS.EXIT_INTENT_SHOWN)) return false;
    if (getSessionFlag(SESSION_KEYS.BOOKING_MODAL_OPENED)) return false;
    if (getSessionFlag(SESSION_KEYS.DIAGNOSTIC_COMPLETED)) return false;
    if (getLocalFlag(SESSION_KEYS.ROI_GATE_UNLOCKED)) return false;
    return true;
  }, []);

  useEffect(() => {
    if (dismissed) return;

    const pageLoadTime = Date.now();
    const MIN_TIME_ON_PAGE = 15000; // 15 seconds

    // Desktop: mouseleave on top of page
    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY > 10) return; // Only trigger when cursor goes to top
      if (Date.now() - pageLoadTime < MIN_TIME_ON_PAGE) return;
      if (!shouldShow()) return;
      setSessionFlag(SESSION_KEYS.EXIT_INTENT_SHOWN);
      GA.exitIntentShown();
      setVisible(true);
    }

    // Mobile: 45s inactivity
    let mobileTimer: ReturnType<typeof setTimeout> | null = null;
    const MOBILE_IDLE_MS = 45000;

    function resetMobileTimer() {
      if (mobileTimer) clearTimeout(mobileTimer);
      mobileTimer = setTimeout(() => {
        if (Date.now() - pageLoadTime < MIN_TIME_ON_PAGE) return;
        if (!shouldShow()) return;
        setSessionFlag(SESSION_KEYS.EXIT_INTENT_SHOWN);
        GA.exitIntentShown();
        setVisible(true);
      }, MOBILE_IDLE_MS);
    }

    // Only set up mobile detection on touch devices
    const isTouchDevice = "ontouchstart" in window;

    if (isTouchDevice) {
      resetMobileTimer();
      window.addEventListener("touchstart", resetMobileTimer, { passive: true });
      window.addEventListener("scroll", resetMobileTimer, { passive: true });
    } else {
      document.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (mobileTimer) clearTimeout(mobileTimer);
      if (isTouchDevice) {
        window.removeEventListener("touchstart", resetMobileTimer);
        window.removeEventListener("scroll", resetMobileTimer);
      }
    };
  }, [dismissed, shouldShow]);

  function handleYes() {
    GA.exitIntentConverted();
    setVisible(false);
    setDismissed(true);
    onStartDiagnostic();
  }

  function handleNo() {
    setVisible(false);
    setDismissed(true);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleNo}
      />

      {/* Popup */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-fade-in">
        {/* Close */}
        <button
          onClick={handleNo}
          className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#0F0F1A] transition-colors cursor-pointer"
          aria-label="Fermer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-[#7C3AED]/10 flex items-center justify-center mx-auto mb-5">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="#7C3AED" strokeWidth="1.8" />
              <path d="M12 8V12" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="16" r="1" fill="#7C3AED" />
            </svg>
          </div>

          <h3 className="text-xl font-extrabold text-[#0F0F1A] mb-2">
            Avant de partir...
          </h3>
          <p className="text-[#64748B] text-base mb-6 leading-relaxed">
            Votre PME perd-elle du temps
            sur des tâches répétitives ?
          </p>

          <div className="space-y-3">
            <button
              onClick={handleYes}
              className="w-full bg-[#7C3AED] text-white font-semibold py-3.5 rounded-xl hover:bg-[#6D28D9] transition-all shadow-lg shadow-[#7C3AED]/20 cursor-pointer"
            >
              Oui, probablement
            </button>
            <button
              onClick={handleNo}
              className="w-full text-[#94A3B8] font-medium py-3 rounded-xl hover:bg-[#F5F7FF] transition-all cursor-pointer text-sm"
            >
              Non, tout est optimisé
            </button>
          </div>

          <p className="text-[#94A3B8] text-xs mt-4">
            Si oui : découvrez combien en 3 minutes.
          </p>
        </div>
      </div>
    </div>
  );
}
