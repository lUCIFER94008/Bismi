"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, Check, Plus, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface CategoryDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const CategoryDropdown = ({ value, onChange }: CategoryDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (Array.isArray(data)) {
        setCategories(data);
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

  const filteredCategories = categories.filter((cat) =>
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
        toast.success("Category added successfully");
        setCategories([...categories, data]);
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
        className="glass-input w-full flex items-center justify-between group transition-all duration-300 hover:border-luxury-gold/50 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)]"
      >
        <span className={value ? "text-white" : "text-gray-500"}>
          {value || "Select Category"}
        </span>
        <ChevronDown
          size={18}
          className={`text-gray-500 transition-transform duration-300 ${
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
            className="absolute z-[70] w-full mt-2 rounded-2xl overflow-hidden backdrop-blur-xl bg-luxury-dark/90 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
          >
            {/* Search Input */}
            <div className="p-3 border-b border-white/10 bg-white/5 flex items-center gap-2">
              <Search size={16} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search or add category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent border-none outline-none text-sm w-full text-white placeholder:text-gray-600"
                autoFocus
              />
            </div>

            {/* List */}
            <div className="max-h-64 overflow-y-auto no-scrollbar py-2">
              {loading ? (
                <div className="px-4 py-8 text-center">
                  <Loader2 className="animate-spin mx-auto text-luxury-gold" size={20} />
                </div>
              ) : filteredCategories.length > 0 ? (
                filteredCategories.map((cat, index) => (
                  <motion.button
                    key={cat._id}
                    type="button"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => {
                      onChange(cat.name);
                      setIsOpen(false);
                      setSearch("");
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-all hover:bg-white/10 ${
                      value === cat.name ? "text-luxury-gold bg-white/5" : "text-gray-300"
                    }`}
                  >
                    <span>{cat.name}</span>
                    {value === cat.name && <Check size={14} />}
                  </motion.button>
                ))
              ) : (
                <div className="px-4 py-8 text-center">
                  <p className="text-gray-500 text-sm mb-4">No categories found</p>
                  {search.trim() && (
                    <button
                      type="button"
                      onClick={handleAddCategory}
                      disabled={adding}
                      className="text-luxury-gold flex items-center gap-2 mx-auto hover:underline font-bold text-xs uppercase tracking-widest"
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

