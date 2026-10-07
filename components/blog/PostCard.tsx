"use client";

import React from "react";
import Link from "next/link";
import type { BlogPost } from "../../lib/types/blog";
import { Badge } from "../ui/Badge";
import { PostCover } from "./PostCover";
import { PostMeta } from "./PostMeta";

export function PostCard({ post, headingLevel = "h3" }: {post: BlogPost;headingLevel?: "h2" | "h3";}) {
  const Heading = headingLevel;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors duration-150 hover:border-primary/40">
      <PostCover category={post.category} title={post.title} className="aspect-[16/9]" />
      <div className="flex flex-1 flex-col p-5">
        <Badge className="self-start">{post.category}</Badge>
        <Heading className="mt-3 font-display text-lg font-bold leading-snug text-foreground">
          <Link
            href={`/blog/${post.slug}`}
            className="after:absolute after:inset-0 after:rounded-xl group-hover:text-primary focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring">
            
            {post.title}
          </Link>
        </Heading>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{post.description}</p>
        <div className="mt-auto pt-4">
          <PostMeta date={post.date} readTime={post.readTime} />
        </div>
      </div>
    </article>);

}