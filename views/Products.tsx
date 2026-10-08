"use client";

import React from "react";
import { AdSlot } from "../components/ads/AdSlot";
import { ProductsTable } from "../components/products/ProductsTable";
import { CtaBanner } from "../components/sections/CtaBanner";
import { PageHeader } from "../components/sections/PageHeader";
import { Container } from "../components/ui/Container";
import type { Product } from "../lib/types/product";
import { usePageMeta } from "../hooks/usePageMeta";

const products: Product[] = [
  {
    slug: "shipping-label-maker",
    name: "Shipping Label Maker",
    summary: "Create printable 4x6 shipping labels.",
    metaTitle: "Shipping Label Maker",
    metaDescription: "Create printable shipping labels.",
    keywords: [
      "shipping label maker",
      "4x6 shipping label maker",
      "printable shipping label",
    ],
    status: "live",
    icon: "label",
    highlights: [
      "4x6 thermal output",
      "Address and order fields",
      "PDF or print",
    ],
    longDescription: "Create clean printable shipping labels.",
    features: [],
    steps: [],
    seoContent: [],
    faqs: [],
  },
  {
    slug: "packing-slip-generator",
    name: "Packing Slip Generator",
    summary:
      "Generate A4 or A5 packing slips with products, SKU, quantity and variant details.",
    metaTitle: "Packing Slip Generator",
    metaDescription: "Create professional packing slips.",
    keywords: [
      "packing slip generator",
      "packing slip template",
      "printable packing slip",
    ],
    status: "live",
    icon: "slip",
    highlights: ["SKU and variants", "Shop details", "A4 and A5"],
    longDescription: "Build tidy packing slips for every parcel.",
    features: [],
    steps: [],
    seoContent: [],
    faqs: [],
  },
];

export function Products() {
  usePageMeta({
    title: "Free Shipping Tools for Online Sellers",
    description:
      "Free shipping label maker and packing slip generator for Etsy, eBay, Amazon and Shopify sellers. No signup required.",
    path: "/products",
    keywords: products.flatMap((p) => p.keywords.slice(0, 2)),
  });

  return (
    <>
      <PageHeader
        title="Free shipping tools for online sellers"
        description="Two focused tools for fulfillment: create shipping labels and generate packing slips. Both run in your browser and will be free to use."
        breadcrumbs={[{ label: "Products" }]}
      />

      <section aria-label="Product list" className="py-14">
        <Container>
          <ProductsTable products={products} />
        </Container>
      </section>
      <Container>
        <AdSlot slotId="products-after-list" format="horizontal" />
      </Container>
      <CtaBanner
        title="Want to know the day they launch?"
        description="Open any tool page and leave your email — we'll send one message when it goes live."
        primary={{
          label: "Shipping Label Maker",
          href: "/products/shipping-label-maker",
        }}
        secondary={{ label: "Contact us", href: "/contact-us" }}
      />
    </>
  );
}
