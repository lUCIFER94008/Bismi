"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const BackgroundEffects = () => {
  const [particles, setParticles] = useState<{ x: string; y: string; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const newParticles = [...Array(20)].map(() => ({
      x: Math.random() * 100 + "%",
      y: Math.random() * 100 + "%",
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Luxury Grid */}
      <div className="absolute inset-0 grid-luxury opacity-20" />
      
      {/* Animated Gradient Orbs */}
      <motion.div 
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-luxury-gold/10 rounded-full blur-[120px]"
      />
      
      <motion.div 
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-luxury-gold/5 rounded-full blur-[150px]"
      />

      <motion.div 
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)]"
      />

      {/* Subtle Particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0,
            x: particle.x,
            y: particle.y,
          }}
          animate={{
            opacity: [0, 0.5, 0],
            y: ["-10%", "110%"],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear"
          }}
          className="absolute w-1 h-1 bg-luxury-gold/30 rounded-full"
        />
      ))}
    </div>
  );
};

export default BackgroundEffects;
