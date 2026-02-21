import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/ui/CookieBanner";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "SYNAPZ — Agence IA pour PME | Automatisation & Résultats Garantis",
  description:
    "On automatise votre PME avec l'IA. Audit gratuit en 30 minutes. Résultats en 72h. Satisfait ou 0€ — c'est notre engagement.",
  keywords: [
    "agence IA",
    "automatisation PME",
    "intelligence artificielle Belgique",
    "automatisation processus",
    "SYNAPZ",
  ],
  openGraph: {
    title: "SYNAPZ — On automatise votre PME. Vous payez si ça marche.",
    description:
      "Audit IA gratuit (30 min) + premier projet livré en 72h. Garantie résultats ou 0€.",
    url: "https://synapz.be",
    siteName: "SYNAPZ",
    locale: "fr_BE",
    type: "website",
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
      <body className={`${jakarta.variable} ${inter.variable} antialiased`}>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
