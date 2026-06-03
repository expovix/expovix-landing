export default function WhySection() {
  return (
    <section id="why" className="bg-[#E8E8E8] py-12 sm:py-16 pb-8 sm:pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="font-inter font-bold text-[#FF5F29] uppercase tracking-widest mb-4 text-sm">WHY EXPOVIX?</p>
          <h2 className="font-inter font-black text-[28px] sm:text-[34px] lg:text-[40px] text-[#0D0D0D] leading-[1.1] tracking-[-0.03em] mb-4">
            Designed to Make<br />
            Exhibitions Effortless
          </h2>
          <p className="text-[14px] font-inter text-gray-500 max-w-sm mx-auto leading-relaxed">
            A smoother, smarter way to manage booth reservations and automate your exhibition operations from day one.
          </p>
        </div>

        {/* Bento grid — 3 top + 2 bottom */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

          {/* Card 1 — Floor Plan Organizer (salmon tint) */}
          <div className="bg-[#FFF0EB] rounded-2xl p-6 border border-[#FFD8CB]">
            {/* Mini visual */}
            <div className="bg-white rounded-xl p-4 mb-5 border border-[#FFD0BC] shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-4 h-4 rounded bg-[#FF5F29]/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-sm bg-[#FF5F29]" />
                </div>
                <span className="text-[9px] font-inter font-semibold text-gray-500">Floor Plan View</span>
              </div>
              <div className="space-y-1.5">
                {["Booth A12 — TechCorp", "Booth B04 — MediaHub", "Booth C17 — GreenWorld"].map((item, i) =>
                <div key={i} className="flex items-center gap-2 px-2.5 py-1.5 bg-[#FFF7F4] rounded-lg border border-[#FFE5D9]">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: i === 0 ? "#FF5F29" : i === 1 ? "#6366F1" : "#10B981" }} />
                    <span className="text-[8px] font-inter text-gray-600">{item}</span>
                  </div>
                )}
              </div>
            </div>
            <h3 className="font-inter font-bold text-[15px] text-[#0D0D0D] mb-1">Intelligent Floor Plan Organizer</h3>
            <p className="text-[12px] font-inter text-gray-500 leading-relaxed">
              Unique floor plan layouts with real-time availability and instant exhibitor booking.
            </p>
          </div>

          {/* Card 2 — Smooth Teamwork (blue tint) */}
          <div className="bg-[#EEF0FF] rounded-2xl p-6 border border-[#D4D8FF]">
            {/* Mini visual */}
            <div className="bg-white rounded-xl p-4 mb-5 border border-[#D4D8FF] shadow-sm">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-[8px] font-inter text-gray-400">Scheduled</span>
              </div>
              <p className="text-[11px] font-inter font-bold text-[#0D0D0D] mb-2">Hall Booking — ExCeL</p>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[8px] font-inter text-gray-400">34 Booths</span>
                <span className="text-[8px] font-inter text-gray-400">2 Sponsors</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-1.5">
                  {["#FF5F29", "#6366F1", "#10B981"].map((c, i) =>
                  <div key={i} className="w-5 h-5 rounded-full border-2 border-white text-[7px] font-bold text-white flex items-center justify-center" style={{ backgroundColor: c }}>
                      {["A", "B", "C"][i]}
                    </div>
                  )}
                </div>
                <span className="text-[8px] font-inter text-[#6366F1] font-semibold">Invite More</span>
              </div>
            </div>
            <h3 className="font-inter font-bold text-[15px] text-[#0D0D0D] mb-1">Smooth Exhibitor Workflow</h3>
            <p className="text-[12px] font-inter text-gray-500 leading-relaxed">
              Facilitate instant bookings and seamless data exchange across all your events.
            </p>
          </div>

          {/* Card 3 — Smart Automation (green tint) */}
          <div className="bg-[#EDFBF4] rounded-2xl p-6 border border-[#BBF0D4]">
            {/* Mini visual */}
            <div className="bg-white rounded-xl p-4 mb-5 border border-[#BBF0D4] shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[9px] font-inter font-semibold text-gray-500">Repeat Weekly</span>
                <span className="text-[9px] font-inter text-gray-400">Every Week</span>
              </div>
              <div className="flex gap-1 mb-3">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) =>
                <div key={i} className={`flex-1 h-7 rounded-md flex items-center justify-center text-[8px] font-inter font-bold ${[1, 2, 3, 4, 5].includes(i) ? "bg-[#10B981] text-white" : "bg-gray-100 text-gray-400"}`}>
                    {d}
                  </div>
                )}
              </div>
              <div className="flex gap-2 justify-end">
                <div className="px-3 py-1 rounded-lg border border-gray-200 text-[8px] font-inter text-gray-500">Cancel</div>
                <div className="px-3 py-1 rounded-lg bg-[#0D0D0D] text-[8px] font-inter font-bold text-white">Save</div>
              </div>
            </div>
            <h3 className="font-inter font-bold text-[15px] text-[#0D0D0D] mb-1">Smart Workflow Automation</h3>
            <p className="text-[12px] font-inter text-gray-500 leading-relaxed">
              Eliminate manual work — smart triggers that keep your exhibition projects moving automatically.
            </p>
          </div>
        </div>

        {/* Bottom row — 2 wider cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Card 4 — Advanced Reporting */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            {/* Mini visual */}
            <div className="bg-[#F8F9FC] rounded-xl p-4 mb-5 border border-gray-100">
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-gray-100 flex items-center justify-center text-[8px] font-inter text-gray-400">≡</div>
                  <span className="text-[8px] font-inter text-gray-400">List</span>
                  <span className="text-[8px] font-inter text-gray-400">Table</span>
                </div>
                <div className="ml-auto flex -space-x-1.5">
                  {["#FF5F29", "#6366F1", "#10B981"].map((c, i) =>
                  <div key={i} className="w-5 h-5 rounded-full border-2 border-white text-[7px] font-bold text-white flex items-center justify-center" style={{ backgroundColor: c }}>
                      {["A", "B", "C"][i]}
                    </div>
                  )}
                </div>
                <span className="text-[8px] font-inter text-[#FF5F29] font-semibold">+ Invite</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[["Booths Booked", "214", "#FF5F29"], ["Revenue", "$48k", "#6366F1"], ["Avg. Rate", "92%", "#10B981"]].map(([l, v, c]) =>
                <div key={l} className="bg-white rounded-lg p-2 border border-gray-100 text-center">
                    <div className="text-[11px] font-inter font-black" style={{ color: c }}>{v}</div>
                    <div className="text-[7px] font-inter text-gray-400 mt-0.5">{l}</div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-1.5">
                  <span className="text-[8px] font-inter text-gray-300">Generate weekly report…</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-[#FF5F29] text-[8px] font-inter font-bold text-white">Run</div>
              </div>
            </div>
            <h3 className="font-inter font-bold text-[15px] text-[#0D0D0D] mb-1">Advanced Reporting</h3>
            <p className="text-[12px] font-inter text-gray-500 leading-relaxed">
              Boost performance and streamline exhibition efficiency effortlessly.
            </p>
          </div>

          {/* Card 5 — Meeting Summaries */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            {/* Mini visual */}
            <div className="bg-[#F8F9FC] rounded-xl p-4 mb-5 border border-gray-100">
              <p className="text-[9px] font-inter font-bold text-[#0D0D0D] mb-2">Summary</p>
              <div className="space-y-2">
                <p className="text-[8px] font-inter text-gray-500 leading-relaxed">
                  Booth assignments were confirmed and deadlines agreed upon. A follow-up was automatically sent to all exhibitors.
                </p>
                <p className="text-[8px] font-inter text-gray-500 leading-relaxed">
                  Discussion concluded with clear exhibitor decisions and ownership.
                </p>
                <p className="text-[8px] font-inter leading-relaxed">
                  <span className="bg-[#6366F1]/15 text-[#6366F1] rounded px-0.5">Next steps are documented and shared</span>
                  <span className="text-gray-500"> with all attendees.</span>
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="w-4 h-4 rounded-full bg-[#FF5F29] flex items-center justify-center text-[6px] font-bold text-white">J</div>
                  <div className="flex-1 h-1 bg-gray-100 rounded-full">
                    <div className="h-1 bg-[#FF5F29] rounded-full w-2/3" />
                  </div>
                </div>
              </div>
            </div>
            <h3 className="font-inter font-bold text-[15px] text-[#0D0D0D] mb-1">Booking Summaries</h3>
            <p className="text-[12px] font-inter text-gray-500 leading-relaxed">
              Automatically capture exhibitor outcomes and send follow-ups after every booking.
            </p>
          </div>
        </div>
      </div>
    </section>);

}