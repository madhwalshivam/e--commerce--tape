"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchApi, formatCurrency } from "@/lib/utils";
import { getProductImageUrl as getImageUrl } from "@/lib/imageUrl";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, ArrowRight, Eye, Flame } from "lucide-react";
import { useAddVariantToCart } from "@/lib/cart-utils";
import { toast } from "sonner";

export function BestSellers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addVariantToCart } = useAddVariantToCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetchApi("/public/products?bestseller=true&limit=8");
        setProducts(response.data.products || []);
      } catch (error) {
        console.error("Error fetching best sellers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);



  const handleAddToCart = async (product) => {
    if (product.variants?.length > 0) {
      const variant = product.variants[0];
      const result = await addVariantToCart(variant, 1, product.name);
      if (result.success) {
        toast.success("Added to cart!");
      }
    }
  };

  if (loading) {
    return (
      <section className="section-padding bg-gradient-section">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-2xl h-80 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!products.length) return null;

  return (
    <section className="section-padding bg-gradient-section">
      <div className="section-container">
        {/* Header */}
        <div className="section-header">
          <span className="section-badge">
            <Flame className="w-4 h-4" />
            Best Sellers
          </span>
          <h2 className="section-title">Top Selling Products</h2>
          <p className="section-subtitle">Most loved products by our customers</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <div key={product.id} className="product-card">
              {/* Image */}
              <div className="product-image">
                <Link href={`/products/${product.slug}`}>
                  <Image
                    src={getImageUrl(product)}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </Link>

                {/* Rank Badge */}
                <span className="absolute top-3 left-3 w-8 h-8 rounded-full bg-[#2D2D2D] text-white text-sm font-bold flex items-center justify-center shadow-lg">
                  #{index + 1}
                </span>

                {/* Quick Actions */}
                <div className="product-actions">
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                  <Link 
                    href={`/products/${product.slug}`}
                    className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <Link href={`/products/${product.slug}`}>
                  <h3 className="font-semibold text-gray-900 text-sm md:text-base mb-2 line-clamp-2 hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>

                {/* Rating */}
                {product.avgRating > 0 && (
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs text-gray-500">{product.avgRating.toFixed(1)}</span>
                  </div>
                )}

                {/* Price */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="product-price">{formatCurrency(product.basePrice)}</span>
                  {product.hasSale && product.regularPrice > product.basePrice && (
                    <span className="product-price-old">{formatCurrency(product.regularPrice)}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-10">
          <Link href="/products?sort=popular">
            <Button size="lg" variant="outline" className="btn-outline h-12 px-8 gap-2">
              View All Best Sellers <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default BestSellers;
