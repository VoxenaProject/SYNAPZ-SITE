import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Automatisation IA en Wallonie — Agence IA pour PME",
  description:
    "SYNAPZ automatise les PME wallonnes avec l'IA. Audit gratuit en 30 min. Résultats en 72h. Compatible chèque maturité numérique Wallonie. Satisfait ou 0€.",
  keywords: [
    "automatisation IA Wallonie",
    "agence IA Wallonie",
    "automatisation PME Wallonie",
    "chèque maturité numérique Wallonie",
    "intelligence artificielle Wallonie",
    "automatisation IA Liège",
    "automatisation IA Namur",
    "automatisation IA Charleroi",
  ],
  alternates: {
    canonical: "https://synapz.be/automatisation-ia-wallonie",
  },
  openGraph: {
    title: "Automatisation IA en Wallonie — SYNAPZ",
    description:
      "Agence IA pour PME wallonnes. Audit gratuit. Résultats en 72h. Chèque maturité numérique compatible.",
    url: "https://synapz.be/automatisation-ia-wallonie",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "SYNAPZ — Automatisation IA Wallonie",
  description:
    "Agence d'automatisation IA pour PME en Wallonie. Audit gratuit, résultats en 72h, compatible chèque maturité numérique.",
  url: "https://synapz.be/automatisation-ia-wallonie",
  areaServed: [
    { "@type": "AdministrativeArea", name: "Wallonie" },
    { "@type": "City", name: "Liège" },
    { "@type": "City", name: "Namur" },
    { "@type": "City", name: "Charleroi" },
    { "@type": "City", name: "Mons" },
    { "@type": "City", name: "Tournai" },
  ],
  serviceType: [
    "Automatisation IA",
    "Audit IA",
    "Intelligence artificielle pour entreprises",
  ],
  provider: {
    "@type": "Organization",
    name: "SYNAPZ",
    url: "https://synapz.be",
  },
  knowsLanguage: ["fr", "en"],
};

export default function AutomatisationIAWallonie() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Navbar />
      <main className="pt-24">
        {/* Hero local */}
        <section className="py-20 px-6 bg-[#F5F7FF]">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[#7C3AED] font-semibold text-sm uppercase tracking-wider mb-4">
              Agence IA &middot; Wallonie
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F0F1A] mb-6 leading-tight font-[family-name:var(--font-jakarta)]">
              Automatisation IA pour les{" "}
              <span className="bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">
                PME wallonnes
              </span>
            </h1>
            <p className="text-[#64748B] text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Liège, Namur, Charleroi, Mons, Tournai — on automatise les
              tâches répétitives de votre PME en 72h. Compatible avec le
              chèque maturité numérique Wallonie.
            </p>
            <Link
              href="/#offre"
              className="inline-block bg-[#7C3AED] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#6D28D9] transition-colors shadow-lg shadow-[#7C3AED]/20"
            >
              Obtenir mon audit gratuit →
            </Link>
            <p className="text-[#94A3B8] text-sm mt-3">
              30 min · Gratuit · Sans engagement
            </p>
          </div>
        </section>

        {/* Pourquoi Wallonie */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-extrabold text-[#0F0F1A] mb-8 font-[family-name:var(--font-jakarta)]">
              Pourquoi les PME wallonnes nous font confiance
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#F5F7FF] rounded-2xl p-6">
                <h3 className="font-bold text-[#0F0F1A] mb-2">
                  On connaît la Wallonie
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  PME wallonnes, indépendants, secteur Horeca et industriel —
                  on comprend les réalités économiques de chaque province.
                </p>
              </div>
              <div className="bg-[#F5F7FF] rounded-2xl p-6">
                <h3 className="font-bold text-[#0F0F1A] mb-2">100% à distance</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  Pas besoin de se déplacer. Tout se fait en visio et en ligne.
                  Que vous soyez à Liège, Namur ou Arlon, on vous accompagne.
                </p>
              </div>
              <div className="bg-[#F5F7FF] rounded-2xl p-6">
                <h3 className="font-bold text-[#0F0F1A] mb-2">
                  Chèque maturité numérique
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  Le chèque maturité numérique de Digital Wallonia peut financer
                  jusqu&apos;à 75% de votre projet d&apos;automatisation IA.{" "}
                  <a
                    href="https://www.digitalwallonia.be/fr/publications/aides-transformation-numerique/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7C3AED] underline"
                  >
                    En savoir plus →
                  </a>
                </p>
              </div>
              <div className="bg-[#F5F7FF] rounded-2xl p-6">
                <h3 className="font-bold text-[#0F0F1A] mb-2">
                  Résultats garantis
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  Première automatisation livrée en 72h. Si vous ne gagnez pas
                  de temps, vous ne payez rien. C&apos;est notre engagement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Villes */}
        <section className="py-20 px-6 bg-[#F5F7FF]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-extrabold text-[#0F0F1A] mb-8 font-[family-name:var(--font-jakarta)]">
              On accompagne les PME dans toute la Wallonie
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Liège",
                "Namur",
                "Charleroi",
                "Mons",
                "Tournai",
                "La Louvière",
                "Verviers",
                "Arlon",
                "Wavre",
              ].map((city) => (
                <div
                  key={city}
                  className="bg-white rounded-xl px-4 py-3 text-[#0F0F1A] text-sm font-medium border border-[#E2E8F0]"
                >
                  Automatisation IA à {city}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-20 px-6 bg-[#0F0F1A]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white mb-4 font-[family-name:var(--font-jakarta)]">
              Prêt à automatiser votre PME en Wallonie ?
            </h2>
            <p className="text-[#94A3B8] mb-8">
              Audit gratuit en 30 minutes. Première automatisation en 72h.
              Compatible chèque maturité numérique.
            </p>
            <Link
              href="/#offre"
              className="inline-block bg-[#7C3AED] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#9D6FF0] transition-colors"
            >
              Réserver mon audit gratuit →
            </Link>
          </div>
        </section>

        {/* Articles liés */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-extrabold text-[#0F0F1A] mb-6 font-[family-name:var(--font-jakarta)]">
              Articles sur l&apos;IA en Belgique
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/blog/intelligence-artificielle-pour-entreprises-en-belgique"
                className="text-[#7C3AED] font-medium hover:underline"
              >
                IA pour entreprises en Belgique →
              </Link>
              <Link
                href="/blog/automatisation-ia-pour-pme-guide-complet"
                className="text-[#7C3AED] font-medium hover:underline"
              >
                Guide complet automatisation IA →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
