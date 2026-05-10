"use client";

import { useEffect, useState } from "react";

const AnimatedBackground = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty("--mouse-x", `${x}%`);
      document.documentElement.style.setProperty("--mouse-y", `${y}%`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#050505]">
      {/* Cinematic Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.1]" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(212, 175, 55, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(212, 175, 55, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(circle at center, black, transparent 90%)"
        }}
      />

      {/* Floating Luxury Orbs - Optimized with CSS animations for zero-JS runtime cost */}
      <div className="absolute inset-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-luxury-gold/5 blur-[120px] animate-orb-float-1" />
        <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-luxury-gold/[0.03] blur-[150px] animate-orb-float-2" />
        <div className="absolute top-[30%] left-[20%] w-[400px] h-[400px] rounded-full bg-white/[0.02] blur-[100px] animate-orb-float-3" />
      </div>

      {/* Ambient Light Beams */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-luxury-gold to-transparent rotate-12 blur-sm" />
        <div className="absolute top-0 right-1/3 w-[1px] h-full bg-gradient-to-b from-transparent via-luxury-gold to-transparent -rotate-6 blur-md" />
      </div>

      {/* Mouse Reactive Overlay */}
      <div 
        className="absolute inset-0 opacity-40 transition-opacity duration-1000"
        style={{
          background: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(212, 175, 55, 0.08) 0%, transparent 60%)"
        }}
      />

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://res.cloudinary.com/dpmpefw2p/image/upload/v1777956639256/noise_u8p6p6.png')] bg-repeat" />
      
      <style>{`
        @keyframes orb-float-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 40px) scale(0.9); }
        }
        @keyframes orb-float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 20px) scale(1.05); }
        }
        @keyframes orb-float-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -50px) scale(0.95); }
        }
        .animate-orb-float-1 { animation: orb-float-1 25s infinite linear; }
        .animate-orb-float-2 { animation: orb-float-2 30s infinite linear; }
        .animate-orb-float-3 { animation: orb-float-3 20s infinite linear; }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;
