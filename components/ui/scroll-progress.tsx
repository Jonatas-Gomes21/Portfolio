"use client";

import { motion, useScroll, type MotionProps } from "motion/react";

import { cn } from "@/lib/utils";

interface ScrollProgressProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {
  ref?: React.Ref<HTMLDivElement>;
}

export function ScrollProgress({ className, ref, ...props }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-[55] h-1 origin-left bg-linear-to-r from-accent to-[#3b82f6]",
        className,
      )}
      style={{ scaleX: scrollYProgress }}
      {...props}
    />
  );
}
