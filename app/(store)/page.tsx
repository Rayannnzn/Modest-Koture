import type { Metadata } from "next";
import HeroSlider from "@/components/home/HeroSlider";
import CategoryGrid from "@/components/home/CategoryGrid";
import TrendingProducts from "@/components/home/TrendingProducts";
import FeaturedVendors from "@/components/home/FeaturedVendors";
import ShopByPrice from "@/components/home/ShopByPrice";
import CategoryShowcase from "@/components/home/CategoryShowcase";

export const metadata: Metadata = {
  title: "Modest Kouture — Fashion Marketplace",
  description:
    "Shop modest fashion, jewelry, beauty, and luxury lifestyle products from top independent vendors worldwide.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Category Grid */}
      <CategoryGrid />

      {/* Divider */}
      <div className="container mx-auto px-4 lg:px-6">
        <hr className="border-border" />
      </div>

      {/* Trending Products */}
      <TrendingProducts />

      {/* Featured Vendors */}
      <FeaturedVendors />

      {/* Shop By Price */}
      <ShopByPrice />

      {/* Category Showcases */}
      <CategoryShowcase />
    </div>
  );
}
