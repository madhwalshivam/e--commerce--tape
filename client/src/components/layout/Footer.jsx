import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, Facebook, Instagram, Youtube, Truck, Shield, CreditCard, RotateCcw } from "lucide-react";

const shopLinks = [
  { name: "All Products", href: "/products" },
  { name: "New Arrivals", href: "/products?sort=newest" },
  { name: "Best Sellers", href: "/products?sort=popular" },
  { name: "On Sale", href: "/products?sale=true" },
  { name: "Categories", href: "/categories" },
];

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "FAQs", href: "/faqs" },
];

const policyLinks = [
  { name: "Shipping Policy", href: "/shipping-policy" },
  { name: "Return Policy", href: "/return-policy" },
  { name: "Terms & Conditions", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
];

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/dfixkart/", icon: Instagram },
  { name: "Facebook", href: "https://www.facebook.com/dfixkart/", icon: Facebook },
  { name: "YouTube", href: "https://youtube.com/@dfixkart", icon: Youtube },
];

const trustFeatures = [
  { icon: Truck, title: "Free Shipping", desc: "On orders ₹999+" },
  { icon: Shield, title: "100% Genuine", desc: "Authentic products" },
  { icon: RotateCcw, title: "Easy Returns", desc: "30-day returns" },
  { icon: CreditCard, title: "Secure Pay", desc: "SSL encrypted" },
];

export const Footer = () => {
  return (
    <footer className="relative bg-[#1A1A1A] text-white lg:mb-0 mb-14 overflow-hidden">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      
      {/* Trust Bar */}
      <div className="relative border-b border-white/5 bg-white/[0.02] backdrop-blur-sm">
        <div className="section-container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm tracking-wide">{feature.title}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative section-container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <Image src="/logo.png" alt="D-Fix Kart" width={160} height={60} className="h-14 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-opacity" />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Your trusted destination for premium quality products. We ensure fast delivery, secure payments, and 100% genuine products guaranteed for your satisfaction.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 transform hover:-translate-y-1"
                  title={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 font-display tracking-tight">Shop</h3>
            <ul className="space-y-4">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-primary transition-colors text-sm font-medium flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-primary transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-6 font-display tracking-tight">Company</h3>
              <ul className="space-y-4">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-400 hover:text-primary transition-colors text-sm font-medium flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-primary transition-colors" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider opacity-80">Policies</h3>
              <ul className="space-y-3">
                {policyLinks.slice(0, 2).map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-500 hover:text-white transition-colors text-xs">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 font-display tracking-tight">Contact Us</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
                <span className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                  B 19/1 Double Story Ramesh nagar<br />New Delhi 110015
                </span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
                <a href="mailto:dfixventure@gmail.com" className="text-gray-400 hover:text-white text-sm transition-colors font-medium">
                  dfixventure@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Phone className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
                <a href="tel:+918851907674" className="text-gray-400 hover:text-white text-sm transition-colors font-medium">
                  +91 88519 07674
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/5 bg-black/20">
        <div className="section-container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-xs">
              © {new Date().getFullYear()} D-Fix Kart. All rights reserved.
            </p>
            
            {/* Payment Icons */}
            <div className="flex items-center gap-3">
              <span className="text-gray-600 text-xs uppercase tracking-wider font-semibold">Secure Payment:</span>
              <div className="flex gap-2">
                {["UPI", "VISA", "Mastercard", "RuPay"].map((pay) => (
                  <div key={pay} className="px-3 py-1 bg-white/5 border border-white/5 rounded text-[10px] text-gray-400 font-medium hover:bg-white/10 transition-colors cursor-default">
                    {pay}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
