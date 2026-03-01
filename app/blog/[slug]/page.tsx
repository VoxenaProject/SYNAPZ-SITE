import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { getAllSlugs, getPostBySlug, getRelatedPosts, getAuthor } from "@/lib/blog";
import mdxComponents from "@/components/blog/MDXComponents";
import TableOfContents from "@/components/blog/TableOfContents";
import Breadcrumbs, { BreadcrumbSchema } from "@/components/blog/Breadcrumbs";
import AuthorCard from "@/components/blog/AuthorCard";
import ShareButtons from "@/components/blog/ShareButtons";
import RelatedPosts from "@/components/blog/RelatedPosts";
import NewsletterCTA from "@/components/blog/NewsletterCTA";
import Link from "next/link";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `https://synapz.be/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://synapz.be/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.lastModified,
      authors: [getAuthor(post.author).name],
      siteName: "SYNAPZ",
      locale: "fr_BE",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const author = getAuthor(post.author);
  const relatedPosts = getRelatedPosts(post.slug, post.cluster);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.lastModified,
    author: {
      "@type": "Person",
      name: author.name,
      url: author.linkedin,
    },
    publisher: {
      "@type": "Organization",
      name: "SYNAPZ",
      url: "https://synapz.be",
      logo: {
        "@type": "ImageObject",
        url: "https://synapz.be/logo/synapz-logo-dark.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://synapz.be/blog/${post.slug}`,
    },
    keywords: post.keywords.join(", "),
    wordCount: post.content.split(/\s+/).length,
    inLanguage: "fr-BE",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BreadcrumbSchema
        category={post.category}
        title={post.title}
        slug={post.slug}
      />

      <main className="min-h-screen bg-[#060612] pt-28 pb-20">
        <article className="px-6">
          <div className="max-w-5xl mx-auto">
            <Breadcrumbs category={post.category} title={post.title} />

            {/* Article header */}
            <header className="max-w-3xl mb-10">
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight font-[family-name:var(--font-jakarta)]">
                {post.title}
              </h1>
              <p className="text-[#94a3b8] text-lg leading-relaxed mb-6">
                {post.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-[#64748b]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center text-white font-bold text-xs">
                    {author.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <span className="text-white font-medium">{author.name}</span>
                </div>
                <span>·</span>
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("fr-BE", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <span>·</span>
                <span>{post.readTime} min de lecture</span>
              </div>
            </header>

            {/* Content + TOC layout */}
            <div className="flex gap-12">
              {/* Article content */}
              <div className="max-w-3xl flex-1 min-w-0">
                <div className="prose-synapz">
                  <MDXRemote
                    source={post.content}
                    components={mdxComponents}
                    options={{
                      mdxOptions: {
                        remarkPlugins: [remarkGfm],
                        rehypePlugins: [
                          rehypeSlug,
                          [rehypeAutolinkHeadings, { behavior: "wrap" }],
                        ],
                      },
                    }}
                  />
                </div>

                {/* Inline CTA */}
                <NewsletterCTA />

                {/* Share + Author */}
                <ShareButtons title={post.title} slug={post.slug} />
                <AuthorCard authorId={post.author} />

                {/* Related posts */}
                <RelatedPosts posts={relatedPosts} />
              </div>

              {/* TOC sidebar */}
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <TableOfContents content={post.content} />
              </aside>
            </div>
          </div>
        </article>

        {/* Back to blog */}
        <div className="max-w-5xl mx-auto px-6 mt-16">
          <Link
            href="/blog"
            className="text-[#7C3AED] font-medium hover:underline"
          >
            ← Tous les articles
          </Link>
        </div>
      </main>
    </>
  );
}
