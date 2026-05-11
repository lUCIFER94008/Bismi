import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Globe, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white/40 backdrop-blur-3xl border-t border-luxury-platinum/30 pt-32 pb-16 px-6 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20 mb-24">
        {/* Brand */}
        <div className="space-y-8">
          <Link href="/" className="flex flex-col gap-4 group">
            <div className="w-12 h-12 relative rounded-2xl overflow-hidden bg-white border border-luxury-platinum/50 shadow-sm p-1 group-hover:scale-110 transition-transform duration-500">
              <Image 
                src="https://res.cloudinary.com/dpmpefw2p/image/upload/v1777816907/ChatGPT_Image_May_2_2026_10_10_10_PM_tmkr5c.png" 
                alt="NEW BISMI Logo" 
                fill
                priority
                className="object-contain"
                sizes="48px"
              />
            </div>
            <div className="space-y-1">
              <span className="font-bold text-xl tracking-tighter text-[#111111] uppercase">NEW BISMI <span className="text-luxury-gold italic">GIFT HOUSE</span></span>
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#555555] font-black">Curated Luxury House</p>
            </div>
          </Link>
          <p className="text-[#333333] text-[13px] leading-relaxed font-semibold">
            Discover a curated world of luxury artifacts, precision diecast models, and boutique collectibles crafted for the discerning eye.
          </p>
          <div className="flex gap-4">
            {[Globe, Mail].map((Icon, i) => (
              <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center border border-luxury-platinum/50 text-luxury-dark hover:bg-luxury-dark hover:text-white transition-all duration-500 shadow-sm">
                <Icon size={18} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-8">
          <h4 className="font-bold uppercase tracking-[0.3em] text-[11px] text-[#111111]">The Vault</h4>
          <ul className="space-y-5 text-[#333333] text-[13px] font-bold">
            <li><Link href="/" className="hover:text-luxury-gold transition-colors">Gift House Home</Link></li>
            <li><Link href="/products" className="hover:text-luxury-gold transition-colors">Full Collection</Link></li>
            <li><a href="#contact" className="hover:text-luxury-gold transition-colors">Private Inquiry</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="space-y-8">
          <h4 className="font-bold uppercase tracking-[0.3em] text-[11px] text-[#111111]">Collections</h4>
          <ul className="space-y-5 text-[#333333] text-[13px] font-bold">
            <li><Link href="/products?category=Toys" className="hover:text-luxury-gold transition-colors">Masterpiece Toys</Link></li>
            <li><Link href="/products?category=Watches" className="hover:text-luxury-gold transition-colors">Elite Horology</Link></li>
            <li><Link href="/products?category=Diecast" className="hover:text-luxury-gold transition-colors">Precision Diecast</Link></li>
            <li><Link href="/products?category=Crockery" className="hover:text-luxury-gold transition-colors">Luxury Living</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div id="contact" className="space-y-8">
          <h4 className="font-bold uppercase tracking-[0.3em] text-[11px] text-[#111111]">The Residency</h4>
          <ul className="space-y-6 text-[#333333] text-[13px] font-bold">
            <li className="flex gap-4">
              <MapPin size={18} strokeWidth={1.5} className="text-luxury-gold shrink-0" />
              <span>17, Desabhimani Rd, Palarivattom, Kochi, Kerala 682017</span>
            </li>
            <li className="flex gap-4">
              <Phone size={18} strokeWidth={1.5} className="text-luxury-gold shrink-0" />
              <span className="font-bold text-[#111111]">+91 9605773773</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-luxury-platinum/20 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-[#6B7280] text-[10px] uppercase font-bold tracking-[0.3em]">
        <p>© {new Date().getFullYear()} NEW BISMI GIFT HOUSE. ALL RIGHTS RESERVED.</p>
        <p className="flex items-center gap-3">
          CRAFTED BY{" "}
          <a
            href="https://www.pixelriftonline.online/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-luxury-gold hover:text-luxury-dark transition-all duration-500 font-black relative group"
          >
            PIXELRIFT
            <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-luxury-gold group-hover:w-full transition-all duration-500" />
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
