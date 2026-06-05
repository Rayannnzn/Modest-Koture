import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { MapPin, Plus, Home, Briefcase, Edit, Trash2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "My Addresses — Modest Kouture" };

const addresses = [
  {
    id: "addr-1",
    type: "Home",
    icon: Home,
    isDefault: true,
    name: "Amina Al-Hassan",
    line1: "42 Rosewood Avenue, Apt 5B",
    line2: "",
    city: "London",
    state: "England",
    postcode: "SW1A 1AA",
    country: "United Kingdom",
    phone: "+44 7700 900123",
  },
  {
    id: "addr-2",
    type: "Work",
    icon: Briefcase,
    isDefault: false,
    name: "Amina Al-Hassan",
    line1: "100 Oxford Street",
    line2: "Floor 3, Suite 301",
    city: "London",
    state: "England",
    postcode: "W1D 1LL",
    country: "United Kingdom",
    phone: "+44 7700 900456",
  },
];

export default async function AddressesPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <MapPin className="h-6 w-6 text-[#c9a96e]" />
            My Addresses
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">{addresses.length} saved addresses</p>
        </div>
        <Button size="sm" className="bg-[#1a1a2e] gap-1.5">
          <Plus className="h-4 w-4" />
          Add New Address
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {addresses.map((addr) => {
          const Icon = addr.icon;
          return (
            <div
              key={addr.id}
              className={`relative bg-white rounded-2xl border p-5 transition-all ${
                addr.isDefault
                  ? "border-[#c9a96e] shadow-md shadow-[#c9a96e]/10"
                  : "border-border hover:border-[#c9a96e]/40 hover:shadow-md"
              }`}
            >
              {addr.isDefault && (
                <div className="absolute top-4 right-4 flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="h-3 w-3" />
                  Default
                </div>
              )}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#1a1a2e]/10 flex items-center justify-center">
                  <Icon className="h-4 w-4 text-[#1a1a2e]" />
                </div>
                <span className="font-semibold text-sm">{addr.type}</span>
              </div>
              <div className="space-y-1 text-sm">
                <p className="font-semibold">{addr.name}</p>
                <p className="text-muted-foreground">{addr.line1}</p>
                {addr.line2 && <p className="text-muted-foreground">{addr.line2}</p>}
                <p className="text-muted-foreground">
                  {addr.city}, {addr.state} {addr.postcode}
                </p>
                <p className="text-muted-foreground">{addr.country}</p>
                <p className="text-muted-foreground">{addr.phone}</p>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                <Button variant="outline" size="sm" className="gap-1.5 text-xs flex-1">
                  <Edit className="h-3 w-3" />
                  Edit
                </Button>
                {!addr.isDefault && (
                  <>
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs flex-1">
                      Set Default
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-red-500 hover:text-red-600 hover:bg-red-50">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          );
        })}

        {/* Add new address card */}
        <button className="flex flex-col items-center justify-center gap-3 bg-muted/30 rounded-2xl border-2 border-dashed border-border p-8 hover:border-[#c9a96e]/50 hover:bg-[#c9a96e]/5 transition-all group">
          <div className="w-12 h-12 rounded-full bg-white border border-border flex items-center justify-center group-hover:border-[#c9a96e]/40 transition-colors shadow-sm">
            <Plus className="h-5 w-5 text-[#c9a96e]" />
          </div>
          <p className="text-sm font-medium text-muted-foreground group-hover:text-[#c9a96e] transition-colors">
            Add a new address
          </p>
        </button>
      </div>
    </div>
  );
}
