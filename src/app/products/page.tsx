"use client";

import { useState, useEffect, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Search, Filter, Loader2 } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

const ProductsContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All");

  const categories = [
    "All", "Gifts", "Toys", "Diecast", "Metal Cars", "Stationary", 
    "Office", "Dolls", "Clocks", "Watches", "Sunglasses", "Remote Cars"
  ];

  useEffect(() => {
    const fetchProducts = async () => {
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
    };

    fetchProducts();
  }, [selectedCategory, searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
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
          <form onSubmit={handleSearch} className="relative group">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-input w-full md:w-72 pl-12 group-focus-within:border-luxury-gold/50 transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white" size={18} />
          </form>

          {/* Category Filter Desktop */}
          <div className="hidden lg:flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.slice(0, 6).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap border ${
                  selectedCategory === cat 
                    ? "bg-white text-black border-white" 
                    : "bg-white/5 text-gray-400 border-white/10 hover:border-white/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Bar Mobile / Tablet */}
      <div className="flex lg:hidden gap-3 overflow-x-auto pb-6 no-scrollbar mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap border ${
              selectedCategory === cat 
                ? "bg-white text-black border-white shadow-lg shadow-white/10" 
                : "bg-white/5 text-gray-400 border-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <Loader2 className="animate-spin text-luxury-gold" size={40} />
          <p className="text-gray-500 animate-pulse">Curating products for you...</p>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="glass-card py-40 text-center">
          <h3 className="text-xl font-bold mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your filters or search term.</p>
          <button 
            onClick={() => {setSearchTerm(""); setSelectedCategory("All")}}
            className="mt-6 text-luxury-gold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
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
