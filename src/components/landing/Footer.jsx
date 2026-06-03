import { Link } from "react-router-dom";
import { Instagram, Linkedin, Youtube, Twitter } from "lucide-react";

export default function Footer() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#E8E8E8] border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center">
            <img
              src="https://media.base44.com/images/public/6a18c428c4c5db3afaab651b/27eb21e5e_AppIcon3.png"
              alt="ExpoVix"
              className="object-contain"
              style={{ height: 140, width: 140 }} />
          </Link>

          {/* Center links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <button onClick={() => scrollToSection("about")} className="text-sm font-inter text-gray-700 hover:text-[#FF5F29] transition-colors">
              About
            </button>
            <button onClick={() => scrollToSection("features")} className="text-sm font-inter text-gray-700 hover:text-[#FF5F29] transition-colors">
              Features
            </button>
            <button onClick={() => scrollToSection("pricing")} className="text-sm font-inter text-gray-700 hover:text-[#FF5F29] transition-colors">
              Pricing
            </button>
            <button onClick={() => scrollToSection("faq")} className="text-sm font-inter text-gray-700 hover:text-[#FF5F29] transition-colors">
              FAQ
            </button>
            <a href="#terms" className="text-sm font-inter text-gray-700 hover:text-[#FF5F29] transition-colors">
              Terms
            </a>
            <a href="#privacy" className="text-sm font-inter text-gray-700 hover:text-[#FF5F29] transition-colors">
              Privacy
            </a>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-gray-200 transition-colors">
              <Instagram size={18} className="text-[#0D0D0D]" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-gray-200 transition-colors">
              <Linkedin size={18} className="text-[#0D0D0D]" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-gray-200 transition-colors">
              <Youtube size={18} className="text-[#0D0D0D]" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-gray-200 transition-colors">
              <Twitter size={18} className="text-[#0D0D0D]" />
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="text-center text-xs font-inter text-gray-600 mt-6 pt-6 border-t border-gray-200">
          © 2026 ExpoVix. All rights reserved.
        </div>
      </div>
    </footer>
  );
}