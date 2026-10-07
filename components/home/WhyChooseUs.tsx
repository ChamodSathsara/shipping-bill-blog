"use client";

import React from "react";
import { GiftIcon, PrinterIcon, SmartphoneIcon, UserXIcon } from "lucide-react";
import { benefits } from "../../lib/homeContent";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

const icons = { free: GiftIcon, signup: UserXIcon, print: PrinterIcon, mobile: SmartphoneIcon };

export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-heading" className="py-20">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <SectionHeading
          id="why-heading"
          title="Why sellers choose ShipKit"
          description="We built the tools we wanted when we were packing orders at the kitchen table: fast, free and private." />
        
        <div className="grid gap-x-10 sm:grid-cols-2">
          {benefits.map((b) => {
            const Icon = icons[b.icon];
            return (
              <div key={b.title} className="border-t border-border py-6">
                <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-display text-lg font-bold text-foreground">{b.title}</h3>
                <p className="mt-2 leading-7 text-muted-foreground">{b.description}</p>
              </div>);

          })}
        </div>
      </Container>
    </section>);

}