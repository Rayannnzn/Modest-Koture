"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  LogOut,
  Package,
  MapPin,
  Settings,
  LayoutDashboard,
  Flame,
  Sparkles,
  LayoutGrid,
} from "lucide-react";
import {
  NavSearchIcon,
  NavHeartIcon,
  NavCartIcon,
  NavStoreIcon,
  NavMenuIcon,
  NavCloseIcon,
  NavChevronDownIcon,
  CategoryConfigMap,
} from "@/components/ui/custom-icons";

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

// ─── Category data ────────────────────────────────────────────────────────────
const categories = [
  { name: "Women", slug: "women" },
  { name: "Men", slug: "men" },
  { name: "Children", slug: "children" },
  { name: "Electronics", slug: "electronics" },
  { name: "Pets", slug: "pets" },
  { name: "Luxury", slug: "luxury" },
  { name: "Beauty", slug: "beauty" },
  { name: "Jewelry", slug: "jewelry" },
  { name: "Plus Size", slug: "plus-size" },
];

// ─── Header Component ─────────────────────────────────────────────────────────
export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activePath, setActivePath] = useState("");
  const { itemCount, toggleCart } = useCartStore();
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

  useEffect(() => {
    setActivePath(pathname || "");
  }, [pathname]);

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
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="h-3 w-3 text-[#c9a96e]" />
          Free shipping on orders over $75 · Use code{" "}
          <span className="font-semibold text-[#c9a96e]">WELCOME15</span>
          {" "}for 15% off your first order
        </span>
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-border transition-shadow duration-300",
          isScrolled && "shadow-md"
        )}
      >
        {/* ── Main header ─────────────────────────────────────── */}
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex h-20 md:h-24 items-center gap-5">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="w-11 h-11 md:w-13 md:h-13 rounded-xl bg-[#1a1a2e] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <span className="text-[#c9a96e] font-bold text-xl md:text-2xl">M</span>
              </div>
              <div className="block">
                <div className="font-bold text-[#1a1a2e] text-xl md:text-2xl leading-tight tracking-tight">
                  Modest
                </div>
                <div className="text-[#c9a96e] text-xs md:text-sm font-semibold tracking-wide uppercase -mt-0.5 md:-mt-1">
                  Kouture
                </div>
              </div>
            </Link>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden md:flex">
              <div className="relative w-full">
                <NavSearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for dresses, abayas, hijabs..."
                  className="w-full pl-13 pr-4 py-3 md:py-3.5 text-sm md:text-base rounded-xl md:rounded-2xl border border-input bg-muted/50 hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-[#c9a96e]/50 focus:border-[#c9a96e] focus:bg-white"
                />
              </div>
            </form>

            {/* Right actions */}
            <div className="flex items-center gap-1 ml-auto">
              {/* Become a seller */}
              <Link href="/become-a-seller" className="hidden lg:block">
                <Button variant="gold-outline" className="gap-2 h-11 md:h-13 px-4.5 md:px-6 text-sm md:text-base hover:cursor-pointer">
                  <NavStoreIcon className="h-5 w-5" />
                  Sell on MK
                </Button>
              </Link>

              {/* Wishlist */}
              <Link href="/account/wishlist">
                <Button variant="ghost" size="icon" className="relative h-11 w-11 md:h-13 md:w-13">
                  <NavHeartIcon className="h-6 w-6" />
                  <span className="sr-only">Wishlist</span>
                </Button>
              </Link>

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                className="relative h-11 w-11 md:h-13 md:w-13"
                onClick={toggleCart}
                aria-label="Open cart"
              >
                <NavCartIcon className="h-6 w-6" />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 h-5.5 w-5.5 rounded-full bg-[#c9a96e] text-white text-[10px] md:text-xs font-semibold flex items-center justify-center min-w-[20px] px-1">
                    {count > 99 ? "99+" : count}
                  </span>
                )}
              </Button>

              {/* Account */}
              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="rounded-full ml-1 h-11 w-11 md:h-13 md:w-13 p-0 flex items-center justify-center">
                      <Avatar className="h-9.5 w-9.5 md:h-11.5 md:w-11.5">
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
                        <NavHeartIcon className="h-4 w-4" />
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
                            <NavStoreIcon className="h-4 w-4" />
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
                className="md:hidden ml-1 h-11 w-11"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <NavCloseIcon className="h-6 w-6" /> : <NavMenuIcon className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* ── Category Navigation Bar (Desktop) ───────────────── */}
        {showCategoryNav && (
          <nav
            className="hidden md:block border-t border-border/60"
            style={{ background: "linear-gradient(to bottom, #ffffff, #fafafa)" }}
          >
            <div className="container mx-auto px-4 lg:px-6">
              <ul className="flex items-center h-14 overflow-x-auto scrollbar-none gap-0.5">

                {/* All Categories Dropdown */}
                <li className="flex-shrink-0 mr-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="group flex items-center gap-2.5 h-10 px-4 rounded-xl bg-[#1a1a2e] hover:bg-[#1a1a2e]/90 text-white text-base font-semibold transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none">
                        <LayoutGrid className="h-5 w-5 flex-shrink-0" />
                        All Categories
                        <NavChevronDownIcon className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                      </button>
                    </DropdownMenuTrigger>

                    {/* Dropdown panel — two-column grid for premium look */}
                    <DropdownMenuContent
                      align="start"
                      sideOffset={8}
                      className="p-2 w-64 shadow-xl border border-border/60 rounded-2xl bg-white"
                    >
                      <div className="grid grid-cols-1 gap-0.5">
                        {categories.map((cat) => {
                          const cfg = CategoryConfigMap[cat.slug];
                          if (!cfg) return null;
                          const CatIcon = cfg.icon;
                          const isActive = activePath === `/category/${cat.slug}`;
                          return (
                            <DropdownMenuItem key={cat.slug} asChild>
                              <Link
                                href={`/category/${cat.slug}`}
                                className={cn(
                                  "flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 group/item",
                                  isActive
                                    ? "bg-[#1a1a2e] text-white"
                                    : "hover:bg-muted/70 text-foreground"
                                )}
                              >
                                <div className={cn(
                                  "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200",
                                  isActive ? "bg-white/20" : `${cfg.bg} group-hover/item:${cfg.hoverBg}`
                                )}>
                                  <CatIcon className={cn("h-3.5 w-3.5", isActive ? "text-white" : cfg.color)} />
                                </div>
                                <span className="text-sm font-medium">{cat.name}</span>
                                {isActive && (
                                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#c9a96e]" />
                                )}
                              </Link>
                            </DropdownMenuItem>
                          );
                        })}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>

                {/* Divider */}
                <li className="w-px h-5 bg-border/50 mx-1 flex-shrink-0" aria-hidden="true" />

                {/* Individual category pills */}
                {categories.slice(0, 7).map((cat) => {
                  const cfg = CategoryConfigMap[cat.slug];
                  if (!cfg) return null;
                  const CatIcon = cfg.icon;
                  const isActive = activePath === `/category/${cat.slug}`;

                  return (
                    <li key={cat.slug} className="flex-shrink-0">
                      <Link
                        href={`/category/${cat.slug}`}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "group relative flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-base font-medium transition-all duration-200 whitespace-nowrap select-none",
                          isActive
                            ? "text-[#1a1a2e] bg-[#1a1a2e]/[0.06]"
                            : "text-foreground/70 hover:text-foreground hover:bg-muted/60"
                        )}
                      >
                        {/* Icon container with per-category color */}
                        <div
                          className={cn(
                            "w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 flex-shrink-0",
                            isActive
                              ? `${cfg.bg} scale-110`
                              : `${cfg.bg} group-hover:${cfg.hoverBg} group-hover:scale-110`
                          )}
                        >
                          <CatIcon
                            className={cn(
                              "h-4 w-4 transition-colors duration-200",
                              cfg.color
                            )}
                          />
                        </div>

                        {cat.name}

                        {/* Active underline indicator */}
                        {isActive && (
                          <span
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-4/5 rounded-full"
                            style={{ background: "linear-gradient(90deg, transparent, #c9a96e, transparent)" }}
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}

                {/* Trending pill (far right) */}
                <li className="ml-auto flex-shrink-0">
                  <Link
                    href="/shop?sort=popular"
                    className="group flex items-center gap-2 px-4 py-2 rounded-xl text-base font-semibold text-[#b8935d] hover:text-[#1a1a2e] hover:bg-[#faefd8] transition-all duration-200 whitespace-nowrap"
                  >
                    <Flame className="h-4.5 w-4.5 text-[#c9a96e] group-hover:scale-110 transition-transform duration-200" />
                    Trending
                  </Link>
                </li>

              </ul>
            </div>
          </nav>
        )}

        {/* ── Mobile Menu ──────────────────────────────────────── */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-border">
            {/* Mobile search */}
            <div className="p-4">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <NavSearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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

            {/* Mobile categories — premium colored grid */}
            <div className="border-t border-border">
              <p className="px-4 pt-3 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                Shop by Category
              </p>
              <div className="grid grid-cols-3 gap-2 p-3">
                {categories.map((cat) => {
                  const cfg = CategoryConfigMap[cat.slug];
                  if (!cfg) return null;
                  const CatIcon = cfg.icon;
                  const isActive = activePath === `/category/${cat.slug}`;

                  return (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "group flex flex-col items-center gap-2 py-3 px-2 rounded-2xl text-center transition-all duration-200 active:scale-95",
                        isActive
                          ? "bg-[#1a1a2e]"
                          : "bg-muted/40 hover:bg-muted"
                      )}
                    >
                      {/* Colored icon bubble */}
                      <div
                        className={cn(
                          "w-11 h-11 rounded-xl flex items-center justify-center shadow-sm transition-all duration-200 group-hover:scale-105",
                          isActive ? "bg-white/15" : cfg.bg
                        )}
                      >
                        <CatIcon
                          className={cn(
                            "h-5 w-5",
                            isActive ? "text-white" : cfg.color
                          )}
                        />
                      </div>
                      <span
                        className={cn(
                          "text-[11px] font-semibold leading-tight",
                          isActive ? "text-white" : "text-foreground/75"
                        )}
                      >
                        {cat.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Become a seller */}
            <div className="p-4 border-t border-border">
              <Link href="/become-a-seller" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="gold" className="w-full gap-2">
                  <NavStoreIcon className="h-4 w-4" />
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
