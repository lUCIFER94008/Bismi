import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import { ArrowRight, Star, Clock, Truck, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  await connectDB();
  
  // Fetch featured products (latest 4)
  const featuredProducts = await Product.find()
    .sort({ createdAt: -1 })
    .limit(4)
    .lean();

  // Fetch dynamic categories from Category model
  let categories = await Category.find()
    .sort({ name: 1 })
    .limit(6)
    .lean();

  // Fallback: If no categories defined, get from products
  if (categories.length === 0) {
    const productCategories = await Product.distinct("category");
    const iconMap: { [key: string]: string } = {
      "Toys": "🧸",
      "Diecast": "🚗",
      "Cars": "🏎️",
      "Watches": "⌚",
      "Gifts": "🎁",
      "Stationary": "📝",
      "Office": "📁",
      "Dolls": "👗",
      "Clocks": "⏰",
      "Sunglasses": "🕶️",
      "Remote": "🎮",
    };

    categories = productCategories.slice(0, 6).map(name => ({
      _id: name,
      name,
      icon: Object.entries(iconMap).find(([k]) => name.includes(k))?.[1] || "✨"
    })) as any;
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { label: "Founded", value: "2014", icon: Clock },
            { label: "Products", value: "1000+", icon: Star },
            { label: "Delivery", value: "Fast", icon: Truck },
            { label: "Quality", value: "Premium", icon: ShieldCheck },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-8 text-center group hover:bg-white/10 transition-all duration-300">
              <stat.icon className="mx-auto mb-4 text-luxury-gold group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-3xl font-bold mb-1 tracking-tight">{stat.value}</h3>
              <p className="text-gray-500 text-sm uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-4 tracking-tight italic">Featured Arrivals</h2>
              <p className="text-gray-500 text-xs uppercase tracking-[0.3em] font-black">Handpicked luxury items for your perfect gift.</p>
            </div>
            <Link href="/products" className="hidden md:flex items-center gap-2 text-luxury-gold hover:underline font-bold text-xs uppercase tracking-widest">
              View All <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product: any) => (
                <ProductCard key={product._id.toString()} product={JSON.parse(JSON.stringify(product))} />
              ))
            ) : (
              <div className="col-span-full py-40 text-center glass-card border-white/10">
                <p className="text-gray-500 italic text-xl">Our vault is being curated. Check back soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center tracking-tight italic">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.map((cat: any) => (
                <Link 
                  key={cat._id.toString()} 
                  href={`/products?category=${cat.name}`}
                  className="glass-card p-8 text-center hover:bg-white hover:text-black transition-all duration-500 group border-white/10"
                >
                  <span className="text-4xl mb-4 block group-hover:scale-125 transition-transform duration-300">
                    {cat.icon || "🎁"}
                  </span>
                  <span className="font-bold tracking-tight uppercase text-xs">{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-8 tracking-tight italic">Why Choose Bismi Gift House?</h2>
            <div className="space-y-6">
              <p className="text-gray-400 leading-relaxed font-medium">
                Located in the heart of Kochi, we are more than just a gift shop. We are a destination for collectors and gift enthusiasts who value quality and exclusivity.
              </p>
              <ul className="space-y-4">
                {[
                  "Exclusive collection of Diecast Models",
                  "Original branded Toys & Games",
                  "Luxury Watches & Accessories",
                  "Premium Office & School Stationary",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-300 font-bold text-sm uppercase tracking-wide">
                    <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="glass-card overflow-hidden border-white/20 shadow-2xl">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.066697436798!2d76.29296412507814!3d10.005443440100269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d12ae496bb1%3A0xc6b4dac9ca2e4cdf!2sNew%20Bismi%20Gift%20House!5e1!3m2!1sen!2sin!4v1777956639256!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

