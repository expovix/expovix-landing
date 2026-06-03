import { Link } from "react-router-dom";

const navItems = ["Dashboard", "My Events", "Booths", "Bookings", "Settings"];

const barGroups = [
{ label: "a", bars: [{ h: 35, c: "#F59E0B" }, { h: 55, c: "#6366F1" }, { h: 25, c: "#06B6D4" }] },
{ label: "b", bars: [{ h: 50, c: "#F59E0B" }, { h: 70, c: "#6366F1" }, { h: 40, c: "#06B6D4" }] },
{ label: "c", bars: [{ h: 30, c: "#F59E0B" }, { h: 45, c: "#6366F1" }, { h: 90, c: "#06B6D4" }] },
{ label: "d", bars: [{ h: 60, c: "#F59E0B" }, { h: 38, c: "#6366F1" }, { h: 55, c: "#06B6D4" }] }];


const notifications = [
{ text: "Elle joined team developers", time: "14 Apr 2021, 1:30 PM", color: "#FF5F29" },
{ text: "Jenny joined team HR", time: "14 Apr 2021, 10:15 AM", color: "#6366F1" },
{ text: "Adam got employee of the month", time: "13 Apr 2021, 12:30 PM", color: "#F59E0B" },
{ text: "Robert joined team design", time: "13 Apr 2021, 9:30 PM", color: "#EC4899" }];


// Simple SVG line chart path generator
function linePath(points, w, h) {
  const xs = points.map((_, i) => i / (points.length - 1) * w);
  const min = Math.min(...points);
  const max = Math.max(...points);
  const ys = points.map((p) => h - (p - min) / (max - min + 1) * (h - 8) - 4);
  return xs.map((x, i) => `${i === 0 ? "M" : "L"} ${x} ${ys[i]}`).join(" ");
}

const achievedPts = [4, 6, 5, 8, 7, 9, 7, 8, 10, 9, 8, 10];
const targetPts = [3, 4, 6, 5, 6, 7, 8, 7, 8, 8, 9, 9];

