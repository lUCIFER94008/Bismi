"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      } else {
        setError(data.error || "Login failed");
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
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-luxury-gold/20 rounded-full blur-3xl" />

          <div className="text-center mb-10">
             <div className="inline-flex p-3 rounded-2xl bg-white/5 border border-white/10 mb-4">
                <LogIn className="text-luxury-gold" size={32} />
             </div>
             <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome Back</h1>
             <p className="text-gray-500">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="glass-input w-full pl-12"
                  placeholder="name@example.com"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-medium text-gray-400">Password</label>
                <Link href="#" className="text-xs text-luxury-gold hover:underline">Forgot?</Link>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glass-input w-full pl-12"
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
              className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-lg disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Sign In"}
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-white font-semibold hover:underline">
              Create one
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default LoginPage;
