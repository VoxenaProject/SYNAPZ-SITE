import "dotenv/config";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ARTICLE_PLANS } from "./keyword-planner";
import {
  isGSCConfigured,
  getTopQueries,
  getTopPages,
  getTargetKeywordRankings,
  getWeekOverWeekComparison,
  type SearchRow,
  type PageRow,
} from "./google-search-console";

const CONTENT_DIR = path.join(process.cwd(), "content/blog");
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO_EMAIL = "dejvi_prifti@hotmail.com";

const TARGET_KEYWORDS = [
  "agence IA Belgique",
  "agence IA Bruxelles",
  "automatisation IA PME",
  "intégrer IA dans entreprise",
  "audit IA gratuit",
  "automatisation processus PME",
  "consultant IA PME Belgique",
  "transformation digitale PME",
  "chatbot IA entreprise",
  "CRM automatisé PME",
  "automatisation tâches répétitives IA",
  "SYNAPZ",
  "agence automatisation IA",
  "automatisation IA Bruxelles",
  "automatisation IA Wallonie",
];

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

function positionBadge(pos: number): string {
  if (pos === 0) return `<span style="color:#94A3B8;">—</span>`;
  if (pos <= 3) return `<span style="color:#10B981;font-weight:700;">${pos.toFixed(1)}</span>`;
  if (pos <= 10) return `<span style="color:#06B6D4;font-weight:700;">${pos.toFixed(1)}</span>`;
  if (pos <= 20) return `<span style="color:#F59E0B;font-weight:600;">${pos.toFixed(1)}</span>`;
  return `<span style="color:#64748B;">${pos.toFixed(1)}</span>`;
}

function trendArrow(change: number): string {
  if (change > 0) return `<span style="color:#10B981;">+${change.toFixed(0)}%</span>`;
  if (change < 0) return `<span style="color:#EF4444;">${change.toFixed(0)}%</span>`;
  return `<span style="color:#94A3B8;">—</span>`;
}

