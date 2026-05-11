"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, Check, Plus, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { CATEGORIES, getCategoryIcon } from "@/constants/categories";

interface CategoryDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const CategoryDropdown = ({ value, onChange }: CategoryDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [dbCategories, setDbCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (Array.isArray(data)) {
        setDbCategories(data);
      }
    } catch {
      console.error("Error fetching categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Combine static CATEGORIES with any custom ones from DB
  const allAvailableCategories = [
    ...CATEGORIES.map(c => ({ name: c.name, icon: c.icon, isStatic: true })),
    ...dbCategories
      .filter(dbCat => !CATEGORIES.find(c => c.name === dbCat.name))
      .map(c => ({ name: c.name, icon: c.icon || "✨", isStatic: false }))
  ];

  const filteredCategories = allAvailableCategories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddCategory = async () => {
    if (!search.trim()) return;
    setAdding(true);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: search.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Category added to vault");
        setDbCategories([...dbCategories, data]);
        onChange(data.name);
        setIsOpen(false);
        setSearch("");
      } else {
        toast.error(data.error || "Failed to add category");
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setAdding(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="glass-input w-full flex items-center justify-between group transition-all duration-300 hover:border-luxury-gold/50 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)] py-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-luxury-gold opacity-80">{getCategoryIcon(value)}</span>
          <span className={`text-sm font-bold uppercase tracking-widest ${value ? "text-[#111111]" : "text-[#7C7C7C]"}`}>
            {value || "Select Masterpiece Category"}
          </span>
        </div>
        <ChevronDown
          size={18}
          className={`text-[#6B7280] transition-transform duration-300 ${
            isOpen ? "rotate-180 text-luxury-gold" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 5, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute z-[70] w-full mt-2 rounded-2xl overflow-hidden backdrop-blur-2xl bg-white/95 border border-[#E5E4E2] shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
          >
            {/* Search Input */}
            <div className="p-4 border-b border-[#E5E4E2] bg-[#F8F8F8] flex items-center gap-3">
              <Search size={18} className="text-luxury-gold" />
              <input
                type="text"
                placeholder="Search collections..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent border-none outline-none text-xs font-bold uppercase tracking-widest w-full text-[#111111] placeholder:text-[#7C7C7C]"
                autoFocus
              />
            </div>

            {/* List */}
            <div className="max-h-80 overflow-y-auto no-scrollbar py-2">
              {loading ? (
                <div className="px-4 py-8 text-center">
                  <Loader2 className="animate-spin mx-auto text-luxury-gold" size={20} />
                </div>
              ) : filteredCategories.length > 0 ? (
                filteredCategories.map((cat, index) => (
                  <motion.button
                    key={cat.name}
                    type="button"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02 }}
                    onClick={() => {
                      onChange(cat.name);
                      setIsOpen(false);
                      setSearch("");
                    }}
                    className={`w-full flex items-center justify-between px-5 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-[#F8F8F8] border-l-2 ${
                      value === cat.name 
                        ? "text-luxury-gold bg-luxury-gold/5 border-luxury-gold" 
                        : "text-[#6B7280] border-transparent hover:text-[#111111]"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-lg">{cat.icon}</span>
                      <span>{cat.name}</span>
                    </div>
                    {value === cat.name && <Check size={14} className="text-luxury-gold" />}
                  </motion.button>
                ))
              ) : (
                <div className="px-6 py-12 text-center">
                  <p className="text-[#6B7280] text-[10px] uppercase tracking-widest font-bold mb-6">No matches in our vault</p>
                  {search.trim() && (
                    <button
                      type="button"
                      onClick={handleAddCategory}
                      disabled={adding}
                      className="text-luxury-gold flex items-center gap-2 mx-auto hover:scale-105 transition-transform font-black text-[10px] uppercase tracking-[0.3em] border border-luxury-gold/20 px-6 py-3 rounded-xl bg-luxury-gold/5"
                    >
                      {adding ? <Loader2 className="animate-spin" size={14} /> : <Plus size={14} />}
                      Add "{search}"
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryDropdown;

