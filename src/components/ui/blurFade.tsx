"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  yOffset?: number;
  blur?: string;
}

export function BlurFade({
  children,
  className,
  duration = 0.5,
  delay = 0,
  yOffset = 8,
  blur = "8px",
}: BlurFadeProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ y: yOffset, opacity: 0, filter: `blur(${blur})` }}
      animate={
        inView
          ? { y: 0, opacity: 1, filter: "blur(0px)" }
          : { y: yOffset, opacity: 0, filter: `blur(${blur})` }
      }
      transition={{ duration, delay, ease: "easeOut" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
