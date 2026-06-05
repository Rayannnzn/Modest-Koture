import Link from "next/link";
import { Tag, ArrowRight } from "lucide-react";

const priceRanges = [
  {
    label: "Under $50",
    max: 50,
    href: "/shop?maxPrice=50",
    desc: "Daily Finds",
  },
  {
    label: "Under $100",
    max: 100,
    href: "/shop?maxPrice=100",
    desc: "Quality Essentials",
  },
  {
    label: "Under $150",
    max: 150,
    href: "/shop?maxPrice=150",
    desc: "Premium Picks",
  },
  {
    label: "Under $200",
    max: 200,
    href: "/shop?maxPrice=200",
    desc: "Luxury for Less",
  },
];

export default function ShopByPrice() {
  return (
    <section className="container mx-auto px-4 lg:px-6 py-16">
      <div className="flex items-center gap-2.5 mb-10">
        <Tag className="h-5 w-5 text-[#c9a96e]" />
        <h2 className="text-3xl font-bold font-serif text-foreground tracking-tight">Shop By Price</h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {priceRanges.map((range) => (
          <Link
            key={range.label}
            href={range.href}
            className="group flex flex-col items-center justify-center p-8 rounded-xl border border-border bg-white transition-all duration-300 hover:border-[#c9a96e] hover:shadow-premium hover:-translate-y-1 text-center"
          >
            <span className="w-10 h-10 rounded-full bg-[#f8f5f0] text-[#c9a96e] flex items-center justify-center mb-4 group-hover:bg-[#1a1a2e] group-hover:text-white transition-colors duration-300">
              $
            </span>
            <span className="text-2xl font-bold font-serif text-[#1a1a2e]">
              {range.label}
            </span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-1.5">{range.desc}</span>
            <div className="flex items-center gap-1 mt-5 text-[10px] font-bold uppercase tracking-wider text-[#c9a96e] group-hover:text-[#b8985d] transition-colors">
              <span>Explore Now</span>
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
