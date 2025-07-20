
import React from "react";
import { useScrollAnimationContext } from "@/components/animation/ScrollAnimationProvider";

interface HeroContentProps {
  showPlayButton: boolean;
  videoPlaying: boolean;
  onToggleVideo: () => void;
}

export default function HeroContent({
  showPlayButton,
  videoPlaying,
  onToggleVideo,
}: HeroContentProps) {
  // Get scroll animation values from context
  const {
    leftRef,
    rightRef,
    getLeftExitStyle,
    getRightExitStyle,
    scrollThreshold
  } = useScrollAnimationContext();
  
  return (
    <div className="relative h-full w-full flex flex-col">
      {/* Main Headline */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white mb-6">
            Turn Any Expert Into a Scalable AI Agents
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            The marketplace where top performers create agents, earn passive income, and users get guaranteed results.
          </p>
        </div>
      </div>
      
      {/* Split Content */}
      <div className="flex flex-col md:flex-row h-1/3">
        {/* Left Side - Creators */}
        <div 
          ref={leftRef}
          className="w-full md:w-1/2 flex items-center justify-center p-6 will-change-transform"
          style={getLeftExitStyle('left', scrollThreshold, 2)}
        >
          <div className="text-center md:text-right">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-white mb-2">
              Clone Your Secret Sauce.
            </h2>
            <p className="font-mono text-sm md:text-base text-gray-300 max-w-md ml-auto">
              Package your playbook as an AI agent
            </p>
          </div>
        </div>

        {/* Right Side - Deployers */}
        <div 
          ref={rightRef}
          className="w-full md:w-1/2 flex items-center justify-center p-6 will-change-transform"
          style={getRightExitStyle('right', scrollThreshold, 2)}
        >
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-white mb-2">
              Unleash Instant Closers.
            </h2>
            <p className="font-mono text-sm md:text-base text-gray-300 max-w-md">
              Drop in and start converting now
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
