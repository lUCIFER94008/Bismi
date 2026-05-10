"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Phone, MessageSquare, ShoppingBag, Plus, Minus, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    price: number;
    category: string;
    images: string[];
  };
}

const BookingModal = ({ isOpen, onClose, product }: BookingModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    quantity: 1,
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      toast.error("Please fill in your name and phone number");
      return;
    }

    setLoading(true);

    const message = `
⚜️ NEW BISMI GIFT HOUSE

Hello, I would like to acquire a masterpiece from your collection.

━━━━━━━━━━━━━━━
🏛️ Artifact Details
━━━━━━━━━━━━━━━

💎 Product: ${product.name}
💰 Price: ₹${product.price.toLocaleString()}
📂 Category: ${product.category}
🔢 Quantity: ${formData.quantity}

━━━━━━━━━━━━━━━
👤 Collector Details
━━━━━━━━━━━━━━━

🙍 Name: ${formData.name}
📞 Phone: ${formData.phone}

━━━━━━━━━━━━━━━
📝 Private Notes
━━━━━━━━━━━━━━━

${formData.notes || "No additional notes."}

━━━━━━━━━━━━━━━
📍 Inquiry
━━━━━━━━━━━━━━━

Please confirm availability and delivery protocols for this artifact.

Thank you.
`;

    const whatsappUrl = `https://wa.me/919605773773?text=${encodeURIComponent(message)}`;
    
    // Simulate luxury loading
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setLoading(false);
      onClose();
      toast.success("Redirecting to the Gift House...");
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-white/60 backdrop-blur-3xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 30 }}
            className="glass-card w-full max-w-4xl relative z-10 overflow-hidden border-luxury-platinum/50 shadow-2xl bg-white/90"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-8 right-8 p-3 hover:bg-luxury-pearl rounded-full transition-all hover:rotate-90 text-luxury-dark z-20 border border-luxury-platinum/30"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Product Preview Left */}
              <div className="w-full md:w-5/12 bg-luxury-pearl/50 p-10 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-luxury-platinum/30">
                <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden mb-8 border border-luxury-platinum/50 shadow-xl group">
                  <Image
                    src={product.images[0] || "/placeholder.png"}
                    alt={`Booking preview of ${product.name}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-center space-y-3">
                  <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-luxury-gold block">Exclusive Selection</span>
                  <h3 className="text-2xl font-bold text-luxury-dark leading-tight">{product.name}</h3>
                  <div className="w-12 h-[1.5px] bg-luxury-gold/30 mx-auto" />
                  <p className="text-3xl font-bold text-luxury-dark">₹{product.price.toLocaleString()}</p>
                </div>
              </div>

              {/* Form Right */}
              <div className="w-full md:w-7/12 p-10 md:p-14 bg-white/50">
                <div className="flex items-center gap-6 mb-12">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-luxury-platinum/50 flex items-center justify-center text-luxury-dark shadow-sm">
                    <ShoppingBag size={28} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-luxury-dark uppercase tracking-tight">Acquire Artifact</h2>
                    <p className="text-luxury-dark/40 text-[10px] uppercase tracking-[0.3em] font-bold">Secure Private Order Flow</p>
                  </div>
                </div>

                <form onSubmit={handleBooking} className="space-y-8">
                  {/* Name Input */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-luxury-dark/50 uppercase tracking-[0.2em] flex items-center gap-2">
                       Your Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-6 top-1/2 -translate-y-1/2 text-luxury-gold" size={16} />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="glass-input w-full pl-14 pr-6 py-5 text-[13px] font-bold text-luxury-dark placeholder:text-luxury-dark/20"
                        placeholder="e.g. Alexander Sterling"
                      />
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-luxury-dark/50 uppercase tracking-[0.2em] flex items-center gap-2">
                       Communication Line
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-luxury-gold" size={16} />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="glass-input w-full pl-14 pr-6 py-5 text-[13px] font-bold text-luxury-dark placeholder:text-luxury-dark/20"
                        placeholder="e.g. +91 96057 73773"
                      />
                    </div>
                  </div>

                  {/* Quantity & Notes Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-luxury-dark/50 uppercase tracking-[0.2em]">
                        Acquisition Units
                      </label>
                      <div className="flex items-center gap-4 bg-white rounded-2xl p-2 border border-luxury-platinum/50 shadow-sm">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, quantity: Math.max(1, formData.quantity - 1) })}
                          className="w-10 h-10 flex items-center justify-center hover:bg-luxury-pearl rounded-xl transition-all text-luxury-dark"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="flex-1 text-center font-bold text-lg text-luxury-dark">{formData.quantity}</span>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, quantity: formData.quantity + 1 })}
                          className="w-10 h-10 flex items-center justify-center hover:bg-luxury-pearl rounded-xl transition-all text-luxury-dark"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-luxury-dark/50 uppercase tracking-[0.2em]">
                        Private Notes
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-5 top-5 text-luxury-gold" size={16} />
                        <textarea
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          className="glass-input w-full pl-12 pr-6 py-4 resize-none h-[58px] text-[12px] font-medium text-luxury-dark placeholder:text-luxury-dark/20"
                          placeholder="Special requests..."
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-8 py-6 rounded-[2rem] bg-luxury-dark text-white font-bold uppercase tracking-[0.3em] text-[11px] flex items-center justify-center gap-4 shadow-xl hover:shadow-2xl hover:bg-luxury-gold transition-all duration-700 hover:-translate-y-1 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    {loading ? (
                      <Loader2 className="animate-spin" size={24} />
                    ) : (
                      <>
                        <Send size={18} strokeWidth={2} /> Initiate Transfer
                      </>
                    )}
                  </button>
                </form>

                <p className="text-center text-[9px] uppercase tracking-[0.5em] text-luxury-dark/30 mt-12 font-bold">
                  Elite Residency • New Bismi Gift House
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
