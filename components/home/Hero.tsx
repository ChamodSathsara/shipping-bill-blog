"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon, CheckIcon } from "lucide-react";
import { buttonVariants } from "../../lib/utils/buttonVariants";
import { capitalize } from "../../lib/utils/format";
import { homeKeyword } from "../../lib/utils/keywords";
import { Container } from "../ui/Container";
import { LabelMockup } from "./LabelMockup";

const trust = ["100% Free", "No Signup", "Works in Your Browser"];

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="overflow-hidden border-b border-border bg-surface">
      <Container className="grid items-center gap-14 py-16 md:py-20 lg:grid-cols-[1.15fr_1fr] lg:gap-12 lg:py-24">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}>
          <h1 id="hero-heading" className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
            <span className="text-primary">{capitalize(homeKeyword(0))}</span> and fulfillment tools for online sellers
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Create a {homeKeyword(1)}, generate a {homeKeyword(2)}, or resize carrier labels to 4x6 — built for Etsy, eBay, Amazon,
            Shopify and Poshmark sellers who ship from home.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/products" className={buttonVariants({ size: "lg" })}>
              Explore Free Tools
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/blog" className={buttonVariants({ variant: "secondary", size: "lg" })}>
              Read Guides
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2" aria-label="Why sellers use ShipKit">
            {trust.map((t) =>
            <li key={t} className="flex items-center gap-2 text-sm font-medium text-foreground">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent">
                  <CheckIcon className="h-3 w-3 text-accent-foreground" aria-hidden="true" />
                </span>
                {t}
              </li>
            )}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}>
          <LabelMockup />
        </motion.div>
      </Container>
    </section>);

}