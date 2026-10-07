"use client";

import React from "react";
import { CheckCircle2Icon } from "lucide-react";
import { AdSlot } from "../components/ads/AdSlot";
import { PostCard } from "../components/blog/PostCard";
import { ProductHero } from "../components/products/ProductHero";
import { ProductSummaryCard } from "../components/products/ProductSummaryCard";
import { FaqSection } from "../components/sections/FaqSection";
import { JsonLd } from "../components/seo/JsonLd";
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import type { Product } from "../lib/types/product";
import { siteConfig } from "../lib/siteConfig";
import { usePageMeta } from "../hooks/usePageMeta";
import { getPostsByProduct } from "../lib/utils/blog";

export function ProductDetail({ product, relatedProduct }: { product: Product; relatedProduct: Product }) {

  usePageMeta({
    title: product?.metaTitle ?? "Product not found",
    description: product?.metaDescription ?? "This product could not be found.",
    path: `/products/${product.slug}`,
    keywords: product?.keywords
  });

  const posts = getPostsByProduct(product.slug).slice(0, 3);
  const isLive = product.status === "live";
  const verb = isLive ? "does" : "will do";

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    description: product.metaDescription,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web browser",
    url: `${siteConfig.url}/products/${product.slug}`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: siteConfig.name }
  };

  return (
    <>
      <JsonLd data={softwareJsonLd} />
      <ProductHero product={product} />

      <section aria-labelledby="features-heading" className="py-20">
        <Container>
          <SectionHeading id="features-heading" title={`What this tool ${verb}`} description={product.longDescription} />
          <ul className="mt-10 grid gap-x-10 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {product.features.map((f) =>
            <li key={f.title} className="border-t border-border py-6">
                <CheckCircle2Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="mt-3 font-display text-lg font-bold text-foreground">{f.title}</h3>
                <p className="mt-1.5 leading-7 text-muted-foreground">{f.description}</p>
              </li>
            )}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="steps-heading" className="border-y border-border bg-surface py-20">
        <Container>
          <SectionHeading id="steps-heading" title={isLive ? "How it works" : "How it will work"} />
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {product.steps.map((s, i) =>
            <li key={s.title}>
                <span className="font-display text-sm font-bold text-primary">Step {i + 1}</span>
                <h3 className="mt-2 font-display text-lg font-bold text-foreground">{s.title}</h3>
                <p className="mt-1.5 leading-7 text-muted-foreground">{s.description}</p>
              </li>
            )}
          </ol>
        </Container>
      </section>

      <section aria-label={`About the ${product.name}`} className="py-20">
        <Container>
          <div className="max-w-reading">
            {product.seoContent.map((section) =>
            <div key={section.heading} className="mt-10 first:mt-0">
                <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">{section.heading}</h2>
                {section.paragraphs.map((p) =>
              <p key={p.slice(0, 32)} className="mt-4 text-[1.0625rem] leading-8 text-foreground/85">{p}</p>
              )}
              </div>
            )}
          </div>
        </Container>
      </section>

      <div className="border-t border-border">
        <FaqSection title={`${product.name} FAQ`} faqs={product.faqs} />
      </div>

      <section aria-labelledby="related-products-heading" className="border-t border-border bg-surface py-20">
        <Container>
          <SectionHeading id="related-products-heading" title="Related tools" />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <ProductSummaryCard product={relatedProduct} />
          </div>
        </Container>
      </section>

      {posts.length > 0 &&
      <section aria-labelledby="related-posts-heading" className="py-20">
          <Container>
            <SectionHeading id="related-posts-heading" title="Guides for this tool" />
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {posts.map((post) =>
            <PostCard key={post.slug} post={post} />
            )}
            </div>
          </Container>
        </section>
      }

      <Container className="pb-20">
        <AdSlot slotId={`product-${product.slug}-bottom`} format="horizontal" />
      </Container>
    </>);

}
