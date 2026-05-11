"use client";

import { useEffect, useState } from "react";
import { animate } from "framer-motion";

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

const AnimatedCounter = ({ from = 0, to, duration = 1.5, suffix = "", className = "" }: AnimatedCounterProps) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    // Simple mount animation instead of scroll-triggered
    const controls = animate(from, to, {
      duration,
      onUpdate(value) {
        setCount(Math.floor(value));
      },
      ease: "easeOut"
    });
    return () => controls.stop();
  }, [from, to, duration]);

  return (
    <span className={className}>
      {count}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
