"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const PremiumBackground = () => {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<{ x: string; y: string; scale: number; duration: number; delay: number; xOffset: string }[]>([]);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  useEffect(() => {
    setMounted(true);
    const newParticles = [...Array(30)].map(() => ({
      x: Math.random() * 100 + "%",
      y: Math.random() * 100 + "%",
      scale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 8 + 7,
      delay: Math.random() * 10,
      xOffset: (Math.random() - 0.5) * 50 + "px",
    }));
    setParticles(newParticles);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#FDFBF7]">
      {/* Intense Cinematic Golden Atmosphere */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1.1, 1],
          opacity: [0.4, 0.6, 0.4],
          x: [-20, 20, -10, 0],
          y: [-10, 10, 0],
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute -top-[20%] -left-[10%] w-[120%] h-[120%] mix-blend-normal filter blur-[120px]"
        style={{
          background: "radial-gradient(circle at center, rgba(197, 160, 89, 0.08) 0%, rgba(197, 160, 89, 0.03) 40%, transparent 80%)",
        }}
      />
      
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
          x: [20, -20, 0],
          y: [10, -10, 0],
        }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute -bottom-[20%] -right-[10%] w-[100%] h-[100%] mix-blend-normal filter blur-[150px]"
        style={{
          background: "radial-gradient(circle at center, rgba(197, 160, 89, 0.1) 0%, rgba(184, 134, 11, 0.05) 50%, transparent 80%)",
        }}
      />

      {/* Central Golden Glow */}
      <motion.div
        animate={{
          opacity: [0.15, 0.3, 0.15],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full opacity-[0.25] mix-blend-overlay filter blur-[180px]"
        style={{
          background: "radial-gradient(circle, rgba(197, 160, 89, 0.05) 0%, transparent 80%)",
        }}
      />

      {/* Luxury Ambient Fog */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
      
      {/* Golden Light Waves */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.08]">
        <filter id="blur-gold">
          <feGaussianBlur stdDeviation="15" />
        </filter>
        <motion.path
          animate={{
            d: [
              "M-100,300 Q300,150 600,300 T1200,300 V1000 H-100 Z",
              "M-100,300 Q300,450 600,300 T1200,300 V1000 H-100 Z",
              "M-100,300 Q300,150 600,300 T1200,300 V1000 H-100 Z",
            ]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          fill="#C5A059"
          filter="url(#blur-gold)"
        />
      </svg>

      {/* Enhanced Floating Golden Particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0,
            x: particle.x,
            y: particle.y,
            scale: particle.scale
          }}
          animate={{ 
            opacity: [0, 0.4, 0],
            y: [null, "-30%"],
            x: [null, particle.xOffset],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
          className="absolute w-[2px] h-[2px] bg-[#FFD700] rounded-full shadow-[0_0_8px_#FFD700] blur-[0.5px]"
        />
      ))}

      {/* Luxury Vignette */}
      <div 
        className="absolute inset-0" 
        style={{
          background: "radial-gradient(circle at center, transparent 20%, rgba(197,160,89,0.05) 100%)"
        }}
      />
    </div>
  );
};

export default PremiumBackground;
