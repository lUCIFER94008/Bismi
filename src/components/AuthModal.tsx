"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Lock, X, LogIn, UserPlus } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const router = useRouter();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-white/60 backdrop-blur-3xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 30 }}
            className="glass-card w-full max-w-md relative z-10 p-12 border-luxury-platinum/50 shadow-2xl bg-white/90 text-center space-y-8"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2.5 hover:bg-luxury-pearl rounded-full transition-all text-luxury-dark/40 border border-luxury-platinum/30 shadow-sm"
             >
              <X size={18} />
            </button>

            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-[2rem] bg-luxury-pearl border border-luxury-platinum flex items-center justify-center shadow-inner relative group">
                <div className="absolute inset-0 bg-luxury-gold/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <Lock size={40} strokeWidth={1} className="text-luxury-gold relative z-10" />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-[#111111] tracking-tighter">PRIVATE <span className="text-luxury-gold italic">VAULT</span></h2>
              <p className="text-[#333333] text-[13px] leading-relaxed font-bold">
                Please authenticate to access the exclusive <span className="text-[#111111] font-black">NEW BISMI GIFT HOUSE</span> collection.
              </p>
            </div>

            <div className="space-y-5 pt-4">
              <button
                onClick={() => router.push("/login")}
                className="w-full flex items-center justify-center gap-4 py-5 rounded-[1.5rem] bg-luxury-dark text-white font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-luxury-gold transition-all duration-500 shadow-xl"
              >
                <LogIn size={18} strokeWidth={2} /> Enter the Vault
              </button>
              
              <button
                onClick={() => router.push("/register")}
                className="w-full flex items-center justify-center gap-4 py-5 rounded-[1.5rem] bg-white border border-luxury-platinum/50 text-luxury-dark font-bold uppercase tracking-[0.3em] text-[10px] hover:border-luxury-gold transition-all duration-500 shadow-sm"
              >
                <UserPlus size={18} strokeWidth={2} /> Request Membership
              </button>
            </div>

            <div className="pt-8 border-t border-luxury-platinum/20">
              <p className="text-[9px] uppercase tracking-[0.6em] text-[#6B7280] font-bold">
                ESTABLISHED 2014 • PREEMINENT GIFT HOUSE
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
