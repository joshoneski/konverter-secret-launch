
import { useRef } from "react";
import { useYouTubePlayer } from "@/hooks/useYouTubePlayer";
import VideoBackground from "@/components/video/VideoBackground";
import HeroContent from "@/components/video/HeroContent";
import { ScrollAnimationProvider } from "@/components/animation/ScrollAnimationProvider";
import { useScrollAnimationContext } from "@/components/animation/ScrollAnimationProvider";

export default function VideoHero() {
  const scrollThreshold = 250;
  const heroRef = useRef<HTMLDivElement>(null);
  
  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden pt-16">
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
    videoPlaying
  } = useYouTubePlayer({
    videoId,
    scrollThreshold,
    isScrolledPast,
    autoPlayOnLoad: true,
    autoScrollPlayback: false // Disable scroll-based playback control
  });

  // Check if we should apply the overlay
  const isVideoFocused = isScrolledPast(scrollThreshold);
  const showOverlay = !isScrolledPast(scrollThreshold);

  return (
    <>
      {/* Video Background with dynamic positioning */}
      <VideoBackground 
        iframeRef={iframeRef}
        videoId={videoId}
        isVideoFocused={isVideoFocused}
        showOverlay={showOverlay}
      />

      {/* Split Hero Content */}
      <HeroContent
        showPlayButton={false}
        videoPlaying={videoPlaying}
        onToggleVideo={() => {}}
      />
    </>
  );
}
