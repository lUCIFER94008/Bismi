"use client";

import { motion } from "framer-motion";
import { ReactNode, memo } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
  stagger?: boolean;
}

const ScrollReveal = memo(({ 
  children, 
  direction = "up", 
  delay = 0, 
  duration = 0.4,
  className = "",
}: ScrollRevealProps) => {
  const directions = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 }
  };

  const initial = { 
    opacity: 0, 
    ...directions[direction] 
  };

  return (
    <motion.div
      initial={initial}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.33, 1, 0.68, 1] // Fast ease-out
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
});

ScrollReveal.displayName = "ScrollReveal";

export default ScrollReveal;
