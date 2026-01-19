import { ShopByCategory } from "@/components/sections/ShopByCategory";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { BestSellers } from "@/components/sections/BestSellers";
import { TrendingProducts } from "@/components/sections/TrendingProducts";
import { NewArrivals } from "@/components/sections/NewArrivals";
import { TrustSection } from "@/components/sections/TrustSection";
import CategoriesCarousel from "@/components/sections/CategoriesCarousel";
import HeroSection from "@/components/sections/HeroSection";
import { CustomerReviews } from "@/components/sections/CustomerReviews";
import { FlashSaleSection } from "@/components/sections/FlashSaleSection";

export default function Home() {
  return (
    <>
      <main>
        {/* Hero Section with prominent CTA */}
        <HeroSection />

        {/* Categories Carousel - Quick navigation */}
        <CategoriesCarousel />

        {/* Flash Sale - If active */}
        <FlashSaleSection />

        {/* Shop By Category - Visual grid */}
        <ShopByCategory />

        {/* Featured Products - Hero products */}
        <FeaturedProducts />

        {/* Best Sellers - Popular items */}
        <BestSellers />

        {/* New Arrivals - Latest products */}
        <NewArrivals />

        {/* Customer Reviews - Social proof */}
        <CustomerReviews />

        {/* Trust Section - Build confidence */}
        <TrustSection />
      </main>
    </>
  );
}
