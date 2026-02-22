import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Automatisation IA à Bruxelles — Agence IA pour PME",
  description:
    "SYNAPZ, votre agence d'automatisation IA à Bruxelles. Audit gratuit en 30 min. Résultats en 72h. Prime digitalisation Bruxelles compatible. Satisfait ou 0€.",
  keywords: [
    "automatisation IA Bruxelles",
    "agence IA Bruxelles",
    "automatisation PME Bruxelles",
    "prime digitalisation Bruxelles",
    "intelligence artificielle Bruxelles",
  ],
  alternates: {
    canonical: "https://synapz.be/automatisation-ia-bruxelles",
  },
  openGraph: {
    title: "Automatisation IA à Bruxelles — SYNAPZ",
    description:
      "Agence IA pour PME bruxelloises. Audit gratuit. Résultats en 72h. Prime digitalisation compatible.",
    url: "https://synapz.be/automatisation-ia-bruxelles",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "SYNAPZ — Automatisation IA Bruxelles",
  description:
    "Agence d'automatisation IA pour PME à Bruxelles. Audit gratuit, résultats en 72h, compatible prime digitalisation.",
  url: "https://synapz.be/automatisation-ia-bruxelles",
  areaServed: {
    "@type": "City",
    name: "Bruxelles",
    containedInPlace: {
      "@type": "Country",
      name: "Belgium",
    },
  },
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
  knowsLanguage: ["fr", "nl", "en"],
};

export default function AutomatisationIABruxelles() {
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
              Agence IA &middot; Bruxelles
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F0F1A] mb-6 leading-tight font-[family-name:var(--font-jakarta)]">
              Automatisation IA pour les{" "}
              <span className="bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">
                PME bruxelloises
              </span>
            </h1>
            <p className="text-[#64748B] text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Votre PME à Bruxelles perd du temps sur des tâches répétitives ?
              On les automatise en 72h. Audit gratuit. Compatible avec la
              prime digitalisation Bruxelles.
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

        {/* Pourquoi Bruxelles */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-extrabold text-[#0F0F1A] mb-8 font-[family-name:var(--font-jakarta)]">
              Pourquoi les PME bruxelloises choisissent SYNAPZ
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#F5F7FF] rounded-2xl p-6">
                <h3 className="font-bold text-[#0F0F1A] mb-2">Basés à Bruxelles</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  On connaît le tissu économique bruxellois. PME, indépendants,
                  Horeca — on comprend vos contraintes et votre rythme.
                </p>
              </div>
              <div className="bg-[#F5F7FF] rounded-2xl p-6">
                <h3 className="font-bold text-[#0F0F1A] mb-2">Trilingue</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  Bruxelles est multilingue. Nos solutions IA fonctionnent en
                  français, néerlandais et anglais.
                </p>
              </div>
              <div className="bg-[#F5F7FF] rounded-2xl p-6">
                <h3 className="font-bold text-[#0F0F1A] mb-2">
                  Prime digitalisation compatible
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  Vous pouvez bénéficier de la prime digitalisation de la
                  Région de Bruxelles-Capitale pour financer votre projet
                  d&apos;automatisation IA.{" "}
                  <a
                    href="https://economie-emploi.brussels/prime-digitalisation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7C3AED] underline"
                  >
                    En savoir plus →
                  </a>
                </p>
              </div>
              <div className="bg-[#F5F7FF] rounded-2xl p-6">
                <h3 className="font-bold text-[#0F0F1A] mb-2">Résultats en 72h</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  Pas 3 mois de consulting. Votre première automatisation est
                  en production en 72 heures. Satisfait ou remboursé.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Secteurs */}
        <section className="py-20 px-6 bg-[#F5F7FF]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-extrabold text-[#0F0F1A] mb-8 font-[family-name:var(--font-jakarta)]">
              Secteurs qu&apos;on automatise à Bruxelles
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Cabinets comptables",
                "Agences immobilières",
                "Restaurants & Horeca",
                "Cabinets d'avocats",
                "E-commerce",
                "Agences marketing",
                "Cabinets médicaux",
                "Startups",
                "Associations",
              ].map((s) => (
                <div
                  key={s}
                  className="bg-white rounded-xl px-4 py-3 text-[#0F0F1A] text-sm font-medium border border-[#E2E8F0]"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-20 px-6 bg-[#0F0F1A]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white mb-4 font-[family-name:var(--font-jakarta)]">
              Prêt à automatiser votre PME à Bruxelles ?
            </h2>
            <p className="text-[#94A3B8] mb-8">
              Audit gratuit en 30 minutes. On identifie vos pertes de temps.
              Première automatisation livrée en 72h.
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
