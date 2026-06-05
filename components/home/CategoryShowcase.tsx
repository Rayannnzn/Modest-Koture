"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, ShoppingBag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const showcases = [
  {
    category: "Women's Collection",
    slug: "women",
    tagline: "Elegance Redefined",
    description: "Discover our exclusive women's fashion — from flowing abayas to contemporary modest wear",
    bannerImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=400&fit=crop",
    bannerBg: "from-rose-950/80 to-pink-950/80",
    products: [
      { id: "w1", title: "Lace Trim Kaftan Dress", price: 169.99, salePrice: 139.99, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=350&fit=crop", rating: 4.8, reviews: 94 },
      { id: "w2", title: "Pintuck Detail Blouse", price: 79.99, salePrice: null, image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&h=350&fit=crop", rating: 4.6, reviews: 42 },
      { id: "w3", title: "Wide Leg Palazzo Set", price: 129.99, salePrice: 99.99, image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&h=350&fit=crop", rating: 4.7, reviews: 67 },
    ],
  },
  {
    category: "Jewelry Collection",
    slug: "jewelry",
    tagline: "Timeless Beauty",
    description: "Handcrafted pieces that add the perfect finishing touch to any outfit",
    bannerImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop",
    bannerBg: "from-yellow-950/85 to-amber-950/85",
    products: [
      { id: "j1", title: "18K Gold Moonstone Ring", price: 249.99, salePrice: null, image: "https://images.unsplash.com/photo-1609587312208-cea54be969e7?w=300&h=350&fit=crop", rating: 5.0, reviews: 31 },
      { id: "j2", title: "Pearl Drop Earrings", price: 89.99, salePrice: 69.99, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=350&fit=crop", rating: 4.8, reviews: 58 },
      { id: "j3", title: "Charm Layered Bracelet", price: 59.99, salePrice: null, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=350&fit=crop", rating: 4.7, reviews: 89 },
    ],
  },
  {
    category: "Beauty Collection",
    slug: "beauty",
    tagline: "Natural Radiance",
    description: "Halal-certified, cruelty-free beauty products crafted for every skin tone",
    bannerImage: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop",
    bannerBg: "from-fuchsia-950/80 to-pink-950/80",
    products: [
      { id: "b1", title: "Rose Hip Face Oil", price: 52.00, salePrice: null, image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=350&fit=crop", rating: 4.9, reviews: 212 },
      { id: "b2", title: "Hydrating Lip Gloss Set", price: 28.99, salePrice: 22.99, image: "https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=300&h=350&fit=crop", rating: 4.6, reviews: 145 },
      { id: "b3", title: "Vitamin C Brightening Serum", price: 68.00, salePrice: null, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300&h=350&fit=crop", rating: 4.8, reviews: 178 },
    ],
  },
];

interface MiniProductCardProps {
  product: typeof showcases[0]["products"][0];
  showcaseCategory: string;
  showcaseSlug: string;
}

function MiniProductCard({ product, showcaseCategory, showcaseSlug }: MiniProductCardProps) {
  const { toggleItem, hasItem } = useWishlistStore();
  const { addItem } = useCartStore();
  const isWishlisted = hasItem(product.id);

  const cartProduct = {
    id: product.id,
    title: product.title,
    price: product.price,
    salePrice: product.salePrice,
    image: product.image,
    slug: product.title.toLowerCase().replace(/\s+/g, "-"),
    vendorId: showcaseSlug,
    vendorName: showcaseCategory,
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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(cartProduct);
    toast.success(`Added ${product.title} to cart!`);
  };

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
        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 w-7.5 h-7.5 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white hover:scale-105 shadow-sm border border-black/5 z-10"
          aria-label="Toggle Wishlist"
        >
          <Heart className={cn("h-3.5 w-3.5 transition-colors", isWishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground hover:text-red-500")} />
        </button>
        {/* Add to Cart overlay */}
        <div className="absolute bottom-0 inset-x-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
          <button
            onClick={handleAddToCart}
            className="w-full py-2 rounded-lg bg-[#1a1a2e] text-white text-[10px] uppercase font-bold tracking-wider flex items-center justify-center gap-1.5 hover:bg-black transition-colors"
          >
            <ShoppingBag className="h-3 w-3" />
            Quick Add
          </button>
        </div>
      </div>
      <div className="p-3 flex flex-col flex-1">
        <h4 className="font-serif font-medium text-xs leading-snug line-clamp-2 mb-1.5 text-foreground hover:text-[#c9a96e] transition-colors">
          {product.title}
        </h4>
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-2.5 w-2.5 fill-[#c9a96e] text-[#c9a96e]" />
          <span className="text-[10px] font-semibold">{product.rating}</span>
          <span className="text-[10px] text-muted-foreground">({product.reviews})</span>
        </div>
        <div className="flex items-baseline gap-1.5 mt-auto pt-1 border-t border-muted/50">
          <span className="text-xs font-bold text-foreground">
            {formatPrice(product.salePrice ?? product.price)}
          </span>
          {product.salePrice && (
            <span className="text-[9px] text-muted-foreground line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CategoryShowcase() {
  return (
    <div className="flex flex-col">
      {showcases.map((showcase, index) => (
        <section
          key={showcase.slug}
          className={cn("py-16 md:py-20", index % 2 === 0 ? "bg-white" : "bg-[#fbfaf8]")}
        >
          <div className="container mx-auto px-4 lg:px-6">
            <div className={cn(
              "grid grid-cols-1 lg:grid-cols-12 gap-8 items-center",
              index % 2 !== 0 && "lg:flex-row-reverse"
            )}>
              {/* Banner */}
              <div className={cn(
                "relative rounded-xl overflow-hidden h-72 lg:h-96 shadow-lg lg:col-span-5",
                index % 2 !== 0 && "lg:order-2"
              )}>
                <Image
                  src={showcase.bannerImage}
                  alt={showcase.category}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className={cn("absolute inset-0 bg-gradient-to-br", showcase.bannerBg)} />
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                  <span className="text-[10px] font-bold text-[#c9a96e] uppercase tracking-widest mb-1.5">
                    {showcase.tagline}
                  </span>
                  <h2 className="text-3xl font-bold font-serif mb-2">{showcase.category}</h2>
                  <p className="text-sm text-white/80 mb-6 max-w-sm leading-relaxed">{showcase.description}</p>
                  <Button asChild variant="gold" size="sm" className="w-fit gap-1.5 uppercase text-xs tracking-wider font-semibold">
                    <Link href={`/category/${showcase.slug}`}>
                      Shop Collection
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Products grid */}
              <div className={cn(
                "lg:col-span-7",
                index % 2 !== 0 && "lg:order-1"
              )}>
                <div className="flex items-center justify-between mb-6 pb-2 border-b">
                  <h3 className="font-serif font-bold text-lg md:text-xl text-[#1a1a2e]">
                    Featured in {showcase.category}
                  </h3>
                  <Link
                    href={`/category/${showcase.slug}`}
                    className="group flex items-center gap-1 text-sm font-semibold text-[#c9a96e] hover:text-[#b8985d] transition-colors"
                  >
                    See All <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {showcase.products.map((product) => (
                    <MiniProductCard 
                      key={product.id} 
                      product={product} 
                      showcaseCategory={showcase.category}
                      showcaseSlug={showcase.slug}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
