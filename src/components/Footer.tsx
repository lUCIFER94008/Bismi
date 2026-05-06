import Link from "next/link";
import { Phone, MapPin, Globe, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black/50 backdrop-blur-xl border-t border-white/10 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <img 
              src="https://res.cloudinary.com/dpmpefw2p/image/upload/v1777816907/ChatGPT_Image_May_2_2026_10_10_10_PM_tmkr5c.png" 
              alt="Logo" 
              className="w-8 h-8 object-cover rounded-full"
            />
            <span className="font-bold text-lg tracking-tight">NEW BISMI</span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            Premium gift shop offering a wide range of toys, diecast cars, office stationary, and luxury accessories. Since 2014, we bring joy to every occasion.
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
          <h4 className="font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
            <li><Link href="/login" className="hover:text-white transition-colors">Admin Login</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-bold mb-6">Categories</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><Link href="/products?category=Toys" className="hover:text-white transition-colors">Toys & Games</Link></li>
            <li><Link href="/products?category=Watches" className="hover:text-white transition-colors">Luxury Watches</Link></li>
            <li><Link href="/products?category=Office" className="hover:text-white transition-colors">Office & Stationary</Link></li>
            <li><Link href="/products?category=Diecast" className="hover:text-white transition-colors">Diecast Models</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold mb-6">Contact Us</h4>
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

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 text-center text-gray-500 text-xs">
        <p>© {new Date().getFullYear()} NEW BISMI GIFT HOUSE. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
