
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";

export default function QuoteSection() {
  const { ref, getParallaxStyle } = useScrollAnimation();
  const [currentQuote, setCurrentQuote] = useState(0);
  
  const testimonials = [
    {
      quote: "Konverter booked 80 demos for us in days.",
      author: "early beta user"
    },
    {
      quote: "My sales skills used to be limited by time, now I can earn unlimited with Konverter.",
      author: "growth marketer"
    },
    {
      quote: "I tried to make my own AI flows but never finished, until Konverter made it simple.",
      author: "content creator"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section 
      ref={ref}
      className="py-12 w-full bg-black parallax"
      style={getParallaxStyle(0.1)}
    >
      <div className="container max-w-5xl mx-auto px-4 text-center">
        <div className="h-12 flex items-center justify-center">
          <p 
            className="text-gray-400 text-sm font-mono transition-opacity duration-500"
            key={currentQuote}
          >
            {testimonials[currentQuote].quote} — {testimonials[currentQuote].author}
          </p>
        </div>
      </div>
    </section>
  );
}
