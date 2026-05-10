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

export default async function Home() {
  let featuredProducts: any[] = [];
  try {
    // Add a small timeout to DB connection to prevent page stall
    await Promise.race([
      connectDB(),
      new Promise((_, reject) => setTimeout(() => reject(new Error("Database Connection Timeout")), 8000))
    ]);
    
    featuredProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(8)
      .lean();
  } catch (error) {
    console.error("Critical Data Fetch Error:", error);
    // Continue rendering with empty products to avoid blank page
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
            { label: "Curated Artifacts", value: 1000, suffix: "+", icon: Star },
            { label: "Elite Collectors", value: 5000, suffix: "+", icon: ShieldCheck },
            { label: "Global Presence", value: 50, suffix: "+", icon: Truck },
          ].map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="glass-card p-8 md:p-12 text-center group hover:border-luxury-gold/50 transition-all duration-700 bg-white/40 shadow-sm hover:shadow-xl">
                <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-luxury-pearl border border-luxury-platinum/50 flex items-center justify-center text-luxury-gold group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <stat.icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-4xl md:text-6xl font-bold mb-3 tracking-tighter text-luxury-dark">
                  <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                </h3>
                <p className="text-luxury-dark/40 text-[10px] uppercase tracking-[0.4em] font-bold">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Featured Products - Luxury Showroom */}
      <section className="py-40 px-6 relative z-10 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="left">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
              <div className="space-y-6">
                <h2 className="text-6xl md:text-[5.5rem] font-bold tracking-tighter text-luxury-dark leading-[0.9]">
                  CURATED <br />
                  <span className="text-gold-gradient font-black italic uppercase">Vault</span>
                </h2>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-[1.5px] bg-luxury-gold" />
                  <p className="text-luxury-dark/50 text-[11px] uppercase tracking-[0.5em] font-bold">Masterpieces for Discerning Collectors</p>
                </div>
              </div>
              <Magnetic>
                <Link href="/products" className="hidden md:flex items-center gap-4 text-luxury-dark hover:text-luxury-gold transition-colors font-bold text-[11px] uppercase tracking-[0.4em] group pb-4">
                  Enter Catalog <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform duration-500" />
                </Link>
              </Magnetic>
            </div>
          </ScrollReveal>

          <div className="relative group">
            <div className="flex gap-10 overflow-x-auto pb-16 pt-4 hide-scrollbar snap-x-mandatory scroll-smooth" id="product-slider">
              {featuredProducts.length > 0 ? (
                featuredProducts.map((product: any, i: number) => (
                  <div key={product._id.toString()} className="min-w-[320px] md:min-w-[420px] snap-center">
                    <ScrollReveal delay={i * 0.1}>
                      <ProductCard product={JSON.parse(JSON.stringify(product))} />
                    </ScrollReveal>
                  </div>
                ))
              ) : (
                <div className="w-full py-48 text-center glass-card border-luxury-platinum/50 bg-white/40">
                  <p className="text-luxury-dark/40 font-bold text-xl uppercase tracking-[0.4em]">The vault is currently being curated.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section - The Gift House */}
      <section className="py-40 px-6 relative z-10 overflow-hidden bg-luxury-pearl/30 border-y border-luxury-platinum/30 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-24 space-y-4">
              <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-luxury-dark leading-[0.9]">
                BROWSE <span className="text-gold-gradient italic font-black">COLLECTIONS</span>
              </h2>
              <p className="text-luxury-dark/40 text-[11px] uppercase tracking-[0.6em] font-bold">Explore Our Diverse Departments</p>
            </div>
          </ScrollReveal>
          
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-8">
            {CATEGORIES.map((cat, i) => (
              <CategoryCard key={cat.name} name={cat.name} icon={cat.icon} delay={i * 0.05} />
            ))}
            <ScrollReveal delay={CATEGORIES.length * 0.05}>
              <Link 
                href="/products"
                className="glass-card p-10 h-full flex flex-col items-center justify-center text-center group border-luxury-platinum/50 bg-white/60 hover:bg-white hover:border-luxury-gold transition-all duration-700 shadow-sm"
              >
                <div className="w-16 h-16 rounded-full bg-luxury-pearl border border-luxury-platinum/50 flex items-center justify-center mb-6 group-hover:bg-luxury-dark group-hover:text-white transition-all duration-500">
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
                </div>
                <span className="font-bold tracking-[0.3em] uppercase text-[11px] text-luxury-dark">All Collections</span>
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

