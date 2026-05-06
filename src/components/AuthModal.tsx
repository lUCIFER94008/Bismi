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
            className="fixed inset-0 bg-black/90 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass-card w-full max-w-md relative z-10 p-10 border-white/20 shadow-[0_0_100px_rgba(212,175,55,0.1)] text-center"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-all text-gray-500"
            >
              <X size={20} />
            </button>

            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 rounded-3xl bg-luxury-gold/10 border border-luxury-gold/20 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-luxury-gold/20 blur-2xl animate-pulse rounded-full" />
                <Lock size={36} className="text-luxury-gold relative z-10" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white italic mb-4">Access Required</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-10">
              Please login or create an account to continue shopping with <span className="text-luxury-gold font-bold">NEW BISMI GIFT HOUSE</span>.
            </p>

            <div className="space-y-4">
              <button
                onClick={() => router.push("/login")}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-white text-black font-black uppercase tracking-[0.2em] text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-white/5"
              >
                <LogIn size={18} /> Login to Account
              </button>
              
              <button
                onClick={() => router.push("/register")}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-white/10 transition-all"
              >
                <UserPlus size={18} /> Create New Account
              </button>
            </div>

            <p className="text-[8px] uppercase tracking-widest text-gray-600 mt-10 font-bold">
              Premium Shopping Experience • Since 2014
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
