
import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function VideoHero() {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref: leftRef, getExitStyle: getLeftExitStyle, isScrolledPast } = useScrollAnimation();
  const { ref: rightRef, getExitStyle: getRightExitStyle } = useScrollAnimation();
  
  const scrollThreshold = 150; // Adjust this value to control when text exits
  
  const toggleVideo = () => {
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setVideoPlaying(!videoPlaying);
    }
  };

  useEffect(() => {
    // Play video automatically when scrolled past threshold
    if (isScrolledPast(scrollThreshold)) {
      if (videoRef.current && !videoPlaying) {
        videoRef.current.play();
        setVideoPlaying(true);
      }
    } else if (videoPlaying && videoRef.current) {
      // Optionally pause when scrolling back up
      // videoRef.current.pause();
      // setVideoPlaying(false);
    }
  }, [isScrolledPast, scrollThreshold, videoPlaying]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="min-h-full min-w-full object-cover"
          autoPlay={false}
          loop
          muted
          playsInline
        >
          <source 
            src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90"></div>
      </div>

      {/* Split Hero Content */}
      <div className="relative h-full w-full flex flex-col md:flex-row">
        {/* Left Side - Creators */}
        <div 
          ref={leftRef}
          className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-6 will-change-transform"
          style={getLeftExitStyle('left', scrollThreshold)}
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
          style={getRightExitStyle('right', scrollThreshold)}
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

        {/* Play Button */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <button
            onClick={toggleVideo}
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
      </div>
    </section>
  );
}
