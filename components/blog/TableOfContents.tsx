"use client";

import React from "react";
import { useActiveHeading } from "../../lib/utils/useActiveHeading";
import type { TocItem } from "../../lib/types/site";
import { cn } from "../../lib/utils/cn";

export function TableOfContents({ items, title = "On this page" }: {items: TocItem[];title?: string;}) {
  const active = useActiveHeading(items.map((i) => i.id));
  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <ol className="mt-3 border-l border-border">
        {items.map((item) =>
        <li key={item.id}>
            <a
            href={`#${item.id}`}
            aria-current={active === item.id ? "location" : undefined}
            className={cn(
              "-ml-px block border-l-2 py-1.5 text-sm leading-snug transition-colors duration-150",
              item.level === 3 ? "pl-7" : "pl-4",
              active === item.id ?
              "border-primary font-medium text-primary" :
              "border-transparent text-muted-foreground hover:text-foreground"
            )}>
            
              {item.text}
            </a>
          </li>
        )}
      </ol>
    </nav>);

}
