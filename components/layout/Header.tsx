"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  Store,
  LogOut,
  Package,
  MapPin,
  Settings,
  LayoutDashboard,
  Shirt,
  Baby,
  Smartphone,
  PawPrint,
  Crown,
  Sparkles,
  Gem,
} from "lucide-react";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  women: Shirt,
  men: Shirt,
  children: Baby,
  electronics: Smartphone,
  pets: PawPrint,
  luxury: Crown,
  beauty: Sparkles,
  jewelry: Gem,
  "plus-size": User,
};
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCartStore } from "@/store/cartStore";
import { getInitials } from "@/lib/utils";
import { cn } from "@/lib/utils";
import CartDrawer from "@/components/cart/CartDrawer";

const categories = [
  { name: "Women", slug: "women", emoji: "👗" },
  { name: "Men", slug: "men", emoji: "👔" },
  { name: "Children", slug: "children", emoji: "🧸" },
  { name: "Electronics", slug: "electronics", emoji: "📱" },
  { name: "Pets", slug: "pets", emoji: "🐾" },
  { name: "Luxury", slug: "luxury", emoji: "💎" },
  { name: "Beauty", slug: "beauty", emoji: "💄" },
  { name: "Jewelry", slug: "jewelry", emoji: "💍" },
  { name: "Plus Size", slug: "plus-size", emoji: "✨" },
];

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { itemCount, toggleCart, isOpen } = useCartStore();
  const count = itemCount();

  const currentPath = pathname || "";
  const showCategoryNav =
    currentPath === "/" ||
    currentPath.startsWith("/shop") ||
    currentPath.startsWith("/category") ||
    currentPath.startsWith("/vendors");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-[#1a1a2e] text-white text-xs py-2 text-center px-4">
        <span>✨ Free shipping on orders over $75 · Use code </span>
        <span className="font-semibold text-[#c9a96e]">WELCOME15</span>
        <span> for 15% off your first order</span>
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-border transition-shadow duration-300",
          isScrolled && "shadow-md"
        )}
      >
        {/* Main header */}
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex h-16 md:h-20 items-center gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-[#1a1a2e] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <span className="text-[#c9a96e] font-bold text-lg md:text-xl">M</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-[#1a1a2e] text-lg md:text-xl leading-tight tracking-tight">
                  Modest
                </div>
                <div className="text-[#c9a96e] text-xs font-semibold tracking-wide uppercase -mt-0.5 md:-mt-1">
                  Kouture
                </div>
              </div>
            </Link>

            {/* Search bar */}
            <form
              onSubmit={handleSearch}
              className="flex-1 max-w-xl hidden md:flex"
            >
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for dresses, abayas, hijabs..."
                  className="w-full pl-11 pr-4 py-2.5 md:py-3 text-sm md:text-base rounded-xl md:rounded-2xl border border-input bg-muted/50 hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-[#c9a96e]/50 focus:border-[#c9a96e] focus:bg-white"
                />
              </div>
            </form>

            {/* Right actions */}
            <div className="flex items-center gap-1 ml-auto">
              {/* Become a seller */}
              <Link href="/become-a-seller" className="hidden lg:block">
                <Button variant="gold-outline" className="gap-1.5 h-10 md:h-11 px-4 md:px-5">
                  <Store className="h-4 w-4" />
                  Sell on MK
                </Button>
              </Link>

              {/* Wishlist */}
              <Link href="/account/wishlist">
                <Button variant="ghost" size="icon" className="relative h-10 w-10 md:h-11 md:w-11">
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">Wishlist</span>
                </Button>
              </Link>

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                className="relative h-10 w-10 md:h-11 md:w-11"
                onClick={toggleCart}
                aria-label="Open cart"
              >
                <ShoppingBag className="h-5 w-5" />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 h-4.5 w-4.5 rounded-full bg-[#c9a96e] text-white text-xs font-semibold flex items-center justify-center min-w-[18px] px-1">
                    {count > 99 ? "99+" : count}
                  </span>
                )}
              </Button>

              {/* Account */}
              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="rounded-full ml-1 h-9 w-9 md:h-11 md:w-11 p-0 flex items-center justify-center">
                      <Avatar className="h-8 w-8 md:h-10 md:w-10">
                        <AvatarImage src={session.user?.image ?? ""} alt={session.user?.name ?? ""} />
                        <AvatarFallback className="bg-[#1a1a2e] text-[#c9a96e] text-xs font-bold">
                          {getInitials(session.user?.name ?? "U")}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="font-semibold">{session.user?.name}</div>
                      <div className="text-xs text-muted-foreground font-normal">{session.user?.email}</div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/account" className="cursor-pointer">
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/account/orders" className="cursor-pointer">
                        <Package className="h-4 w-4" />
                        My Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/account/wishlist" className="cursor-pointer">
                        <Heart className="h-4 w-4" />
                        Wishlist
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/account/addresses" className="cursor-pointer">
                        <MapPin className="h-4 w-4" />
                        Addresses
                      </Link>
                    </DropdownMenuItem>
                    {(session.user?.role === "VENDOR" || session.user?.role === "ADMIN") && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/vendor/dashboard" className="cursor-pointer">
                            <Store className="h-4 w-4" />
                            Vendor Dashboard
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    {session.user?.role === "ADMIN" && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin/dashboard" className="cursor-pointer">
                          <Settings className="h-4 w-4" />
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="text-destructive focus:text-destructive cursor-pointer"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="hidden sm:flex gap-2 ml-1">
                  <Link href="/login">
                    <Button variant="ghost" className="h-10 md:h-11 px-4 md:px-5">Sign In</Button>
                  </Link>
                  <Link href="/register">
                    <Button className="bg-[#1a1a2e] hover:bg-[#1a1a2e]/90 h-10 md:h-11 px-4 md:px-5">
                      Register
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile menu toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden ml-1"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Category navigation */}
        {showCategoryNav && (
          <nav className="hidden md:block border-t border-border bg-white">
            <div className="container mx-auto px-4 lg:px-6">
              <ul className="flex items-center gap-1 h-11 overflow-x-auto scrollbar-none">
                <li>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1.5 text-white bg-[#1a1a2e] hover:bg-[#1a1a2e]/90 rounded-lg h-8 px-3"
                      >
                        <Menu className="h-4 w-4" />
                        All Categories
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                      {categories.map((cat) => {
                        const Icon = categoryIcons[cat.slug] || Store;
                        return (
                          <DropdownMenuItem key={cat.slug} asChild>
                            <Link href={`/category/${cat.slug}`} className="cursor-pointer gap-2">
                              <Icon className="h-4 w-4 text-muted-foreground" />
                              {cat.name}
                            </Link>
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
                {categories.slice(0, 7).map((cat) => {
                  const Icon = categoryIcons[cat.slug] || Store;
                  return (
                    <li key={cat.slug}>
                      <Link
                        href={`/category/${cat.slug}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-foreground/80 hover:text-foreground hover:bg-muted rounded-lg transition-colors whitespace-nowrap"
                      >
                        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                        {cat.name}
                      </Link>
                    </li>
                  );
                })}
                <li className="ml-auto flex-shrink-0">
                  <Link
                    href="/shop?sort=popular"
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-[#c9a96e] font-medium hover:text-[#b8985d] transition-colors"
                  >
                    🔥 Trending
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        )}

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-border">
            {/* Mobile search */}
            <div className="p-4">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-input bg-muted/50 focus:outline-none focus:ring-2 focus:ring-[#c9a96e]/50"
                  />
                </div>
              </form>
            </div>
            {/* Mobile auth */}
            {!session && (
              <div className="px-4 pb-3 flex gap-2">
                <Link href="/login" className="flex-1">
                  <Button variant="outline" className="w-full" size="sm">Sign In</Button>
                </Link>
                <Link href="/register" className="flex-1">
                  <Button className="w-full bg-[#1a1a2e]" size="sm">Register</Button>
                </Link>
              </div>
            )}
            {/* Mobile categories */}
            <div className="border-t border-border">
              <p className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Categories
              </p>
              <div className="grid grid-cols-3 gap-1 p-3">
                {categories.map((cat) => {
                  const Icon = categoryIcons[cat.slug] || Store;
                  return (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-muted text-center transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-medium text-foreground/80">{cat.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
            {/* Become a seller */}
            <div className="p-4 border-t border-border">
              <Link href="/become-a-seller" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="gold" className="w-full gap-2">
                  <Store className="h-4 w-4" />
                  Sell on Modest Kouture
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  );
}
