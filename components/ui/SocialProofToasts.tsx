"use client";

import { useState, useEffect, useCallback } from "react";
import { GA, getSessionFlag, SESSION_KEYS } from "@/lib/analytics";

const ENTRIES = [
  { commune: "Ixelles", delay: "12 min" },
  { commune: "Etterbeek", delay: "3h" },
  { commune: "Woluwe-Saint-Lambert", delay: "28 min" },
  { commune: "Schaerbeek", delay: "1h" },
  { commune: "Forest", delay: "45 min" },
  { commune: "Saint-Gilles", delay: "2h" },
  { commune: "Namur", delay: "17 min" },
  { commune: "Liège", delay: "5h" },
];

const FIRST_DELAY = 10000;    // 10s before first toast
const VISIBLE_DURATION = 5000; // 5s visible
const MAX_TOASTS = 4;

export default function SocialProofToasts() {
  const [currentEntry, setCurrentEntry] = useState<typeof ENTRIES[number] | null>(null);
  const [visible, setVisible] = useState(false);
  const [toastCount, setToastCount] = useState(0);
  const [entryIndex, setEntryIndex] = useState(0);

  const shouldShow = useCallback(() => {
    if (getSessionFlag(SESSION_KEYS.BOOKING_MODAL_OPENED)) return false;
    if (getSessionFlag(SESSION_KEYS.DIAGNOSTIC_COMPLETED)) return false;
    return true;
  }, []);

  useEffect(() => {
    if (toastCount >= MAX_TOASTS) return;

    const delay = toastCount === 0 ? FIRST_DELAY : (30000 + Math.random() * 15000);

    const timer = setTimeout(() => {
      if (!shouldShow()) return;

      const entry = ENTRIES[entryIndex % ENTRIES.length];
      setCurrentEntry(entry);
      setVisible(true);
      GA.socialProofShown();
      setToastCount((c) => c + 1);
      setEntryIndex((i) => i + 1);

      // Auto-hide after VISIBLE_DURATION
      setTimeout(() => {
        setVisible(false);
      }, VISIBLE_DURATION);
    }, delay);

    return () => clearTimeout(timer);
  }, [toastCount, entryIndex, shouldShow]);

  if (!visible || !currentEntry) return null;

  return (
    <div className="fixed bottom-20 left-4 md:bottom-6 md:left-6 z-20 max-w-xs animate-slide-in-left">
      <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-lg px-4 py-3 flex items-start gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-green-400 mt-1 flex-shrink-0 animate-pulse" />
        <div>
          <p className="text-[#0F0F1A] text-sm font-medium leading-snug">
            Une PME à {currentEntry.commune}
          </p>
          <p className="text-[#64748B] text-xs mt-0.5">
            vient de réserver son audit — il y a {currentEntry.delay}
          </p>
        </div>
      </div>
    </div>
  );
}
