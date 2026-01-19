"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";
import { useState, useEffect, useRef } from "react";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  Search,
  Heart,
  ChevronDown,
  Package,
  LogOut,
  MapPin,
  Truck,
  Shield,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { fetchApi, cn } from "@/lib/utils";
import { ClientOnly } from "@/components/client-only";
import Image from "next/image";
import { toast, Toaster } from "sonner";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { cart, getCartItemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const searchInputRef = useRef(null);
  const navbarRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchApi("/public/categories");
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <>
      <header ref={navbarRef} className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "shadow-lg bg-white" : "bg-white"}`}>
        <Toaster position="top-center" richColors />
        
        {/* Top Bar */}
        <div className="bg-[#2D2D2D] text-white hidden md:block">
          <div className="section-container">
            <div className="flex items-center justify-between py-2 text-xs">
              <div className="flex items-center gap-6">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-primary" />
                  Free Shipping on ₹999+
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-primary" />
                  100% Genuine Products
                </span>
              </div>
              <div className="flex items-center gap-4">
                <a href="tel:+919650509356" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                  +91 9650509356
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="border-b border-gray-100">
          <div className="section-container">
            <div className="flex items-center justify-between h-16 md:h-[72px]">
              
              {/* Logo */}
              <Link href="/" className="flex-shrink-0">
                <Image src="/logo.png" alt="D-Fix Kart" width={120} height={45} className="h-10 md:h-11 w-auto" priority />
              </Link>

              {/* Desktop Search */}
              <div className="hidden lg:flex flex-1 max-w-md mx-8">
                <form onSubmit={handleSearch} className="w-full">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-11 pl-11 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                    />
                  </div>
                </form>
              </div>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-1">
                <Link href="/products" className={`nav-link ${pathname === "/products" ? "nav-link-active" : ""}`}>
                  All Products
                </Link>
                
                <div className="relative" onMouseEnter={() => setActiveDropdown("categories")} onMouseLeave={() => setActiveDropdown(null)}>
                  <button className={`nav-link flex items-center gap-1 ${activeDropdown === "categories" ? "text-primary" : ""}`}>
                    Categories <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === "categories" ? "rotate-180" : ""}`} />
                  </button>
                  
                  {activeDropdown === "categories" && (
                    <div className="absolute left-0 top-full pt-2 z-50">
                      <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[200px]">
                        {categories.slice(0, 8).map((cat) => (
                          <Link key={cat.id} href={`/category/${cat.slug}`} className="block px-4 py-2.5 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 transition-all">
                            {cat.name}
                          </Link>
                        ))}
                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <Link href="/categories" className="block px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/5">
                            View All →
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Link href="/about" className={`nav-link ${pathname === "/about" ? "nav-link-active" : ""}`}>
                  About
                </Link>
                <Link href="/contact" className={`nav-link ${pathname === "/contact" ? "nav-link-active" : ""}`}>
                  Contact
                </Link>
              </nav>

              {/* Right Actions */}
              <div className="flex items-center gap-1">
                <button onClick={() => setIsSearchOpen(true)} className="lg:hidden p-2.5 text-gray-600 hover:text-primary rounded-lg transition-colors">
                  <Search className="w-5 h-5" />
                </button>

                <Link href="/wishlist" className="hidden md:flex p-2.5 text-gray-600 hover:text-primary rounded-lg transition-colors">
                  <Heart className="w-5 h-5" />
                </Link>

                <ClientOnly>
                  <Link href="/cart" className="p-2.5 text-gray-600 hover:text-primary rounded-lg transition-colors relative">
                    <ShoppingCart className="w-5 h-5" />
                    {getCartItemCount() > 0 && (
                      <span className="absolute top-1 right-1 min-w-[16px] h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                        {getCartItemCount()}
                      </span>
                    )}
                  </Link>
                </ClientOnly>

                {/* Account */}
                <div className="relative hidden md:block" onMouseEnter={() => setActiveDropdown("account")} onMouseLeave={() => setActiveDropdown(null)}>
                  <ClientOnly>
                    <button className="p-2.5 text-gray-600 hover:text-primary rounded-lg transition-colors">
                      {isAuthenticated ? (
                        <div className="w-8 h-8 bg-[#2D2D2D] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                      ) : (
                        <User className="w-5 h-5" />
                      )}
                    </button>

                    {activeDropdown === "account" && (
                      <div className="absolute right-0 top-full pt-2 z-50">
                        <div className="bg-white rounded-xl shadow-xl border border-gray-100 w-56 overflow-hidden">
                          {isAuthenticated ? (
                            <>
                              <div className="bg-gray-50 p-4 border-b border-gray-100">
                                <p className="font-semibold text-gray-900 truncate">{user?.name || "User"}</p>
                                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                              </div>
                              <div className="py-2">
                                <Link href="/account" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:text-primary hover:bg-gray-50" onClick={() => setActiveDropdown(null)}>
                                  <User className="w-4 h-4" /> My Profile
                                </Link>
                                <Link href="/account/orders" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:text-primary hover:bg-gray-50" onClick={() => setActiveDropdown(null)}>
                                  <Package className="w-4 h-4" /> My Orders
                                </Link>
                                <Link href="/account/addresses" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:text-primary hover:bg-gray-50" onClick={() => setActiveDropdown(null)}>
                                  <MapPin className="w-4 h-4" /> Addresses
                                </Link>
                              </div>
                              <div className="border-t border-gray-100 py-2">
                                <button onClick={() => { handleLogout(); setActiveDropdown(null); }} className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50">
                                  <LogOut className="w-4 h-4" /> Sign Out
                                </button>
                              </div>
                            </>
                          ) : (
                            <div className="p-4">
                              <p className="text-sm text-gray-600 mb-3">Sign in to access your account</p>
                              <div className="space-y-2">
                                <Link href="/auth" className="block" onClick={() => setActiveDropdown(null)}>
                                  <Button className="w-full btn-primary h-10">Sign In</Button>
                                </Link>
                                <Link href="/auth?tab=register" className="block" onClick={() => setActiveDropdown(null)}>
                                  <Button variant="outline" className="w-full h-10">Create Account</Button>
                                </Link>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </ClientOnly>
                </div>

                <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-2.5 text-gray-600 hover:text-gray-900 rounded-lg">
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 lg:hidden" onClick={() => setIsSearchOpen(false)}>
          <div className="bg-white p-4" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-12 bg-gray-50 border border-gray-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <button type="button" onClick={() => setIsSearchOpen(false)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <Image src="/logo.png" alt="D-Fix Kart" width={100} height={35} className="h-8 w-auto" />
              <button onClick={() => setIsMenuOpen(false)} className="p-2 text-gray-500 hover:text-gray-700 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <ClientOnly>
              {isAuthenticated ? (
                <div className="p-4 bg-gray-50 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#2D2D2D] rounded-full flex items-center justify-center text-white font-bold">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user?.name || "User"}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 border-b border-gray-100 flex gap-2">
                  <Link href="/auth" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full btn-primary">Sign In</Button>
                  </Link>
                  <Link href="/auth?tab=register" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full">Register</Button>
                  </Link>
                </div>
              )}
            </ClientOnly>

            <div className="flex-1 overflow-y-auto py-4">
              <div className="px-4 space-y-1">
                <Link href="/products" className="block px-4 py-3 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg font-medium" onClick={() => setIsMenuOpen(false)}>
                  All Products
                </Link>
                <Link href="/categories" className="block px-4 py-3 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg font-medium" onClick={() => setIsMenuOpen(false)}>
                  Categories
                </Link>
                <Link href="/wishlist" className="block px-4 py-3 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg font-medium" onClick={() => setIsMenuOpen(false)}>
                  Wishlist
                </Link>
                <Link href="/cart" className="block px-4 py-3 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg font-medium" onClick={() => setIsMenuOpen(false)}>
                  Cart
                </Link>
                <Link href="/about" className="block px-4 py-3 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg font-medium" onClick={() => setIsMenuOpen(false)}>
                  About Us
                </Link>
                <Link href="/contact" className="block px-4 py-3 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg font-medium" onClick={() => setIsMenuOpen(false)}>
                  Contact
                </Link>
              </div>

              <ClientOnly>
                {isAuthenticated && (
                  <div className="mt-4 pt-4 border-t border-gray-100 px-4">
                    <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Account</p>
                    <Link href="/account" className="block px-4 py-2.5 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>
                      Profile
                    </Link>
                    <Link href="/account/orders" className="block px-4 py-2.5 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>
                      My Orders
                    </Link>
                    <Link href="/account/addresses" className="block px-4 py-2.5 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>
                      Addresses
                    </Link>
                    <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                      Sign Out
                    </button>
                  </div>
                )}
              </ClientOnly>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 safe-area-pb">
        <div className="grid grid-cols-4">
          <Link href="/" className={`flex flex-col items-center py-2.5 ${pathname === "/" ? "text-primary" : "text-gray-500"}`}>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-[10px] mt-0.5 font-medium">Home</span>
          </Link>
          <Link href="/categories" className={`flex flex-col items-center py-2.5 ${pathname === "/categories" ? "text-primary" : "text-gray-500"}`}>
            <Package className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 font-medium">Categories</span>
          </Link>
          <Link href="/cart" className={`flex flex-col items-center py-2.5 relative ${pathname === "/cart" ? "text-primary" : "text-gray-500"}`}>
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              <ClientOnly>
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[14px] h-3.5 bg-primary text-white text-[8px] font-bold rounded-full flex items-center justify-center px-0.5">
                    {getCartItemCount()}
                  </span>
                )}
              </ClientOnly>
            </div>
            <span className="text-[10px] mt-0.5 font-medium">Cart</span>
          </Link>
          <Link href={isAuthenticated ? "/account" : "/auth"} className={`flex flex-col items-center py-2.5 ${pathname.includes("/account") || pathname === "/auth" ? "text-primary" : "text-gray-500"}`}>
            <User className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 font-medium">Account</span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
