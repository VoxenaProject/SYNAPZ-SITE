"use client";

import { useState, useEffect } from "react";
import BookingModal from "@/components/ui/BookingModal";
import { GA } from "@/lib/analytics";

function getUrgencyMessage() {
  const day = new Date().getDay();
  const hour = new Date().getHours();
  const days = ["", "lundi", "mardi", "mercredi", "jeudi", "vendredi"];

  if (day >= 1 && day <= 3 && hour < 14) {
    return `Prochain créneau : ${days[day]} à 14h`;
  }

  if (day >= 3 && day <= 5) {
    return "Plus que 2 places disponibles ce mois";
  }

  return "Plus que 3 places disponibles ce mois";
}

export default function UrgencyBar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage(getUrgencyMessage());
  }, []);

  if (!message) return null;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-40 bg-[#F5F3FF] border-b border-[#7C3AED]/15 py-2 px-4 text-center">
        <button
          onClick={() => {
            GA.urgencyBarClicked();
            GA.bookingModalOpened("urgency_bar");
            setModalOpen(true);
          }}
          className="inline-flex items-center gap-2 text-sm cursor-pointer hover:opacity-80 transition-opacity"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-pulse flex-shrink-0" />
          <span className="text-[#64748B]">
            {message}
          </span>
          <span className="text-[#7C3AED] font-semibold ml-1">
            Réserver →
          </span>
        </button>
      </div>

      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
