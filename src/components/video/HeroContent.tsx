
import React from "react";
import { Play } from "lucide-react";
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

      {/* Play Button - Only show when header text is visible */}
      {showPlayButton && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300">
          <button
            onClick={onToggleVideo}
            className={`rounded-full p-4 bg-black/30 border-2 transition-all duration-300 ${
              videoPlaying 
                ? "border-white/70 hover:border-white" 
                : "border-white animate-pulse-soft hover:border-white"
            }`}
          >
            <Play
              size={24}
              className={`text-white transition-opacity ${videoPlaying ? "opacity-70" : "opacity-100"}`}
            />
          </button>
        </div>
      )}
    </div>
  );
}
