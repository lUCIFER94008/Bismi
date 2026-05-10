"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const mouseX = useSpring(0, { stiffness: 1000, damping: 50 });
  const mouseY = useSpring(0, { stiffness: 1000, damping: 50 });
  
  const outerX = useSpring(0, { stiffness: 400, damping: 30 });
  const outerY = useSpring(0, { stiffness: 400, damping: 30 });

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      outerX.set(e.clientX);
      outerY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, outerX, outerY]);

  if (!mounted) return null;

  return (
    <>
      {/* Precision Core Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-luxury-gold rounded-full pointer-events-none z-[9999] shadow-[0_0_10px_rgba(197,160,89,0.8)]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      
      {/* Elegant Trailing Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-luxury-gold/50 rounded-full pointer-events-none z-[9998] mix-blend-normal"
        style={{
          x: outerX,
          y: outerY,
          translateX: "-50%",
          translateY: "-50%",
          scale: isHovering ? 1.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      />

      {/* Luxury Golden Glow Shade */}
      <motion.div
        className="fixed top-0 left-0 w-24 h-24 bg-luxury-gold/5 rounded-full pointer-events-none z-[9997] blur-[20px]"
        style={{
          x: outerX,
          y: outerY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      
      <style dangerouslySetInnerHTML={{ __html: `
        body { cursor: none !important; }
        a, button, [role="button"], input, select, textarea { cursor: none !important; }
      `}} />
    </>
  );
};

export default CustomCursor;
