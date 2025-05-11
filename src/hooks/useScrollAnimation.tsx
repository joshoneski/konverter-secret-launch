
import { useEffect, useState, useRef } from "react";

export function useScrollAnimation() {
  const [scrollY, setScrollY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getParallaxStyle = (factor: number = 0.2) => {
    if (!ref.current) return {};
    const rect = ref.current.getBoundingClientRect();
    const elementY = rect.top + scrollY;
    const elementMiddle = elementY + rect.height / 2;
    const viewportMiddle = scrollY + window.innerHeight / 2;
    const distanceFromMiddle = elementMiddle - viewportMiddle;
    
    return {
      transform: `translateY(${-distanceFromMiddle * factor}px)`,
    };
  };

  // Enhanced function for text exit animations with speed multiplier
  const getExitStyle = (direction: 'left' | 'right', threshold: number = 100, speedMultiplier: number = 1, maxDistance: number = 1000) => {
    // Calculate how much to move based on scroll position
    const scrollProgress = Math.min(1, scrollY / threshold);
    const translateDistance = scrollProgress * maxDistance * speedMultiplier;
    
    // Calculate opacity based on scroll (fade out as it exits)
    const opacity = Math.max(0, 1 - scrollProgress * 2);

    return {
      transform: direction === 'left' 
        ? `translateX(-${translateDistance}px)` 
        : `translateX(${translateDistance}px)`,
      opacity: opacity,
      transition: 'all 0.2s ease-out',
    };
  };

  // Check if we've scrolled past the threshold
  const isScrolledPast = (threshold: number = 100) => {
    return scrollY > threshold;
  };

  return { ref, scrollY, getParallaxStyle, getExitStyle, isScrolledPast };
}
