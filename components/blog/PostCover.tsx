"use client";

import React from "react";
import { BoxIcon, PrinterIcon, StoreIcon, TagIcon } from "lucide-react";
import type { BlogCategory } from "../../lib/types/blog";
import { getCategoryCover } from "../../lib/utils/blog";
import { cn } from "../../lib/utils/cn";

const categoryIcons: Record<BlogCategory, typeof TagIcon> = {
  "Shipping Labels": TagIcon,
  "Packing & Fulfillment": BoxIcon,
  "Marketplace Guides": StoreIcon,
  "Printers & Hardware": PrinterIcon
};

// Placeholder cover. Swap for <img> with real artwork (and alt text) when available.
export function PostCover({ category, title, className }: {category: BlogCategory;title: string;className?: string;}) {
  const Icon = categoryIcons[category];
  return (
    <div role="img" aria-label={`Cover illustration for ${title}`} className={cn("relative flex items-end overflow-hidden", getCategoryCover(category), className)}>
      <Icon className="absolute -right-4 -top-4 h-32 w-32 text-white/15" strokeWidth={1.25} aria-hidden="true" />
      <Icon className="m-5 h-7 w-7 text-white/90" aria-hidden="true" />
    </div>);

}