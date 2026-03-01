"use client";

import { useState, useEffect } from "react";
import BookingModal from "@/components/ui/BookingModal";
import { GA } from "@/lib/analytics";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setVisible(scrollPercent > 0.2 && scrollPercent < 0.9);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`fixed bottom-0 left-0 right-0 z-30 md:hidden transition-transform duration-300 ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-[#7C3AED] shadow-[0_-4px_20px_rgba(124,58,237,0.3)]">
          <button
            onClick={() => { GA.bookingModalOpened("sticky_mobile"); setModalOpen(true); }}
            className="w-full h-14 flex items-center justify-center gap-2 text-white font-semibold text-sm cursor-pointer"
          >
            <span>Obtenir mon audit gratuit</span>
            <span>→</span>
          </button>
        </div>
      </div>

      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
