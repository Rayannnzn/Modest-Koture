"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Mock data - will be replaced with DB data
const trendingProducts = [
  {
    id: "1",
    title: "Embroidered Floral Abaya",
    slug: "embroidered-floral-abaya",
    price: 149.99,
    salePrice: 119.99,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop",
    vendor: "Zara Modest",
    rating: 4.8,
    reviews: 124,
    isNew: true,
  },
  {
    id: "2",
    title: "Gold Layered Necklace Set",
    slug: "gold-layered-necklace",
    price: 89.99,
    salePrice: null,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop",
    vendor: "Luxe Jewelry Co",
    rating: 4.9,
    reviews: 87,
    isNew: false,
  },
  {
    id: "3",
    title: "Silk Pleated Maxi Dress",
    slug: "silk-pleated-maxi-dress",
    price: 199.99,
    salePrice: 159.99,
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=500&fit=crop",
    vendor: "Elegance Studio",
    rating: 4.7,
    reviews: 52,
    isNew: true,
  },
  {
    id: "4",
    title: "Natural Argan Oil Serum",
    slug: "argan-oil-serum",
    price: 45.00,
    salePrice: null,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=500&fit=crop",
    vendor: "Pure Beauty Lab",
    rating: 4.6,
    reviews: 203,
    isNew: false,
  },
  {
    id: "5",
    title: "Structured Leather Handbag",
    slug: "structured-leather-handbag",
    price: 299.99,
    salePrice: 249.99,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop",
    vendor: "Le Sac Luxe",
    rating: 4.9,
    reviews: 65,
    isNew: false,
  },
  {
    id: "6",
    title: "Cotton Linen Wide Leg Pants",
    slug: "cotton-linen-wide-leg-pants",
    price: 79.99,
    salePrice: 59.99,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop",
    vendor: "Modern Modesty",
    rating: 4.5,
    reviews: 178,
    isNew: true,
  },
];

function ProductCard({ product }: { product: typeof trendingProducts[0] }) {
  const { toggleItem, hasItem } = useWishlistStore();
  const { addItem } = useCartStore();
  
  const isWishlisted = hasItem(product.id);
  const discount = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : null;

  const cartProduct = {
    id: product.id,
    title: product.title,
    price: product.price,
    salePrice: product.salePrice,
    image: product.image,
    slug: product.slug,
    vendorId: product.vendor.toLowerCase().replace(/\s+/g, "-"),
    vendorName: product.vendor,
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product.id);
    if (!isWishlisted) {
      toast.success(`Added ${product.title} to wishlist!`);
    } else {
      toast.info(`Removed ${product.title} from wishlist.`);
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(cartProduct);
    toast.success(`Added ${product.title} to cart!`);
  };

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden border border-border hover:border-[#c9a96e]/30 hover:shadow-premium transition-all duration-300 flex flex-col h-full">
      {/* Image container */}
      <div className="relative aspect-[3/4] bg-[#fdfdfd] overflow-hidden flex-shrink-0">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
        />
        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.isNew && (
            <span className="px-2 py-0.5 bg-[#1a1a2e] text-white text-xs font-semibold tracking-wide rounded-sm uppercase">
              NEW
            </span>
          )}
          {discount && (
            <span className="px-2 py-0.5 bg-[#c9a96e]/95 text-white text-xs font-semibold tracking-wide rounded-sm uppercase">
              {discount}% OFF
            </span>
          )}
        </div>
        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-black/5 flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 z-10"
          aria-label="Toggle Wishlist"
        >
          <Heart className={cn("h-4 w-4 transition-colors", isWishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground hover:text-red-500")} />
        </button>

        {/* Quick Add Overlay */}
        <div className="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 rounded-lg bg-[#1a1a2e] text-white text-xs font-semibold uppercase tracking-wide flex items-center justify-center gap-2 hover:bg-black transition-colors shadow-md"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Quick Add
          </button>
        </div>
      </div>

      {/* Product info */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">
          {product.vendor}
        </p>
        <Link href={`/shop/${product.slug}`} className="flex-1">
          <h3 className="font-serif font-medium text-sm md:text-base leading-snug mb-2 text-foreground hover:text-[#c9a96e] transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3 w-3",
                  i < Math.floor(product.rating)
                    ? "fill-[#c9a96e] text-[#c9a96e]"
                    : "text-gray-200"
                )}
              />
            ))}
          </div>
          <span className="text-xs font-medium text-foreground ml-0.5">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>
        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto pt-1.5 border-t border-muted/50">
          <span className="font-bold text-sm text-[#1a1a2e]">
            {formatPrice(product.salePrice ?? product.price)}
          </span>
          {product.salePrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TrendingProducts() {
  return (
    <section className="container mx-auto px-4 lg:px-6 py-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">🔥</span>
            <h2 className="text-3xl font-bold font-serif text-foreground tracking-tight">
              Trending Now
            </h2>
          </div>
          <p className="text-muted-foreground text-sm">
            Discover the most coveted modest wear pieces this season
          </p>
        </div>
        <Link
          href="/shop?sort=popular"
          className="group flex items-center gap-1.5 text-sm font-medium text-[#c9a96e] hover:text-[#b8985d] transition-colors whitespace-nowrap"
        >
          View All Trending
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {trendingProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
