"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-6 pt-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-luxury-gold/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-luxury-gold/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card max-w-lg w-full p-12 text-center relative z-10 border-white/10"
      >
        <div className="w-24 h-24 bg-red-500/10 border border-red-500/20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-red-500">
          <AlertTriangle size={48} strokeWidth={1.5} />
        </div>

        <h1 className="text-4xl font-bold text-white mb-4 tracking-tighter italic">Unexpected Interruption</h1>
        <p className="text-gray-500 text-sm uppercase tracking-[0.2em] font-black mb-12 leading-relaxed">
          The masterpiece encountered a temporary aesthetic conflict.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => reset()}
            className="btn-primary flex-1 py-4 flex items-center justify-center gap-2 group"
          >
            <RefreshCcw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
            <span>Attempt Recovery</span>
          </button>
          
          <Link
            href="/"
            className="btn-glass flex-1 py-4 flex items-center justify-center gap-2"
          >
            <Home size={18} />
            <span>Return Home</span>
          </Link>
        </div>

        <p className="mt-8 text-[10px] text-gray-700 uppercase tracking-widest font-bold">
          Ref: {error.digest || "System standard error"}
        </p>
      </motion.div>
    </main>
  );
}
