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
      
      <img src="/logo.png" alt="" className="h-10 w-10 object-contain" aria-hidden="true" />
      <span className="font-display text-xl font-extrabold tracking-tight text-foreground">{siteConfig.name}</span>
    </Link>);

}
