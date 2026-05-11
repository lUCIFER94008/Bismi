"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Package, Loader2 } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
}

interface CategoryMegaMenuProps {
  category: string;
  count: number;
  icon: string;
}

const CategoryMegaMenu = ({ category, count, icon }: CategoryMegaMenuProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreviews = async () => {
      try {
        const res = await fetch(`/api/products?category=${encodeURIComponent(category)}&limit=3`);
        const data = await res.json();
        setProducts(data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching mega menu previews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPreviews();
  }, [category]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(15px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(15px)" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-8 w-[95vw] max-w-3xl p-10 glass-card border-luxury-gold/30 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] z-[60] bg-white/98 backdrop-blur-3xl rounded-[3.5rem] overflow-hidden"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-luxury-gold/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="flex flex-col gap-10 relative z-10">
        {/* Top Info Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-luxury-platinum/20">
          <div className="flex items-center gap-6">
            <span className="text-5xl">{icon}</span>
            <div className="h-12 w-[2px] bg-luxury-gold/40" />
            <div className="space-y-1">
              <h3 className="text-3xl font-bold text-[#111111] tracking-tighter uppercase">{category}</h3>
              <div className="flex items-center gap-2 text-luxury-gold">
                <Package size={16} />
                <span className="text-[11px] font-black uppercase tracking-[0.2em]">
                  {count} {count === 1 ? 'ITEM' : 'ITEMS'}
                </span>
              </div>
            </div>
          </div>
          
          <Link
            href={`/products?category=${encodeURIComponent(category)}`}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-luxury-dark text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-luxury-gold transition-all duration-500 shadow-lg group"
          >
            Enter Gallery <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Description Section */}
        <p className="text-[#333333] text-[12px] leading-relaxed font-medium">
          Explore our exclusive {category.toLowerCase()} collection, handpicked for exceptional quality and timeless appeal. Each masterpiece in this curated selection represents our commitment to excellence.
        </p>

        {/* Featured Products Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#6B7280]">Featured Arrivals</span>
            <div className="h-[1px] flex-1 mx-6 bg-luxury-platinum/30" />
          </div>

          {loading ? (
            <div className="h-48 flex items-center justify-center">
              <Loader2 className="animate-spin text-luxury-gold" size={32} />
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {products.map((product, i) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group/item"
                >
                  <Link href={`/product/${product._id}`} className="block space-y-4">
                    <div className="aspect-square relative rounded-3xl overflow-hidden bg-luxury-pearl border border-luxury-platinum/30 shadow-sm transition-all duration-700 group-hover/item:border-luxury-gold group-hover/item:shadow-xl">
                      <Image
                        src={product.images[0] || "/placeholder.png"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover/item:scale-110"
                        sizes="200px"
                      />
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    </div>
                    <div className="space-y-1 px-1">
                      <h4 className="text-[11px] font-bold text-[#111111] truncate group-hover/item:text-luxury-gold transition-colors">{product.name}</h4>
                      <p className="text-[10px] font-black text-luxury-gold">₹{product.price.toLocaleString()}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="h-48 flex flex-col items-center justify-center text-center space-y-3 bg-luxury-pearl/30 rounded-3xl border border-dashed border-luxury-platinum/50">
              <Package size={32} className="text-[#6B7280] opacity-20" />
              <p className="text-[10px] font-black uppercase tracking-widest text-[#6B7280]">Curating New Arrivals...</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryMegaMenu;
