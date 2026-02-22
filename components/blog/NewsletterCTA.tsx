import Link from "next/link";

export default function NewsletterCTA() {
  return (
    <div className="bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] rounded-2xl p-8 my-10 text-center">
      <h3 className="text-white font-extrabold text-xl mb-2 font-[family-name:var(--font-jakarta)]">
        Votre PME perd du temps sur des tâches répétitives ?
      </h3>
      <p className="text-white/80 text-sm mb-5">
        On identifie vos pertes de temps en 30 minutes. Résultats en 72h. Satisfait ou 0€.
      </p>
      <Link
        href="/#offre"
        className="inline-block bg-white text-[#7C3AED] font-bold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm"
      >
        Obtenir mon audit gratuit →
      </Link>
      <p className="text-white/60 text-xs mt-3">30 min · Gratuit · Sans engagement</p>
    </div>
  );
}
