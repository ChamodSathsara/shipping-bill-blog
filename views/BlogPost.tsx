"use client";

import React from "react";
import { AdSlot } from "../components/ads/AdSlot";
import { ArticleBody } from "../components/blog/ArticleBody";
import { AuthorBox } from "../components/blog/AuthorBox";
import { MobileToc } from "../components/blog/MobileToc";
import { PostCard } from "../components/blog/PostCard";
import { PostCover } from "../components/blog/PostCover";
import { ReadingProgress } from "../components/blog/ReadingProgress";
import { ShareButtons } from "../components/blog/ShareButtons";
import { TableOfContents } from "../components/blog/TableOfContents";
import { JsonLd } from "../components/seo/JsonLd";
import { Badge } from "../components/ui/Badge";
import { Breadcrumbs } from "../components/ui/Breadcrumbs";
import { Container } from "../components/ui/Container";
import type { Product } from "../lib/types/product";
import { siteConfig } from "../lib/siteConfig";
import { usePageMeta } from "../hooks/usePageMeta";
import { getHeadings, getPostBySlug, getRelatedPosts } from "../lib/utils/blog";
import { formatDate } from "../lib/utils/format";
import { NotFound } from "./NotFound";

export function BlogPost({ slug }: { slug: string }) {
  const post = slug ? getPostBySlug(slug) : undefined;

  usePageMeta({
    title: post?.title ?? "Article not found",
    description: post?.description ?? "This article could not be found.",
    path: `/blog/${slug ?? ""}`,
    keywords: post?.tags,
    type: "article",
  });

  if (!post) return <NotFound />;

  const headings = getHeadings(post);
  const product: Product | undefined =
    post.relatedProduct === "shipping-label-maker"
      ? {
          slug: "shipping-label-maker",
          name: "Shipping Label Maker",
          summary: "Create printable shipping labels.",
          metaTitle: "Shipping Label Maker",
          metaDescription: "Create printable shipping labels.",
          keywords: ["shipping label maker"],
          status: "live",
          icon: "label",
          highlights: [],
          longDescription: "Create clean printable shipping labels.",
          features: [],
          steps: [],
          seoContent: [],
          faqs: [],
        }
      : post.relatedProduct === "packing-slip-generator"
        ? {
            slug: "packing-slip-generator",
            name: "Packing Slip Generator",
            summary: "Create professional packing slips.",
            metaTitle: "Packing Slip Generator",
            metaDescription: "Create printable packing slips.",
            keywords: ["packing slip generator"],
            status: "live",
            icon: "slip",
            highlights: [],
            longDescription: "Build tidy packing slips.",
            features: [],
            steps: [],
            seoContent: [],
            faqs: [],
          }
        : undefined;
  const related = getRelatedPosts(post);
  const url = `${siteConfig.url}/blog/${post.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      sameAs: [post.author.linkedIn],
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: url,
    articleSection: post.category,
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <ReadingProgress />
      <JsonLd data={articleJsonLd} />
      <article>
        <header className="border-b border-border bg-surface">
          <Container className="py-10 md:py-14">
            <Breadcrumbs
              items={[{ label: "Blog", href: "/blog" }, { label: post.title }]}
            />
            <Badge className="mt-6">{post.category}</Badge>
            <h1 className="mt-4 max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl sm:leading-[1.1]">
              {post.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {post.description}
            </p>
            <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <div className="flex gap-1.5">
                <dt className="text-muted-foreground">By</dt>
                <dd className="font-semibold text-foreground">
                  {post.author.name}
                </dd>
              </div>
              <div className="flex gap-1.5">
                <dt className="text-muted-foreground">Published</dt>
                <dd className="text-foreground">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </dd>
              </div>
              <div className="flex gap-1.5">
                <dt className="text-muted-foreground">Updated</dt>
                <dd className="text-foreground">
                  <time dateTime={post.updatedAt}>
                    {formatDate(post.updatedAt)}
                  </time>
                </dd>
              </div>
              <div className="flex gap-1.5">
                <dt className="sr-only">Reading time</dt>
                <dd className="text-foreground">{post.readTime} min read</dd>
              </div>
            </dl>
          </Container>
        </header>

        <Container className="pt-10">
          <PostCover
            category={post.category}
            title={post.title}
            image={post.image}
            imageAlt={post.imageAlt}
            className="aspect-[16/7] rounded-2xl border border-border shadow-sm"
          />
        </Container>
        <Container className="grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="min-w-0">
            <div className="mb-8">
              <MobileToc items={headings} />
            </div>
            <ArticleBody
              blocks={post.content}
              slug={post.slug}
              product={product}
            />

            <ul className="mt-12 flex flex-wrap gap-2" aria-label="Tags">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <Badge variant="outline">#{tag}</Badge>
                </li>
              ))}
            </ul>
            <div className="mt-8 max-w-reading space-y-8 border-t border-border pt-8">
              <ShareButtons url={url} title={post.title} />
              <AuthorBox author={post.author} />
            </div>
          </div>

          <aside aria-label="Article sidebar" className="hidden lg:block">
            <div className="sticky top-24 space-y-10">
              <TableOfContents items={headings} />
              <AdSlot slotId={`${post.slug}-sidebar`} format="rectangle" />
            </div>
          </aside>
        </Container>
      </article>

      {related.length > 0 && (
        <section
          aria-labelledby="related-heading"
          className="border-t border-border bg-surface py-16"
        >
          <Container>
            <h2
              id="related-heading"
              className="font-display text-2xl font-bold tracking-tight text-foreground"
            >
              Keep reading
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
