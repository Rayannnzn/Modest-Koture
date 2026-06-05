import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Star, Package, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import ProductCard from "@/components/ui/ProductCard";

const vendorData: Record<string, {
  name: string; category: string; rating: number; products: number;
  banner: string; logo: string; description: string; location: string;
  since: string; totalSales: number; verified: boolean;
}> = {
  "zara-modest": { name: "Zara Modest", category: "Women's Fashion", rating: 4.9, products: 284, banner: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=400&fit=crop", logo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop", description: "Premium modest wear for the modern woman. We source the finest fabrics from around the world to create elegant, comfortable pieces that celebrate modesty without compromising style.", location: "London, UK", since: "2022", totalSales: 4820, verified: true },
  "luxe-jewelry": { name: "Luxe Jewelry Co", category: "Jewelry", rating: 4.8, products: 156, banner: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=400&fit=crop", logo: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=120&h=120&fit=crop", description: "Handcrafted gold & silver jewelry from master artisans. Every piece tells a story of craftsmanship passed down through generations.", location: "Birmingham, UK", since: "2021", totalSales: 2340, verified: true },
  "pure-beauty-lab": { name: "Pure Beauty Lab", category: "Beauty", rating: 4.7, products: 92, banner: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=400&fit=crop", logo: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=120&h=120&fit=crop", description: "Clean, halal-certified beauty essentials for every skin type. Free from harmful chemicals, tested by dermatologists.", location: "Manchester, UK", since: "2023", totalSales: 1890, verified: true },
};

const mockProducts = [
  { id: "1", title: "Embroidered Floral Abaya", price: 149.99, salePrice: 119.99, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop", rating: 4.8, reviews: 124 },
  { id: "2", title: "Silk Maxi Dress", price: 199.99, salePrice: 159.99, image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=500&fit=crop", rating: 4.7, reviews: 52 },
  { id: "3", title: "Wide Leg Palazzo Set", price: 129.99, salePrice: 99.99, image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop", rating: 4.6, reviews: 78 },
  { id: "4", title: "Lace Trim Kaftan", price: 169.99, salePrice: null, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop", rating: 4.9, reviews: 93 },
  { id: "5", title: "Pintuck Blouse", price: 79.99, salePrice: null, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop", rating: 4.5, reviews: 41 },
  { id: "6", title: "Chiffon Wrap Dress", price: 129.99, salePrice: 99.99, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=500&fit=crop", rating: 4.7, reviews: 67 },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vendor = vendorData[slug];
  return {
    title: vendor ? `${vendor.name} — Modest Kouture` : "Vendor — Modest Kouture",
    description: vendor?.description,
  };
}

export default async function VendorProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vendor = vendorData[slug] ?? {
    name: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    category: "Fashion",
    rating: 4.7,
    products: 50,
    banner: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=400&fit=crop",
    logo: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=120&h=120&fit=crop",
    description: "Quality products from an independent vendor on Modest Kouture.",
    location: "United Kingdom",
    since: "2024",
    totalSales: 500,
    verified: false,
  };

  return (
    <div>
      {/* Banner */}
      <div className="relative h-60 md:h-80 overflow-hidden">
        <Image src={vendor.banner} alt={vendor.name} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
        <div className="absolute top-6 left-6">
          <Link href="/vendors" className="inline-flex items-center gap-2 text-[#1a1a2e] hover:text-[#c9a96e] text-xs font-semibold bg-white/95 border border-border shadow-sm rounded-lg px-4 py-2 transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Vendors
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 -mt-20 relative pb-16">
        {/* Vendor header card */}
        <div className="bg-white rounded-xl border border-border p-6 md:p-8 mb-10 shadow-premium relative z-10">
          <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-white shadow-lg flex-shrink-0 relative">
                <Image src={vendor.logo} alt={vendor.name} fill className="object-cover" sizes="96px" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-1.5">
                  <h1 className="text-3xl font-bold font-serif text-foreground tracking-tight">{vendor.name}</h1>
                  {vendor.verified && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      <CheckCircle2 className="h-3 w-3" />
                      Verified Brand
                    </span>
                  )}
                </div>
                <p className="text-[#c9a96e] text-xs font-bold uppercase tracking-widest mb-3">{vendor.category}</p>
                <p className="text-muted-foreground text-sm max-w-2xl mb-4 leading-relaxed">{vendor.description}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-[#c9a96e] text-[#c9a96e]" />
                    <span className="font-semibold text-foreground">{vendor.rating}</span>
                    <span>Rating</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Package className="h-4 w-4" />
                    <span className="font-semibold text-foreground">{vendor.products}</span>
                    <span>Products</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    <span>{vendor.location}</span>
                  </div>
                  <div>
                    Member since {vendor.since}
                  </div>
                </div>
              </div>
            </div>
            <Button className="bg-[#1a1a2e] hover:bg-black font-semibold text-xs uppercase tracking-wider gap-2 flex-shrink-0 h-10 px-5 rounded-lg w-full md:w-auto shadow-md">
              Follow Store
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-8 pt-6 border-t border-muted/75">
            {[
              { label: "Total Sales", value: vendor.totalSales.toLocaleString() },
              { label: "Active Products", value: vendor.products },
              { label: "Positive Reviews", value: `${vendor.rating} / 5.0` },
            ].map((stat) => (
              <div key={stat.label} className="text-center border-r last:border-0 border-muted/50">
                <div className="text-2xl font-bold text-[#1a1a2e] font-serif">{stat.value}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Products */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Products by {vendor.name}</h2>
            <p className="text-sm text-muted-foreground">{mockProducts.length} products</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {mockProducts.map((product) => {
              const productWithVendor = {
                ...product,
                vendor: vendor.name,
              };
              return (
                <ProductCard key={product.id} product={productWithVendor} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
