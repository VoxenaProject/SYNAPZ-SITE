import { NextRequest, NextResponse } from "next/server";
import { upsertWebsiteLead } from "@/lib/leads";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, company, savedHours, savedMoneyPerMonth, savedMoneyPerYear, employees, hoursPerWeek, hourlyRate } = body;

    if (!email) {
      return NextResponse.json({ error: "Email requis" }, { status: 400 });
    }

    const topAutomations = getTopAutomations(employees, hoursPerWeek);

    // Upsert lead into CRM (runs in both dev and prod)
    await upsertWebsiteLead({
      source: "roi_calculator",
      email,
      company_name: company,
      qualification_data: {
        employees,
        hours_per_week: hoursPerWeek,
        hourly_rate: hourlyRate,
        saved_hours_month: savedHours,
        saved_money_month: savedMoneyPerMonth,
        saved_money_year: savedMoneyPerYear,
        company,
      },
    });

    // Log in dev mode
    if (process.env.NODE_ENV === "development") {
      console.log("📊 Nouveau lead ROI SYNAPZ:", { email, company, savedHours, savedMoneyPerMonth, savedMoneyPerYear });
      return NextResponse.json({ success: true, automations: topAutomations });
    }

    // Production: send via Resend
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO_EMAIL = process.env.CONTACT_EMAIL || "hello@synapz.be";

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY manquant");
      return NextResponse.json({ success: true, automations: topAutomations });
    }

    const formatEuro = (n: number) =>
      new Intl.NumberFormat("fr-BE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

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
        subject: `Votre rapport ROI personnalisé${company ? ` — ${company}` : ""}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #FAFBFF;">
            <div style="text-align: center; margin-bottom: 32px;">
              <h1 style="color: #0F0F1A; font-size: 24px; margin: 0 0 8px;">Votre Rapport ROI</h1>
              <p style="color: #64748B; font-size: 14px; margin: 0;">Personnalisé pour ${company || "votre entreprise"}</p>
            </div>

            <div style="background: white; border: 1px solid #E2E8F0; border-radius: 16px; padding: 24px; margin-bottom: 16px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #F1F5F9;">
                    <span style="color: #64748B; font-size: 14px;">Heures récupérées/mois</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #F1F5F9; text-align: right;">
                    <strong style="color: #7C3AED; font-size: 20px;">${savedHours}h</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #F1F5F9;">
                    <span style="color: #64748B; font-size: 14px;">Économies mensuelles</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #F1F5F9; text-align: right;">
                    <strong style="color: #7C3AED; font-size: 20px;">${formatEuro(savedMoneyPerMonth)}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <span style="color: #64748B; font-size: 14px;">Économies annuelles</span>
                  </td>
                  <td style="padding: 12px 0; text-align: right;">
                    <strong style="color: #7C3AED; font-size: 24px;">${formatEuro(savedMoneyPerYear)}</strong>
                  </td>
                </tr>
              </table>
            </div>

            <div style="background: white; border: 1px solid #E2E8F0; border-radius: 16px; padding: 24px; margin-bottom: 24px;">
              <h3 style="color: #0F0F1A; font-size: 16px; margin: 0 0 16px;">Les 3 automatisations prioritaires pour votre profil :</h3>
              ${topAutomations.map((a, i) => `
                <div style="padding: 12px 0; ${i < topAutomations.length - 1 ? "border-bottom: 1px solid #F1F5F9;" : ""}">
                  <strong style="color: #7C3AED;">${i + 1}.</strong>
                  <strong style="color: #0F0F1A;"> ${a.title}</strong>
                  <p style="color: #64748B; font-size: 13px; margin: 4px 0 0;">${a.desc}</p>
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
              <p style="color: #94A3B8; font-size: 12px; margin: 12px 0 0;">Gratuit &middot; Sans engagement &middot; Résultats en 1 semaine</p>
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
        subject: `🔥 Nouveau lead ROI: ${company || "Inconnu"} — perd ${formatEuro(savedMoneyPerMonth)}/mois`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
            <h2 style="color: #7C3AED;">Nouveau lead ROI Calculator</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="font-weight: bold;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Entreprise</td><td style="font-weight: bold;">${company || "Non renseigné"}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Employés</td><td style="font-weight: bold;">${employees}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Heures répétitives/sem</td><td style="font-weight: bold;">${hoursPerWeek}h</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Coût horaire</td><td style="font-weight: bold;">${hourlyRate}€/h</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Perte mensuelle</td><td style="font-weight: bold; color: #EF4444;">${formatEuro(savedMoneyPerMonth)}/mois</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Perte annuelle</td><td style="font-weight: bold; color: #EF4444;">${formatEuro(savedMoneyPerYear)}/an</td></tr>
            </table>
          </div>
        `,
      }),
    });

    return NextResponse.json({ success: true, automations: topAutomations });
  } catch (err) {
    console.error("ROI Report API error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

function getTopAutomations(employees: number, hoursPerWeek: number) {
  const all = [
    { title: "Traitement automatique des emails entrants", desc: "Tri, réponse, et routing automatiques — gain estimé : 3-5h/semaine", priority: hoursPerWeek >= 5 ? 10 : 5 },
    { title: "Facturation et relances automatisées", desc: "Génération, envoi et suivi des factures sans intervention — gain estimé : 2-4h/semaine", priority: employees >= 5 ? 9 : 6 },
    { title: "Génération automatique de rapports", desc: "Dashboards et rapports hebdomadaires créés automatiquement — gain estimé : 3-6h/semaine", priority: employees >= 10 ? 10 : 4 },
    { title: "Réponses automatiques aux questions fréquentes", desc: "Chatbot intelligent pour clients et prospects — gain estimé : 4-8h/semaine", priority: hoursPerWeek >= 8 ? 9 : 5 },
    { title: "Synchronisation des outils (CRM, comptabilité)", desc: "Zéro double saisie entre vos logiciels — gain estimé : 2-3h/semaine", priority: employees >= 8 ? 8 : 4 },
    { title: "Planification et gestion d'agenda automatisée", desc: "Prise de RDV et coordination d'équipe sans friction — gain estimé : 2-4h/semaine", priority: employees >= 3 ? 7 : 3 },
  ];

  return all.sort((a, b) => b.priority - a.priority).slice(0, 3);
}
