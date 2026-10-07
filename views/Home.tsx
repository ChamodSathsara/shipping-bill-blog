"use client";

import React from "react";
import { AdSlot } from "../components/ads/AdSlot";
import { HowItWorks } from "../components/home/HowItWorks";
import { Hero } from "../components/home/Hero";
import { LatestPosts } from "../components/home/LatestPosts";
import { SeoTextBlock } from "../components/home/SeoTextBlock";
import { ToolsSummary } from "../components/home/ToolsSummary";
import { WhyChooseUs } from "../components/home/WhyChooseUs";
import { CtaBanner } from "../components/sections/CtaBanner";
import { FaqSection } from "../components/sections/FaqSection";
import { JsonLd } from "../components/seo/JsonLd";
import { Container } from "../components/ui/Container";
import { homeFaqs } from "../lib/homeContent";
import { siteConfig } from "../lib/siteConfig";
import { usePageMeta } from "../hooks/usePageMeta";
import { capitalize } from "../lib/utils/format";
import { allHomeKeywords, homeKeyword } from "../lib/utils/keywords";

export function Home() {
  usePageMeta({
    title: `${capitalize(homeKeyword(0))} for Sellers | ${siteConfig.name}`,
    description: `${capitalize(homeKeyword(0))}, ${homeKeyword(2)} and 4x6 label resizer for Etsy, eBay and Amazon sellers. Free, no signup, works in your browser.`,
    path: "/",
    keywords: allHomeKeywords()
  });

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    email: siteConfig.email,
    sameAs: Object.values(siteConfig.social)
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description
  };

  return (
    <>
      <JsonLd data={organization} />
      <JsonLd data={website} />
      <Hero />
      <ToolsSummary />
      <Container>
        <AdSlot slotId="home-after-tools" format="horizontal" />
      </Container>
      <div className="h-20" />
      <HowItWorks />
      <WhyChooseUs />
      <LatestPosts />
      <FaqSection
        title="Frequently asked questions"
        description={`Answers about our ${homeKeyword(0)}, label sizes, printers and privacy.`}
        faqs={homeFaqs} />
      
      <Container>
        <AdSlot slotId="home-before-cta" format="horizontal" />
      </Container>
      <CtaBanner
        title="Start with your first label"
        description="Pick a tool, fill in a few fields and print. It really is that quick."
        primary={{ label: "Explore Free Tools", href: "/products" }}
        secondary={{ label: "Read Guides", href: "/blog" }} />
      
      <SeoTextBlock />
    </>);

}