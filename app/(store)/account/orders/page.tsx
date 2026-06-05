import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Package,
  ChevronRight,
  Search,
  Filter,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = { title: "My Orders — Modest Kouture" };

const orders = [
  {
    id: "ORD-12345",
    date: "Jun 2, 2026",
    total: 239.98,
    status: "Delivered",
    items: [
      { name: "Embroidered Floral Abaya", qty: 1, price: 119.99, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=80&h=80&fit=crop" },
      { name: "Gold Layered Necklace Set", qty: 1, price: 119.99, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=80&h=80&fit=crop" },
    ],
  },
  {
    id: "ORD-12289",
    date: "May 28, 2026",
    total: 89.99,
    status: "Shipped",
    items: [
      { name: "Natural Argan Oil Serum", qty: 1, price: 89.99, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=80&h=80&fit=crop" },
    ],
  },
  {
    id: "ORD-12102",
    date: "May 20, 2026",
    total: 419.97,
    status: "Delivered",
    items: [
      { name: "Silk Pleated Maxi Dress", qty: 1, price: 159.99, image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=80&h=80&fit=crop" },
      { name: "Structured Leather Handbag", qty: 1, price: 249.99, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=80&h=80&fit=crop" },
    ],
  },
  {
    id: "ORD-11987",
    date: "May 10, 2026",
    total: 79.99,
    status: "Processing",
    items: [
      { name: "Cotton Linen Wide Leg Pants", qty: 1, price: 79.99, image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=80&h=80&fit=crop" },
    ],
  },
];

const statusConfig: Record<string, { icon: typeof CheckCircle2; color: string; bg: string }> = {
  Delivered: { icon: CheckCircle2, color: "text-green-700", bg: "bg-green-100" },
  Shipped: { icon: Truck, color: "text-blue-700", bg: "bg-blue-100" },
  Processing: { icon: Clock, color: "text-amber-700", bg: "bg-amber-100" },
  Cancelled: { icon: XCircle, color: "text-red-700", bg: "bg-red-100" },
};

export default async function OrdersPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Package className="h-6 w-6 text-[#c9a96e]" />
            My Orders
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">{orders.length} orders placed</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search orders..." className="pl-10" />
        </div>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Filter className="h-4 w-4" />
          Filter by status
        </Button>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => {
          const status = statusConfig[order.status] ?? statusConfig["Processing"];
          const StatusIcon = status.icon;
          return (
            <div key={order.id} className="bg-white rounded-2xl border border-border overflow-hidden hover:border-[#c9a96e]/30 hover:shadow-md transition-all">
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border-b bg-muted/30">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-mono text-sm font-bold text-[#c9a96e]">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                  <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.color}`}>
                    <StatusIcon className="h-3 w-3" />
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-sm">${order.total.toFixed(2)}</span>
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                    View Details
                    <ChevronRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              {/* Order Items */}
              <div className="p-4 space-y-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.qty}</p>
                    </div>
                    <span className="font-semibold text-sm">${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
