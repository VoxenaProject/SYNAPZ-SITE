import "dotenv/config";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ARTICLE_PLANS } from "./keyword-planner";

const CONTENT_DIR = path.join(process.cwd(), "content/blog");
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO_EMAIL = "hello@synapz.be";

interface ArticleInfo {
  slug: string;
  title: string;
  date: string;
  cluster: string;
  category: string;
  pillar: boolean;
  readTime: number;
  wordCount: number;
}

const CLUSTER_LABELS: Record<string, string> = {
  "automatisation-ia": "Automatisation IA pour PME",
  "ia-belgique": "IA pour Entreprises en Belgique",
  "audit-ia": "Audit IA",
  "secteur": "Automatisation par Secteur",
  "agents-ia": "Agents IA",
};

function getPublishedArticles(): ArticleInfo[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, f), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug: f.replace(/\.mdx$/, ""),
        title: data.title || f,
        date: data.date || "unknown",
        cluster: data.cluster || "unknown",
        category: data.category || "unknown",
        pillar: data.pillar || false,
        readTime: data.readTime || 0,
        wordCount: content.split(/\s+/).length,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function getRecentArticles(articles: ArticleInfo[], days: number): ArticleInfo[] {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return articles.filter((a) => new Date(a.date) >= cutoff);
}

function getClusterCoverage() {
  const articles = getPublishedArticles();
  const clusters = [...new Set(ARTICLE_PLANS.map((a) => a.cluster))];

  return clusters.map((cluster) => {
    const planned = ARTICLE_PLANS.filter((a) => a.cluster === cluster);
    const published = articles.filter((a) => a.cluster === cluster);
    const percent = Math.round((published.length / planned.length) * 100);

    return {
      cluster,
      label: CLUSTER_LABELS[cluster] || cluster,
      planned: planned.length,
      published: published.length,
      percent,
      hasPillar: published.some((a) => a.pillar),
    };
  });
}

function getNextArticles(count: number) {
  const articles = getPublishedArticles();
  const existingSlugs = articles.map((a) => a.slug);

  return ARTICLE_PLANS.filter((plan) => {
    const raw = fs.existsSync(CONTENT_DIR)
      ? fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"))
      : [];

    return !raw.some((f) => {
      const content = fs.readFileSync(path.join(CONTENT_DIR, f), "utf-8");
      return (
        content.includes(`cluster: "${plan.cluster}"`) &&
        content.includes(plan.keyword.slice(0, 30))
      );
    });
  })
    .sort((a, b) => a.priority - b.priority)
    .slice(0, count);
}

