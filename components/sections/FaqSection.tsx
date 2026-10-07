"use client";

import React from "react";
import type { Faq } from "../../lib/types/product";
import { JsonLd } from "../seo/JsonLd";
import { Accordion } from "../ui/Accordion";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

// FAQ accordion + FAQPage JSON-LD. Reused on the home page and product pages.
export function FaqSection({ title, description, faqs }: {title: string;description?: string;faqs: Faq[];}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer }
    }))
  };

  return (
    <section aria-labelledby="faq-heading" className="py-20">
      <JsonLd data={jsonLd} />
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <SectionHeading id="faq-heading" title={title} description={description} />
        <Accordion items={faqs} />
      </Container>
    </section>);

}