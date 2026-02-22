"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import BookingModal from "@/components/ui/BookingModal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Approche", href: "/#approche" },
    { label: "Offre", href: "/#offre" },
    { label: "Équipe", href: "/#equipe" },
    { label: "FAQ", href: "/#faq" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-sm"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo/synapz-logo-dark.svg"
              alt="SYNAPZ"
              width={146}
              height={32}
              priority
            />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#64748B] hover:text-[#0F0F1A] transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <motion.button
              onClick={() => setModalOpen(true)}
              className="bg-[#7C3AED] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#9D6FF0] transition-all shadow-md shadow-[#7C3AED]/20 hover:shadow-[#7C3AED]/30 cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Audit gratuit →
            </motion.button>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
          >
            <div
              className={`w-6 h-0.5 bg-[#0F0F1A] mb-1.5 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <div
              className={`w-6 h-0.5 bg-[#0F0F1A] mb-1.5 transition-all ${menuOpen ? "opacity-0" : ""}`}
            />
            <div
              className={`w-6 h-0.5 bg-[#0F0F1A] transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <motion.div
            className="md:hidden bg-white border-t border-[#E2E8F0] px-6 py-4 space-y-4 shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-[#64748B] hover:text-[#0F0F1A] py-2 text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false);
                setModalOpen(true);
              }}
              className="w-full bg-[#7C3AED] text-white font-semibold px-5 py-3 rounded-lg hover:bg-[#9D6FF0] transition-colors text-sm cursor-pointer"
            >
              Audit gratuit →
            </button>
          </motion.div>
        )}
      </motion.nav>

      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
