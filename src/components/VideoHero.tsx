
import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function VideoHero() {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<YT.Player | null>(null);
  const { ref: leftRef, getExitStyle: getLeftExitStyle, isScrolledPast } = useScrollAnimation();
  const { ref: rightRef, getExitStyle: getRightExitStyle } = useScrollAnimation();
  
  const scrollThreshold = 150; // Adjust this value to control when text exits
  
  const toggleVideo = () => {
    if (playerRef.current) {
      if (videoPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      
      setVideoPlaying(!videoPlaying);
    }
  };

  useEffect(() => {
    // Load YouTube API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    
    // Initialize player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      if (iframeRef.current) {
        playerRef.current = new YT.Player(iframeRef.current, {
          events: {
            onStateChange: (event) => {
              setVideoPlaying(event.data === YT.PlayerState.PLAYING);
            }
          }
        });
      }
    };
    
    // Check if YouTube API is already loaded
    if (window.YT && window.YT.Player && iframeRef.current) {
      playerRef.current = new YT.Player(iframeRef.current, {
        events: {
          onStateChange: (event) => {
            setVideoPlaying(event.data === YT.PlayerState.PLAYING);
          }
        }
      });
    }
    
    // Cleanup
    return () => {
      window.onYouTubeIframeAPIReady = null;
    };
  }, []);

  useEffect(() => {
    // Play video automatically when scrolled past threshold
    if (isScrolledPast(scrollThreshold)) {
      if (playerRef.current && !videoPlaying) {
        playerRef.current.playVideo();
      }
    }
  }, [isScrolledPast, scrollThreshold, videoPlaying]);

  // Check if we should show the play button and apply the overlay
  const showPlayButton = !isScrolledPast(scrollThreshold);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <iframe
          ref={iframeRef}
          className="min-h-full min-w-full object-cover w-full h-full"
          src="https://www.youtube.com/embed/YVuJIGPX5zY?enablejsapi=1&controls=0&showinfo=0&rel=0&autoplay=0&loop=1&playlist=YVuJIGPX5zY&mute=1"
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div 
          className="absolute inset-0 bg-gradient-to-b transition-opacity duration-500"
          style={{
            opacity: showPlayButton ? 1 : 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.7), rgba(0,0,0,0.9))'
          }}
        ></div>
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

        {/* Play Button - Only show when header text is visible */}
        {showPlayButton && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300">
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
        )}
      </div>
    </section>
  );
}
