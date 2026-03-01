export default function WorkflowMockup() {
  const steps = [
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="2" y="3.5" width="12" height="9" rx="1.5" stroke="#9D6FF0" strokeWidth="1.2" />
          <path d="M2 5.5L8 9L14 5.5" stroke="#9D6FF0" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      ),
      title: "Trigger",
      label: "Email reçu",
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="5.5" stroke="#9D6FF0" strokeWidth="1.2" />
          <circle cx="6" cy="7" r="1" fill="#9D6FF0" />
          <circle cx="10" cy="7" r="1" fill="#9D6FF0" />
          <path d="M5.5 10C6 11 7 11.5 8 11.5C9 11.5 10 11 10.5 10" stroke="#9D6FF0" strokeWidth="1" strokeLinecap="round" />
        </svg>
      ),
      title: "IA Analyse",
      label: "Extraction",
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3V13M8 3L4.5 6.5M8 3L11.5 6.5" stroke="#9D6FF0" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Action",
      label: "Classification",
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="5.5" stroke="#9D6FF0" strokeWidth="1.2" />
          <path d="M5 8L7 10L11 6" stroke="#9D6FF0" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Résultat",
      label: "Mis à jour",
    },
  ];

  return (
    <div className="max-w-[500px] w-full py-8">
      {/* Label */}
      <div className="text-center mb-4">
        <span className="text-[9px] text-[#64748b] uppercase tracking-widest">
          Workflow automatisé
        </span>
      </div>

      {/* Flow */}
      <div className="flex items-center gap-0">
        {steps.map((step, i) => (
          <div key={step.title} className="contents">
            {/* Step Block */}
            <div className="glass-card rounded-xl p-3 w-[100px] text-center flex-shrink-0">
              {/* Icon Circle */}
              <div className="w-8 h-8 rounded-full bg-[#7C3AED]/10 flex items-center justify-center mx-auto">
                {step.icon}
              </div>
              {/* Title */}
              <p className="text-[10px] font-semibold text-white mt-2">
                {step.title}
              </p>
              {/* Label */}
              <p className="text-[9px] text-[#94a3b8] mt-1">{step.label}</p>
            </div>

            {/* Connecting Line (not after last step) */}
            {i < steps.length - 1 && (
              <div className="flex-1 relative h-[2px] min-w-[20px]">
                {/* Line background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED]/40 to-[#7C3AED]/20 rounded-full" />
                {/* Flowing dot */}
                <div
                  className="absolute w-2 h-2 rounded-full bg-[#7C3AED] shadow-lg shadow-[#7C3AED]/50 top-1/2 -translate-y-1/2"
                  style={{
                    animation: "flow-dot 3s ease-in-out infinite",
                    animationDelay: `${i * 0.6}s`,
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Badge */}
      <div className="text-center mt-4">
        <span className="inline-flex items-center gap-1.5 bg-[#7C3AED]/10 text-[#9D6FF0] text-[8px] font-medium rounded-full px-3 py-1">
          <span className="w-1 h-1 rounded-full bg-[#9D6FF0]" />
          Exécution automatique
        </span>
      </div>
    </div>
  );
}
