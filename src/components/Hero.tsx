"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-luxury-gold/20 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-white/5 rounded-full blur-[150px] animate-float" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium mb-8 backdrop-blur-md"
        >
          <Sparkles size={16} className="text-luxury-gold" />
          <span>Premium Gifts & Accessories</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-[1.1]"
        >
          Elevate Your <br />
          <span className="text-gradient">Gifting Experience</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Discover a curated collection of luxury toys, diecast models, and premium stationary at Kochi&apos;s most trusted gift house.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link href="/products" className="btn-primary flex items-center gap-2 px-8 py-4">
            Browse Collections <ArrowRight size={20} />
          </Link>
          <Link href="/products?category=Toys" className="btn-glass px-8 py-4">
            Explore Toys
          </Link>
        </motion.div>

        {/* Floating Cards Mockup */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 opacity-50">
           <div className="glass-card p-6 h-40 flex flex-col justify-end">
              <span className="text-xs text-gray-500 uppercase tracking-widest mb-2">Collection</span>
              <h3 className="font-bold">Diecast Models</h3>
           </div>
           <div className="glass-card p-6 h-48 -mt-8 flex flex-col justify-end bg-white/10">
              <span className="text-xs text-gray-500 uppercase tracking-widest mb-2">Bestseller</span>
              <h3 className="font-bold">Luxury Watches</h3>
           </div>
           <div className="glass-card p-6 h-40 flex flex-col justify-end">
              <span className="text-xs text-gray-500 uppercase tracking-widest mb-2">New Arrival</span>
              <h3 className="font-bold">Remote Cars</h3>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
