import { Users, Bot, DollarSign, Zap, Target, TrendingUp } from "lucide-react";
import CTAButtons from "@/components/CTAButtons";

export default function HowItWorks() {
  const steps = [
    {
      icon: Users,
      title: "Expert Creates",
      description: "Top performers upload their proven playbooks and strategies",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Bot,
      title: "AI Learns",
      description: "Our platform converts expertise into intelligent AI agents",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Zap,
      title: "You Deploy",
      description: "Launch your chosen agent in 3 clicks - no code required",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Target,
      title: "Agent Works",
      description: "AI handles emails, calls, follow-ups, and closing deals",
      color: "from-green-500 to-green-600"
    },
    {
      icon: TrendingUp,
      title: "Results Flow",
      description: "Watch conversions increase while you focus on growth",
      color: "from-red-500 to-red-600"
    },
    {
      icon: DollarSign,
      title: "Everyone Wins",
      description: "You get results, experts earn royalties, success scales",
      color: "from-yellow-500 to-yellow-600"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From expert knowledge to automated results in minutes, not months
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
