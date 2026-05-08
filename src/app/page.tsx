import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import { ArrowRight, Star, Clock, Truck, ShieldCheck, MapPin, ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import BackgroundEffects from "@/components/BackgroundEffects";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import CategoryCard from "@/components/CategoryCard";
import Magnetic from "@/components/Magnetic";

export default async function Home() {
  await connectDB();
  
  // Fetch featured products (latest 8 for the slider)
  const featuredProducts = await Product.find()
    .sort({ createdAt: -1 })
    .limit(8)
    .lean();

  const premiumCategories = [
    { name: "Toys", icon: "🧸" },
    { name: "Metal Cars", icon: "🏎️" },
    { name: "Diecast Cars", icon: "🚗" },
    { name: "Stationery", icon: "📝" },
    { name: "RC Cars", icon: "🎮" },
    { name: "Watches", icon: "⌚" },
    { name: "Wall Clocks", icon: "⏰" },
    { name: "Sunglasses", icon: "🕶️" },
    { name: "Dolls", icon: "👗" },
    { name: "Balls", icon: "⚽" },
    { name: "Perfumes", icon: "🧴" },
  ];

  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden selection:bg-luxury-gold selection:text-black">
      <BackgroundEffects />
      
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[100] bg-white/5">
         <div className="h-full bg-luxury-gold shadow-[0_0_10px_rgba(212,175,55,0.8)] w-0" id="scroll-progress" />
      </div>

      <Navbar />
      <Hero />

      {/* Stats Section */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            { label: "Established", value: 2014, suffix: "", icon: Clock },
            { label: "Premium Products", value: 1000, suffix: "+", icon: Star },
            { label: "Happy Collectors", value: 5000, suffix: "+", icon: ShieldCheck },
            { label: "Global Brands", value: 50, suffix: "+", icon: Truck },
          ].map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="glass-card p-6 md:p-10 text-center group hover:border-luxury-gold/30 transition-all duration-500 hover:bg-white/[0.02]">
                <stat.icon className="mx-auto mb-6 text-luxury-gold group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500" size={32} />
                <h3 className="text-3xl md:text-5xl font-black mb-2 tracking-tighter italic">
                  <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                </h3>
                <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Featured Products - Premium Slider */}
      <section className="py-32 px-6 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent relative z-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="left">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter italic uppercase">
                  Featured <span className="text-luxury-gold">Vault</span>
                </h2>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-luxury-gold" />
                  <p className="text-gray-400 text-xs uppercase tracking-[0.4em] font-bold">Curated Excellence for Discerning Collectors</p>
                </div>
              </div>
              <Magnetic>
                <Link href="/products" className="hidden md:flex items-center gap-3 text-luxury-gold hover:text-white transition-colors font-black text-xs uppercase tracking-[0.3em] group">
                  Enter Catalog <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </Magnetic>
            </div>
          </ScrollReveal>

          <div className="relative group">
            <div className="flex gap-8 overflow-x-auto pb-12 pt-4 hide-scrollbar snap-x-mandatory scroll-smooth" id="product-slider">
              {featuredProducts.length > 0 ? (
                featuredProducts.map((product: any, i: number) => (
                  <div key={product._id.toString()} className="min-w-[300px] md:min-w-[380px] snap-center">
                    <ScrollReveal delay={i * 0.1}>
                      <ProductCard product={JSON.parse(JSON.stringify(product))} />
                    </ScrollReveal>
                  </div>
                ))
              ) : (
                <div className="w-full py-40 text-center glass-card border-white/10">
                  <p className="text-gray-500 italic text-xl uppercase tracking-widest">Our vault is being curated.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-32 px-6 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter italic uppercase">
                Browse <span className="text-luxury-gold">Atelier</span>
              </h2>
              <p className="text-gray-500 text-xs uppercase tracking-[0.5em] font-bold">Discover our diverse luxury departments</p>
            </div>
          </ScrollReveal>
          
          {/* Mobile Horizontal Swipe */}
          <div className="md:hidden flex gap-4 overflow-x-auto pb-8 hide-scrollbar snap-x-mandatory">
            {premiumCategories.map((cat, i) => (
              <div key={cat.name} className="min-w-[160px] snap-center">
                <CategoryCard name={cat.name} icon={cat.icon} delay={i * 0.05} />
              </div>
            ))}
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {premiumCategories.map((cat, i) => (
              <CategoryCard key={cat.name} name={cat.name} icon={cat.icon} delay={i * 0.05} />
            ))}
            <ScrollReveal delay={premiumCategories.length * 0.05}>
              <Link 
                href="/products"
                className="glass-card p-8 h-full flex flex-col items-center justify-center text-center group border-luxury-gold/20 bg-luxury-gold/5 hover:bg-luxury-gold/10 transition-all duration-500"
              >
                <ArrowRight className="text-luxury-gold mb-4 group-hover:translate-x-2 transition-transform" size={40} />
                <span className="font-black tracking-[0.2em] uppercase text-[10px] text-luxury-gold">View All</span>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24">
          <div className="flex-1 space-y-12">
            <ScrollReveal direction="right">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase leading-none">
                Excellence <br />
                <span className="text-luxury-gold text-3xl md:text-5xl tracking-[0.2em]">Is Not Optional</span>
              </h2>
            </ScrollReveal>
            
            <div className="grid gap-8">
              {[
                { title: "Curated Collection", desc: "Handpicked masterpieces from the world's most prestigious brands.", value: 100, suffix: "%" },
                { title: "Local Heritage", desc: "Trusted Kochi landmark serving collectors since 2014.", value: 10, suffix: "Yrs" },
                { title: "Unrivaled Quality", desc: "Rigorous quality standards for every single item in our vault.", value: 99, suffix: "%" },
              ].map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 0.1} direction="right">
                  <div className="flex gap-6 group">
                    <div className="w-16 h-16 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-luxury-gold font-black text-xl group-hover:bg-luxury-gold group-hover:text-black transition-all duration-500">
                      <AnimatedCounter to={item.value} suffix={item.suffix} duration={1.5} />
                    </div>
                    <div>
                      <h4 className="font-black uppercase tracking-widest text-sm mb-2 group-hover:text-luxury-gold transition-colors">{item.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full relative">
            <ScrollReveal direction="left">
              <div className="relative group">
                <div className="absolute -inset-4 bg-luxury-gold/20 blur-2xl rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="glass-card overflow-hidden border-white/20 shadow-2xl relative z-10 rounded-[2rem]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none" />
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.066697436798!2d76.29296412507814!3d10.005443440100269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d12ae496bb1%3A0xc6b4dac9ca2e4cdf!2sNew%20Bismi%20Gift%20House!5e1!3m2!1sen!2sin!4v1777956639256!5m2!1sen!2sin"
                    width="100%"
                    height="500"
                    style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(90%) contrast(90%)" }}
                    loading="lazy"
                    className="group-hover:scale-105 transition-transform duration-1000"
                  ></iframe>
                  
                  <div className="absolute bottom-8 left-8 z-20 bg-black/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 group-hover:border-luxury-gold/50 transition-colors">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-3 h-3 rounded-full bg-luxury-gold animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Our Kochi Atelier</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin size={14} className="text-luxury-gold" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Palarivattom, Kochi</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Luxury Footer Disclaimer */}
      <div className="py-20 text-center relative z-10">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto px-6">
            <div className="w-20 h-[1px] bg-luxury-gold/30 mx-auto mb-10" />
            <p className="text-gray-500 text-[10px] uppercase tracking-[0.8em] leading-relaxed font-bold">
              ESTABLISHED 2014 • NEW BISMI GIFT HOUSE • KOCHI • PREEMINENT LUXURY TOY & GIFT ATELIER
            </p>
          </div>
        </ScrollReveal>
      </div>

      <Footer />
      
      {/* Scroll to Top Script */}
      <script dangerouslySetInnerHTML={{ __html: `
        window.addEventListener('scroll', () => {
          const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
          const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scrolled = (winScroll / height) * 100;
          document.getElementById('scroll-progress').style.width = scrolled + '%';
        });
      `}} />
    </main>
  );
}

