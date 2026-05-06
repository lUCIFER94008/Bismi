"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowUpRight } from "lucide-react";

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    price: number;
    category: string;
    image: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="glass-card group overflow-hidden"
    >
      <Link href={`/product/${product._id}`}>
        <div className="relative aspect-square overflow-hidden bg-white/5">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span className="text-white text-xs font-medium bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1">
              View Details <ArrowUpRight size={14} />
            </span>
          </div>
        </div>
      </Link>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{product.category}</p>
            <h3 className="font-bold text-lg group-hover:text-luxury-gold transition-colors truncate">
              {product.name}
            </h3>
          </div>
          <p className="font-bold text-lg">₹{product.price}</p>
        </div>

        <Link
          href={`https://wa.me/919605773773?text=I want to order ${encodeURIComponent(product.name)}`}
          target="_blank"
          className="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all duration-300 font-semibold text-sm"
        >
          <ShoppingCart size={18} /> Order via WhatsApp
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
