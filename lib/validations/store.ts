import { z } from "zod";

export const vendorSchema = z.object({
  storeName: z.string().min(3, "Store name must be at least 3 characters"),
  description: z.string().max(500).optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
  facebook: z.string().url().optional().or(z.literal("")),
  instagram: z.string().url().optional().or(z.literal("")),
  twitter: z.string().url().optional().or(z.literal("")),
  tiktok: z.string().url().optional().or(z.literal("")),
  seoTitle: z.string().max(60).optional(),
  seoDescription: z.string().max(160).optional(),
});

export const withdrawalSchema = z.object({
  amount: z.coerce.number().positive("Amount must be positive"),
  method: z.string().min(1, "Payment method is required"),
  details: z.record(z.string(), z.string()).optional(),
});

export type VendorInput = z.infer<typeof vendorSchema>;
export type WithdrawalInput = z.infer<typeof withdrawalSchema>;
