"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import CategoryMegaMenu from "./CategoryMegaMenu";
import { ChevronDown } from "lucide-react";

interface Category {
  _id: string;
  name: string;
  icon: string;
  count: number;
}

const CategoryNavbar = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "All";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories?withCounts=true");
        const data = await res.json();
        if (data.categories) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories for navbar:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (name: string) => {
    if (name === "All") {
      router.push("/products");
    } else {
      router.push(`/products?category=${encodeURIComponent(name)}`);
    }
  };

  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useState<HTMLDivElement | null>(null);
  const listRef = useState<HTMLDivElement | null>(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    const updateConstraints = () => {
      const container = document.getElementById('category-nav-container');
      const list = document.getElementById('category-nav-list');
      if (container && list) {
        const diff = container.offsetWidth - list.scrollWidth;
        setDragConstraints({ left: diff < 0 ? diff : 0, right: 0 });
      }
    };

    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, [categories]);

  if (categories.length === 0) return null;

  return (
    <div className="relative w-full">
      <div 
        id="category-nav-container"
        className="relative w-full border-t border-luxury-platinum/10 mt-4 pt-4 pb-4 hidden lg:block bg-white/40 backdrop-blur-md overflow-x-auto luxury-scrollbar cursor-grab active:cursor-grabbing"
        onMouseLeave={() => setHoveredCategory(null)}
      >
        <style jsx global>{`
          .luxury-scrollbar::-webkit-scrollbar {
            height: 3px;
          }
          .luxury-scrollbar::-webkit-scrollbar-track {
            background: rgba(229, 228, 226, 0.2);
            margin: 0 40px;
          }
          .luxury-scrollbar::-webkit-scrollbar-thumb {
            background: #C8A14B;
            border-radius: 10px;
          }
          .luxury-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #C8A14B rgba(229, 228, 226, 0.2);
          }
        `}</style>
        <motion.div 
          id="category-nav-list"
          drag="x"
          dragConstraints={dragConstraints}
          dragElastic={0.1}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setTimeout(() => setIsDragging(false), 50)}
          className="max-w-7xl mx-auto flex items-center justify-start md:justify-center gap-2 py-2 px-6 w-max min-w-full"
        >
          {/* All / Home Pill */}
          <button
            onClick={() => !isDragging && handleCategoryClick("All")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 whitespace-nowrap pointer-events-auto ${
              activeCategory === "All"
                ? "bg-luxury-gold text-white shadow-[0_0_20px_rgba(200,161,75,0.3)]"
                : "text-[#6B7280] hover:text-[#111111] hover:bg-[#F8F8F8]"
            }`}
          >
            <span>✨</span>
            THE VAULT
          </button>

          {/* Dynamic Category Pills */}
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="relative"
              onMouseEnter={() => !isDragging && setHoveredCategory(cat)}
            >
              <button
                onClick={() => !isDragging && handleCategoryClick(cat.name)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-500 whitespace-nowrap group relative pointer-events-auto ${
                  activeCategory === cat.name
                    ? "text-luxury-gold"
                    : "text-[#6B7280] hover:text-[#111111]"
                }`}
              >
                <span>{cat.icon}</span>
                {cat.name}
                <ChevronDown 
                  size={12} 
                  className={`transition-transform duration-300 ${hoveredCategory?.name === cat.name ? "rotate-180 text-luxury-gold" : "text-[#6B7280]/40"}`} 
                />
                
                {/* Active Underline */}
                {activeCategory === cat.name && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute bottom-0 left-6 right-6 h-[1.5px] bg-luxury-gold"
                    initial={false}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  />
                )}
              </button>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Mega Menu Portal - Outside the scrollable div */}
      <AnimatePresence mode="wait">
        {!isDragging && hoveredCategory && (
          <div onMouseEnter={() => setHoveredCategory(hoveredCategory)} onMouseLeave={() => setHoveredCategory(null)}>
            <CategoryMegaMenu 
              category={hoveredCategory.name} 
              count={hoveredCategory.count} 
              icon={hoveredCategory.icon} 
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );

};

export default CategoryNavbar;
