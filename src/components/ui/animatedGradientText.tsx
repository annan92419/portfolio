"use client";

import { cn } from "@/lib/utils";
import { CSSProperties, ComponentPropsWithoutRef } from "react";

interface AnimatedGradientTextProps extends ComponentPropsWithoutRef<"span"> {
  speed?: number;
  colorFrom?: string;
  colorTo?: string;
}

export function AnimatedGradientText({
  children,
  className,
  speed = 3,
  colorFrom = "#3b82f6",
  colorTo = "#8b5cf6",
  ...props
}: AnimatedGradientTextProps) {
  return (
    <span
      style={
        {
          backgroundImage: `linear-gradient(90deg, ${colorFrom}, ${colorTo}, ${colorFrom})`,
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: `gradient-shift ${speed}s linear infinite`,
        } as CSSProperties
      }
      className={cn("inline-block", className)}
      {...props}
    >
      {children}
    </span>
  );
}
