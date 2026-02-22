import "dotenv/config";
import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";
import { SYSTEM_PROMPT, ARTICLE_PROMPT } from "./prompts";
import { ARTICLE_PLANS, type ArticlePlan } from "./keyword-planner";

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

function getExistingArticles(cluster: string): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
    .filter((slug) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, `${slug}.mdx`), "utf-8");
      return raw.includes(`cluster: "${cluster}"`);
    });
}

function extractSlugFromMDX(content: string): string {
  const match = content.match(/slug:\s*"([^"]+)"/);
  return match ? match[1] : "article-" + Date.now();
}

async function generateArticle(plan: ArticlePlan, dryRun = false): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY manquante dans .env");
  }

  const client = new Anthropic({ apiKey });
  const existingArticles = getExistingArticles(plan.cluster);

  const prompt = ARTICLE_PROMPT({
    keyword: plan.keyword,
    type: plan.type,
    cluster: plan.cluster,
    category: plan.category,
    existingArticles,
  });

  console.log(`\n🔄 Génération en cours : "${plan.keyword}" (${plan.type})...`);

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 8000,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: prompt }],
  });

  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("Pas de réponse textuelle de Claude");
  }

  let mdxContent = textBlock.text;

  // Clean up markdown code fence if present
  if (mdxContent.startsWith("```mdx")) {
    mdxContent = mdxContent.replace(/^```mdx\n/, "").replace(/\n```$/, "");
  }
  if (mdxContent.startsWith("```")) {
    mdxContent = mdxContent.replace(/^```\n/, "").replace(/\n```$/, "");
  }

  const slug = extractSlugFromMDX(mdxContent);

  if (dryRun) {
    console.log(`\n📄 DRY RUN — Aperçu pour "${slug}" :`);
    console.log("─".repeat(60));
    console.log(mdxContent.slice(0, 500) + "\n...");
    console.log("─".repeat(60));
    console.log(`📏 ${mdxContent.length} caractères | ~${Math.round(mdxContent.split(/\s+/).length)} mots`);
    return slug;
  }

  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
  }

  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  fs.writeFileSync(filePath, mdxContent, "utf-8");
  console.log(`✅ Article sauvegardé : content/blog/${slug}.mdx`);
  console.log(`   📏 ${mdxContent.split(/\s+/).length} mots`);

  return slug;
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const keywordIdx = args.indexOf("--keyword");
  const typeIdx = args.indexOf("--type");
  const clusterIdx = args.indexOf("--cluster");
  const batchIdx = args.indexOf("--batch");
  const countIdx = args.indexOf("--count");
  const priorityIdx = args.indexOf("--priority");

  console.log("🧠 SYNAPZ SEO Agent — Générateur d'articles");
  console.log("═".repeat(50));

  if (keywordIdx !== -1) {
    // Single article mode
    const keyword = args[keywordIdx + 1];
    const type = (typeIdx !== -1 ? args[typeIdx + 1] : "cluster") as "pillar" | "cluster";
    const cluster = clusterIdx !== -1 ? args[clusterIdx + 1] : "automatisation-ia";
    const category = cluster;

    await generateArticle({ keyword, type, cluster, category, priority: 1 }, dryRun);
  } else if (batchIdx !== -1) {
    // Batch mode
    const count = countIdx !== -1 ? parseInt(args[countIdx + 1], 10) : 5;
    const maxPriority = priorityIdx !== -1 ? parseInt(args[priorityIdx + 1], 10) as 1 | 2 | 3 : 1;

    const existing = fs.existsSync(CONTENT_DIR)
      ? fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""))
      : [];

    // Filter out articles that already exist (by matching cluster + partial keyword)
    const pending = ARTICLE_PLANS.filter(
      (a) => a.priority <= maxPriority && !existing.some((e) => {
        const raw = fs.existsSync(path.join(CONTENT_DIR, `${e}.mdx`))
          ? fs.readFileSync(path.join(CONTENT_DIR, `${e}.mdx`), "utf-8")
          : "";
        return raw.includes(`cluster: "${a.cluster}"`) && raw.includes(a.keyword.slice(0, 30));
      })
    ).slice(0, count);

    console.log(`\n📦 Batch : ${pending.length} articles à générer (priorité ≤ ${maxPriority})`);

    for (let i = 0; i < pending.length; i++) {
      console.log(`\n[${i + 1}/${pending.length}]`);
      await generateArticle(pending[i], dryRun);

      // Rate limiting between articles
      if (i < pending.length - 1 && !dryRun) {
        console.log("⏳ Pause 5s (rate limit)...");
        await new Promise((r) => setTimeout(r, 5000));
      }
    }

    console.log(`\n🎉 Batch terminé ! ${pending.length} articles générés.`);
  } else {
    console.log(`
Usage :
  npx tsx scripts/seo-agent/generate-article.ts --keyword "mot-clé" [--type pillar|cluster] [--cluster nom] [--dry-run]
  npx tsx scripts/seo-agent/generate-article.ts --batch --count 5 [--priority 1|2|3] [--dry-run]

Options :
  --keyword     Mot-clé cible pour un article unique
  --type        pillar (2500-3500 mots) ou cluster (1500-2000 mots)
  --cluster     Nom du cluster (automatisation-ia, ia-belgique, audit-ia, secteur, agents-ia)
  --batch       Génère un batch d'articles depuis le keyword-planner
  --count       Nombre d'articles en mode batch (défaut: 5)
  --priority    Priorité max en mode batch (1=urgent, 2=important, 3=nice-to-have)
  --dry-run     Preview sans écrire les fichiers

Exemples :
  npx tsx scripts/seo-agent/generate-article.ts --keyword "automatisation IA PME" --type pillar --cluster automatisation-ia
  npx tsx scripts/seo-agent/generate-article.ts --batch --count 3 --priority 1
  npx tsx scripts/seo-agent/generate-article.ts --batch --count 5 --priority 1 --dry-run
    `);
  }
}

main().catch((err) => {
  console.error("❌ Erreur :", err.message);
  process.exit(1);
});
