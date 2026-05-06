import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import ProductGallery from "@/components/ProductGallery";
import { ShoppingCart, Share2, ShieldCheck, Truck, RefreshCcw, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const product = await Product.findById(id);

  if (!product) {
    notFound();
  }

  const whatsappLink = `https://wa.me/919605773773?text=I want to order ${encodeURIComponent(product.name)}`;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <Link href="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Catalog
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
                <span className="text-luxury-gold">₹{product.price}</span>
                <span className="text-xs font-black uppercase tracking-widest text-green-500 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/5">
                  Premium Quality
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed text-lg mb-8">
                {product.description}
              </p>
            </div>

            <div className="space-y-4 mb-12">
               <a
                href={whatsappLink}
                target="_blank"
                className="btn-primary w-full flex items-center justify-center gap-3 py-5 text-lg shadow-[0_0_50px_rgba(212,175,55,0.1)]"
              >
                <ShoppingCart size={24} /> Buy via WhatsApp
              </a>
              <button className="btn-glass w-full flex items-center justify-center gap-3 py-5 text-lg">
                <Share2 size={24} /> Share Masterpiece
              </button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6 pt-12 border-t border-white/10">
              <div className="flex gap-4">
                <ShieldCheck className="text-luxury-gold shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-sm text-white uppercase tracking-tighter">Certified Quality</h4>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Premium original items</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Truck className="text-luxury-gold shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-sm text-white uppercase tracking-tighter">Priority Shipping</h4>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Available across Kochi</p>
                </div>
              </div>
              <div className="flex gap-4">
                <RefreshCcw className="text-luxury-gold shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-sm text-white uppercase tracking-tighter">Elite Exchange</h4>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Within 7 days of purchase</p>
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
