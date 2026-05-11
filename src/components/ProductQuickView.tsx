"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, ArrowRight, Package, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductQuickViewProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    _id: string;
    name: string;
    price: number;
    category: string;
    images: string[];
    description?: string;
  };
}

const ProductQuickView = ({ isOpen, onClose, product }: ProductQuickViewProps) => {
  const router = useRouter();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-luxury-dark/60 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl bg-white rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-luxury-platinum/30"
          >
            <button onClick={onClose} className="absolute top-8 right-8 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md border border-luxury-platinum/50 text-luxury-dark hover:bg-luxury-gold hover:text-white transition-all duration-500 shadow-xl group" >
              <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
            </button>

            <div className="flex flex-col md:flex-row h-full max-h-[90vh] overflow-y-auto no-scrollbar">
              {/* Image Gallery */}
              <div className="w-full md:w-1/2 aspect-square md:aspect-auto relative bg-luxury-pearl">
                <Image
                  src={product.images[0] || "/placeholder.png"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="600px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                
                {/* Product Badge */}
                <div className="absolute bottom-8 left-8">
                   <div className="bg-white/95 backdrop-blur-xl border border-luxury-gold/30 px-6 py-2 rounded-2xl shadow-2xl">
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-luxury-gold">Authentic Masterpiece</span>
                   </div>
                </div>
              </div>

              {/* Content */}
              <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-between space-y-12">
                <div className="space-y-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-luxury-gold font-black text-[10px] uppercase tracking-[0.5em]">{product.category}</span>
                      <div className="h-[1px] w-12 bg-luxury-gold/30" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#111111] tracking-tighter leading-tight uppercase">
                      {product.name}
                    </h2>
                    <p className="text-3xl font-bold text-luxury-gold tracking-tighter">₹{product.price.toLocaleString()}</p>
                  </div>

                  <div className="space-y-6">
                    <p className="text-[#444444] text-[13px] leading-relaxed font-medium">
                      Experience the pinnacle of craftsmanship with this curated selection. Each detail is precision-engineered to meet the highest standards of luxury and durability.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-4 rounded-2xl bg-luxury-pearl border border-luxury-platinum/50">
                        <ShieldCheck className="text-luxury-gold" size={18} />
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#111111]">Secure Transit</span>
                      </div>
                      <div className="flex items-center gap-3 p-4 rounded-2xl bg-luxury-pearl border border-luxury-platinum/50">
                        <Package className="text-luxury-gold" size={18} />
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#111111]">Gift Wrapped</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => router.push(`/product/${product._id}`)}
                    className="flex-1 px-10 py-6 rounded-2xl bg-luxury-dark text-white text-[11px] font-black uppercase tracking-[0.3em] hover:bg-black transition-all duration-500 shadow-xl flex items-center justify-center gap-3 group"
                  >
                    View Details <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                  <button className="w-20 h-20 rounded-2xl border-2 border-luxury-gold text-luxury-gold flex items-center justify-center hover:bg-luxury-gold hover:text-white transition-all duration-500 shadow-lg group">
                    <ShoppingCart size={24} className="group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductQuickView;
