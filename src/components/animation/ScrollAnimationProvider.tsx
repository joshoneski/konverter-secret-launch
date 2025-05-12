
import React, { createContext, useContext, ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// Create a context to share scroll animation data with children
interface ScrollAnimationContextType {
  leftRef: React.RefObject<HTMLDivElement>;
  rightRef: React.RefObject<HTMLDivElement>;
  getLeftExitStyle: (direction: 'left' | 'right', threshold: number, speedMultiplier: number) => React.CSSProperties;
  getRightExitStyle: (direction: 'left' | 'right', threshold: number, speedMultiplier: number) => React.CSSProperties;
  isScrolledPast: (threshold: number) => boolean;
  scrollThreshold: number;
}

const ScrollAnimationContext = createContext<ScrollAnimationContextType | null>(null);

interface ScrollAnimationProviderProps {
  children: ReactNode;
  scrollThreshold?: number;
}

export function ScrollAnimationProvider({ 
  children, 
  scrollThreshold = 250 
}: ScrollAnimationProviderProps) {
  // Use our existing scroll animation hook
  const { 
    ref: leftRef, 
    getExitStyle: getLeftExitStyle, 
    isScrolledPast 
  } = useScrollAnimation();
  
  const { 
    ref: rightRef, 
    getExitStyle: getRightExitStyle 
  } = useScrollAnimation();

  // Values to provide to children
  const value = {
    leftRef,
    rightRef,
    getLeftExitStyle,
    getRightExitStyle,
    isScrolledPast,
    scrollThreshold
  };

  return (
    <ScrollAnimationContext.Provider value={value}>
      {children}
    </ScrollAnimationContext.Provider>
  );
}

// Custom hook for consuming the scroll animation context
export function useScrollAnimationContext() {
  const context = useContext(ScrollAnimationContext);
  if (!context) {
    throw new Error('useScrollAnimationContext must be used within a ScrollAnimationProvider');
  }
  return context;
}
