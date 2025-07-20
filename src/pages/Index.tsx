
import Navbar from "@/components/Navbar";
import VideoHero from "@/components/VideoHero";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import StatStrip from "@/components/StatStrip";
import CtaBar from "@/components/CtaBar";
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
      <VideoHero />
      <CapabilitiesSection />
      <StatStrip />
      <CtaBar />
      <QuoteSection />
      <Footer />
    </div>
  );
}
