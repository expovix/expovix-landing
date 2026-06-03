import { Upload, Settings, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Your Venue Layout",
    desc: "Import a CAD file, PDF, or image of your venue. Our smart editor converts it into an interactive floor plan in minutes.",
  },
  {
    icon: Settings,
    step: "02",
    title: "Configure & Publish",
    desc: "Set booth categories, pricing tiers, and availability windows. Share a branded booking link with your exhibitors.",
  },
  {
    icon: TrendingUp,
    step: "03",
    title: "Watch Booths Fill Up",
    desc: "Exhibitors browse, select, and pay instantly. You track every booking and revenue metric in your live dashboard.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#F8FAFC] py-16 sm:py-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-inter font-bold text-[#FF5F29] uppercase tracking-widest">
            How It Works
          </span>
          <h2 className="mt-3 font-inter font-bold text-3xl sm:text-4xl lg:text-[44px] text-[#0D1421] leading-tight tracking-[-0.02em]">
            Up and running in three steps
          </h2>
          <p className="mt-4 text-base font-inter text-gray-500">
            No training required. Most organizers launch their first event within a day.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((s, i) => (
            <div key={s.step} className="relative flex flex-col items-center text-center">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[calc(50%+52px)] w-[calc(100%-104px)] h-px bg-gradient-to-r from-[#FF5F29]/25 via-[#FF5F29]/10 to-transparent" />
              )}

              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center group-hover:border-[#FF5F29]/20 transition-colors">
                  <s.icon size={28} className="text-[#FF5F29]" />
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#FF5F29] border-2 border-[#F8FAFC] flex items-center justify-center">
                  <span className="text-[9px] font-inter font-black text-white">{s.step}</span>
                </div>
              </div>

              <h3 className="font-inter font-bold text-[17px] text-[#0D1421] mb-2.5">
                {s.title}
              </h3>
              <p className="text-sm font-inter text-gray-500 leading-relaxed max-w-xs">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}