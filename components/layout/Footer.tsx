import Link from "next/link";
import { Mail, Phone, Send, BadgeCheck, Truck, RefreshCw, HeadphonesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Blog", href: "/blog" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "Track Order", href: "/track" },
    { label: "Returns", href: "/returns" },
  ],
  sellers: [
    { label: "Sell on Modest Kouture", href: "/become-a-seller" },
    { label: "Seller Guidelines", href: "/seller-guidelines" },
    { label: "Vendor Resources", href: "/vendor/resources" },
    { label: "Affiliate Program", href: "/affiliates" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Refund Policy", href: "/refund" },
  ],
};

const categories = [
  "Women", "Men", "Children", "Electronics",
  "Luxury", "Beauty", "Jewelry", "Plus Size",
];

export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-white">
      {/* Trust badges row */}
      <div className="border-b border-white/5 bg-white/[0.03]">
        <div className="container mx-auto px-4 lg:px-6 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: Truck, label: "Free Shipping", sub: "Orders over $75" },
              { icon: BadgeCheck, label: "Halal Certified", sub: "Verified products" },
              { icon: RefreshCw, label: "Easy Returns", sub: "30-day policy" },
              { icon: HeadphonesIcon, label: "24/7 Support", sub: "Always here for you" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <div className="w-9 h-9 rounded-full bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center">
                  <Icon className="h-4 w-4 text-[#c9a96e]" />
                </div>
                <p className="text-white text-xs font-semibold">{label}</p>
                <p className="text-white/40 text-[10px]">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 lg:px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-1">
                Join the <span className="text-[#c9a96e]">Modest Kouture</span> community
              </h3>
              <p className="text-white/60 text-sm">
                Get exclusive deals, new arrivals, and style inspiration delivered to your inbox.
              </p>
            </div>
            <form className="flex gap-2 w-full md:w-auto min-w-[340px]">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#c9a96e] flex-1"
              />
              <Button variant="gold" type="submit" className="flex-shrink-0 gap-2">
                <Send className="h-3.5 w-3.5" />
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer links */}
      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#c9a96e] flex items-center justify-center">
                <span className="text-[#1a1a2e] font-bold text-lg">M</span>
              </div>
              <div>
                <div className="font-bold text-lg leading-tight">Modest Kouture</div>
                <div className="text-[#c9a96e] text-xs tracking-wide uppercase">
                  Fashion Marketplace
                </div>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-4 max-w-xs">
              The premier multi-vendor marketplace for modest fashion, luxury lifestyle, 
              and curated collections from independent designers worldwide.
            </p>
            <div className="space-y-2 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#c9a96e]" />
                <span>hello@modestkouture.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#c9a96e]" />
                <span>+1 (800) 555-0199</span>
              </div>
            </div>
            {/* Social links */}
            <div className="flex gap-3 mt-5">
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#c9a96e] transition-all duration-200 hover:scale-105">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              {/* Facebook */}
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#c9a96e] transition-all duration-200 hover:scale-105">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              {/* X / Twitter */}
              <a href="#" aria-label="Twitter / X" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#c9a96e] transition-all duration-200 hover:scale-105">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              {/* YouTube */}
              <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#c9a96e] transition-all duration-200 hover:scale-105">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              {/* TikTok */}
              <a href="#" aria-label="TikTok" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#c9a96e] transition-all duration-200 hover:scale-105">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              </a>
            </div>

          </div>

          {/* Links columns */}
          {[
            { title: "Company", links: footerLinks.company },
            { title: "Support", links: footerLinks.support },
            { title: "Sellers", links: footerLinks.sellers },
            { title: "Legal", links: footerLinks.legal },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-4 text-white">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-[#c9a96e] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Categories */}
        <div className="mt-10 pt-8 border-t border-white/10">
          <p className="text-xs text-white/40 uppercase tracking-wide mb-3">Shop by Category</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/category/${cat.toLowerCase().replace(" ", "-")}`}
                className="text-xs px-3 py-1.5 rounded-full bg-white/10 text-white/60 hover:bg-[#c9a96e]/20 hover:text-[#c9a96e] transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-white/40">
          <p>© {new Date().getFullYear()} Modest Kouture. All rights reserved.</p>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {/* Visa */}
            <div className="h-7 px-2.5 bg-white/10 rounded flex items-center gap-1.5">
              <svg className="h-4" viewBox="0 0 48 16" fill="none"><text x="0" y="13" fontSize="13" fontWeight="bold" fill="#c9a96e" fontFamily="Arial">VISA</text></svg>
            </div>
            {/* Mastercard */}
            <div className="h-7 px-2 bg-white/10 rounded flex items-center gap-1">
              <svg className="h-4 w-4" viewBox="0 0 24 24"><circle cx="9" cy="12" r="7" fill="#eb001b" opacity="0.9"/><circle cx="15" cy="12" r="7" fill="#f79e1b" opacity="0.9"/><path d="M12 6.8A7 7 0 0 1 15 12a7 7 0 0 1-3 5.2A7 7 0 0 1 9 12a7 7 0 0 1 3-5.2z" fill="#ff5f00"/></svg>
              <span className="text-[10px] text-white/50">MC</span>
            </div>
            {/* PayPal */}
            <div className="h-7 px-2.5 bg-white/10 rounded flex items-center">
              <svg className="h-4" viewBox="0 0 80 24" fill="none"><text x="0" y="17" fontSize="13" fontWeight="700" fill="#c9a96e" fontFamily="Arial">PayPal</text></svg>
            </div>
            {/* Apple Pay */}
            <div className="h-7 px-2.5 bg-white/10 rounded flex items-center gap-1">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="white" opacity="0.7"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              <span className="text-[10px] text-white/50">Pay</span>
            </div>
            {/* Stripe */}
            <div className="h-7 px-2.5 bg-white/10 rounded flex items-center">
              <svg className="h-4" viewBox="0 0 60 24" fill="none"><text x="0" y="17" fontSize="13" fontWeight="600" fill="#c9a96e" fontFamily="Arial" letterSpacing="-0.5">stripe</text></svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
