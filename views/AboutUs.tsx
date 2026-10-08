"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRightIcon,
  HeartHandshakeIcon,
  LockIcon,
  MessageSquareTextIcon,
  PrinterIcon,
} from "lucide-react";
import { ProductIcon } from "../components/products/ProductIcon";
import { StatusBadge } from "../components/products/StatusBadge";
import { CtaBanner } from "../components/sections/CtaBanner";
import { PageHeader } from "../components/sections/PageHeader";
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { aboutStats, aboutValues } from "../lib/aboutContent";
import { siteConfig } from "../lib/siteConfig";
import { usePageMeta } from "../hooks/usePageMeta";

const valueIcons = {
  free: HeartHandshakeIcon,
  privacy: LockIcon,
  craft: PrinterIcon,
  plain: MessageSquareTextIcon,
};
const products = [
  {
    slug: "shipping-label-maker",
    name: "Shipping Label Maker",
    icon: "label" as const,
    status: "live" as const,
    longDescription: "Create clean printable 4x6 shipping labels.",
  },
  {
    slug: "packing-slip-generator",
    name: "Packing Slip Generator",
    icon: "slip" as const,
    status: "live" as const,
    longDescription:
      "Build A4 or A5 packing slips with SKU, quantities and variants.",
  },
];

export function AboutUs() {
  usePageMeta({
    title: "About Us – Free Tools Built by Sellers",
    description: `${siteConfig.name} builds free, private shipping tools for small online sellers. Learn about our mission, story and the values behind our tools.`,
    path: "/about-us",
  });

  return (
    <>
      <PageHeader
        title="Shipping tools built by people who've packed the boxes"
        description={`${siteConfig.name} exists so small sellers can ship like the big ones — without monthly fees, accounts or handing over customer data.`}
        breadcrumbs={[{ label: "About Us" }]}
      />

      <section aria-labelledby="mission-heading" className="py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <h2
            id="mission-heading"
            className="font-display text-sm font-bold text-primary"
          >
            Our mission
          </h2>
          <p className="font-display text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl">
            Make the printing side of fulfillment — labels and packing slips —
            free, fast and private for every independent seller.
          </p>
        </Container>
      </section>

      <section
        aria-labelledby="story-heading"
        className="border-y border-border bg-surface py-20"
      >
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading id="story-heading" title="Our story" />
          <div className="max-w-reading space-y-5 text-[1.0625rem] leading-8 text-foreground/85">
            <p>
              {siteConfig.name} started at a kitchen table covered in poly
              mailers. Our founders were running a small Etsy shop and an eBay
              resale side business, and every week they lost hours fighting
              full-page carrier PDFs, cramped marketplace packing slips and
              label tools that wanted a subscription.
            </p>
            <p>
              So we built the simple versions we wished existed: a label maker
              that just prints and a packing slip generator with room for
              variants. Everything runs in your browser, and everything is free.
            </p>
            <p>
              We fund the work with a small number of clearly labelled ads —
              never inside the tools themselves — and we publish practical
              guides so new sellers can skip the mistakes we made.
            </p>
          </div>
        </Container>
      </section>

      <section aria-label="ShipKit at a glance" className="py-16">
        <Container>
          <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
            {aboutStats.map((s) => (
              <div key={s.label} className="border-l border-border pl-5">
                <dt className="text-sm text-muted-foreground">{s.label}</dt>
                <dd className="mt-1 font-display text-4xl font-extrabold tracking-tight text-foreground">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section
        aria-labelledby="values-heading"
        className="border-t border-border py-20"
      >
        <Container>
          <SectionHeading id="values-heading" title="What we stand for" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {aboutValues.map((v) => {
              const Icon = valueIcons[v.icon];
              return (
                <div
                  key={v.title}
                  className="rounded-xl border border-border bg-card p-6"
                >
                  <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="offer-heading"
        className="border-t border-border bg-surface py-20"
      >
        <Container>
          <SectionHeading
            id="offer-heading"
            title="What we offer"
            description="Two focused tools today, with more on the way based on seller feedback."
          />
          <ul className="mt-10 divide-y divide-border border-y border-border">
            {products.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  className="group flex items-center gap-4 py-5 transition-colors duration-150 hover:bg-card sm:px-3"
                >
                  <ProductIcon icon={p.icon} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-lg font-bold text-foreground">
                        {p.name}
                      </h3>
                      <StatusBadge status={p.status} />
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {p.longDescription}
                    </p>
                  </div>
                  <ArrowRightIcon
                    className="hidden h-5 w-5 shrink-0 text-primary transition-transform duration-150 ease-out group-hover:translate-x-0.5 sm:block"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBanner
        title="See what we're building"
        description="Browse the tools, or tell us what would save you the most time."
        primary={{ label: "Explore Free Tools", href: "/products" }}
        secondary={{ label: "Contact us", href: "/contact-us" }}
      />
    </>
  );
}
