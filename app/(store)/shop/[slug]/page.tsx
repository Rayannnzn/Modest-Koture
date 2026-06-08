import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Heart,
  ShoppingBag,
  Share2,
  Truck,
  RefreshCw,
  Shield,
  Store,
  ChevronRight,
  Minus,
  Plus,
  ZoomIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatPrice } from "@/lib/utils";

// Mock product data
const mockProduct = {
  id: "prod-1",
  title: "Embroidered Floral Abaya",
  slug: "embroidered-floral-abaya",
  description:
    "A stunning embroidered floral abaya crafted from premium chiffon fabric. Features intricate hand-embroidered floral patterns on the sleeves and hem, a flowing silhouette, and a concealed front zipper for easy wear. Perfect for special occasions, formal gatherings, or everyday modest elegance.",
  price: 149.99,
  salePrice: 119.99,
  rating: 4.8,
  reviewCount: 124,
  images: [
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=700&fit=crop",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=700&fit=crop",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=700&fit=crop",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=700&fit=crop",
  ],
  vendor: { name: "Zara Modest", slug: "zara-modest", rating: 4.9 },
  category: "Women",
  brand: "Zara Modest Collection",
  sku: "ZM-ABY-001",
  tags: ["abaya", "modest", "formal", "chiffon", "embroidered"],
  attributes: [
    { name: "Color", values: ["Black", "Navy", "Ivory", "Blush Pink", "Forest Green"] },
    { name: "Size", values: ["XS", "S", "M", "L", "XL", "XXL"] },
    { name: "Material", values: ["Premium Chiffon"] },
  ],
  inventory: { quantity: 15, trackStock: true },
};

