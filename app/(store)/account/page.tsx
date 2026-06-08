import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Truck,
  Bookmark,
  Navigation,
  CircleUser,
  ChevronRight,
  ShoppingBag,
  Star,
  TrendingUp,
  Waves,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "My Account" };

const quickLinks = [
  { label: "My Orders", href: "/account/orders", icon: Truck, desc: "Track and manage orders", count: "12 orders" },
  { label: "Wishlist", href: "/account/wishlist", icon: Bookmark, desc: "Saved products", count: "8 items" },
  { label: "Addresses", href: "/account/addresses", icon: Navigation, desc: "Shipping & billing", count: "2 addresses" },
  { label: "Profile", href: "/account/profile", icon: CircleUser, desc: "Personal information", count: null },
];

export default async function AccountDashboardPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] rounded-2xl p-6 text-white">
        <p className="text-white/60 text-sm mb-1">Welcome back,</p>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          {session.user.name}
          <Waves className="h-6 w-6 text-[#c9a96e] animate-pulse" />
        </h1>
        <p className="text-white/60 text-sm mt-2">
          You&apos;ve been a Modest Kouture customer since 2024
        </p>
        <div className="flex gap-6 mt-4 pt-4 border-t border-white/10">
          {[
            { label: "Orders", value: "12", icon: ShoppingBag },
            { label: "Wishlist", value: "8", icon: Bookmark },
            { label: "Reviews", value: "5", icon: Star },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-2">
              <stat.icon className="h-4 w-4 text-[#c9a96e]/70" />
              <div>
                <div className="text-xl font-bold text-[#c9a96e]">{stat.value}</div>
                <div className="text-xs text-white/50">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-4">
        {quickLinks.map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className="hover:border-[#c9a96e]/40 hover:shadow-md transition-all cursor-pointer h-full">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-[#1a1a2e]/10 flex items-center justify-center">
                    <item.icon className="h-4 w-4 text-[#1a1a2e]" />
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
                </div>
                <p className="font-semibold text-sm">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
                {item.count && (
                  <p className="text-xs font-medium text-[#c9a96e] mt-1">{item.count}</p>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent orders preview */}
      <Card>
        <div className="p-5 border-b flex items-center justify-between">
          <h2 className="font-semibold">Recent Orders</h2>
          <Link href="/account/orders" className="text-sm text-[#c9a96e] hover:text-[#b8985d] flex items-center gap-1">
            View all <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <CardContent className="p-0">
          {[
            { id: "ORD-12345", date: "Jun 2, 2026", total: 239.98, status: "Delivered", items: 2 },
            { id: "ORD-12289", date: "May 28, 2026", total: 89.99, status: "Shipped", items: 1 },
            { id: "ORD-12102", date: "May 20, 2026", total: 419.97, status: "Delivered", items: 3 },
          ].map((order) => (
            <div key={order.id} className="flex items-center justify-between px-5 py-4 border-b last:border-0 hover:bg-muted/30 transition-colors">
              <div>
                <p className="font-mono text-sm font-semibold text-[#c9a96e]">{order.id}</p>
                <p className="text-xs text-muted-foreground">{order.date} · {order.items} item{order.items > 1 ? "s" : ""}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-sm">${order.total}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${order.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
