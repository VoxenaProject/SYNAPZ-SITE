import type { BlogPostMeta } from "@/lib/blog";
import PostCard from "./PostCard";

export default function RelatedPosts({ posts }: { posts: BlogPostMeta[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-white/[0.06]">
      <h2 className="text-2xl font-extrabold text-white mb-8 font-[family-name:var(--font-jakarta)]">
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
