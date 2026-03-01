function ClaudeLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="white" fillOpacity="0.15" />
      <path d="M15.5 8.5L12 12l3.5 3.5M8.5 8.5L12 12 8.5 15.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NextjsLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="white" fillOpacity="0.15" />
      <path d="M7.5 16.5V7.5h1.2l5.4 7.2V7.5h1.2v9h-1.2L8.7 9.3v7.2H7.5z" fill="white" />
    </svg>
  );
}

function SupabaseLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M13.5 21.5c-.4.5-1.2.1-1.1-.5l.8-8.5H5.6c-.8 0-1.2-.9-.7-1.5l5.6-8.5c.4-.5 1.2-.1 1.1.5l-.8 8.5h7.6c.8 0 1.2.9.7 1.5l-5.6 8.5z" fill="white" fillOpacity="0.9" />
    </svg>
  );
}

function VercelLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M12 3L22 20H2L12 3z" fill="white" fillOpacity="0.9" />
    </svg>
  );
}

function ResendLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="white" strokeWidth="1.5" />
      <path d="M3 7l9 5 9-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GoogleCloudLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M14.5 6.5L16 4.5M9.5 6.5L8 4.5M12 4a8 8 0 00-8 8h3a5 5 0 0110 0h3a8 8 0 00-8-8z" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 12a8 8 0 008 8 8 8 0 008-8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function N8nLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <circle cx="6" cy="12" r="2.5" stroke="white" strokeWidth="1.5" />
      <circle cx="18" cy="8" r="2.5" stroke="white" strokeWidth="1.5" />
      <circle cx="18" cy="16" r="2.5" stroke="white" strokeWidth="1.5" />
      <path d="M8.5 11L15.5 8.5M8.5 13L15.5 15.5" stroke="white" strokeWidth="1.2" />
    </svg>
  );
}

function TailwindLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C13.35 10.82 14.52 12 17 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.65 7.18 14.48 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C8.35 16.82 9.52 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C10.65 13.18 9.48 12 7 12z" fill="white" fillOpacity="0.9" />
    </svg>
  );
}

const techs = [
  { name: "Claude AI", Logo: ClaudeLogo },
  { name: "Next.js", Logo: NextjsLogo },
  { name: "Supabase", Logo: SupabaseLogo },
  { name: "Vercel", Logo: VercelLogo },
  { name: "Resend", Logo: ResendLogo },
  { name: "Google Cloud", Logo: GoogleCloudLogo },
  { name: "n8n", Logo: N8nLogo },
  { name: "Tailwind CSS", Logo: TailwindLogo },
];

function LogoItem({ name, Logo }: { name: string; Logo: () => React.JSX.Element }) {
  return (
    <div className="flex flex-col items-center gap-2 mx-8 min-w-[90px]">
      <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
        <Logo />
      </div>
      <span className="text-[10px] text-white/50 whitespace-nowrap font-medium">{name}</span>
    </div>
  );
}

export default function LogoBar() {
  return (
    <section className="py-14 overflow-hidden">
      <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-10 font-medium">
        Propulsé par les meilleures technologies
      </p>
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#060612] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#060612] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee">
          {/* First set */}
          {techs.map((tech) => (
            <div key={`a-${tech.name}`} className="opacity-60 hover:opacity-100 transition-opacity duration-300">
              <LogoItem name={tech.name} Logo={tech.Logo} />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {techs.map((tech) => (
            <div key={`b-${tech.name}`} className="opacity-60 hover:opacity-100 transition-opacity duration-300">
              <LogoItem name={tech.name} Logo={tech.Logo} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
