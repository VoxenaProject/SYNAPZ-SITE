export default function ChatbotMockup() {
  return (
    <div className="max-w-[360px] w-full rounded-2xl shadow-2xl glass-card overflow-hidden">
      {/* Chat Header */}
      <div className="bg-[#12122a] rounded-t-2xl px-4 py-3 flex items-center justify-between border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          {/* Bot Avatar */}
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#9D6FF0] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 2L9 5H5L7 2Z"
                fill="white"
                opacity="0.9"
              />
              <circle cx="7" cy="9" r="2.5" stroke="white" strokeWidth="1.2" />
            </svg>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-white">
              Assistant SYNAPZ
            </p>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[8px] text-emerald-400">En ligne</span>
            </div>
          </div>
        </div>
        {/* Minimize dots */}
        <div className="flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-[#64748b]" />
          <span className="w-1 h-1 rounded-full bg-[#64748b]" />
          <span className="w-1 h-1 rounded-full bg-[#64748b]" />
        </div>
      </div>

      {/* Chat Messages */}
      <div className="bg-[#0c0c20] px-4 py-4 space-y-3 min-h-[200px]">
        {/* Bot welcome message */}
        <div className="flex items-start gap-2 max-w-[85%]">
          <div className="w-5 h-5 rounded-full bg-[#7C3AED]/30 flex-shrink-0 flex items-center justify-center mt-0.5">
            <div className="w-2 h-2 rounded-full bg-[#9D6FF0]" />
          </div>
          <div className="bg-[#12122a] text-[#e2e8f0] rounded-2xl rounded-bl-sm px-4 py-2.5">
            <p className="text-[11px] leading-relaxed">
              Bonjour ! Comment puis-je vous aider aujourd&apos;hui ?
            </p>
          </div>
        </div>

        {/* User message */}
        <div className="flex justify-end">
          <div className="bg-[#7C3AED] text-white rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[80%] ml-auto">
            <p className="text-[11px] leading-relaxed">
              Quels sont vos horaires ?
            </p>
          </div>
        </div>

        {/* Bot response */}
        <div className="flex items-start gap-2 max-w-[85%]">
          <div className="w-5 h-5 rounded-full bg-[#7C3AED]/30 flex-shrink-0 flex items-center justify-center mt-0.5">
            <div className="w-2 h-2 rounded-full bg-[#9D6FF0]" />
          </div>
          <div className="bg-[#12122a] text-[#e2e8f0] rounded-2xl rounded-bl-sm px-4 py-2.5">
            <p className="text-[11px] leading-relaxed">
              Nous sommes ouverts du mardi au samedi, de 12h à 14h30 et
              de 19h à 22h30. Souhaitez-vous réserver une table ?
            </p>
          </div>
        </div>

        {/* Typing indicator */}
        <div className="flex items-start gap-2">
          <div className="w-5 h-5 rounded-full bg-[#7C3AED]/30 flex-shrink-0 flex items-center justify-center mt-0.5">
            <div className="w-2 h-2 rounded-full bg-[#9D6FF0]" />
          </div>
          <div className="bg-[#12122a] rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#64748b]"
              style={{
                animation: "typing-dots 1.4s ease-in-out infinite",
                animationDelay: "0s",
              }}
            />
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#64748b]"
              style={{
                animation: "typing-dots 1.4s ease-in-out infinite",
                animationDelay: "0.2s",
              }}
            />
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#64748b]"
              style={{
                animation: "typing-dots 1.4s ease-in-out infinite",
                animationDelay: "0.4s",
              }}
            />
          </div>
        </div>
      </div>

      {/* Input Bar */}
      <div className="bg-[#12122a] px-4 py-3 border-t border-white/[0.06] flex items-center gap-2">
        <div className="flex-1 bg-[#0c0c20] rounded-full px-4 py-2 border border-white/[0.06]">
          <span className="text-[10px] text-[#64748b]">
            Écrivez un message...
          </span>
        </div>
        <div className="w-7 h-7 rounded-full bg-[#7C3AED] flex items-center justify-center flex-shrink-0">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M10.5 1.5L5.5 6.5M10.5 1.5L7 10.5L5.5 6.5M10.5 1.5L1.5 5L5.5 6.5"
              stroke="white"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
