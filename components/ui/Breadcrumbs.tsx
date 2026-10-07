"use client";

import React from "react";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import { JsonLd } from "../seo/JsonLd";
import { siteConfig } from "../../lib/siteConfig";
import type { BreadcrumbItem } from "../../lib/types/site";

// Renders visible breadcrumbs plus BreadcrumbList JSON-LD. "Home" is prepended automatically.
export function Breadcrumbs({ items }: {items: BreadcrumbItem[];}) {
  const all: BreadcrumbItem[] = [{ label: "Home", href: "/" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${siteConfig.url}${item.href}` } : {})
    }))
  };

  return (
    <nav aria-label="Breadcrumb">
      <JsonLd data={jsonLd} />
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        {all.map((item, i) => {
          const last = i === all.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1">
              {item.href && !last ?
              <Link href={item.href} className="rounded-sm py-1 transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  {item.label}
                </Link> :

              <span aria-current={last ? "page" : undefined} className="py-1 font-medium text-foreground">
                  {item.label}
                </span>
              }
              {!last && <ChevronRightIcon aria-hidden="true" className="h-3.5 w-3.5" />}
            </li>);

        })}
      </ol>
    </nav>);

}