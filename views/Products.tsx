"use client";

import React from "react";
import { AdSlot } from "../components/ads/AdSlot";
import { ProductsTable } from "../components/products/ProductsTable";
import { CtaBanner } from "../components/sections/CtaBanner";
import { PageHeader } from "../components/sections/PageHeader";
import { Container } from "../components/ui/Container";
import { products } from "../lib/products";
import { usePageMeta } from "../hooks/usePageMeta";

export function Products() {
  usePageMeta({
    title: "Free Shipping Tools for Online Sellers",
    description: "Free shipping label maker, packing slip generator and 4x6 label resizer for Etsy, eBay, Amazon and Shopify sellers. No signup required.",
    path: "/products",
    keywords: products.flatMap((p) => p.keywords.slice(0, 2))
  });

  return (
    <>
      <PageHeader
        title="Free shipping tools for online sellers"
        description="Three focused tools that cover the printing side of fulfillment: make shipping labels, generate packing slips and resize carrier labels to 4x6. Each runs in your browser and will be free to use."
        breadcrumbs={[{ label: "Products" }]} />
      
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
        primary={{ label: "Shipping Label Maker", href: "/products/shipping-label-maker" }}
        secondary={{ label: "Contact us", href: "/contact-us" }} />
      
    </>);

}