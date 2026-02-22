import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import Analytics from "@/components/Analytics";

const CookieBanner = dynamic(() => import("@/components/ui/CookieBanner"));
const StickyMobileCTA = dynamic(() => import("@/components/ui/StickyMobileCTA"));
const WhatsAppWidget = dynamic(() => import("@/components/ui/WhatsAppWidget"));
const SocialProofToasts = dynamic(() => import("@/components/ui/SocialProofToasts"));

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
  themeColor: "#7C3AED",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://synapz.be"),
  title: {
    template: "%s | SYNAPZ",
    default: "SYNAPZ — Agence IA pour PME | Automatisation & Résultats Garantis",
  },
  description:
    "On automatise votre PME avec l'IA. Audit gratuit en 30 minutes. Résultats en 72h. Satisfait ou 0€ — c'est notre engagement.",
  keywords: [
    "agence IA",
    "automatisation PME",
    "intelligence artificielle Belgique",
    "automatisation processus",
    "agence automatisation IA",
    "SYNAPZ",
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
    title: "SYNAPZ — On automatise votre PME. Vous payez si ça marche.",
    description:
      "Audit IA gratuit (30 min) + premier projet livré en 72h. Garantie résultats ou 0€.",
    url: "https://synapz.be",
    siteName: "SYNAPZ",
    locale: "fr_BE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SYNAPZ — Agence IA pour PME | Résultats en 72h",
    description:
      "On automatise votre PME avec l'IA. Audit gratuit. Résultats en 72h. Satisfait ou 0€.",
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
    <html lang="fr">
      <head>
        <link rel="dns-prefetch" href="https://calendly.com" />
        <link rel="preconnect" href="https://calendly.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
      </head>
      <body className={`${jakarta.variable} ${inter.variable} antialiased`}>
        {children}
        <StickyMobileCTA />
        <WhatsAppWidget />
        <SocialProofToasts />
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
