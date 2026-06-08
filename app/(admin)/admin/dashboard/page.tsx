import type { Metadata } from "next";
import {
  Users,
  Store,
  Package,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  Clock,
  CircleCheck,
  CircleX,
  CircleAlert,
  ExternalLink,
  Download,
  Banknote,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = { title: "Admin Dashboard" };

const stats = [
  { label: "Total Revenue", value: "$284,520", change: "+18.2%", icon: DollarSign, color: "text-emerald-600 bg-emerald-100" },
  { label: "Total Users", value: "12,480", change: "+234 this month", icon: Users, color: "text-blue-600 bg-blue-100" },
  { label: "Active Vendors", value: "524", change: "+12 pending", icon: Store, color: "text-purple-600 bg-purple-100" },
  { label: "Total Orders", value: "8,942", change: "+185 today", icon: ShoppingBag, color: "text-amber-600 bg-amber-100" },
];

const pendingVendors = [
  { id: "v1", name: "Aisha Boutique", owner: "Aisha Rahman", category: "Women's Fashion", applied: "2h ago" },
  { id: "v2", name: "Gem Palace", owner: "Omar Jewels", category: "Jewelry", applied: "5h ago" },
  { id: "v3", name: "Eco Modest", owner: "Sara Green", category: "Sustainable Fashion", applied: "1 day ago" },
];

const recentActivity = [
  { type: "vendor_approved", text: "Vendor 'Luxe Modest' was approved", time: "10 min ago", icon: CircleCheck, color: "text-green-600" },
  { type: "order_refund", text: "Refund requested on order ORD-7821", time: "25 min ago", icon: CircleAlert, color: "text-amber-600" },
  { type: "product_flagged", text: "Product flagged for review: 'Silk Dress XL'", time: "1h ago", icon: CircleX, color: "text-red-600" },
  { type: "withdrawal", text: "Withdrawal request $450 from Zara Modest", time: "2h ago", icon: Banknote, color: "text-blue-600" },
  { type: "vendor_approved", text: "Vendor 'Pearl & Gold' was approved", time: "3h ago", icon: CircleCheck, color: "text-green-600" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Platform overview and management</p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
                  <ArrowUpRight className="h-3 w-3" />
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Vendor Approvals */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-500" />
              Pending Vendor Approvals
              <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full font-semibold">
                {pendingVendors.length}
              </span>
            </CardTitle>
            <Link href="/admin/vendors" className="text-xs text-indigo-500 hover:text-indigo-600 flex items-center gap-1">
              View all <ExternalLink className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingVendors.map((vendor) => (
              <div key={vendor.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                <div>
                  <p className="font-semibold text-sm">{vendor.name}</p>
                  <p className="text-xs text-muted-foreground">{vendor.owner} · {vendor.category}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{vendor.applied}</p>
                </div>
                <div className="flex gap-1.5">
                  <button className="px-2.5 py-1.5 bg-green-100 text-green-700 rounded-lg text-xs font-semibold hover:bg-green-200 transition-colors">
                    Approve
                  </button>
                  <button className="px-2.5 py-1.5 bg-red-100 text-red-700 rounded-lg text-xs font-semibold hover:bg-red-200 transition-colors">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`mt-0.5 flex-shrink-0 ${activity.color}`}>
                  <activity.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">{activity.text}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Manage Users", href: "/admin/users", icon: Users, count: "12,480" },
          { label: "Review Products", href: "/admin/products", icon: Package, count: "4,820" },
          { label: "Pending Orders", href: "/admin/orders", icon: ShoppingBag, count: "185" },
          { label: "Withdrawals", href: "/admin/withdrawals", icon: Banknote, count: "$2,840" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex flex-col p-4 bg-white rounded-xl border border-border hover:border-indigo-200 hover:shadow-md transition-all"
          >
            <item.icon className="h-6 w-6 text-indigo-500 mb-3 group-hover:scale-110 transition-transform" />
            <p className="font-semibold text-sm">{item.label}</p>
            <p className="text-2xl font-bold mt-1">{item.count}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
