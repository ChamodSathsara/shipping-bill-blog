"use client";

import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { getSortedPosts } from "../../lib/utils/blog";
import { PostCard } from "../blog/PostCard";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

export function LatestPosts() {
  const posts = getSortedPosts().slice(0, 3);
  return (
    <section aria-labelledby="latest-heading" className="border-y border-border bg-surface py-20">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading id="latest-heading" title="Shipping guides from real sellers" description="Label sizes, printers, packing and marketplace shipping — explained plainly." />
          <Link href="/blog" className="inline-flex min-h-[44px] shrink-0 items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            View all articles
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {posts.map((post) =>
          <PostCard key={post.slug} post={post} />
          )}
        </div>
      </Container>
    </section>);

}