
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function StatStrip() {
  const { ref, getParallaxStyle } = useScrollAnimation();
  
  const stats = [
    "3-click launch",
    "+76% conversions",
    "Earn while you sleep"
  ];
  
  return (
    <section 
      ref={ref}
      className="py-10 w-full bg-black border-y border-gray-800 parallax"
      style={getParallaxStyle(0.05)}
    >
      <div className="container max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="font-mono text-lg md:text-xl text-white opacity-90">
                {stat}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
