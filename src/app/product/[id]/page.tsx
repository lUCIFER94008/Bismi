import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { ShoppingCart, Share2, ShieldCheck, Truck, RefreshCcw, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProductDetail({ params }: { params: { id: string } }) {
  await connectDB();
  const product = await Product.findById(params.id);

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
          <div className="space-y-6">
            <div className="glass-card aspect-square overflow-hidden border-white/20">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-8 bg-white/5"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
               {[1,2,3,4].map(i => (
                 <div key={i} className="glass-card aspect-square bg-white/5 border-white/10 opacity-30 cursor-not-allowed" />
               ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col">
            <div className="mb-8">
              <p className="text-luxury-gold font-bold uppercase tracking-[0.2em] text-sm mb-4">{product.category}</p>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 text-2xl font-bold text-white mb-6">
                <span>₹{product.price}</span>
                <span className="text-sm font-medium text-gray-500 px-3 py-1 rounded-full border border-white/10">In Stock</span>
              </div>
              <p className="text-gray-400 leading-relaxed text-lg mb-8">
                {product.description}
              </p>
            </div>

            <div className="space-y-4 mb-12">
               <a
                href={whatsappLink}
                target="_blank"
                className="btn-primary w-full flex items-center justify-center gap-3 py-5 text-lg"
              >
                <ShoppingCart size={24} /> Buy via WhatsApp
              </a>
              <button className="btn-glass w-full flex items-center justify-center gap-3 py-5 text-lg">
                <Share2 size={24} /> Share Product
              </button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6 pt-12 border-t border-white/10">
              <div className="flex gap-4">
                <ShieldCheck className="text-luxury-gold shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-sm">Quality Guaranteed</h4>
                  <p className="text-xs text-gray-500">Premium original items</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Truck className="text-luxury-gold shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-sm">Fast Delivery</h4>
                  <p className="text-xs text-gray-500">Available across Kochi</p>
                </div>
              </div>
              <div className="flex gap-4">
                <RefreshCcw className="text-luxury-gold shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-sm">Easy Exchange</h4>
                  <p className="text-xs text-gray-500">Within 7 days of purchase</p>
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
