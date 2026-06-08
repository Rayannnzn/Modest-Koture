import type { Metadata } from "next";
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Package,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  ExternalLink,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Vendor Dashboard",
};

const stats = [
  {
    label: "Total Revenue",
    value: "$12,840.50",
    change: "+12.5%",
    positive: true,
    icon: DollarSign,
    color: "text-emerald-600 bg-emerald-100",
  },
  {
    label: "Pending Orders",
    value: "34",
    change: "+8",
    positive: true,
    icon: ShoppingBag,
    color: "text-blue-600 bg-blue-100",
  },
  {
    label: "Active Products",
    value: "128",
    change: "+5",
    positive: true,
    icon: Package,
    color: "text-purple-600 bg-purple-100",
  },
  {
    label: "Avg Rating",
    value: "4.8",
    change: "+0.2",
    positive: true,
    icon: Star,
    color: "text-amber-600 bg-amber-100",
  },
];

const recentOrders = [
  { id: "ORD-001", customer: "Amina K.", product: "Embroidered Abaya", amount: 119.99, status: "Pending", date: "Just now" },
  { id: "ORD-002", customer: "Sarah M.", product: "Gold Necklace Set", amount: 89.99, status: "Processing", date: "2h ago" },
  { id: "ORD-003", customer: "Fatima H.", product: "Silk Maxi Dress", amount: 159.99, status: "Shipped", date: "Yesterday" },
  { id: "ORD-004", customer: "Layla O.", product: "Pearl Earrings", amount: 69.99, status: "Delivered", date: "2 days ago" },
  { id: "ORD-005", customer: "Noor A.", product: "Leather Handbag", amount: 249.99, status: "Completed", date: "3 days ago" },
];

const statusColors: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-700",
  Processing: "bg-blue-100 text-blue-700",
  Shipped: "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
  Completed: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-red-100 text-red-700",
};

const topProducts = [
  { title: "Embroidered Floral Abaya", sales: 84, revenue: "$10,079.16", trend: "+12%" },
  { title: "Gold Layered Necklace Set", sales: 56, revenue: "$5,039.44", trend: "+8%" },
  { title: "Silk Pleated Maxi Dress", sales: 43, revenue: "$6,879.57", trend: "+15%" },
  { title: "Pearl Drop Earrings", sales: 67, revenue: "$4,689.33", trend: "+5%" },
];

export default function VendorDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Welcome back! Here&apos;s what&apos;s happening with your store.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/vendor/reports" className="gap-1.5">
              <TrendingUp className="h-4 w-4" />
              Reports
            </Link>
          </Button>
          <Button size="sm" className="bg-[#1a1a2e] gap-1.5" asChild>
            <Link href="/vendor/products/new">
              <Plus className="h-4 w-4" />
              Add Product
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <span className={`text-xs font-semibold flex items-center gap-0.5 ${stat.positive ? "text-emerald-600" : "text-red-600"}`}>
                  {stat.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts placeholder + Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales chart placeholder */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Sales Analytics</CardTitle>
            <div className="flex gap-1.5">
              {["7D", "30D", "90D", "1Y"].map((period) => (
                <button
                  key={period}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${period === "30D" ? "bg-[#1a1a2e] text-white" : "text-muted-foreground hover:bg-muted"}`}
                >
                  {period}
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            {/* Simplified chart visualization */}
            <div className="h-48 flex items-end gap-1.5 px-2">
              {[35, 55, 40, 70, 60, 80, 45, 90, 65, 85, 50, 95, 70, 100, 75, 88, 60, 78, 55, 92, 68, 85, 72, 98, 80, 88, 65, 75, 90, 85].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm transition-all hover:opacity-80"
                  style={{
                    height: `${h}%`,
                    background: i === 29 ? "#c9a96e" : `hsl(222, 47%, ${15 + (h / 10)}%)`,
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2 px-2">
              <span>May 1</span>
              <span>May 10</span>
              <span>May 20</span>
              <span>May 31</span>
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, i) => (
                <div key={product.title} className="flex items-center gap-3">
                  <span className="text-sm font-bold text-muted-foreground w-5">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{product.title}</p>
                    <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold">{product.revenue}</p>
                    <p className="text-xs text-emerald-600">{product.trend}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Recent Orders</CardTitle>
          <Link href="/vendor/orders" className="text-xs text-[#c9a96e] hover:text-[#b8985d] flex items-center gap-1">
            View all <ExternalLink className="h-3 w-3" />
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  {["Order ID", "Customer", "Product", "Amount", "Status", "Date", ""].map((h) => (
                    <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-[#c9a96e]">{order.id}</td>
                    <td className="px-6 py-4 font-medium">{order.customer}</td>
                    <td className="px-6 py-4 text-muted-foreground truncate max-w-40">{order.product}</td>
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
