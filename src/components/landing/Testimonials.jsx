const testimonials = [
{
  quote: "ExpoVix completely replaced EXPOCAD for us. Our booth booking process went from 3 weeks of back-and-forth emails to under 2 days. The automation features alone are worth the switch.",
  name: "James Hartwell",
  title: "Exhibition Director",
  company: "ExCeL London",
  initials: "JH",
  bg: "#FF5F29"
},
{
  quote: "We ran our annual expo on ExpoVix this year — 400 booths, all confirmed within 72 hours of going live. The real-time floor plan is something exhibitors constantly rave about.",
  name: "Sarah Müller",
  title: "Head of Events",
  company: "Messe Frankfurt",
  initials: "SM2",
  bg: "#0D1421"
},
{
  quote: "Switching to ExpoVix cut our admin overhead by over 60%. The analytics dashboard gives our team insights we never had access to with our old system.",
  name: "Marco Fernández",
  title: "VP Operations",
  company: "Fira Barcelona",
  initials: "MF",
  bg: "#374151"
}];


export default function Testimonials() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-5">
          <p className="font-inter font-bold text-[#FF5F29] uppercase tracking-widest text-sm">TESTIMONIALS</p>
        </div>
        <h2 className="text-center font-inter font-black text-[28px] sm:text-[34px] lg:text-[40px] text-[#0D0D0D] leading-[1.1] tracking-[-0.03em] mb-16">
          Loved by the World's Top
          <br />Event Professionals
        </h2>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t) =>
          <div key={t.name} className="p-8 rounded-2xl border border-gray-100 hover:shadow-2xl hover:shadow-black/6 transition-all duration-300 bg-white flex flex-col">
              <div className="flex gap-0.5 mb-6">
                {[...Array(5)].map((_, i) =>
              <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#FF5F29">
                    <path d="M7 1L8.854 4.763L13 5.365L10 8.343L10.708 12.5L7 10.527L3.292 12.5L4 8.343L1 5.365L5.146 4.763L7 1Z" />
                  </svg>
              )}
              </div>
              <p className="text-[15px] font-inter text-gray-600 leading-[1.75] flex-1 mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-5 border-t border-gray-50">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-inter font-bold text-white flex-shrink-0" style={{ backgroundColor: t.bg }}>
                  {t.initials}
                </div>
                <div>
                  <div className="text-[14px] font-inter font-bold text-[#0D0D0D]">{t.name}</div>
                  <div className="text-[12px] font-inter text-gray-400">{t.title}, {t.company}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}