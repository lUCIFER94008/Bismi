"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, Check } from "lucide-react";

interface CategoryDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const categories = [
  "Gifts",
  "Toys",
  "Diecast Cars",
  "Metal Cars",
  "Stationary",
  "Office Items",
  "Dolls",
  "Wall Clocks",
  "Watches",
  "Sunglasses",
  "Remote Cars",
];

const CategoryDropdown = ({ value, onChange }: CategoryDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCategories = categories.filter((cat) =>
    cat.toLowerCase().includes(search.toLowerCase())
  );

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
            className="absolute z-[70] w-full mt-2 rounded-2xl overflow-hidden backdrop-blur-xl bg-luxury-dark/90 border border-white/10 shadow-[0_0_40px_rgba(255,0,255,0.15)]"
          >
            {/* Search Input */}
            <div className="p-3 border-b border-white/10 bg-white/5 flex items-center gap-2">
              <Search size={16} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent border-none outline-none text-sm w-full text-white placeholder:text-gray-600"
                autoFocus
              />
            </div>

            {/* List */}
            <div className="max-h-64 overflow-y-auto no-scrollbar py-2">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((cat, index) => (
                  <motion.button
                    key={cat}
                    type="button"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => {
                      onChange(cat);
                      setIsOpen(false);
                      setSearch("");
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-all hover:bg-white/10 ${
                      value === cat ? "text-luxury-gold bg-white/5" : "text-gray-300"
                    }`}
                  >
                    <span>{cat}</span>
                    {value === cat && <Check size={14} />}
                  </motion.button>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-gray-500 text-sm">
                  No categories found
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
