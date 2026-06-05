import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Get token from JWT cookie (no DB access needed on Edge)
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  });

  const isLoggedIn = !!token;
  const role = token?.role as string | undefined;

  // Protected customer routes
  if (pathname.startsWith("/account")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${encodeURIComponent(pathname)}`, req.url)
      );
    }
  }

  // Protected vendor routes
  if (pathname.startsWith("/vendor")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(
        new URL("/login?callbackUrl=/vendor/dashboard", req.url)
      );
    }
    if (role !== "VENDOR" && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/become-a-seller", req.url));
    }
  }

  // Protected admin routes
  if (pathname.startsWith("/admin")) {
    if (!isLoggedIn || role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Redirect logged-in users away from auth pages
  if (isLoggedIn && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/account/:path*",
    "/vendor/:path*",
    "/admin/:path*",
    "/login",
    "/register",
  ],
};
