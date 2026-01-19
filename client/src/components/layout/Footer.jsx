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
    <footer className="bg-[#2D2D2D] lg:mb-0 mb-14">
      {/* Trust Bar */}
      <div className="border-b border-white/10">
        <div className="section-container py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{feature.title}</p>
                  <p className="text-gray-400 text-xs">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="section-container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block mb-5">
              <Image src="/logo.png" alt="D-Fix Kart" width={140} height={50} className="h-12 w-auto brightness-0 invert" />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Your trusted destination for premium quality products. Fast delivery, secure payments, and 100% genuine products guaranteed.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-primary transition-all duration-300"
                  title={social.name}
                >
                  <social.icon className="h-4 w-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="footer-heading">Shop</h3>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="footer-heading">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h3 className="footer-heading mt-6">Policies</h3>
            <ul className="space-y-3">
              {policyLinks.slice(0, 2).map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="footer-heading">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <a href="mailto:support@dfixkart.com" className="text-gray-400 hover:text-primary text-sm transition-colors">
                  support@dfixkart.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <a href="tel:+919650509356" className="text-gray-400 hover:text-primary text-sm transition-colors">
                  +91 9650509356
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  New Delhi, India
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="section-container py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} D-Fix Kart. All rights reserved.
            </p>
            
            {/* Payment Icons */}
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-xs mr-2">We accept:</span>
              {["UPI", "VISA", "Mastercard", "COD"].map((pay) => (
                <div key={pay} className="px-2.5 py-1 bg-white/10 rounded text-xs text-gray-300 font-medium">
                  {pay}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
