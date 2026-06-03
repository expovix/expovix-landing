import { useState } from "react";
import { ChevronRight } from "lucide-react";

const faqs = [
{
  q: "What exactly is ExpoVix?",
  a: "ExpoVix is a modern, cloud-based platform for managing exhibition booth bookings. It replaces spreadsheets, emails, and legacy tools with a unified system for floor plans, exhibitor booking, payments, and analytics."
},
{
  q: "Do I need technical skills to use ExpoVix?",
  a: "Not at all. ExpoVix is designed for event organizers, not developers. Most teams go live within 30 minutes. Our onboarding flow walks you through every step, and support is always available."
},
{
  q: "Can I import my existing floor plan?",
  a: "Yes. You can upload a CAD file, PDF, or image of your venue and our smart editor converts it into an interactive, bookable floor plan in minutes."
},
{
  q: "How does booth booking work for exhibitors?",
  a: "Exhibitors receive a branded booking link. They browse the live floor plan, select an available booth, and complete payment instantly — no account required."
},
{
  q: "What happens if I exceed my booth limit?",
  a: "You'll be notified before reaching your plan's limit. You can upgrade your plan at any time with instant access to higher limits — no downtime, no data loss."
},
{
  q: "Do you offer customer support?",
  a: "All plans include email support. Pro plans get priority response times, and Business plan customers receive a dedicated account manager and guaranteed SLA."
}];


export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="bg-[#F5F5F5] py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-6">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#FF5F29]" />
            <span className="font-inter font-semibold text-gray-600 text-sm">FAQ</span>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-center font-inter font-black text-[28px] sm:text-[34px] lg:text-[40px] text-[#0D0D0D] leading-[1.1] tracking-[-0.03em] mb-12">
          Frequently Asked Questions
        </h2>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <button
                key={i}
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full text-left bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                
                <div className="flex items-center justify-between px-6 py-5">
                  <span className="font-inter font-semibold text-[15px] text-[#0D0D0D] pr-4">{faq.q}</span>
                  <ChevronRight
                    size={18}
                    className="flex-shrink-0 text-gray-400 transition-transform duration-300"
                    style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }} />
                  
                </div>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: isOpen ? 200 : 0 }}>
                  
                  <p className="px-6 pb-5 text-[14px] font-inter text-gray-500 leading-[1.75]">
                    {faq.a}
                  </p>
                </div>
              </button>);

          })}
        </div>
      </div>
    </section>);

}