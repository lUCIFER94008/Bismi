"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { memo } from "react";

interface CategoryCardProps {
  name: string;
  icon: string;
  delay?: number;
}

const CategoryCard = memo(({ name, icon, delay = 0 }: CategoryCardProps) => {
  return (
    <motion.div
        whileHover={{ 
          scale: 1.05,
          y: -10,
          transition: { duration: 0.3 }
        }}
        className="relative group h-full"
    >
      <Link 
        href={`/products?category=${encodeURIComponent(name)}`}
        prefetch={true}
        className="block h-full"
      >
        <div className="glass-card p-8 h-full flex flex-col items-center justify-center text-center transition-all duration-500 group-hover:border-luxury-gold/50 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] overflow-hidden relative bg-white/60"
        >
          {/* Animated Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/0 via-luxury-gold/0 to-luxury-gold/0 group-hover:via-luxury-gold/5 group-hover:to-luxury-gold/10 transition-all duration-700" />
          
          <span className="text-5xl mb-6 block group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500 relative z-10">
            {icon}
          </span>
          <span className="font-bold tracking-[0.2em] uppercase text-[10px] text-luxury-dark/60 group-hover:text-luxury-dark transition-colors relative z-10">
            {name}
          </span>
          
          {/* Hover Glow Line */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-luxury-gold to-transparent" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
});

CategoryCard.displayName = "CategoryCard";

export default CategoryCard;
