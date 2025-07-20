import { Mail, Phone, PenTool, Target, TrendingUp, DollarSign } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function CapabilitiesSection() {
  const { ref, getParallaxStyle } = useScrollAnimation();
  
  const capabilities = [
    {
      icon: Mail,
      title: "Email",
      description: "Craft personalized outreach campaigns"
    },
    {
      icon: Phone,
      title: "Call",
      description: "Handle phone conversations naturally"
    },
    {
      icon: PenTool,
      title: "Write Marketing Copy",
      description: "Generate compelling sales content"
    },
    {
      icon: Target,
      title: "Strategies", 
      description: "Develop winning business strategies"
    },
    {
      icon: TrendingUp,
      title: "Manage Campaigns",
      description: "Optimize and scale marketing efforts"
    },
    {
      icon: DollarSign,
      title: "Get Paid",
      description: "Process payments and close deals"
    }
  ];

  return (
    <section 
      id="features"
      ref={ref}
      className="py-20 w-full bg-black/50 backdrop-blur-sm"
      style={getParallaxStyle(0.03)}
    >
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            AI Agents That Actually Work
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Deploy intelligent agents that handle every aspect of your business operations
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <div 
                key={index}
                className="group text-center hover-scale"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2 text-sm md:text-base">
                  {capability.title}
                </h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  {capability.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}