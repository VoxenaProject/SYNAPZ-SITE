import type { Metadata } from "next";
import { getAllPosts, getAllCategories } from "@/lib/blog";
import PostCard from "@/components/blog/PostCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — Automatisation IA pour PME",
  description:
    "Guides, conseils et actualités sur l'automatisation IA pour les PME en Belgique. Apprenez à gagner du temps et réduire vos coûts avec l'intelligence artificielle.",
  alternates: {
    canonical: "https://synapz.be/blog",
  },
};

const CATEGORY_LABELS: Record<string, string> = {
  "automatisation-ia": "Automatisation IA",
  "ia-belgique": "IA en Belgique",
  "audit-ia": "Audit IA",
  "secteur": "Par secteur",
  "agents-ia": "Agents IA",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string }>;
}) {
  const params = await searchParams;
  const activeCategory = params.categorie || "";
  const allPosts = getAllPosts();
  const categories = getAllCategories();

  const posts = activeCategory
    ? allPosts.filter((p) => p.category === activeCategory)
    : allPosts;

  const featuredPosts = allPosts.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Blog SYNAPZ — Automatisation IA pour PME",
            description:
              "Guides et conseils sur l'automatisation IA pour les PME en Belgique.",
            url: "https://synapz.be/blog",
            publisher: {
              "@type": "Organization",
              name: "SYNAPZ",
              url: "https://synapz.be",
            },
          }),
        }}
      />

      <main className="min-h-screen bg-[#060612]">
        {/* Header */}
        <section className="pt-32 pb-16 px-6 bg-[#0c0c20]">
          <div className="max-w-5xl mx-auto text-center">
            <Link
              href="/"
              className="text-[#64748b] text-sm hover:text-[#7C3AED] transition-colors mb-4 inline-block"
            >
              ← Retour au site
            </Link>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 font-[family-name:var(--font-jakarta)]">
              Blog{" "}
              <span className="bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">
                SYNAPZ
              </span>
            </h1>
            <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
              Guides, outils et stratégies pour automatiser votre PME avec
              l&apos;intelligence artificielle.
            </p>
          </div>
        </section>

        {/* Categories filter */}
        <section className="px-6 py-6 border-b border-white/[0.06]">
          <div className="max-w-5xl mx-auto flex flex-wrap gap-2 justify-center">
            <Link
              href="/blog"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !activeCategory
                  ? "bg-[#7C3AED] text-white"
                  : "bg-[#12122a] text-[#64748b] hover:text-white"
              }`}
            >
              Tous
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/blog?categorie=${cat}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-[#7C3AED] text-white"
                    : "bg-[#12122a] text-[#64748b] hover:text-white"
                }`}
              >
                {CATEGORY_LABELS[cat] || cat}
              </Link>
            ))}
          </div>
        </section>

        {/* Featured posts (only on main blog page) */}
        {!activeCategory && featuredPosts.length > 0 && (
          <section className="px-6 py-12">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-xs font-bold text-[#7C3AED] uppercase tracking-wider mb-6">
                Articles à la une
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {featuredPosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All posts */}
        <section className="px-6 py-12">
          <div className="max-w-5xl mx-auto">
            {!activeCategory && featuredPosts.length > 0 && (
              <h2 className="text-xs font-bold text-[#7C3AED] uppercase tracking-wider mb-6">
                Tous les articles
              </h2>
            )}

            {posts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-[#94a3b8] text-lg mb-4">
                  Aucun article pour le moment.
                </p>
                <p className="text-[#64748b] text-sm">
                  Nos premiers guides arrivent très bientôt !
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-16 bg-[#0c0c20]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-extrabold text-white mb-3 font-[family-name:var(--font-jakarta)]">
              Prêt à automatiser votre PME ?
            </h2>
            <p className="text-[#94a3b8] mb-6">
              On identifie vos pertes de temps en 30 minutes. Résultats en 1 semaine.
            </p>
            <Link
              href="/#offre"
              className="inline-block bg-[#7C3AED] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-[#6D28D9] transition-colors"
            >
              Obtenir mon audit gratuit →
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
