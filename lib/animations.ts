import type { Variants } from "framer-motion";

// ─── Shared Timing ────────────────────────────────────────────────────────────
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const EASE_OUT_SOFT = [0.25, 0.46, 0.45, 0.94] as const;

// ─── Fade Up ──────────────────────────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};

// ─── Fade In (pure opacity) ───────────────────────────────────────────────────
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: EASE_OUT_SOFT },
  },
};

// ─── Fade Left ────────────────────────────────────────────────────────────────
export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

// ─── Fade Right ───────────────────────────────────────────────────────────────
export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

// ─── Scale In ─────────────────────────────────────────────────────────────────
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: EASE_OUT_EXPO },
  },
};

// ─── Stagger Container ────────────────────────────────────────────────────────
/** Parent that staggers its children. Pass `staggerChildren` via custom prop. */
export function staggerContainer(staggerChildren = 0.07, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
}

// ─── Stagger Item (FadeUp child) ──────────────────────────────────────────────
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT_EXPO },
  },
};

// ─── Stagger Item Horizontal ──────────────────────────────────────────────────
export const staggerItemH: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE_OUT_SOFT },
  },
};

// ─── CTA Banner (scaleIn + slight Y) ─────────────────────────────────────────
export const ctaBanner: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

// ─── Image Reveal (clip-path sweep) ──────────────────────────────────────────
export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.06 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.85, ease: EASE_OUT_EXPO },
  },
};

// ─── Shared viewport config ───────────────────────────────────────────────────
export const defaultViewport = { once: true, margin: "-80px" } as const;
