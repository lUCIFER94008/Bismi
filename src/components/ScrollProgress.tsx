"use client";

import { useEffect, useState } from "react";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setProgress(scrolled);
    };

    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[100] bg-white/5">
      <div 
        className="h-full bg-luxury-gold shadow-[0_0_10px_rgba(212,175,55,0.8)] transition-all duration-100 ease-out" 
        style={{ width: `${progress}%` }} 
      />
    </div>
  );
};

export default ScrollProgress;
