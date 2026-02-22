import Link from "next/link";

const CATEGORY_LABELS: Record<string, string> = {
  "automatisation-ia": "Automatisation IA",
  "ia-belgique": "IA en Belgique",
  "audit-ia": "Audit IA",
  "secteur": "Par secteur",
  "agents-ia": "Agents IA",
};

interface BreadcrumbsProps {
  category: string;
  title: string;
}

export default function Breadcrumbs({ category, title }: BreadcrumbsProps) {
  return (
    <nav aria-label="Fil d'ariane" className="text-sm text-[#64748B] mb-6">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="hover:text-[#7C3AED] transition-colors">
            Accueil
          </Link>
        </li>
        <li aria-hidden="true" className="text-[#CBD5E1]">/</li>
        <li>
          <Link href="/blog" className="hover:text-[#7C3AED] transition-colors">
            Blog
          </Link>
        </li>
        {category && (
          <>
            <li aria-hidden="true" className="text-[#CBD5E1]">/</li>
            <li>
              <span className="text-[#94A3B8]">
                {CATEGORY_LABELS[category] || category}
              </span>
            </li>
          </>
        )}
        <li aria-hidden="true" className="text-[#CBD5E1]">/</li>
        <li>
          <span className="text-[#0F0F1A] font-medium truncate max-w-[200px] inline-block align-bottom">
            {title}
          </span>
        </li>
      </ol>
    </nav>
  );
}

export function BreadcrumbSchema({ category, title, slug }: BreadcrumbsProps & { slug: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://synapz.be",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://synapz.be/blog",
      },
      ...(category
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: CATEGORY_LABELS[category] || category,
              item: `https://synapz.be/blog?categorie=${category}`,
            },
            {
              "@type": "ListItem",
              position: 4,
              name: title,
              item: `https://synapz.be/blog/${slug}`,
            },
          ]
        : [
            {
              "@type": "ListItem",
              position: 3,
              name: title,
              item: `https://synapz.be/blog/${slug}`,
            },
          ]),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
