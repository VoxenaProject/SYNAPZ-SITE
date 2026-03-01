export default function WebsiteMockup() {
  return (
    <div className="max-w-[500px] w-full rounded-xl shadow-2xl glass-card overflow-hidden">
      {/* Browser Chrome */}
      <div className="bg-[#1a1a2e] px-4 py-2.5 flex items-center gap-3">
        {/* Traffic light dots */}
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
          <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
          <span className="w-2 h-2 rounded-full bg-[#28c840]" />
        </div>
        {/* URL bar */}
        <div className="flex-1 bg-[#0c0c20] rounded-md px-3 py-1">
          <span className="text-[10px] text-[#64748b]">
            monrestaurant.be
          </span>
        </div>
      </div>

      {/* Browser Content Area */}
      <div className="h-[280px] overflow-hidden bg-[#060612]">
        <div className="animate-auto-scroll">
          {/* Mini Website Header */}
          <div className="bg-[#0c0c20] px-4 py-2 flex items-center justify-between border-b border-white/[0.06]">
            <span className="text-[9px] font-bold text-white tracking-wide">
              Logo
            </span>
            <div className="flex items-center gap-3">
              <span className="text-[8px] text-[#94a3b8]">Menu</span>
              <span className="text-[8px] text-[#94a3b8]">Carte</span>
              <span className="text-[8px] text-[#94a3b8]">Contact</span>
            </div>
          </div>

          {/* Hero Section */}
          <div className="relative px-6 py-10 text-center bg-gradient-to-br from-[#7C3AED]/30 via-[#12122a] to-[#060612]">
            <div className="absolute inset-0 bg-gradient-to-b from-[#7C3AED]/10 to-transparent" />
            <h3 className="text-[14px] font-bold text-white relative z-10">
              Bienvenue
            </h3>
            <p className="text-[8px] text-[#94a3b8] mt-1 relative z-10">
              Une expérience culinaire inoubliable au coeur de Bruxelles
            </p>
            <div className="mt-3 inline-block bg-[#7C3AED] rounded-full px-4 py-1 relative z-10">
              <span className="text-[7px] text-white font-semibold">
                Réserver une table
              </span>
            </div>
          </div>

          {/* Service Cards Grid */}
          <div className="px-4 py-4">
            <p className="text-[8px] text-[#64748b] text-center mb-3 uppercase tracking-wider">
              Nos services
            </p>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-[#12122a] rounded-lg p-3 border border-white/[0.06]">
                <div className="w-5 h-5 rounded-md bg-[#7C3AED]/20 mb-2 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-sm bg-[#7C3AED]/60" />
                </div>
                <p className="text-[7px] text-white font-semibold">Déjeuner</p>
                <p className="text-[6px] text-[#64748b] mt-0.5">12h - 14h30</p>
              </div>
              <div className="bg-[#12122a] rounded-lg p-3 border border-white/[0.06]">
                <div className="w-5 h-5 rounded-md bg-[#9D6FF0]/20 mb-2 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-sm bg-[#9D6FF0]/60" />
                </div>
                <p className="text-[7px] text-white font-semibold">Diner</p>
                <p className="text-[6px] text-[#64748b] mt-0.5">19h - 22h30</p>
              </div>
              <div className="bg-[#12122a] rounded-lg p-3 border border-white/[0.06]">
                <div className="w-5 h-5 rounded-md bg-[#06B6D4]/20 mb-2 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-sm bg-[#06B6D4]/60" />
                </div>
                <p className="text-[7px] text-white font-semibold">Privé</p>
                <p className="text-[6px] text-[#64748b] mt-0.5">Sur demande</p>
              </div>
            </div>
          </div>

          {/* Testimonial Strip */}
          <div className="px-4 py-3">
            <div className="bg-[#0c0c20] rounded-lg p-3 border border-white/[0.06]">
              <p className="text-[7px] text-[#94a3b8] italic leading-relaxed">
                &quot;Un cadre magnifique et une cuisine exceptionnelle.
                Nous reviendrons sans hésiter.&quot;
              </p>
              <p className="text-[6px] text-[#64748b] mt-1">
                — Marie D., Google Reviews
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-[#0c0c20] px-4 py-3 border-t border-white/[0.06] flex items-center justify-between">
            <span className="text-[7px] text-[#64748b]">
              &copy; 2026 Mon Restaurant
            </span>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#12122a] border border-white/[0.06]" />
              <span className="w-3 h-3 rounded-full bg-[#12122a] border border-white/[0.06]" />
              <span className="w-3 h-3 rounded-full bg-[#12122a] border border-white/[0.06]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