const reviews = [
  { id: "r1", user: "Amina K.", rating: 5, title: "Absolutely beautiful!", comment: "The quality exceeded my expectations. The embroidery is so delicate and the fit is perfect. I received so many compliments wearing this.", date: "2 weeks ago", verified: true },
  { id: "r2", user: "Sarah M.", rating: 4, title: "Gorgeous abaya", comment: "Beautiful design and great quality fabric. Runs slightly large so I'd recommend sizing down. Shipping was fast too!", date: "1 month ago", verified: true },
  { id: "r3", user: "Fatima H.", rating: 5, title: "Worth every penny", comment: "I bought this for my sister's wedding and it was perfect. The fabric drapes beautifully and the color is exactly as shown.", date: "1 month ago", verified: false },
];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: mockProduct.title,
    description: mockProduct.description.slice(0, 160),
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  await params; // required in Next.js 16 — params is now a Promise
  const discount = mockProduct.salePrice
    ? Math.round(((mockProduct.price - mockProduct.salePrice) / mockProduct.price) * 100)
    : null;

  return (
    <div className="container mx-auto px-4 lg:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/shop" className="hover:text-foreground">Shop</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/category/women" className="hover:text-foreground">Women</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground truncate max-w-48">{mockProduct.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Gallery */}
        <div className="space-y-3">
          {/* Main image */}
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted group">
            <Image
              src={mockProduct.images[0]}
              alt={mockProduct.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-white">
              <ZoomIn className="h-4 w-4" />
            </button>
            {discount && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-[#c9a96e] text-white text-sm font-bold rounded-full">
                -{discount}% OFF
              </span>
            )}
          </div>
          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-2">
            {mockProduct.images.map((img, i) => (
              <button key={i} className={`relative aspect-square rounded-xl overflow-hidden bg-muted border-2 transition-colors ${i === 0 ? "border-[#c9a96e]" : "border-transparent hover:border-[#c9a96e]/50"}`}>
                <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" sizes="100px" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Vendor */}
          <Link
            href={`/vendors/${mockProduct.vendor.slug}`}
            className="flex items-center gap-1.5 text-sm text-[#c9a96e] font-medium hover:text-[#b8985d] transition-colors"
          >
            <Store className="h-3.5 w-3.5" />
            {mockProduct.vendor.name}
          </Link>

          <h1 className="text-2xl lg:text-3xl font-bold leading-tight">{mockProduct.title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(mockProduct.rating) ? "fill-[#c9a96e] text-[#c9a96e]" : "text-gray-300"}`} />
              ))}
            </div>
            <span className="font-semibold text-sm">{mockProduct.rating}</span>
            <Link href="#reviews" className="text-sm text-muted-foreground hover:text-foreground">
              ({mockProduct.reviewCount} reviews)
            </Link>
            <span className="w-px h-4 bg-border" />
            <span className="text-sm text-green-600 font-medium">In Stock ({mockProduct.inventory.quantity} left)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-foreground">
              {formatPrice(mockProduct.salePrice ?? mockProduct.price)}
            </span>
            {mockProduct.salePrice && (
              <>
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(mockProduct.price)}
                </span>
                <span className="px-2 py-0.5 bg-red-100 text-red-700 text-sm font-semibold rounded-lg">
                  Save {formatPrice(mockProduct.price - mockProduct.salePrice)}
                </span>
              </>
            )}
          </div>

          {/* Attributes */}
          <div className="space-y-4">
            {mockProduct.attributes.map((attr) => (
              <div key={attr.name}>
                <p className="text-sm font-semibold mb-2">{attr.name}</p>
                <div className="flex flex-wrap gap-2">
                  {attr.values.map((val, i) => (
                    <button
                      key={val}
                      className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${i === 0
                        ? "border-[#1a1a2e] bg-[#1a1a2e] text-white font-medium"
                        : "border-border hover:border-[#c9a96e] hover:text-[#c9a96e]"}`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Quantity + Add to cart */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 border rounded-xl p-1">
              <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted transition-colors">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-semibold">1</span>
              <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted transition-colors">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button size="lg" className="flex-1 bg-[#1a1a2e] hover:bg-[#1a1a2e]/90 gap-2">
              <ShoppingBag className="h-4 w-4" />
              Add to Bag
            </Button>
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Trust signals */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            {[
              { Icon: Truck, label: "Free Shipping", sub: "on orders $75+" },
              { Icon: RefreshCw, label: "Easy Returns", sub: "within 30 days" },
              { Icon: Shield, label: "Secure Payment", sub: "SSL encrypted" },
            ].map(({ Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center text-center p-3 bg-muted/50 rounded-xl">
                <Icon className="h-5 w-5 text-[#c9a96e] mb-1.5" />
                <p className="text-xs font-semibold">{label}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </div>
            ))}
          </div>

          {/* Meta */}
          <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t">
            <p><span className="font-medium text-foreground">SKU:</span> {mockProduct.sku}</p>
            <p><span className="font-medium text-foreground">Brand:</span> {mockProduct.brand}</p>
            <p>
              <span className="font-medium text-foreground">Tags:</span>{" "}
              {mockProduct.tags.map((tag) => (
                <Link key={tag} href={`/shop?tag=${tag}`} className="mr-1 hover:text-[#c9a96e] transition-colors">
                  #{tag}
                </Link>
              ))}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs: Description, Reviews, Shipping */}
      <div className="mt-16" id="reviews">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start h-auto gap-1 bg-transparent border-b pb-0 mb-8">
            {["description", "reviews", "shipping", "vendor"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="capitalize data-[state=active]:border-b-2 data-[state=active]:border-[#c9a96e] data-[state=active]:text-[#c9a96e] rounded-none pb-3"
              >
                {tab} {tab === "reviews" && `(${mockProduct.reviewCount})`}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="description" className="prose max-w-none text-sm leading-relaxed text-muted-foreground">
            <p>{mockProduct.description}</p>
            <ul className="mt-4 space-y-2">
              <li>Premium quality chiffon fabric</li>
              <li>Hand-embroidered floral patterns</li>
              <li>Concealed front zipper closure</li>
              <li>Available in multiple colors and sizes</li>
              <li>Machine washable (cold water)</li>
            </ul>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="space-y-6">
              <div className="flex items-center gap-8 p-6 bg-muted/50 rounded-2xl">
                <div className="text-center">
                  <div className="text-5xl font-bold">{mockProduct.rating}</div>
                  <div className="flex items-center justify-center gap-0.5 my-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#c9a96e] text-[#c9a96e]" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{mockProduct.reviewCount} reviews</p>
                </div>
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-xs w-4">{star}</span>
                      <Star className="h-3 w-3 fill-[#c9a96e] text-[#c9a96e]" />
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div
                          className="bg-[#c9a96e] h-2 rounded-full"
                          style={{ width: `${[70, 20, 7, 2, 1][5 - star]}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-8">{[70, 20, 7, 2, 1][5 - star]}%</span>
                    </div>
                  ))}
                </div>
              </div>
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-sm">{review.user}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`h-3 w-3 ${i < review.rating ? "fill-[#c9a96e] text-[#c9a96e]" : "text-gray-300"}`} />
                          ))}
                        </div>
                        {review.verified && <span className="text-xs text-green-600 font-medium">✓ Verified Purchase</span>}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{review.title}</h4>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shipping">
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl">
                <Truck className="h-5 w-5 text-[#c9a96e] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground mb-1">Standard Shipping (5-7 business days)</p>
                  <p>Free on orders over $75. Otherwise $5.99.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl">
                <Truck className="h-5 w-5 text-[#c9a96e] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground mb-1">Express Shipping (2-3 business days)</p>
                  <p>$12.99 flat rate, available on all orders.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl">
                <RefreshCw className="h-5 w-5 text-[#c9a96e] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground mb-1">Returns & Exchanges</p>
                  <p>Items can be returned within 30 days of delivery. Items must be unworn, unwashed, and in original packaging.</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="vendor">
            <div className="flex items-center gap-4 p-6 bg-muted/50 rounded-2xl">
              <div className="w-16 h-16 rounded-xl bg-muted flex-shrink-0 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop"
                  alt={mockProduct.vendor.name}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold">{mockProduct.vendor.name}</h3>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-3.5 w-3.5 fill-[#c9a96e] text-[#c9a96e]" />
                  <span>{mockProduct.vendor.rating} rating</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Premium modest wear for the modern woman</p>
              </div>
              <Button asChild variant="outline">
                <Link href={`/vendors/${mockProduct.vendor.slug}`}>Visit Store</Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
