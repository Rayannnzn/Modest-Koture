import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import bcrypt from "bcryptjs";

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting database seeding...");

  // 1. Clear existing data in reverse dependency order
  console.log("Cleaning up existing tables...");
  await prisma.review.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.cartItem.deleteMany({});
  await prisma.wishlist.deleteMany({});
  await prisma.inventory.deleteMany({});
  await prisma.productAttribute.deleteMany({});
  await prisma.productImage.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.shippingRule.deleteMany({});
  await prisma.withdrawal.deleteMany({});
  await prisma.vendor.deleteMany({});
  await prisma.user.deleteMany({});

  // 2. Hash password for accounts
  const hashedPassword = await bcrypt.hash("Password123!", 12);

  // 3. Create Users and Vendors
  console.log("Creating users and vendors...");
  const vendorProfiles = [
    {
      email: "zara@modestkouture.com",
      name: "Zara Modest",
      storeName: "Zara Modest",
      slug: "zara-modest",
      category: "Women's Fashion",
      description: "Premium modest wear for the modern woman. Sourced from the finest fabrics worldwide.",
      location: "London, UK",
      logo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
      banner: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=400&fit=crop",
    },
    {
      email: "luxe@modestkouture.com",
      name: "Luxe Jewelry Co",
      storeName: "Luxe Jewelry Co",
      slug: "luxe-jewelry",
      category: "Jewelry",
      description: "Handcrafted gold & silver jewelry from master artisans. Every piece tells a story of craftsmanship.",
      location: "Birmingham, UK",
      logo: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&h=200&fit=crop",
      banner: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=400&fit=crop",
    },
    {
      email: "beauty@modestkouture.com",
      name: "Pure Beauty Lab",
      storeName: "Pure Beauty Lab",
      slug: "pure-beauty-lab",
      category: "Beauty",
      description: "Clean, organic, halal-certified beauty essentials for natural radiance.",
      location: "Manchester, UK",
      logo: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop",
      banner: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=400&fit=crop",
    },
    {
      email: "sac@modestkouture.com",
      name: "Le Sac Luxe",
      storeName: "Le Sac Luxe",
      slug: "le-sac-luxe",
      category: "Luxury",
      description: "Artisan leather bags and accessory essentials designed for modern elegance.",
      location: "Paris, France",
      logo: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=200&fit=crop",
      banner: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&h=400&fit=crop",
    },
    {
      email: "elegance@modestkouture.com",
      name: "Elegance Studio",
      storeName: "Elegance Studio",
      slug: "elegance-studio",
      category: "Women's Fashion",
      description: "Contemporary modest dresses celebrating flow, texture, and elegant shapes.",
      location: "London, UK",
      logo: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=200&h=200&fit=crop",
      banner: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&h=400&fit=crop",
    },
    {
      email: "modern@modestkouture.com",
      name: "Modern Modesty",
      storeName: "Modern Modesty",
      slug: "modern-modesty",
      category: "Women's Fashion",
      description: "Comfortable, stylish, everyday modest wardrobe essentials.",
      location: "Leeds, UK",
      logo: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=200&h=200&fit=crop",
      banner: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=400&fit=crop",
    },
  ];

  const vendorsMap: Record<string, string> = {};

  for (const v of vendorProfiles) {
    const user = await prisma.user.create({
      data: {
        email: v.email,
        name: v.name,
        password: hashedPassword,
        role: "VENDOR",
      },
    });

    const vendor = await prisma.vendor.create({
      data: {
        userId: user.id,
        storeName: v.storeName,
        slug: v.slug,
        description: v.description,
        status: "APPROVED",
        logo: v.logo,
        banner: v.banner,
        city: v.location.split(", ")[0],
        country: v.location.split(", ")[1] || "UK",
        email: v.email,
      },
    });

    vendorsMap[v.slug] = vendor.id;
  }

  // Create an Admin user too
  await prisma.user.create({
    data: {
      email: "admin@modestkouture.com",
      name: "Admin User",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  // Create a default Customer user
  const customerUser = await prisma.user.create({
    data: {
      email: "customer@modestkouture.com",
      name: "Amina Al-Mansoor",
      password: hashedPassword,
      role: "CUSTOMER",
    },
  });

  // 4. Create Categories
  console.log("Creating categories...");
  const categoriesData = [
    { name: "Women's Fashion", slug: "women", emoji: "👗", desc: "Elegant abayas, dresses, and modest wear for the modern woman" },
    { name: "Men's Fashion", slug: "men", emoji: "👔", desc: "Refined thobes, shirts, and casual wear for men" },
    { name: "Children", slug: "children", emoji: "🧸", desc: "Adorable and comfortable clothing for little ones" },
    { name: "Electronics", slug: "electronics", emoji: "📱", desc: "Smart devices, accessories, and tech essentials" },
    { name: "Pets", slug: "pets", emoji: "🐾", desc: "Premium products for your beloved pets" },
    { name: "Luxury", slug: "luxury", emoji: "💎", desc: "Exclusive designer pieces and premium lifestyle products" },
    { name: "Beauty", slug: "beauty", emoji: "💄", desc: "Halal-certified cosmetics and skincare essentials" },
    { name: "Jewelry", slug: "jewelry", emoji: "💍", desc: "Handcrafted necklaces, rings, earrings, and bracelets" },
    { name: "Plus Size", slug: "plus-size", emoji: "✨", desc: "Inclusive fashion celebrating every body shape" },
  ];

  const categoriesMap: Record<string, string> = {};

  for (const c of categoriesData) {
    const category = await prisma.category.create({
      data: {
        name: c.name,
        slug: c.slug,
        description: c.desc,
        icon: c.emoji,
      },
    });
    categoriesMap[c.slug] = category.id;
  }

  // 5. Create Products
  console.log("Creating products, images, attributes, and inventory...");
  const productsToSeed = [
    // Women's Modest Fashion
    {
      title: "Embroidered Floral Abaya",
      slug: "embroidered-floral-abaya",
      description: "A stunning embroidered floral abaya crafted from premium chiffon fabric. Features intricate hand-embroidered floral patterns on the sleeves and hem, a flowing silhouette, and a concealed front zipper. Perfect for formal gatherings, celebrations, or daily elegant modest styling.",
      price: 149.99,
      salePrice: 119.99,
      categorySlug: "women",
      vendorSlug: "zara-modest",
      sku: "ZM-ABY-001",
      isFeatured: true,
      tags: ["abaya", "modest", "formal", "chiffon", "embroidered"],
      images: [
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=700&fit=crop",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=700&fit=crop",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=700&fit=crop"
      ],
      attributes: [
        { name: "Color", value: "Black, Navy, Ivory, Blush Pink" },
        { name: "Size", value: "S, M, L, XL" },
        { name: "Material", value: "Premium Chiffon" }
      ],
      qty: 25,
      rating: 4.8,
      reviews: 12,
    },
    {
      title: "Silk Pleated Maxi Dress",
      slug: "silk-pleated-maxi-dress",
      description: "Make an impression with this luxurious silk pleated maxi dress. Boasting a mock collar neck, long sleeves with button cuffs, and a beautifully pleated dynamic skirt that creates a fluid flow when walking. Fully lined for modesty.",
      price: 199.99,
      salePrice: 159.99,
      categorySlug: "women",
      vendorSlug: "elegance-studio",
      sku: "EL-DRE-002",
      isFeatured: true,
      tags: ["dress", "silk", "pleated", "maxi", "formal"],
      images: [
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=700&fit=crop",
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=700&fit=crop"
      ],
      attributes: [
        { name: "Color", value: "Champagne, Sage Green, Emerald, Burgundy" },
        { name: "Size", value: "XS, S, M, L, XL" },
        { name: "Material", value: "Pure Mulberry Silk" }
      ],
      qty: 15,
      rating: 4.7,
      reviews: 8,
    },
    {
      title: "Cotton Linen Wide Leg Pants",
      slug: "cotton-linen-wide-leg-pants",
      description: "Super comfortable and light wide leg trousers designed with breathable cotton-linen weave. Features an elasticated waistband, side pockets, and a neat high-waisted fit. Easy to pair with long tunics or trench coats.",
      price: 79.99,
      salePrice: 59.99,
      categorySlug: "women",
      vendorSlug: "modern-modesty",
      sku: "MM-PNT-003",
      isFeatured: false,
      tags: ["pants", "linen", "casual", "wide-leg"],
      images: [
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=700&fit=crop",
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=700&fit=crop"
      ],
      attributes: [
        { name: "Color", value: "Beige, Olive, Off-White, Charcoal" },
        { name: "Size", value: "S, M, L, XL" },
        { name: "Material", value: "55% Linen, 45% Cotton" }
      ],
      qty: 40,
      rating: 4.5,
      reviews: 14,
    },
    {
      title: "Lace Trim Kaftan Dress",
      slug: "lace-trim-kaftan-dress",
      description: "Flowing elegance at its best. This kaftan dress is accented with premium lace inserts along the sleeves and collar line. Loose, airy fit provides top-tier modest draping and absolute day-long comfort.",
      price: 169.99,
      salePrice: 139.99,
      categorySlug: "women",
      vendorSlug: "zara-modest",
      sku: "ZM-KFT-004",
      isFeatured: false,
      tags: ["kaftan", "lace", "dress", "loose-fit"],
      images: [
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=700&fit=crop"
      ],
      attributes: [
        { name: "Color", value: "Navy Blue, Dusty Rose, Black" },
        { name: "Size", value: "One Size (Fits S-XXL)" },
        { name: "Material", value: "Crepe Rayon" }
      ],
      qty: 18,
      rating: 4.8,
      reviews: 5,
    },

    // Jewelry
    {
      title: "Gold Layered Necklace Set",
      slug: "gold-layered-necklace",
      description: "A gorgeous 18k gold-plated multi-row necklace set. Incorporates delicate chains, minimal bead details, and a central hammered coin pendant. Chains can be worn together or separate for styling flexibility.",
      price: 89.99,
      salePrice: null,
      categorySlug: "jewelry",
      vendorSlug: "luxe-jewelry",
      sku: "LJ-NEC-001",
      isFeatured: true,
      tags: ["necklace", "gold", "plated", "jewelry"],
      images: [
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=700&fit=crop",
        "https://images.unsplash.com/photo-1609587312208-cea54be969e7?w=600&h=700&fit=crop"
      ],
      attributes: [
        { name: "Material", value: "18K Gold Plated Brass" },
        { name: "Length", value: "16\", 18\", 20\" adjustable" }
      ],
      qty: 30,
      rating: 4.9,
      reviews: 22,
    },
    {
      title: "Pearl Drop Earrings",
      slug: "pearl-drop-earrings",
      description: "Timeless drop earrings combining a baroque freshwater pearl hanging from an elegant organic-shaped gold stud. Perfectly completes modest wedding attire or formal night-out outfits.",
      price: 89.99,
      salePrice: 69.99,
      categorySlug: "jewelry",
      vendorSlug: "luxe-jewelry",
      sku: "LJ-EAR-003",
      isFeatured: false,
      tags: ["earrings", "pearl", "gold", "formal"],
      images: [
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=700&fit=crop"
      ],
      attributes: [
        { name: "Material", value: "Freshwater Baroque Pearls, 14K Gold Fill" }
      ],
      qty: 20,
      rating: 4.8,
      reviews: 11,
    },

    // Beauty
    {
      title: "Natural Argan Oil Serum",
      slug: "argan-oil-serum",
      description: "100% organic, cold-pressed Moroccan argan oil serum. Deeply hydrates the face, locks in moisture, and adds a natural, non-greasy glow. Free from parabens, synthetic colors, and alcohols. Halal-certified.",
      price: 45.00,
      salePrice: null,
      categorySlug: "beauty",
      vendorSlug: "pure-beauty-lab",
      sku: "PB-OIL-001",
      isFeatured: true,
      tags: ["argan-oil", "serum", "skincare", "halal", "organic"],
      images: [
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=700&fit=crop",
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=700&fit=crop"
      ],
      attributes: [
        { name: "Volume", value: "50ml, 100ml" },
        { name: "Skin Type", value: "All skin types" }
      ],
      qty: 50,
      rating: 4.6,
      reviews: 45,
    },
    {
      title: "Rose Hip Face Oil",
      slug: "rose-hip-face-oil",
      description: "Deeply nourish your skin with organic rose hip seed oil. Rich in vitamins A and C and essential fatty acids, it works to improve skin texture, reduce redness, and brightens up dull complexions.",
      price: 52.00,
      salePrice: null,
      categorySlug: "beauty",
      vendorSlug: "pure-beauty-lab",
      sku: "PB-OIL-002",
      isFeatured: false,
      tags: ["rosehip", "oil", "face-care", "organic"],
      images: [
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=700&fit=crop"
      ],
      attributes: [
        { name: "Volume", value: "30ml" }
      ],
      qty: 35,
      rating: 4.9,
      reviews: 32,
    },

    // Luxury
    {
      title: "Structured Leather Handbag",
      slug: "structured-leather-handbag",
      description: "Expertly handcrafted from durable full-grain Italian leather. Features structured lines, custom gold hardware, a secure flap closing, and a versatile detachable crossbody strap.",
      price: 299.99,
      salePrice: 249.99,
      categorySlug: "luxury",
      vendorSlug: "le-sac-luxe",
      sku: "LS-BAG-001",
      isFeatured: true,
      tags: ["handbag", "leather", "luxury", "crossbody"],
      images: [
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=700&fit=crop"
      ],
      attributes: [
        { name: "Color", value: "Tan, Onyx Black, Taupe, Crimson" },
        { name: "Dimensions", value: "24cm x 18cm x 10cm" }
      ],
      qty: 10,
      rating: 4.9,
      reviews: 7,
    },

    // Men's Fashion
    {
      title: "Premium Cotton Thobe",
      slug: "premium-cotton-thobe",
      description: "A premium Saudi-style thobe made from top-grade soft Egyptian cotton. Boasting clean structured shoulders, neat button-down cuffs, and side slit pockets. Perfect for Eid prayers and family gatherings.",
      price: 129.99,
      salePrice: 109.99,
      categorySlug: "men",
      vendorSlug: "modern-modesty",
      sku: "MM-THB-001",
      isFeatured: false,
      tags: ["thobe", "cotton", "traditional", "men"],
      images: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=700&fit=crop"
      ],
      attributes: [
        { name: "Color", value: "White, Cream, Slate Grey" },
        { name: "Size", value: "54, 56, 58, 60" }
      ],
      qty: 22,
      rating: 4.7,
      reviews: 18,
    },

    // Children
    {
      title: "Adorable Cotton Kaftan",
      slug: "adorable-cotton-kaftan",
      description: "An incredibly sweet and cozy modest kaftan for girls. Made from breathable 100% organic cotton, with a fun playful print and comfy elastic sleeves. Safe and easy to play in.",
      price: 49.99,
      salePrice: 39.99,
      categorySlug: "children",
      vendorSlug: "zara-modest",
      sku: "ZM-KID-001",
      isFeatured: false,
      tags: ["kaftan", "kids", "girls", "organic-cotton"],
      images: [
        "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&h=700&fit=crop"
      ],
      attributes: [
        { name: "Color", value: "Lilac, Peach, Mint" },
        { name: "Age", value: "4-6 Years, 6-8 Years, 8-10 Years" }
      ],
      qty: 15,
      rating: 4.6,
      reviews: 9,
    },

    // Plus Size
    {
      title: "Plus Embroidered Velvet Abaya",
      slug: "plus-embroidered-velvet-abaya",
      description: "An elegant velvet abaya tailored specifically for a rich, comfortable plus-size silhouette. Features gorgeous golden cuff embroidery and side pockets. Extremely soft, premium feel.",
      price: 159.99,
      salePrice: null,
      categorySlug: "plus-size",
      vendorSlug: "zara-modest",
      sku: "ZM-PLS-001",
      isFeatured: false,
      tags: ["plus-size", "velvet", "abaya", "formal"],
      images: [
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=700&fit=crop"
      ],
      attributes: [
        { name: "Color", value: "Emerald Green, Royal Black, Plum" },
        { name: "Size", value: "1X, 2X, 3X" }
      ],
      qty: 12,
      rating: 4.7,
      reviews: 6,
    }
  ];

  for (const p of productsToSeed) {
    const product = await prisma.product.create({
      data: {
        title: p.title,
        slug: p.slug,
        description: p.description,
        price: p.price,
        salePrice: p.salePrice,
        sku: p.sku,
        status: "ACTIVE",
        isFeatured: p.isFeatured,
        tags: p.tags,
        avgRating: p.rating,
        reviewCount: p.reviews,
        categoryId: categoriesMap[p.categorySlug]!,
        vendorId: vendorsMap[p.vendorSlug]!,
      },
    });

    // Create Images
    for (let i = 0; i < p.images.length; i++) {
      await prisma.productImage.create({
        data: {
          productId: product.id,
          url: p.images[i],
          isPrimary: i === 0,
          sortOrder: i,
          altText: `${p.title} image ${i + 1}`,
        },
      });
    }

    // Create Attributes
    for (const attr of p.attributes) {
      await prisma.productAttribute.create({
        data: {
          productId: product.id,
          name: attr.name,
          value: attr.value,
        },
      });
    }

    // Create Inventory
    await prisma.inventory.create({
      data: {
        productId: product.id,
        quantity: p.qty,
        trackStock: true,
        lowStockAt: 3,
      },
    });

    // Create a review
    await prisma.review.create({
      data: {
        productId: product.id,
        userId: customerUser.id,
        rating: Math.round(p.rating),
        title: "Very happy with the purchase!",
        comment: `Excellent product, fast shipping. The description is perfectly accurate. Loved the ${p.title}!`,
        status: "APPROVED",
      },
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding database: ", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
