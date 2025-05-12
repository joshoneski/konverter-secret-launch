
import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function VideoHero() {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<YT.Player | null>(null);
  const { ref: leftRef, getExitStyle: getLeftExitStyle, isScrolledPast } = useScrollAnimation();
  const { ref: rightRef, getExitStyle: getRightExitStyle } = useScrollAnimation();
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Increased threshold for better text clearing before video focus
  const scrollThreshold = 250; 
  
  const toggleVideo = () => {
    if (playerRef.current && playerReady) {
      if (videoPlaying) {
        playerRef.current.pauseVideo();
        setVideoPlaying(false);
      } else {
        playerRef.current.playVideo();
        setVideoPlaying(true);
      }
    } else {
      console.log("Player not ready yet");
    }
  };

  // Manage video position based on scroll
  const getVideoStyle = () => {
    if (!isScrolledPast(scrollThreshold)) {
      // When header is visible, video is in background position
      return {
        transform: 'scale(1.0)',
        filter: 'brightness(0.5)',
        transition: 'all 0.6s ease-out'
      };
    } else {
      // When scrolled past threshold, video moves to focus position
      return {
        transform: 'scale(1.1)',
        filter: 'brightness(1)',
        transition: 'all 0.6s ease-out'
      };
    }
  };

  useEffect(() => {
    // Create a safety flag to handle component unmount
    let isMounted = true;

    // Define YouTube API callback function first
    window.onYouTubeIframeAPIReady = () => {
      console.log("YouTube API ready");
      if (iframeRef.current && isMounted) {
        playerRef.current = new YT.Player(iframeRef.current, {
          events: {
            onReady: (event) => {
              console.log("Player ready");
              if (isMounted) {
                setPlayerReady(true);
              }
            },
            onStateChange: (event) => {
              if (isMounted) {
                setVideoPlaying(event.data === YT.PlayerState.PLAYING);
              }
            }
          }
        });
      }
    };
    
    // Load YouTube API
    if (!window.YT) {
      console.log("Loading YouTube API");
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    } else {
      console.log("YouTube API already loaded");
      // If YouTube API is already loaded, initialize the player directly
      if (iframeRef.current && isMounted) {
        playerRef.current = new YT.Player(iframeRef.current, {
          events: {
            onReady: (event) => {
              console.log("Player ready (direct init)");
              if (isMounted) {
                setPlayerReady(true);
              }
            },
            onStateChange: (event) => {
              if (isMounted) {
                setVideoPlaying(event.data === YT.PlayerState.PLAYING);
              }
            }
          }
        });
      }
    }
    
    // Cleanup
    return () => {
      isMounted = false;
      window.onYouTubeIframeAPIReady = null;
      if (playerRef.current) {
        // Clean up player if needed
        playerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // Only set up scroll-based playback when player is ready
    if (!playerReady) return;
    
    // Play video automatically when scrolled past threshold
    const handleScrollBasedPlayback = () => {
      if (!playerRef.current || !playerReady) return;
      
      try {
        if (isScrolledPast(scrollThreshold)) {
          if (!videoPlaying) {
            console.log("Auto-playing video due to scroll");
            playerRef.current.playVideo();
            setVideoPlaying(true);
          }
        } else {
          if (videoPlaying) {
            console.log("Auto-pausing video due to scroll");
            playerRef.current.pauseVideo();
            setVideoPlaying(false);
          }
        }
      } catch (error) {
        console.error("Error handling scroll-based playback:", error);
      }
    };

    // Initial check
    handleScrollBasedPlayback();

    // Add scroll listener for continuous checking
    window.addEventListener("scroll", handleScrollBasedPlayback, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScrollBasedPlayback);
    };
  }, [isScrolledPast, scrollThreshold, videoPlaying, playerReady]);

  // Check if we should show the play button and apply the overlay
  const showPlayButton = !isScrolledPast(scrollThreshold);

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
      {/* Video Background - Now with dynamic positioning */}
      <div 
        className="absolute inset-0 transition-all duration-500 ease-out"
        style={getVideoStyle()}
      >
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
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: showPlayButton ? 1 : 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.7), rgba(0,0,0,0.9))'
          }}
        ></div>
      </div>

      {/* Split Hero Content - With improved exit animation */}
      <div className="relative h-full w-full flex flex-col md:flex-row">
        {/* Left Side - Creators */}
        <div 
          ref={leftRef}
          className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-6 will-change-transform"
          style={getLeftExitStyle('left', scrollThreshold, 2)} // Increased exit speed
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
          style={getRightExitStyle('right', scrollThreshold, 2)} // Increased exit speed
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
