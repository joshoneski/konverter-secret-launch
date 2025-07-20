
import Navbar from "@/components/Navbar";
import SimpleHero from "@/components/SimpleHero";
import HowItWorks from "@/components/HowItWorks";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import SocialProof from "@/components/SocialProof";
import StatStrip from "@/components/StatStrip";
import AboutSection from "@/components/AboutSection";
import QuoteSection from "@/components/QuoteSection";
import Footer from "@/components/Footer";
import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    // Update the page title
    document.title = "Konverter.ai | Built for closers & creators";
    
    // Ensure scroll to top when the page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <SimpleHero />
      <HowItWorks />
      <CapabilitiesSection />
      <SocialProof />
      <StatStrip />
      <AboutSection />
      <QuoteSection />
      <Footer />
    </div>
  );
}
