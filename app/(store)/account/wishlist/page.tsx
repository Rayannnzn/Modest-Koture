import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = { title: "My Wishlist — Modest Kouture" };

const wishlistItems = [
  { id: "1", title: "Embroidered Floral Abaya", price: 149.99, salePrice: 119.99, rating: 4.8, reviews: 124, vendor: "Zara Modest", slug: "embroidered-floral-abaya", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop" },
  { id: "2", title: "Gold Layered Necklace Set", price: 89.99, salePrice: null, rating: 4.9, reviews: 87, vendor: "Luxe Jewelry Co", slug: "gold-layered-necklace", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop" },
  { id: "3", title: "Silk Pleated Maxi Dress", price: 199.99, salePrice: 159.99, rating: 4.7, reviews: 52, vendor: "Elegance Studio", slug: "silk-pleated-maxi-dress", image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=500&fit=crop" },
  { id: "4", title: "Natural Argan Oil Serum", price: 45.00, salePrice: null, rating: 4.6, reviews: 203, vendor: "Pure Beauty Lab", slug: "argan-oil-serum", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=500&fit=crop" },
  { id: "5", title: "Structured Leather Handbag", price: 299.99, salePrice: 249.99, rating: 4.9, reviews: 65, vendor: "Le Sac Luxe", slug: "structured-leather-handbag", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop" },
  { id: "6", title: "Cotton Linen Wide Leg Pants", price: 79.99, salePrice: 59.99, rating: 4.5, reviews: 178, vendor: "Modern Modesty", slug: "cotton-linen-wide-leg-pants", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop" },
  { id: "7", title: "Pearl Drop Earrings", price: 69.99, salePrice: null, rating: 4.8, reviews: 91, vendor: "Luxe Jewelry Co", slug: "pearl-drop-earrings", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop" },
  { id: "8", title: "Chiffon Wrap Dress", price: 129.99, salePrice: 99.99, rating: 4.7, reviews: 44, vendor: "Elegance Studio", slug: "chiffon-wrap-dress", image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=500&fit=crop" },
];

export default async function WishlistPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Heart className="h-6 w-6 text-[#c9a96e] fill-[#c9a96e]" />
            My Wishlist
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">{wishlistItems.length} saved items</p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5">
          <ShoppingBag className="h-4 w-4" />
          Add All to Cart
        </Button>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-20">
          <Heart className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6">Save products you love to find them later</p>
          <Button asChild className="bg-[#1a1a2e]">
            <Link href="/shop">Browse Products</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlistItems.map((item) => {
            const discount = item.salePrice
              ? Math.round(((item.price - item.salePrice) / item.price) * 100)
              : null;

            return (
              <div key={item.id} className="group bg-white rounded-2xl overflow-hidden border border-border hover:border-[#c9a96e]/30 hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-[4/5] bg-muted overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  {discount && (
                    <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#c9a96e] text-white text-xs font-semibold rounded-full">
                      -{discount}%
                    </span>
                  )}
                  {/* Remove button */}
                  <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-red-50 transition-colors">
                    <Trash2 className="h-3.5 w-3.5 text-red-400" />
                  </button>
                  {/* Add to cart overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button className="w-full py-2 rounded-xl bg-[#1a1a2e] text-white text-xs font-semibold flex items-center justify-center gap-2">
                      <ShoppingBag className="h-3.5 w-3.5" />
                      Add to Cart
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">{item.vendor}</p>
                  <Link href={`/shop/${item.slug}`}>
                    <h3 className="font-medium text-sm leading-snug mb-1.5 line-clamp-2 hover:text-[#c9a96e] transition-colors">
                      {item.title}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-3 w-3 fill-[#c9a96e] text-[#c9a96e]" />
                    <span className="text-xs font-medium">{item.rating}</span>
                    <span className="text-xs text-muted-foreground">({item.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">{formatPrice(item.salePrice ?? item.price)}</span>
                    {item.salePrice && (
                      <span className="text-xs text-muted-foreground line-through">{formatPrice(item.price)}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
