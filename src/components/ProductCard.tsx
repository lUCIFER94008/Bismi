"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowUpRight, Image as ImageIcon, Lock } from "lucide-react";
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
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogged(!!token);
  }, []);

  const isAuthenticated = () => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("token");
  };

  const handleAction = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated()) {
      setShowAuthModal(true);
      return;
    }
    router.push(`/product/${product._id}`);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ y: -10 }}
        className="glass-card group overflow-hidden cursor-pointer"
        onClick={handleAction}
      >
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
              {isLogged ? "View Details" : "Login Required"} <ArrowUpRight size={14} />
            </span>
          </div>

          {!isLogged && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <div className="p-3 rounded-full bg-luxury-gold/20 border border-luxury-gold/40 text-luxury-gold animate-bounce">
                  <Lock size={20} />
               </div>
            </div>
          )}

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
            className={`mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-xl transition-all duration-300 font-bold text-xs uppercase tracking-widest ${
              isLogged 
                ? "bg-white/5 border border-white/10 hover:bg-white hover:text-black" 
                : "bg-luxury-gold/10 border border-luxury-gold/20 text-luxury-gold hover:bg-luxury-gold hover:text-black"
            }`}
          >
            <ShoppingCart size={18} /> {isLogged ? "Book via WhatsApp" : "Login to Order"}
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
