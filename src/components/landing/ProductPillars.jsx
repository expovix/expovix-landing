const pillars = [
{
  num: "01",
  title: "Smarter Automation",
  desc: "Automate repetitive booking tasks with intelligent rules that adapt to your workflow and increase revenue potential."
},
{
  num: "02",
  title: "Live Performance Insights",
  desc: "Get instant visibility into occupancy rates, blockers, and team efficiency across all your events simultaneously."
},
{
  num: "03",
  title: "Global Compliance",
  desc: "Built-in support for regional regulations, taxes, and local payment methods across 50+ countries worldwide."
},
{
  num: "04",
  title: "Seamless Collaboration",
  desc: "Connect your whole team — organizers, exhibitors, and contractors — in one unified, permission-scoped platform."
},
{
  num: "05",
  title: "Instant Setup",
  desc: "Go from signup to live floor plan in under 30 minutes. No training required."
},
{
  num: "06",
  title: "Mobile-First Design",
  desc: "Organizers and exhibitors get a flawless experience on any device, anywhere in the world."
}];


export default function ProductPillars() {
  return (
    <section className="bg-[#F5F5F5] py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start mb-16">
          <div>
            <p className="font-inter font-bold text-[#FF5F29] uppercase tracking-widest mb-5 text-sm">PRODUCT PILLARS</p>
            <h2 className="font-inter font-black text-[28px] sm:text-[34px] lg:text-[40px] text-[#0D0D0D] leading-[1.1] tracking-[-0.03em]">
              What Sets
              <br />ExpoVix Apart
            </h2>
          </div>
          <div className="lg:pt-20">
            <p className="text-[14px] font-inter text-gray-500 leading-[1.75]">
              ExpoVix goes beyond booth booking — offering unmatched clarity, automation, and speed for modern event teams worldwide. Built by exhibition industry veterans.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {pillars.map((p) =>
          <div key={p.num} className="group p-7 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg hover:shadow-black/4 transition-all duration-300 bg-white">
              <div className="text-[13px] font-inter font-semibold text-gray-300 mb-4 tracking-wide">{p.num}</div>
              <h3 className="font-inter font-bold text-[17px] text-[#0D0D0D] mb-2.5">{p.title}</h3>
              <p className="text-[14px] font-inter text-gray-500 leading-[1.7]">{p.desc}</p>
            </div>
          )}
        </div>
      </div>
    </section>);

}