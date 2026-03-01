export default function EmailSequenceMockup() {
  const steps = [
    {
      day: "J0",
      dayBg: "bg-blue-500/20",
      dayText: "text-blue-400",
      name: "Email initial",
      subject: "Bonjour, nous avons remarqué...",
      status: "Envoyé",
      statusIcon: "check",
      statusColor: "text-emerald-400",
      pulse: false,
    },
    {
      day: "J+3",
      dayBg: "bg-amber-500/20",
      dayText: "text-amber-400",
      name: "Relance douce",
      subject: "Suite à mon précédent...",
      status: "Ouvert",
      statusIcon: "check",
      statusColor: "text-emerald-400",
      pulse: false,
    },
    {
      day: "J+7",
      dayBg: "bg-[#7C3AED]/20",
      dayText: "text-[#9D6FF0]",
      name: "Valeur ajoutée",
      subject: "3 stratégies pour...",
      status: "En attente",
      statusIcon: "arrow",
      statusColor: "text-amber-400",
      pulse: true,
    },
    {
      day: "J+14",
      dayBg: "bg-red-500/20",
      dayText: "text-red-400",
      name: "Dernière chance",
      subject: "Dernière opportunité de...",
      status: "Planifié",
      statusIcon: "lock",
      statusColor: "text-[#64748b]",
      pulse: false,
    },
  ];

  return (
    <div className="max-w-[420px] w-full rounded-xl shadow-2xl glass-card overflow-hidden">
      {/* Header */}
      <div className="bg-[#0c0c20] px-4 py-2.5 border-b border-white/[0.06]">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-white">
            Séquence Email
          </span>
          <span className="text-[8px] text-[#64748b]">4 étapes</span>
        </div>
      </div>

      {/* Steps */}
      <div>
        {steps.map((step, i) => (
          <div
            key={step.day}
            className={`flex items-center gap-3 py-3 px-4 ${
              i < steps.length - 1 ? "border-b border-white/[0.04]" : ""
            } ${step.pulse ? "animate-pulse-glow rounded-lg" : ""}`}
          >
            {/* Day Badge */}
            <span
              className={`${step.dayBg} ${step.dayText} text-[9px] font-bold rounded-md px-2 py-1 flex-shrink-0 min-w-[36px] text-center`}
            >
              {step.day}
            </span>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-white font-medium">
                {step.name}
              </p>
              <p className="text-[8px] text-[#64748b] truncate mt-0.5">
                {step.subject}
              </p>
            </div>

            {/* Status */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {step.statusIcon === "check" && (
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  className={step.statusColor}
                >
                  <path
                    d="M2 5L4.5 7.5L8 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              {step.statusIcon === "arrow" && (
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  className={step.statusColor}
                >
                  <path
                    d="M2 5H8M8 5L5.5 2.5M8 5L5.5 7.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              {step.statusIcon === "lock" && (
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  className={step.statusColor}
                >
                  <rect
                    x="2.5"
                    y="4.5"
                    width="5"
                    height="3.5"
                    rx="0.8"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <path
                    d="M3.5 4.5V3.5C3.5 2.4 4.2 1.5 5 1.5C5.8 1.5 6.5 2.4 6.5 3.5V4.5"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                </svg>
              )}
              <span className={`text-[8px] ${step.statusColor}`}>
                {step.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer - Claude AI badge */}
      <div className="px-4 py-2.5 border-t border-white/[0.06] flex justify-center">
        <span className="bg-[#7C3AED]/10 text-[#9D6FF0] text-[9px] font-medium rounded-full px-3 py-1 inline-flex items-center gap-1.5">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
          >
            <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1" />
            <path
              d="M3.5 5.5L5 3.5L6.5 5.5"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="5"
              y1="3.5"
              x2="5"
              y2="7"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
          </svg>
          Powered by Claude AI
        </span>
      </div>
    </div>
  );
}
