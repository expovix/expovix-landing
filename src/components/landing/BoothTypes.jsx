import { useState } from "react";
import { ArrowRight, Users, Maximize2, Building2, LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";

const booths = [
  {
    id: "shell-scheme",
    icon: LayoutGrid,
    tag: "Most Popular",
    tagColor: "#FF5F29",
    name: "Shell Scheme",
    size: "9 – 18 m²",
    desc: "Modular, budget-friendly booths with clean white panels and full graphic branding options. Perfect for first-time exhibitors.",
    image: "https://media.base44.com/images/public/6a18c428c4c5db3afaab651b/830dd1186_generated_image.png",
    perks: ["Rapid setup & teardown", "Fully branded graphics", "Modular panel system", "Built-in lighting"],
    price: "From $1,200",
    accent: "#FF5F29",
  },
  {
    id: "open-plan",
    icon: Maximize2,
    tag: "Premium",
    tagColor: "#6366F1",
    name: "Open Plan",
    size: "36 – 100 m²",
    desc: "Fully custom, open-layout stands with complete design freedom. Ideal for brands wanting maximum visual impact on the show floor.",
    image: "https://media.base44.com/images/public/6a18c428c4c5db3afaab651b/1de53bc6c_generated_image.png",
    perks: ["Custom architecture", "4-side open access", "Bespoke lighting design", "Lounge & meeting areas"],
    price: "From $8,500",
    accent: "#6366F1",
  },
  {
    id: "corner-booth",
    icon: Building2,
    tag: "Best Value",
    tagColor: "#F59E0B",
    name: "Corner Booth",
    size: "18 – 36 m²",
    desc: "Two open sides for maximum foot traffic and visibility. The sweet spot between affordability and high-impact presence.",
    image: "https://media.base44.com/images/public/6a18c428c4c5db3afaab651b/aa2aac083_generated_image.png",
    perks: ["Two open frontages", "Increased visibility", "Reception counter included", "Branded back walls"],
    price: "From $3,800",
    accent: "#F59E0B",
  },
  {
    id: "double-deck",
    icon: Users,
    tag: "Flagship",
    tagColor: "#EC4899",
    name: "Double-Deck",
    size: "64 – 200 m²",
    desc: "Two-story stands with private upper-level meeting rooms. The ultimate statement for enterprise exhibitors at major international shows.",
    image: "https://media.base44.com/images/public/6a18c428c4c5db3afaab651b/dba8ad271_generated_image.png",
    perks: ["Private upper meeting suite", "VIP reception area", "Custom façade design", "Dedicated AV & tech"],
    price: "From $22,000",
    accent: "#EC4899",
  },
];

export default function BoothTypes() {
  const [hovered, setHovered] = useState(null);
  const [active, setActive] = useState("open-plan");

  const displayed = hovered || active;
  const booth = booths.find((b) => b.id === displayed) || booths[1];

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div>
            <p className="text-[11px] font-inter font-bold text-[#FF5F29] uppercase tracking-widest mb-4">Booth Types</p>
            <h2 className="font-inter font-black text-[40px] sm:text-[52px] lg:text-[60px] text-[#0D0D0D] leading-[1.08] tracking-[-0.035em]">
              Every Booth Type,
              <br />Instantly Bookable
            </h2>
          </div>
          <p className="text-[15px] font-inter text-gray-500 max-w-sm leading-relaxed lg:text-right">
            Browse all available formats, compare features, and reserve the perfect booth for your next event in seconds.
          </p>
        </div>

        {/* Main layout */}
        <div className="grid lg:grid-cols-2 gap-6 items-start">

          {/* Left — booth selector cards */}
          <div className="space-y-3">
            {booths.map((b) => {
              const isActive = displayed === b.id;
              return (
                <div
                  key={b.id}
                  onMouseEnter={() => setHovered(b.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setActive(b.id)}
                  className={`group relative rounded-2xl p-5 border cursor-pointer transition-all duration-300 ${
                    isActive
                      ? "bg-[#F8F9FA] border-gray-200 shadow-lg shadow-black/5"
                      : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-md hover:shadow-black/4"
                  }`}
                >
                  {/* Animated left accent bar */}
                  <div
                    className="absolute left-0 top-4 bottom-4 w-1 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: b.accent,
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "scaleY(1)" : "scaleY(0)",
                    }}
                  />

                  <div className="flex items-start gap-4 pl-1">
                    {/* Icon */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      style={{ backgroundColor: isActive ? b.accent + "18" : "#F3F4F6" }}
                    >
                      <b.icon size={18} style={{ color: isActive ? b.accent : "#9CA3AF" }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-inter font-bold text-[15px] text-[#0D0D0D]">{b.name}</h3>
                        <span
                          className="text-[9px] font-inter font-bold px-2 py-0.5 rounded-full"
                          style={{ color: b.tagColor, backgroundColor: b.tagColor + "15" }}
                        >
                          {b.tag}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[11px] font-inter text-gray-400">{b.size}</span>
                        <span className="text-[11px] font-inter font-semibold" style={{ color: b.accent }}>{b.price}</span>
                      </div>

                      <p className="text-[13px] font-inter text-gray-500 leading-relaxed">{b.desc}</p>

                      {/* Perks — only visible when active */}
                      <div
                        className="overflow-hidden transition-all duration-500"
                        style={{ maxHeight: isActive ? 120 : 0, opacity: isActive ? 1 : 0 }}
                      >
                        <div className="flex flex-wrap gap-2 mt-3">
                          {b.perks.map((perk) => (
                            <span
                              key={perk}
                              className="text-[10px] font-inter font-medium px-2.5 py-1 rounded-full border"
                              style={{ color: b.accent, borderColor: b.accent + "30", backgroundColor: b.accent + "08" }}
                            >
                              {perk}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    <ArrowRight
                      size={16}
                      className="flex-shrink-0 mt-1 transition-all duration-200"
                      style={{ color: isActive ? b.accent : "#D1D5DB", transform: isActive ? "translateX(2px)" : "translateX(0)" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right — image preview */}
          <div className="lg:sticky lg:top-24">
            <div className="relative rounded-2xl overflow-hidden bg-gray-100 shadow-2xl shadow-black/12 border border-gray-100">
              {/* Image with transition */}
              <div className="relative aspect-[4/3] overflow-hidden">
                {booths.map((b) => (
                  <img
                    key={b.id}
                    src={b.image}
                    alt={b.name}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                    style={{
                      opacity: displayed === b.id ? 1 : 0,
                      transform: displayed === b.id ? "scale(1)" : "scale(1.04)",
                    }}
                  />
                ))}

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Bottom info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-3 transition-all duration-300"
                    style={{ backgroundColor: booth.accent }}
                  >
                    <span className="text-[10px] font-inter font-bold text-white">{booth.tag}</span>
                  </div>
                  <h3 className="font-inter font-black text-[22px] text-white leading-tight">{booth.name}</h3>
                  <p className="text-[12px] font-inter text-white/70 mt-1">{booth.size} · {booth.price}</p>
                </div>
              </div>

              {/* Bottom action bar */}
              <div className="bg-white px-5 py-4 flex items-center justify-between border-t border-gray-100">
                <div className="flex items-center gap-3">
                  {/* Dot indicators */}
                  {booths.map((b) => (
                    <div
                      key={b.id}
                      onClick={() => setActive(b.id)}
                      className="w-2 h-2 rounded-full cursor-pointer transition-all duration-300"
                      style={{
                        backgroundColor: displayed === b.id ? booth.accent : "#E5E7EB",
                        transform: displayed === b.id ? "scale(1.3)" : "scale(1)",
                      }}
                    />
                  ))}
                </div>
                <Link
                  to="/register"
                  className="flex items-center gap-2 text-[13px] font-inter font-bold transition-all duration-200 group"
                  style={{ color: booth.accent }}
                >
                  Book This Booth
                  <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            {/* Stats row below image */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { val: "4", label: "Booth formats" },
                { val: "72h", label: "Avg booking time" },
                { val: "100%", label: "Online managed" },
              ].map((s) => (
                <div key={s.label} className="bg-[#F8F9FA] rounded-xl p-4 text-center border border-gray-100">
                  <div className="text-[22px] font-inter font-black text-[#0D0D0D] leading-none">{s.val}</div>
                  <div className="text-[10px] font-inter text-gray-400 mt-1.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}