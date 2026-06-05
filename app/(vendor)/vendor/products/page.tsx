import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Package,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = { title: "Manage Products" };

const mockProducts = [
  { id: "1", title: "Embroidered Floral Abaya", category: "Women", price: 149.99, salePrice: 119.99, status: "ACTIVE", stock: 15, sales: 84, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=80&h=80&fit=crop" },
  { id: "2", title: "Gold Layered Necklace Set", category: "Jewelry", price: 89.99, salePrice: null, status: "ACTIVE", stock: 28, sales: 56, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=80&h=80&fit=crop" },
  { id: "3", title: "Silk Pleated Maxi Dress", category: "Women", price: 199.99, salePrice: 159.99, status: "ACTIVE", stock: 8, sales: 43, image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=80&h=80&fit=crop" },
  { id: "4", title: "Natural Argan Oil Serum", category: "Beauty", price: 45.00, salePrice: null, status: "DRAFT", stock: 50, sales: 0, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=80&h=80&fit=crop" },
  { id: "5", title: "Structured Leather Handbag", category: "Luxury", price: 299.99, salePrice: 249.99, status: "ACTIVE", stock: 5, sales: 21, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=80&h=80&fit=crop" },
  { id: "6", title: "Cotton Linen Wide Leg Pants", category: "Women", price: 79.99, salePrice: 59.99, status: "ARCHIVED", stock: 0, sales: 178, image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=80&h=80&fit=crop" },
];

const statusColors: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-700",
  DRAFT: "bg-gray-100 text-gray-600",
  ARCHIVED: "bg-orange-100 text-orange-600",
  PENDING_REVIEW: "bg-blue-100 text-blue-700",
};

export default function VendorProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{mockProducts.length} products in your store</p>
        </div>
        <Button asChild size="sm" className="bg-[#1a1a2e] gap-1.5">
          <Link href="/vendor/products/new">
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Status tabs */}
      <div className="flex gap-1 bg-muted rounded-xl p-1 w-fit">
        {["All", "Active", "Draft", "Archived"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${tab === "All" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search products..." className="pl-10" />
        </div>
        <Select>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="women">Women</SelectItem>
            <SelectItem value="jewelry">Jewelry</SelectItem>
            <SelectItem value="beauty">Beauty</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
        <Button variant="outline" size="sm" className="gap-1.5">
          <ArrowUpDown className="h-4 w-4" />
          Sort
        </Button>
      </div>

      {/* Products table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left px-6 py-3">
                    <input type="checkbox" className="rounded" />
                  </th>
                  {["Product", "Category", "Price", "Stock", "Sales", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockProducts.map((product) => (
                  <tr key={product.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <Image src={product.image} alt={product.title} width={48} height={48} className="object-cover w-full h-full" />
                        </div>
                        <div>
                          <p className="font-medium truncate max-w-48">{product.title}</p>
                          <p className="text-xs text-muted-foreground">ID: {product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground text-xs">{product.category}</td>
                    <td className="px-6 py-4">
                      <div>
                        <span className="font-semibold">{formatPrice(product.salePrice ?? product.price)}</span>
                        {product.salePrice && (
                          <span className="text-xs text-muted-foreground line-through ml-1.5">{formatPrice(product.price)}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={product.stock <= 5 ? "text-orange-600 font-semibold" : "text-foreground"}>
                        {product.stock} left
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{product.sales}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[product.status]}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 hover:bg-muted rounded-lg transition-colors" title="View">
                          <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                        <Link href={`/vendor/products/${product.id}/edit`} className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                          <Edit className="h-3.5 w-3.5 text-muted-foreground" />
                        </Link>
                        <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                          <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-red-500" />
                        </button>
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
