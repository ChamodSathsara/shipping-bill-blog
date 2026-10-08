"use client";

import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import type { BlogPost } from "../../lib/types/blog";
import { Badge } from "../ui/Badge";
import { PostCover } from "./PostCover";
import { PostMeta } from "./PostMeta";

export function FeaturedPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="group relative grid overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-150 hover:border-primary/40 md:grid-cols-[1.1fr_1fr]">
      <PostCover
        category={post.category}
        title={post.title}
        image={post.image}
        imageAlt={post.imageAlt}
        className="aspect-[16/9] md:aspect-auto md:min-h-[300px]"
      />
      <div className="flex flex-col p-6 sm:p-8">
        <div className="flex items-center gap-2">
          <Badge variant="live">Featured</Badge>
          <Badge>{post.category}</Badge>
        </div>
        <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-foreground sm:text-[1.75rem]">
          <Link
            href={`/blog/${post.slug}`}
            className="after:absolute after:inset-0 after:rounded-2xl group-hover:text-primary focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring"
          >
            {post.title}
          </Link>
        </h2>
        <p className="mt-3 leading-7 text-muted-foreground">
          {post.description}
        </p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <PostMeta date={post.date} readTime={post.readTime} />
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
            Read guide
            <ArrowRightIcon
              className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </article>
  );
}
