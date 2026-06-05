import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { productId } = await req.json();
    if (!productId) return NextResponse.json({ error: "Product ID required" }, { status: 400 });

    const existing = await prisma.wishlist.findUnique({
      where: { userId_productId: { userId: session.user.id, productId } },
    });

    if (existing) {
      await prisma.wishlist.delete({ where: { id: existing.id } });
      return NextResponse.json({ wishlisted: false });
    }

    await prisma.wishlist.create({
      data: { userId: session.user.id, productId },
    });
    return NextResponse.json({ wishlisted: true });
  } catch (error) {
    console.error("[WISHLIST_POST]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ items: [] });

    const wishlist = await prisma.wishlist.findMany({
      where: { userId: session.user.id },
      include: {
        product: {
          include: {
            images: { where: { isPrimary: true }, take: 1 },
            vendor: { select: { storeName: true, slug: true } },
          },
        },
      },
    });

    return NextResponse.json({ items: wishlist });
  } catch (error) {
    console.error("[WISHLIST_GET]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
