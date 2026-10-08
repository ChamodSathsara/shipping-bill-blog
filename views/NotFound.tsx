"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { Container } from "../components/ui/Container";
import { buttonVariants } from "../lib/utils/buttonVariants";

export function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="font-mono text-sm font-semibold text-primary">404 · Return to sender</p>
      <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
        This page couldn't be delivered
      </h1>
      <p className="mt-4 max-w-lg text-lg text-muted-foreground">
        The address may be mistyped, or the page has moved. Try one of these instead.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className={buttonVariants({ size: "lg" })}>
          <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
          Back to home
        </Link>
        <Link href="/shipping-label-maker" className={buttonVariants({ variant: "secondary", size: "lg" })}>Create a shipping label</Link>
        <Link href="/packing-slip-generator" className={buttonVariants({ variant: "secondary", size: "lg" })}>Generate a packing slip</Link>
        <Link href="/blog" className={buttonVariants({ variant: "ghost", size: "lg" })}>Read guides</Link>
      </div>
    </Container>);

}
