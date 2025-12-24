import { Variants } from "framer-motion";

/**
 * Framer Motion Animation Variants Library
 * Provides reusable animation patterns for consistent UI interactions
 */

// ============================================
// PAGE TRANSITIONS
// ============================================

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

// ============================================
// CARD ANIMATIONS
// ============================================

export const cardHover: Variants = {
  initial: {
    scale: 1,
    y: 0,
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  hover: {
    scale: 1.02,
    y: -8,
    boxShadow: "0 20px 40px rgba(64,191,255,0.2)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export const cardPress: Variants = {
  tap: { scale: 0.98, transition: { duration: 0.1 } },
};

// ============================================
// BUTTON INTERACTIONS
// ============================================

export const buttonHover: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95, transition: { duration: 0.1 } },
};

export const buttonTap = {
  tap: { scale: 0.95, transition: { duration: 0.1 } },
};

export const iconButton: Variants = {
  initial: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.9, transition: { duration: 0.1 } },
};

// ============================================
// STAGGER ANIMATIONS
// ============================================

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export const staggerItemFast: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

// ============================================
// MODAL / DIALOG ANIMATIONS
// ============================================

export const modalBackdrop: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const modalContent: Variants = {
  initial: { opacity: 0, scale: 0.9, y: 20 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: { duration: 0.2 },
  },
};

export const slideFromRight: Variants = {
  initial: { x: "100%" },
  animate: { x: 0, transition: { type: "spring", damping: 25 } },
  exit: { x: "100%", transition: { duration: 0.3 } },
};

export const slideFromLeft: Variants = {
  initial: { x: "-100%" },
  animate: { x: 0, transition: { type: "spring", damping: 25 } },
  exit: { x: "-100%", transition: { duration: 0.3 } },
};

export const slideFromBottom: Variants = {
  initial: { y: "100%" },
  animate: { y: 0, transition: { type: "spring", damping: 25 } },
  exit: { y: "100%", transition: { duration: 0.3 } },
};

// ============================================
// SPECIAL EFFECTS
// ============================================

export const shimmer: Variants = {
  initial: { backgroundPosition: "-200% 0" },
  animate: {
    backgroundPosition: "200% 0",
    transition: { duration: 2, repeat: Infinity, ease: "linear" },
  },
};

export const pulse: Variants = {
  initial: { scale: 1, opacity: 1 },
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: { duration: 2, repeat: Infinity },
  },
};

export const badgePulse: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.2, 1],
    transition: { duration: 1.5, repeat: Infinity },
  },
};

export const float: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 0, -10],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

export const rotate: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: { duration: 20, repeat: Infinity, ease: "linear" },
  },
};

// ============================================
// LOADING ANIMATIONS
// ============================================

export const spinner: Variants = {
  animate: {
    rotate: 360,
    transition: { duration: 1, repeat: Infinity, ease: "linear" },
  },
};

export const dots: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// ============================================
// BADGE / TAG ANIMATIONS
// ============================================

export const badgeAppear: Variants = {
  initial: { scale: 0, rotate: -12 },
  animate: {
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 200, damping: 15 },
  },
  exit: { scale: 0, rotate: 12, transition: { duration: 0.2 } },
};

export const tagSlide: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
};

// ============================================
// HOVER GLOW EFFECT
// ============================================

export const glowOnHover: Variants = {
  initial: {
    boxShadow: "0 0 0 rgba(64,191,255,0)",
  },
  hover: {
    boxShadow: "0 0 20px rgba(64,191,255,0.5)",
    transition: { duration: 0.3 },
  },
};

// ============================================
// LIST ITEM ANIMATIONS
// ============================================

export const listItem: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

export const listItemHover: Variants = {
  initial: { x: 0 },
  hover: { x: 4, transition: { duration: 0.2 } },
};

// ============================================
// SUCCESS / ERROR ANIMATIONS
// ============================================

export const successPop: Variants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: [0, 1.2, 1],
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const shake: Variants = {
  animate: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.5 },
  },
};

// ============================================
// IMAGE ANIMATIONS
// ============================================

export const imageZoom: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.1, transition: { duration: 0.4 } },
};

export const imageReveal: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

// ============================================
// NOTIFICATION / TOAST
// ============================================

export const notificationSlide: Variants = {
  initial: { x: 400, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
  exit: {
    x: 400,
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

// ============================================
// TAB ANIMATIONS
// ============================================

export const tabContent: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

// ============================================
// ACCORDION / COLLAPSE
// ============================================

export const accordionContent: Variants = {
  initial: { height: 0, opacity: 0 },
  animate: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

// ============================================
// SKELETON LOADING
// ============================================

export const skeletonPulse: Variants = {
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
  },
};

// ============================================
// EXPORT ALL AS DEFAULT
// ============================================

const animations = {
  pageTransition,
  fadeIn,
  cardHover,
  cardPress,
  buttonHover,
  buttonTap,
  iconButton,
  staggerContainer,
  staggerItem,
  staggerItemFast,
  modalBackdrop,
  modalContent,
  slideFromRight,
  slideFromLeft,
  slideFromBottom,
  shimmer,
  pulse,
  badgePulse,
  float,
  rotate,
  spinner,
  dots,
  badgeAppear,
  tagSlide,
  glowOnHover,
  listItem,
  listItemHover,
  successPop,
  shake,
  imageZoom,
  imageReveal,
  notificationSlide,
  tabContent,
  accordionContent,
  skeletonPulse,
};

export default animations;
