
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
    <div className="relative h-full w-full flex flex-col md:flex-row">
      {/* Left Side - Creators */}
      <div 
        ref={leftRef}
        className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-6 will-change-transform"
        style={getLeftExitStyle('left', scrollThreshold, 2)}
      >
        <div className="text-center md:text-right">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white mb-2">
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
        className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-6 will-change-transform"
        style={getRightExitStyle('right', scrollThreshold, 2)}
      >
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white mb-2">
            Unleash Instant Closers.
          </h2>
          <p className="font-mono text-sm md:text-base text-gray-300 max-w-md">
            Drop in and start converting now
          </p>
        </div>
      </div>
    </div>
  );
}
