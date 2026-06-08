"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, Plus, X, Save, Eye, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const categories = ["Women", "Men", "Children", "Beauty", "Jewelry", "Luxury", "Electronics", "Pets", "Plus Size"];

export default function NewProductPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tags, setTags] = useState<string[]>(["abaya", "modest"]);
  const [tagInput, setTagInput] = useState("");

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags((prev) => [...prev, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsSubmitting(false);
    toast.success("Product saved as draft!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="icon" className="rounded-xl">
            <Link href="/vendor/products">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Add New Product</h1>
            <p className="text-muted-foreground text-sm mt-0.5">Fill in the details below to list your product</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button
            form="product-form"
            type="submit"
            size="sm"
            className="bg-[#1a1a2e] gap-1.5"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Product
              </>
            )}
          </Button>
        </div>
      </div>

      <form id="product-form" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-5">
            {/* Basic Info */}
            <div className="bg-white rounded-2xl border border-border p-5 space-y-4">
              <h2 className="font-semibold">Product Information</h2>
              <div className="space-y-2">
                <Label htmlFor="title">Product Title *</Label>
                <Input id="title" placeholder="e.g. Embroidered Floral Abaya — Black" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <textarea
                  id="description"
                  rows={5}
                  placeholder="Describe your product in detail — include fabric, fit, care instructions..."
                  className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-[#c9a96e]/50 resize-none"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select required>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand / Label</Label>
                  <Input id="brand" placeholder="e.g. Zara Modest" />
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 p-3 border border-input rounded-lg min-h-[44px]">
                  {tags.map((tag) => (
                    <span key={tag} className="flex items-center gap-1 px-2.5 py-0.5 bg-[#1a1a2e]/10 rounded-full text-xs font-medium">
                      #{tag}
                      <button type="button" onClick={() => removeTag(tag)}>
                        <X className="h-3 w-3 text-muted-foreground hover:text-red-500" />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={addTag}
                    placeholder="Add tag, press Enter"
                    className="flex-1 min-w-[120px] text-xs focus:outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Media */}
            <div className="bg-white rounded-2xl border border-border p-5 space-y-4">
              <h2 className="font-semibold">Product Images</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[0, 1, 2, 3].map((i) => (
                  <label
                    key={i}
                    className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-[#c9a96e]/50 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[#c9a96e]/5 transition-all"
                  >
                    <input type="file" className="hidden" accept="image/*" />
                    <Upload className="h-6 w-6 text-muted-foreground/50" />
                    <span className="text-xs text-muted-foreground text-center px-2">
                      {i === 0 ? "Main Photo" : `Photo ${i + 1}`}
                    </span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Upload high-quality images (min. 800×800px, max. 5MB each). First image is the main product photo.
              </p>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-2xl border border-border p-5 space-y-4">
              <h2 className="font-semibold">Pricing</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Regular Price ($) *</Label>
                  <Input id="price" type="number" step="0.01" min="0" placeholder="0.00" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sale-price">Sale Price ($)</Label>
                  <Input id="sale-price" type="number" step="0.01" min="0" placeholder="0.00" />
                </div>
              </div>
            </div>

            {/* Variants */}
            <div className="bg-white rounded-2xl border border-border p-5 space-y-4">
              <h2 className="font-semibold">Variants & Stock</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" placeholder="e.g. ABY-BLK-M-001" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity *</Label>
                  <Input id="stock" type="number" min="0" placeholder="e.g. 25" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sizes">Available Sizes (comma-separated)</Label>
                <Input id="sizes" placeholder="XS, S, M, L, XL, XXL" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="colors">Available Colors (comma-separated)</Label>
                <Input id="colors" placeholder="Black, Navy, Ivory, Blush Pink" />
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-5">
            {/* Status */}
            <div className="bg-white rounded-2xl border border-border p-5 space-y-3">
              <h2 className="font-semibold">Publish Status</h2>
              <Select defaultValue="draft">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active (Published)</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Products in <strong>Draft</strong> are not visible to customers.
              </p>
            </div>

            {/* Shipping */}
            <div className="bg-white rounded-2xl border border-border p-5 space-y-4">
              <h2 className="font-semibold">Shipping</h2>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (grams)</Label>
                <Input id="weight" type="number" min="0" placeholder="e.g. 500" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <Label htmlFor="length" className="text-xs">Length (cm)</Label>
                  <Input id="length" type="number" placeholder="cm" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="width" className="text-xs">Width (cm)</Label>
                  <Input id="width" type="number" placeholder="cm" />
                </div>
              </div>
            </div>

            {/* SEO */}
            <div className="bg-white rounded-2xl border border-border p-5 space-y-3">
              <h2 className="font-semibold">SEO (Optional)</h2>
              <div className="space-y-2">
                <Label htmlFor="meta-title" className="text-xs">Meta Title</Label>
                <Input id="meta-title" placeholder="Leave blank to auto-generate" className="text-xs" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta-desc" className="text-xs">Meta Description</Label>
                <textarea
                  id="meta-desc"
                  rows={2}
                  placeholder="Leave blank to auto-generate"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-[#c9a96e]/50 resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
