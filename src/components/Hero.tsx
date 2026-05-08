"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Magnetic from "./Magnetic";
import { useRef } from "react";

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section ref={containerRef} className="relative min-h-[110vh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Cinematic Background */}
      <motion.div 
        style={{ scale, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.15)_0%,transparent_50%)]" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-luxury-gold/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px] animate-float" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.3em] mb-8 backdrop-blur-md"
        >
          <Sparkles size={14} className="text-luxury-gold" />
          <span>The Art of Luxury Gifting</span>
        </motion.div>

        <motion.div
          style={{ y, opacity }}
          className="space-y-8"
        >
          <motion.h1
            initial={{ opacity: 0, filter: "blur(20px)", y: 40 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.9] italic"
          >
            PRECISION <br />
            <span className="text-gradient">IN EVERY GIFT</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Experience a curated selection of premium diecast models, luxury watches, and boutique toys at Kochi&apos;s most prestigious gift house.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Magnetic>
              <Link href="/products" className="btn-primary flex items-center gap-3 px-10 py-5 text-xs tracking-widest uppercase italic">
                View Collections <ArrowRight size={18} />
              </Link>
            </Magnetic>
            <Link href="/products?category=Toys" className="btn-glass px-10 py-5 text-xs tracking-widest uppercase italic border-white/20">
              Explore Toys
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Decorative Cards */}
        <div className="mt-28 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {[
            { label: "Collection", title: "Diecast Models", h: "h-40" },
            { label: "Bestseller", title: "Luxury Watches", h: "h-52", active: true },
            { label: "New Arrival", title: "Remote Cars", h: "h-40" }
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 + i * 0.2 }}
              className={`glass-card p-8 flex flex-col justify-end text-left border-white/10 group hover:border-luxury-gold/30 transition-colors ${card.h} ${card.active ? "bg-white/10 -mt-6" : ""}`}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-luxury-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-2 font-bold">{card.label}</span>
              <h3 className="font-bold text-xl group-hover:text-luxury-gold transition-colors italic uppercase">{card.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Luxury Gradient Glow behind content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-luxury-gold/10 rounded-full blur-[150px] pointer-events-none z-0" />
    </section>
  );
};

export default Hero;
