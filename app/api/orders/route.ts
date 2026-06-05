import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const getProductsWithRelations = () =>
  prisma.product.findMany({
    include: {
      vendor: true,
      images: {
        where: { isPrimary: true },
        take: 1,
      },
    },
  });

type ProductWithRelations = Awaited<ReturnType<typeof getProductsWithRelations>>[number];
type OrderWhereInput = NonNullable<Parameters<typeof prisma.order.findMany>[0]>["where"];

const orderSchema = z.object({
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().int().positive(),
  })),
  shippingAddress: z.object({
    name: z.string(),
    street: z.string(),
    city: z.string(),
    state: z.string().optional(),
    country: z.string(),
    zip: z.string(),
  }),
  couponCode: z.string().optional(),
  paymentIntentId: z.string().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const where: OrderWhereInput = {};
    if (session.user.role !== "ADMIN") {
      where.userId = session.user.id;
    }
    if (session.user.role === "VENDOR") {
      const vendor = await prisma.vendor.findUnique({ where: { userId: session.user.id } });
      if (vendor) {
        where.vendorId = vendor.id;
      }
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          items: {
            include: {
              product: {
                include: { images: { where: { isPrimary: true }, take: 1 } },
              },
            },
          },
        },
      }),
      prisma.order.count({ where }),
    ]);

    return NextResponse.json({ orders, total, pages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("[ORDERS_GET]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const data = orderSchema.parse(body);

    // Fetch products and calculate totals
    const products: ProductWithRelations[] = await prisma.product.findMany({
      where: { id: { in: data.items.map((i) => i.productId) }, status: "ACTIVE" },
      include: { vendor: true, images: { where: { isPrimary: true }, take: 1 } },
    });

    if (products.length !== data.items.length) {
      return NextResponse.json({ error: "Some products are unavailable" }, { status: 400 });
    }

    // Group by vendor (create one order per vendor)
    const vendorGroups = data.items.reduce<Record<string, { vendorId: string; items: typeof data.items }>>((acc, item) => {
      const product = products.find((p: ProductWithRelations) => p.id === item.productId)!;
      if (!acc[product.vendorId]) acc[product.vendorId] = { vendorId: product.vendorId, items: [] };
      acc[product.vendorId].items.push(item);
      return acc;
    }, {});

    const createdOrders = await Promise.all(
      Object.values(vendorGroups).map(async (group) => {
        const subtotal = group.items.reduce((sum: number, item) => {
          const product = products.find((p: ProductWithRelations) => p.id === item.productId)!;
          const price = Number(product.salePrice ?? product.price);
          return sum + price * item.quantity;
        }, 0);

        return prisma.order.create({
          data: {
            userId: session.user.id,
            vendorId: group.vendorId,
            subtotal,
            total: subtotal,
            couponCode: data.couponCode,
            paymentIntentId: data.paymentIntentId,
            shippingName: data.shippingAddress.name,
            shippingStreet: data.shippingAddress.street,
            shippingCity: data.shippingAddress.city,
            shippingState: data.shippingAddress.state,
            shippingCountry: data.shippingAddress.country,
            shippingZip: data.shippingAddress.zip,
            items: {
              create: group.items.map((item) => {
                const product = products.find((p: ProductWithRelations) => p.id === item.productId)!;
                return {
                  productId: item.productId,
                  quantity: item.quantity,
                  price: product.salePrice ?? product.price,
                  title: product.title,
                  image: product.images[0]?.url,
                };
              }),
            },
          },
          include: { items: true },
        });
      })
    );

    // Clear cart after order
    await prisma.cartItem.deleteMany({ where: { userId: session.user.id } });

    return NextResponse.json({ orders: createdOrders }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: error.issues }, { status: 400 });
    }
    console.error("[ORDERS_POST]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
