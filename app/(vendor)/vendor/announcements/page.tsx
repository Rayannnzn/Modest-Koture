import type { Metadata } from "next";
import { Megaphone, Bell, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = { title: "Announcements" };

const announcements = [
  {
    id: "a1",
    type: "platform",
    title: "Commission rate update for June 2026",
    body: "We are pleased to announce that Growth plan vendors will see their commission reduced from 8% to 7% starting June 15, 2026.",
    date: "Jun 3, 2026",
    urgent: false,
  },
  {
    id: "a2",
    type: "policy",
    title: "Updated return policy guidelines",
    body: "All vendors must now accept returns within 30 days for apparel items. Please update your product listings to reflect this change.",
    date: "May 28, 2026",
    urgent: true,
  },
  {
    id: "a3",
    type: "feature",
    title: "New: Bulk product upload via CSV",
    body: "You can now upload up to 500 products at once using our CSV import tool. Find the option in your Products section.",
    date: "May 20, 2026",
    urgent: false,
  },
  {
    id: "a4",
    type: "platform",
    title: "Summer Sale campaign — vendor participation",
    body: "Join our annual Summer Sale event from July 1–15. Opt in your products to receive premium placement and promotional banners.",
    date: "May 15, 2026",
    urgent: false,
  },
];

const typeConfig: Record<string, { label: string; color: string; icon: typeof Bell }> = {
  platform: { label: "Platform", color: "bg-blue-100 text-blue-700", icon: Bell },
  policy: { label: "Policy", color: "bg-red-100 text-red-700", icon: Info },
  feature: { label: "New Feature", color: "bg-green-100 text-green-700", icon: Megaphone },
};

export default function VendorAnnouncementsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Megaphone className="h-6 w-6 text-[#c9a96e]" />
          Announcements
        </h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Platform updates and important notices from the Modest Kouture team
        </p>
      </div>

      <div className="space-y-4">
        {announcements.map((ann) => {
          const cfg = typeConfig[ann.type];
          const Icon = cfg.icon;
          return (
            <Card key={ann.id} className={ann.urgent ? "border-red-200" : ""}>
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className={`mt-0.5 p-2 rounded-lg ${cfg.color.replace("text-", "bg-").replace("700", "100").replace("100 ", "100 ")}`}>
                    <Icon className={`h-4 w-4 ${cfg.color.split(" ")[1]}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${cfg.color}`}>
                        {cfg.label}
                      </span>
                      {ann.urgent && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                          Action Required
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground ml-auto">{ann.date}</span>
                    </div>
                    <h3 className="font-semibold mb-1">{ann.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{ann.body}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
