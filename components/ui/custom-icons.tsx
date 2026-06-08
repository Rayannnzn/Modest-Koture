import React from "react";
import {
  Shirt,
  Watch,
  Baby,
  Smartphone,
  PawPrint,
  Gem,
  Sparkles,
  Crown,
  Maximize2,
} from "lucide-react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

// ==========================================
// NAVIGATION ICONS  (custom SVG — premium stroke weight)
// ==========================================

// Search (Magnifying Glass)
export const NavSearchIcon = ({ className, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

// Wishlist (Heart)
export const NavHeartIcon = ({ className, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

// Cart (Shopping Bag)
export const NavCartIcon = ({ className, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

// Account (User Profile)
export const NavUserIcon = ({ className, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// Become a Seller (Storefront)
export const NavStoreIcon = ({ className, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
    <path d="M3 9l3-6h12l3 6" />
    <path d="M12 3v6" />
  </svg>
);

// Mobile Menu (Hamburger)
export const NavMenuIcon = ({ className, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

// Close (X)
export const NavCloseIcon = ({ className, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

// Chevron Down
export const NavChevronDownIcon = ({ className, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);


// ==========================================
// CATEGORY CONFIGURATION
// Each entry carries:
//   icon     — Lucide component
//   color    — icon foreground color (Tailwind arbitrary or hex)
//   bg       — icon container background (light tint)
//   hoverBg  — container bg on hover
//   label    — screen-reader / tooltip label
// ==========================================

export interface CategoryConfig {
  icon: React.ComponentType<{ className?: string }>;
  color: string;        // text color class
  bg: string;           // bg color class (resting)
  hoverBg: string;      // bg color class (hover / active)
  dotColor: string;     // small accent dot
}

export const CategoryConfigMap: Record<string, CategoryConfig> = {
  // 1. Women — rose / mauve palette
  women: {
    icon: Shirt,
    color: "text-rose-600",
    bg: "bg-rose-50",
    hoverBg: "bg-rose-100",
    dotColor: "bg-rose-400",
  },

  // 2. Men — indigo / navy palette
  men: {
    icon: Watch,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    hoverBg: "bg-indigo-100",
    dotColor: "bg-indigo-400",
  },

  // 3. Children — sky / playful
  children: {
    icon: Baby,
    color: "text-sky-600",
    bg: "bg-sky-50",
    hoverBg: "bg-sky-100",
    dotColor: "bg-sky-400",
  },

  // 4. Electronics — violet / tech
  electronics: {
    icon: Smartphone,
    color: "text-violet-600",
    bg: "bg-violet-50",
    hoverBg: "bg-violet-100",
    dotColor: "bg-violet-400",
  },

  // 5. Pets — amber / warm
  pets: {
    icon: PawPrint,
    color: "text-amber-600",
    bg: "bg-amber-50",
    hoverBg: "bg-amber-100",
    dotColor: "bg-amber-400",
  },

  // 6. Luxury — gold / brand accent
  luxury: {
    icon: Crown,
    color: "text-[#b8935d]",
    bg: "bg-[#fdf8f0]",
    hoverBg: "bg-[#faefd8]",
    dotColor: "bg-[#c9a96e]",
  },

  // 7. Beauty — fuchsia / cosmetics
  beauty: {
    icon: Sparkles,
    color: "text-fuchsia-600",
    bg: "bg-fuchsia-50",
    hoverBg: "bg-fuchsia-100",
    dotColor: "bg-fuchsia-400",
  },

  // 8. Jewelry — emerald / precious
  jewelry: {
    icon: Gem,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    hoverBg: "bg-emerald-100",
    dotColor: "bg-emerald-400",
  },

  // 9. Plus Size — purple / inclusive
  "plus-size": {
    icon: Maximize2,
    color: "text-purple-600",
    bg: "bg-purple-50",
    hoverBg: "bg-purple-100",
    dotColor: "bg-purple-400",
  },
};

// Legacy icon-only map kept for any code that still imports it
export const CategoryIconsMap: Record<string, React.ComponentType<IconProps>> =
  Object.fromEntries(
    Object.entries(CategoryConfigMap).map(([slug, cfg]) => [slug, cfg.icon as React.ComponentType<IconProps>])
  );
