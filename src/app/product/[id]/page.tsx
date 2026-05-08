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
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <Link href="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
          <span className="uppercase tracking-[0.2em] text-[10px] font-bold">Back to Gallery</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Section */}
          <ProductGallery images={product.images || []} />

          {/* Details Section */}
          <div className="flex flex-col">
            <div className="mb-8">
              <p className="text-luxury-gold font-bold uppercase tracking-[0.2em] text-sm mb-4">{product.category}</p>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-white italic">{product.name}</h1>
              <div className="flex items-center gap-4 text-3xl font-bold text-white mb-6">
                <span className="text-luxury-gold">₹{product.price.toLocaleString()}</span>
                <span className="text-xs font-black uppercase tracking-widest text-green-500 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/5">
                  Available Now
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed text-lg mb-8">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-12 border-t border-white/10">
              <div className="flex gap-4 group">
                <div className="p-3 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 group-hover:bg-yellow-400/20 transition-all">
                  <ShieldCheck className="text-yellow-400" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white uppercase tracking-tighter mb-1 text-[12px]">Elite Quality</h4>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest leading-relaxed">Exclusively sourced luxury materials</p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="p-3 rounded-2xl bg-purple-400/10 border border-purple-400/20 group-hover:bg-purple-400/20 transition-all">
                  <Star className="text-purple-400" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white uppercase tracking-tighter mb-1 text-[12px]">Artisanal Build</h4>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest leading-relaxed">Unmatched craftsmanship in every detail</p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="p-3 rounded-2xl bg-blue-400/10 border border-blue-400/20 group-hover:bg-blue-400/20 transition-all">
                  <Gem className="text-blue-400" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white uppercase tracking-tighter mb-1 text-[12px]">Luxury Standard</h4>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest leading-relaxed">Defining the peak of sophistication</p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="p-3 rounded-2xl bg-luxury-gold/10 border border-luxury-gold/20 group-hover:bg-luxury-gold/20 transition-all">
                  <Award className="text-luxury-gold" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white uppercase tracking-tighter mb-1 text-[12px]">Heritage Item</h4>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest leading-relaxed">A timeless addition to your collection</p>
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

