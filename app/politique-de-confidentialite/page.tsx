import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité — SYNAPZ",
  description: "Politique de confidentialité et traitement des données personnelles de SYNAPZ (VVI CONSULTING).",
};

export default function PolitiqueDeConfidentialite() {
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
          Politique de confidentialité
        </h1>
        <p className="text-[#64748B] text-sm mb-12">
          Dernière mise à jour : 21 février 2025
        </p>

        <div className="space-y-10 text-[#374151] leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-[#0F0F1A] mb-4">
              1. Qui sommes-nous ?
            </h2>
            <p>
              Le site <strong>synapz.be</strong> est édité par{" "}
              <strong>VVI CONSULTING</strong>, société dont la marque commerciale est{" "}
              <strong>SYNAPZ</strong>.
            </p>
            <ul className="mt-3 space-y-1 text-sm">
              <li><span className="text-[#64748B]">Raison sociale :</span> VVI CONSULTING</li>
              <li><span className="text-[#64748B]">Marque :</span> SYNAPZ</li>
              <li><span className="text-[#64748B]">Numéro de TVA :</span> BE1018193756</li>
              <li><span className="text-[#64748B]">Siège social :</span> Avenue du Château 10, 1081 Koekelberg, Belgique</li>
              <li>
                <span className="text-[#64748B]">Contact :</span>{" "}
                <a href="mailto:hello@synapz.be" className="text-[#7C3AED] hover:underline">
                  hello@synapz.be
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F0F1A] mb-4">
              2. Données collectées
            </h2>
            <p>
              Nous collectons uniquement les données que vous nous transmettez volontairement via notre formulaire de contact :
            </p>
            <ul className="mt-3 space-y-1 list-disc list-inside text-sm">
              <li>Prénom</li>
              <li>Adresse e-mail</li>
              <li>Nom de l&apos;entreprise (optionnel)</li>
              <li>Numéro de téléphone (optionnel, pour la prise de rendez-vous)</li>
              <li>Message libre (optionnel)</li>
            </ul>
            <p className="mt-3 text-sm text-[#64748B]">
              Nous ne collectons aucune donnée de navigation, cookie de tracking ou donnée
              sensible au sens de l&apos;article 9 du RGPD.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F0F1A] mb-4">
              3. Finalités du traitement
            </h2>
            <p>Vos données sont utilisées exclusivement pour :</p>
            <ul className="mt-3 space-y-1 list-disc list-inside text-sm">
              <li>Répondre à votre demande de contact ou d&apos;audit gratuit</li>
              <li>Planifier un appel de découverte</li>
              <li>Vous envoyer une confirmation de rendez-vous</li>
            </ul>
            <p className="mt-3 text-sm text-[#64748B]">
              Nous n&apos;utilisons pas vos données à des fins de marketing sans votre
              consentement explicite, et nous ne les revendons jamais à des tiers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F0F1A] mb-4">
              4. Base légale du traitement
            </h2>
            <p>
              Le traitement de vos données repose sur votre <strong>consentement</strong>{" "}
              (Art. 6(1)(a) du RGPD), exprimé par l&apos;envoi volontaire du formulaire de
              contact. Vous pouvez retirer ce consentement à tout moment en nous écrivant à{" "}
              <a href="mailto:hello@synapz.be" className="text-[#7C3AED] hover:underline">
                hello@synapz.be
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F0F1A] mb-4">
              5. Durée de conservation
            </h2>
            <p>
              Vos données sont conservées pendant <strong>3 ans</strong> à compter de votre
              dernier contact avec SYNAPZ, puis supprimées. Si une relation contractuelle est
              établie, les données sont conservées conformément aux obligations légales
              belges (10 ans pour les documents comptables).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F0F1A] mb-4">
              6. Destinataires des données
            </h2>
            <p>Vos données sont accessibles uniquement à :</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <strong>L&apos;équipe SYNAPZ</strong> (Dejvi Prifti et Daniele Rutigliano) — pour
                traiter votre demande
              </li>
              <li>
                <strong>Resend Inc.</strong> (service d&apos;envoi d&apos;e-mails, États-Unis) — sous-traitant
                technique. Transfert encadré par les Clauses Contractuelles Types (CCT) de la
                Commission européenne (Art. 46 RGPD).{" "}
                <a
                  href="https://resend.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7C3AED] hover:underline"
                >
                  Politique de confidentialité Resend →
                </a>
              </li>
            </ul>
            <p className="mt-3 text-sm text-[#64748B]">
              Aucune autre transmission à des tiers n&apos;est effectuée.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F0F1A] mb-4">
              7. Vos droits (RGPD)
            </h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD —
              Règlement UE 2016/679), vous disposez des droits suivants :
            </p>
            <ul className="mt-3 space-y-1 list-disc list-inside text-sm">
              <li><strong>Droit d&apos;accès</strong> — obtenir une copie de vos données</li>
              <li><strong>Droit de rectification</strong> — corriger des données inexactes</li>
              <li><strong>Droit à l&apos;effacement</strong> — demander la suppression de vos données</li>
              <li><strong>Droit à la portabilité</strong> — recevoir vos données dans un format structuré</li>
              <li><strong>Droit d&apos;opposition</strong> — vous opposer à un traitement</li>
              <li><strong>Droit de retrait du consentement</strong> — à tout moment, sans préjudice</li>
            </ul>
            <p className="mt-4">
              Pour exercer ces droits :{" "}
              <a href="mailto:hello@synapz.be" className="text-[#7C3AED] hover:underline font-semibold">
                hello@synapz.be
              </a>
              . Réponse dans un délai de 30 jours.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F0F1A] mb-4">
              8. Cookies
            </h2>
            <p>
              Le site <strong>synapz.be</strong> n&apos;utilise <strong>aucun cookie de tracking
              ou de publicité</strong>. Aucune donnée de navigation n&apos;est collectée à votre
              insu.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F0F1A] mb-4">
              9. Autorité de contrôle
            </h2>
            <p>
              Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire
              une plainte auprès de l&apos;
              <strong>Autorité de Protection des Données (APD)</strong> :
            </p>
            <ul className="mt-3 space-y-1 text-sm">
              <li>Rue de la Presse 35, 1000 Bruxelles</li>
              <li>
                <a
                  href="https://www.autoriteprotectiondonnees.be"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7C3AED] hover:underline"
                >
                  www.autoriteprotectiondonnees.be
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F0F1A] mb-4">
              10. Modifications
            </h2>
            <p>
              SYNAPZ se réserve le droit de modifier la présente politique à tout moment.
              La date de dernière mise à jour est indiquée en haut de la page.
            </p>
          </section>

        </div>

        <div className="mt-16 pt-8 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#64748B]">
          <Link href="/mentions-legales" className="hover:text-[#0F0F1A] transition-colors">
            Mentions légales →
          </Link>
          <Link href="/" className="hover:text-[#0F0F1A] transition-colors">
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
