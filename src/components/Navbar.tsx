"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { LogOut, Menu, X, User as UserIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 sm:px-6 ${isScrolled ? "py-2" : "py-6"}`}>
      <div className={`max-w-7xl mx-auto flex items-center justify-between glass-card px-4 sm:px-6 border-white/20 transition-all duration-500 ${isScrolled ? "py-2 backdrop-blur-2xl bg-black/40 shadow-[0_10px_40px_rgba(0,0,0,0.4)]" : "py-4 backdrop-blur-md bg-transparent"}`}>
        <Link href="/" className="flex items-center gap-3 min-w-[200px] md:min-w-[320px] group">
          <div className={`rounded-full overflow-hidden bg-white/10 border border-white/20 group-hover:scale-110 transition-all duration-500 relative shrink-0 ${isScrolled ? "w-8 h-8 md:w-9 md:h-9" : "w-10 h-10 md:w-12 md:h-12"}`}>
            <Image 
              src="https://res.cloudinary.com/dpmpefw2p/image/upload/v1777816907/ChatGPT_Image_May_2_2026_10_10_10_PM_tmkr5c.png" 
              alt="NEW BISMI Logo" 
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 32px, 48px"
            />
          </div>
          <h1 className={`text-white font-black tracking-wide uppercase whitespace-nowrap bg-gradient-to-r from-white via-luxury-gold to-white bg-clip-text text-transparent italic transition-all duration-500 ${isScrolled ? "text-sm md:text-lg" : "text-base md:text-2xl"}`}>
            NEW BISMI GIFT HOUSE
          </h1>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:text-luxury-gold relative group ${
                pathname === link.href ? "text-white" : "text-gray-400"
              }`}
            >
              {link.name}
              <motion.div 
                className={`absolute -bottom-2 left-0 right-0 h-[2px] bg-luxury-gold shadow-[0_0_10px_rgba(212,175,55,0.8)] ${pathname === link.href ? "opacity-100" : "opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100"}`}
                initial={false}
                transition={{ duration: 0.3 }}
              />
            </Link>
          ))}
        </div>

        {/* Auth / User */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <UserIcon size={16} className="text-gray-400" />
                <span className="text-xs font-medium">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-red-400"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link href="/login" className="btn-primary py-2 text-xs px-6">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-24 left-6 right-6 p-6 glass-card border-white/20 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-medium ${
                  pathname === link.href ? "text-white" : "text-gray-400"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10">
              {user ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <UserIcon size={18} className="text-gray-400" />
                    <span>{user.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-2 text-red-400 font-medium"
                  >
                    <LogOut size={20} /> Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary w-full text-center"
                >
                  Login
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
