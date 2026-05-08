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
🛍️ NEW BISMI GIFT HOUSE

Hello, I would like to place an order.

━━━━━━━━━━━━━━━
📦 Product Details
━━━━━━━━━━━━━━━

🧸 Product: ${product.name}
💰 Price: ₹${product.price}
📂 Category: ${product.category}
🔢 Quantity: ${formData.quantity}

━━━━━━━━━━━━━━━
👤 Customer Details
━━━━━━━━━━━━━━━

🙍 Name: ${formData.name}
📞 Phone: ${formData.phone}

━━━━━━━━━━━━━━━
📝 Additional Notes
━━━━━━━━━━━━━━━

${formData.notes || "No additional notes."}

━━━━━━━━━━━━━━━
📍 Request
━━━━━━━━━━━━━━━

Please share:
• Availability
• Delivery details
• Payment options

Thank you.
`;

    const whatsappUrl = `https://wa.me/919605773773?text=${encodeURIComponent(message)}`;
    
    // Simulate luxury loading
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setLoading(false);
      onClose();
      toast.success("Redirecting to WhatsApp...");
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
            className="fixed inset-0 bg-black/90 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass-card w-full max-w-4xl relative z-10 overflow-hidden border-white/20 shadow-[0_0_100px_rgba(34,197,94,0.15)]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-3 hover:bg-white/10 rounded-full transition-all hover:rotate-90 text-white z-20"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Product Preview Left */}
              <div className="w-full md:w-5/12 bg-white/5 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/10">
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-6 border border-white/10 shadow-2xl">
                  <Image
                    src={product.images[0] || "/placeholder.png"}
                    alt={`Booking preview of ${product.name}`}
                    fill
                    className="object-cover"
                  />

                </div>
                <div className="text-center">
                  <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-luxury-gold mb-2 block">Exclusive Selection</span>
                  <h3 className="text-2xl font-bold text-white italic mb-2">{product.name}</h3>
                  <p className="text-3xl font-black text-white">₹{product.price}</p>
                </div>
              </div>

              {/* Form Right */}
              <div className="w-full md:w-7/12 p-8 md:p-12">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-3 rounded-2xl bg-green-500/10 border border-green-500/20">
                    <ShoppingBag className="text-green-500" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white italic">Confirm Booking</h2>
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mt-1">Professional WhatsApp Order</p>
                  </div>
                </div>

                <form onSubmit={handleBooking} className="space-y-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <User size={12} className="text-luxury-gold" /> Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="glass-input w-full px-6 py-4 focus:border-green-500/50"
                      placeholder="Enter your name"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <Phone size={12} className="text-luxury-gold" /> Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="glass-input w-full px-6 py-4 focus:border-green-500/50"
                      placeholder="e.g. +91 98765 43210"
                    />
                  </div>

                  {/* Quantity & Notes Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <Plus size={12} className="text-luxury-gold" /> Quantity
                      </label>
                      <div className="flex items-center gap-4 bg-white/5 rounded-2xl p-2 border border-white/10">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, quantity: Math.max(1, formData.quantity - 1) })}
                          className="p-2 hover:bg-white/10 rounded-xl transition-all"
                        >
                          <Minus size={18} />
                        </button>
                        <span className="flex-1 text-center font-bold text-lg">{formData.quantity}</span>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, quantity: formData.quantity + 1 })}
                          className="p-2 hover:bg-white/10 rounded-xl transition-all"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <MessageSquare size={12} className="text-luxury-gold" /> Notes
                      </label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="glass-input w-full px-6 py-3 resize-none h-[54px] focus:border-green-500/50"
                        placeholder="Any special requests?"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6 py-5 rounded-2xl bg-green-500 text-white font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(34,197,94,0.3)] hover:shadow-[0_25px_50px_rgba(34,197,94,0.4)] transition-all hover:-translate-y-1 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    {loading ? (
                      <Loader2 className="animate-spin" size={24} />
                    ) : (
                      <>
                        <Send size={20} /> Continue to WhatsApp
                      </>
                    )}
                  </button>
                </form>

                <p className="text-center text-[8px] uppercase tracking-widest text-gray-500 mt-8 font-bold">
                  Elite Booking System • New Bismi Gift House
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
