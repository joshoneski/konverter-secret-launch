
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface VideoBackgroundProps {
  iframeRef: React.RefObject<HTMLIFrameElement>;
  videoId: string;
  isVideoFocused: boolean;
  showOverlay: boolean;
}

export default function VideoBackground({ 
  iframeRef, 
  videoId, 
  isVideoFocused, 
  showOverlay 
}: VideoBackgroundProps) {
  const videoStyle = {
    transform: isVideoFocused ? 'scale(1.1)' : 'scale(1.0)',
    filter: isVideoFocused ? 'brightness(1)' : 'brightness(0.5)',
    transition: 'all 0.6s ease-out'
  };

  const overlayStyle = {
    opacity: showOverlay ? 1 : 0,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.7), rgba(0,0,0,0.9))',
    transition: 'opacity 0.5s'
  };

  return (
    <div 
      className="absolute inset-0 transition-all duration-500 ease-out"
      style={videoStyle}
    >
      <iframe
        ref={iframeRef}
        className="min-h-full min-w-full object-cover w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=0&showinfo=0&rel=0&autoplay=1&loop=1&playlist=${videoId}&mute=1`}
        title="YouTube video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div 
        className="absolute inset-0 transition-opacity duration-500"
        style={overlayStyle}
      ></div>
    </div>
  );
}
