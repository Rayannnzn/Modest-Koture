import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Modest Kouture — Fashion Marketplace",
    template: "%s | Modest Kouture",
  },
  description:
    "The premier multi-vendor marketplace for modest fashion, luxury lifestyle, and curated collections from independent designers worldwide.",
  keywords: ["modest fashion", "abaya", "hijab", "muslim fashion", "marketplace", "luxury"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://modestkouture.com",
    siteName: "Modest Kouture",
  },
  twitter: {
    card: "summary_large_image",
    site: "@modestkouture",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <SessionProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                borderRadius: "12px",
                fontFamily: "var(--font-inter)",
              },
            }}
          />
        </SessionProvider>
      </body>
    </html>
  );
}
