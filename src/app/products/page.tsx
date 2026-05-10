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
    <div className="max-w-7xl mx-auto px-6 mb-32">
      <div className="flex flex-col lg:flex-row gap-16 items-start justify-between mb-24">
        <div className="max-w-2xl space-y-6">
          <ScrollReveal>
            <h1 className="text-6xl md:text-[5.5rem] font-bold tracking-tighter text-luxury-dark leading-[0.9]">
              THE <span className="text-gold-gradient italic font-black">COLLECTION</span>
            </h1>
            <div className="flex items-center gap-6 mt-6">
              <div className="w-16 h-[1.5px] bg-luxury-gold" />
              <p className="text-luxury-dark/40 text-[11px] uppercase tracking-[0.5em] font-bold">
                A Curated Selection of Precision Artifacts
              </p>
            </div>
          </ScrollReveal>
        </div>

        <div className="w-full lg:w-auto pt-8">
          {/* Search */}
          <ScrollReveal direction="left">
            <form onSubmit={handleSearchSubmit} className="relative group">
              <input
                type="text"
                placeholder="Search the collection..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="glass-input w-full lg:w-[420px] pl-16 pr-14 py-6 text-[13px] font-bold tracking-wide shadow-sm"
              />
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-luxury-dark/40 group-focus-within:text-luxury-gold transition-colors duration-500" size={20} strokeWidth={2} />
              {searchTerm && (
                <button 
                  type="button"
                  onClick={() => {setSearchTerm(""); updateFilters(selectedCategory, "")}}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-luxury-dark/30 hover:text-luxury-gold transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </form>
          </ScrollReveal>
        </div>
      </div>

      {/* Category Filter Navigation */}
      <div className="mb-24">
        <div className="flex flex-wrap gap-4 items-center">
          {categoryFilters.map((cat, i) => (
            <ScrollReveal key={cat.name} delay={i * 0.03} direction="up">
              <button
                onClick={() => handleCategoryChange(cat.name)}
                className={`group flex items-center gap-3.5 px-8 py-4 rounded-2xl text-[11px] font-bold uppercase tracking-[0.25em] transition-all border shadow-sm ${
                  selectedCategory === cat.name 
                    ? "bg-luxury-dark text-white border-luxury-dark scale-105 shadow-xl" 
                    : "bg-white/60 text-luxury-dark/60 border-luxury-platinum/50 hover:border-luxury-gold hover:text-luxury-dark hover:bg-white"
                }`}
              >
                <span className={`text-base transition-transform duration-500 group-hover:scale-125 ${selectedCategory === cat.name ? "" : "grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100"}`}>
                  {cat.icon}
                </span>
                {cat.name}
                <span className={`text-[9px] font-bold ${selectedCategory === cat.name ? "text-luxury-gold" : "text-luxury-dark/30"}`}>
                  {cat.count}
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
          >
            {[...Array(8)].map((_, i) => (
              <div key={i} className="glass-card aspect-[4/5] animate-pulse border-luxury-platinum/30 bg-white/40 shadow-sm" />
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
                transition: { staggerChildren: 0.08 }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16"
          >
            {products.map((product: any) => (
              <motion.div
                key={product._id}
                variants={{
                  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)" }
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="empty"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card py-48 text-center border-luxury-platinum/50 bg-white/40 shadow-sm"
          >
            <div className="max-w-md mx-auto space-y-10">
              <div className="w-24 h-24 bg-luxury-pearl rounded-full flex items-center justify-center mx-auto border border-luxury-platinum/50 shadow-inner">
                <Search size={36} strokeWidth={1} className="text-luxury-gold" />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-luxury-dark uppercase tracking-tight">The Vault is Silent</h3>
                <p className="text-luxury-dark/40 text-[11px] uppercase tracking-[0.4em] font-bold leading-relaxed max-w-sm mx-auto">
                  Our curators are currently sourcing new masterpieces. Please explore other exquisite categories.
                </p>
              </div>
              <button 
                onClick={() => {setSearchTerm(""); setSelectedCategory("All"); updateFilters("All", "")}}
                className="btn-luxury px-12 py-5 text-[11px] font-bold uppercase tracking-[0.3em]"
              >
                Reset Selection
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
    <main className="min-h-screen relative pt-40 bg-transparent">
      <Navbar />
      <Suspense fallback={<div className="py-60 text-center"><Loader2 className="animate-spin mx-auto text-luxury-gold" size={48} /></div>}>
        <ProductsContent />
      </Suspense>
      <Footer />
    </main>
  );
};

export default ProductsPage;

