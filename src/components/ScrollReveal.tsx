"use client";

import { motion } from "framer-motion";
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
  direction = "up", 
  delay = 0, 
  duration = 0.8,
  className = "",
  stagger = false
}: ScrollRevealProps) => {
  const directions = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 }
  };

  const initial = { 
    opacity: 0, 
    ...directions[direction] 
  };

  const containerVariants = {
    hidden: initial,
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
        transition: {
          duration,
          delay,
          staggerChildren: stagger ? 0.1 : 0,
          ease: [0.21, 0.47, 0.32, 0.98] as any
        }
    }
  };

  const itemVariants = {
    hidden: initial,
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, ease: [0.21, 0.47, 0.32, 0.98] as any }
    }
  };

  return (
    <motion.div
      variants={stagger ? containerVariants : itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
