"use client";

import Link from "next/link";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { CategoryConfigMap } from "@/components/ui/custom-icons";
import { FadeUp, StaggerGrid, StaggerItem } from "@/components/ui/motion";

const categories = [
  { name: "Women", slug: "women", count: "2.1K items" },
  { name: "Men", slug: "men", count: "890 items" },
  { name: "Children", slug: "children", count: "540 items" },
  { name: "Electronics", slug: "electronics", count: "320 items" },
  { name: "Pets", slug: "pets", count: "180 items" },
  { name: "Luxury", slug: "luxury", count: "640 items" },
  { name: "Beauty", slug: "beauty", count: "730 items" },
  { name: "Jewelry", slug: "jewelry", count: "410 items" },
  { name: "Plus Size", slug: "plus-size", count: "270 items" },
];

export default function CategoryGrid() {
  return (
    <section className="container mx-auto px-4 lg:px-6 py-16">
      <FadeUp className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <LayoutGrid className="h-5 w-5 text-[#c9a96e]" />
            <h2 className="text-3xl font-bold font-serif text-foreground tracking-tight">
              Shop by Category
            </h2>
          </div>
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
      </FadeUp>

      <StaggerGrid
        stagger={0.05}
        delayChildren={0.1}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4"
      >
        {categories.map((cat) => {
          const cfg = CategoryConfigMap[cat.slug];
          if (!cfg) return null;
          const CatIcon = cfg.icon;
          return (
            <StaggerItem key={cat.slug}>
              <Link
                href={`/category/${cat.slug}`}
                className="group flex flex-col items-center p-4 lg:p-5 rounded-2xl bg-white border border-border/60 transition-all duration-300 hover:border-transparent hover:shadow-lg hover:-translate-y-1.5 text-center"
              >
                {/* Colored icon container */}
                <div
                  className={`w-12 h-12 lg:w-14 lg:h-14 rounded-2xl ${cfg.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-all duration-300 shadow-sm`}
                >
                  <CatIcon className={`h-5 w-5 lg:h-6 lg:w-6 ${cfg.color} transition-colors duration-300`} />
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
            </StaggerItem>
          );
        })}
      </StaggerGrid>
    </section>
  );
}
