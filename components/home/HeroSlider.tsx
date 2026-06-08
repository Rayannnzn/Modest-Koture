"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    badge: "New Collection",
    title: "Elegance in Every Thread",
    subtitle: "Discover our curated collection of modest fashion from top designers worldwide",
    cta: "Shop Women's Collection",
    ctaHref: "/category/women",
    secondaryCta: "Explore Vendors",
    secondaryHref: "/vendors",
    bgColor: "from-[#1a1a2e] to-[#16213e]",
    accentColor: "#c9a96e",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop",
    tag: "Women's Fashion",
  },
  {
    id: 2,
    badge: "Luxury Edit",
    title: "Timeless Jewelry & Accessories",
    subtitle: "Handcrafted pieces that tell your story — from delicate gold to bold statement jewelry",
    cta: "Shop Jewelry",
    ctaHref: "/category/jewelry",
    secondaryCta: "View Lookbook",
    secondaryHref: "/blog",
    bgColor: "from-[#2d1b33] to-[#1a1a2e]",
    accentColor: "#f0d080",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop",
    tag: "Jewelry",
  },
  {
    id: 3,
    badge: "Beauty Essentials",
    title: "Glow From the Inside Out",
    subtitle: "Clean, halal-certified beauty products that complement your natural radiance",
    cta: "Shop Beauty",
    ctaHref: "/category/beauty",
    secondaryCta: "Learn More",
    secondaryHref: "/about",
    bgColor: "from-[#1a1a2e] to-[#0f3460]",
    accentColor: "#e8b4b8",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop",
    tag: "Beauty",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative overflow-hidden rounded-2xl mx-4 lg:mx-6 mt-4">
      <div
        className={cn(
          "relative min-h-[420px] lg:min-h-[520px] bg-gradient-to-br transition-all duration-700",
          slide.bgColor
        )}
      >
        <div className="container mx-auto px-6 lg:px-10 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Text content */}
            <div
              className={cn(
                "transition-all duration-500",
                isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              )}
            >
              <span
                className="inline-block px-3.5 py-1 rounded-md text-xs font-medium uppercase tracking-wide mb-4 border"
                style={{
                  color: slide.accentColor,
                  borderColor: slide.accentColor + "40",
                  backgroundColor: slide.accentColor + "12",
                }}
              >
                {slide.badge}
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold font-serif text-white leading-[1.15] mb-5 tracking-tight">
                {slide.title}
              </h1>
              <p className="text-white/80 text-sm lg:text-base mb-8 leading-relaxed max-w-md">
                {slide.subtitle}
              </p>
              <div className="flex flex-wrap gap-3.5">
                <Button
                  asChild
                  size="lg"
                  className="gap-2 text-[#1a1a2e] font-semibold uppercase text-xs tracking-wide rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-lg"
                  style={{ backgroundColor: slide.accentColor }}
                >
                  <Link href={slide.ctaHref}>
                    {slide.cta}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-black hover:bg-white hover:text-[#1a1a2e] uppercase text-xs tracking-wide font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  <Link href={slide.secondaryHref}>{slide.secondaryCta}</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-10 pt-8 border-t border-white/10">
                {[
                  { value: "500+", label: "Premium Brands" },
                  { value: "10K+", label: "Vetted Pieces" },
                  { value: "50K+", label: "Orders Shipped" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold tabular-nums" style={{ color: slide.accentColor }}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-white/50 uppercase tracking-wide font-medium mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div
              className={cn(
                "relative flex justify-center transition-all duration-500",
                isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
              )}
            >
              <div className="relative w-72 h-72 lg:w-96 lg:h-96">
                {/* Decorative rings */}
                <div
                  className="absolute inset-0 rounded-full border-2 opacity-20 animate-pulse"
                  style={{ borderColor: slide.accentColor }}
                />
                <div
                  className="absolute inset-4 rounded-full border opacity-10"
                  style={{ borderColor: slide.accentColor }}
                />
                {/* Image */}
                <div className="absolute inset-8 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={slide.image}
                    alt={slide.tag}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 288px, 384px"
                  />
                </div>
                {/* Tag badge */}
                <div
                  className="absolute -bottom-2 -right-2 px-3 py-1.5 rounded-xl text-xs font-bold text-[#1a1a2e] shadow-lg"
                  style={{ backgroundColor: slide.accentColor }}
                >
                  {slide.tag}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-5 z-20">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="h-4 w-4 text-white" />
          </button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={cn(
                  "h-0.5 transition-all duration-300 cursor-pointer",
                  i === current ? "w-10 bg-white" : "w-6 bg-white/30"
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}
