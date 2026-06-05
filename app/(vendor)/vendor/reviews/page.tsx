import type { Metadata } from "next";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = { title: "Vendor Reviews" };

const reviews = [
  { id: "r1", product: "Embroidered Floral Abaya", customer: "Amina K.", rating: 5, title: "Absolutely beautiful!", comment: "The quality exceeded my expectations. Perfect for special occasions.", date: "2 weeks ago", verified: true },
  { id: "r2", product: "Gold Layered Necklace", customer: "Sarah M.", rating: 4, title: "Gorgeous piece", comment: "Beautiful design. Runs slightly large so I'd recommend sizing down.", date: "1 month ago", verified: true },
  { id: "r3", product: "Silk Maxi Dress", customer: "Fatima H.", rating: 5, title: "Worth every penny", comment: "The fabric drapes beautifully and the color is exactly as shown.", date: "1 month ago", verified: false },
  { id: "r4", product: "Pearl Drop Earrings", customer: "Layla O.", rating: 3, title: "Nice but small", comment: "Pretty earrings but smaller than I expected from the photos.", date: "2 months ago", verified: true },
];

export default function VendorReviewsPage() {
  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Star className="h-6 w-6 text-[#c9a96e] fill-[#c9a96e]" />
          Customer Reviews
        </h1>
        <p className="text-muted-foreground text-sm mt-0.5">{reviews.length} reviews across all products</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="text-5xl font-bold text-[#c9a96e]">{avgRating}</div>
            <div>
              <div className="flex gap-0.5 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Number(avgRating) ? "fill-[#c9a96e] text-[#c9a96e]" : "text-gray-300"}`} />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">Average rating</p>
            </div>
          </CardContent>
        </Card>
        {[{ label: "5 stars", count: 2 }, { label: "4 stars", count: 1 }, { label: "3 stars", count: 1 }].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="text-2xl font-bold">{s.count}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-2xl border border-border p-5">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">{review.product}</p>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? "fill-[#c9a96e] text-[#c9a96e]" : "text-gray-300"}`} />
                    ))}
                  </div>
                  {review.verified && <span className="text-[10px] text-green-600 font-medium">✓ Verified</span>}
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{review.date}</span>
            </div>
            <h4 className="font-semibold text-sm mb-1">{review.title}</h4>
            <p className="text-sm text-muted-foreground mb-3">{review.comment}</p>
            <p className="text-xs font-medium text-foreground">— {review.customer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
