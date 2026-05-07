import Link from "next/link";
import { ArrowLeft, ShoppingBag, SearchX } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProductNotFound() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="relative mb-8">
          {/* Animated glow effect */}
          <div className="absolute inset-0 bg-luxury-gold/20 blur-[100px] rounded-full animate-pulse" />
          
          <div className="relative glass-card p-10 md:p-16 border-white/10 shadow-[0_0_50px_rgba(212,175,55,0.05)] max-w-2xl mx-auto">
            <SearchX className="text-luxury-gold mx-auto mb-8 animate-bounce" size={80} strokeWidth={1} />
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6 italic">
              Masterpiece Not Found
            </h1>
            
            <div className="w-20 h-1 bg-luxury-gold mx-auto mb-8 rounded-full" />
            
            <p className="text-gray-400 leading-relaxed uppercase tracking-[0.2em] text-[10px] md:text-xs font-black max-w-md mx-auto">
              The exclusive item you are seeking has either been acquired by another collector 
               or is currently unavailable in our curated gallery.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 mt-8">
          <Link 
            href="/products" 
            className="btn-primary px-10 py-5 flex items-center gap-3 group shadow-[0_0_30px_rgba(212,175,55,0.2)]"
          >
            <ShoppingBag size={22} className="group-hover:rotate-12 transition-transform" /> 
            <span className="uppercase tracking-widest font-bold text-xs">Explore Gallery</span>
          </Link>
          <Link 
            href="/" 
            className="btn-glass px-10 py-5 flex items-center gap-3 border-white/10 hover:border-white/20 transition-all"
          >
            <ArrowLeft size={22} /> 
            <span className="uppercase tracking-widest font-bold text-xs">Return Home</span>
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
