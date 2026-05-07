"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-luxury-gold/10 rounded-full blur-[150px] animate-pulse" />
      </div>

      <div className="relative text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 relative"
        >
          <div className="w-24 h-24 rounded-full border-2 border-white/5 flex items-center justify-center relative">
            <Loader2 className="text-luxury-gold animate-spin" size={40} strokeWidth={1} />
            <div className="absolute inset-0 rounded-full border-t-2 border-luxury-gold animate-spin-slow" />
          </div>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 text-[10px] uppercase font-black tracking-[0.4em] animate-pulse"
        >
          Curating Excellence
        </motion.p>
      </div>
    </div>
  );
}
