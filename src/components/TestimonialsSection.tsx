
import { Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Konverter booked 80 qualified demos in the first week. Our sales team went from overwhelmed to optimized.",
      author: "Sarah Chen",
      role: "VP Sales, TechFlow",
      rating: 5,
      result: "80 demos in 7 days"
    },
    {
      quote: "I uploaded my sales playbook and now earn $3K monthly while my AI agent closes deals 24/7. Game changer.",
      author: "Marcus Rodriguez",
      role: "Sales Expert & Creator",
      rating: 5,
      result: "$3K monthly passive income"
    },
    {
      quote: "Tried building our own AI flows for months. Konverter had us live and converting in one afternoon.",
      author: "Jamie Park",
      role: "Marketing Director, GrowthCo",
      rating: 5,
      result: "Live in 1 afternoon"
    },
    {
      quote: "My conversion rate jumped 76% in the first month. The AI literally never sleeps, never takes breaks.",
      author: "Alex Thompson",
      role: "Founder, StartupXYZ",
      rating: 5,
      result: "+76% conversions"
    },
    {
      quote: "As a sales coach, creating an AI version of myself was brilliant. Now I help hundreds simultaneously.",
      author: "Lisa Wang",
      role: "Sales Coach & Creator",
      rating: 5,
      result: "Helping 100+ clients"
    },
    {
      quote: "The ROI is insane. $500 monthly fee, $15K additional revenue. Do the math.",
      author: "David Kim",
      role: "E-commerce Owner",
      rating: 5,
      result: "30x ROI"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Real Results from Real Users
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands who've transformed their business with AI agents
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="group">
              <div className="bg-gray-50 rounded-2xl p-8 h-full hover:bg-gray-100 transition-all duration-300 border border-gray-200">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <Quote className="w-8 h-8 text-gray-400 mb-4" />
                
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-gray-600">
                        {testimonial.role}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">
                        {testimonial.result}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-8">Trusted by 2,500+ businesses worldwide</p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="w-24 h-8 bg-gray-300 rounded"></div>
            <div className="w-20 h-8 bg-gray-300 rounded"></div>
            <div className="w-28 h-8 bg-gray-300 rounded"></div>
            <div className="w-22 h-8 bg-gray-300 rounded"></div>
            <div className="w-26 h-8 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
