"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import CategoryDropdown from "@/components/CategoryDropdown";
import ImageUpload from "@/components/ImageUpload";
import { Plus, Trash2, LayoutDashboard, Package, Loader2, X, DollarSign, FileText, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      alert("Please upload an image first");
      return;
    }
    if (!formData.category) {
      alert("Please select a category");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ name: "", price: "", category: "", description: "", image: "" });
        fetchProducts();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to add product");
      }
    } catch (err) {
      alert("Failed to add product");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts(products.filter((p: any) => p._id !== id));
      }
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-6">
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
               <span className="text-sm font-bold uppercase tracking-widest">Admin Control</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Product Inventory</h1>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary flex items-center gap-2 px-8 py-4 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all"
          >
            <Plus size={20} /> Add New Product
          </button>
        </motion.div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           {[
             { label: "Total Items", value: products.length, icon: Package },
             { label: "Active Categories", value: new Set(products.map((p: any) => p.category)).size, icon: LayoutDashboard },
             { label: "Premium Access", value: "Verified", icon: DollarSign, color: "text-luxury-gold" }
           ].map((stat, i) => (
             <motion.div 
               key={stat.label}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="glass-card p-6 border-white/10 group hover:border-white/20 transition-all"
             >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider">{stat.label}</p>
                    <h3 className={`text-3xl font-bold ${stat.color || ""}`}>{stat.value}</h3>
                  </div>
                  <stat.icon className="text-gray-600 group-hover:text-luxury-gold transition-colors" size={24} />
                </div>
             </motion.div>
           ))}
        </div>

        {/* Products Table */}
        <div className="glass-card overflow-hidden border-white/10 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="p-6 font-bold text-sm uppercase tracking-wider text-gray-400">Product</th>
                  <th className="p-6 font-bold text-sm uppercase tracking-wider text-gray-400">Category</th>
                  <th className="p-6 font-bold text-sm uppercase tracking-wider text-gray-400">Price</th>
                  <th className="p-6 font-bold text-sm uppercase tracking-wider text-gray-400">Date Added</th>
                  <th className="p-6 font-bold text-sm uppercase tracking-wider text-gray-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-20 text-center">
                       <Loader2 className="animate-spin mx-auto text-luxury-gold mb-4" size={32} />
                       <p className="text-gray-500 font-medium">Curating your inventory...</p>
                    </td>
                  </tr>
                ) : products.length > 0 ? (
                  products.map((product: any, idx: number) => (
                    <motion.tr 
                      key={product._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-white/[0.03] transition-colors group"
                    >
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-white/5 border border-white/10 p-1 group-hover:border-luxury-gold/50 transition-colors">
                            <img src={product.image} alt="" className="w-full h-full object-contain" />
                          </div>
                          <span className="font-bold text-white group-hover:text-luxury-gold transition-colors">{product.name}</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-400">
                          {product.category}
                        </span>
                      </td>
                      <td className="p-6 font-bold text-white">₹{product.price}</td>
                      <td className="p-6 text-gray-500 text-sm">
                        {new Date(product.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                      </td>
                      <td className="p-6 text-right">
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-3 rounded-xl bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white transition-all border border-red-500/10 hover:border-red-500 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-20 text-center text-gray-500 italic">
                      Inventory is empty. Elevate your collection by adding products.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              className="glass-card w-full max-w-4xl relative z-10 p-8 md:p-12 border-white/20 shadow-[0_0_100px_rgba(212,175,55,0.1)]"
            >
              <div className="absolute top-6 right-6">
                 <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-white/10 rounded-full transition-all hover:rotate-90">
                    <X size={24} />
                 </button>
              </div>

              <div className="flex items-center gap-4 mb-12">
                 <div className="p-3 rounded-2xl bg-luxury-gold/10 border border-luxury-gold/20">
                    <Plus className="text-luxury-gold" size={28} />
                 </div>
                 <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">Add New Product</h2>
                    <p className="text-gray-500 text-sm uppercase tracking-widest mt-1 font-bold">Premium Inventory Management</p>
                 </div>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                
                {/* Left Side: Upload & Category */}
                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-400 flex items-center gap-2 uppercase tracking-widest">
                       <Upload size={16} className="text-luxury-gold" /> Product Photography
                    </label>
                    <ImageUpload 
                      value={formData.image} 
                      onChange={(url) => setFormData({ ...formData, image: url })} 
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-400 flex items-center gap-2 uppercase tracking-widest">
                       <LayoutDashboard size={16} className="text-luxury-gold" /> Collection Category
                    </label>
                    <CategoryDropdown 
                      value={formData.category} 
                      onChange={(val) => setFormData({ ...formData, category: val })} 
                    />
                  </div>
                </div>

                {/* Right Side: Details */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Product Title</label>
                    <div className="relative group">
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="glass-input w-full pl-12 group-focus-within:border-luxury-gold/50 text-white font-medium"
                          placeholder="e.g. Vintage Diecast Racing Car"
                        />
                        <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-luxury-gold transition-colors" size={18} />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Retail Price (₹)</label>
                    <div className="relative group">
                        <input
                          type="number"
                          required
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          className="glass-input w-full pl-12 group-focus-within:border-luxury-gold/50 text-white font-bold text-lg"
                          placeholder="0"
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-luxury-gold font-bold text-xl transition-colors">₹</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Item Description</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="glass-input w-full resize-none focus:border-luxury-gold/50 text-white leading-relaxed"
                      placeholder="Crafted with precision, this item features..."
                    />
                  </div>

                  <div className="flex gap-4 pt-6">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="btn-glass flex-1 py-4 text-sm font-bold tracking-widest uppercase"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting || !formData.image || !formData.category}
                      className="btn-primary flex-1 py-4 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm font-bold tracking-widest uppercase shadow-xl hover:shadow-white/10"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="animate-spin" size={20} /> Publishing...
                        </>
                      ) : (
                        <>
                          Publish Product <Plus size={20} />
                        </>
                      )}
                    </button>
                  </div>
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
