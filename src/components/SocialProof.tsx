
import { CheckCircle, Users, Zap, DollarSign } from "lucide-react";
import CTAButtons from "@/components/CTAButtons";

export default function SocialProof() {
  const stats = [
    {
      icon: Users,
      number: "2,500+",
      label: "Active Users",
      description: "Businesses using AI agents"
    },
    {
      icon: Zap,
      number: "500K+",
      label: "Conversations",
      description: "Handled by our AI agents"
    },
    {
      icon: DollarSign,
      number: "$12M+",
      label: "Revenue Generated",
      description: "For our users this year"
    },
    {
      icon: CheckCircle,
      number: "76%",
      label: "Avg. Conversion Boost",
      description: "Within first 30 days"
    }
  ];

  const features = [
    "No coding required - launch in 3 clicks",
    "24/7 automated follow-ups and closing",
    "Built-in CRM and analytics dashboard", 
    "Expert-created playbooks and strategies",
    "Revenue sharing for knowledge creators",
    "Enterprise-grade security and compliance"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-blue-400" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold mb-1">
                  {stat.label}
                </div>
                <p className="text-gray-400 text-sm">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
        
        {/* Features List */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Everything you need to succeed
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
