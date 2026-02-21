import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Nom et email requis" },
        { status: 400 }
      );
    }

    // Log in dev mode
    if (process.env.NODE_ENV === "development") {
      console.log("📩 Nouveau contact SYNAPZ:", { name, email, company, message });
      return NextResponse.json({ success: true });
    }

    // Production: send via Resend
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO_EMAIL = process.env.CONTACT_EMAIL || "hello@synapz.be";

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY manquant");
      return NextResponse.json({ success: true }); // Silent fail in prod without key
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "SYNAPZ Contact <noreply@synapz.be>",
        to: [TO_EMAIL],
        subject: `Nouveau contact SYNAPZ — ${name}${company ? ` (${company})` : ""}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
            <h2 style="color: #7C3AED; margin-bottom: 24px;">Nouveau contact SYNAPZ</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 120px;">Prénom</td>
                <td style="padding: 8px 0; font-weight: bold;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Email</td>
                <td style="padding: 8px 0; font-weight: bold;">
                  <a href="mailto:${email}" style="color: #7C3AED;">${email}</a>
                </td>
              </tr>
              ${company ? `
              <tr>
                <td style="padding: 8px 0; color: #666;">Entreprise</td>
                <td style="padding: 8px 0; font-weight: bold;">${company}</td>
              </tr>` : ""}
              ${message ? `
              <tr>
                <td style="padding: 8px 0; color: #666; vertical-align: top;">Message</td>
                <td style="padding: 8px 0;">${message}</td>
              </tr>` : ""}
            </table>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      console.error("Resend error:", await res.text());
      return NextResponse.json({ error: "Erreur envoi email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
