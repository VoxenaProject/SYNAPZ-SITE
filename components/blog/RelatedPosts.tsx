import type { BlogPostMeta } from "@/lib/blog";
import PostCard from "./PostCard";

export default function RelatedPosts({ posts }: { posts: BlogPostMeta[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-[#E2E8F0]">
      <h2 className="text-2xl font-extrabold text-[#0F0F1A] mb-8 font-[family-name:var(--font-jakarta)]">
        Articles connexes
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
