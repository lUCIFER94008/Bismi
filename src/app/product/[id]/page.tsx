import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import ProductGallery from "@/components/ProductGallery";
import BookingAction from "@/components/BookingAction";
import { ShieldCheck, ArrowLeft, Star, Gem, Award } from "lucide-react";
import Link from "next/link";
import mongoose from "mongoose";
import { notFound } from "next/navigation";

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Validate ID format first
  if (!mongoose.Types.ObjectId.isValid(id)) {
    notFound();
  }
  
  let product;
  try {
    await connectDB();
    product = await Product.findById(id).lean() as any;

  } catch (error) {
    console.error("Database error fetching product:", error);
    throw new Error("Failed to load masterpiece details");
  }

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-transparent selection:bg-luxury-gold selection:text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-40 pb-32">
        <Link href="/products" className="inline-flex items-center gap-3 text-luxury-dark/40 hover:text-luxury-gold transition-all duration-500 mb-16 group">
          <div className="w-10 h-10 rounded-2xl bg-white border border-luxury-platinum/50 flex items-center justify-center group-hover:bg-luxury-dark group-hover:text-white transition-all duration-500 shadow-sm">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
          </div>
          <span className="uppercase tracking-[0.4em] text-[10px] font-bold">Return to Gift House</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          {/* Image Section */}
          <div className="sticky top-40">
            <ProductGallery images={product.images || []} />
          </div>

          {/* Details Section */}
          <div className="flex flex-col space-y-12">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-luxury-gold font-bold uppercase tracking-[0.4em] text-xs">{product.category}</p>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-luxury-dark leading-tight">{product.name}</h1>
              </div>

              <div className="flex items-center gap-6">
                <span className="text-4xl font-bold text-luxury-dark">₹{product.price.toLocaleString()}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-luxury-gold px-5 py-2.5 rounded-2xl border border-luxury-gold/20 bg-luxury-gold/5 shadow-sm">
                  Available in Vault
                </span>
              </div>

              <div className="w-16 h-[1.5px] bg-luxury-gold/30" />

              <p className="text-luxury-dark/60 leading-relaxed text-lg font-medium">
                {product.description}
              </p>
            </div>

            <BookingAction product={{
              name: product.name,
              price: product.price,
              category: product.category,
              images: product.images
            }} />

            {/* Exclusive Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-16 border-t border-luxury-platinum/30">
              <div className="flex gap-5 group">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-luxury-pearl border border-luxury-platinum/50 flex items-center justify-center text-luxury-gold group-hover:bg-luxury-dark group-hover:text-white transition-all duration-500 shadow-sm">
                  <ShieldCheck size={24} strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-[13px] text-luxury-dark uppercase tracking-tight">Gift House Quality</h4>
                  <p className="text-[10px] text-luxury-dark/40 uppercase font-bold tracking-widest leading-loose">Precision crafted artifacts</p>
                </div>
              </div>

              <div className="flex gap-5 group">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-luxury-pearl border border-luxury-platinum/50 flex items-center justify-center text-luxury-gold group-hover:bg-luxury-dark group-hover:text-white transition-all duration-500 shadow-sm">
                  <Star size={24} strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-[13px] text-luxury-dark uppercase tracking-tight">Curation Elite</h4>
                  <p className="text-[10px] text-luxury-dark/40 uppercase font-bold tracking-widest leading-loose">Hand-selected masterpieces</p>
                </div>
              </div>

              <div className="flex gap-5 group">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-luxury-pearl border border-luxury-platinum/50 flex items-center justify-center text-luxury-gold group-hover:bg-luxury-dark group-hover:text-white transition-all duration-500 shadow-sm">
                  <Gem size={24} strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-[13px] text-luxury-dark uppercase tracking-tight">Luxury DNA</h4>
                  <p className="text-[10px] text-luxury-dark/40 uppercase font-bold tracking-widest leading-loose">Exquisite build quality</p>
                </div>
              </div>

              <div className="flex gap-5 group">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-luxury-pearl border border-luxury-platinum/50 flex items-center justify-center text-luxury-gold group-hover:bg-luxury-dark group-hover:text-white transition-all duration-500 shadow-sm">
                  <Award size={24} strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-[13px] text-luxury-dark uppercase tracking-tight">Heritage Value</h4>
                  <p className="text-[10px] text-luxury-dark/40 uppercase font-bold tracking-widest leading-loose">Timeless collectible asset</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