export default function Hero() {
  const chartW = 280;
  const chartH = 52;

  return (
    <section className="bg-[#E8E8E8] pt-[100px] pb-4">
      {/* Hero text */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-black/8 bg-white/60 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5F29] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5F29]" />
          </span>
          <span className="text-[13px] font-inter font-medium text-[hsl(var(--foreground))]">Exhibition Booth Booking Platform</span>
        </div>

        <h1 className="font-inter font-black text-[#0D0D0D] leading-[1.07] tracking-[-0.04em] text-[40px] sm:text-[52px] lg:text-[64px]">
          The Smarter Way to
          <br />
          Book Exhibition Booths
        </h1>

        <p className="mt-5 text-[15px] font-inter max-w-[500px] mx-auto leading-[1.72] text-[hsl(var(--foreground))]">Automate repetitive work and free your team to focus on exhibitor experience. ExpoVix keeps every event moving forward automatically.


        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://expovix.com/register"
            className="px-8 py-3.5 rounded-full bg-[#FF5F29] hover:bg-[#e54f1f] text-white font-inter font-bold text-[15px] transition-all duration-200 shadow-lg shadow-[#FF5F29]/25">
            
            Start Free Trial
          </a>
          <button
            onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3.5 rounded-full bg-white text-[#0D0D0D] font-inter font-bold text-[15px] shadow-sm hover:shadow-md transition-all duration-200">
            
            View Pricing
          </button>
        </div>
      </div>

      {/* Dashboard mockup */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-0">
        <div className="rounded-t-2xl overflow-hidden border border-black/8 bg-white shadow-2xl shadow-black/15">

          {/* Browser chrome */}
          <div className="flex items-center gap-3 px-5 py-3 bg-[#F4F4F4] border-b border-black/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F5F]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBE2E]" />
              <div className="w-3 h-3 rounded-full bg-[#2AC840]" />
            </div>
            <div className="flex-1 mx-4">
              <div className="max-w-xs mx-auto h-6 rounded-md bg-white border border-black/8 flex items-center justify-center gap-1.5 px-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF5F29]" />
                <span className="text-[10px] font-inter text-gray-400">app.expovix.com/dashboard</span>
              </div>
            </div>
          </div>

          {/* App shell */}
          <div className="flex bg-[#F8F9FC]" style={{ height: 460 }}>

            {/* ── Sidebar ── */}
            <div className="w-44 bg-white border-r border-gray-100 flex-shrink-0 p-3.5 hidden sm:flex flex-col">
              <div className="flex items-center gap-2 mb-5 px-1.5">
                <div className="w-7 h-7 rounded-lg bg-[#FF5F29] flex items-center justify-center flex-shrink-0">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <rect x="1" y="1" width="4.2" height="4.2" rx="0.8" fill="white" opacity="0.95" />
                    <rect x="7.8" y="1" width="4.2" height="4.2" rx="0.8" fill="white" opacity="0.65" />
                    <rect x="1" y="7.8" width="4.2" height="4.2" rx="0.8" fill="white" opacity="0.65" />
                    <rect x="7.8" y="7.8" width="4.2" height="4.2" rx="0.8" fill="white" opacity="0.35" />
                  </svg>
                </div>
                <span className="text-[12px] font-inter font-bold text-[#0D0D0D]">ExpoVix</span>
              </div>

              {navItems.map((label, i) =>
              <div key={label} className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-[11px] font-inter font-medium mb-0.5 ${i === 0 ? "bg-[#FF5F29]/10 text-[#FF5F29]" : "text-gray-400"}`}>
                  <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${i === 0 ? "bg-[#FF5F29]" : "bg-gray-200"}`} />
                  {label}
                </div>
              )}

              {/* Bottom card */}
              <div className="mt-auto rounded-xl bg-[#F0EEFF] p-3 text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-[#6366F1]/20 flex items-center justify-center">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M11 3L11 11M11 11L7 7M11 11L15 7" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 14v3a1 1 0 001 1h12a1 1 0 001-1v-3" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="text-[9px] font-inter text-[#6366F1] font-semibold">Share Your Insights</p>
              </div>
            </div>

            {/* ── Main content ── */}
            <div className="flex-1 overflow-hidden flex flex-col">

              {/* Top bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 flex-shrink-0">
                <div>
                  <p className="text-[13px] font-inter font-bold text-[#0D0D0D]">Good Morning, Alex</p>
                  <p className="text-[10px] font-inter text-gray-400">Hope you have a great day</p>
                </div>
                <div className="flex items-center gap-2">
                  {/* search */}
                  <div className="w-7 h-7 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><circle cx="4.5" cy="4.5" r="3" stroke="#9CA3AF" strokeWidth="1.2" /><path d="M7 7L9 9" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" /></svg>
                  </div>
                  {/* bell */}
                  <div className="w-7 h-7 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 1a3 3 0 013 3v2l1 1.5H1.5L2.5 6V4a3 3 0 013-3z" stroke="#9CA3AF" strokeWidth="1.1" /><path d="M4.5 8.5a1 1 0 002 0" stroke="#9CA3AF" strokeWidth="1.1" /></svg>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#FF5F29] flex items-center justify-center text-[11px] font-inter font-bold text-white">A</div>
                </div>
              </div>

              {/* Dashboard body — 2 column layout */}
              <div className="flex-1 p-3 overflow-hidden flex gap-3">

                {/* Left column */}
                <div className="flex-1 flex flex-col gap-3 min-w-0">

                  {/* Row 1: Teams Strength + Employees */}
                  <div className="flex gap-3">

                    {/* Teams Strength bar chart */}
                    <div className="flex-1 bg-[#1A1A2E] rounded-xl border border-gray-700 p-3 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-inter font-bold text-white">Teams Strength</span>
                      </div>
                      <div className="flex items-end gap-2 h-14">
                        {[
                        { label: "Design", h: 60 },
                        { label: "Dev", h: 85 },
                        { label: "HR", h: 45 },
                        { label: "Mktg", h: 90 },
                        { label: "Sales", h: 70 }].
                        map((b) =>
                        <div key={b.label} className="flex-1 flex flex-col items-center gap-0.5">
                            <div className="w-full rounded-t-sm" style={{ height: `${b.h}%`, backgroundColor: "#FF5F29" }} />
                            <span className="text-[6px] font-inter text-gray-400 mt-1">{b.label}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Employees donut-style */}
                    <div className="w-36 bg-white rounded-xl border border-gray-100 p-3 shadow-sm flex-shrink-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-inter font-bold text-[#0D0D0D]">Exhibitors</span>
                        <span className="text-[7px] font-inter text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded-full">Aug 25–Sep 25</span>
                      </div>
                      {/* Donut SVG */}
                      <div className="flex items-center justify-center mb-2">
                        <svg width="52" height="52" viewBox="0 0 52 52">
                          <circle cx="26" cy="26" r="20" fill="none" stroke="#F3F4F6" strokeWidth="7" />
                          <circle cx="26" cy="26" r="20" fill="none" stroke="#FF5F29" strokeWidth="7"
                          strokeDasharray="94 32" strokeDashoffset="28" strokeLinecap="round" />
                          <circle cx="26" cy="26" r="20" fill="none" stroke="#6366F1" strokeWidth="7"
                          strokeDasharray="30 96" strokeDashoffset="-66" strokeLinecap="round" />
                          <text x="26" y="30" textAnchor="middle" fontSize="9" fontWeight="800" fill="#0D0D0D" fontFamily="Inter">1,847</text>
                        </svg>
                      </div>
                      <div className="space-y-1">
                        {[{ c: "#FF5F29", l: "Active", v: "1,593" }, { c: "#6366F1", l: "Inactive", v: "254" }].map(({ c, l, v }) =>
                        <div key={l} className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: c }} />
                            <span className="text-[8px] font-inter text-gray-500 flex-1">{l}</span>
                            <span className="text-[8px] font-inter font-bold text-[#0D0D0D]">{v}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Project Deliveries line chart */}
                  <div className="flex-1 bg-white rounded-xl border border-gray-100 p-3 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-inter font-bold text-[#0D0D0D]">Booth Bookings</span>
                      <div className="flex items-center gap-3">
                        {[["#FF5F29", "Confirmed"], ["#6366F1", "Targets"]].map(([c, l]) =>
                        <div key={l} className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} />
                            <span className="text-[7px] font-inter text-gray-400">{l}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <svg width="100%" height="60" viewBox={`0 0 ${chartW} ${chartH}`} preserveAspectRatio="none">
                      {/* Grid lines */}
                      {[0, 1, 2, 3].map((i) =>
                      <line key={i} x1="0" y1={i * (chartH / 3)} x2={chartW} y2={i * (chartH / 3)} stroke="#F3F4F6" strokeWidth="0.8" />
                      )}
                      <path d={linePath(achievedPts, chartW, chartH)} fill="none" stroke="#FF5F29" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      <path d={linePath(targetPts, chartW, chartH)} fill="none" stroke="#6366F1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 2" />
                    </svg>
                    <div className="flex justify-between mt-1">
                      {["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"].map((m) =>
                      <span key={m} className="text-[7px] font-inter text-gray-300">{m}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right column */}
                <div className="w-44 flex-shrink-0 flex flex-col gap-2">

                  {/* 3 stat cards */}
                  {[
                  { label: "Top Event", val: "ExCeL London", sub: "86% occupancy", bg: "#FFF7ED", valColor: "#FF5F29" },
                  { label: "New Exhibitors", val: "26", sub: "+15% from last month", bg: "#F5F3FF", valColor: "#6366F1" },
                  { label: "Booths Booked", val: "500", sub: "+8% increase last week", bg: "#F0FDF4", valColor: "#10B981" }].
                  map(({ label, val, sub, bg, valColor }) =>
                  <div key={label} className="rounded-xl p-3 border border-gray-100 shadow-sm" style={{ backgroundColor: bg }}>
                      <p className="text-[8px] font-inter font-semibold text-gray-400 uppercase tracking-wide mb-1">{label}</p>
                      <p className="text-[15px] font-inter font-black leading-none mb-0.5" style={{ color: valColor }}>{val}</p>
                      <p className="text-[7px] font-inter text-gray-400 leading-tight">{sub}</p>
                    </div>
                  )}

                  {/* Notifications */}
                  <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-2.5 py-2 border-b border-gray-50">
                      <span className="text-[9px] font-inter font-bold text-[#0D0D0D]">Notifications</span>
                      <span className="text-[7px] font-inter text-[#FF5F29] font-semibold">View All</span>
                    </div>
                    <div className="divide-y divide-gray-50">
                      {notifications.map((n, i) =>
                      <div key={i} className="flex items-start gap-2 px-2.5 py-1.5">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center text-[7px] font-bold text-white flex-shrink-0 mt-0.5" style={{ backgroundColor: n.color }}>
                            {n.text[0]}
                          </div>
                          <div>
                            <p className="text-[7.5px] font-inter text-[#0D0D0D] leading-tight">{n.text}</p>
                            <p className="text-[6.5px] font-inter text-gray-400 mt-0.5">{n.time}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Fade out bottom */}
        <div className="h-16 bg-gradient-to-b from-[#E8E8E8]/0 to-[#E8E8E8] -mt-px relative z-10" />
      </div>
    </section>);

}