"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import Magnetic from "./Magnetic";

const Hero = () => {
  return (
    <section className="relative min-h-[105vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-transparent">
      {/* Optimized Cinematic Lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-luxury-platinum/20 rounded-full blur-[100px] mix-blend-multiply" />
        <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-luxury-gold/5 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        {/* Fast Premium Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-3 px-8 py-3 rounded-2xl bg-white border border-luxury-platinum/50 text-[10px] font-black uppercase tracking-[0.4em] mb-12 shadow-sm text-luxury-dark/80"
        >
          <Sparkles size={14} className="text-luxury-gold" />
          <span>The Art of Selection</span>
        </motion.div>

        <div className="space-y-12">
          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-7xl md:text-[11rem] font-black tracking-tighter leading-[0.8] text-[#111111] uppercase"
            >
              PRECISION
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-[7rem] font-black tracking-tighter leading-[0.9] text-gold-gradient uppercase italic"
            >
              IN EVERY GIFT
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#444444] text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-bold px-4"
          >
            Experience a curated selection of premium diecast models, luxury watches, and boutique gifts crafted with elegance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8"
          >
            <Magnetic>
              <Link href="/products" prefetch={true} className="btn-luxury flex items-center gap-4 px-12 py-5 text-[11px] tracking-[0.3em] uppercase font-black">
                Explore Collection <ArrowRight size={18} />
              </Link>
            </Magnetic>
            <Link href="/products?category=Toys" prefetch={true} className="btn-platinum px-12 py-5 text-[11px] tracking-[0.3em] uppercase border-luxury-platinum/50 font-black text-[#111111]">
              View Masterpieces
            </Link>
          </motion.div>
        </div>

        {/* Floating Showcase Cards */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {[
            { label: "Elite Category", title: "Masterpiece Diecast", h: "h-56", img: "/hero/diecast.png" },
            { label: "Featured Collections", title: "Luxury Horology", h: "h-72", active: true, img: "/hero/watches.png" },
            { label: "New Acquisition", title: "Precision Models", h: "h-56", img: "/hero/precision_car.png" }
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              whileHover={{ 
                y: -12,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className={`relative overflow-hidden rounded-[2.5rem] glass-card flex flex-col justify-end text-left border-luxury-platinum/40 group cursor-pointer shadow-2xl ${card.h} ${card.active ? "md:-mt-8" : ""}`}
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={card.img}
                  alt={card.title}
                  fill
                  priority={i === 1}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              </div>

              {/* Hover Glow Ring */}
              <div className="absolute inset-0 rounded-[2.5rem] border-2 border-luxury-gold/0 group-hover:border-luxury-gold/30 transition-colors duration-500 z-20 pointer-events-none" />

              <div className="relative z-30 p-10 space-y-3">
                <span className="text-[9px] text-luxury-gold uppercase tracking-[0.5em] font-bold">
                  {card.label}
                </span>
                <h3 className="font-bold text-2xl text-white uppercase tracking-tight group-hover:text-luxury-gold transition-colors duration-300">
                  {card.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
