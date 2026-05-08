"use client";

import { useState, useEffect, Suspense, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Search, Loader2, X } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const ProductsContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState<any[]>([]);
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
        setCategories(data.categories);
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

  return (
    <div className="max-w-7xl mx-auto px-6 mb-12">
      <div className="flex flex-col md:flex-row gap-8 items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">Our Collection</h1>
          <p className="text-gray-500 italic">Explore the luxury world of NEW BISMI</p>
        </div>

        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <form onSubmit={handleSearchSubmit} className="relative group">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-input w-full md:w-72 pl-12 pr-10 group-focus-within:border-luxury-gold/50 transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white" size={18} />
            {searchTerm && (
              <button 
                type="button"
                onClick={() => {setSearchTerm(""); updateFilters(selectedCategory, "")}}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                <X size={16} />
              </button>
            )}
          </form>

          {/* Category Filter Desktop */}
          <div className="hidden lg:flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            <button
              onClick={() => handleCategoryChange("All")}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap border ${
                selectedCategory === "All" 
                  ? "bg-white text-black border-white shadow-lg shadow-white/10" 
                  : "bg-white/5 text-gray-400 border-white/10 hover:border-white/30"
              }`}
            >
              All ({totalProductsCount})
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => handleCategoryChange(cat.name)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap border ${
                  selectedCategory === cat.name 
                    ? "bg-white text-black border-white shadow-lg shadow-white/10" 
                    : "bg-white/5 text-gray-400 border-white/10 hover:border-white/30"
                }`}
              >
                {cat.name} ({cat.count || 0})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Bar Mobile / Tablet */}
      <div className="flex lg:hidden gap-3 overflow-x-auto pb-6 no-scrollbar mb-8">
        <button
          onClick={() => handleCategoryChange("All")}
          className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap border ${
            selectedCategory === "All" 
              ? "bg-white text-black border-white shadow-lg shadow-white/10" 
              : "bg-white/5 text-gray-400 border-white/10"
          }`}
        >
          All ({totalProductsCount})
        </button>
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => handleCategoryChange(cat.name)}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap border ${
              selectedCategory === cat.name 
                ? "bg-white text-black border-white shadow-lg shadow-white/10" 
                : "bg-white/5 text-gray-400 border-white/10"
            }`}
          >
            {cat.name} ({cat.count || 0})
          </button>
        ))}
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
              <div key={i} className="glass-card aspect-square animate-pulse">
                 <div className="w-full h-full bg-white/5" />
              </div>
            ))}
          </motion.div>
        ) : products.length > 0 ? (
          <motion.div 
            key="products"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {products.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card py-40 text-center"
          >
            <h3 className="text-xl font-bold mb-2 italic text-white">No items in this collection</h3>
            <p className="text-gray-500 text-xs uppercase tracking-widest font-medium">Try adjusting your filters or explore other categories.</p>
            <button 
              onClick={() => {setSearchTerm(""); setSelectedCategory("All"); updateFilters("All", "")}}
              className="mt-8 text-luxury-gold hover:underline text-xs font-black uppercase tracking-[0.2em]"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProductsPage = () => {
  return (
    <main className="min-h-screen bg-background pt-32">
      <Navbar />
      <Suspense fallback={<div className="py-40 text-center"><Loader2 className="animate-spin mx-auto text-luxury-gold" size={40} /></div>}>
        <ProductsContent />
      </Suspense>
      <Footer />
    </main>
  );
};

export default ProductsPage;

