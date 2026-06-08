"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Truck,
  Navigation,
  CircleUser,
  Bookmark,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";

const navItems = [
  { label: "Dashboard", href: "/account", icon: LayoutDashboard },
  { label: "My Orders", href: "/account/orders", icon: Truck },
  { label: "Wishlist", href: "/account/wishlist", icon: Bookmark },
  { label: "Addresses", href: "/account/addresses", icon: Navigation },
  { label: "Profile", href: "/account/profile", icon: CircleUser },
];

export default function AccountNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-0.5">
      {navItems.map((item) => {
        const isActive =
          item.href === "/account"
            ? pathname === "/account"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors group ${
              isActive
                ? "bg-[#1a1a2e] text-white"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <item.icon
              className={`h-4 w-4 flex-shrink-0 transition-colors ${
                isActive ? "text-[#c9a96e]" : "text-muted-foreground group-hover:text-[#c9a96e]"
              }`}
            />
            {item.label}
            {!isActive && (
              <ChevronRight className="h-3.5 w-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </Link>
        );
      })}

      <div className="pt-2 mt-2 border-t">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-colors group"
        >
          <LogOut className="h-4 w-4 text-muted-foreground group-hover:text-red-500 transition-colors" />
          Sign Out
        </button>
      </div>
    </nav>
  );
}
