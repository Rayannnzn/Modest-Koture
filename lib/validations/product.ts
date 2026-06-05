import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().positive("Price must be positive"),
  salePrice: z.coerce.number().positive().optional().nullable(),
  categoryId: z.string().min(1, "Category is required"),
  brandId: z.string().optional().nullable(),
  sku: z.string().optional(),
  tags: z.array(z.string()).default([]),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED", "PENDING_REVIEW"]).default("DRAFT"),
  isFeatured: z.boolean().default(false),
  // Inventory
  quantity: z.coerce.number().int().min(0).default(0),
  trackStock: z.boolean().default(true),
  allowBackorder: z.boolean().default(false),
  lowStockAt: z.coerce.number().int().min(0).default(5),
  // Shipping
  weight: z.coerce.number().positive().optional().nullable(),
  shippingClass: z.string().optional().nullable(),
});

export const productFilterSchema = z.object({
  category: z.string().optional(),
  brand: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  sort: z.enum(["newest", "price_asc", "price_desc", "popular", "rating"]).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  search: z.string().optional(),
});

export type ProductInput = z.infer<typeof productSchema>;
export type ProductFilterInput = z.infer<typeof productFilterSchema>;