async function generateHTML(): Promise<string> {
  const articles = getPublishedArticles();
  const recentArticles = getRecentArticles(articles, 7);
  const coverage = getClusterCoverage();
  const nextUp = getNextArticles(5);
  const totalPlanned = ARTICLE_PLANS.length;
  const totalPublished = articles.length;
  const overallPercent = Math.round((totalPublished / totalPlanned) * 100);
  const totalWords = articles.reduce((sum, a) => sum + a.wordCount, 0);

  const hasGSC = isGSCConfigured();
  let topQueries: SearchRow[] = [];
  let topPages: PageRow[] = [];
  let targetRankings: SearchRow[] = [];
  let wow = { thisWeek: { clicks: 0, impressions: 0 }, lastWeek: { clicks: 0, impressions: 0 } };

  if (hasGSC) {
    try {
      [topQueries, topPages, targetRankings, wow] = await Promise.all([
        getTopQueries(7, 15),
        getTopPages(7, 10),
        getTargetKeywordRankings(TARGET_KEYWORDS, 7),
        getWeekOverWeekComparison(),
      ]);
    } catch (err) {
      console.warn("⚠️  Erreur GSC (rapport généré sans données rankings) :", (err as Error).message);
    }
  }

  const clicksChange = wow.lastWeek.clicks > 0
    ? ((wow.thisWeek.clicks - wow.lastWeek.clicks) / wow.lastWeek.clicks) * 100
    : 0;
  const impressionsChange = wow.lastWeek.impressions > 0
    ? ((wow.thisWeek.impressions - wow.lastWeek.impressions) / wow.lastWeek.impressions) * 100
    : 0;

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
        <div style="font-size:32px;font-weight:800;color:#06B6D4;">${wow.thisWeek.clicks}</div>
        <div style="font-size:12px;color:#64748B;margin-top:4px;">Clics (7j) ${trendArrow(clicksChange)}</div>
      </div>
      <div style="flex:1;background:white;border-radius:12px;padding:20px;text-align:center;border:1px solid #E2E8F0;">
        <div style="font-size:32px;font-weight:800;color:#0F0F1A;">${wow.thisWeek.impressions}</div>
        <div style="font-size:12px;color:#64748B;margin-top:4px;">Impressions (7j) ${trendArrow(impressionsChange)}</div>
      </div>
    </div>

    <!-- Content stats -->
    <div style="display:flex;gap:12px;margin-bottom:24px;">
      <div style="flex:1;background:white;border-radius:12px;padding:16px 20px;border:1px solid #E2E8F0;">
        <span style="color:#64748B;font-size:13px;">Couverture : </span>
        <span style="color:#0F0F1A;font-weight:700;font-size:13px;">${overallPercent}%</span>
        <span style="color:#94A3B8;font-size:12px;"> (${totalPublished}/${totalPlanned})</span>
      </div>
      <div style="flex:1;background:white;border-radius:12px;padding:16px 20px;border:1px solid #E2E8F0;">
        <span style="color:#64748B;font-size:13px;">Total mots : </span>
        <span style="color:#0F0F1A;font-weight:700;font-size:13px;">${totalWords.toLocaleString("fr-BE")}</span>
      </div>
    </div>

    ${hasGSC && targetRankings.length > 0 ? `
    <!-- Section 1: Target Keywords Rankings -->
    <div style="background:white;border-radius:12px;padding:24px;margin-bottom:24px;border:1px solid #E2E8F0;">
      <h2 style="color:#0F0F1A;font-size:16px;margin:0 0 16px;">Mots-clés cibles — Positions Google</h2>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <thead>
          <tr style="text-align:left;border-bottom:2px solid #E2E8F0;">
            <th style="padding:8px 0;color:#64748B;font-weight:600;">Mot-clé</th>
            <th style="padding:8px 0;color:#64748B;font-weight:600;text-align:right;">Pos.</th>
            <th style="padding:8px 0;color:#64748B;font-weight:600;text-align:right;">Clics</th>
            <th style="padding:8px 0;color:#64748B;font-weight:600;text-align:right;">Impr.</th>
          </tr>
        </thead>
        <tbody>
          ${targetRankings.map((r) => `
            <tr style="border-bottom:1px solid #F1F5F9;">
              <td style="padding:8px 0;color:#0F0F1A;max-width:250px;overflow:hidden;text-overflow:ellipsis;">${r.query}</td>
              <td style="padding:8px 0;text-align:right;">${positionBadge(r.position)}</td>
              <td style="padding:8px 0;text-align:right;color:#0F0F1A;">${r.clicks}</td>
              <td style="padding:8px 0;text-align:right;color:#64748B;">${r.impressions}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
    ` : ""}

    ${hasGSC && topQueries.length > 0 ? `
    <!-- Section 2: Top Queries -->
    <div style="background:white;border-radius:12px;padding:24px;margin-bottom:24px;border:1px solid #E2E8F0;">
      <h2 style="color:#0F0F1A;font-size:16px;margin:0 0 16px;">Top requêtes Google (7 jours)</h2>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <thead>
          <tr style="text-align:left;border-bottom:2px solid #E2E8F0;">
            <th style="padding:8px 0;color:#64748B;font-weight:600;">Requête</th>
            <th style="padding:8px 0;color:#64748B;font-weight:600;text-align:right;">Pos.</th>
            <th style="padding:8px 0;color:#64748B;font-weight:600;text-align:right;">Clics</th>
            <th style="padding:8px 0;color:#64748B;font-weight:600;text-align:right;">CTR</th>
          </tr>
        </thead>
        <tbody>
          ${topQueries.map((q) => `
            <tr style="border-bottom:1px solid #F1F5F9;">
              <td style="padding:8px 0;color:#0F0F1A;max-width:250px;overflow:hidden;text-overflow:ellipsis;">${q.query}</td>
              <td style="padding:8px 0;text-align:right;">${positionBadge(q.position)}</td>
              <td style="padding:8px 0;text-align:right;color:#0F0F1A;">${q.clicks}</td>
              <td style="padding:8px 0;text-align:right;color:#64748B;">${(q.ctr * 100).toFixed(1)}%</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
    ` : ""}

    ${hasGSC && topPages.length > 0 ? `
    <!-- Section 3: Top Pages -->
    <div style="background:white;border-radius:12px;padding:24px;margin-bottom:24px;border:1px solid #E2E8F0;">
      <h2 style="color:#0F0F1A;font-size:16px;margin:0 0 16px;">Top pages par clics</h2>
      ${topPages.map((p) => `
        <div style="padding:10px 0;border-bottom:1px solid #F1F5F9;">
          <div style="font-size:13px;color:#7C3AED;font-weight:600;">${p.page || "/"}</div>
          <div style="font-size:12px;color:#64748B;margin-top:2px;">
            ${p.clicks} clics · ${p.impressions} impressions · CTR ${(p.ctr * 100).toFixed(1)}% · Pos. ${p.position.toFixed(1)}
          </div>
        </div>
      `).join("")}
    </div>
    ` : ""}

    ${!hasGSC ? `
    <!-- GSC Not Configured Banner -->
    <div style="background:#FEF3C7;border-radius:12px;padding:20px;margin-bottom:24px;border:1px solid #FDE68A;">
      <h3 style="color:#92400E;font-size:14px;margin:0 0 8px;">Google Search Console non configuré</h3>
      <p style="color:#A16207;font-size:13px;margin:0;">
        Pour voir vos positions Google, clics et impressions dans ce rapport, configurez un service account Google Cloud
        et ajoutez la variable GOOGLE_SERVICE_ACCOUNT_KEY dans vos secrets GitHub.
      </p>
    </div>
    ` : ""}

    <!-- Cluster Coverage -->
    <div style="background:white;border-radius:12px;padding:24px;margin-bottom:24px;border:1px solid #E2E8F0;">
      <h2 style="color:#0F0F1A;font-size:16px;margin:0 0 16px;">Couverture contenu par cluster</h2>
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

    <!-- Next Up -->
    ${
      nextUp.length > 0
        ? `
    <div style="background:white;border-radius:12px;padding:24px;margin-bottom:24px;border:1px solid #E2E8F0;">
      <h2 style="color:#0F0F1A;font-size:16px;margin:0 0 16px;">Prochains articles à publier</h2>
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
      <p style="color:#047857;font-size:14px;margin:0;">Les ${totalPlanned} articles planifiés ont été générés. Pensez à ajouter de nouveaux mots-clés au keyword planner.</p>
    </div>
    `
    }

    ${hasGSC && topQueries.length > 0 ? `
    <!-- Recommendations -->
    <div style="background:#F0F9FF;border-radius:12px;padding:24px;margin-bottom:24px;border:1px solid #BAE6FD;">
      <h2 style="color:#0C4A6E;font-size:16px;margin:0 0 12px;">Recommandations</h2>
      <ul style="margin:0;padding:0 0 0 20px;color:#0369A1;font-size:13px;line-height:1.8;">
        ${topQueries.filter((q) => q.position > 10 && q.position <= 20).length > 0
          ? `<li><strong>Mots-clés proches du top 10 :</strong> ${topQueries.filter((q) => q.position > 10 && q.position <= 20).map((q) => q.query).slice(0, 3).join(", ")} — optimisez ces pages pour gagner des positions.</li>`
          : ""}
        ${topQueries.filter((q) => q.impressions > 50 && q.ctr < 0.02).length > 0
          ? `<li><strong>CTR faible malgré des impressions :</strong> ${topQueries.filter((q) => q.impressions > 50 && q.ctr < 0.02).map((q) => q.query).slice(0, 3).join(", ")} — améliorez les titres et descriptions.</li>`
          : ""}
        ${totalPublished < totalPlanned
          ? `<li><strong>Contenu :</strong> ${totalPlanned - totalPublished} articles restants à publier. Priorité aux clusters avec le moins de couverture.</li>`
          : ""}
      </ul>
    </div>
    ` : ""}

    <!-- Footer -->
    <div style="text-align:center;padding-top:16px;border-top:1px solid #E2E8F0;">
      <p style="color:#94A3B8;font-size:12px;margin:0;">
        SYNAPZ SEO Agent · Rapport automatique · Chaque lundi à 8h ·
        <a href="https://synapz.be/blog" style="color:#7C3AED;">synapz.be/blog</a>
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

  // Console summary — Content
  console.log(`\n📝 Articles publiés : ${articles.length}/${ARTICLE_PLANS.length}`);
  console.log(`📅 Cette semaine : ${recentArticles.length} nouvel(s) article(s)`);
  console.log(`📏 Total mots : ${articles.reduce((s, a) => s + a.wordCount, 0).toLocaleString("fr-BE")}`);

  console.log("\n📊 Couverture par cluster :");
  for (const c of coverage) {
    const bar = "█".repeat(Math.round(c.percent / 5)) + "░".repeat(20 - Math.round(c.percent / 5));
    console.log(`  ${c.label.padEnd(35)} ${bar} ${c.published}/${c.planned} (${c.percent}%)`);
  }

  // Console summary — GSC Rankings
  if (isGSCConfigured()) {
    try {
      const topQueries = await getTopQueries(7, 10);
      const wow = await getWeekOverWeekComparison();

      console.log(`\n🔍 Google Search Console (7 derniers jours) :`);
      console.log(`  Clics : ${wow.thisWeek.clicks} | Impressions : ${wow.thisWeek.impressions}`);

      if (topQueries.length > 0) {
        console.log("\n🏆 Top requêtes :");
        for (const q of topQueries.slice(0, 10)) {
          console.log(`  Pos. ${q.position.toFixed(1).padStart(5)} | ${q.clicks.toString().padStart(3)} clics | ${q.query}`);
        }
      }
    } catch (err) {
      console.warn("⚠️  Erreur GSC :", (err as Error).message);
    }
  } else {
    console.log("\n⚠️  Google Search Console non configuré — ajoutez GOOGLE_SERVICE_ACCOUNT_KEY pour les données de ranking.");
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
  const html = await generateHTML();
  await sendReport(html);
}

main().catch((err) => {
  console.error("❌ Erreur :", err.message);
  process.exit(1);
});
