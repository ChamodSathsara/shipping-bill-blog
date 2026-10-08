"use client";

import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import type { Product } from "../../lib/types/product";
import { buttonVariants } from "../../lib/utils/buttonVariants";
import { Badge } from "../ui/Badge";
import { ProductIcon } from "./ProductIcon";
import { StatusBadge } from "./StatusBadge";

function KeywordList({ keywords }: {keywords: string[];}) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Main keywords">
      {keywords.slice(0, 4).map((k) =>
      <li key={k}>
          <Badge variant="outline" className="font-medium">{k}</Badge>
        </li>
      )}
    </ul>);

}

export function ProductsTable({ products }: {products: Product[];}) {
  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-xl border border-border md:block">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">All ShipKit products with summary, keywords and status</caption>
          <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <tr>
              <th scope="col" className="w-12 px-5 py-3">#</th>
              <th scope="col" className="px-5 py-3">Product</th>
              <th scope="col" className="px-5 py-3">Short summary</th>
              <th scope="col" className="px-5 py-3">Main keywords</th>
              <th scope="col" className="px-5 py-3">Status</th>
              <th scope="col" className="px-5 py-3"><span className="sr-only">Action</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {products.map((p, i) =>
            <tr key={p.slug} className="align-top">
                <td className="px-5 py-5 font-mono text-muted-foreground">{i + 1}</td>
                <th scope="row" className="px-5 py-5 font-normal">
                  <div className="flex items-center gap-3">
                    <ProductIcon icon={p.icon} className="h-10 w-10" />
                    <h2 className="font-display text-base font-bold text-foreground">{p.name}</h2>
                  </div>
                </th>
                <td className="max-w-xs px-5 py-5 leading-6 text-muted-foreground">{p.summary}</td>
                <td className="max-w-[16rem] px-5 py-5"><KeywordList keywords={p.keywords} /></td>
                <td className="px-5 py-5"><StatusBadge status={p.status} /></td>
                <td className="px-5 py-5 text-right">
                  <Link href={`/${p.slug}`} className={buttonVariants({ variant: "secondary", size: "sm" })} aria-label={`View ${p.name}`}>
                    View
                    <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <ol className="space-y-4 md:hidden">
        {products.map((p, i) =>
        <li key={p.slug} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <ProductIcon icon={p.icon} className="h-10 w-10" />
                <div>
                  <span className="font-mono text-xs text-muted-foreground">#{i + 1}</span>
                  <h2 className="font-display text-base font-bold text-foreground">{p.name}</h2>
                </div>
              </div>
              <StatusBadge status={p.status} />
            </div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{p.summary}</p>
            <div className="mt-4"><KeywordList keywords={p.keywords} /></div>
            <Link href={`/${p.slug}`} className={buttonVariants({ variant: "secondary", size: "md", className: "mt-5 w-full" })}>
              View {p.name}
            </Link>
          </li>
        )}
      </ol>
    </>);

}
