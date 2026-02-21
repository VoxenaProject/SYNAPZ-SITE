import { NextRequest, NextResponse } from "next/server";

const CONSULTANTS = {
  dejvi: {
    name: "Dejvi Prifti",
    role: "CEO & Automatisation IA",
    whatsapp: "https://wa.me/32483596627",
    email: "hello@synapz.be",
    meetLink: "https://meet.google.com/REMPLACER-DEJVI", // TODO: remplacer par votre vrai lien Meet
  },
  daniele: {
    name: "Daniele Rutigliano",
    role: "Stratégie IA & Conseil",
    whatsapp: "https://wa.me/32488448370",
    email: "daniele@synapz.com",
    meetLink: "https://meet.google.com/REMPLACER-DANIELE", // TODO: remplacer par votre vrai lien Meet
  },
} as const;

type ConsultantKey = keyof typeof CONSULTANTS;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { consultant, date, time, name, email, phone, company, message } = body;

    if (!consultant || !date || !time || !name || !email) {
      return NextResponse.json(
        { error: "Champs requis manquants" },
        { status: 400 }
      );
    }

    const consultantInfo = CONSULTANTS[consultant as ConsultantKey];
    if (!consultantInfo) {
      return NextResponse.json({ error: "Consultant invalide" }, { status: 400 });
    }

    // Format date for display
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString("fr-BE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Log in dev mode
    if (process.env.NODE_ENV === "development") {
      console.log("📅 Nouveau booking SYNAPZ:", {
        consultant: consultantInfo.name,
        date: formattedDate,
        time,
        name,
        email,
        phone,
        company,
        message,
      });
      return NextResponse.json({ success: true });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY manquant");
      return NextResponse.json({ success: true });
    }

    // Email 1: Notification to SYNAPZ team
    const teamEmailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #7C3AED20, #06B6D410); border: 1px solid #7C3AED30; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
          <h2 style="color: #7C3AED; margin: 0 0 4px 0;">📅 Nouveau booking SYNAPZ</h2>
          <p style="color: #64748B; margin: 0; font-size: 14px;">Demande de rendez-vous reçue</p>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr style="background: #F5F7FF;">
            <td style="padding: 10px 12px; color: #64748B; font-size: 13px; width: 140px; border-radius: 6px 0 0 6px;">Consultant demandé</td>
            <td style="padding: 10px 12px; font-weight: bold; color: #7C3AED;">${consultantInfo.name} — ${consultantInfo.role}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; color: #64748B; font-size: 13px;">Date souhaitée</td>
            <td style="padding: 10px 12px; font-weight: bold;">${formattedDate}</td>
          </tr>
          <tr style="background: #F5F7FF;">
            <td style="padding: 10px 12px; color: #64748B; font-size: 13px;">Heure</td>
            <td style="padding: 10px 12px; font-weight: bold;">${time}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; color: #64748B; font-size: 13px;">Prénom</td>
            <td style="padding: 10px 12px; font-weight: bold;">${name}</td>
          </tr>
          <tr style="background: #F5F7FF;">
            <td style="padding: 10px 12px; color: #64748B; font-size: 13px;">Email</td>
            <td style="padding: 10px 12px;"><a href="mailto:${email}" style="color: #7C3AED;">${email}</a></td>
          </tr>
          ${phone ? `<tr>
            <td style="padding: 10px 12px; color: #64748B; font-size: 13px;">Téléphone</td>
            <td style="padding: 10px 12px;">${phone}</td>
          </tr>` : ""}
          ${company ? `<tr style="background: #F5F7FF;">
            <td style="padding: 10px 12px; color: #64748B; font-size: 13px;">Entreprise</td>
            <td style="padding: 10px 12px;">${company}</td>
          </tr>` : ""}
          ${message ? `<tr>
            <td style="padding: 10px 12px; color: #64748B; font-size: 13px; vertical-align: top;">Message</td>
            <td style="padding: 10px 12px;">${message}</td>
          </tr>` : ""}
        </table>
        <div style="background: #0F0F1A; border-radius: 10px; padding: 16px; text-align: center;">
          <p style="color: #ffffff; margin: 0 0 12px 0; font-size: 14px;">Répondre rapidement via WhatsApp :</p>
          <a href="${consultantInfo.whatsapp}?text=Bonjour%20${encodeURIComponent(name)}%2C%20je%20vous%20contacte%20suite%20à%20votre%20demande%20de%20rendez-vous%20SYNAPZ%20pour%20le%20${encodeURIComponent(formattedDate)}%20à%20${encodeURIComponent(time)}."
            style="display: inline-block; background: #25D366; color: #ffffff; font-weight: bold; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-size: 14px;">
            💬 Répondre sur WhatsApp
          </a>
        </div>
      </div>
    `;

    // Email 2: Confirmation to client
    const clientEmailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #ffffff;">
        <div style="text-align: center; margin-bottom: 32px;">
          <div style="display: inline-block; background: #7C3AED15; border: 1px solid #7C3AED30; border-radius: 50%; width: 64px; height: 64px; line-height: 64px; font-size: 28px; margin-bottom: 16px;">✅</div>
          <h2 style="color: #0F0F1A; margin: 0 0 8px 0;">Demande reçue, ${name} !</h2>
          <p style="color: #64748B; margin: 0;">On vous confirme par email sous 1h.</p>
        </div>

        <div style="background: #F5F7FF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
          <h3 style="color: #0F0F1A; margin: 0 0 16px 0; font-size: 15px;">Récapitulatif de votre demande</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 6px 0; color: #64748B; font-size: 13px; width: 130px;">Votre consultant</td>
              <td style="padding: 6px 0; font-weight: bold; color: #7C3AED;">${consultantInfo.name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748B; font-size: 13px;">Date souhaitée</td>
              <td style="padding: 6px 0; font-weight: bold;">${formattedDate}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748B; font-size: 13px;">Heure</td>
              <td style="padding: 6px 0; font-weight: bold;">${time}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748B; font-size: 13px;">Durée</td>
              <td style="padding: 6px 0;">30 minutes (appel gratuit)</td>
            </tr>
          </table>
        </div>

        <div style="background: #7C3AED08; border: 2px solid #7C3AED30; border-radius: 12px; padding: 20px; margin-bottom: 20px; text-align: center;">
          <p style="color: #7C3AED; font-weight: bold; font-size: 15px; margin: 0 0 4px 0;">📹 Lien Google Meet</p>
          <p style="color: #64748B; font-size: 13px; margin: 0 0 14px 0;">Rejoignez l'appel à l'heure prévue via ce lien :</p>
          <a href="${consultantInfo.meetLink}"
            style="display: inline-block; background: #7C3AED; color: #ffffff; font-weight: bold; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-size: 14px; letter-spacing: 0.01em;">
            Rejoindre le call →
          </a>
          <p style="color: #94A3B8; font-size: 11px; margin: 12px 0 0 0;">Ou copiez ce lien : <span style="color: #7C3AED;">${consultantInfo.meetLink}</span></p>
        </div>

        <p style="color: #64748B; font-size: 13px; line-height: 1.6; margin-bottom: 20px;">
          ${consultantInfo.name} vous contactera si le créneau doit être ajusté.
          En cas de doute, écrivez directement sur WhatsApp.
        </p>

        <div style="border: 1px solid #25D36630; border-radius: 10px; padding: 16px; margin-bottom: 24px;">
          <p style="color: #0F0F1A; margin: 0 0 8px 0; font-size: 14px; font-weight: bold;">
            💬 Besoin de joindre ${consultantInfo.name} directement ?
          </p>
          <a href="${consultantInfo.whatsapp}"
            style="color: #25D366; text-decoration: none; font-size: 14px;">
            Écrire sur WhatsApp →
          </a>
        </div>

        <p style="color: #94A3B8; font-size: 12px; text-align: center; margin: 0;">
          SYNAPZ · VVI CONSULTING · TVA BE1018193756<br/>
          Avenue du Château 10, 1081 Koekelberg · hello@synapz.be
        </p>
      </div>
    `;

    // Send both emails in parallel
    const [teamRes, clientRes] = await Promise.all([
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "SYNAPZ Booking <noreply@synapz.be>",
          to: [consultantInfo.email],
          subject: `📅 Nouveau booking — ${name} → ${consultantInfo.name} · ${formattedDate} à ${time}`,
          html: teamEmailHtml,
        }),
      }),
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "SYNAPZ <noreply@synapz.be>",
          to: [email],
          subject: `✅ Votre call SYNAPZ est demandé — ${formattedDate} à ${time}`,
          html: clientEmailHtml,
        }),
      }),
    ]);

    if (!teamRes.ok || !clientRes.ok) {
      console.error("Resend error:", await teamRes.text(), await clientRes.text());
      return NextResponse.json({ error: "Erreur envoi email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Booking API error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
