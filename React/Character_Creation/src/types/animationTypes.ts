import { Variants } from 'framer-motion';

// Animation intensity options for use in components
export type AnimationIntensity = 'low' | 'medium' | 'high';

// Animation type options for the avatar component
export type AvatarAnimationType = 'pulse' | 'float' | 'bounce' | 'glow' | 'shake' | 'spin';

// Configuration for animated avatar
export interface AvatarAnimationConfig {
  type: AvatarAnimationType;
  intensity: AnimationIntensity;
  highlight?: boolean;
}

// Configuration for animated card
export interface CardAnimationConfig {
  elevation: 'low' | 'medium' | 'high';
  animation: 'fade' | 'slide' | 'zoom' | 'bounce';
  gradient?: boolean;
  interactive?: boolean;
  colorScheme?: string;
}

// Container animation variants for lists
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

// List item variants for animated lists
export const listItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * index,
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  }),
  hover: {
    scale: 1.02,
    backgroundColor: "rgba(0, 0, 0, 0.07)",
    transition: { duration: 0.2 }
  },
};

// Button animation variants
export const buttonVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

// Text reveal animation variants
export const textRevealVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Fade in animation variants
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

// Scale in animation variants
export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};