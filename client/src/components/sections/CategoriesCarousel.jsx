"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchApi } from "@/lib/utils";
import { getCategoryImageUrl } from "@/lib/imageUrl";

export default function CategoriesCarousel() {
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
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="section-container">
          <div className="flex gap-4 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!categories.length) return null;

  return (
    <section className="py-5 bg-white border-b border-gray-100">
      <div className="section-container">
    
        <div className="relative">
          <div className="flex items-center justify-evenly overflow-x-auto pb-4  gap-4 scrollbar-hide snap-x snap-mandatory">
            {categories.slice(0, 10).map((category) => (
              <Link 
                key={category.id} 
                href={`/category/${category.slug}`}
                className="flex-shrink-0 snap-start group"
              >
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28  rounded-2xl overflow-hidden bg-gray-100">
                  <Image
                    src={getCategoryImageUrl(category.image)}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-primary/80 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-end p-3">
                    <p className="text-white text-sm font-semibold leading-tight">{category.name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
