"use client";

import React from "react";
import Link from "next/link";
import { ArrowRightIcon, CookieIcon, ScaleIcon, ShieldCheckIcon } from "lucide-react";
import { PageHeader } from "../components/sections/PageHeader";
import { Container } from "../components/ui/Container";
import { policies } from "../lib/policies";
import { usePageMeta } from "../hooks/usePageMeta";
import { formatDate } from "../lib/utils/format";

const icons: Record<string, typeof ShieldCheckIcon> = {
  "privacy-policy": ShieldCheckIcon,
  "terms-of-service": ScaleIcon,
  "cookie-policy": CookieIcon
};

export function PolicyHub() {
  usePageMeta({
    title: "Policies – Privacy, Terms & Cookies",
    description: "Read ShipKit's Privacy Policy, Terms of Service and Cookie Policy, including how Google AdSense advertising and cookies are used.",
    path: "/policy"
  });

  return (
    <>
      <PageHeader
        title="Policies"
        description="Plain-language documents explaining how our free tools work, what data we handle and how advertising keeps the site free."
        breadcrumbs={[{ label: "Policy" }]} />
      
      <Container className="py-14">
        <ul className="grid gap-6 md:grid-cols-3">
          {policies.map((p) => {
            const Icon = icons[p.slug] ?? ShieldCheckIcon;
            return (
              <li key={p.slug}>
                <article className="group relative flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-colors duration-150 hover:border-primary/40">
                  <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  <h2 className="mt-4 font-display text-xl font-bold text-foreground">
                    <Link href={`/policy/${p.slug}`} className="after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring">
                      {p.title}
                    </Link>
                  </h2>
                  <p className="mt-2 leading-7 text-muted-foreground">{p.summary}</p>
                  <div className="mt-auto flex items-center justify-between pt-6 text-sm">
                    <span className="text-muted-foreground">Updated {formatDate(p.lastUpdated)}</span>
                    <ArrowRightIcon className="h-4 w-4 text-primary transition-transform duration-150 ease-out group-hover:translate-x-0.5" aria-hidden="true" />
                  </div>
                </article>
              </li>);

          })}
        </ul>
      </Container>
    </>);

}