'use client';

import { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';

interface MotionWrapperProps extends MotionProps {
  children: ReactNode;
  className?: string;
}

export function MotionFade({
  children,
  className,
  ...motionProps
}: MotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

export function MotionSlideLeft({
  children,
  className,
  ...motionProps
}: MotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

export function MotionSlideRight({
  children,
  className,
  ...motionProps
}: MotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

export function MotionSlideUp({
  children,
  className,
  ...motionProps
}: MotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

export function MotionHeader({ children, ...motionProps }: MotionWrapperProps) {
  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      {...motionProps}
    >
      {children}
    </motion.header>
  );
}

export function MotionButton({
  children,
  className,
  ...motionProps
}: MotionWrapperProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

export function MotionGroup({
  children,
  staggerChildren = 0.1,
  ...motionProps
}: MotionWrapperProps & { staggerChildren?: number }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren,
          },
        },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

export function MotionItem({
  children,
  className,
  delay = 0,
  ...motionProps
}: MotionWrapperProps & { delay?: number }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay,
          },
        },
      }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
