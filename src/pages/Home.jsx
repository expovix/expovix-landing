import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import TrustBar from "../components/landing/TrustBar";
import AboutSection from "../components/landing/AboutSection";
import WhySection from "../components/landing/WhySection";
import Features from "../components/landing/Features";
import ProductPillars from "../components/landing/ProductPillars";
import Pricing from "../components/landing/Pricing";
import Testimonials from "../components/landing/Testimonials";
import FAQ from "../components/landing/FAQ";
import CTABanner from "../components/landing/CTABanner";
import Footer from "../components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen font-inter">
      <Navbar />
      <Hero />
      <TrustBar />
      <AboutSection />
      <WhySection />
      <Features />
      <ProductPillars />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTABanner />
      <Footer />
    </div>
  );
}