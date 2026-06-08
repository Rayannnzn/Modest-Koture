import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Package, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const vendors = [
  {
    id: "1",
    name: "Zara Modest",
    slug: "zara-modest",
    logo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop",
    banner: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=300&fit=crop",
    category: "Women's Fashion",
    rating: 4.9,
    products: 284,
    description: "Premium modest wear for the modern woman",
  },
  {
    id: "2",
    name: "Luxe Jewelry Co",
    slug: "luxe-jewelry",
    logo: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&h=100&fit=crop",
    banner: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=300&fit=crop",
    category: "Jewelry",
    rating: 4.8,
    products: 156,
    description: "Handcrafted gold & silver jewelry from artisans",
  },
  {
    id: "3",
    name: "Pure Beauty Lab",
    slug: "pure-beauty-lab",
    logo: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&h=100&fit=crop",
    banner: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=300&fit=crop",
    category: "Beauty",
    rating: 4.7,
    products: 92,
    description: "Clean, halal-certified beauty essentials",
  },
  {
    id: "4",
    name: "Le Sac Luxe",
    slug: "le-sac-luxe",
    logo: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&h=100&fit=crop",
    banner: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=300&fit=crop",
    category: "Luxury",
    rating: 5.0,
    products: 48,
    description: "Artisan leather bags and accessories",
  },
];

export default function FeaturedVendors() {
  return (
    <section className="bg-[#fbfaf8] py-16 md:py-20 border-y border-border">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold font-serif text-foreground tracking-tight">
              Featured Vendors
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Shop from our top-rated independent modest wear designers
            </p>
          </div>
          <Link
            href="/vendors"
            className="group flex items-center gap-1.5 text-sm font-medium text-[#c9a96e] hover:text-[#b8985d] transition-colors whitespace-nowrap"
          >
            All Vendors
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

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
                  <h3 className="font-serif font-bold text-base text-foreground group-hover:text-[#c9a96e] transition-colors leading-tight mb-0.5">
                    {vendor.name}
                  </h3>
                  <p className="text-xs text-[#c9a96e] uppercase tracking-wide font-medium mb-2">
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
                    <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Become a seller CTA */}
        <div className="mt-12 p-8 md:p-12 rounded-xl bg-gradient-to-r from-[#1a1a2e] to-[#121224] text-center text-white border border-[#c9a96e]/15 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />
          <h3 className="text-2xl md:text-3xl font-serif font-bold mb-3 tracking-tight">
            Ready to showcase your brand?
          </h3>
          <p className="text-white/70 text-sm md:text-base mb-6 max-w-lg mx-auto leading-relaxed">
            Join 500+ premium modest designers on Modest Kouture and connect with customers globally.
          </p>
          <Button asChild variant="gold" size="lg" className="uppercase text-xs tracking-wide font-semibold px-8 shadow-lg">
            <Link href="/become-a-seller" className="gap-2">
              Start Selling Today
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
