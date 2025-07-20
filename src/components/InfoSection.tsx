import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function InfoSection() {
  const { ref, getParallaxStyle } = useScrollAnimation();
  
  return (
    <section 
      ref={ref}
      className="py-16 w-full bg-black"
      style={getParallaxStyle(0.05)}
    >
      <div className="container max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
          Turn Any Expert Into a Scalable AI Agents
        </h2>
        <p className="text-lg md:text-xl text-white/80 leading-relaxed">
          The marketplace where top performers create agents, earn passive income, and users get guaranteed results.
        </p>
      </div>
    </section>
  );
}