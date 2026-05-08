"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
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
            Experience a curated selection of exclusive diecast models, luxury watches, and boutique toys at Kochi&apos;s most prestigious gift house.
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
            { label: "Collection", title: "Diecast Models", h: "h-48", img: "/hero/diecast.png" },
            { label: "Bestseller", title: "Luxury Watches", h: "h-64", active: true, img: "/hero/watches.png" },
            { label: "New Arrival", title: "Remote Cars", h: "h-48", img: "/hero/remote.png" }
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 + i * 0.2 }}
              whileHover={{ 
                y: -15,
                rotateX: 10,
                rotateY: -5,
                transition: { duration: 0.7, ease: "easeOut" }
              }}
              className={`relative overflow-hidden rounded-[2rem] glass-card flex flex-col justify-end text-left border-white/10 group cursor-pointer shadow-2xl ${card.h} ${card.active ? "md:-mt-8" : ""}`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Background Image with Hover Zoom */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={card.img}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
              </div>

              {/* Hover Glow Border */}
              <div className="absolute inset-0 rounded-[2rem] border border-luxury-gold/0 group-hover:border-luxury-gold/50 transition-colors duration-700 z-20 pointer-events-none" />
              <div className="absolute inset-0 rounded-[2rem] shadow-[0_0_40px_rgba(212,175,55,0)] group-hover:shadow-[0_0_40px_rgba(212,175,55,0.2)] transition-all duration-700 z-20 pointer-events-none" />

              <div className="relative z-30 p-8 space-y-2 translate-z-10">
                <span className="text-[10px] text-luxury-gold uppercase tracking-[0.4em] font-black drop-shadow-lg">
                  {card.label}
                </span>
                <h3 className="font-black text-2xl text-white italic uppercase tracking-tighter drop-shadow-2xl group-hover:text-luxury-gold transition-colors duration-500">
                  {card.title}
                </h3>
              </div>
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
