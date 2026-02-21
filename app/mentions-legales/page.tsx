import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales — SYNAPZ",
  description: "Mentions légales du site synapz.be — VVI CONSULTING, TVA BE1018193756.",
};

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-[#E2E8F0] py-6 px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-[#7C3AED] font-bold text-lg tracking-tight">
            SYNAPZ
          </Link>
          <Link
            href="/"
            className="text-[#64748B] text-sm hover:text-[#0F0F1A] transition-colors"
          >
            ← Retour au site
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-extrabold text-[#0F0F1A] mb-2">
          Mentions légales
        </h1>
        <p className="text-[#64748B] text-sm mb-12">
          Conformément aux articles VI.44 et suivants du Code de Droit Économique belge
        </p>

        <div className="space-y-10 text-[#374151] leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-[#0F0F1A] mb-4">
              1. Éditeur du site
            </h2>
            <ul className="space-y-1.5 text-sm">
              <li><span className="text-[#64748B] w-40 inline-block">Raison sociale :</span> <strong>VVI CONSULTING</strong></li>
              <li><span className="text-[#64748B] w-40 inline-block">Marque commerciale :</span> <strong>SYNAPZ</strong></li>
              <li><span className="text-[#64748B] w-40 inline-block">Numéro de TVA :</span> BE1018193756</li>
              <li><span className="text-[#64748B] w-40 inline-block">Siège social :</span> Avenue du Château 10, 1081 Koekelberg, Belgique</li>
              <li>
                <span className="text-[#64748B] w-40 inline-block">E-mail :</span>
                <a href="mailto:hello@synapz.be" className="text-[#7C3AED] hover:underline">
                  hello@synapz.be
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F0F1A] mb-4">
              2. Responsable de la publication
            </h2>
            <p>
              <strong>Dejvi Prifti</strong>, CEO & Co-fondateur de SYNAPZ (VVI CONSULTING)
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F0F1A] mb-4">
              3. Hébergeur
            </h2>
            <ul className="space-y-1 text-sm">
              <li><span className="text-[#64748B] w-40 inline-block">Société :</span> Vercel Inc.</li>
              <li><span className="text-[#64748B] w-40 inline-block">Adresse :</span> 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis</li>
              <li>
                <span className="text-[#64748B] w-40 inline-block">Site web :</span>
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7C3AED] hover:underline"
                >
                  vercel.com
                </a>
              </li>
            </ul>
            <p className="mt-3 text-sm text-[#64748B]">
              Le transfert de données vers les États-Unis est encadré par les Clauses
              Contractuelles Types (CCT) de la Commission européenne, conformément à
              l&apos;article 46 du RGPD.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F0F1A] mb-4">
              4. Propriété intellectuelle
            </h2>
            <p>
              L&apos;ensemble du contenu du site <strong>synapz.be</strong> (textes, visuels,
              logos, structure, code) est la propriété exclusive de{" "}
              <strong>VVI CONSULTING / SYNAPZ</strong> et est protégé par les lois belges
              et internationales relatives à la propriété intellectuelle.
            </p>
            <p className="mt-3">
              Toute reproduction, représentation, modification, publication ou transmission,
              totale ou partielle, du contenu de ce site par quelque procédé que ce soit,
              sans l&apos;autorisation expresse de SYNAPZ, est strictement interdite et
              constitue une violation du droit d&apos;auteur.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F0F1A] mb-4">
              5. Limitation de responsabilité
            </h2>
            <p>
              SYNAPZ s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des
              informations publiées sur ce site. Toutefois, SYNAPZ ne peut garantir
              l&apos;exhaustivité, l&apos;exactitude ou l&apos;actualité des informations diffusées et
              décline toute responsabilité pour toute inexactitude, imprécision ou omission.
            </p>
            <p className="mt-3">
              SYNAPZ ne saurait être tenu responsable des dommages directs ou indirects
              résultant de l&apos;accès au site ou de l&apos;utilisation des informations qui y sont
              publiées.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F0F1A] mb-4">
              6. Liens hypertextes
            </h2>
            <p>
              Le site peut contenir des liens vers des sites tiers. SYNAPZ n&apos;exerce
              aucun contrôle sur ces sites et décline toute responsabilité quant à leur
              contenu ou leur politique de confidentialité.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F0F1A] mb-4">
              7. Données personnelles & cookies
            </h2>
            <p>
              Le traitement des données personnelles collectées via ce site est détaillé
              dans notre{" "}
              <Link
                href="/politique-de-confidentialite"
                className="text-[#7C3AED] hover:underline font-semibold"
              >
                Politique de confidentialité
              </Link>
              , conformément au RGPD (Règlement UE 2016/679).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F0F1A] mb-4">
              8. Droit applicable
            </h2>
            <p>
              Le présent site et les présentes mentions légales sont soumis au{" "}
              <strong>droit belge</strong>. En cas de litige, et à défaut de résolution
              amiable, les tribunaux de l&apos;arrondissement de{" "}
              <strong>Bruxelles</strong> seront seuls compétents.
            </p>
          </section>

        </div>

        <div className="mt-16 pt-8 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#64748B]">
          <Link
            href="/politique-de-confidentialite"
            className="hover:text-[#0F0F1A] transition-colors"
          >
            Politique de confidentialité →
          </Link>
          <Link href="/" className="hover:text-[#0F0F1A] transition-colors">
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
