
import { useEffect, useRef, useState } from "react";

type UseYouTubePlayerProps = {
  videoId: string;
  autoScrollPlayback?: boolean;
  scrollThreshold?: number;
  isScrolledPast: (threshold: number) => boolean;
};

export function useYouTubePlayer({
  videoId,
  autoScrollPlayback = true,
  scrollThreshold = 250,
  isScrolledPast
}: UseYouTubePlayerProps) {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<YT.Player | null>(null);

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
    // Only set up scroll-based playback when player is ready and if autoScrollPlayback is enabled
    if (!playerReady || !autoScrollPlayback) return;
    
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
  }, [isScrolledPast, scrollThreshold, videoPlaying, playerReady, autoScrollPlayback]);

  return {
    iframeRef,
    playerReady,
    videoPlaying,
    toggleVideo
  };
}
