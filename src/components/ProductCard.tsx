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
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ 
          y: -10,
          rotateX: 5,
          rotateY: -5,
          transition: { duration: 0.3 }
        }}
        className="glass-card group overflow-hidden cursor-pointer relative transition-all duration-500 hover:border-luxury-gold/40 hover:shadow-[0_20px_50px_rgba(212,175,55,0.15)]"
        onClick={() => router.push(`/product/${product._id}`)}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-luxury-gold/0 via-luxury-gold/0 to-luxury-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="relative aspect-square overflow-hidden bg-white/5">
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 gap-2">
               <ImageIcon size={32} />
               <span className="text-[10px] uppercase font-bold tracking-widest">No Image</span>
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span className="text-white text-xs font-medium bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1">
              View Masterpiece <ArrowUpRight size={14} />
            </span>
          </div>

          {product.images?.length > 1 && (
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
              +{product.images.length - 1} Photos
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{product.category}</p>
              <h3 className="font-bold text-lg group-hover:text-luxury-gold transition-colors truncate">
                {product.name}
              </h3>
            </div>
            <p className="font-bold text-lg text-white">₹{product.price}</p>
          </div>

          <button
            onClick={handleAction}
            className="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-xl transition-all duration-300 font-bold text-xs uppercase tracking-widest bg-white/5 border border-white/10 hover:bg-white hover:text-black"
          >
            <ShoppingCart size={18} /> View Details
          </button>
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
