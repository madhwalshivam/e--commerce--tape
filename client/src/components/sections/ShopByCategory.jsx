"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchApi } from "@/lib/utils";
import { getCategoryImageUrl, getImageUrl } from "@/lib/imageUrl";
import { ArrowRight, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ShopByCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchApi("/public/categories");
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);



  if (loading) {
    return (
      <section className="section-padding bg-gradient-section">
        <div className="section-container">
          <div className="section-header">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mx-auto mb-4" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square rounded-2xl bg-gray-200 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!categories.length) return null;

  return (
    <section className="section-padding bg-gradient-section">
      <div className="section-container">
        {/* Header */}
        <div className="section-header">
          <span className="section-badge">
            <Grid3X3 className="w-4 h-4" />
            Categories
          </span>
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-subtitle">Browse our wide range of product categories</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-10 md:gap-24">
          {categories.slice(0, 8).map((category) => (
            <Link 
              key={category.id} 
              href={`/category/${category.slug}`}
              className="category-card group"
            >
              <Image
                src={getCategoryImageUrl(category.image)}
                alt={category.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="category-content">
                <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                <p className="text-white/70 text-sm flex items-center gap-1">
                  Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* View All */}
        {categories.length > 8 && (
          <div className="text-center mt-10">
            <Link href="/categories">
              <Button size="lg" variant="outline" className="btn-outline h-12 px-8 gap-2">
                View All Categories <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default ShopByCategory;
