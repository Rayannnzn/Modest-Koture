import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";

const addToCartSchema = z.object({
  productId: z.string(),
  quantity: z.coerce.number().int().positive().default(1),
});

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    const sessionId = req.cookies.get("cart-session")?.value;

    const where: Record<string, unknown> = {};
    if (session?.user?.id) where.userId = session.user.id;
    else if (sessionId) where.sessionId = sessionId;
    else return NextResponse.json({ items: [] });

    const items = await prisma.cartItem.findMany({
      where,
      include: {
        product: {
          include: {
            images: { where: { isPrimary: true }, take: 1 },
            vendor: { select: { storeName: true } },
          },
        },
      },
    });

    return NextResponse.json({ items });
  } catch (error) {
    console.error("[CART_GET]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const body = await req.json();
    const { productId, quantity } = addToCartSchema.parse(body);

    const product = await prisma.product.findUnique({
      where: { id: productId, status: "ACTIVE" },
    });
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

    const userId = session?.user?.id;
    const sessionId = req.cookies.get("cart-session")?.value;

    const cartWhere: Record<string, unknown> = { productId };
    if (userId) cartWhere.userId = userId;
    else if (sessionId) cartWhere.sessionId = sessionId;

    const existing = await prisma.cartItem.findFirst({ where: cartWhere });

    if (existing) {
      const updated = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
      });
      return NextResponse.json({ item: updated });
    }

    const createData: Record<string, unknown> = { productId, quantity };
    if (userId) createData.userId = userId;
    else if (sessionId) createData.sessionId = sessionId;

    const item = await prisma.cartItem.create({ data: createData as Parameters<typeof prisma.cartItem.create>[0]["data"] });
    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    console.error("[CART_POST]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    const { searchParams } = new URL(req.url);
    const itemId = searchParams.get("itemId");

    if (!itemId) return NextResponse.json({ error: "Item ID required" }, { status: 400 });

    const item = await prisma.cartItem.findUnique({ where: { id: itemId } });
    if (!item) return NextResponse.json({ error: "Item not found" }, { status: 404 });

    // Auth check
    if (session?.user?.id && item.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.cartItem.delete({ where: { id: itemId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[CART_DELETE]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
