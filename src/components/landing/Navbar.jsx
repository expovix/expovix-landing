import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#E8E8E8] shadow-sm">
      <div className="max-w-7xl mx-auto px-8 h-[100px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center">
          <img
            src="/assets/expovix_primary_logo_transparent.png"
            alt="ExpoVix"
            className="object-contain"
            style={{ height: 140, width: 140 }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'inline';
            }}
          />
          <span style={{display: 'none', fontFamily: 'Inter,sans-serif', fontWeight: 900, fontSize: '24px', color: '#FF5F29'}}>ExpoVix</span>
        </Link>

        {/* Center Nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
          { label: "About Us", id: "about" },
          { label: "Why ExpoVix", id: "why" },
          { label: "Features", id: "features" },
          { label: "Pricing", id: "pricing" }].
          map((l) =>
          <button
            key={l.label}
            onClick={() => scrollTo(l.id)}
            className="text-[16px] font-inter font-medium hover:text-[#0D0D0D] transition-colors text-[hsl(var(--foreground))]">
              {l.label}
            </button>
          )}
        </div>

        {/* CTA */}
        <div className="hidden md:flex">
          <a
            href="https://expovix.com/register"
            className="px-7 py-2.5 rounded-full bg-[#FF5F29] hover:bg-[#e54f1f] text-white font-inter font-semibold text-[14px] transition-all duration-200">
            Get Started
          </a>
        </div>

        <button className="md:hidden text-[#0D0D0D]" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open &&
      <div className="md:hidden bg-[#E8E8E8] border-t border-black/5 px-6 pb-5 pt-3 space-y-3">
          {[
        { label: "About Us", id: "about" },
        { label: "Why ExpoVix", id: "why" },
        { label: "Features", id: "features" },
        { label: "Pricing", id: "pricing" }].
        map((l) =>
        <button key={l.label} onClick={() => scrollTo(l.id)} className="block text-[14px] font-inter text-gray-600 py-1">
              {l.label}
            </button>
        )}
          <a href="https://expovix.com/register" className="block text-center py-3 rounded-full bg-[#FF5F29] text-white font-inter font-semibold text-[14px]">
            Get Started
          </a>
        </div>
      }
    </nav>);

}