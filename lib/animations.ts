import { stagger } from "motion/react";

/** Smooth ease-out curve for UI animations */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Standard animation duration in seconds */
export const DURATION_DEFAULT = 0.6;
export const DURATION_FAST = 0.3;

/** Container variants with staggered children animation from center */
export const staggerFromCenterVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: stagger(0.06, { from: "center" }),
    },
  },
};

/** Card fade-in with scale animation */
export const cardFadeInVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: DURATION_DEFAULT,
      ease: EASE_OUT_EXPO,
    },
  },
};

/** Simple fade-in with slide up */
export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION_DEFAULT,
      ease: EASE_OUT_EXPO,
    },
  },
};

/** Container variants with sequential stagger */
export const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: stagger(0.15),
    },
  },
};
