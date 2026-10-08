"use client";

import React from "react";
import Link from "next/link";
import { footerColumns } from "../../lib/navigation";
import { siteConfig } from "../../lib/siteConfig";
import { Container } from "../ui/Container";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Free, browser-based shipping and fulfillment tools for Etsy, eBay, Amazon, Shopify and Poshmark sellers.
          </p>
          <a href={`mailto:${siteConfig.email}`} className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
            {siteConfig.email}
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="me noopener noreferrer"
            className="mt-2 block text-sm font-medium text-primary hover:underline"
          >
            Chamod Sathsara on LinkedIn
          </a>
        </div>
        {footerColumns.map((col) =>
        <nav key={col.title} aria-label={col.title}>
            <h2 className="text-sm font-semibold text-foreground">{col.title}</h2>
            <ul className="mt-3 space-y-1">
              {col.links.map((link) =>
            <li key={link.href}>
                  <Link href={link.href} className="inline-flex min-h-[36px] items-center text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
            )}
            </ul>
          </nav>
        )}
      </Container>
      <div className="border-t border-border">
        <Container className="flex flex-col gap-2 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Made for online sellers</p>
        </Container>
      </div>
    </footer>);

}
