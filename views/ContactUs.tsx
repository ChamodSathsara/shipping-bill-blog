"use client";

import React from "react";
import Link from "next/link";
import { ClockIcon, HelpCircleIcon, MailIcon } from "lucide-react";
import { ContactForm } from "../components/contact/ContactForm";
import { PageHeader } from "../components/sections/PageHeader";
import { Container } from "../components/ui/Container";
import { siteConfig } from "../lib/siteConfig";

export function ContactUs() {
  return (
    <>
      <PageHeader
        title="Get in touch"
        description="Found a bug, want a feature, or have a partnership idea? We read every message."
        breadcrumbs={[{ label: "Contact Us" }]} />
      
      <Container className="grid gap-10 py-14 lg:grid-cols-[minmax(0,1.6fr)_1fr]">
        <ContactForm />
        <aside aria-label="Other ways to reach us" className="h-fit rounded-xl border border-border bg-surface p-6">
          <ul className="space-y-6">
            <li className="flex gap-3">
              <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-foreground">Email</p>
                <a href={`mailto:${siteConfig.email}`} className="text-sm text-primary hover:underline">{siteConfig.email}</a>
              </div>
            </li>
            <li className="flex gap-3">
              <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-foreground">Response time</p>
                <p className="text-sm text-muted-foreground">{siteConfig.responseTime}</p>
              </div>
            </li>
            <li className="flex gap-3">
              <HelpCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-foreground">Quick answers</p>
                <p className="text-sm text-muted-foreground">
                  Many questions are covered in our <Link href="/#faq-heading" className="text-primary hover:underline">FAQ</Link> and{" "}
                  <Link href="/blog" className="text-primary hover:underline">shipping guides</Link>.
                </p>
              </div>
            </li>
          </ul>
        </aside>
      </Container>
    </>);

}
