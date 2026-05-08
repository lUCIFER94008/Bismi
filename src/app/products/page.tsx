"use client";

import { useState, useEffect, Suspense, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Search, Loader2, X } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES } from "@/constants/categories";
import ScrollReveal from "@/components/ScrollReveal";

const ProductsContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [dbCategories, setDbCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalProductsCount, setTotalProductsCount] = useState(0);
  
  // Local state for UI
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All");

  // Sync state with URL when it changes (e.g. back button)
  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "All");
    setSearchTerm(searchParams.get("search") || "");
  }, [searchParams]);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/categories?withCounts=true");
      const data = await res.json();
      if (data.categories) {
        setDbCategories(data.categories);
        setTotalProductsCount(data.totalCount);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const query = new URLSearchParams();
    if (selectedCategory !== "All") query.set("category", selectedCategory);
    if (searchTerm) query.set("search", searchTerm);

    try {
      const res = await fetch(`/api/products?${query.toString()}`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const updateFilters = (category: string, search: string) => {
    const params = new URLSearchParams();
    if (category !== "All") params.set("category", category);
    if (search) params.set("search", search);
    
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    updateFilters(cat, searchTerm);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters(selectedCategory, searchTerm);
  };

  // Combine static CATEGORIES with db counts
  const categoryFilters = [
    { name: "All", icon: "✨", count: totalProductsCount },
    ...CATEGORIES.map(cat => ({
      ...cat,
      count: dbCategories.find(dbCat => dbCat.name === cat.name)?.count || 0
    }))
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 mb-24">
      <div className="flex flex-col lg:flex-row gap-12 items-start justify-between mb-20">
        <div className="max-w-xl">
          <ScrollReveal>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 italic uppercase">
              The <span className="text-luxury-gold">Atelier</span>
            </h1>
            <p className="text-gray-500 text-xs uppercase tracking-[0.4em] font-bold">
              Explore our exclusive world of luxury collectibles
            </p>
          </ScrollReveal>
        </div>

        <div className="w-full lg:w-auto flex flex-col gap-6">
          {/* Search */}
          <ScrollReveal direction="left">
            <form onSubmit={handleSearchSubmit} className="relative group">
              <input
                type="text"
                placeholder="Search collection..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="glass-input w-full lg:w-96 pl-14 pr-12 py-5 text-sm focus:border-luxury-gold/50 transition-all font-medium"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-luxury-gold transition-colors" size={20} />
              {searchTerm && (
                <button 
                  type="button"
                  onClick={() => {setSearchTerm(""); updateFilters(selectedCategory, "")}}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  <X size={18} />
                </button>
              )}
            </form>
          </ScrollReveal>
        </div>
      </div>

      {/* Category Filter Navigation */}
      <div className="mb-20">
        <div className="flex flex-wrap gap-4 items-center">
          {categoryFilters.map((cat, i) => (
            <ScrollReveal key={cat.name} delay={i * 0.03} direction="up">
              <button
                onClick={() => handleCategoryChange(cat.name)}
                className={`group flex items-center gap-3 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border ${
                  selectedCategory === cat.name 
                    ? "bg-white text-black border-white shadow-[0_10px_30px_rgba(255,255,255,0.2)] scale-105" 
                    : "bg-white/5 text-gray-500 border-white/10 hover:border-luxury-gold/30 hover:text-white"
                }`}
              >
                <span className={`text-sm group-hover:scale-125 transition-transform duration-300 ${selectedCategory === cat.name ? "" : "grayscale"}`}>
                  {cat.icon}
                </span>
                {cat.name}
                <span className={`text-[8px] opacity-40 font-bold ${selectedCategory === cat.name ? "text-black" : "text-gray-500"}`}>
                  ({cat.count})
                </span>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[...Array(8)].map((_, i) => (
              <div key={i} className="glass-card aspect-[4/5] animate-pulse border-white/5">
                 <div className="w-full h-full bg-white/[0.02]" />
              </div>
            ))}
          </motion.div>
        ) : products.length > 0 ? (
          <motion.div 
            key="products"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.05 }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
          >
            {products.map((product: any) => (
              <motion.div
                key={product._id}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.95, filter: "blur(10px)" },
                  visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="empty"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card py-48 text-center border-white/10"
          >
            <div className="max-w-sm mx-auto">
              <div className="w-20 h-20 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-luxury-gold/20">
                <Search size={32} className="text-luxury-gold" />
              </div>
              <h3 className="text-2xl font-bold mb-4 italic text-white uppercase tracking-tighter">Vault is currently empty</h3>
              <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold leading-relaxed mb-10">
                Our curators are constantly updating the collection. Try exploring other luxury categories.
              </p>
              <button 
                onClick={() => {setSearchTerm(""); setSelectedCategory("All"); updateFilters("All", "")}}
                className="btn-glass px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] border-luxury-gold/20 hover:border-luxury-gold/50"
              >
                Reset All Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProductsPage = () => {
  return (
    <main className="min-h-screen relative pt-32">
      <Navbar />
      <Suspense fallback={<div className="py-40 text-center"><Loader2 className="animate-spin mx-auto text-luxury-gold" size={40} /></div>}>
        <ProductsContent />
      </Suspense>
      <Footer />
    </main>
  );
};

export default ProductsPage;

