"use client";

import React from "react";
import Link from "next/link";
import { ArrowRightIcon, CheckIcon } from "lucide-react";
import type { Product } from "../../lib/types/product";
import { ProductIcon } from "./ProductIcon";
import { StatusBadge } from "./StatusBadge";

export function ProductSummaryCard({ product, headingLevel = "h3" }: {product: Product;headingLevel?: "h2" | "h3";}) {
  const Heading = headingLevel;
  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-colors duration-150 hover:border-primary/40">
      <div className="flex items-start justify-between gap-3">
        <ProductIcon icon={product.icon} />
        <StatusBadge status={product.status} />
      </div>
      <Heading className="mt-5 font-display text-xl font-bold text-foreground">
        <Link href={`/${product.slug}`} className="after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring">
          {product.name}
        </Link>
      </Heading>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{product.longDescription}</p>
      <ul className="mt-5 space-y-2">
        {product.highlights.map((h) =>
        <li key={h} className="flex gap-2 text-sm text-foreground">
            <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            {h}
          </li>
        )}
      </ul>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-primary">
        Learn More
        <ArrowRightIcon className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </article>);

}
