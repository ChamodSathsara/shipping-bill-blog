"use client";

import React from "react";
import { cn } from "../../lib/utils/cn";

type BadgeVariant = "accent" | "outline" | "soon" | "live";

const variants: Record<BadgeVariant, string> = {
  accent: "bg-accent text-accent-foreground",
  outline: "border border-border bg-card text-muted-foreground",
  soon: "bg-warning text-warning-foreground",
  live: "bg-primary text-primary-foreground"
};

export function Badge({
  variant = "accent",
  className,
  children




}: {variant?: BadgeVariant;className?: string;children: React.ReactNode;}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variants[variant],
        className
      )}>
      
      {children}
    </span>);

}