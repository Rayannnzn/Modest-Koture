"use client";

/**
 * Reusable Framer Motion animation primitives.
 * All components:
 * - Trigger once when entering the viewport (whileInView + once: true)
 * - Respect prefers-reduced-motion via useReducedMotion()
 * - Use GPU-composited properties (opacity, transform) only → no CLS
 */

import React from "react";
import { motion, useReducedMotion, type Variants, type HTMLMotionProps } from "framer-motion";
import {
  fadeUp,
  fadeIn,
  fadeLeft,
  fadeRight,
  scaleIn,
  staggerContainer,
  staggerItem,
  staggerItemH,
  ctaBanner,
  imageReveal,
  defaultViewport,
} from "@/lib/animations";

// ─── Helper ───────────────────────────────────────────────────────────────────

/** When reduced-motion is preferred, collapse all variants to their visible state instantly. */
function useVariants(variants: Variants): Variants {
  const shouldReduce = useReducedMotion();
  if (!shouldReduce) return variants;
  // Return instant versions — every state resolves to the visible frame
  return {
    hidden: { opacity: 1, y: 0, x: 0, scale: 1 },
    visible: { opacity: 1, y: 0, x: 0, scale: 1, transition: { duration: 0 } },
  };
}

// ─── FadeUp ──────────────────────────────────────────────────────────────────

interface FadeUpProps extends Omit<HTMLMotionProps<"div">, "variants" | "initial" | "whileInView"> {
  delay?: number;
  /** Override the viewport config */
  margin?: string;
  as?: "div" | "section" | "article" | "aside" | "header" | "p" | "span";
}

export function FadeUp({ children, delay = 0, margin = "-80px", as = "div", style, ...rest }: FadeUpProps) {
  const variants = useVariants(fadeUp);
  const MotionEl = motion[as] as typeof motion.div;
  return (
    <MotionEl
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin }}
      style={{ ...style, transitionDelay: delay ? `${delay}s` : undefined }}
      {...(rest as HTMLMotionProps<"div">)}
    >
      {children}
    </MotionEl>
  );
}

// ─── FadeIn ──────────────────────────────────────────────────────────────────

interface FadeInProps extends Omit<HTMLMotionProps<"div">, "variants" | "initial" | "whileInView"> {
  delay?: number;
  as?: "div" | "section" | "span" | "figure";
}

export function FadeIn({ children, delay = 0, as = "div", style, ...rest }: FadeInProps) {
  const variants = useVariants(fadeIn);
  const MotionEl = motion[as] as typeof motion.div;
  return (
    <MotionEl
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      style={{ ...style, transitionDelay: delay ? `${delay}s` : undefined }}
      {...(rest as HTMLMotionProps<"div">)}
    >
      {children}
    </MotionEl>
  );
}

// ─── FadeLeft ────────────────────────────────────────────────────────────────

interface FadeLeftProps extends Omit<HTMLMotionProps<"div">, "variants" | "initial" | "whileInView"> {
  delay?: number;
}

export function FadeLeft({ children, delay = 0, style, ...rest }: FadeLeftProps) {
  const variants = useVariants(fadeLeft);
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      style={{ ...style, transitionDelay: delay ? `${delay}s` : undefined }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// ─── FadeRight ───────────────────────────────────────────────────────────────

interface FadeRightProps extends Omit<HTMLMotionProps<"div">, "variants" | "initial" | "whileInView"> {
  delay?: number;
}

export function FadeRight({ children, delay = 0, style, ...rest }: FadeRightProps) {
  const variants = useVariants(fadeRight);
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      style={{ ...style, transitionDelay: delay ? `${delay}s` : undefined }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// ─── ScaleIn ─────────────────────────────────────────────────────────────────

interface ScaleInProps extends Omit<HTMLMotionProps<"div">, "variants" | "initial" | "whileInView"> {
  delay?: number;
}

export function ScaleIn({ children, delay = 0, style, ...rest }: ScaleInProps) {
  const variants = useVariants(scaleIn);
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      style={{ ...style, transitionDelay: delay ? `${delay}s` : undefined }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// ─── CTAReveal ───────────────────────────────────────────────────────────────

interface CTARevealProps extends Omit<HTMLMotionProps<"div">, "variants" | "initial" | "whileInView"> {
  delay?: number;
}

export function CTAReveal({ children, delay = 0, style, ...rest }: CTARevealProps) {
  const variants = useVariants(ctaBanner);
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      style={{ ...style, transitionDelay: delay ? `${delay}s` : undefined }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// ─── ImageReveal ─────────────────────────────────────────────────────────────

interface ImageRevealProps extends Omit<HTMLMotionProps<"div">, "variants" | "initial" | "whileInView"> {
  delay?: number;
}

export function ImageReveal({ children, delay = 0, style, ...rest }: ImageRevealProps) {
  const variants = useVariants(imageReveal);
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      style={{ ...style, transitionDelay: delay ? `${delay}s` : undefined }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// ─── StaggerGrid ─────────────────────────────────────────────────────────────

interface StaggerGridProps extends Omit<HTMLMotionProps<"div">, "variants" | "initial" | "whileInView"> {
  stagger?: number;
  delayChildren?: number;
}

export function StaggerGrid({ children, stagger = 0.07, delayChildren = 0, ...rest }: StaggerGridProps) {
  const shouldReduce = useReducedMotion();
  const variants = shouldReduce
    ? { hidden: {}, visible: {} }
    : staggerContainer(stagger, delayChildren);

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// ─── StaggerItem ─────────────────────────────────────────────────────────────

interface StaggerItemProps extends Omit<HTMLMotionProps<"div">, "variants"> {
  horizontal?: boolean;
}

export function StaggerItem({ children, horizontal = false, ...rest }: StaggerItemProps) {
  const shouldReduce = useReducedMotion();
  const variants: Variants = shouldReduce
    ? { hidden: { opacity: 1, y: 0, x: 0 }, visible: { opacity: 1, y: 0, x: 0 } }
    : horizontal
    ? staggerItemH
    : staggerItem;

  return (
    <motion.div variants={variants} {...rest}>
      {children}
    </motion.div>
  );
}
