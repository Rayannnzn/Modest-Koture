import type { Metadata } from "next";
import { Store, CheckCircle2, XCircle, Clock, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = { title: "Admin — Vendors" };

const vendors = [
  { id: "v1", name: "Zara Modest", owner: "Amina Hassan", category: "Women's Fashion", products: 84, revenue: "$12,840", status: "Active", joined: "Jan 2026" },
  { id: "v2", name: "Luxe Jewelry Co", owner: "Omar Al-Yusuf", category: "Jewelry", products: 56, revenue: "$8,420", status: "Active", joined: "Feb 2026" },
  { id: "v3", name: "Aisha Boutique", owner: "Aisha Rahman", category: "Women's Fashion", products: 0, revenue: "$0", status: "Pending", joined: "Jun 2026" },
  { id: "v4", name: "Gem Palace", owner: "Omar Jewels", category: "Jewelry", products: 0, revenue: "$0", status: "Pending", joined: "Jun 2026" },
  { id: "v5", name: "Eco Modest", owner: "Sara Green", category: "Sustainable Fashion", products: 0, revenue: "$0", status: "Pending", joined: "Jun 2026" },
  { id: "v6", name: "Pure Beauty Lab", owner: "Nadia Ali", category: "Beauty", products: 32, revenue: "$4,280", status: "Active", joined: "Mar 2026" },
  { id: "v7", name: "Vintage Veil", owner: "Rania Karimi", category: "Women's Fashion", products: 18, revenue: "$2,190", status: "Suspended", joined: "Apr 2026" },
];

const statusConfig: Record<string, { color: string; icon: typeof CheckCircle2 }> = {
  Active: { color: "bg-green-100 text-green-700", icon: CheckCircle2 },
  Pending: { color: "bg-amber-100 text-amber-700", icon: Clock },
  Suspended: { color: "bg-red-100 text-red-700", icon: XCircle },
};

export default function AdminVendorsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Store className="h-6 w-6 text-indigo-500" />
          Vendors
        </h1>
        <p className="text-muted-foreground text-sm mt-0.5">{vendors.length} registered vendors</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search vendors..." className="pl-10" />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  {["Store", "Owner", "Category", "Products", "Revenue", "Status", "Joined", "Actions"].map((h) => (
                    <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {vendors.map((vendor) => {
                  const s = statusConfig[vendor.status];
                  const SIcon = s.icon;
                  return (
                    <tr key={vendor.id} className="border-b last:border-0 hover:bg-muted/30">
                      <td className="px-6 py-4 font-semibold">{vendor.name}</td>
                      <td className="px-6 py-4 text-muted-foreground">{vendor.owner}</td>
                      <td className="px-6 py-4 text-muted-foreground text-xs">{vendor.category}</td>
                      <td className="px-6 py-4">{vendor.products}</td>
                      <td className="px-6 py-4 font-semibold">{vendor.revenue}</td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full text-xs font-semibold ${s.color}`}>
                          <SIcon className="h-3 w-3" />
                          {vendor.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground text-xs">{vendor.joined}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          {vendor.status === "Pending" && (
                            <>
                              <button className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-semibold hover:bg-green-200">Approve</button>
                              <button className="px-2 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-semibold hover:bg-red-200">Reject</button>
                            </>
                          )}
                          {vendor.status === "Active" && (
                            <button className="px-2 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-semibold hover:bg-red-200">Suspend</button>
                          )}
                          {vendor.status === "Suspended" && (
                            <button className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-semibold hover:bg-green-200">Restore</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
