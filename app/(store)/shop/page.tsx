import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SlidersHorizontal, Grid, List, ChevronDown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatPrice } from "@/lib/utils";
import ProductCard from "@/components/ui/ProductCard";

export const metadata: Metadata = {
  title: "Shop All Products",
  description: "Browse our complete collection of modest fashion, jewelry, beauty, and lifestyle products.",
};

// Mock products for the listing page
const mockProducts = Array.from({ length: 24 }, (_, i) => ({
  id: `prod-${i + 1}`,
  title: [
    "Embroidered Floral Abaya", "Gold Layered Necklace", "Silk Maxi Dress",
    "Argan Oil Serum", "Leather Handbag", "Cotton Palazzo Set",
    "Diamond Stud Earrings", "Natural Lip Gloss Set", "Linen Button Shirt",
    "Rose Gold Bracelet", "Vitamin C Serum", "Velvet Evening Gown",
    "Pearl Headband", "Chiffon Wrap Dress", "Silver Anklet",
    "Clay Face Mask Set", "Satin Kimono Robe", "Oud Perfume Oil",
    "Beaded Evening Bag", "Cashmere Shawl", "Crystal Drop Earrings",
    "Bamboo Face Brush", "Embellished Sandals", "Vintage Silk Scarf",
  ][i],
  slug: `product-${i + 1}`,
  price: parseFloat((Math.random() * 250 + 20).toFixed(2)),
  salePrice: i % 3 === 0 ? parseFloat((Math.random() * 150 + 15).toFixed(2)) : null,
  image: [
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop",
  ][i % 6],
  vendor: ["Zara Modest", "Luxe Jewelry", "Pure Beauty", "Le Sac Luxe", "Elegance Studio", "Modern Modesty"][i % 6],
  rating: parseFloat((4.2 + Math.random() * 0.8).toFixed(1)),
  reviews: Math.floor(Math.random() * 200 + 10),
  isNew: i % 5 === 0,
}));

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const sort = params.sort as string || "newest";
  const view = params.view as string || "grid";

  return (
    <div className="container mx-auto px-4 lg:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        <span className="text-foreground font-medium">All Products</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5 text-[#c9a96e]" />
                Filters
              </h2>
              <button className="text-xs text-[#c9a96e] hover:text-[#b8985d]">Clear all</button>
            </div>

            {/* Category filter */}
            <div className="border-b pb-5">
              <h3 className="font-semibold text-sm mb-3">Category</h3>
              <div className="space-y-2">
                {["Women", "Men", "Children", "Electronics", "Beauty", "Jewelry", "Luxury", "Pets", "Plus Size"].map(cat => (
                  <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
                    <input type="checkbox" className="rounded border-gray-300 text-[#c9a96e] focus:ring-[#c9a96e]" />
                    <span className="text-sm group-hover:text-[#c9a96e] transition-colors">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price filter */}
            <div className="border-b pb-5">
              <h3 className="font-semibold text-sm mb-3">Price Range</h3>
              <div className="space-y-2">
                {[
                  { label: "Under $50", value: "0-50" },
                  { label: "$50 - $100", value: "50-100" },
                  { label: "$100 - $200", value: "100-200" },
                  { label: "$200 - $500", value: "200-500" },
                  { label: "Over $500", value: "500+" },
                ].map(range => (
                  <label key={range.value} className="flex items-center gap-2.5 cursor-pointer group">
                    <input type="radio" name="price" className="text-[#c9a96e] focus:ring-[#c9a96e]" />
                    <span className="text-sm group-hover:text-[#c9a96e] transition-colors">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating filter */}
            <div className="border-b pb-5">
              <h3 className="font-semibold text-sm mb-3">Minimum Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2].map(rating => (
                  <label key={rating} className="flex items-center gap-2.5 cursor-pointer group">
                    <input type="radio" name="rating" className="text-[#c9a96e] focus:ring-[#c9a96e]" />
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < rating ? "fill-[#c9a96e] text-[#c9a96e]" : "text-gray-300"}`} />
                      ))}
                      <span className="text-xs text-muted-foreground">& up</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Vendor filter */}
            <div>
              <h3 className="font-semibold text-sm mb-3">Vendor</h3>
              <div className="space-y-2">
                {["Zara Modest", "Luxe Jewelry", "Pure Beauty Lab", "Le Sac Luxe", "Elegance Studio"].map(vendor => (
                  <label key={vendor} className="flex items-center gap-2.5 cursor-pointer group">
                    <input type="checkbox" className="rounded border-gray-300 text-[#c9a96e] focus:ring-[#c9a96e]" />
                    <span className="text-sm group-hover:text-[#c9a96e] transition-colors">{vendor}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Products area */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 p-4 bg-muted/50 rounded-xl">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{mockProducts.length}</span> products
            </p>
            <div className="flex items-center gap-3">
              {/* Sort */}
              <Select defaultValue={sort}>
                <SelectTrigger className="w-44 h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price_asc">Price: Low to High</SelectItem>
                  <SelectItem value="price_desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
              {/* View toggle */}
              <div className="flex border rounded-lg overflow-hidden">
                <Link
                  href="?view=grid"
                  className={`p-2 hover:bg-muted transition-colors ${view === "grid" ? "bg-[#1a1a2e] text-white" : ""}`}
                >
                  <Grid className="h-4 w-4" />
                </Link>
                <Link
                  href="?view=list"
                  className={`p-2 hover:bg-muted transition-colors ${view === "list" ? "bg-[#1a1a2e] text-white" : ""}`}
                >
                  <List className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className={`grid gap-5 ${view === "list" ? "grid-cols-1" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"}`}>
            {mockProducts.map((product) => (
              <ProductCard key={product.id} product={product} view={view === "list" ? "list" : "grid"} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-10">
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${page === 1 ? "bg-[#1a1a2e] text-white" : "hover:bg-muted text-foreground"}`}
              >
                {page}
              </button>
            ))}
            <span className="px-2 text-muted-foreground">...</span>
            <button className="w-9 h-9 rounded-lg text-sm font-medium hover:bg-muted">12</button>
          </div>
        </div>
      </div>
    </div>
  );
}
