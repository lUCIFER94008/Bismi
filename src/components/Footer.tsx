import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Globe, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black/50 backdrop-blur-xl border-t border-white/10 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 relative rounded-full overflow-hidden">
              <Image 
                src="https://res.cloudinary.com/dpmpefw2p/image/upload/v1777816907/ChatGPT_Image_May_2_2026_10_10_10_PM_tmkr5c.png" 
                alt="Logo" 
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
            <span className="font-bold text-lg tracking-tight uppercase italic">NEW BISMI GIFT HOUSE</span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            NEW BISMI GIFT HOUSE offers a curated collection of premium toys, diecast models, luxury accessories, and elegant stationery crafted for every special occasion.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white hover:text-black transition-all">
              <Globe size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white hover:text-black transition-all">
              <Globe size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white hover:text-black transition-all">
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Quick Links</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
            <li><Link href="/login" className="hover:text-white transition-colors">Admin Login</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Categories</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><Link href="/products?category=Toys" className="hover:text-white transition-colors">Toys & Games</Link></li>
            <li><Link href="/products?category=Watches" className="hover:text-white transition-colors">Luxury Watches</Link></li>
            <li><Link href="/products?category=Office" className="hover:text-white transition-colors">Office & Stationary</Link></li>
            <li><Link href="/products?category=Diecast" className="hover:text-white transition-colors">Diecast Models</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Contact Us</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex gap-3">
              <MapPin size={18} className="text-white shrink-0" />
              <span>17, Desabhimani Rd, Palarivattom, Kochi, Kerala 682017</span>
            </li>
            <li className="flex gap-3">
              <Phone size={18} className="text-white shrink-0" />
              <span>+91 9605773773</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em]">
        <p>© {new Date().getFullYear()} NEW BISMI GIFT HOUSE. All rights reserved.</p>
        <p className="flex items-center gap-2">
          Designed by{" "}
          <a
            href="https://www.pixelriftonline.online/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-luxury-gold hover:text-white transition-all duration-300 font-black relative group"
          >
            Pixelrift
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-luxury-gold group-hover:w-full transition-all duration-300" />
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
