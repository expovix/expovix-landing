import { TrendingUp, Calendar, Users, DollarSign } from "lucide-react";

const chartBars = [62, 45, 78, 55, 90, 68, 95, 72, 85, 63, 88, 74];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const events = [
  { name: "GITEX Global 2026", location: "Dubai, UAE", booths: "342/400", status: "Live", pct: 85 },
  { name: "Saudi Build Expo", location: "Riyadh, KSA", booths: "218/300", status: "Active", pct: 73 },
  { name: "Cityscape Qatar", location: "Doha, Qatar", booths: "156/200", status: "Active", pct: 78 },
  { name: "Kuwait Motor Show", location: "Kuwait City", booths: "89/150", status: "Open", pct: 59 },
];

const statCards = [
  { icon: DollarSign, label: "Total Revenue", value: "$2.4M", change: "+18%", up: true },
  { icon: Calendar, label: "Active Events", value: "24", change: "+3", up: true },
  { icon: Users, label: "Exhibitors", value: "1,847", change: "+12%", up: true },
  { icon: TrendingUp, label: "Occupancy Rate", value: "87%", change: "+5%", up: true },
];

export default function DashboardPreview() {
  return (
    <section className="bg-[#F8FAFC] py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-inter font-bold text-[#1D9E75] uppercase tracking-widest">
            Command Center
          </span>
          <h2 className="mt-3 font-inter font-bold text-3xl sm:text-4xl lg:text-[44px] text-[#0D1421] leading-tight tracking-[-0.02em]">
            Your operations,
            <br className="hidden sm:block" /> one powerful dashboard
          </h2>
          <p className="mt-4 text-base font-inter text-gray-500 leading-relaxed">
            Monitor bookings, revenue, and exhibitor activity across all GCC events in real time.
          </p>
        </div>

        {/* Dashboard mockup */}
        <div className="relative max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-2xl shadow-gray-200/60 bg-white">
            {/* Browser bar */}
            <div className="flex items-center gap-2 px-5 py-3 bg-[#F8FAFC] border-b border-gray-100">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
              </div>
              <div className="flex-1 mx-4">
                <div className="max-w-xs mx-auto h-6 rounded-md bg-white border border-gray-200 flex items-center px-3 gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#1D9E75]" />
                  <span className="text-[10px] font-inter text-gray-400">app.expovix.com/dashboard</span>
                </div>
              </div>
            </div>

            {/* Dashboard UI */}
            <div className="flex h-[460px] overflow-hidden">
              {/* Sidebar */}
              <div className="w-52 bg-[#0D1421] flex-shrink-0 p-4 flex flex-col gap-1">
                <div className="flex items-center gap-2 mb-6 mt-1">
                  <div className="w-6 h-6 rounded bg-[#1D9E75] flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <rect x="1" y="1" width="4" height="4" rx="0.8" fill="white" opacity="0.9" />
                      <rect x="7" y="1" width="4" height="4" rx="0.8" fill="white" opacity="0.6" />
                      <rect x="1" y="7" width="4" height="4" rx="0.8" fill="white" opacity="0.6" />
                      <rect x="7" y="7" width="4" height="4" rx="0.8" fill="white" opacity="0.3" />
                    </svg>
                  </div>
                  <span className="text-sm font-inter font-bold text-white">ExpoVix</span>
                </div>
                {[
                  { label: "Overview", active: true },
                  { label: "Events" },
                  { label: "Floor Plans" },
                  { label: "Exhibitors" },
                  { label: "Revenue" },
                  { label: "Analytics" },
                  { label: "Settings" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`px-3 py-2 rounded-lg text-xs font-inter font-medium transition-colors ${
                      item.active
                        ? "bg-[#1D9E75]/20 text-[#1D9E75]"
                        : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    {item.label}
                  </div>
                ))}
              </div>

              {/* Main content */}
              <div className="flex-1 p-5 bg-white overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-inter font-bold text-[#0D1421]">Dashboard Overview</h3>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1D9E75]/8 border border-[#1D9E75]/15">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] animate-pulse" />
                    <span className="text-[10px] font-inter font-semibold text-[#1D9E75]">Live</span>
                  </div>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-4 gap-3 mb-5">
                  {statCards.map((s) => (
                    <div key={s.label} className="p-3 rounded-xl border border-gray-100 bg-[#F8FAFC]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] font-inter font-semibold text-gray-400 uppercase tracking-wide">{s.label}</span>
                        <s.icon size={11} className="text-[#1D9E75]" />
                      </div>
                      <div className="text-base font-inter font-bold text-[#0D1421]">{s.value}</div>
                      <div className="text-[9px] font-inter font-medium text-[#1D9E75] mt-0.5">{s.change} this month</div>
                    </div>
                  ))}
                </div>

                {/* Revenue chart */}
                <div className="rounded-xl border border-gray-100 p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-inter font-semibold text-[#0D1421]">Revenue Overview</span>
                    <span className="text-[9px] font-inter text-gray-400 bg-gray-50 px-2 py-0.5 rounded">2026</span>
                  </div>
                  <div className="flex items-end gap-1.5 h-20">
                    {chartBars.map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full rounded-t-sm"
                          style={{
                            height: `${h}%`,
                            backgroundColor: i === months.findIndex(m => m === "May") ? "#1D9E75" : "#1D9E75",
                            opacity: i === 4 ? 1 : 0.25 + (i / months.length) * 0.55,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-1.5 mt-1">
                    {months.map((m, i) => (
                      <div key={m} className="flex-1 text-center">
                        <span className={`text-[7px] font-inter ${i === 4 ? "text-[#1D9E75] font-bold" : "text-gray-300"}`}>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Events table */}
                <div className="rounded-xl border border-gray-100 overflow-hidden">
                  <div className="px-3 py-2 bg-[#F8FAFC] border-b border-gray-100">
                    <span className="text-xs font-inter font-semibold text-[#0D1421]">Active Events</span>
                  </div>
                  {events.map((ev) => (
                    <div key={ev.name} className="flex items-center gap-3 px-3 py-2.5 border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-inter font-semibold text-[#0D1421] truncate">{ev.name}</div>
                        <div className="text-[9px] font-inter text-gray-400">{ev.location}</div>
                      </div>
                      <div className="w-20">
                        <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                          <div className="h-full rounded-full bg-[#1D9E75]" style={{ width: `${ev.pct}%` }} />
                        </div>
                        <div className="text-[8px] font-inter text-gray-400 mt-0.5 text-right">{ev.booths}</div>
                      </div>
                      <div className={`px-1.5 py-0.5 rounded text-[8px] font-inter font-bold ${
                        ev.status === "Live" ? "bg-[#1D9E75]/15 text-[#1D9E75]" : "bg-gray-100 text-gray-500"
                      }`}>
                        {ev.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Shadow */}
          <div className="absolute -bottom-6 left-8 right-8 h-12 bg-gray-900/10 blur-xl rounded-full -z-10" />
        </div>
      </div>
    </section>
  );
}