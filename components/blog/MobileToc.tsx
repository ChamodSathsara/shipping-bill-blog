"use client";

import React from "react";
import { ChevronDownIcon, ListIcon } from "lucide-react";
import type { TocItem } from "../../lib/types/site";

export function MobileToc({ items }: {items: TocItem[];}) {
  if (items.length === 0) return null;
  return (
    <details className="group rounded-xl border border-border bg-card lg:hidden">
      <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between gap-2 px-4 text-sm font-semibold text-foreground [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-2">
          <ListIcon className="h-4 w-4 text-primary" aria-hidden="true" />
          Table of contents
        </span>
        <ChevronDownIcon className="h-4 w-4 transition-transform duration-150 group-open:rotate-180" aria-hidden="true" />
      </summary>
      <ol className="border-t border-border px-4 py-3">
        {items.map((item) =>
        <li key={item.id}>
            <a href={`#${item.id}`} className={`block py-2 text-sm text-muted-foreground hover:text-foreground ${item.level === 3 ? "pl-4" : ""}`}>
              {item.text}
            </a>
          </li>
        )}
      </ol>
    </details>);

}