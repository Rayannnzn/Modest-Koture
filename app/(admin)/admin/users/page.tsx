import type { Metadata } from "next";
import { Users, Search, Filter, MoreHorizontal, UserCheck, UserX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = { title: "Admin — Users" };

const users = [
  { id: "u1", name: "Amina Al-Hassan", email: "amina@example.com", role: "CUSTOMER", status: "Active", orders: 12, joined: "Jan 2026" },
  { id: "u2", name: "Omar Jewels", email: "omar@example.com", role: "VENDOR", status: "Active", orders: 0, joined: "Feb 2026" },
  { id: "u3", name: "Sarah Mitchell", email: "sarah@example.com", role: "CUSTOMER", status: "Active", orders: 3, joined: "Mar 2026" },
  { id: "u4", name: "Fatima Hassan", email: "fatima@example.com", role: "CUSTOMER", status: "Suspended", orders: 1, joined: "Apr 2026" },
  { id: "u5", name: "Layla Omar", email: "layla@example.com", role: "VENDOR", status: "Active", orders: 0, joined: "May 2026" },
  { id: "u6", name: "Zainab Rahman", email: "zainab@example.com", role: "ADMIN", status: "Active", orders: 0, joined: "Jan 2026" },
];

const roleColors: Record<string, string> = {
  CUSTOMER: "bg-blue-100 text-blue-700",
  VENDOR: "bg-purple-100 text-purple-700",
  ADMIN: "bg-indigo-100 text-indigo-700",
};

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6 text-indigo-500" />
            Users
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">{users.length} registered users</p>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search users..." className="pl-10" />
        </div>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Filter className="h-4 w-4" />
          Filter by Role
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  {["User", "Email", "Role", "Orders", "Status", "Joined", "Actions"].map((h) => (
                    <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#1a1a2e] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {user.name.charAt(0)}
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${roleColors[user.role]}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{user.orders}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${user.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground text-xs">{user.joined}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 hover:bg-green-50 rounded-lg" title="Activate">
                          <UserCheck className="h-3.5 w-3.5 text-green-600" />
                        </button>
                        <button className="p-1.5 hover:bg-red-50 rounded-lg" title="Suspend">
                          <UserX className="h-3.5 w-3.5 text-red-500" />
                        </button>
                        <button className="p-1.5 hover:bg-muted rounded-lg">
                          <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
