
import CTAButtons from "@/components/CTAButtons";
import StatStrip from "@/components/StatStrip";

export default function SimpleHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black pt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      </div>
      
      <div className="relative z-10 container max-w-6xl mx-auto px-4 text-center">
        {/* Main Headline */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight text-white mb-8">
            Turn Any Expert Into 
            <span className="block text-transparent bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text">
              Scalable AI Agents
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-4">
            The marketplace where top performers create agents, earn passive income, and users get guaranteed results.
          </p>
        </div>
        
        {/* Stats Strip */}
        <div className="mt-16 mb-20">
          <StatStrip />
        </div>
        
        {/* Split Value Props */}
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div className="text-center md:text-right">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Clone Your Secret Sauce
            </h2>
            <p className="text-gray-300 text-lg">
              Package your playbook as an AI agent and earn passive income
            </p>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Unleash Instant Closers
            </h2>
            <p className="text-gray-300 text-lg">
              Drop in expert-built agents and start converting now
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
