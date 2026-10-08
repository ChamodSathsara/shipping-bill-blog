"use client";

import React from "react";
import type { Product } from "../../lib/types/product";
import { ToolContainer } from "../tools/ToolContainer";
import { Breadcrumbs } from "../ui/Breadcrumbs";
import { Container } from "../ui/Container";
import { NotifyForm } from "./NotifyForm";
import { ProductIcon } from "./ProductIcon";
import { StatusBadge } from "./StatusBadge";
import { ToolPreviewMock } from "./ToolPreviewMock";

// status === "coming-soon" → blurred preview + notify form.
// status === "live"        → the real tool mounts full-width in <ToolContainer />.
export function ProductHero({ product }: {product: Product;}) {
  const comingSoon = product.status === "coming-soon";

  return (
    <section aria-labelledby="product-heading" className="border-b border-border bg-surface">
      <Container className="py-10 md:py-14">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: product.name }]} />
        <div className={comingSoon ? "mt-8 grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]" : "mt-8"}>
          <div>
            <div className="flex items-center gap-3">
              <ProductIcon icon={product.icon} />
              <StatusBadge status={product.status} className="px-3 py-1 text-sm" />
            </div>
            <h1 id="product-heading" className="mt-5 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">{product.summary}</p>
            {comingSoon &&
            <div className="mt-8">
                <NotifyForm productSlug={product.slug} productName={product.name} />
              </div>
            }
          </div>
          {comingSoon ?
          <ToolPreviewMock icon={product.icon} name={product.name} /> :

          <div className="mt-10">
              <ToolContainer product={product} />
            </div>
          }
        </div>
      </Container>
    </section>);

}
