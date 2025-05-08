"use client";

import { HTMLMotionProps, motion as framerMotion } from "framer-motion";

// Re-export framer-motion with the name "motion"
export const motion = framerMotion;

// Define common animation variants
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

export const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface AnimatedComponentProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
}

// Pre-configured animation components
export function FadeIn({ 
  children, 
  delay = 0, 
  ...props 
}: AnimatedComponentProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.5, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function SlideUp({ 
  children, 
  delay = 0, 
  ...props 
}: AnimatedComponentProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={slideUp}
      transition={{ duration: 0.5, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ 
  children, 
  delay = 0, 
  ...props 
}: AnimatedComponentProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerChildren}
      transition={{ duration: 0.5, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}