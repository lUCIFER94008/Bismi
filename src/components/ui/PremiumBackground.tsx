"use client";

import { useEffect, useState } from "react";

const PremiumBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#FDFBF7]">
      {/* Intense Cinematic Golden Atmosphere - Static */}
      <div
        className="absolute -top-[20%] -left-[10%] w-[120%] h-[120%] mix-blend-normal filter blur-[120px] opacity-[0.4]"
        style={{
          background: "radial-gradient(circle at center, rgba(197, 160, 89, 0.08) 0%, rgba(197, 160, 89, 0.03) 40%, transparent 80%)",
        }}
      />
      
      <div
        className="absolute -bottom-[20%] -right-[10%] w-[100%] h-[100%] mix-blend-normal filter blur-[150px] opacity-[0.3]"
        style={{
          background: "radial-gradient(circle at center, rgba(197, 160, 89, 0.1) 0%, rgba(184, 134, 11, 0.05) 50%, transparent 80%)",
        }}
      />

      {/* Central Golden Glow - Static */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full opacity-[0.15] mix-blend-overlay filter blur-[180px]"
        style={{
          background: "radial-gradient(circle, rgba(197, 160, 89, 0.05) 0%, transparent 80%)",
        }}
      />

      {/* Luxury Ambient Fog */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
      
      {/* Golden Light Waves - Static */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05]">
        <filter id="blur-gold">
          <feGaussianBlur stdDeviation="15" />
        </filter>
        <path
          d="M-100,300 Q300,150 600,300 T1200,300 V1000 H-100 Z"
          fill="#C5A059"
          filter="url(#blur-gold)"
        />
      </svg>

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
