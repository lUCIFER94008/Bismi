"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import CategoryDropdown from "@/components/CategoryDropdown";
import ImageUpload from "@/components/ImageUpload";
import { Plus, Trash2, LayoutDashboard, Package, Loader2, X, FileText, DollarSign, Image as ImageIcon, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import Link from "next/link";

const AdminDashboard = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dbCategories, setDbCategories] = useState<any[]>([]);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    images: [] as string[],
  });

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (Array.isArray(data)) setDbCategories(data);
    } catch {
      console.error("Fetch categories error");
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products", { cache: 'no-store' });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
      }
    } catch {
      console.error("Fetch error");
      toast.error("Failed to load inventory");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Are you sure? This will NOT delete products in this category, but the category will disappear from filters.")) return;
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Category removed");
        fetchCategories();
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to remove category");
      }
    } catch {
      toast.error("Error deleting category");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }
    if (!formData.category) {
      toast.error("Please select a category");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Masterpiece published successfully");
        setIsModalOpen(false);
        setFormData({ name: "", price: "", category: "", description: "", images: [] });
        fetchProducts();
        fetchCategories(); // Refresh categories
      } else {
        toast.error(data.error || "Failed to add product");
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently remove this masterpiece?")) return;

    const loadingToast = toast.loading("Removing item...");
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Removed from collection", { id: loadingToast });
        setProducts(prev => prev.filter((p: any) => p._id !== id));
      } else {
        toast.error("Failed to remove item", { id: loadingToast });
      }
    } catch {
      toast.error("Delete failed", { id: loadingToast });
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <Navbar />

      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6"
        >
          <div>
            <div className="flex items-center gap-3 text-luxury-gold mb-2">
               <LayoutDashboard size={20} />
               <span className="text-sm font-bold uppercase tracking-widest">Exclusive Inventory</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#111111] italic">Curated Collection</h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Search collection..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="glass-input pl-12 pr-6 py-4 w-full sm:w-64 text-sm focus:border-luxury-gold/50 transition-all text-[#111111] font-bold"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#444444] group-focus-within:text-luxury-gold transition-colors" size={18} />
            </div>
            <button
              onClick={() => setIsCategoryModalOpen(true)}
              className="btn-glass flex items-center justify-center gap-2 px-6 py-4 border-white/10 hover:border-luxury-gold/30 transition-all text-xs font-bold uppercase tracking-widest"
            >
              <LayoutDashboard size={18} /> Categories
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary flex items-center justify-center gap-2 px-8 py-4 shadow-[0_0_30px_rgba(212,175,55,0.1)] hover:shadow-[0_0_40px_rgba(212,175,55,0.2)] transition-all whitespace-nowrap"
            >
              <Plus size={20} /> Add Masterpiece
            </button>
          </div>
        </motion.div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           {[
             { label: "Total Artifacts", value: products.length, icon: Package },
             { label: "Unique Categories", value: dbCategories.length, icon: LayoutDashboard },
             { label: "Inventory Value", value: `₹${products.reduce((acc, p) => acc + (Number(p.price) || 0), 0).toLocaleString()}`, icon: DollarSign, color: "text-luxury-gold" }
           ].map((stat, i) => (
             <motion.div 
               key={stat.label}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="glass-card p-6 border-white/10 group hover:border-luxury-gold/20 transition-all"
             >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[#666666] text-[10px] mb-1 uppercase tracking-widest font-bold">{stat.label}</p>
                    <h3 className={`text-2xl font-bold ${stat.color || "text-[#111111]"}`}>{stat.value}</h3>
                  </div>
                  <stat.icon className="text-[#444444] group-hover:text-luxury-gold transition-colors" size={24} />
                </div>
             </motion.div>
           ))}
        </div>

        {/* Products Table */}
        <div className="glass-card overflow-hidden border-white/10 shadow-2xl relative">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="p-6 font-bold text-[10px] uppercase tracking-[0.2em] text-[#666666]">Masterpiece</th>
                  <th className="p-6 font-bold text-[10px] uppercase tracking-[0.2em] text-[#666666]">Category</th>
                  <th className="p-6 font-bold text-[10px] uppercase tracking-[0.2em] text-[#666666]">Valuation</th>
                  <th className="p-6 font-bold text-[10px] uppercase tracking-[0.2em] text-[#666666]">Acquisition Date</th>
                  <th className="p-6 font-bold text-[10px] uppercase tracking-[0.2em] text-[#666666] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="p-6"><div className="flex items-center gap-4"><div className="w-14 h-14 rounded-xl bg-white/5" /><div className="space-y-2"><div className="h-4 w-32 bg-white/5 rounded" /><div className="h-3 w-20 bg-white/5 rounded" /></div></div></td>
                      <td className="p-6"><div className="h-4 w-20 bg-white/5 rounded" /></td>
                      <td className="p-6"><div className="h-4 w-16 bg-white/5 rounded" /></td>
                      <td className="p-6"><div className="h-4 w-24 bg-white/5 rounded" /></td>
                      <td className="p-6 text-right"><div className="flex justify-end gap-2"><div className="h-10 w-10 bg-white/5 rounded-xl" /><div className="h-10 w-10 bg-white/5 rounded-xl" /></div></td>
                    </tr>
                  ))
                ) : filteredProducts.length > 0 ? (
                  filteredProducts.map((product: any, idx: number) => (
                    <motion.tr 
                      key={product._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-white/[0.03] transition-colors group"
                    >
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-white/5 border border-white/10 p-1 group-hover:border-luxury-gold/50 transition-colors relative">
                            <Image src={product.images?.[0] || "/placeholder.png"} alt={product.name} fill className="object-cover" sizes="56px" />
                            {product.images?.length > 1 && <div className="absolute bottom-0 right-0 bg-luxury-gold text-black text-[8px] font-black px-1 rounded-tl-md">+{product.images.length - 1}</div>}
                          </div>
                          <Link href={`/product/${product._id}`} className="font-bold text-[#111111] group-hover:text-luxury-gold transition-colors block">
                            {product.name}
                            <span className="block text-[10px] text-[#666666] font-medium uppercase tracking-widest mt-0.5">ID: {product._id.slice(-6)}</span>
                          </Link>
                        </div>
                      </td>
                      <td className="p-6"><span className="px-4 py-1.5 rounded-full bg-white/50 border border-luxury-platinum/50 text-[10px] font-black uppercase tracking-widest text-[#444444]">{product.category}</span></td>
                      <td className="p-6 font-bold text-[#111111] tracking-tight">₹{Number(product.price).toLocaleString()}</td>
                      <td className="p-6 text-[#666666] text-[11px] font-bold uppercase tracking-widest">{new Date(product.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}</td>
                      <td className="p-6 text-right">
                        <div className="flex justify-end gap-2">
                           <Link href={`/product/${product._id}`} className="p-3 rounded-xl bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white transition-all border border-white/10"><FileText size={18} /></Link>
                           <button onClick={() => handleDelete(product._id)} className="p-3 rounded-xl bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white transition-all border border-red-500/10 hover:border-red-500 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr><td colSpan={5} className="p-32 text-center"><div className="max-w-xs mx-auto"><div className="w-24 h-24 bg-luxury-gold/5 border border-luxury-gold/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-luxury-gold/20 animate-pulse"><Package size={48} strokeWidth={1} /></div><h3 className="text-2xl font-bold text-white mb-3 italic">Vault is Empty</h3><p className="text-gray-500 text-[10px] leading-relaxed uppercase tracking-[0.2em] font-black mb-10">Begin your legacy by curating your first exclusive masterpiece.</p><button onClick={() => setIsModalOpen(true)} className="btn-primary px-10 py-4 text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 mx-auto"><Plus size={18} /> Add First Item</button></div></td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Categories Management Modal */}
      <AnimatePresence>
        {isCategoryModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCategoryModalOpen(false)} className="fixed inset-0 bg-black/90 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="glass-card w-full max-w-lg relative z-10 p-8 border-white/10 shadow-2xl">
              <div className="flex justify-between items-center mb-8"><h2 className="text-2xl font-bold italic">Manage Categories</h2><button onClick={() => setIsCategoryModalOpen(false)} className="text-gray-500 hover:text-white"><X size={20} /></button></div>
              <div className="space-y-4 max-h-[60vh] overflow-y-auto no-scrollbar pr-2">
                {dbCategories.length > 0 ? dbCategories.map((cat) => (
                  <div key={cat._id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 group">
                    <div className="flex items-center gap-3"><span className="text-xl">{cat.icon}</span><span className="font-medium text-white">{cat.name}</span></div>
                    <button onClick={() => handleDeleteCategory(cat._id)} className="p-2 rounded-lg bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"><Trash2 size={16} /></button>
                  </div>
                )) : <p className="text-center text-gray-500 py-8">No categories defined yet.</p>}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Product Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12 overflow-y-auto no-scrollbar">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="fixed inset-0 bg-black/95 backdrop-blur-xl" />
            <motion.div initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: 0.95 }} className="glass-card w-full max-w-5xl relative z-10 p-8 md:p-12 border-white/10 shadow-[0_0_100px_rgba(212,175,55,0.15)]">
              <div className="absolute top-8 right-8"><button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-white/10 rounded-full transition-all hover:rotate-90 text-gray-500 hover:text-white"><X size={24} /></button></div>
              <div className="flex items-center gap-6 mb-12"><div className="p-4 rounded-3xl bg-luxury-gold/10 border border-luxury-gold/20 shadow-[0_0_30px_rgba(212,175,55,0.1)]"><Plus className="text-luxury-gold" size={32} /></div><div><h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white uppercase italic">Add Masterpiece</h2><p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] mt-2 font-black">Elite Collection Management</p></div></div>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-10">
                  <div className="space-y-4"><label className="text-[10px] font-black text-gray-500 flex items-center gap-2 uppercase tracking-[0.2em]"><ImageIcon size={16} className="text-luxury-gold" /> Visual Assets (Up to 10)</label><ImageUpload value={formData.images} onChange={(urls) => setFormData({ ...formData, images: urls })} /></div>
                  <div className="space-y-4"><label className="text-[10px] font-black text-gray-500 flex items-center gap-2 uppercase tracking-[0.2em]"><LayoutDashboard size={16} className="text-luxury-gold" /> Curated Category</label><CategoryDropdown value={formData.category} onChange={(val) => setFormData({ ...formData, category: val })} /></div>
                </div>
                <div className="space-y-8">
                  <div className="space-y-4"><label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Artifact Title</label><div className="relative group"><input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="glass-input w-full pl-12 group-focus-within:border-luxury-gold/50 text-white font-bold" placeholder="e.g. Vintage Diecast Racing Car" /><FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-luxury-gold transition-colors" size={18} /></div></div>
                  <div className="space-y-4"><label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Acquisition Value (₹)</label><div className="relative group"><input type="number" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="glass-input w-full pl-12 group-focus-within:border-luxury-gold/50 text-white font-black text-xl" placeholder="0" /><div className="absolute left-4 top-1/2 -translate-y-1/2 text-luxury-gold font-bold text-xl">₹</div></div></div>
                  <div className="space-y-4"><label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Narrative & Description</label><textarea required rows={5} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="glass-input w-full resize-none focus:border-luxury-gold/50 text-white leading-relaxed font-medium" placeholder="Describe the exclusivity and history of this masterpiece..." /></div>
                  <div className="flex gap-6 pt-6"><button type="button" onClick={() => setIsModalOpen(false)} className="btn-glass flex-1 py-5 text-[10px] font-black tracking-[0.3em] uppercase">Cancel</button><button type="submit" disabled={submitting || formData.images.length === 0 || !formData.category} className="btn-primary flex-1 py-5 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-[10px] font-black tracking-[0.3em] uppercase">{submitting ? <><Loader2 className="animate-spin" size={20} /> Processing...</> : <>Publish to Vault <Plus size={20} /></>}</button></div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default AdminDashboard;
