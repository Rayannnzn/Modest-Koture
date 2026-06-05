import type { Metadata } from "next";
import { Package, Search, Eye, CheckCircle2, XCircle } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = { title: "Admin — Products" };

const products = [
  { id: "1", title: "Embroidered Floral Abaya", vendor: "Zara Modest", category: "Women", price: 119.99, status: "ACTIVE", flagged: false, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=60&h=60&fit=crop" },
  { id: "2", title: "Gold Layered Necklace Set", vendor: "Luxe Jewelry Co", category: "Jewelry", price: 89.99, status: "ACTIVE", flagged: false, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=60&h=60&fit=crop" },
  { id: "3", title: "Silk Maxi Dress", vendor: "Elegance Studio", category: "Women", price: 159.99, status: "PENDING_REVIEW", flagged: false, image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=60&h=60&fit=crop" },
  { id: "4", title: "Unclear Product Listing XL", vendor: "Unknown Vendor", category: "Women", price: 29.99, status: "FLAGGED", flagged: true, image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=60&h=60&fit=crop" },
  { id: "5", title: "Natural Argan Oil Serum", vendor: "Pure Beauty Lab", category: "Beauty", price: 45.00, status: "ACTIVE", flagged: false, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=60&h=60&fit=crop" },
];

const statusColors: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-700",
  PENDING_REVIEW: "bg-amber-100 text-amber-700",
  FLAGGED: "bg-red-100 text-red-700",
  ARCHIVED: "bg-gray-100 text-gray-600",
};

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Package className="h-6 w-6 text-indigo-500" />
          Products
        </h1>
        <p className="text-muted-foreground text-sm mt-0.5">Review and moderate all product listings</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search products..." className="pl-10" />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  {["Product", "Vendor", "Category", "Price", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className={`border-b last:border-0 hover:bg-muted/30 ${product.flagged ? "bg-red-50/50" : ""}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <Image src={product.image} alt={product.title} width={40} height={40} className="object-cover w-full h-full" />
                        </div>
                        <span className="font-medium text-sm">{product.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground text-xs">{product.vendor}</td>
                    <td className="px-6 py-4 text-muted-foreground text-xs">{product.category}</td>
                    <td className="px-6 py-4 font-semibold">{formatPrice(product.price)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[product.status]}`}>
                        {product.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 hover:bg-muted rounded-lg" title="View"><Eye className="h-3.5 w-3.5 text-muted-foreground" /></button>
                        <button className="p-1.5 hover:bg-green-50 rounded-lg" title="Approve"><CheckCircle2 className="h-3.5 w-3.5 text-green-600" /></button>
                        <button className="p-1.5 hover:bg-red-50 rounded-lg" title="Reject"><XCircle className="h-3.5 w-3.5 text-red-500" /></button>
                      </div>
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
