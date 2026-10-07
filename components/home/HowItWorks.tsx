"use client";

import React from "react";
import { howItWorksSteps } from "../../lib/homeContent";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

export function HowItWorks() {
  return (
    <section aria-labelledby="how-heading" className="border-y border-border bg-surface py-20">
      <Container>
        <SectionHeading id="how-heading" title="From order to printed label in three steps" description="No installs, no accounts. Just the steps you already do — faster." />
        <ol className="relative mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          <span aria-hidden="true" className="absolute left-5 right-5 top-5 hidden h-px bg-border md:block" />
          {howItWorksSteps.map((step, i) =>
          <li key={step.title} className="relative">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary font-display text-base font-bold text-primary-foreground ring-8 ring-surface">
                {i + 1}
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-foreground">{step.title}</h3>
              <p className="mt-2 max-w-xs leading-7 text-muted-foreground">{step.description}</p>
            </li>
          )}
        </ol>
      </Container>
    </section>);

}