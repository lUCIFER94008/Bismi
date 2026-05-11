"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { LogOut, Menu, X, User as UserIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CategoryNavbar from "./CategoryNavbar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me"); 
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    };
    checkAuth();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      localStorage.removeItem("token");
      setUser(null);
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
  ];

  if (user?.role === "admin") {
    navLinks.push({ name: "Admin", href: "/admin" });
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 sm:px-6 ${isScrolled ? "py-3" : "py-8"}`}>
      <div className={`max-w-7xl mx-auto flex items-center justify-between glass-card px-4 sm:px-8 border-luxury-platinum/50 transition-all duration-500 ${isScrolled ? "py-3 shadow-xl" : "py-5 shadow-none"}`}>
        <Link href="/" className="flex items-center gap-4 min-w-[200px] md:min-w-[340px] group">
          <div className={`rounded-2xl overflow-hidden bg-white shadow-sm border border-luxury-platinum/30 group-hover:scale-105 group-hover:rotate-3 transition-all duration-700 relative shrink-0 ${isScrolled ? "w-10 h-10" : "w-12 h-12"}`}>
            <Image 
              src="https://res.cloudinary.com/dpmpefw2p/image/upload/v1777816907/ChatGPT_Image_May_2_2026_10_10_10_PM_tmkr5c.png" 
              alt="NEW BISMI Logo" 
              fill
              priority
              className="object-contain p-1"
              sizes="(max-width: 768px) 40px, 48px"
            />
          </div>
          <div className="flex flex-col">
            <h1 className={`text-[#111111] font-bold tracking-tight whitespace-nowrap transition-all duration-500 ${isScrolled ? "text-sm md:text-lg" : "text-base md:text-xl"}`}>
              NEW BISMI <span className="text-luxury-gold">GIFT HOUSE</span>
            </h1>
            {!isScrolled && (
              <span className="text-[8px] uppercase tracking-[0.3em] text-[#444444] font-black">Curated Luxury House</span>
            )}
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-[11px] font-black uppercase tracking-[0.25em] transition-all duration-300 hover:text-luxury-gold relative group ${
                pathname === link.href ? "text-[#111111]" : "text-[#444444]"
              }`}
            >
              {link.name}
              <motion.div 
                className={`absolute -bottom-2 left-0 right-0 h-[1.5px] bg-luxury-gold ${pathname === link.href ? "opacity-100" : "opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100"}`}
                initial={false}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              />
            </Link>
          ))}
        </div>

        {/* Auth / User */}
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-luxury-pearl border border-luxury-platinum/50 shadow-sm">
                <UserIcon size={14} className="text-luxury-gold" />
                <span className="text-[11px] font-black tracking-wider text-[#111111]">{user.name.split(' ')[0]}</span>
              </div>
              <button
                onClick={handleLogout}
                className="w-10 h-10 flex items-center justify-center rounded-2xl bg-red-50 text-red-500 border border-red-100 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link href="/login" className="btn-luxury py-2.5 text-[11px] px-8 tracking-widest uppercase">
              Enter Vault
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-2xl bg-luxury-pearl border border-luxury-platinum/50 text-luxury-dark"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Luxury Category Navigation - Only Desktop & Only Products Page */}
      {mounted && !isScrolled && pathname === "/products" && <CategoryNavbar />}

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="lg:hidden absolute top-28 left-6 right-6 p-8 glass-card border-luxury-platinum/50 shadow-2xl flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-bold uppercase tracking-widest ${
                  pathname === link.href ? "text-luxury-gold" : "text-luxury-dark/70"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-6 border-t border-luxury-platinum/30">
              {user ? (
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <UserIcon size={18} className="text-luxury-gold" />
                    <span className="font-bold text-luxury-dark">{user.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="btn-luxury w-full bg-red-500 hover:bg-red-600 border-none"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="btn-luxury w-full text-center tracking-widest uppercase"
                >
                  Enter Vault
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
