import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Store,
  TrendingUp,
  Shield,
  Globe,
  CheckCircle2,
  ArrowRight,
  DollarSign,
  Users,
  Star,
  Zap,
  UserCheck,
  LayoutGrid,
  SmilePlus,
  ThumbsUp,
  UserPlus,
  PenTool,
  PackagePlus,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Become a Seller — Modest Kouture",
  description:
    "Join 500+ vendors on Modest Kouture and reach millions of fashion-conscious customers worldwide.",
};

const benefits = [
  {
    icon: Globe,
    title: "Global Reach",
    description: "Sell to customers across 50+ countries with our trusted platform.",
  },
  {
    icon: TrendingUp,
    title: "Sales Growth Tools",
    description: "Powerful analytics, promotions, and marketing tools to grow your revenue.",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Get paid reliably with weekly payouts and full fraud protection.",
  },
  {
    icon: Zap,
    title: "Easy Setup",
    description: "Launch your store in minutes with our intuitive vendor dashboard.",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description: "24/7 vendor support team to help you succeed at every step.",
  },
  {
    icon: DollarSign,
    title: "Low Commission",
    description: "Industry-leading commission rates starting at just 5% per sale.",
  },
];

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Create Your Account",
    description: "Sign up for free and verify your business details.",
  },
  {
    step: "02",
    icon: PenTool,
    title: "Set Up Your Store",
    description: "Customize your storefront, upload your logo, and write your brand story.",
  },
  {
    step: "03",
    icon: PackagePlus,
    title: "List Your Products",
    description: "Add products with photos, descriptions, and pricing in minutes.",
  },
  {
    step: "04",
    icon: Rocket,
    title: "Start Selling",
    description: "Go live and start receiving orders from our customer base.",
  },
];

const stats = [
  { value: "500+", label: "Active Vendors", icon: UserCheck },
  { value: "50K+", label: "Products Listed", icon: LayoutGrid },
  { value: "2M+", label: "Happy Customers", icon: SmilePlus },
  { value: "98%", label: "Seller Satisfaction", icon: ThumbsUp },
];

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "forever",
    commission: "10%",
    features: [
      "Up to 20 products",
      "Basic analytics",
      "Standard support",
      "Weekly payouts",
    ],
    highlighted: false,
    cta: "Start Free",
  },
  {
    name: "Growth",
    price: "$29",
    period: "/month",
    commission: "7%",
    features: [
      "Up to 200 products",
      "Advanced analytics",
      "Priority support",
      "Bi-weekly payouts",
      "Promotional tools",
      "Featured listings",
    ],
    highlighted: true,
    cta: "Start 14-Day Trial",
  },
  {
    name: "Pro",
    price: "$79",
    period: "/month",
    commission: "5%",
    features: [
      "Unlimited products",
      "Full analytics suite",
      "Dedicated account manager",
      "Daily payouts",
      "All promotional tools",
      "API access",
    ],
    highlighted: false,
    cta: "Contact Sales",
  },
];

export default function BecomeASellerPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] py-24">
        {/* Decorative circles */}
        <div className="absolute inset-0 pointer-events-none">
          {[600, 400, 200].map((size, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-[#c9a96e]/10"
              style={{
                width: size,
                height: size,
                top: "50%",
                left: "60%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 lg:px-6 relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#c9a96e]/10 border border-[#c9a96e]/20 text-[#c9a96e] text-sm font-medium mb-6">
              <Store className="h-4 w-4" />
              Join the Modest Kouture Marketplace
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Grow Your Brand,<br />
              <span className="text-[#c9a96e]">Reach Millions</span>
            </h1>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Join 500+ fashion vendors on the UK&apos;s leading modest fashion marketplace.
              Start selling today — no upfront costs, no contract.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-[#c9a96e] hover:bg-[#b8985d] text-[#1a1a2e] font-bold gap-2"
              >
                <Link href="/register">
                  Start Selling for Free
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/20 text-black hover:bg-white/30">
                <Link href="/contact">Talk to Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 lg:px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="w-12 h-12 rounded-2xl bg-[#1a1a2e]/5 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#c9a96e]/10 transition-colors">
                  <stat.icon className="h-5 w-5 text-[#c9a96e]" />
                </div>
                <div className="text-3xl font-bold text-[#1a1a2e]">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-4 lg:px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Why sell on Modest Kouture?</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Everything you need to build and scale a successful online fashion business.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group p-6 bg-white rounded-2xl border border-border hover:border-[#c9a96e]/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1a1a2e]/5 flex items-center justify-center mb-4 group-hover:bg-[#c9a96e]/10 transition-colors">
                <benefit.icon className="h-6 w-6 text-[#c9a96e]" />
              </div>
              <h3 className="font-bold mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">How it works</h2>
            <p className="text-muted-foreground">Get your store live in 4 simple steps</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={step.step} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-[#c9a96e]/50 to-transparent z-0" />
                )}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#1a1a2e] text-white flex flex-col items-center justify-center mb-4 shadow-lg gap-0.5">
                    <step.icon className="h-6 w-6 text-[#c9a96e]" />
                    <span className="text-[10px] font-bold text-white/40 tracking-widest">{step.step}</span>
                  </div>
                  <h3 className="font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* Testimonials */}
      <section className="bg-[#1a1a2e] py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">What our vendors say</h2>
            <p className="text-white/60">Real stories from real sellers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Fatima Al-Rashid",
                store: "Founder, Modest by Fatima",
                quote: "In just 6 months, I went from hobby to £50K in sales. Modest Kouture's platform made it effortless.",
                rating: 5,
              },
              {
                name: "Omar Jewels",
                store: "CEO, Gem Palace Jewelry",
                quote: "The vendor dashboard is incredibly intuitive. I manage 200+ products and 50 orders a day with ease.",
                rating: 5,
              },
              {
                name: "Sara Green",
                store: "Co-founder, Eco Modest",
                quote: "Customer support is outstanding. They genuinely care about helping us grow and succeed.",
                rating: 5,
              },
            ].map((testimonial) => (
              <div key={testimonial.name} className="bg-white/5 rounded-2xl border border-white/10 p-6">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#c9a96e] text-[#c9a96e]" />
                  ))}
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold text-white text-sm">{testimonial.name}</p>
                  <p className="text-white/50 text-xs">{testimonial.store}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 lg:px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to start selling?</h2>
          <p className="text-muted-foreground mb-8">
            Join Modest Kouture today and turn your fashion passion into a thriving business.
            Free to start, no credit card required.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-[#1a1a2e] hover:bg-[#1a1a2e]/90 gap-2 px-8"
          >
            <Link href="/register">
              Create Your Seller Account
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            Already a vendor?{" "}
            <Link href="/login" className="text-[#c9a96e] hover:underline">
              Sign in to your dashboard
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
