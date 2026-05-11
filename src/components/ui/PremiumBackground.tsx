"use client";

import { useEffect, useState, memo } from "react";

const PremiumBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#FDFBF7]">
      {/* GPU Optimized Animated Atmosphere - Using CSS keyframes for zero CPU impact */}
      <style jsx>{`
        @keyframes drift {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(2%, 2%) scale(1.05); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        .animate-drift {
          animation: drift 20s infinite ease-in-out;
        }
        .animate-pulse-slow {
          animation: pulse-slow 15s infinite ease-in-out;
        }
      `}</style>

      {/* Intense Cinematic Golden Atmosphere */}
      <div
        className="absolute -top-[20%] -left-[10%] w-[120%] h-[120%] mix-blend-normal filter blur-[80px] opacity-[0.35] animate-drift"
        style={{
          background: "radial-gradient(circle at center, rgba(197, 160, 89, 0.06) 0%, rgba(197, 160, 89, 0.02) 40%, transparent 80%)",
          willChange: "transform"
        }}
      />
      
      <div
        className="absolute -bottom-[20%] -right-[10%] w-[100%] h-[100%] mix-blend-normal filter blur-[100px] opacity-[0.25] animate-drift"
        style={{
          background: "radial-gradient(circle at center, rgba(197, 160, 89, 0.08) 0%, rgba(184, 134, 11, 0.04) 50%, transparent 80%)",
          animationDirection: "reverse",
          willChange: "transform"
        }}
      />

      {/* Central Golden Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full mix-blend-overlay filter blur-[150px] animate-pulse-slow"
        style={{
          background: "radial-gradient(circle, rgba(197, 160, 89, 0.04) 0%, transparent 80%)",
        }}
      />

      {/* Luxury Ambient Fog - Static texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      
      {/* Luxury Vignette */}
      <div 
        className="absolute inset-0" 
        style={{
          background: "radial-gradient(circle at center, transparent 30%, rgba(197,160,89,0.03) 100%)"
        }}
      />
    </div>
  );
};

export default memo(PremiumBackground);
