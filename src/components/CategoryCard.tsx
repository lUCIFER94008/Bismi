"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface CategoryCardProps {
  name: string;
  icon: string;
  delay?: number;
}

const CategoryCard = ({ name, icon, delay = 0 }: CategoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ 
        scale: 1.05,
        y: -10,
        transition: { duration: 0.3 }
      }}
      className="relative group"
    >
      <Link 
        href={`/products?category=${encodeURIComponent(name)}`}
        className="block"
      >
        <div className="glass-card p-8 h-full flex flex-col items-center justify-center text-center transition-all duration-500 group-hover:border-luxury-gold/50 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] overflow-hidden relative"
        >
          {/* Animated Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/0 via-luxury-gold/0 to-luxury-gold/0 group-hover:via-luxury-gold/5 group-hover:to-luxury-gold/10 transition-all duration-700" />
          
          <span className="text-5xl mb-6 block group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500 relative z-10">
            {icon}
          </span>
          <span className="font-bold tracking-[0.2em] uppercase text-[10px] text-gray-400 group-hover:text-white transition-colors relative z-10">
            {name}
          </span>
          
          {/* Hover Glow Ring */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-luxury-gold to-transparent" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
