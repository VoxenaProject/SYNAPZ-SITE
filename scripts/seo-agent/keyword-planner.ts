export interface ArticlePlan {
  keyword: string;
  type: "pillar" | "cluster";
  cluster: string;
  category: string;
  priority: 1 | 2 | 3;
}

export const ARTICLE_PLANS: ArticlePlan[] = [
  // ==========================================
  // CLUSTER 1 — Automatisation IA pour PME
  // ==========================================
  {
    keyword: "automatisation IA pour PME guide complet",
    type: "pillar",
    cluster: "automatisation-ia",
    category: "automatisation-ia",
    priority: 1,
  },
  {
    keyword: "10 tâches à automatiser dans votre PME avec l'IA",
    type: "cluster",
    cluster: "automatisation-ia",
    category: "automatisation-ia",
    priority: 1,
  },
  {
    keyword: "combien coûte l'automatisation IA pour une PME",
    type: "cluster",
    cluster: "automatisation-ia",
    category: "automatisation-ia",
    priority: 1,
  },
  {
    keyword: "Make vs Zapier vs N8N quel outil d'automatisation choisir",
    type: "cluster",
    cluster: "automatisation-ia",
    category: "automatisation-ia",
    priority: 2,
  },
  {
    keyword: "automatisation IA sans code guide pour non-techniciens",
    type: "cluster",
    cluster: "automatisation-ia",
    category: "automatisation-ia",
    priority: 2,
  },
  {
    keyword: "ROI automatisation IA comment le calculer",
    type: "cluster",
    cluster: "automatisation-ia",
    category: "automatisation-ia",
    priority: 1,
  },
  {
    keyword: "automatisation emails et service client avec IA",
    type: "cluster",
    cluster: "automatisation-ia",
    category: "automatisation-ia",
    priority: 2,
  },
  {
    keyword: "5 signes que votre PME a besoin d'automatisation IA",
    type: "cluster",
    cluster: "automatisation-ia",
    category: "automatisation-ia",
    priority: 2,
  },
  {
    keyword: "comment automatiser la facturation avec l'IA",
    type: "cluster",
    cluster: "automatisation-ia",
    category: "automatisation-ia",
    priority: 3,
  },

  // ==========================================
  // CLUSTER 2 — IA pour Entreprises en Belgique
  // ==========================================
  {
    keyword: "intelligence artificielle pour entreprises en Belgique",
    type: "pillar",
    cluster: "ia-belgique",
    category: "ia-belgique",
    priority: 1,
  },
  {
    keyword: "prime digitalisation Bruxelles comment financer projet IA",
    type: "cluster",
    cluster: "ia-belgique",
    category: "ia-belgique",
    priority: 1,
  },
  {
    keyword: "chèque maturité numérique Wallonie guide complet",
    type: "cluster",
    cluster: "ia-belgique",
    category: "ia-belgique",
    priority: 1,
  },
  {
    keyword: "subsides IA Belgique toutes les aides disponibles 2026",
    type: "cluster",
    cluster: "ia-belgique",
    category: "ia-belgique",
    priority: 1,
  },
  {
    keyword: "IA dans les PME belges état des lieux et opportunités",
    type: "cluster",
    cluster: "ia-belgique",
    category: "ia-belgique",
    priority: 2,
  },
  {
    keyword: "AI Act Europe ce que ça change pour votre entreprise",
    type: "cluster",
    cluster: "ia-belgique",
    category: "ia-belgique",
    priority: 2,
  },
  {
    keyword: "RGPD et IA automatiser en restant conforme",
    type: "cluster",
    cluster: "ia-belgique",
    category: "ia-belgique",
    priority: 2,
  },

  // ==========================================
  // CLUSTER 3 — Audit IA
  // ==========================================
  {
    keyword: "audit IA pour entreprise guide complet",
    type: "pillar",
    cluster: "audit-ia",
    category: "audit-ia",
    priority: 1,
  },
  {
    keyword: "comment se passe un audit IA les 5 étapes",
    type: "cluster",
    cluster: "audit-ia",
    category: "audit-ia",
    priority: 1,
  },
  {
    keyword: "de l'audit à la première automatisation en 1 semaine",
    type: "cluster",
    cluster: "audit-ia",
    category: "audit-ia",
    priority: 1,
  },
  {
    keyword: "processus les plus rentables à automatiser en premier",
    type: "cluster",
    cluster: "audit-ia",
    category: "audit-ia",
    priority: 2,
  },
  {
    keyword: "comment préparer son entreprise à un audit IA",
    type: "cluster",
    cluster: "audit-ia",
    category: "audit-ia",
    priority: 2,
  },
  {
    keyword: "audit IA vs audit digital quelle différence",
    type: "cluster",
    cluster: "audit-ia",
    category: "audit-ia",
    priority: 3,
  },

  // ==========================================
  // CLUSTER 4 — Automatisation par Secteur
  // ==========================================
  {
    keyword: "automatisation IA par secteur guide pour PME",
    type: "pillar",
    cluster: "secteur",
    category: "secteur",
    priority: 1,
  },
  {
    keyword: "automatisation IA pour cabinets comptables",
    type: "cluster",
    cluster: "secteur",
    category: "secteur",
    priority: 1,
  },
  {
    keyword: "automatisation IA pour agences immobilières",
    type: "cluster",
    cluster: "secteur",
    category: "secteur",
    priority: 2,
  },
  {
    keyword: "automatisation IA pour restaurants et Horeca",
    type: "cluster",
    cluster: "secteur",
    category: "secteur",
    priority: 1,
  },
  {
    keyword: "automatisation IA pour cabinets d'avocats",
    type: "cluster",
    cluster: "secteur",
    category: "secteur",
    priority: 2,
  },
  {
    keyword: "automatisation IA pour e-commerce",
    type: "cluster",
    cluster: "secteur",
    category: "secteur",
    priority: 2,
  },
  {
    keyword: "automatisation IA pour le secteur médical",
    type: "cluster",
    cluster: "secteur",
    category: "secteur",
    priority: 3,
  },

  // ==========================================
  // CLUSTER 5 — Agents IA
  // ==========================================
  {
    keyword: "agents IA pour entreprise guide complet 2026",
    type: "pillar",
    cluster: "agents-ia",
    category: "agents-ia",
    priority: 1,
  },
  {
    keyword: "agent IA c'est quoi et comment ça marche",
    type: "cluster",
    cluster: "agents-ia",
    category: "agents-ia",
    priority: 1,
  },
  {
    keyword: "agents IA vs chatbots la vraie différence",
    type: "cluster",
    cluster: "agents-ia",
    category: "agents-ia",
    priority: 1,
  },
  {
    keyword: "7 cas d'usage concrets d'agents IA en entreprise",
    type: "cluster",
    cluster: "agents-ia",
    category: "agents-ia",
    priority: 2,
  },
  {
    keyword: "agent IA pour la prospection commerciale",
    type: "cluster",
    cluster: "agents-ia",
    category: "agents-ia",
    priority: 2,
  },
  {
    keyword: "agent IA pour le service client guide complet",
    type: "cluster",
    cluster: "agents-ia",
    category: "agents-ia",
    priority: 2,
  },
  {
    keyword: "multi-agents IA l'avenir de l'automatisation d'entreprise",
    type: "cluster",
    cluster: "agents-ia",
    category: "agents-ia",
    priority: 3,
  },
];

export function getArticlesByPriority(priority: 1 | 2 | 3): ArticlePlan[] {
  return ARTICLE_PLANS.filter((a) => a.priority <= priority);
}

export function getArticlesByCluster(cluster: string): ArticlePlan[] {
  return ARTICLE_PLANS.filter((a) => a.cluster === cluster);
}
