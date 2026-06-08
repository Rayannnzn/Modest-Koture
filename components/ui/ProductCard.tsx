"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Heart, ShoppingBag } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";

export interface ProductCardProps {
  product: {
    id: string;
    title: string;
    slug?: string;
    price: number;
    salePrice: number | null;
    image: string;
    vendor?: string;
    rating: number;
    reviews?: number;
    isNew?: boolean;
  };
  view?: "grid" | "list" | "mini";
}

export default function ProductCard({ product, view = "grid" }: ProductCardProps) {
  const { toggleItem, hasItem } = useWishlistStore();
  const { addItem } = useCartStore();

  const isWishlisted = hasItem(product.id);
  const discount = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : null;

  const productSlug = product.slug || product.title.toLowerCase().replace(/\s+/g, "-");
  const vendorName = product.vendor || "Modest Kouture";
  const vendorId = vendorName.toLowerCase().replace(/\s+/g, "-");

  const cartProduct = {
    id: product.id,
    title: product.title,
    price: product.price,
    salePrice: product.salePrice,
    image: product.image,
    slug: productSlug,
    vendorId,
    vendorName,
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product.id);
    if (!isWishlisted) {
      toast.success(`Added "${product.title}" to wishlist!`);
    } else {
      toast.info(`Removed "${product.title}" from wishlist.`);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(cartProduct);
    toast.success(`Added "${product.title}" to cart!`);
  };

  // MINI VIEW (Used in showcases)
  if (view === "mini") {
    return (
      <div className="group bg-white rounded-xl overflow-hidden border border-border hover:border-[#c9a96e]/30 hover:shadow-premium transition-all duration-300 flex flex-col h-full">
        <div className="relative aspect-[3/4] bg-[#fdfdfd] overflow-hidden flex-shrink-0">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
            sizes="200px"
          />
          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className="absolute top-2 right-2 w-7.5 h-7.5 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white hover:scale-105 shadow-sm border border-black/5 z-10"
            aria-label="Toggle Wishlist"
          >
            <Heart className={cn("h-3.5 w-3.5 transition-colors", isWishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground hover:text-red-500")} />
          </button>
          {/* Add to Cart Overlay */}
          <div className="absolute bottom-0 inset-x-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
            <button
              onClick={handleAddToCart}
              className="w-full py-2 rounded-lg bg-[#1a1a2e] text-white text-xs font-semibold uppercase tracking-wide flex items-center justify-center gap-1.5 hover:bg-black transition-colors"
            >
              <ShoppingBag className="h-3 w-3" />
              Quick Add
            </button>
          </div>
        </div>
        <div className="p-3 flex flex-col flex-grow">
          <h4 className="font-serif font-medium text-xs leading-snug line-clamp-2 mb-1 text-foreground hover:text-[#c9a96e] transition-colors">
            {product.title}
          </h4>
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-2.5 w-2.5 fill-[#c9a96e] text-[#c9a96e]" />
            <span className="text-xs font-medium">{product.rating}</span>
            {product.reviews && (
              <span className="text-xs text-muted-foreground">({product.reviews})</span>
            )}
          </div>
          <div className="flex items-baseline gap-1.5 mt-auto pt-1 border-t border-muted/40">
            <span className="text-xs font-bold text-foreground">
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

  // LIST VIEW (Used in shop page toggled view)
  if (view === "list") {
    return (
      <div className="group flex gap-4 bg-white rounded-xl border border-border p-4 hover:border-[#c9a96e]/30 hover:shadow-premium transition-all duration-300">
        <div className="relative w-28 h-36 rounded-lg overflow-hidden bg-muted flex-shrink-0">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-102 transition-transform duration-500"
            sizes="112px"
          />
          {discount && (
            <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-[#c9a96e]/95 text-white text-xs font-semibold tracking-wide rounded-sm uppercase z-10">
              {discount}% OFF
            </span>
          )}
        </div>
        <div className="flex-1 flex flex-col">
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">
            {vendorName}
          </p>
          <Link href={`/shop/${productSlug}`}>
            <h3 className="font-serif font-bold text-base text-foreground hover:text-[#c9a96e] transition-colors mb-1">
              {product.title}
            </h3>
          </Link>
          <div className="flex items-center gap-1 mb-2">
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
            <span className="text-xs font-semibold text-foreground ml-0.5">{product.rating}</span>
            {product.reviews && (
              <span className="text-xs text-muted-foreground">({product.reviews})</span>
            )}
          </div>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-sm text-[#1a1a2e]">
                {formatPrice(product.salePrice ?? product.price)}
              </span>
              {product.salePrice && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleWishlist}
                className={cn(
                  "w-8 h-8 rounded-lg border flex items-center justify-center transition-all duration-300",
                  isWishlisted
                    ? "bg-red-50 border-red-200 text-red-500"
                    : "border-border hover:bg-muted text-muted-foreground"
                )}
                aria-label="Wishlist"
              >
                <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
              </button>
              <button
                onClick={handleAddToCart}
                className="px-3.5 h-8 rounded-lg bg-[#1a1a2e] text-white text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5 hover:bg-black transition-colors"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STANDARD GRID VIEW (Used in trending, listings, category)
  return (
    <div className="group relative bg-white rounded-xl overflow-hidden border border-border hover:border-[#c9a96e]/30 hover:shadow-premium transition-all duration-300 flex flex-col h-full">
      {/* Image container */}
      <div className="relative aspect-[3/4] bg-[#fdfdfd] overflow-hidden flex-shrink-0">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
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
            onClick={handleAddToCart}
            className="w-full py-2.5 rounded-lg bg-[#1a1a2e] text-white text-xs font-semibold uppercase tracking-wide flex items-center justify-center gap-2 hover:bg-black transition-colors shadow-md"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Quick Add
          </button>
        </div>
      </div>

      {/* Product info */}
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">
          {vendorName}
        </p>
        <Link href={`/shop/${productSlug}`} className="flex-grow">
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
          {product.reviews && (
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          )}
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
