"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { UserPlus, Mail, Lock, User, Loader2, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        router.push("/");
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-6 pt-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card w-full max-w-md p-8 md:p-12 relative overflow-hidden"
        >
          {/* Background Highlight */}
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-luxury-gold/10 rounded-full blur-3xl" />

          <div className="text-center mb-10">
             <div className="inline-flex p-3 rounded-2xl bg-white/5 border border-white/10 mb-4">
                <UserPlus className="text-luxury-gold" size={32} />
             </div>
             <h1 className="text-3xl font-bold tracking-tight mb-2 uppercase italic">Create Account</h1>
             <p className="text-gray-500 font-medium">Join the exclusive world of Bismi</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 ml-1 uppercase tracking-widest">Full Name</label>
              <div className="relative">
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="glass-input w-full pl-12 font-medium"
                  placeholder="John Doe"
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 ml-1 uppercase tracking-widest">Email Address</label>
              <div className="relative">
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="glass-input w-full pl-12 font-medium"
                  placeholder="name@example.com"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 ml-1 uppercase tracking-widest">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="glass-input w-full pl-12 font-medium"
                  placeholder="••••••••"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20 text-center">
                {error}
              </p>
            )}

            <button
              disabled={loading}
              type="submit"
              className="btn-primary w-full py-5 flex items-center justify-center gap-3 text-sm font-black uppercase tracking-[0.2em] disabled:opacity-50 mt-4 shadow-[0_20px_40px_rgba(255,255,255,0.05)]"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Register Now"}
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>

          <div className="mt-10 text-center text-xs text-gray-500 uppercase tracking-widest font-bold">
            Already have an account?{" "}
            <Link href="/login" className="text-white hover:text-luxury-gold transition-colors">
              Sign In
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default RegisterPage;
