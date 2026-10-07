"use client";

import React from "react";
import type { Product } from "../../lib/types/product";
import { PackingSlipGenerator } from "./PackingSlipGenerator";
import { ShippingLabelMaker } from "./ShippingLabelMaker";

// Maps product slugs to their tool component. Add an entry when you create a new tool.
const toolRegistry: Record<string, React.ComponentType> = {
  "shipping-label-maker": ShippingLabelMaker,
  "packing-slip-generator": PackingSlipGenerator
};

// The tool area. Never place ads inside this container.
export function ToolContainer({ product }: {product: Product;}) {
  const Tool = toolRegistry[product.slug];
  return (
    <section aria-label={`${product.name} tool`} className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
      {Tool ? <Tool /> : <p className="text-sm text-muted-foreground">This tool is not available yet.</p>}
    </section>);

}
