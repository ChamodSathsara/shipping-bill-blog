"use client";

import React from "react";
import Link from "next/link";
import { Container } from "../ui/Container";

export function SeoTextBlock() {
  return (
    <section aria-labelledby="about-tools-heading" className="pb-20 pt-4">
      <Container>
        <div className="max-w-reading">
          <h2 id="about-tools-heading" className="font-display text-xl font-bold text-foreground">
            Free fulfillment and shipping tools for ecommerce
          </h2>
          <div className="mt-4 space-y-4 text-[15px] leading-7 text-muted-foreground">
            <p>
              ShipKit provides free shipping tools for online sellers who want professional results without paying for a full shipping platform. Our{" "}
              <Link href="/shipping-label-maker" className="font-medium text-primary hover:underline">shipping label maker</Link> creates printable
              4×6 labels for thermal printers.
            </p>
            <p>
              The <Link href="/packing-slip-generator" className="font-medium text-primary hover:underline">packing slip generator</Link> builds itemized slips with SKU and
              variant details. These ecommerce shipping tools support small-business order fulfillment while keeping the workflow simple.
            </p>
          </div>
        </div>
      </Container>
    </section>);

}
