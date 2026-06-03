import { useEffect, useRef, useState } from "react";

const counters = [
{ end: 500, suffix: "+", label: "Events Managed" },
{ end: 50000, suffix: "+", label: "Booths Booked" },
{ end: 2400, suffix: "+", label: "Organizers Worldwide" },
{ end: 98, suffix: "%", label: "Satisfaction Rate" }];


function Counter({ end, suffix, label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    let timer = null;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 2000;
        const steps = 80;
        const increment = end / steps;
        let current = 0;
        timer = setInterval(() => {
          current += increment;
          if (current >= end) {
            setCount(end);
            clearInterval(timer);
            timer = null;
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);
      }
    }, { threshold: 0.4 });
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [end]);

  const display = end >= 1000 ? count.toLocaleString() : count;

  return (
    <div ref={ref} className="text-center py-8">
      <div className="text-[36px] sm:text-[44px] font-inter font-black text-[#0D0D0D] leading-none tabular-nums tracking-[-0.04em]">
        {display}
        <span className="text-[#FF5F29]">{suffix}</span>
      </div>
      <div className="text-[13px] font-inter font-medium text-gray-500 mt-3">{label}</div>
    </div>);

}

export default function AboutSection() {
  return (
    <section id="about" className="bg-[#E8E8E8] py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <p className="font-inter font-bold text-[#FF5F29] uppercase tracking-widest mb-5 text-sm">ABOUT US</p>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-20">
          {/* Left */}
          <div>
            <h2 className="font-inter font-black text-[28px] sm:text-[34px] lg:text-[40px] text-[#0D0D0D] leading-[1.1] tracking-[-0.03em]">
              The Modern Exhibition Platform Built for Scale
            </h2>
            <p className="mt-5 text-[14px] font-inter text-gray-500 leading-[1.75] max-w-lg">
              ExpoVix is built on a simple idea — exhibition booth booking should flow, not fight you.
              We created a smart platform that brings floor plans, instant reservations,
              collaboration, and real-time insights into one clean, unified system.
              No clutter. No switching tools. No manual follow-ups.
            </p>
          </div>

          {/* Right — Floor plan visual */}
          <div className="relative">
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl shadow-black/8 border border-gray-100">
              {/* Top bar */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-[#FF5F29] flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <rect x="1" y="1" width="3.2" height="3.2" rx="0.6" fill="white" opacity="0.9" />
                      <rect x="5.8" y="1" width="3.2" height="3.2" rx="0.6" fill="white" opacity="0.65" />
                      <rect x="1" y="5.8" width="3.2" height="3.2" rx="0.6" fill="white" opacity="0.65" />
                      <rect x="5.8" y="5.8" width="3.2" height="3.2" rx="0.6" fill="white" opacity="0.35" />
                    </svg>
                  </div>
                  <span className="text-[12px] font-inter font-bold text-[#0D0D0D]">Hall A — ExpoVix 2026</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FF5F29]/10 border border-[#FF5F29]/15">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F29] animate-pulse" />
                  <span className="text-[9px] font-inter font-bold text-[#FF5F29]">LIVE</span>
                </div>
              </div>

              {/* Floor plan */}
              <div className="p-5 bg-[#FAFAFA]">
                <div className="grid gap-1.5" style={{ gridTemplateColumns: "repeat(10, minmax(0,1fr))" }}>
                  {Array.from({ length: 80 }).map((_, i) => {
                    const s = (i * 7 + 3) % 10;
                    const wide = i * 11 % 17 === 0;
                    return (
                      <div key={i}
                      className={`h-6 rounded-sm transition-all ${wide ? "col-span-2" : ""} ${s < 6 ? "bg-[#FF5F29]" : s < 7 ? "bg-amber-400" : "bg-white border border-gray-200"}`}
                      style={{ opacity: s < 6 ? 0.25 + s / 10 * 0.75 : 1 }} />);


                  })}
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    {[{ c: "bg-[#FF5F29]", l: "Booked (214)" }, { c: "bg-amber-400", l: "Reserved (12)" }, { c: "bg-white border border-gray-200", l: "Available (86)" }].map(({ c, l }) =>
                    <div key={l} className="flex items-center gap-1.5">
                        <div className={`w-3 h-3 rounded-sm ${c}`} />
                        <span className="text-[9px] font-inter text-gray-500">{l}</span>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-inter font-bold text-[#0D0D0D]">342 / 400</span>
                </div>
              </div>

              {/* Bottom action row */}
              <div className="flex items-center gap-3 px-5 py-4 border-t border-gray-100 bg-white">
                <div className="flex -space-x-2">
                  {["#FF5F29", "#0D1421", "#374151", "#6B7280"].map((c, i) =>
                  <div key={i} className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white" style={{ backgroundColor: c }}>
                      {["A", "B", "C", "D"][i]}
                    </div>
                  )}
                </div>
                <span className="text-[11px] font-inter text-gray-400">34 exhibitors</span>
                <div className="ml-auto text-[10px] font-inter font-semibold text-[#FF5F29] bg-[#FF5F29]/8 px-3 py-1.5 rounded-lg cursor-pointer">
                  Invite More
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
              <div className="text-[28px] font-inter font-black text-[#FF5F29] leading-none">86%</div>
              <div className="text-[10px] font-inter text-gray-400 mt-0.5">Avg Occupancy</div>
            </div>
          </div>
        </div>

        {/* Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 bg-white rounded-2xl border border-gray-200 overflow-hidden divide-x divide-y md:divide-y-0 divide-gray-200">
          {counters.map((c) => <Counter key={c.label} {...c} />)}
        </div>
      </div>
    </section>);

}