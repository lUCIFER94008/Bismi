"use client";

import { useState } from "react";
import { ShoppingCart, Share2 } from "lucide-react";
import BookingModal from "./BookingModal";

interface BookingActionProps {
  product: {
    name: string;
    price: number;
    category: string;
    images: string[];
  };
}

const BookingAction = ({ product }: BookingActionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="space-y-4 mb-12">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full relative group flex items-center justify-center gap-3 py-5 text-lg font-black uppercase tracking-[0.2em] rounded-2xl bg-green-500 text-white shadow-[0_20px_40px_rgba(34,197,94,0.2)] hover:shadow-[0_25px_50px_rgba(34,197,94,0.3)] transition-all hover:-translate-y-1 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <div className="absolute inset-0 bg-green-400 opacity-0 group-hover:opacity-20 animate-pulse" />
          <ShoppingCart size={24} className="relative z-10" /> 
          <span className="relative z-10">Book via WhatsApp</span>
        </button>

        <button className="btn-glass w-full flex items-center justify-center gap-3 py-5 text-lg font-bold tracking-widest uppercase">
          <Share2 size={24} /> Share Masterpiece
        </button>
      </div>

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={product} 
      />
    </>
  );
};

export default BookingAction;
