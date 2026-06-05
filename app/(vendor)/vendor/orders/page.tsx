import type { Metadata } from "next";
import { ShoppingBag, Search, Filter, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = { title: "Vendor Orders" };

const orders = [
  { id: "ORD-001", customer: "Amina K.", product: "Embroidered Abaya", amount: 119.99, status: "Pending", date: "Just now", items: 1 },
  { id: "ORD-002", customer: "Sarah M.", product: "Gold Necklace Set", amount: 89.99, status: "Processing", date: "2h ago", items: 1 },
  { id: "ORD-003", customer: "Fatima H.", product: "Silk Maxi Dress", amount: 159.99, status: "Shipped", date: "Yesterday", items: 1 },
  { id: "ORD-004", customer: "Layla O.", product: "Pearl Earrings", amount: 69.99, status: "Delivered", date: "2 days ago", items: 1 },
  { id: "ORD-005", customer: "Noor A.", product: "Leather Handbag", amount: 249.99, status: "Completed", date: "3 days ago", items: 2 },
  { id: "ORD-006", customer: "Zainab R.", product: "Argan Oil Set", amount: 89.99, status: "Pending", date: "4 days ago", items: 3 },
];

const statusColors: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-700",
  Processing: "bg-blue-100 text-blue-700",
  Shipped: "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
  Completed: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function VendorOrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-[#c9a96e]" />
            Orders
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">{orders.length} orders in your store</p>
        </div>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Pending", count: 2, color: "border-l-amber-400" },
          { label: "Processing", count: 1, color: "border-l-blue-400" },
          { label: "Shipped", count: 1, color: "border-l-purple-400" },
          { label: "Completed", count: 2, color: "border-l-emerald-400" },
        ].map((s) => (
          <div key={s.label} className={`bg-white rounded-xl border border-border border-l-4 ${s.color} p-4`}>
            <div className="text-2xl font-bold">{s.count}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search orders..." className="pl-10" />
        </div>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  {["Order ID", "Customer", "Product", "Items", "Amount", "Status", "Date", ""].map((h) => (
                    <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-[#c9a96e] font-semibold">{order.id}</td>
                    <td className="px-6 py-4 font-medium">{order.customer}</td>
                    <td className="px-6 py-4 text-muted-foreground truncate max-w-40">{order.product}</td>
                    <td className="px-6 py-4 text-muted-foreground">{order.items}</td>
                    <td className="px-6 py-4 font-semibold">{formatPrice(order.amount)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground text-xs">{order.date}</td>
                    <td className="px-6 py-4">
                      <button className="p-1 hover:bg-muted rounded-lg transition-colors">
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
