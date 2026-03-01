export default function DashboardMockup() {
  const kpis = [
    { label: "Leads", value: "847", change: "+12%", up: true },
    { label: "Contactés", value: "312", change: "+8%", up: true },
    { label: "Taux", value: "34.2%", change: "+2.1%", up: true },
    { label: "Temps gagné", value: "32h", change: "", up: false },
  ];

  const barHeights = [35, 55, 45, 70, 60, 80, 50];
  const barDays = ["L", "M", "M", "J", "V", "S", "D"];

  const activities = [
    { color: "bg-emerald-400", text: "Nouveau lead qualifié — Brasserie Léon", time: "il y a 2m" },
    { color: "bg-blue-400", text: "Email ouvert — Restaurant Le Phare", time: "il y a 8m" },
    { color: "bg-[#9D6FF0]", text: "Réservation confirmée — Chez Marcel", time: "il y a 14m" },
  ];

  return (
    <div className="max-w-[520px] w-full rounded-xl shadow-2xl glass-card overflow-hidden">
      {/* Top bar */}
      <div className="bg-[#0c0c20] px-4 py-2 flex items-center justify-between border-b border-white/[0.06]">
        <span className="text-[10px] font-bold text-white">Dashboard</span>
        <div className="flex items-center gap-1.5 bg-emerald-500/20 rounded-full px-2 py-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[8px] text-emerald-400 font-medium">Live</span>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="bg-[#09090E] w-10 flex-shrink-0 flex flex-col items-center py-3 gap-3 border-r border-white/[0.06]">
          <div className="w-[6px] h-[6px] rounded-sm bg-[#7C3AED]" />
          <div className="w-[6px] h-[6px] rounded-sm bg-[#94a3b8]/40" />
          <div className="w-[6px] h-[6px] rounded-sm bg-[#94a3b8]/40" />
          <div className="w-[6px] h-[6px] rounded-sm bg-[#94a3b8]/40" />
        </div>

        {/* Main content */}
        <div className="flex-1 p-3 space-y-3">
          {/* KPI Row */}
          <div className="grid grid-cols-4 gap-2">
            {kpis.map((kpi) => (
              <div
                key={kpi.label}
                className="bg-[#12122a] rounded-lg p-2 border border-white/[0.06]"
              >
                <p className="text-[8px] text-[#64748b]">{kpi.label}</p>
                <p className="text-[13px] font-bold text-white mt-0.5">
                  {kpi.value}
                </p>
                {kpi.change && (
                  <div className="flex items-center gap-0.5 mt-0.5">
                    <svg
                      width="6"
                      height="6"
                      viewBox="0 0 6 6"
                      fill="none"
                      className={kpi.up ? "text-emerald-400" : "text-red-400"}
                    >
                      <path
                        d="M3 1L5.5 4.5H0.5L3 1Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="text-[7px] text-emerald-400">
                      {kpi.change}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bar Chart */}
          <div className="bg-[#12122a] rounded-lg p-3 border border-white/[0.06]">
            <p className="text-[8px] text-[#64748b] mb-2">
              Leads cette semaine
            </p>
            <div className="flex items-end gap-2 h-[60px]">
              {barHeights.map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-sm bg-gradient-to-t from-[#7C3AED] to-[#9D6FF0]"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-[6px] text-[#64748b]">
                    {barDays[i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-[#12122a] rounded-lg p-3 border border-white/[0.06]">
            <p className="text-[8px] text-[#64748b] mb-2">
              Activité récente
            </p>
            <div className="space-y-2">
              {activities.map((activity, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span
                    className={`w-1 h-1 rounded-full flex-shrink-0 ${activity.color}`}
                  />
                  <span className="text-[9px] text-[#e2e8f0] flex-1 truncate">
                    {activity.text}
                  </span>
                  <span className="text-[7px] text-[#64748b] flex-shrink-0">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
