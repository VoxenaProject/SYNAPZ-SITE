import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import ConversionLayer from "@/components/ui/ConversionLayer";

const Problem = dynamic(() => import("@/components/sections/Problem"));
const DiagnosticTeaser = dynamic(() => import("@/components/sections/DiagnosticTeaser"));
const UseCases = dynamic(() => import("@/components/sections/UseCases"));
const Offer = dynamic(() => import("@/components/sections/Offer"));
const ROICalculator = dynamic(() => import("@/components/sections/ROICalculator"));
const Team = dynamic(() => import("@/components/sections/Team"));
const FAQ = dynamic(() => import("@/components/sections/FAQ"));
const CTAFinal = dynamic(() => import("@/components/sections/CTAFinal"));

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SYNAPZ",
  url: "https://synapz.be",
  logo: "https://synapz.be/logo/synapz-logo-dark.svg",
  description:
    "Agence IA pour PME — On automatise vos processus répétitifs avec l'intelligence artificielle. Résultats en 72h, satisfait ou remboursé.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    availableLanguage: ["French"],
  },
  areaServed: {
    "@type": "Country",
    name: "Belgium",
  },
  foundingDate: "2025",
  founders: [
    { "@type": "Person", name: "Dejvi Prifti" },
    { "@type": "Person", name: "Daniele Rutigliano" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "C'est vraiment gratuit au départ ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Complètement. L'audit (500€ de valeur) et la première Impulsion IA (2.000€ de valeur) sont offerts. Vous ne payez que si vous décidez de continuer.",
      },
    },
    {
      "@type": "Question",
      name: "On a besoin d'une équipe technique en interne ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non. Zéro compétence technique requise de votre côté. Zéro code à écrire. On s'occupe de tout — de l'audit au déploiement.",
      },
    },
    {
      "@type": "Question",
      name: "Quels types de processus vous automatisez ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tout ce qui est répétitif et basé sur des règles : traitement d'emails, saisie de données, génération de rapports, réponses aux questions fréquentes, synchronisation d'outils, suivi de commandes, onboarding clients.",
      },
    },
    {
      "@type": "Question",
      name: "Combien de temps avant de voir des résultats ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Votre première Impulsion IA est en production en 72 heures. Pas en 3 mois. 72 heures.",
      },
    },
    {
      "@type": "Question",
      name: "On est une petite PME de 5 personnes, c'est pour nous ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "C'est exactement pour vous. SYNAPZ existe pour donner aux PME accès aux mêmes outils IA que les grandes boîtes, sans les coûts et sans la complexité.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ConversionLayer>
        <Navbar />
        <main>
          <Hero />
          <Problem />
          <DiagnosticTeaser />
          <UseCases />
          <Offer />
          <ROICalculator />
          <Team />
          <FAQ />
          <CTAFinal />
        </main>
        <Footer />
      </ConversionLayer>
    </>
  );
}
