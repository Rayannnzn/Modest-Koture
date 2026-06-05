import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AccountNav from "@/components/layout/AccountNav";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login?callbackUrl=/account");

  return (
    <div className="container mx-auto px-4 lg:px-6 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-border p-4 sticky top-24">
            {/* User info */}
            <div className="flex items-center gap-3 p-3 mb-4 bg-muted/50 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-[#1a1a2e] flex items-center justify-center text-[#c9a96e] font-bold text-sm flex-shrink-0">
                {session.user.name?.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">{session.user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
              </div>
            </div>
            {/* Client nav for active state */}
            <AccountNav />
          </div>
        </aside>
        {/* Main content */}
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
