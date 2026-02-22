import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "SYNAPZ — Agence IA pour PME";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0F0F1A 0%, #1a1a3e 50%, #0F0F1A 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#FFFFFF",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: 24,
          }}
        >
          On automatise votre PME.
        </div>
        <div
          style={{
            fontSize: 40,
            fontWeight: 800,
            background: "linear-gradient(135deg, #9D6FF0, #7C3AED, #06B6D4)",
            backgroundClip: "text",
            color: "transparent",
            textAlign: "center",
            lineHeight: 1.3,
            marginBottom: 40,
          }}
        >
          Vous payez si ca marche.
        </div>
        <div
          style={{
            display: "flex",
            gap: "32px",
            fontSize: 22,
            color: "#94A3B8",
          }}
        >
          <span>Audit gratuit</span>
          <span style={{ color: "#7C3AED" }}>|</span>
          <span>Resultats en 72h</span>
          <span style={{ color: "#7C3AED" }}>|</span>
          <span>Satisfait ou 0 EUR</span>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 60,
            fontSize: 28,
            fontWeight: 800,
            color: "#7C3AED",
          }}
        >
          SYNAPZ
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 60,
            fontSize: 20,
            color: "#64748B",
          }}
        >
          synapz.be
        </div>
      </div>
    ),
    { ...size }
  );
}
