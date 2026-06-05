import type { Metadata } from "next";
import { Wallet, Plus, CheckCircle2, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = { title: "Withdrawals" };

const withdrawals = [
  { id: "WD-001", amount: 1200, status: "Completed", date: "Jun 1, 2026", method: "Bank Transfer", ref: "HSBC ****4821" },
  { id: "WD-002", amount: 850, status: "Processing", date: "Jun 5, 2026", method: "Bank Transfer", ref: "HSBC ****4821" },
  { id: "WD-003", amount: 2000, status: "Completed", date: "May 15, 2026", method: "Bank Transfer", ref: "HSBC ****4821" },
  { id: "WD-004", amount: 500, status: "Cancelled", date: "May 5, 2026", method: "PayPal", ref: "vendor@email.com" },
];

const statusConfig: Record<string, { icon: typeof CheckCircle2; color: string; bg: string }> = {
  Completed: { icon: CheckCircle2, color: "text-green-700", bg: "bg-green-100" },
  Processing: { icon: Clock, color: "text-blue-700", bg: "bg-blue-100" },
  Cancelled: { icon: XCircle, color: "text-red-700", bg: "bg-red-100" },
};

export default function VendorWithdrawalsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Wallet className="h-6 w-6 text-[#c9a96e]" />
            Withdrawals
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">Manage your earnings and payouts</p>
        </div>
        <Button size="sm" className="bg-[#1a1a2e] gap-1.5">
          <Plus className="h-4 w-4" />
          Request Withdrawal
        </Button>
      </div>

      {/* Balance cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-emerald-400">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground mb-1">Available Balance</p>
            <p className="text-3xl font-bold text-emerald-600">{formatPrice(3840.50)}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-400">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground mb-1">Pending</p>
            <p className="text-3xl font-bold text-blue-600">{formatPrice(850)}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-gray-300">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground mb-1">Total Withdrawn</p>
            <p className="text-3xl font-bold">{formatPrice(8550)}</p>
          </CardContent>
        </Card>
      </div>

      {/* History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Withdrawal History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  {["ID", "Amount", "Method", "Reference", "Date", "Status"].map((h) => (
                    <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {withdrawals.map((w) => {
                  const s = statusConfig[w.status];
                  const StatusIcon = s.icon;
                  return (
                    <tr key={w.id} className="border-b last:border-0 hover:bg-muted/30">
                      <td className="px-6 py-4 font-mono text-xs text-[#c9a96e]">{w.id}</td>
                      <td className="px-6 py-4 font-bold">{formatPrice(w.amount)}</td>
                      <td className="px-6 py-4 text-muted-foreground">{w.method}</td>
                      <td className="px-6 py-4 text-muted-foreground text-xs">{w.ref}</td>
                      <td className="px-6 py-4 text-muted-foreground text-xs">{w.date}</td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.color}`}>
                          <StatusIcon className="h-3 w-3" />
                          {w.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
