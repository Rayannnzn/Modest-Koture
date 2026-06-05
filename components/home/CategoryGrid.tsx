import Link from "next/link";
import {
  ArrowRight,
  Shirt,
  Baby,
  Smartphone,
  PawPrint,
  Crown,
  Sparkles,
  Gem,
  User,
} from "lucide-react";

const categories = [
  { name: "Women", slug: "women", icon: Shirt, count: "2.1K items" },
  { name: "Men", slug: "men", icon: Shirt, count: "890 items" },
  { name: "Children", slug: "children", icon: Baby, count: "540 items" },
  { name: "Electronics", slug: "electronics", icon: Smartphone, count: "320 items" },
  { name: "Pets", slug: "pets", icon: PawPrint, count: "180 items" },
  { name: "Luxury", slug: "luxury", icon: Crown, count: "640 items" },
  { name: "Beauty", slug: "beauty", icon: Sparkles, count: "730 items" },
  { name: "Jewelry", slug: "jewelry", icon: Gem, count: "410 items" },
  { name: "Plus Size", slug: "plus-size", icon: User, count: "270 items" },
];

export default function CategoryGrid() {
  return (
    <section className="container mx-auto px-4 lg:px-6 py-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold font-serif text-foreground tracking-tight">
            Shop by Category
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Explore our curated modest fashion and luxury lifestyle collections
          </p>
        </div>
        <Link
          href="/shop"
          className="group flex items-center gap-1.5 text-sm font-medium text-[#c9a96e] hover:text-[#b8985d] transition-colors whitespace-nowrap"
        >
          All Categories
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group flex flex-col items-center p-5 rounded-xl bg-white border border-border transition-all duration-300 hover:border-[#c9a96e] hover:shadow-premium hover:-translate-y-1 text-center"
            >
              {/* Icon container */}
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#f8f5f0] text-[#1a1a2e] flex items-center justify-center mb-3 group-hover:bg-[#1a1a2e] group-hover:text-white transition-all duration-300 shadow-sm">
                <Icon className="h-5 w-5 lg:h-6 lg:w-6 stroke-[1.5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-foreground group-hover:text-[#c9a96e] transition-colors leading-tight">
                  {cat.name}
                </span>
                <span className="text-[10px] text-muted-foreground mt-1 tracking-wide uppercase">
                  {cat.count}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
