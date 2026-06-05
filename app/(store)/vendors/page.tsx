import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Search, Star, Package, Filter, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "All Vendors — Modest Kouture",
  description: "Browse 500+ independent fashion vendors on Modest Kouture",
};

const vendors = [
  { id: "1", name: "Zara Modest", slug: "zara-modest", category: "Women's Fashion", rating: 4.9, products: 284, banner: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=300&fit=crop", logo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop", description: "Premium modest wear for the modern woman", verified: true },
  { id: "2", name: "Luxe Jewelry Co", slug: "luxe-jewelry", category: "Jewelry", rating: 4.8, products: 156, banner: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=300&fit=crop", logo: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&h=100&fit=crop", description: "Handcrafted gold & silver jewelry from artisans", verified: true },
  { id: "3", name: "Pure Beauty Lab", slug: "pure-beauty-lab", category: "Beauty", rating: 4.7, products: 92, banner: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=300&fit=crop", logo: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&h=100&fit=crop", description: "Clean, halal-certified beauty essentials", verified: true },
  { id: "4", name: "Le Sac Luxe", slug: "le-sac-luxe", category: "Luxury", rating: 5.0, products: 48, banner: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=300&fit=crop", logo: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&h=100&fit=crop", description: "Artisan leather bags and accessories", verified: true },
  { id: "5", name: "Elegance Studio", slug: "elegance-studio", category: "Women's Fashion", rating: 4.6, products: 73, banner: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&h=300&fit=crop", logo: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=100&h=100&fit=crop", description: "Contemporary modest dresses for every occasion", verified: false },
  { id: "6", name: "Modern Modesty", slug: "modern-modesty", category: "Women's Fashion", rating: 4.5, products: 118, banner: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=300&fit=crop", logo: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=100&h=100&fit=crop", description: "Comfortable, everyday modest fashion", verified: false },
  { id: "7", name: "Gem Palace", slug: "gem-palace", category: "Jewelry", rating: 4.8, products: 64, banner: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=300&fit=crop", logo: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=100&h=100&fit=crop", description: "Precious gemstones and fine jewelry", verified: true },
  { id: "8", name: "Children's Corner", slug: "childrens-corner", category: "Children", rating: 4.7, products: 95, banner: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800&h=300&fit=crop", logo: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=100&h=100&fit=crop", description: "Adorable modest wear for little ones", verified: false },
];

const categories = ["All", "Women's Fashion", "Jewelry", "Beauty", "Luxury", "Children", "Electronics"];

export default function VendorsPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] py-16">
        <div className="container mx-auto px-4 lg:px-6 text-center text-white">
          <h1 className="text-4xl font-bold mb-3">Our Vendors</h1>
          <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
            Discover 500+ independent fashion vendors curated for quality and authenticity
          </p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search vendors by name or category..."
              className="pl-12 h-12 rounded-xl bg-white text-foreground"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-12">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                cat === "All"
                  ? "bg-[#1a1a2e] text-white"
                  : "border border-border text-muted-foreground hover:border-[#c9a96e]/50 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
          <Button variant="outline" size="sm" className="gap-1.5 ml-auto">
            <Filter className="h-4 w-4" />
            Sort
          </Button>
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              className="group bg-white rounded-xl overflow-hidden border border-border hover:border-[#c9a96e]/30 hover:shadow-premium transition-all duration-300 flex flex-col h-full"
            >
              {/* Banner */}
              <div className="relative h-32 bg-[#fdfdfd] overflow-hidden flex-shrink-0">
                <Image
                  src={vendor.banner}
                  alt={vendor.name}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5 pt-0 relative flex flex-col flex-1">
                {/* Logo & Follow Button Row */}
                <div className="flex justify-between items-end mb-4 -mt-8 relative z-10">
                  <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden bg-white shadow-md relative">
                    <Image
                      src={vendor.logo}
                      alt={vendor.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <button className="h-7.5 px-3 rounded-lg border border-border hover:border-[#c9a96e] text-xs font-semibold text-[#1a1a2e] hover:text-[#c9a96e] bg-white transition-colors cursor-pointer">
                    Follow
                  </button>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <h3 className="font-serif font-bold text-base text-foreground group-hover:text-[#c9a96e] transition-colors leading-tight">
                      {vendor.name}
                    </h3>
                    {vendor.verified && (
                      <span className="flex items-center justify-center w-4 h-4 rounded-full bg-blue-50 text-blue-500 text-[9px] font-bold border border-blue-100" title="Verified Store">
                        ✓
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-[#c9a96e] uppercase tracking-widest font-bold mb-2">
                    {vendor.category}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                    {vendor.description}
                  </p>
                </div>

                {/* Stats & Link */}
                <div className="flex items-center justify-between text-xs pt-3.5 border-t border-muted/50 mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-[#c9a96e] text-[#c9a96e]" />
                      <span className="font-bold text-[#1a1a2e]">{vendor.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Package className="h-3.5 w-3.5" />
                      <span>{vendor.products} items</span>
                    </div>
                  </div>
                  <Link
                    href={`/vendors/${vendor.slug}`}
                    className="flex items-center gap-0.5 text-xs font-semibold text-[#c9a96e] hover:text-[#b8985d] transition-colors"
                  >
                    <span>Visit</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load more */}
        <div className="text-center mt-12">
          <Button variant="outline" className="gap-2">
            Load More Vendors
          </Button>
          <p className="text-xs text-muted-foreground mt-3">Showing 8 of 500+ vendors</p>
        </div>
      </div>
    </div>
  );
}
