import { NextRequest, NextResponse } from "next/server";
import { upsertWebsiteLead } from "@/lib/leads";

interface DiagnosticPayload {
  firstName: string;
  email: string;
  score: number;
  tier: string;
  sector: string;
  teamSize: string;
  hoursWasted: number;
  hourlyCost: number;
  topTasks: string[];
  savedHoursWeek: number;
  savedMoneyMonth: number;
  savedMoneyYear: number;
  priorities: { title: string; gain: string }[];
  axes?: {
    volume: { score: number; max: number };
    financial: { score: number; max: number };
    readiness: { score: number; max: number };
  };
}

export async function POST(req: NextRequest) {
  try {
    const body: DiagnosticPayload = await req.json();
    const { firstName, email, score, tier, sector, teamSize, hoursWasted, hourlyCost, topTasks, savedHoursWeek, savedMoneyMonth, savedMoneyYear, priorities, axes } = body;

    if (!email || !firstName) {
      return NextResponse.json({ error: "Prénom et email requis" }, { status: 400 });
    }

    const formatEuro = (n: number) =>
      new Intl.NumberFormat("fr-BE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

    const tierColors: Record<string, { bg: string; text: string; label: string }> = {
      moderate: { bg: "#E0F2FE", text: "#0891B2", label: "Potentiel modéré" },
      strong: { bg: "#EDE9FE", text: "#7C3AED", label: "Fort potentiel" },
      critical: { bg: "#FEF3C7", text: "#D97706", label: "Potentiel critique" },
    };

    const tierInfo = tierColors[tier] || tierColors.strong;

    // Upsert lead into CRM (runs in both dev and prod)
    await upsertWebsiteLead({
      source: "diagnostic_ia",
      email,
      contact_name: firstName,
      sector,
      size: teamSize,
      qualification_data: {
        score,
        tier,
        sector,
        team_size: teamSize,
        hours_wasted: hoursWasted,
        hourly_cost: hourlyCost,
        tasks: topTasks,
        saved_hours_week: savedHoursWeek,
        saved_money_month: savedMoneyMonth,
        saved_money_year: savedMoneyYear,
        priorities,
        axes,
      },
    });

    // Dev mode logging
    if (process.env.NODE_ENV === "development") {
      console.log("🧠 Nouveau diagnostic IA:", { firstName, email, score, tier, sector, teamSize, hoursWasted });
      return NextResponse.json({ success: true });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO_EMAIL = process.env.CONTACT_EMAIL || "hello@synapz.be";

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY manquant");
      return NextResponse.json({ success: true });
    }

    // Send report to lead
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "SYNAPZ <noreply@synapz.be>",
        to: [email],
        subject: `Votre Score IA : ${score}/100 — ${tierInfo.label} pour ${firstName}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #FAFBFF;">
            <div style="text-align: center; margin-bottom: 32px;">
              <h1 style="color: #0F0F1A; font-size: 24px; margin: 0 0 8px;">Votre Diagnostic IA</h1>
              <p style="color: #64748B; font-size: 14px; margin: 0;">Résultats personnalisés pour ${firstName}</p>
            </div>

            <div style="background: white; border: 1px solid #E2E8F0; border-radius: 16px; padding: 24px; margin-bottom: 16px; text-align: center;">
              <div style="font-size: 48px; font-weight: 800; color: ${tierInfo.text}; margin-bottom: 8px;">${score}/100</div>
              <div style="display: inline-block; background: ${tierInfo.bg}; color: ${tierInfo.text}; font-size: 12px; font-weight: 700; padding: 6px 16px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.05em;">
                ${tierInfo.label}
              </div>
            </div>

            ${axes ? `
            <div style="background: white; border: 1px solid #E2E8F0; border-radius: 16px; padding: 24px; margin-bottom: 16px;">
              <h3 style="color: #0F0F1A; font-size: 16px; margin: 0 0 16px;">Détail de votre score</h3>
              ${[
                { label: "Volume de tâches automatisables", score: axes.volume.score, max: axes.volume.max },
                { label: "Impact financier", score: axes.financial.score, max: axes.financial.max },
                { label: "Maturité digitale", score: axes.readiness.score, max: axes.readiness.max },
              ].map(a => {
                const pct = Math.min(100, Math.round((a.score / a.max) * 100));
                return `
                  <div style="margin-bottom: 12px;">
                    <div style="margin-bottom: 4px;">
                      <span style="color: #0F0F1A; font-size: 14px; font-weight: 600;">${a.label}</span>
                      <span style="color: #7C3AED; font-size: 14px; font-weight: 700; float: right;">${pct}%</span>
                    </div>
                    <div style="background: #E2E8F0; border-radius: 4px; height: 8px; width: 100%;">
                      <div style="background: #7C3AED; border-radius: 4px; height: 8px; width: ${pct}%;"></div>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
            ` : ""}

            <div style="background: white; border: 1px solid #E2E8F0; border-radius: 16px; padding: 24px; margin-bottom: 16px;">
              <h3 style="color: #0F0F1A; font-size: 16px; margin: 0 0 12px;">Économies potentielles estimées</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #64748B; font-size: 14px;">Heures récupérées/semaine</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #7C3AED; font-size: 18px;">${savedHoursWeek}h</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748B; font-size: 14px;">Économies mensuelles</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #7C3AED; font-size: 18px;">${formatEuro(savedMoneyMonth)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748B; font-size: 14px;">Économies annuelles</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #7C3AED; font-size: 22px;">${formatEuro(savedMoneyYear)}</td>
                </tr>
              </table>
            </div>

            <div style="background: white; border: 1px solid #E2E8F0; border-radius: 16px; padding: 24px; margin-bottom: 24px;">
              <h3 style="color: #0F0F1A; font-size: 16px; margin: 0 0 16px;">Vos 3 priorités d'automatisation</h3>
              ${priorities.map((p, i) => `
                <div style="padding: 12px 0; ${i < priorities.length - 1 ? "border-bottom: 1px solid #F1F5F9;" : ""}">
                  <strong style="color: #7C3AED;">${i + 1}.</strong>
                  <strong style="color: #0F0F1A;"> ${p.title}</strong>
                  <p style="color: #64748B; font-size: 13px; margin: 4px 0 0;">Gain estimé : ${p.gain}</p>
                </div>
              `).join("")}
            </div>

            <div style="text-align: center; padding: 24px 0;">
              <p style="color: #64748B; font-size: 14px; margin: 0 0 16px;">
                Vous voulez savoir exactement comment implémenter ces automatisations ?
              </p>
              <a href="https://calendly.com/daniele-synapz/strategie-meeting" style="display: inline-block; background: #7C3AED; color: white; font-weight: 600; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-size: 16px;">
                Réserver mon audit gratuit (30 min) &rarr;
              </a>
              <p style="color: #94A3B8; font-size: 12px; margin: 12px 0 0;">Gratuit &middot; Sans engagement &middot; Résultats en 72h</p>
            </div>

            <div style="border-top: 1px solid #E2E8F0; padding-top: 16px; margin-top: 16px; text-align: center;">
              <p style="color: #94A3B8; font-size: 11px; margin: 0;">SYNAPZ — Impulsions IA pour PME</p>
            </div>
          </div>
        `,
      }),
    });

    // Notify team
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "SYNAPZ Leads <noreply@synapz.be>",
        to: [TO_EMAIL],
        subject: `🧠 Nouveau diagnostic IA : ${firstName} — Score ${score}/100 — ${sector}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
            <h2 style="color: #7C3AED;">Nouveau Diagnostic IA</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #666;">Prénom</td><td style="font-weight: bold;">${firstName}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="font-weight: bold;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Score</td><td style="font-weight: bold; color: ${tierInfo.text};">${score}/100 — ${tierInfo.label}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Secteur</td><td style="font-weight: bold;">${sector}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Taille équipe</td><td style="font-weight: bold;">${teamSize}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Heures répétitives/sem</td><td style="font-weight: bold;">${hoursWasted}h</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Coût horaire</td><td style="font-weight: bold;">${hourlyCost}€/h</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Tâches chronophages</td><td style="font-weight: bold;">${topTasks.join(", ")}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Perte mensuelle</td><td style="font-weight: bold; color: #EF4444;">${formatEuro(savedMoneyMonth)}/mois</td></tr>
              ${axes ? `
              <tr><td style="padding: 8px 0; color: #666;">Axe Volume</td><td style="font-weight: bold;">${Math.min(100, Math.round((axes.volume.score / axes.volume.max) * 100))}%</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Axe Financier</td><td style="font-weight: bold;">${Math.min(100, Math.round((axes.financial.score / axes.financial.max) * 100))}%</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Axe Maturité</td><td style="font-weight: bold;">${Math.min(100, Math.round((axes.readiness.score / axes.readiness.max) * 100))}%</td></tr>
              ` : ""}
            </table>
          </div>
        `,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Diagnostic API error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
