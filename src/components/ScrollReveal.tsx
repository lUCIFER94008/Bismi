"use client";

import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
  stagger?: boolean;
}

const ScrollReveal = ({ 
  children, 
  className = "",
}: ScrollRevealProps) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;
