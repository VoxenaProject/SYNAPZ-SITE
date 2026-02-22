import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

function H2(props: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      id={props.id}
      className="text-2xl font-extrabold text-[#0F0F1A] mt-12 mb-4 font-[family-name:var(--font-jakarta)] scroll-mt-24"
      {...props}
    />
  );
}

function H3(props: ComponentPropsWithoutRef<"h3">) {
  return (
    <h3
      id={props.id}
      className="text-xl font-bold text-[#0F0F1A] mt-8 mb-3 font-[family-name:var(--font-jakarta)] scroll-mt-24"
      {...props}
    />
  );
}

function Paragraph(props: ComponentPropsWithoutRef<"p">) {
  return <p className="text-[#334155] text-base leading-relaxed mb-4" {...props} />;
}

function UnorderedList(props: ComponentPropsWithoutRef<"ul">) {
  return <ul className="list-disc list-inside space-y-2 mb-6 text-[#334155]" {...props} />;
}

function OrderedList(props: ComponentPropsWithoutRef<"ol">) {
  return <ol className="list-decimal list-inside space-y-2 mb-6 text-[#334155]" {...props} />;
}

function ListItem(props: ComponentPropsWithoutRef<"li">) {
  return <li className="text-base leading-relaxed" {...props} />;
}

function Anchor(props: ComponentPropsWithoutRef<"a">) {
  const { href, children, ...rest } = props;
  if (href?.startsWith("/")) {
    return (
      <Link href={href} className="text-[#7C3AED] font-medium underline underline-offset-2 hover:text-[#6D28D9] transition-colors" {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#7C3AED] font-medium underline underline-offset-2 hover:text-[#6D28D9] transition-colors"
      {...rest}
    >
      {children}
    </a>
  );
}

function Blockquote(props: ComponentPropsWithoutRef<"blockquote">) {
  return (
    <blockquote
      className="border-l-4 border-[#7C3AED] pl-4 py-2 my-6 bg-[#F5F7FF] rounded-r-lg italic text-[#64748B]"
      {...props}
    />
  );
}

function Table(props: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  );
}

function Th(props: ComponentPropsWithoutRef<"th">) {
  return (
    <th
      className="bg-[#0F0F1A] text-white text-left px-4 py-3 font-semibold text-sm first:rounded-tl-lg last:rounded-tr-lg"
      {...props}
    />
  );
}

function Td(props: ComponentPropsWithoutRef<"td">) {
  return (
    <td className="border-b border-[#E2E8F0] px-4 py-3 text-[#334155]" {...props} />
  );
}

function Strong(props: ComponentPropsWithoutRef<"strong">) {
  return <strong className="font-bold text-[#0F0F1A]" {...props} />;
}

function Hr() {
  return <hr className="my-8 border-t border-[#E2E8F0]" />;
}

function Code(props: ComponentPropsWithoutRef<"code">) {
  return (
    <code
      className="bg-[#F1F5F9] text-[#7C3AED] px-1.5 py-0.5 rounded text-sm font-mono"
      {...props}
    />
  );
}

export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#F5F7FF] border border-[#7C3AED]/20 rounded-xl p-6 my-6">
      {children}
    </div>
  );
}

export function CTABox({ text = "Obtenir mon audit gratuit", href = "/#offre" }: { text?: string; href?: string }) {
  return (
    <div className="bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] rounded-xl p-6 my-8 text-center">
      <p className="text-white font-bold text-lg mb-3">
        Prêt à automatiser votre PME ?
      </p>
      <a
        href={href}
        className="inline-block bg-white text-[#7C3AED] font-bold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
      >
        {text} →
      </a>
      <p className="text-white/70 text-sm mt-2">30 min · Gratuit · Sans engagement</p>
    </div>
  );
}

const mdxComponents = {
  h2: H2,
  h3: H3,
  p: Paragraph,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  a: Anchor,
  blockquote: Blockquote,
  table: Table,
  th: Th,
  td: Td,
  strong: Strong,
  hr: Hr,
  code: Code,
  Callout,
  CTABox,
};

export default mdxComponents;
