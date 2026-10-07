"use client";

import React from "react";
import { products } from "../../lib/products";
import { capitalize } from "../../lib/utils/format";
import { homeKeyword } from "../../lib/utils/keywords";
import { ProductSummaryCard } from "../products/ProductSummaryCard";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

export function ToolsSummary() {
  return (
    <section aria-labelledby="tools-heading" className="py-20">
      <Container>
        <SectionHeading
          id="tools-heading"
          title="Three free tools for every parcel you ship"
          description={`${capitalize(homeKeyword(2))}, label maker and 4x6 resizer — launching soon, free forever.`} />
        
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {products.map((p) =>
          <ProductSummaryCard key={p.slug} product={p} />
          )}
        </div>
      </Container>
    </section>);

}