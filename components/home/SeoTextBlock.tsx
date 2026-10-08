"use client";

import React from "react";
import Link from "next/link";
import { homeKeyword } from "../../lib/utils/keywords";
import { Container } from "../ui/Container";

export function SeoTextBlock() {
  return (
    <section aria-labelledby="about-tools-heading" className="pb-20 pt-4">
      <Container>
        <div className="max-w-reading">
          <h2 id="about-tools-heading" className="font-display text-xl font-bold text-foreground">
            About these free tools
          </h2>
          <div className="mt-4 space-y-4 text-[15px] leading-7 text-muted-foreground">
            <p>
              ShipKit is a growing set of {homeKeyword(4)} who want professional results without paying for a full shipping platform. Our{" "}
              <Link href="/shipping-label-maker" className="font-medium text-primary hover:underline">{homeKeyword(0)}</Link> creates a clean{" "}
              {homeKeyword(1)} sized for 4x6 thermal labels or regular paper.
            </p>
            <p>
              The <Link href="/packing-slip-generator" className="font-medium text-primary hover:underline">{homeKeyword(2)}</Link> builds itemized slips with SKU and
              variant details. Every tool runs in your browser, so customer data stays on your device.
            </p>
          </div>
        </div>
      </Container>
    </section>);

}
