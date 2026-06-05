import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import VendorSidebar from "@/components/layout/VendorSidebar";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) redirect("/login?callbackUrl=/vendor/dashboard");
  if (session.user.role !== "VENDOR" && session.user.role !== "ADMIN") {
    redirect("/become-a-seller");
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <VendorSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 bg-white border-b border-border flex items-center justify-between px-6 flex-shrink-0 sticky top-0 z-30">
          <div className="text-sm text-muted-foreground">
            Welcome back, <span className="font-semibold text-foreground">{session.user.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#c9a96e] rounded-full" />
            </Button>
          </div>
        </header>
        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