function generateHTML(): string {
  const articles = getPublishedArticles();
  const recentArticles = getRecentArticles(articles, 7);
  const coverage = getClusterCoverage();
  const nextUp = getNextArticles(5);
  const totalPlanned = ARTICLE_PLANS.length;
  const totalPublished = articles.length;
  const overallPercent = Math.round((totalPublished / totalPlanned) * 100);
  const totalWords = articles.reduce((sum, a) => sum + a.wordCount, 0);

  const today = new Date();
  const dateStr = today.toLocaleDateString("fr-BE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#F5F7FF;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:640px;margin:0 auto;padding:32px 24px;">

    <!-- Header -->
    <div style="text-align:center;margin-bottom:32px;">
      <h1 style="color:#7C3AED;font-size:24px;margin:0 0 8px;">Rapport SEO SYNAPZ</h1>
      <p style="color:#64748B;font-size:14px;margin:0;">${dateStr}</p>
    </div>

    <!-- KPI Cards -->
    <div style="display:flex;gap:12px;margin-bottom:24px;">
      <div style="flex:1;background:white;border-radius:12px;padding:20px;text-align:center;border:1px solid #E2E8F0;">
        <div style="font-size:32px;font-weight:800;color:#7C3AED;">${totalPublished}</div>
        <div style="font-size:12px;color:#64748B;margin-top:4px;">Articles publiés</div>
      </div>
      <div style="flex:1;background:white;border-radius:12px;padding:20px;text-align:center;border:1px solid #E2E8F0;">
        <div style="font-size:32px;font-weight:800;color:#06B6D4;">${recentArticles.length}</div>
        <div style="font-size:12px;color:#64748B;margin-top:4px;">Cette semaine</div>
      </div>
      <div style="flex:1;background:white;border-radius:12px;padding:20px;text-align:center;border:1px solid #E2E8F0;">
        <div style="font-size:32px;font-weight:800;color:#0F0F1A;">${overallPercent}%</div>
        <div style="font-size:12px;color:#64748B;margin-top:4px;">Couverture</div>
      </div>
    </div>

    <!-- Total words -->
    <div style="background:white;border-radius:12px;padding:16px 20px;margin-bottom:24px;border:1px solid #E2E8F0;">
      <span style="color:#64748B;font-size:13px;">Total mots publiés : </span>
      <span style="color:#0F0F1A;font-weight:700;font-size:13px;">${totalWords.toLocaleString("fr-BE")}</span>
    </div>

    <!-- Cluster Coverage -->
    <div style="background:white;border-radius:12px;padding:24px;margin-bottom:24px;border:1px solid #E2E8F0;">
      <h2 style="color:#0F0F1A;font-size:16px;margin:0 0 16px;">Couverture par cluster</h2>
      ${coverage
        .map(
          (c) => `
        <div style="margin-bottom:16px;">
          <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
            <span style="font-size:13px;color:#0F0F1A;font-weight:600;">${c.label} ${c.hasPillar ? "★" : ""}</span>
            <span style="font-size:13px;color:#64748B;">${c.published}/${c.planned}</span>
          </div>
          <div style="background:#E2E8F0;border-radius:8px;height:8px;overflow:hidden;">
            <div style="background:linear-gradient(90deg,#7C3AED,#06B6D4);height:100%;width:${c.percent}%;border-radius:8px;"></div>
          </div>
        </div>
      `
        )
        .join("")}
    </div>

    <!-- Recent Articles -->
    ${
      recentArticles.length > 0
        ? `
    <div style="background:white;border-radius:12px;padding:24px;margin-bottom:24px;border:1px solid #E2E8F0;">
      <h2 style="color:#0F0F1A;font-size:16px;margin:0 0 16px;">Articles de la semaine</h2>
      ${recentArticles
        .map(
          (a) => `
        <div style="padding:12px 0;border-bottom:1px solid #F1F5F9;">
          <div style="font-size:14px;color:#0F0F1A;font-weight:600;">${a.pillar ? "★ " : ""}${a.title}</div>
          <div style="font-size:12px;color:#64748B;margin-top:4px;">
            ${CLUSTER_LABELS[a.cluster] || a.cluster} · ${a.wordCount.toLocaleString("fr-BE")} mots · ${a.readTime} min
          </div>
        </div>
      `
        )
        .join("")}
    </div>
    `
        : ""
    }

    <!-- All Articles -->
    <div style="background:white;border-radius:12px;padding:24px;margin-bottom:24px;border:1px solid #E2E8F0;">
      <h2 style="color:#0F0F1A;font-size:16px;margin:0 0 16px;">Tous les articles (${totalPublished})</h2>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <thead>
          <tr style="text-align:left;border-bottom:2px solid #E2E8F0;">
            <th style="padding:8px 0;color:#64748B;font-weight:600;">Article</th>
            <th style="padding:8px 0;color:#64748B;font-weight:600;">Cluster</th>
            <th style="padding:8px 0;color:#64748B;font-weight:600;">Date</th>
          </tr>
        </thead>
        <tbody>
          ${articles
            .map(
              (a) => `
            <tr style="border-bottom:1px solid #F1F5F9;">
              <td style="padding:8px 0;color:#0F0F1A;">${a.pillar ? "★ " : ""}${a.title}</td>
              <td style="padding:8px 0;color:#64748B;">${CLUSTER_LABELS[a.cluster] || a.cluster}</td>
              <td style="padding:8px 0;color:#64748B;">${new Date(a.date).toLocaleDateString("fr-BE")}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    </div>

    <!-- Next Up -->
    ${
      nextUp.length > 0
        ? `
    <div style="background:white;border-radius:12px;padding:24px;margin-bottom:24px;border:1px solid #E2E8F0;">
      <h2 style="color:#0F0F1A;font-size:16px;margin:0 0 16px;">Prochains articles</h2>
      ${nextUp
        .map(
          (a, i) => `
        <div style="padding:10px 0;border-bottom:1px solid #F1F5F9;">
          <span style="color:#7C3AED;font-weight:700;font-size:13px;">#${i + 1}</span>
          <span style="color:#0F0F1A;font-size:13px;margin-left:8px;">${a.keyword}</span>
          <span style="color:#94A3B8;font-size:12px;margin-left:8px;">(${a.type} · P${a.priority})</span>
        </div>
      `
        )
        .join("")}
    </div>
    `
        : `
    <div style="background:#ECFDF5;border-radius:12px;padding:24px;margin-bottom:24px;border:1px solid #A7F3D0;">
      <h2 style="color:#065F46;font-size:16px;margin:0 0 8px;">Tous les articles sont publiés !</h2>
      <p style="color:#047857;font-size:14px;margin:0;">Les 38 articles planifiés ont été générés. Pensez à ajouter de nouveaux mots-clés au keyword planner.</p>
    </div>
    `
    }

    <!-- Footer -->
    <div style="text-align:center;padding-top:16px;border-top:1px solid #E2E8F0;">
      <p style="color:#94A3B8;font-size:12px;margin:0;">
        SYNAPZ SEO Agent · Rapport automatique ·
        <a href="https://synapz.be/blog" style="color:#7C3AED;">synapz.be/blog</a>
      </p>
      <p style="color:#CBD5E1;font-size:11px;margin:8px 0 0;">
        Configurez Google Search Console pour ajouter les données de ranking dans les prochains rapports.
      </p>
    </div>

  </div>
</body>
</html>`;
}

async function sendReport(html: string): Promise<void> {
  if (!RESEND_API_KEY) {
    console.log("⚠️  RESEND_API_KEY manquante — rapport affiché en console uniquement.");
    console.log("─".repeat(60));
    console.log("Pour envoyer par email, ajoutez RESEND_API_KEY dans .env ou GitHub Secrets.");
    return;
  }

  const today = new Date();
  const weekStr = today.toLocaleDateString("fr-BE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "SYNAPZ SEO Agent <onboarding@resend.dev>",
      to: [TO_EMAIL],
      subject: `Rapport SEO SYNAPZ — Semaine du ${weekStr}`,
      html,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.warn("⚠️  Email non envoyé :", errorText);
    console.warn("💡 Pour envoyer des emails, vérifiez votre domaine sur https://resend.com/domains");
    console.log("📋 Le rapport console ci-dessus reste valide.");
    return;
  }

  console.log(`✅ Rapport envoyé à ${TO_EMAIL}`);
}

async function main() {
  console.log("📊 SYNAPZ SEO Agent — Rapport hebdomadaire");
  console.log("═".repeat(50));

  const articles = getPublishedArticles();
  const coverage = getClusterCoverage();
  const recentArticles = getRecentArticles(articles, 7);
  const nextUp = getNextArticles(5);

  // Console summary
  console.log(`\n📝 Articles publiés : ${articles.length}/${ARTICLE_PLANS.length}`);
  console.log(`📅 Cette semaine : ${recentArticles.length} nouvel(s) article(s)`);
  console.log(`📏 Total mots : ${articles.reduce((s, a) => s + a.wordCount, 0).toLocaleString("fr-BE")}`);

  console.log("\n📊 Couverture par cluster :");
  for (const c of coverage) {
    const bar = "█".repeat(Math.round(c.percent / 5)) + "░".repeat(20 - Math.round(c.percent / 5));
    console.log(`  ${c.label.padEnd(35)} ${bar} ${c.published}/${c.planned} (${c.percent}%)`);
  }

  if (nextUp.length > 0) {
    console.log("\n⏭️  Prochains articles :");
    for (const [i, a] of nextUp.entries()) {
      console.log(`  #${i + 1} ${a.keyword} (${a.type}, P${a.priority})`);
    }
  } else {
    console.log("\n🎉 Tous les articles planifiés sont publiés !");
  }

  // Generate and send HTML report
  const html = generateHTML();
  await sendReport(html);
}

main().catch((err) => {
  console.error("❌ Erreur :", err.message);
  process.exit(1);
});
