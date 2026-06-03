const stats = [
  { value: "500+", label: "Events Managed", desc: "across the globe" },
  { value: "50,000+", label: "Booths Booked", desc: "since launch" },
  { value: "98%", label: "Satisfaction Rate", desc: "from organizers" },
  { value: "50+", label: "Countries", desc: "fully supported" },
];

export default function StatsBar() {
  return (
    <section className="bg-[#F8FAFC] border-b border-gray-100 py-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-10 px-6 flex flex-col items-center text-center ${
                i < stats.length - 1 ? "md:border-r border-gray-100" : ""
              } ${i < 2 ? "border-b md:border-b-0 border-gray-100" : ""}`}
            >
              <span className="font-inter font-bold text-3xl sm:text-4xl text-[#FF5F29] tabular-nums tracking-tight">
                {stat.value}
              </span>
              <span className="text-sm font-inter font-semibold text-[#0D1421] mt-1.5">
                {stat.label}
              </span>
              <span className="text-xs font-inter text-gray-400 mt-0.5">
                {stat.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}