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

    // Build axes HTML block
    const axesHtml = axes ? [
      { label: "Volume de tâches automatisables", score: axes.volume.score, max: axes.volume.max },
      { label: "Impact financier", score: axes.financial.score, max: axes.financial.max },
      { label: "Maturité digitale", score: axes.readiness.score, max: axes.readiness.max },
    ].map((a, i, arr) => {
      const pct = Math.min(100, Math.round((a.score / a.max) * 100));
      return `
        <tr><td style="padding:0 0 ${i < arr.length - 1 ? "20" : "0"}px;">
          <table width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:14px; font-weight:600; color:#0F0F1A; padding-bottom:6px;">${a.label}</td>
            <td style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:14px; font-weight:700; color:#7C3AED; text-align:right; padding-bottom:6px;">${pct}%</td>
          </tr></table>
          <table width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="background:#EDE9FE; border-radius:5px; height:10px; line-height:10px;">
              <table width="${pct}%" cellpadding="0" cellspacing="0"><tr>
                <td style="background:#7C3AED; border-radius:5px; height:10px; line-height:10px; font-size:1px;">&nbsp;</td>
              </tr></table>
            </td>
          </tr></table>
        </td></tr>`;
    }).join("") : "";

    // Build priorities HTML
    const prioritiesHtml = priorities.map((p, i) => `
      <tr><td style="padding:14px 0; ${i < priorities.length - 1 ? "border-bottom:1px solid #F1F5F9;" : ""}">
        <span style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; color:#7C3AED; font-weight:700; font-size:15px;">${i + 1}.</span>
        <span style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; color:#0F0F1A; font-weight:600; font-size:15px;"> ${p.title}</span>
        <p style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; color:#64748B; font-size:13px; margin:4px 0 0;">Gain estimé : ${p.gain}</p>
      </td></tr>
    `).join("");

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
        headers: {
          "List-Unsubscribe": "<mailto:hello@synapz.be?subject=unsubscribe>",
        },
        html: `<!DOCTYPE html>
<html lang="fr" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="color-scheme" content="light only" />
  <meta name="supported-color-schemes" content="light only" />
  <title>Votre Diagnostic IA — SYNAPZ</title>
  <!--[if mso]><style>table,td{font-family:Helvetica,Arial,sans-serif!important;}</style><![endif]-->
  <style>
    :root { color-scheme: light only; }
    body, .body-bg { background-color: #F1F5F9 !important; }
    .email-card { background-color: #FFFFFF !important; }
    /* Outlook dark mode overrides */
    [data-ogsc] body, [data-ogsb] body { background-color: #F1F5F9 !important; }
    [data-ogsc] .email-card { background-color: #FFFFFF !important; }
    [data-ogsc] h1, [data-ogsc] h3 { color: #0F0F1A !important; }
    [data-ogsc] .score-card { background-color: #FAFAFF !important; }
    [data-ogsc] .footer-text { color: #94A3B8 !important; }
    [data-ogsc] .cta-btn { background-color: #7C3AED !important; color: #FFFFFF !important; }
    @media (prefers-color-scheme: dark) {
      body, .body-bg { background-color: #F1F5F9 !important; }
      .email-card { background-color: #FFFFFF !important; }
      h1, h3 { color: #0F0F1A !important; }
      .score-card { background-color: #FAFAFF !important; }
    }
  </style>
</head>
<body class="body-bg" style="margin:0; padding:0; background-color:#F1F5F9; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="body-bg" style="background-color:#F1F5F9;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" class="email-card" style="max-width:600px; width:100%; background:#FFFFFF; border-radius:16px; overflow:hidden; border:1px solid #E2E8F0;">

          <!-- Logo -->
          <tr><td style="padding:36px 32px 0; text-align:center;">
            <img src="https://synapz.be/logo/synapz-logo-dark.png" alt="SYNAPZ" width="130" height="28" style="display:block; margin:0 auto; border:0;" />
          </td></tr>

          <!-- Title -->
          <tr><td style="padding:28px 32px 0; text-align:center;">
            <h1 style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; color:#0F0F1A; font-size:26px; font-weight:700; margin:0 0 8px; line-height:1.3;">Votre Diagnostic IA</h1>
            <p style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; color:#64748B; font-size:15px; margin:0;">Résultats personnalisés pour ${firstName}</p>
          </td></tr>

          <!-- Score card -->
          <tr><td style="padding:28px 32px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="score-card" style="background:#FAFAFF; border:1px solid #EDE9FE; border-radius:14px;">
              <tr><td style="padding:32px 24px; text-align:center;">
                <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:56px; font-weight:800; color:${tierInfo.text}; line-height:1; margin-bottom:12px;">${score}<span style="font-size:28px; font-weight:600; color:#94A3B8;">/100</span></div>
                <div style="display:inline-block; background:${tierInfo.bg}; color:${tierInfo.text}; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:12px; font-weight:700; padding:8px 20px; border-radius:20px; text-transform:uppercase; letter-spacing:0.08em;">
                  ${tierInfo.label}
                </div>
              </td></tr>
            </table>
          </td></tr>

          ${axes ? `
          <!-- Axes breakdown -->
          <tr><td style="padding:28px 32px 0;">
            <h3 style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; color:#0F0F1A; font-size:17px; font-weight:700; margin:0 0 20px;">Détail de votre score</h3>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              ${axesHtml}
            </table>
          </td></tr>
          ` : ""}

          <!-- Divider -->
          <tr><td style="padding:28px 32px 0;">
            <div style="height:1px; background:#E2E8F0;"></div>
          </td></tr>

          <!-- Financial impact -->
          <tr><td style="padding:28px 32px 0;">
            <h3 style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; color:#0F0F1A; font-size:17px; font-weight:700; margin:0 0 16px;">Économies potentielles estimées</h3>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; padding:10px 0; color:#64748B; font-size:14px;">Heures récupérées/semaine</td>
                <td style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; padding:10px 0; text-align:right; font-weight:700; color:#7C3AED; font-size:20px;">${savedHoursWeek}h</td>
              </tr>
              <tr>
                <td style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; padding:10px 0; color:#64748B; font-size:14px; border-top:1px solid #F1F5F9;">Économies mensuelles</td>
                <td style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; padding:10px 0; text-align:right; font-weight:700; color:#7C3AED; font-size:20px; border-top:1px solid #F1F5F9;">${formatEuro(savedMoneyMonth)}</td>
              </tr>
              <tr>
                <td style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; padding:10px 0; color:#64748B; font-size:14px; border-top:1px solid #F1F5F9;">Économies annuelles</td>
                <td style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; padding:10px 0; text-align:right; font-weight:800; color:#7C3AED; font-size:24px; border-top:1px solid #F1F5F9;">${formatEuro(savedMoneyYear)}</td>
              </tr>
            </table>
          </td></tr>

          <!-- Divider -->
          <tr><td style="padding:28px 32px 0;">
            <div style="height:1px; background:#E2E8F0;"></div>
          </td></tr>

          <!-- Priorities -->
          <tr><td style="padding:28px 32px 0;">
            <h3 style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; color:#0F0F1A; font-size:17px; font-weight:700; margin:0 0 8px;">Vos 3 priorités d'automatisation</h3>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              ${prioritiesHtml}
            </table>
          </td></tr>

          <!-- Urgency block (strong/critical only) -->
          ${tier === "critical" ? `
          <tr><td style="padding:28px 32px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFF7ED; border:1px solid #FDBA74; border-radius:12px;">
              <tr><td style="padding:20px 24px;">
                <p style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; color:#9A3412; font-size:16px; font-weight:700; margin:0 0 8px;">Vous perdez ${formatEuro(savedMoneyMonth)} chaque mois</p>
                <p style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; color:#9A3412; opacity:0.7; font-size:14px; margin:0; line-height:1.5;">Votre score de ${score}/100 confirme un potentiel exceptionnel. Chaque semaine sans action = ${savedHoursWeek}h et ${formatEuro(Math.round(savedMoneyMonth / 4))} perdus.</p>
              </td></tr>
            </table>
          </td></tr>
          ` : tier === "strong" ? `
          <tr><td style="padding:28px 32px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F5F3FF; border:1px solid #DDD6FE; border-radius:12px;">
              <tr><td style="padding:20px 24px;">
                <p style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; color:#5B21B6; font-size:16px; font-weight:700; margin:0 0 8px;">${formatEuro(savedMoneyYear)}/an d'&eacute;conomies identifi&eacute;es</p>
                <p style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; color:#5B21B6; opacity:0.7; font-size:14px; margin:0; line-height:1.5;">Votre diagnostic r&eacute;v&egrave;le des opportunit&eacute;s concr&egrave;tes. 30 min suffisent pour les transformer en plan d'action.</p>
              </td></tr>
            </table>
          </td></tr>
          ` : ""}

          <!-- CTA -->
          <tr><td style="padding:${tier === "moderate" ? "36" : "24"}px 32px 0; text-align:center;">
            <p style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; color:#64748B; font-size:15px; margin:0 0 20px; line-height:1.5;">
              ${tier === "critical"
                ? "Nos experts transforment ces pertes en gains concrets."
                : tier === "strong"
                ? "Un audit de 30 min pour d&eacute;bloquer ces &eacute;conomies."
                : "Vous voulez savoir comment automatiser vos t&acirc;ches r&eacute;p&eacute;titives ?"}
            </p>
            <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
              <tr><td style="background:#7C3AED; border-radius:12px;">
                <a href="https://calendly.com/daniele-synapz/strategie-meeting" class="cta-btn" style="display:inline-block; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; color:#FFFFFF; font-weight:700; font-size:16px; text-decoration:none; padding:16px 36px; border-radius:12px;">
                  ${tier === "critical"
                    ? "Parler avec un expert SYNAPZ &rarr;"
                    : tier === "strong"
                    ? "R&eacute;server mon audit strat&eacute;gique &rarr;"
                    : "En discuter avec un expert &rarr;"}
                </a>
              </td></tr>
            </table>
            <p style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; color:#94A3B8; font-size:12px; margin:14px 0 0;">Gratuit &middot; Sans engagement &middot; ${tier === "critical" ? "Cr&eacute;neaux limit&eacute;s cette semaine" : "R&eacute;sultats en 1 semaine"}</p>
          </td></tr>

          <!-- Footer -->
          <tr><td style="padding:36px 32px 32px; text-align:center;">
            <div style="height:1px; background:#E2E8F0; margin-bottom:20px;"></div>
            <p class="footer-text" style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; color:#94A3B8; font-size:11px; line-height:1.6; margin:0;">
              SYNAPZ SRL — Impulsions IA pour PME<br/>
              TVA BE1018193756 &middot; Bruxelles, Belgique<br/>
              Cet email a été envoyé suite à votre Diagnostic IA sur <a href="https://synapz.be" style="color:#94A3B8;">synapz.be</a>
            </p>
          </td></tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
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
