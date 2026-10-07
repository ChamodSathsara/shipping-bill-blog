"use client";

import React from "react";
import { CropIcon, FileTextIcon, TagIcon } from "lucide-react";
import type { ProductIconKey } from "../../lib/types/product";
import { cn } from "../../lib/utils/cn";

const icons = { label: TagIcon, slip: FileTextIcon, resize: CropIcon };

export function ProductIcon({ icon, className }: {icon: ProductIconKey;className?: string;}) {
  const Icon = icons[icon];
  return (
    <span className={cn("inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground", className)}>
      <Icon className="h-5 w-5" aria-hidden="true" />
    </span>);

}