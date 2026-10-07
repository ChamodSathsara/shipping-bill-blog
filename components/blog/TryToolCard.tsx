"use client";

import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import type { Product } from "../../lib/types/product";
import { buttonVariants } from "../../lib/utils/buttonVariants";
import { cn } from "../../lib/utils/cn";
import { ProductIcon } from "../products/ProductIcon";
import { StatusBadge } from "../products/StatusBadge";

export function TryToolCard({ product, className }: {product: Product;className?: string;}) {
  const live = product.status === "live";
  return (
    <aside aria-label={`Try the ${product.name}`} className={cn("rounded-xl border border-primary/30 bg-accent/60 p-5 sm:p-6", className)}>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <ProductIcon icon={product.icon} className="bg-card" />
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-display text-base font-bold text-foreground">Try the free {product.name}</p>
            <StatusBadge status={product.status} />
          </div>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{product.longDescription}</p>
        </div>
        <Link href={`/products/${product.slug}`} className={buttonVariants({ size: "md", className: "shrink-0" })}>
          {live ? "Open tool" : "Learn more"}
          <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </aside>);

}