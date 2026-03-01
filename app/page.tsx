import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import ConversionLayer from "@/components/ui/ConversionLayer";

const LogoBar = dynamic(() => import("@/components/sections/LogoBar"));
const Problem = dynamic(() => import("@/components/sections/Problem"));
const ProductShowcase = dynamic(() => import("@/components/sections/ProductShowcase"));
const Process = dynamic(() => import("@/components/sections/Process"));
const SocialProofMetrics = dynamic(() => import("@/components/sections/SocialProofMetrics"));
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
    "Partenaire tech pour PME — On identifie, on livre, vous payez uniquement si satisfait. Sites web, CRM, automatisations, chatbots, SEO.",
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
  sameAs: ["https://www.linkedin.com/company/synapz"],
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
        text: "Votre première solution IA est en production en 1 semaine. Pas en 3 mois. 1 semaine. Et vous ne payez rien tant que vous n'avez pas vu les résultats.",
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

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SYNAPZ",
  url: "https://synapz.be",
  description:
    "Agence IA pour PME en Belgique. On identifie, on livre, vous payez uniquement si satisfait.",
  publisher: { "@type": "Organization", name: "SYNAPZ" },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: [
    "Automatisation IA",
    "Développement Web",
    "CRM",
    "Chatbot IA",
    "SEO",
  ],
  provider: {
    "@type": "Organization",
    name: "SYNAPZ",
    url: "https://synapz.be",
  },
  areaServed: {
    "@type": "Country",
    name: "Belgium",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
    description: "Audit IA gratuit de 30 minutes",
  },
  description:
    "SYNAPZ automatise les PME avec l'IA. Sites web, CRM, automatisations, chatbots, SEO. Premier projet livré en 1 semaine. Vous payez uniquement si satisfait.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <ConversionLayer>
        <Navbar />
        <main>
          <Hero />
          <LogoBar />
          <Problem />
          <ProductShowcase />
          <Process />
          <SocialProofMetrics />
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
