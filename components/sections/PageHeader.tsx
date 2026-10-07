"use client";

import React from "react";
import type { BreadcrumbItem } from "../../lib/types/site";
import { Breadcrumbs } from "../ui/Breadcrumbs";
import { Container } from "../ui/Container";

export function PageHeader({
  title,
  description,
  breadcrumbs,
  children





}: {title: string;description: string;breadcrumbs: BreadcrumbItem[];children?: React.ReactNode;}) {
  return (
    <section className="border-b border-border bg-surface">
      <Container className="py-12 md:py-16">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="mt-6 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{description}</p>
        {children}
      </Container>
    </section>);

}