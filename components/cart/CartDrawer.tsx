"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { Dialog, SheetContent } from "@/components/ui/dialog";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } = useCartStore();
  const total = subtotal();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="flex flex-col p-0 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-[#c9a96e]" />
            <h2 className="font-semibold text-lg">Shopping Bag</h2>
            <span className="bg-[#c9a96e] text-white text-xs font-bold rounded-full px-2 py-0.5">
              {items.length}
            </span>
          </div>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-12">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <p className="font-semibold text-lg">Your bag is empty</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Add items to start shopping
                </p>
              </div>
              <Button onClick={closeCart} asChild variant="gold">
                <Link href="/shop">Explore Products</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const price = item.product.salePrice ?? item.product.price;
                return (
                  <div
                    key={item.product.id}
                    className="flex gap-3 p-3 rounded-xl border bg-card group"
                  >
                    {/* Product image */}
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      {item.product.image ? (
                        <Image
                          src={item.product.image}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Product info */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/shop/${item.product.slug}`}
                        onClick={closeCart}
                        className="font-medium text-sm leading-snug hover:text-[#c9a96e] transition-colors line-clamp-2"
                      >
                        {item.product.title}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        by {item.product.vendorName}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity */}
                        <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-background transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-background transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        {/* Price */}
                        <div className="text-right">
                          <p className="font-semibold text-sm">
                            {formatPrice(price * item.quantity)}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-muted-foreground">
                              {formatPrice(price)} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="self-start opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t px-6 py-4 space-y-4 bg-muted/30">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold text-lg">{formatPrice(total)}</span>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Shipping and taxes calculated at checkout
            </p>
            <div className="grid gap-2">
              <Button asChild variant="gold" size="lg" onClick={closeCart}>
                <Link href="/checkout" className="gap-2">
                  Checkout <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" onClick={closeCart}>
                <Link href="/cart">View Full Cart</Link>
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Dialog>
  );
}
