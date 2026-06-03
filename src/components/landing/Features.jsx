import { LayoutGrid, BarChart3, Globe, Shield, Zap, Users } from "lucide-react";

const features = [
{
  icon: LayoutGrid,
  title: "Smart Floor Plans",
  desc: "Automatically organize, resize, and update booth layouts as your event evolves in real time."
},
{
  icon: Zap,
  title: "Auto Workflows",
  desc: "Create booking rules once and let ExpoVix handle confirmations, invoices, and reminders automatically."
},
{
  icon: Users,
  title: "Multi-Portal Sync",
  desc: "Real-time updates and shared portals for organizers, exhibitors, and contractors in one place."
},
{
  icon: BarChart3,
  title: "Insights Hub",
  desc: "Clear reports on occupancy, revenue, and exhibitor engagement — generated instantly on demand."
},
{
  icon: Globe,
  title: "Easy Integrations",
  desc: "Connect to global payment gateways, government portals, and your favorite tools in minutes."
},
{
  icon: Shield,
  title: "Secure Space",
  desc: "Your data stays encrypted, SOC 2 compliant, and available with a 99.9% uptime SLA guarantee."
}];


export default function Features() {
  return (
    <section id="features" className="bg-[#E8E8E8] py-24 sm:py-32 pt-8 sm:pt-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-5">
          <p className="font-inter font-bold text-[#FF5F29] uppercase tracking-widest text-sm">CORE FEATURES</p>
        </div>
        <h2 className="text-center font-inter font-black text-[28px] sm:text-[34px] lg:text-[40px] text-[#0D0D0D] leading-[1.1] tracking-[-0.03em] mb-4">
          Everything You Need.
          <br />
          Nothing Extra.
        </h2>
        <p className="text-center text-[14px] font-inter text-gray-500 max-w-lg mx-auto mb-16 leading-relaxed">
          A tight, powerful set of features crafted to make your exhibition team faster and more focused.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) =>
          <div key={f.title} className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg hover:shadow-black/5 transition-all duration-300">
              <f.icon size={26} className="text-[#0D0D0D] mb-6" strokeWidth={1.4} />
              <h3 className="font-inter font-bold text-[17px] text-[#0D0D0D] mb-2">{f.title}</h3>
              <p className="font-inter text-[14px] text-gray-400 leading-[1.7]">{f.desc}</p>
            </div>
          )}
        </div>
      </div>
    </section>);

}