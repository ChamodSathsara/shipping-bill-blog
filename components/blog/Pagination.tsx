"use client";

import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { buttonVariants } from "../../lib/utils/buttonVariants";
import { cn } from "../../lib/utils/cn";

export function Pagination({ page, totalPages, onChange }: {page: number;totalPages: number;onChange: (page: number) => void;}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <nav aria-label="Blog pagination" className="flex items-center justify-between gap-4 border-t border-border pt-6">
      <button type="button" onClick={() => onChange(page - 1)} disabled={page <= 1} className={buttonVariants({ variant: "secondary", size: "sm" })}>
        <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
        Previous
      </button>
      <ul className="flex items-center gap-1">
        {pages.map((p) =>
        <li key={p}>
            <button
            type="button"
            onClick={() => onChange(p)}
            aria-current={p === page ? "page" : undefined}
            aria-label={`Page ${p}`}
            className={cn(
              buttonVariants({ variant: p === page ? "primary" : "ghost", size: "icon" }),
              "h-10 w-10"
            )}>
            
              {p}
            </button>
          </li>
        )}
      </ul>
      <button type="button" onClick={() => onChange(page + 1)} disabled={page >= totalPages} className={buttonVariants({ variant: "secondary", size: "sm" })}>
        Next
        <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
      </button>
    </nav>);

}