import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10 px-6 bg-[#060612]">
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <Image
          src="/logo/synapz-logo-light.svg"
          alt="SYNAPZ"
          width={128}
          height={28}
        />
        <p className="text-[#64748b] text-sm text-center">
          © 2026 SYNAPZ · TVA BE1018193756 · synapz.be
        </p>
        <div className="flex items-center gap-6 text-sm text-[#64748b]">
          <Link href="/blog" className="hover:text-white transition-colors">
            Blog
          </Link>
          <Link href="/mentions-legales" className="hover:text-white transition-colors">
            Mentions légales
          </Link>
          <Link href="/politique-de-confidentialite" className="hover:text-white transition-colors">
            Confidentialité
          </Link>
          <a
            href="mailto:hello@synapz.be"
            className="hover:text-white transition-colors"
          >
            hello@synapz.be
          </a>
        </div>
      </div>
    </footer>
  );
}
