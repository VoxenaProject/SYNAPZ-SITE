import { getAuthor } from "@/lib/blog";

export default function AuthorCard({ authorId }: { authorId: string }) {
  const author = getAuthor(authorId);

  return (
    <div className="flex items-center gap-4 mt-12 pt-8 border-t border-white/[0.06]">
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center text-white font-bold text-lg">
        {author.name.split(" ").map((n) => n[0]).join("")}
      </div>
      <div>
        <a
          href={author.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white font-bold hover:text-[#9D6FF0] transition-colors"
        >
          {author.name}
        </a>
        <p className="text-[#64748b] text-sm">{author.role} — SYNAPZ</p>
      </div>
    </div>
  );
}
