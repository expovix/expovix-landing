import { Link } from "react-router-dom";

export default function CTABanner() {
  return (
    <section className="bg-[#F5F5F5] py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white rounded-[24px] border border-gray-100 shadow-xl shadow-black/6 px-10 py-16 text-center">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF5F29]/8 border border-[#FF5F29]/20">
              <span className="w-2 h-2 rounded-full bg-[#FF5F29]" />
              <span className="font-inter font-semibold text-[#FF5F29] text-sm">Get Started Today</span>
            </div>
          </div>

          {/* Headline */}
          <h2 className="font-inter font-black text-[26px] sm:text-[34px] text-[#0D0D0D] leading-[1.1] tracking-[-0.03em] mb-4">
            The Smarter Way to Manage
            <br className="hidden sm:block" /> Exhibition Booths
          </h2>

          {/* Subtitle */}
          <p className="text-[16px] font-inter text-gray-400 mb-8 leading-relaxed">
            No contracts. No setup fees. Cancel anytime.
          </p>

          {/* CTA */}
          <a
            href="https://app.expovix.com/register"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-[#FF5F29] hover:bg-[#e54f1f] text-white font-inter font-bold text-[15px] transition-all duration-200 shadow-lg shadow-[#FF5F29]/25 group">
            
            Start Free Trial
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-200 group-hover:translate-x-0.5">
              <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <p className="mt-4 text-[12px] font-inter text-gray-400">
            Join event organizers worldwide · 14-day free trial
          </p>
        </div>
      </div>
    </section>);

}