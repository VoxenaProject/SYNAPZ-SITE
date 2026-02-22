import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";

const CATEGORY_LABELS: Record<string, string> = {
  "automatisation-ia": "Automatisation IA",
  "ia-belgique": "IA en Belgique",
  "audit-ia": "Audit IA",
  "secteur": "Par secteur",
  "agents-ia": "Agents IA",
};

export default function PostCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-2xl border border-[#E2E8F0] hover:border-[#7C3AED]/30 hover:shadow-lg hover:shadow-[#7C3AED]/5 transition-all duration-300 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-semibold text-[#7C3AED] bg-[#7C3AED]/10 px-2.5 py-1 rounded-full">
            {CATEGORY_LABELS[post.category] || post.category}
          </span>
          {post.pillar && (
            <span className="text-xs font-semibold text-[#06B6D4] bg-[#06B6D4]/10 px-2.5 py-1 rounded-full">
              Guide complet
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-[#0F0F1A] mb-2 group-hover:text-[#7C3AED] transition-colors line-clamp-2 font-[family-name:var(--font-jakarta)]">
          {post.title}
        </h3>

        <p className="text-[#64748B] text-sm leading-relaxed mb-4 line-clamp-3">
          {post.description}
        </p>

        <div className="flex items-center justify-between text-xs text-[#94A3B8]">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("fr-BE", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          <span>{post.readTime} min de lecture</span>
        </div>
      </div>
    </Link>
  );
}
