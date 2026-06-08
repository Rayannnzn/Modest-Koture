import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

// ==========================================
// NAVIGATION ICONS
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
// CATEGORY ICONS
// ==========================================

// 1. Women's Fashion (Elegant draped abaya/dress silhouette)
export const WomenFashionIcon = ({ className, ...props }: IconProps) => (
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
    <path d="M12 2a1.5 1.5 0 0 1 1.5 1.5c0 .5-.2.9-.5 1.2l-1 1M12 6.5l-5 2v3s.5 4-1.5 8.5h13c-2-4.5-1.5-8.5-1.5-8.5l-5-2z" />
    <path d="M12 6.5v13" strokeDasharray="2 2" opacity="0.4" />
  </svg>
);

// 2. Men's Fashion (Sleek structured tunic/thobe line art)
export const MenFashionIcon = ({ className, ...props }: IconProps) => (
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
    <path d="M6 8.5V20c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V8.5L12 5.5 6 8.5z" />
    <path d="M12 5.5V13" />
    <path d="M10 9h4" />
    <circle cx="12" cy="3.5" r="0.75" />
  </svg>
);

// 3. Children (Minimal hanger with delicate center circle)
export const ChildrenIcon = ({ className, ...props }: IconProps) => (
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
    <path d="M12 3a1.5 1.5 0 0 0-1.5 1.5c0 .3.1.6.3.8L7 8h10l-3.8-2.7c.2-.2.3-.5.3-.8A1.5 1.5 0 0 0 12 3z" />
    <path d="M7 8l-2 5h14l-2-5H7z" />
    <circle cx="12" cy="16" r="1.5" />
  </svg>
);

// 4. Electronics (Modern lifestyle wearable tech / smartwatch)
export const ElectronicsIcon = ({ className, ...props }: IconProps) => (
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
    <rect x="7" y="7" width="10" height="10" rx="2" />
    <path d="M9 7V4c0-.5.5-1 1-1h4c.5 0 1 .5 1 1v3M9 17v3c0 .5.5 1 1 1h4c.5 0 1-.5 1-1v-3" />
    <circle cx="12" cy="12" r="1.5" />
  </svg>
);

// 5. Pets (Stylized organic paw print icon)
export const PetsIcon = ({ className, ...props }: IconProps) => (
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
    <circle cx="12" cy="14" r="3.5" />
    <circle cx="7.5" cy="10" r="1.5" />
    <circle cx="11" cy="7.5" r="1.5" />
    <circle cx="14.5" cy="8" r="1.5" />
    <circle cx="17.5" cy="11.5" r="1.5" />
  </svg>
);

// 6. Luxury (Minimalist high-end fragrance / perfume bottle)
export const LuxuryIcon = ({ className, ...props }: IconProps) => (
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
    <rect x="6" y="8" width="12" height="12" rx="2" />
    <path d="M9 8V5c0-.6.4-1 1-1h4c.6 0 1 .4 1 1v3" />
    <path d="M12 12v4" />
    <circle cx="12" cy="14" r="1" />
    <path d="M6 11h12" />
  </svg>
);

// 7. Beauty (Elegant dropper bottle / skincare serum)
export const BeautyIcon = ({ className, ...props }: IconProps) => (
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
    <path d="M10 6h4M12 3v3M9 8h6v10c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2V8z" />
    <path d="M9 12h6" />
  </svg>
);

// 8. Jewelry (Minimalist solitaire diamond ring)
export const JewelryIcon = ({ className, ...props }: IconProps) => (
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
    <circle cx="12" cy="14" r="6" />
    <path d="M12 8l-3-3 3-3 3 3-3 3z" />
    <path d="M9 5h6" />
  </svg>
);

// 9. Plus Size (Elegant custom tailor's mannequin form)
export const PlusSizeIcon = ({ className, ...props }: IconProps) => (
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
    <path d="M8 4c0-1 1-2 2-2h4c1 0 2 1 2 2v2.5c1.5 1 2.5 3 2.5 5v1.5c0 1.5-1 2-2.5 2H10c-1.5 0-2.5-.5-2.5-2V11c0-2 1-4 2.5-5V4z" />
    <path d="M12 15v7M9 22h6" />
  </svg>
);

// Map of slug to custom icon component
export const CategoryIconsMap: Record<string, React.ComponentType<IconProps>> = {
  women: WomenFashionIcon,
  men: MenFashionIcon,
  children: ChildrenIcon,
  electronics: ElectronicsIcon,
  pets: PetsIcon,
  luxury: LuxuryIcon,
  beauty: BeautyIcon,
  jewelry: JewelryIcon,
  "plus-size": PlusSizeIcon,
};
