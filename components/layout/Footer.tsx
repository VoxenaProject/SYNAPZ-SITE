import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#E2E8F0] py-10 px-6 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <Image
          src="/logo/synapz-logo-dark.svg"
          alt="SYNAPZ"
          width={120}
          height={30}
        />
        <p className="text-[#64748B] text-sm text-center">
          © 2025 SYNAPZ (VVI CONSULTING) · TVA BE1018193756 · synapz.be
        </p>
        <div className="flex items-center gap-6 text-sm text-[#64748B]">
          <Link href="/mentions-legales" className="hover:text-[#0F0F1A] transition-colors">
            Mentions légales
          </Link>
          <Link href="/politique-de-confidentialite" className="hover:text-[#0F0F1A] transition-colors">
            Confidentialité
          </Link>
          <a
            href="mailto:hello@synapz.be"
            className="hover:text-[#0F0F1A] transition-colors"
          >
            hello@synapz.be
          </a>
        </div>
      </div>
    </footer>
  );
}
