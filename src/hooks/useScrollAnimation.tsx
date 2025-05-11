
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

  return { ref, scrollY, getParallaxStyle };
}
