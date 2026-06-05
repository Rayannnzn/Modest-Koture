"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  BarChart2,
  Star,
  Wallet,
  Megaphone,
  Settings,
  LogOut,
  ChevronRight,
  Store,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", href: "/vendor/dashboard", icon: LayoutDashboard },
  { label: "Products", href: "/vendor/products", icon: Package },
  { label: "Orders", href: "/vendor/orders", icon: ShoppingBag },
  { label: "Reports", href: "/vendor/reports", icon: BarChart2 },
  { label: "Reviews", href: "/vendor/reviews", icon: Star },
  { label: "Withdrawals", href: "/vendor/withdrawals", icon: Wallet },
  { label: "Announcements", href: "/vendor/announcements", icon: Megaphone },
  { label: "Store Settings", href: "/vendor/settings", icon: Settings },
];

export default function VendorSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#1a1a2e] flex flex-col min-h-screen">
      {/* Brand */}
      <div className="p-5 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#c9a96e] flex items-center justify-center">
            <span className="text-[#1a1a2e] font-bold text-lg">M</span>
          </div>
          <div>
            <div className="text-white font-bold text-sm">Modest Kouture</div>
            <div className="text-[#c9a96e] text-[10px] tracking-widest">VENDOR PORTAL</div>
          </div>
        </Link>
      </div>

      {/* Store info */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
          <div className="w-10 h-10 rounded-lg bg-[#c9a96e]/20 flex items-center justify-center">
            <Store className="h-5 w-5 text-[#c9a96e]" />
          </div>
          <div>
            <p className="text-white text-xs font-semibold">My Store</p>
            <p className="text-white/40 text-[10px]">Manage your storefront</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 group",
                isActive
                  ? "bg-[#c9a96e] text-[#1a1a2e] font-semibold"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              )}
            >
              <item.icon className={cn("h-4 w-4 flex-shrink-0", isActive ? "text-[#1a1a2e]" : "text-white/40 group-hover:text-white")} />
              {item.label}
              {isActive && <ChevronRight className="h-3 w-3 ml-auto" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="p-4 border-t border-white/10">
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors mb-1">
          <Store className="h-4 w-4" />
          View Storefront
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:text-red-400 hover:bg-red-400/10 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
