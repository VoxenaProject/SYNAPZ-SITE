"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BookingModal from "@/components/ui/BookingModal";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      // Show after 20% scroll, hide near bottom (last 10%) where CTAFinal lives
      setVisible(scrollPercent > 0.2 && scrollPercent < 0.9);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-30 md:hidden"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="bg-[#7C3AED] shadow-[0_-4px_20px_rgba(124,58,237,0.3)]">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full h-14 flex items-center justify-center gap-2 text-white font-semibold text-sm cursor-pointer"
              >
                <span>Obtenir mon audit gratuit</span>
                <span>→</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
