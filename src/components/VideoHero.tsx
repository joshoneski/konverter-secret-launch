
import { useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useYouTubePlayer } from "@/hooks/useYouTubePlayer";
import VideoBackground from "@/components/video/VideoBackground";
import HeroContent from "@/components/video/HeroContent";

export default function VideoHero() {
  // Increased threshold for better text clearing before video focus
  const scrollThreshold = 250;
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Scroll animation hooks
  const { 
    ref: leftRef, 
    getExitStyle: getLeftExitStyle, 
    isScrolledPast 
  } = useScrollAnimation();
  
  const { 
    ref: rightRef, 
    getExitStyle: getRightExitStyle 
  } = useScrollAnimation();
  
  // YouTube video player hook
  const videoId = "TQMEPegEQwY";
  const { 
    iframeRef, 
    playerReady, 
    videoPlaying, 
    toggleVideo 
  } = useYouTubePlayer({
    videoId,
    scrollThreshold,
    isScrolledPast
  });

  // Check if we should show the play button and apply the overlay
  const showPlayButton = !isScrolledPast(scrollThreshold);
  const isVideoFocused = isScrolledPast(scrollThreshold);

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
      {/* Video Background with dynamic positioning */}
      <VideoBackground 
        iframeRef={iframeRef}
        videoId={videoId}
        isVideoFocused={isVideoFocused}
        showOverlay={showPlayButton}
      />

      {/* Split Hero Content - With improved exit animation */}
      <HeroContent
        showPlayButton={showPlayButton}
        videoPlaying={videoPlaying}
        onToggleVideo={toggleVideo}
        getLeftExitStyle={getLeftExitStyle}
        getRightExitStyle={getRightExitStyle}
        leftRef={leftRef}
        rightRef={rightRef}
        scrollThreshold={scrollThreshold}
      />
    </section>
  );
}
