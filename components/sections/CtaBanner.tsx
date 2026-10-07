"use client";

import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { buttonVariants } from "../../lib/utils/buttonVariants";
import { Container } from "../ui/Container";

export function CtaBanner({
  title,
  description,
  primary,
  secondary





}: {title: string;description: string;primary: {label: string;href: string;};secondary?: {label: string;href: string;};}) {
  return (
    <section className="py-16">
      <Container>
        <div className="flex flex-col gap-8 rounded-2xl bg-primary px-6 py-12 sm:px-12 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-primary-foreground">{title}</h2>
            <p className="mt-3 text-lg leading-relaxed text-primary-foreground/85">{description}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href={primary.href} className={buttonVariants({ variant: "inverse", size: "lg" })}>
              {primary.label}
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
            {secondary &&
            <Link
              href={secondary.href}
              className={buttonVariants({
                variant: "ghost",
                size: "lg",
                className: "border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              })}>
              
                {secondary.label}
              </Link>
            }
          </div>
        </div>
      </Container>
    </section>);

}