import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { productFilterSchema } from "@/lib/validations/product";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const params = productFilterSchema.parse(Object.fromEntries(searchParams));

    const where: Record<string, unknown> = { status: "ACTIVE" };

    if (params.category) where.category = { slug: params.category };
    if (params.search) {
      where.OR = [
        { title: { contains: params.search, mode: "insensitive" } },
        { description: { contains: params.search, mode: "insensitive" } },
        { tags: { has: params.search } },
      ];
    }
    if (params.minPrice || params.maxPrice) {
      where.price = {};
      if (params.minPrice) (where.price as Record<string, unknown>).gte = params.minPrice;
      if (params.maxPrice) (where.price as Record<string, unknown>).lte = params.maxPrice;
    }

    const orderBy: Record<string, string> = {};
    switch (params.sort) {
      case "price_asc": orderBy.price = "asc"; break;
      case "price_desc": orderBy.price = "desc"; break;
      case "popular": orderBy.totalSales = "desc"; break;
      case "rating": orderBy.avgRating = "desc"; break;
      default: orderBy.createdAt = "desc";
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip: (params.page - 1) * params.limit,
        take: params.limit,
        include: {
          images: { where: { isPrimary: true }, take: 1 },
          vendor: { select: { storeName: true, slug: true } },
          category: { select: { name: true, slug: true } },
        },
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      products,
      total,
      pages: Math.ceil(total / params.limit),
      page: params.page,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid query parameters" }, { status: 400 });
    }
    console.error("[PRODUCTS_GET]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (session.user.role !== "VENDOR" && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const vendor = await prisma.vendor.findUnique({
      where: { userId: session.user.id },
    });
    if (!vendor || vendor.status !== "APPROVED") {
      return NextResponse.json({ error: "Vendor not approved" }, { status: 403 });
    }

    const body = await req.json();
    const { quantity, trackStock, allowBackorder, lowStockAt, ...productData } = body;

    const product = await prisma.product.create({
      data: {
        ...productData,
        vendorId: vendor.id,
        slug: productData.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, ""),
        inventory: {
          create: { quantity, trackStock, allowBackorder, lowStockAt },
        },
      },
      include: { inventory: true, images: true },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error("[PRODUCTS_POST]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
