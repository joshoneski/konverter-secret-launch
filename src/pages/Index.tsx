
import VideoHero from "@/components/VideoHero";
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
      <div className="absolute top-4 left-4 z-50">
        <img 
          src="/lovable-uploads/bb7889a0-522d-402d-b504-5b144fc3f9d4.png" 
          alt="Konverter.ai Logo" 
          className="h-10 md:h-12"
        />
      </div>
      <VideoHero />
      <StatStrip />
      <CtaBar />
      <QuoteSection />
      <Footer />
    </div>
  );
}
