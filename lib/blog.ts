import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  lastModified: string;
  author: string;
  category: string;
  tags: string[];
  keywords: string[];
  pillar: boolean;
  cluster: string;
  readTime: number;
  featured: boolean;
  content: string;
}

export interface BlogPostMeta extends Omit<BlogPost, "content"> {}

const AUTHORS: Record<string, { name: string; role: string; linkedin: string }> = {
  dejvi: {
    name: "Dejvi Prifti",
    role: "Co-fondateur & CEO",
    linkedin: "https://www.linkedin.com/in/dejvi-prifti/",
  },
  daniele: {
    name: "Daniele Rutigliano",
    role: "Co-fondateur & Stratégie IA",
    linkedin: "https://www.linkedin.com/in/daniele-rutigliano/",
  },
};

export function getAuthor(id: string) {
  return AUTHORS[id] || AUTHORS.dejvi;
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const filePath = path.join(BLOG_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const stats = readingTime(content);

    return {
      slug: data.slug || filename.replace(/\.mdx$/, ""),
      title: data.title || "",
      description: data.description || "",
      date: data.date || "",
      lastModified: data.lastModified || data.date || "",
      author: data.author || "dejvi",
      category: data.category || "",
      tags: data.tags || [],
      keywords: data.keywords || [],
      pillar: data.pillar || false,
      cluster: data.cluster || "",
      readTime: Math.ceil(stats.minutes),
      featured: data.featured || false,
    } satisfies BlogPostMeta;
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  if (!fs.existsSync(BLOG_DIR)) return null;

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  for (const filename of files) {
    const filePath = path.join(BLOG_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const postSlug = data.slug || filename.replace(/\.mdx$/, "");

    if (postSlug === slug) {
      const stats = readingTime(content);
      return {
        slug: postSlug,
        title: data.title || "",
        description: data.description || "",
        date: data.date || "",
        lastModified: data.lastModified || data.date || "",
        author: data.author || "dejvi",
        category: data.category || "",
        tags: data.tags || [],
        keywords: data.keywords || [],
        pillar: data.pillar || false,
        cluster: data.cluster || "",
        readTime: Math.ceil(stats.minutes),
        featured: data.featured || false,
        content,
      };
    }
  }

  return null;
}

export function getRelatedPosts(currentSlug: string, cluster: string, limit = 3): BlogPostMeta[] {
  return getAllPosts()
    .filter((p) => p.slug !== currentSlug && p.cluster === cluster)
    .slice(0, limit);
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  return [...new Set(posts.map((p) => p.category).filter(Boolean))];
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}
