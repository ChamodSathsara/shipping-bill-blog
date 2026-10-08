"use client";

import React from "react";
import Link from "next/link";
import { ExternalLinkIcon, TriangleAlertIcon } from "lucide-react";
import { MobileToc } from "../components/blog/MobileToc";
import { TableOfContents } from "../components/blog/TableOfContents";
import { Breadcrumbs } from "../components/ui/Breadcrumbs";
import { Container } from "../components/ui/Container";
import { policies } from "../lib/policies";
import type { TocItem } from "../lib/types/site";
import { formatDate } from "../lib/utils/format";
import { NotFound } from "./NotFound";

export function PolicyPage({ slug }: { slug: string }) {
  const policy = policies.find((p) => p.slug === slug);

  if (!policy) return <NotFound />;

  const toc: TocItem[] = policy.sections.map((s) => ({ id: s.id, text: s.heading, level: 2 }));
  const others = policies.filter((p) => p.slug !== policy.slug);

  return (
    <Container className="py-10 md:py-14">
      <Breadcrumbs items={[{ label: "Policy", href: "/policy" }, { label: policy.title }]} />
      <div className="mt-8 grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside aria-label="Policy navigation" className="hidden lg:block">
          <div className="sticky top-24 space-y-8">
            <TableOfContents items={toc} title="Sections" />
            <nav aria-label="Other policies">
              <p className="text-sm font-semibold text-foreground">Other policies</p>
              <ul className="mt-2 space-y-1">
                {others.map((p) =>
                <li key={p.slug}>
                    <Link href={`/policy/${p.slug}`} className="text-sm text-muted-foreground hover:text-foreground">{p.title}</Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </aside>

        <article className="min-w-0 max-w-reading">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-foreground">{policy.title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Last updated <time dateTime={policy.lastUpdated}>{formatDate(policy.lastUpdated)}</time>
          </p>

          <div role="note" className="mt-6 flex gap-3 rounded-lg border border-warning-foreground/20 bg-warning px-4 py-3 text-sm text-warning-foreground">
            <TriangleAlertIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <p><strong>REPLACE WITH REAL POLICY.</strong> This is placeholder text for layout purposes and is not legal advice.</p>
          </div>

          <div className="mt-6"><MobileToc items={toc} /></div>

          {policy.sections.map((section) =>
          <section key={section.id} aria-labelledby={section.id} className="mt-10">
              <h2 id={section.id} className="scroll-mt-24 font-display text-2xl font-bold tracking-tight text-foreground">{section.heading}</h2>
              {section.paragraphs.map((p) =>
            <p key={p.slice(0, 40)} className="mt-4 leading-8 text-foreground/85">{p}</p>
            )}
              {section.links &&
            <ul className="mt-4 space-y-2">
                  {section.links.map((l) =>
              <li key={l.href}>
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-primary underline-offset-2 hover:underline">
                        {l.label}
                        <ExternalLinkIcon className="h-3.5 w-3.5" aria-hidden="true" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </li>
              )}
                </ul>
            }
            </section>
          )}
        </article>
      </div>
    </Container>);

}
