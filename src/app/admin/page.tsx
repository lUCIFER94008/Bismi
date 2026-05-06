"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Plus, Trash2, LayoutDashboard, Package, Upload, Loader2, X, DollarSign, Tag, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Toys",
    description: "",
    image: "",
  });

  const categories = [
    "Gifts", "Toys", "Diecast", "Metal Cars", "Stationary", 
    "Office", "Dolls", "Clocks", "Watches", "Sunglasses", "Remote Cars"
  ];

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (res.ok) {
        setFormData({ ...formData, image: result.secure_url });
      }
    } catch (err) {
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ name: "", price: "", category: "Toys", description: "", image: "" });
        fetchProducts();
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
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 text-luxury-gold mb-2">
               <LayoutDashboard size={20} />
               <span className="text-sm font-bold uppercase tracking-widest">Admin Control</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Product Inventory</h1>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary flex items-center gap-2 px-8"
          >
            <Plus size={20} /> Add New Product
          </button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           <div className="glass-card p-6 border-white/10">
              <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider">Total Items</p>
              <h3 className="text-3xl font-bold">{products.length}</h3>
           </div>
           <div className="glass-card p-6 border-white/10">
              <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider">Active Categories</p>
              <h3 className="text-3xl font-bold">{new Set(products.map((p: any) => p.category)).size}</h3>
           </div>
           <div className="glass-card p-6 border-white/10 bg-luxury-gold/5">
              <p className="text-luxury-gold text-sm mb-1 uppercase tracking-wider">Premium Access</p>
              <h3 className="text-3xl font-bold text-luxury-gold">Verified</h3>
           </div>
        </div>

        {/* Products Table */}
        <div className="glass-card overflow-hidden border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="p-6 font-bold text-sm uppercase tracking-wider">Product</th>
                  <th className="p-6 font-bold text-sm uppercase tracking-wider">Category</th>
                  <th className="p-6 font-bold text-sm uppercase tracking-wider">Price</th>
                  <th className="p-6 font-bold text-sm uppercase tracking-wider">Date Added</th>
                  <th className="p-6 font-bold text-sm uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-20 text-center">
                       <Loader2 className="animate-spin mx-auto text-luxury-gold mb-4" size={32} />
                       <p className="text-gray-500">Loading inventory...</p>
                    </td>
                  </tr>
                ) : products.length > 0 ? (
                  products.map((product: any) => (
                    <tr key={product._id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/5 border border-white/10">
                            <img src={product.image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <span className="font-bold group-hover:text-luxury-gold transition-colors">{product.name}</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium">
                          {product.category}
                        </span>
                      </td>
                      <td className="p-6 font-bold">₹{product.price}</td>
                      <td className="p-6 text-gray-500 text-sm">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-6 text-right">
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2.5 rounded-xl bg-red-400/10 text-red-400 hover:bg-red-400 hover:text-white transition-all border border-red-400/20"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-20 text-center text-gray-500 italic">
                      Inventory is empty. Start adding products.
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
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              className="glass-card w-full max-w-2xl relative z-10 p-8 border-white/20 overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4">
                 <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <X size={20} />
                 </button>
              </div>

              <div className="flex items-center gap-3 mb-8">
                 <Package className="text-luxury-gold" size={24} />
                 <h2 className="text-2xl font-bold">New Product</h2>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4 col-span-full">
                  <label className="text-sm font-medium text-gray-400">Product Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="glass-input w-full"
                    placeholder="Enter product title"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-medium text-gray-400">Price (₹)</label>
                  <div className="relative">
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="glass-input w-full pl-10"
                      placeholder="0.00"
                    />
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-medium text-gray-400">Category</label>
                  <div className="relative">
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="glass-input w-full appearance-none pr-10"
                    >
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <Tag className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                  </div>
                </div>

                <div className="space-y-4 col-span-full">
                  <label className="text-sm font-medium text-gray-400">Description</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="glass-input w-full resize-none"
                    placeholder="Describe the features..."
                  />
                </div>

                <div className="space-y-4 col-span-full">
                  <label className="text-sm font-medium text-gray-400">Product Image</label>
                  {formData.image ? (
                    <div className="relative w-full h-48 rounded-xl overflow-hidden border border-white/20">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-contain bg-white/5" />
                      <button 
                        type="button" 
                        onClick={() => setFormData({...formData, image: ""})}
                        className="absolute top-2 right-2 p-1 bg-red-500 rounded-full"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:bg-white/5 transition-colors group">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {uploading ? (
                           <Loader2 className="animate-spin text-luxury-gold" size={32} />
                        ) : (
                          <>
                            <Upload className="text-gray-500 group-hover:text-white mb-3" size={32} />
                            <p className="text-sm text-gray-400">Click to upload image</p>
                          </>
                        )}
                      </div>
                      <input type="file" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                    </label>
                  )}
                </div>

                <div className="col-span-full flex gap-4 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn-glass flex-1 py-4"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || !formData.image}
                    className="btn-primary flex-1 py-4 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {submitting ? <Loader2 className="animate-spin" size={20} /> : "Publish Product"}
                  </button>
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
