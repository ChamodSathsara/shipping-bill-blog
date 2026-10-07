"use client";

import React from "react";
import type { Product } from "../../lib/types/product";
import { capitalize } from "../../lib/utils/format";
import { homeKeyword } from "../../lib/utils/keywords";
import { ProductSummaryCard } from "../products/ProductSummaryCard";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

const products: Product[] = [
  { slug: "shipping-label-maker", name: "Shipping Label Maker", summary: "Create printable 4x6, A4 and Letter shipping labels.", metaTitle: "Shipping Label Maker", metaDescription: "Create printable shipping labels.", keywords: ["shipping label maker", "4x6 shipping label"], status: "coming-soon", icon: "label", highlights: ["4x6 thermal output", "Address fields", "PDF download"], longDescription: "Create clean printable shipping labels.", features: [], steps: [], seoContent: [], faqs: [] },
  { slug: "packing-slip-generator", name: "Packing Slip Generator", summary: "Create packing slips with SKU, quantities and variants.", metaTitle: "Packing Slip Generator", metaDescription: "Create printable packing slips.", keywords: ["packing slip generator", "packing slip template"], status: "coming-soon", icon: "slip", highlights: ["SKU and variants", "Shop details", "Multiple paper sizes"], longDescription: "Build tidy packing slips for every parcel.", features: [], steps: [], seoContent: [], faqs: [] },
];

export function ToolsSummary() {
  return (
    <section aria-labelledby="tools-heading" className="py-20">
      <Container>
        <SectionHeading
          id="tools-heading"
          title="Two free tools for every parcel you ship"
          description={`${capitalize(homeKeyword(2))} and a printable label maker — launching soon, free forever.`} />
        
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {products.map((p) =>
          <ProductSummaryCard key={p.slug} product={p} />
          )}
        </div>
      </Container>
    </section>);

}
