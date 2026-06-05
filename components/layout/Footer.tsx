import Link from "next/link";
import { Share2, Globe, AtSign, Radio, Play, Mail, Phone } from "lucide-react";
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
              <Button variant="gold" type="submit" className="flex-shrink-0">
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
                <div className="text-[#c9a96e] text-xs tracking-widest uppercase">
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
              {[
                { Icon: AtSign, href: "#", label: "Instagram" },
                { Icon: Globe, href: "#", label: "Facebook" },
                { Icon: Share2, href: "#", label: "Twitter" },
                { Icon: Play, href: "#", label: "YouTube" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#c9a96e] transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
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
          <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Shop by Category</p>
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
            {/* Payment icons */}
            {["Visa", "Mastercard", "PayPal", "Stripe", "Apple Pay"].map((payment) => (
              <span
                key={payment}
                className="px-2 py-0.5 bg-white/10 rounded text-xs text-white/60"
              >
                {payment}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
