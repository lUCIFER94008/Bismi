"use client";

import { useState, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowUpRight, Image as ImageIcon } from "lucide-react";
import AuthModal from "./AuthModal";

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    price: number;
    category: string;
    images: string[];
    description?: string;
  };
}

const ProductCard = memo(({ product }: ProductCardProps) => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <Link href={`/product/${product._id}`} prefetch={true} className="block">
        <motion.div
          whileHover={{ 
            y: -10,
            scale: 1.01,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          className="glass-card group overflow-hidden cursor-pointer relative transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border-luxury-platinum/50 bg-white/40"
        >
          {/* Luxury Gold Border Glow on Hover */}
          <div className="absolute inset-0 border border-luxury-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[1.5rem] z-20 pointer-events-none" />
          
          <div className="relative aspect-[4/5] overflow-hidden bg-luxury-pearl">
            {product.images && product.images.length > 0 ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-[0.8s] ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                quality={75}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-luxury-dark/20 gap-3">
                 <ImageIcon size={40} strokeWidth={1} />
                 <span className="text-[9px] uppercase font-bold tracking-[0.4em]">No Image</span>
              </div>
            )}
            
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Top Badge */}
            <div className="absolute top-4 left-4 z-10">
              <div className="bg-white/90 backdrop-blur-sm border border-luxury-platinum/50 px-4 py-1.5 rounded-full shadow-sm">
                <span className="text-[9px] uppercase font-bold tracking-widest text-luxury-dark">Gift House Selection</span>
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <span className="text-luxury-dark text-[10px] font-bold uppercase tracking-widest bg-white/95 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-luxury-platinum/30">
                View Showcase <ArrowUpRight size={14} className="text-luxury-gold" />
              </span>
            </div>
          </div>

          <div className="p-6 space-y-4 bg-white/50">
            <div className="space-y-1.5">
              <p className="text-[9px] text-luxury-gold uppercase font-black tracking-[0.4em] mb-1">{product.category}</p>
              <h3 className="font-bold text-base text-[#111111] group-hover:text-luxury-gold transition-colors duration-300 truncate tracking-tight uppercase">
                {product.name}
              </h3>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-luxury-platinum/10">
              <p className="font-bold text-lg text-[#111111] tracking-tighter">₹{product.price.toLocaleString()}</p>
              <div
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-luxury-dark text-white group-hover:bg-luxury-gold transition-all duration-300 shadow-md"
              >
                <ShoppingCart size={18} />
              </div>
            </div>
          </div>
        </motion.div>
      </Link>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;
