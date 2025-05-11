
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function QuoteSection() {
  const { ref, getParallaxStyle } = useScrollAnimation();
  
  return (
    <section 
      ref={ref}
      className="py-12 w-full bg-black parallax"
      style={getParallaxStyle(0.1)}
    >
      <div className="container max-w-5xl mx-auto px-4 text-center">
        <p className="text-gray-400 text-sm font-mono">
          "Konverter booked 80 demos for us in days." — early beta user
        </p>
      </div>
    </section>
  );
}
