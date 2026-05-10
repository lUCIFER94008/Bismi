"use client";

import { useState } from "react";
// import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const [showAuthModal, setShowAuthModal] = useState(false);
  // Removed unused isLogged and isAuthenticated logic

  const handleAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/product/${product._id}`);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ 
          y: -12,
          transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
        }}
        className="glass-card group overflow-hidden cursor-pointer relative transition-all duration-500 hover:shadow-2xl border-luxury-platinum/50"
        onClick={() => router.push(`/product/${product._id}`)}
      >
        {/* Hover Highlight */}
        <div className="absolute inset-0 bg-gradient-to-tr from-luxury-gold/0 via-luxury-gold/5 to-luxury-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        <div className="relative aspect-[4/5] overflow-hidden bg-luxury-pearl">
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-[1.5s] cubic-bezier(0.4, 0, 0.2, 1) group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-luxury-dark/20 gap-3">
               <ImageIcon size={40} strokeWidth={1} />
               <span className="text-[9px] uppercase font-bold tracking-[0.4em]">No Image</span>
            </div>
          )}
          
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Top Badge */}
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-white/90 backdrop-blur-md border border-luxury-platinum/50 px-4 py-1.5 rounded-full shadow-lg">
              <span className="text-[9px] uppercase font-bold tracking-widest text-luxury-dark">Gift House Selection</span>
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
            <span className="text-luxury-dark text-[10px] font-bold uppercase tracking-widest bg-white/95 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-luxury-platinum/30">
              View Showcase <ArrowUpRight size={14} className="text-luxury-gold" />
            </span>
          </div>

          {product.images?.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-luxury-dark text-[10px] font-bold px-2 py-1.5 rounded-lg border border-luxury-platinum/50 shadow-sm">
              {product.images.length} Perspectives
            </div>
          )}
        </div>

        <div className="p-7 space-y-4 bg-white/50">
          <div className="space-y-1.5">
            <p className="text-[10px] text-luxury-gold uppercase font-bold tracking-[0.3em]">{product.category}</p>
            <h3 className="font-bold text-xl text-luxury-dark group-hover:text-luxury-gold transition-colors truncate tracking-tight">
              {product.name}
            </h3>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-luxury-platinum/30">
            <p className="font-bold text-xl text-luxury-dark">₹{product.price.toLocaleString()}</p>
            <button
              onClick={handleAction}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-luxury-dark text-white hover:bg-luxury-gold transition-all duration-300 shadow-md"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </motion.div>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
};

export default ProductCard;
