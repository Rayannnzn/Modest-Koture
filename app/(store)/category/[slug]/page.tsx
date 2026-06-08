import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  SlidersHorizontal,
  Star,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { CategoryIconsMap } from "@/components/ui/custom-icons";
import ProductCard from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

const categoryMeta: Record<string, { name: string; description: string; image: string }> = {
  women: {
    name: "Women's Fashion",
    description: "Elegant abayas, dresses, and modest wear for the modern woman",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&h=400&fit=crop",
  },
  men: {
    name: "Men's Fashion",
    description: "Refined thobes, shirts, and casual wear for men",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=400&fit=crop",
  },
  children: {
    name: "Children",
    description: "Adorable and comfortable clothing for little ones",
    image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=1200&h=400&fit=crop",
  },
  electronics: {
    name: "Electronics",
    description: "Smart devices, accessories, and tech essentials",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=400&fit=crop",
  },
  pets: {
    name: "Pets",
    description: "Premium products for your beloved pets",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=400&fit=crop",
  },
  luxury: {
    name: "Luxury",
    description: "Exclusive designer pieces and premium lifestyle products",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&h=400&fit=crop",
  },
  beauty: {
    name: "Beauty",
    description: "Halal-certified cosmetics and skincare essentials",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=400&fit=crop",
  },
  jewelry: {
    name: "Jewelry",
    description: "Handcrafted necklaces, rings, earrings, and bracelets",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=400&fit=crop",
  },
  "plus-size": {
    name: "Plus Size",
    description: "Inclusive fashion celebrating every body shape",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=400&fit=crop",
  },
};

const productImages = [
  "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop",
];

const vendors = ["Zara Modest", "Luxe Jewelry", "Pure Beauty", "Le Sac Luxe", "Elegance Studio", "Modern Modesty"];
const productTitles = [
  "Embroidered Floral Abaya", "Gold Layered Necklace", "Silk Maxi Dress",
  "Argan Oil Serum", "Leather Handbag", "Cotton Palazzo Set",
  "Diamond Stud Earrings", "Natural Lip Gloss Set", "Linen Button Shirt",
  "Rose Gold Bracelet", "Vitamin C Serum", "Velvet Evening Gown",
  "Pearl Headband", "Chiffon Wrap Dress", "Silver Anklet", "Satin Kimono",
];

const mockProducts = Array.from({ length: 16 }, (_, i) => ({
  id: `prod-${i + 1}`,
  title: productTitles[i % productTitles.length],
  slug: `product-${i + 1}`,
  price: parseFloat((Math.random() * 200 + 30).toFixed(2)),
  salePrice: i % 3 === 0 ? parseFloat((Math.random() * 100 + 20).toFixed(2)) : null,
  image: productImages[i % productImages.length],
  vendor: vendors[i % vendors.length],
  rating: parseFloat((4.2 + Math.random() * 0.8).toFixed(1)),
  reviews: Math.floor(Math.random() * 150 + 10),
  isNew: i % 4 === 0,
}));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = categoryMeta[slug];
  if (!meta) return { title: "Category Not Found" };
  return {
    title: `${meta.name} — Modest Kouture`,
    description: meta.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = categoryMeta[slug] ?? {
    name: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    description: "Discover our curated collection",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=400&fit=crop",
  };

  const Icon = CategoryIconsMap[slug] || Sparkles;

  return (
    <div>
      {/* Category Hero Banner */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <Image
          src={meta.image}
          alt={meta.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e]/90 to-[#1a1a2e]/55" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 lg:px-6">
            <nav className="flex items-center gap-2 text-sm text-white/60 mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white font-medium">{meta.name}</span>
            </nav>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md text-white flex items-center justify-center border border-white/20 shadow-md">
                <Icon className="h-6 w-6 stroke-[1.5]" />
              </div>
              <div>
                <h1 className="text-2xl md:text-4xl font-bold font-serif text-white tracking-tight">{meta.name}</h1>
                <p className="text-white/70 text-sm mt-1.5 max-w-lg leading-relaxed">{meta.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 lg:px-6 py-8">
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

              {/* Price Range */}
              <div className="border-b pb-5">
                <h3 className="font-semibold text-sm mb-3">Price Range</h3>
                <div className="space-y-2">
                  {[
                    { label: "Under $50", value: "0-50" },
                    { label: "$50 – $100", value: "50-100" },
                    { label: "$100 – $200", value: "100-200" },
                    { label: "Over $200", value: "200+" },
                  ].map((range) => (
                    <label key={range.value} className="flex items-center gap-2.5 cursor-pointer group">
                      <input type="radio" name="price" className="text-[#c9a96e] focus:ring-[#c9a96e]" />
                      <span className="text-sm group-hover:text-[#c9a96e] transition-colors">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="border-b pb-5">
                <h3 className="font-semibold text-sm mb-3">Minimum Rating</h3>
                <div className="space-y-2">
                  {[4, 3, 2].map((rating) => (
                    <label key={rating} className="flex items-center gap-2.5 cursor-pointer group">
                      <input type="radio" name="rating" className="text-[#c9a96e] focus:ring-[#c9a96e]" />
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < rating ? "fill-[#c9a96e] text-[#c9a96e]" : "text-gray-300"}`}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground">& up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Vendors */}
              <div>
                <h3 className="font-semibold text-sm mb-3">Vendor</h3>
                <div className="space-y-2">
                  {vendors.map((vendor) => (
                    <label key={vendor} className="flex items-center gap-2.5 cursor-pointer group">
                      <input type="checkbox" className="rounded border-gray-300 text-[#c9a96e] focus:ring-[#c9a96e]" />
                      <span className="text-sm group-hover:text-[#c9a96e] transition-colors">{vendor}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 p-4 bg-muted/50 rounded-xl">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{mockProducts.length}</span> products in {meta.name}
              </p>
              <select className="text-sm border border-input rounded-lg px-3 py-1.5 bg-background focus:outline-none focus:ring-2 focus:ring-[#c9a96e]/50">
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {mockProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
