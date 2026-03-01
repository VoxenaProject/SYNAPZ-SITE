import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import Analytics from "@/components/Analytics";

const CookieBanner = dynamic(() => import("@/components/ui/CookieBanner"));
const StickyMobileCTA = dynamic(() => import("@/components/ui/StickyMobileCTA"));
const WhatsAppWidget = dynamic(() => import("@/components/ui/WhatsAppWidget"));

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#060612",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://synapz.be"),
  title: {
    template: "%s | SYNAPZ",
    default: "SYNAPZ | Agence IA pour PME en Belgique",
  },
  description:
    "SYNAPZ automatise votre PME avec l'IA. On identifie, on livre, vous payez uniquement si satisfait. Résultats en 1 semaine.",
  keywords: [
    "SYNAPZ",
    "agence IA",
    "automatisation PME",
    "intelligence artificielle Belgique",
    "automatisation processus",
    "agence automatisation IA",
    "agence automatisation IA Belgique",
    "intégrer IA dans PME",
    "agence IA Bruxelles",
    "automatisation processus PME",
    "audit IA gratuit",
    "transformation digitale PME Belgique",
    "consultant IA PME",
    "automatisation tâches répétitives",
  ],
  authors: [{ name: "SYNAPZ" }],
  creator: "SYNAPZ",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "SYNAPZ | On automatise votre PME. Vous payez si ça marche.",
    description:
      "Audit IA gratuit (30 min) + premier projet livré en 1 semaine. Vous payez uniquement si satisfait.",
    url: "https://synapz.be",
    siteName: "SYNAPZ",
    locale: "fr_BE",
    type: "website",
    images: [
      {
        url: "https://synapz.be/opengraph-image",
        width: 1200,
        height: 630,
        alt: "SYNAPZ — Agence IA pour PME en Belgique",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SYNAPZ | Partenaire Tech pour PME — Résultats en 1 semaine",
    description:
      "SYNAPZ automatise votre PME avec l'IA. On livre gratuitement. Vous payez uniquement si satisfait.",
  },
  alternates: {
    canonical: "https://synapz.be",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr-BE">
      <head>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className={`${jakarta.variable} ${inter.variable} antialiased`}>
        {children}
        <StickyMobileCTA />
        <WhatsAppWidget />
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
