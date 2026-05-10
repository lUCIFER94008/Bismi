"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import Magnetic from "./Magnetic";
import { useRef } from "react";

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section ref={containerRef} className="relative min-h-[105vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-transparent">
      {/* Cinematic Lighting */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-luxury-platinum/30 rounded-full blur-[150px] mix-blend-multiply" />
        <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-luxury-gold/10 rounded-full blur-[180px] mix-blend-screen" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          className="inline-flex items-center gap-3 px-8 py-3 rounded-2xl bg-white border border-luxury-platinum/50 text-[10px] font-bold uppercase tracking-[0.4em] mb-12 shadow-sm text-luxury-dark/60"
        >
          <Sparkles size={14} className="text-luxury-gold" />
          <span>Established Masterpiece Selection</span>
        </motion.div>

        <motion.div
          style={{ y }}
          className="space-y-12"
        >
          <motion.h1
            initial={{ opacity: 0, filter: "blur(20px)", y: 60 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-7xl md:text-[10rem] font-bold tracking-tighter leading-[0.85] text-luxury-dark"
          >
            CURATED <br />
            <span className="text-gold-gradient font-black italic">GIFT HOUSE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="text-luxury-dark/60 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium"
          >
            The destination for elite collectors. Discover our vault of precision-crafted diecast models, luxury horology, and boutique artifacts.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8"
          >
            <Magnetic>
              <Link href="/products" className="btn-luxury flex items-center gap-4 px-12 py-5 text-[11px] tracking-[0.3em] uppercase">
                Explore Vault <ArrowRight size={18} />
              </Link>
            </Magnetic>
            <Link href="/products?category=Toys" className="btn-platinum px-12 py-5 text-[11px] tracking-[0.3em] uppercase border-luxury-platinum/50">
              The Collection
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Showcase Cards */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {[
            { label: "Elite Category", title: "Masterpiece Diecast", h: "h-56", img: "/hero/diecast.png" },
            { label: "Featured Collections", title: "Luxury Horology", h: "h-72", active: true, img: "/hero/watches.png" },
            { label: "New Acquisition", title: "Precision Models", h: "h-56", img: "/hero/remote.png" }
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 1 + i * 0.2 }}
              whileHover={{ 
                y: -20,
                rotateX: 8,
                rotateY: -4,
                transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
              }}
              className={`relative overflow-hidden rounded-[2.5rem] glass-card flex flex-col justify-end text-left border-luxury-platinum/40 group cursor-pointer shadow-2xl ${card.h} ${card.active ? "md:-mt-8" : ""}`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={card.img}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-[1200ms] ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-[2.5rem] border-2 border-luxury-gold/0 group-hover:border-luxury-gold/40 transition-colors duration-700 z-20 pointer-events-none" />

              <div className="relative z-30 p-10 space-y-3 translate-z-10">
                <span className="text-[9px] text-luxury-gold uppercase tracking-[0.5em] font-bold">
                  {card.label}
                </span>
                <h3 className="font-bold text-2xl text-white uppercase tracking-tight group-hover:text-luxury-gold transition-colors duration-500">
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
