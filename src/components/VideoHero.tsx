
import { useRef } from "react";
import { useYouTubePlayer } from "@/hooks/useYouTubePlayer";
import VideoBackground from "@/components/video/VideoBackground";
import HeroContent from "@/components/video/HeroContent";
import { ScrollAnimationProvider } from "@/components/animation/ScrollAnimationProvider";

export default function VideoHero() {
  const scrollThreshold = 250;
  const heroRef = useRef<HTMLDivElement>(null);
  
  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
      <ScrollAnimationProvider scrollThreshold={scrollThreshold}>
        <VideoHeroContent />
      </ScrollAnimationProvider>
    </section>
  );
}

// Inner component that consumes the scroll animation context
function VideoHeroContent() {
  const { 
    isScrolledPast, 
    scrollThreshold 
  } = useScrollAnimationContext();
  
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
    <>
      {/* Video Background with dynamic positioning */}
      <VideoBackground 
        iframeRef={iframeRef}
        videoId={videoId}
        isVideoFocused={isVideoFocused}
        showOverlay={showPlayButton}
      />

      {/* Split Hero Content */}
      <HeroContent
        showPlayButton={showPlayButton}
        videoPlaying={videoPlaying}
        onToggleVideo={toggleVideo}
      />
    </>
  );
}

// Import at the top of the file
import { useScrollAnimationContext } from "@/components/animation/ScrollAnimationProvider";
