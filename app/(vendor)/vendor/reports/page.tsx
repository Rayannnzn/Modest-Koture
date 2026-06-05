import type { Metadata } from "next";
import { BarChart2, TrendingUp, DollarSign, ShoppingBag, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = { title: "Vendor Reports" };

const monthlyData = [
  { month: "Jan", revenue: 8200, orders: 68 },
  { month: "Feb", revenue: 9400, orders: 78 },
  { month: "Mar", revenue: 10800, orders: 89 },
  { month: "Apr", revenue: 9200, orders: 74 },
  { month: "May", revenue: 11900, orders: 98 },
  { month: "Jun", revenue: 12840, orders: 105 },
];

const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue));

export default function VendorReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BarChart2 className="h-6 w-6 text-[#c9a96e]" />
          Reports & Analytics
        </h1>
        <p className="text-muted-foreground text-sm mt-0.5">Track your store&apos;s performance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: formatPrice(62340), change: "+18%", icon: DollarSign, color: "text-emerald-600 bg-emerald-100" },
          { label: "Total Orders", value: "512", change: "+12%", icon: ShoppingBag, color: "text-blue-600 bg-blue-100" },
          { label: "Avg Order Value", value: formatPrice(121.75), change: "+5%", icon: TrendingUp, color: "text-purple-600 bg-purple-100" },
          { label: "Returning Customers", value: "38%", change: "+3%", icon: Users, color: "text-amber-600 bg-amber-100" },
        ].map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${kpi.color}`}>
                  <kpi.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-semibold text-emerald-600">{kpi.change}</span>
              </div>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{kpi.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Monthly Revenue (2026)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-4 h-48">
            {monthlyData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs font-semibold text-muted-foreground">{formatPrice(d.revenue)}</span>
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-[#1a1a2e] to-[#0f3460] hover:from-[#c9a96e] hover:to-[#b8985d] transition-colors cursor-default"
                  style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                />
                <span className="text-xs text-muted-foreground">{d.month}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Orders table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Monthly Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                {["Month", "Revenue", "Orders", "Avg. Order", "Growth"].map((h) => (
                  <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...monthlyData].reverse().map((d, i) => (
                <tr key={d.month} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="px-6 py-4 font-medium">{d.month} 2026</td>
                  <td className="px-6 py-4 font-semibold">{formatPrice(d.revenue)}</td>
                  <td className="px-6 py-4 text-muted-foreground">{d.orders}</td>
                  <td className="px-6 py-4 text-muted-foreground">{formatPrice(d.revenue / d.orders)}</td>
                  <td className="px-6 py-4 text-emerald-600 font-semibold">{i < monthlyData.length - 1 ? "+12%" : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
