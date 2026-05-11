// Deployment Trigger
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { ArrowRight, Star, Clock, Truck, ShieldCheck, MapPin } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import CategoryCard from "@/components/CategoryCard";
import Magnetic from "@/components/Magnetic";
import ScrollProgress from "@/components/ScrollProgress";
import { CATEGORIES } from "@/constants/categories";

import { getDynamicCategories } from "@/lib/categories";

export const revalidate = 0; // Force dynamic rendering for real-time inventory sync

export default async function Home() {
  let featuredProducts: any[] = [];
  let dynamicCategories: any[] = [];
  
  try {
    await connectDB();
    
    // Fetch latest 8 products for the vault
    const productsRaw = await Product.find()
      .sort({ createdAt: -1 })
      .limit(8)
      .lean();
    
    featuredProducts = JSON.parse(JSON.stringify(productsRaw));
    dynamicCategories = await getDynamicCategories();
    
  } catch (error) {
    console.error("Critical Data Fetch Error:", error);
  }

  return (
    <main className="min-h-screen relative overflow-x-hidden selection:bg-luxury-gold selection:text-white bg-transparent">
      <ScrollProgress />

      <Navbar />
      <Hero />

      {/* Stats Section */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
          {[
            { label: "Established House", value: 2014, suffix: "", icon: Clock },
            { label: "Curated Artifacts", value: featuredProducts.length * 12, suffix: "+", icon: Star },
            { label: "Elite Collectors", value: 5000, suffix: "+", icon: ShieldCheck },
            { label: "Global Presence", value: 50, suffix: "+", icon: Truck },
          ].map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="glass-card p-8 md:p-12 text-center group hover:border-luxury-gold/50 transition-all duration-700 bg-white/60 shadow-sm hover:shadow-xl">
                <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-luxury-pearl border border-luxury-platinum/50 flex items-center justify-center text-luxury-gold group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-inner">
                  <stat.icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-4xl md:text-6xl font-bold mb-3 tracking-tighter text-luxury-dark">
                  <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                </h3>
                <p className="text-luxury-dark/60 text-[10px] uppercase tracking-[0.4em] font-bold">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Featured Vault - Latest Arrivals */}
      <section className="py-40 px-6 relative z-10 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="left">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
              <div className="space-y-6">
                <h2 className="text-6xl md:text-[5.5rem] font-bold tracking-tighter text-[#111111] leading-[0.9]">
                  LATEST <br />
                  <span className="text-gold-gradient font-black italic uppercase">Arrivals</span>
                </h2>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-[1.5px] bg-luxury-gold" />
                  <p className="text-[#6B7280] text-[11px] uppercase tracking-[0.5em] font-black">Elite Collection Refresh</p>
                </div>
              </div>
              <Magnetic>
                <Link href="/products" className="hidden md:flex items-center gap-4 text-[#111111] hover:text-luxury-gold transition-colors font-bold text-[11px] uppercase tracking-[0.4em] group pb-4 border-b border-luxury-platinum/50">
                  Enter Catalog <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform duration-500" />
                </Link>
              </Magnetic>
            </div>
          </ScrollReveal>

          <div className="relative group">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {featuredProducts.length > 0 ? (
                featuredProducts.map((product: any, i: number) => (
                  <ScrollReveal key={product._id} delay={i * 0.1}>
                    <ProductCard product={product} />
                  </ScrollReveal>
                ))
              ) : (
                <div className="col-span-full py-48 text-center glass-card border-luxury-platinum/50 bg-white/40">
                  <p className="text-[#111111] font-bold text-xl uppercase tracking-[0.4em]">The vault is currently being curated.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section - Dynamic Highlights */}
      <section className="py-40 px-6 relative z-10 overflow-hidden bg-luxury-pearl/50 border-y border-[#E5E4E2] backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-24 space-y-4">
              <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-[#111111] leading-[0.9]">
                ELITE <span className="text-gold-gradient italic font-black">DEPARTMENTS</span>
              </h2>
              <p className="text-[#6B7280] text-[11px] uppercase tracking-[0.6em] font-black">Explore Our Collection by Category</p>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
            {dynamicCategories.slice(0, 11).map((cat, i) => (
              <CategoryCard key={cat.name} name={cat.name} icon={cat.icon} delay={i * 0.05} />
            ))}
            <ScrollReveal delay={Math.min(dynamicCategories.length, 11) * 0.05}>
              <Link 
                href="/products"
                className="glass-card p-10 h-full flex flex-col items-center justify-center text-center group border-[#E5E4E2] bg-white/80 hover:bg-white hover:border-luxury-gold transition-all duration-700 shadow-sm"
              >
                <div className="w-16 h-16 rounded-full bg-luxury-pearl border border-luxury-platinum/50 flex items-center justify-center mb-6 group-hover:bg-luxury-dark group-hover:text-white transition-all duration-500 shadow-inner">
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
                </div>
                <span className="font-black tracking-[0.3em] uppercase text-[11px] text-[#111111]">All Categories</span>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Excellence Section */}
      <section className="py-40 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-32">
          <div className="flex-1 space-y-16">
            <ScrollReveal direction="right">
              <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-luxury-dark leading-[0.85]">
                EXCELLENCE <br />
                <span className="text-gold-gradient italic font-black">INHERITED</span>
              </h2>
            </ScrollReveal>
            
            <div className="grid gap-10">
              {[
                { title: "Masterpiece Curation", desc: "Handpicked artifacts from the world's most prestigious luxury brands.", value: 100, suffix: "%" },
                { title: "Gift House Heritage", desc: "Trusted Kochi landmark serving discerning collectors since 2014.", value: 10, suffix: "Yrs" },
                { title: "Elite Standards", desc: "Rigorous quality benchmarks for every item entering our vault.", value: 99, suffix: "%" },
              ].map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 0.1} direction="right">
                  <div className="flex gap-8 group">
                    <div className="w-20 h-20 shrink-0 rounded-3xl bg-white border border-luxury-platinum shadow-sm flex items-center justify-center text-luxury-dark font-bold text-2xl group-hover:bg-luxury-dark group-hover:text-white transition-all duration-700">
                      <AnimatedCounter to={item.value} suffix={item.suffix} duration={1.5} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold uppercase tracking-[0.2em] text-[13px] text-luxury-dark group-hover:text-luxury-gold transition-colors">{item.title}</h4>
                      <p className="text-luxury-dark/50 text-[14px] leading-relaxed font-medium max-w-sm">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full relative">
            <ScrollReveal direction="left">
              <div className="relative group">
                <div className="absolute -inset-6 bg-luxury-gold/10 blur-[100px] rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="glass-card overflow-hidden border-luxury-platinum/50 shadow-2xl relative z-10 rounded-[3rem] bg-white/40 p-2">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.066697436798!2d76.29296412507814!3d10.005443440100269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d12ae496bb1%3A0xc6b4dac9ca2e4cdf!2sNew%20Bismi%20Gift%20House!5e1!3m2!1sen!2sin!4v1777956639256!5m2!1sen!2sin"
                    width="100%"
                    height="540"
                    style={{ border: 0, filter: "grayscale(1) contrast(1.1) brightness(1.05)" }}
                    loading="lazy"
                    className="group-hover:scale-105 transition-transform duration-[2s] rounded-[2.8rem]"
                  ></iframe>
                  
                  <div className="absolute bottom-10 left-10 z-20 bg-white/90 backdrop-blur-xl p-8 rounded-3xl border border-luxury-platinum/50 shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-3 h-3 rounded-full bg-luxury-gold shadow-[0_0_12px_rgba(197,160,89,0.5)]" />
                      <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-luxury-dark">The Kochi Gift House</span>
                    </div>
                    <div className="flex items-center gap-3 text-luxury-dark/60">
                      <MapPin size={16} className="text-luxury-gold" />
                      <span className="text-[11px] font-bold uppercase tracking-[0.3em]">Palarivattom, Kochi</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Luxury Footer Disclaimer */}
      <div className="py-32 text-center relative z-10 border-t border-luxury-platinum/20">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto px-6">
            <div className="w-24 h-[1.5px] bg-luxury-gold/30 mx-auto mb-12" />
            <p className="text-luxury-dark/30 text-[11px] uppercase tracking-[1em] leading-loose font-bold">
              ESTABLISHED 2014 • NEW BISMI • KOCHI • PREEMINENT MASTERPIECE GIFT HOUSE
            </p>
          </div>
        </ScrollReveal>
      </div>

      <Footer />
    </main>
  );
}

