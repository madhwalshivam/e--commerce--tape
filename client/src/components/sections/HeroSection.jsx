"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowRight, ShoppingBag } from "lucide-react";
import { fetchApi } from "@/lib/utils";

const fallbackSlides = [
  {
    headline: "Premium Quality",
    subheadline: "Products You Can Trust",
    description: "Discover our curated collection of high-quality products with fast delivery and secure payments.",
    desktopImage: "/hero-1.jpg",
    mobileImage: "/hero-1.jpg",
    link: "/products",
    cta: "Shop Now"
  },
  {
    headline: "New Arrivals",
    subheadline: "Fresh Collection 2024",
    description: "Explore the latest products with exclusive offers and deals.",
    desktopImage: "/hero-2.jpg",
    mobileImage: "/hero-2.jpg",
    link: "/products?sort=newest",
    cta: "Explore"
  },
];

export default function HeroSection() {
  const [slides, setSlides] = useState(fallbackSlides);
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetchApi("/public/banners");
        if (res?.success && Array.isArray(res.data?.banners) && res.data.banners.length > 0) {
          const apiSlides = res.data.banners.map((banner) => ({
            headline: banner.title || "Premium Products",
            subheadline: banner.subtitle || "Shop With Confidence",
            description: banner.description || "",
            desktopImage: banner.desktopImage,
            mobileImage: banner.mobileImage || banner.desktopImage,
            link: banner.link || "/products",
            cta: "Shop Now"
          }));
          setSlides(apiSlides);
        }
      } catch (err) {
        console.error("Banner fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextSlide]);

  if (loading) {
    return (
      <section className="h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center bg-gray-100">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full overflow-hidden bg-[#2D2D2D]">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <Image
            src={slide.desktopImage}
            alt={slide.headline}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2D2D2D]/95 via-[#2D2D2D]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D2D2D]/50 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="section-container w-full">
          <div className="max-w-xl lg:max-w-2xl">
            {/* Badge */}
            <div className="flex items-center gap-2 mb-6">
              <span className="w-12 h-1 bg-primary rounded-full"></span>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">D-Fix Kart</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-3 leading-tight">
              {slides[current].headline}
            </h1>
            
            {/* Subheadline */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-primary mb-6">
              {slides[current].subheadline}
            </h2>

            {/* Description */}
            {slides[current].description && (
              <p className="text-gray-300 text-base md:text-lg mb-8 max-w-lg leading-relaxed">
                {slides[current].description}
              </p>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link href={slides[current].link}>
                <Button size="lg" className="h-12 md:h-14 px-6 md:px-8 btn-primary text-base gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  {slides[current].cta}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/categories">
                <Button size="lg" variant="outline" className="h-12 md:h-14 px-6 md:px-8 border-2 border-white/30 text-white hover:bg-white hover:text-[#2D2D2D] text-base">
                  Browse Categories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 items-center justify-center text-white hover:bg-primary hover:border-primary transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={nextSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 items-center justify-center text-white hover:bg-primary hover:border-primary transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Slide Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === current ? "w-8 bg-primary" : "w-2 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
