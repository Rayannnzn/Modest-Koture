"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft, Tag, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";
import type { Metadata } from "next";

const initialCart = [
  {
    id: "1",
    title: "Embroidered Floral Abaya",
    vendor: "Zara Modest",
    price: 119.99,
    originalPrice: 149.99,
    qty: 1,
    color: "Black",
    size: "M",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&h=250&fit=crop",
    slug: "embroidered-floral-abaya",
  },
  {
    id: "2",
    title: "Gold Layered Necklace Set",
    vendor: "Luxe Jewelry Co",
    price: 89.99,
    originalPrice: 89.99,
    qty: 2,
    color: "Gold",
    size: "One Size",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&h=250&fit=crop",
    slug: "gold-layered-necklace",
  },
  {
    id: "3",
    title: "Natural Argan Oil Serum",
    vendor: "Pure Beauty Lab",
    price: 45.00,
    originalPrice: 45.00,
    qty: 1,
    color: "",
    size: "50ml",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=250&fit=crop",
    slug: "argan-oil-serum",
  },
];

export default function CartPage() {
  const [cart, setCart] = useState(initialCart);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal >= 75 ? 0 : 5.99;
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  return (
    <div className="container mx-auto px-4 lg:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        <span className="text-foreground font-medium">Shopping Cart</span>
      </nav>

      <h1 className="text-2xl font-bold flex items-center gap-2 mb-8">
        <ShoppingBag className="h-6 w-6 text-[#c9a96e]" />
        Shopping Cart
        <span className="text-base font-normal text-muted-foreground ml-1">
          ({cart.reduce((sum, i) => sum + i.qty, 0)} items)
        </span>
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingBag className="h-20 w-20 text-muted-foreground/20 mx-auto mb-6" />
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">Looks like you haven&apos;t added anything yet.</p>
          <Button asChild className="bg-[#1a1a2e] gap-2">
            <Link href="/shop">
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Free shipping progress */}
            {subtotal < 75 && (
              <div className="p-4 bg-[#c9a96e]/10 border border-[#c9a96e]/20 rounded-xl text-sm">
                <div className="flex justify-between mb-2">
                  <span className="text-[#c9a96e] font-medium">
                    Add {formatPrice(75 - subtotal)} more for free shipping!
                  </span>
                  <span className="text-muted-foreground">{Math.round((subtotal / 75) * 100)}%</span>
                </div>
                <div className="h-2 bg-white/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#c9a96e] rounded-full transition-all"
                    style={{ width: `${Math.min((subtotal / 75) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}

            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl border border-border p-4 flex flex-col sm:flex-row gap-4">
                {/* Product image */}
                <div className="w-full sm:w-28 h-36 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                  <Image src={item.image} alt={item.title} width={112} height={140} className="object-cover w-full h-full" />
                </div>
                {/* Details */}
                <div className="flex-1">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">{item.vendor}</p>
                      <Link href={`/shop/${item.slug}`}>
                        <h3 className="font-semibold hover:text-[#c9a96e] transition-colors">{item.title}</h3>
                      </Link>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.color && <span>{item.color} · </span>}
                        <span>{item.size}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Qty control */}
                    <div className="flex items-center gap-1 border rounded-xl p-1">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center font-semibold text-sm">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    {/* Price */}
                    <div className="text-right">
                      <p className="font-bold">{formatPrice(item.price * item.qty)}</p>
                      {item.originalPrice > item.price && (
                        <p className="text-xs text-muted-foreground line-through">{formatPrice(item.originalPrice * item.qty)}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-border p-5">
              <h2 className="font-bold text-lg mb-4">Order Summary</h2>

              {/* Coupon */}
              <div className="flex gap-2 mb-5">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (coupon.toUpperCase() === "SAVE10") {
                      setCouponApplied(true);
                    }
                  }}
                  disabled={couponApplied}
                >
                  {couponApplied ? "Applied!" : "Apply"}
                </Button>
              </div>

              {/* Price breakdown */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (10% off)</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={shipping === 0 ? "text-green-600 font-medium" : "font-medium"}>
                    {shipping === 0 ? "FREE" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground text-xs">
                  <span>Tax (included)</span>
                  <span>VAT included</span>
                </div>
                <div className="pt-3 border-t flex justify-between">
                  <span className="font-bold text-base">Total</span>
                  <span className="font-bold text-lg">{formatPrice(total)}</span>
                </div>
              </div>

              <Button asChild className="w-full mt-5 bg-[#1a1a2e] hover:bg-[#1a1a2e]/90 h-12 text-base font-semibold">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>

              {/* Trust signals */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[
                  { Icon: Shield, label: "Secure" },
                  { Icon: Truck, label: "Fast Ship" },
                  { Icon: RotateCcw, label: "30-day Returns" },
                ].map(({ Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1 p-2 bg-muted/40 rounded-xl">
                    <Icon className="h-4 w-4 text-[#c9a96e]" />
                    <span className="text-[10px] text-muted-foreground text-center">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
