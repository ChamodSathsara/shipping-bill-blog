"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "../../lib/siteConfig";
import { cn } from "../../lib/utils/cn";

export function Logo({ className, inverted = false }: {className?: string;inverted?: boolean;}) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} home`}
      className={cn("inline-flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className)}>
      
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
        <rect width="32" height="32" rx="8" className={inverted ? "fill-primary-foreground" : "fill-primary"} />
        <path d="M8 11.5 16 7l8 4.5v9L16 25l-8-4.5v-9Z" fill="none" strokeWidth="2" strokeLinejoin="round" className={inverted ? "stroke-primary" : "stroke-primary-foreground"} />
        <path d="M8 11.5 16 16l8-4.5M16 16v9" fill="none" strokeWidth="2" strokeLinejoin="round" className={inverted ? "stroke-primary" : "stroke-primary-foreground"} />
      </svg>
      <span className="font-display text-xl font-extrabold tracking-tight text-foreground">{siteConfig.name}</span>
    </Link>);

}