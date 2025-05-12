
import { useEffect, useRef, useState } from "react";

type UseYouTubePlayerProps = {
  videoId: string;
  autoScrollPlayback?: boolean;
  scrollThreshold?: number;
  isScrolledPast: (threshold: number) => boolean;
  autoPlayOnLoad?: boolean;
};

export function useYouTubePlayer({
  videoId,
  autoScrollPlayback = false,
  scrollThreshold = 250,
  isScrolledPast,
  autoPlayOnLoad = true
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
                if (autoPlayOnLoad) {
                  event.target.playVideo();
                  setVideoPlaying(true);
                }
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
                if (autoPlayOnLoad) {
                  event.target.playVideo();
                  setVideoPlaying(true);
                }
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
  }, [autoPlayOnLoad]);

  // We're not including the scroll-based effect anymore

  return {
    iframeRef,
    playerReady,
    videoPlaying,
    toggleVideo
  };
}
