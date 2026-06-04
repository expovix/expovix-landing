import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
{
  name: "Starter",
  price: "$249",
  period: "/month",
  desc: "For small exhibitions and first-time venue organizers.",
  features: ["Up to 300 booths per event", "3 events per year", "Basic floor plan editor", "Standard analytics", "Email support", "Exhibitor portal included"],
  highlighted: false,
  cta: "Start Free Trial"
},
{
  name: "Pro",
  price: "$499",
  period: "/month",
  desc: "For growing organizers managing multiple events worldwide.",
  features: ["Up to 600 booths per event", "10 events per year", "Advanced floor plan tools", "Real-time analytics & exports", "Priority support", "Custom branding", "API access"],
  highlighted: true,
  badge: "Most Popular",
  cta: "Start Free Trial"
},
{
  name: "Business",
  price: "$899",
  period: "/month",
  desc: "For government bodies and large-scale operators.",
  features: ["Unlimited booths", "Unlimited events", "White-label & custom domain", "Dedicated account manager", "SSO & audit trails", "Custom integrations", "SLA guarantee"],
  highlighted: false,
  cta: "Contact Sales"
}];


export default function Pricing() {
  return (
    <section id="pricing" className="bg-[#E8E8E8] py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-5">
          <p className="font-inter font-bold text-[#FF5F29] uppercase tracking-widest text-sm">PRICING</p>
        </div>
        <h2 className="text-center font-inter font-black text-[28px] sm:text-[34px] lg:text-[40px] text-[#0D0D0D] leading-[1.1] tracking-[-0.03em] mb-4">
          Scale at Your Own Pace
        </h2>
        <p className="text-center text-[14px] font-inter text-gray-500 mb-16">
          Transparent pricing. No hidden fees. Cancel anytime.
        </p>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {plans.map((plan) =>
          <div
            key={plan.name}
            className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 ${
            plan.highlighted ?
            "bg-white border-2 border-[#FF5F29] shadow-2xl shadow-[#FF5F29]/12" :
            "bg-white border border-gray-150 hover:shadow-xl hover:shadow-black/5"}`
            }>
            
              {plan.badge &&
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 rounded-full bg-[#FF5F29] text-[11px] font-inter font-bold text-white shadow-lg shadow-[#FF5F29]/30">
                    {plan.badge}
                  </span>
                </div>
            }

              <div>
                <h3 className="font-inter font-bold text-[20px] text-[#0D0D0D]">{plan.name}</h3>
                <p className="text-[13px] font-inter text-gray-400 mt-1.5 leading-snug">{plan.desc}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-inter font-black text-[48px] text-[#0D0D0D] tabular-nums tracking-[-0.04em] leading-none">{plan.price}</span>
                  <span className="text-[13px] font-inter text-gray-400 ml-1">{plan.period}</span>
                </div>
                <a
                href="https://expovix.com/register"
                className={`mt-6 block w-full py-3.5 rounded-full text-center text-[14px] font-inter font-bold transition-all duration-200 ${
                plan.highlighted ?
                "bg-[#FF5F29] hover:bg-[#e54f1f] text-white shadow-lg shadow-[#FF5F29]/20" :
                "bg-white border border-gray-200 hover:border-gray-300 text-[#0D0D0D] hover:shadow-sm"}`
                }>
                
                  {plan.cta}
                </a>
              </div>

              <div className="mt-7 pt-6 border-t border-gray-100 flex-1">
                <ul className="space-y-3">
                  {plan.features.map((f) =>
                <li key={f} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-[#FF5F29]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={9} className="text-[#FF5F29]" strokeWidth={3} />
                      </div>
                      <span className="text-[13px] font-inter text-gray-600">{f}</span>
                    </li>
                )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}