"use client";

import React from "react";
import Link from "next/link";
import type { BlogCategory } from "../../lib/types/blog";
import { getCategoryCounts, getSortedPosts } from "../../lib/utils/blog";
import { cn } from "../../lib/utils/cn";
import { AdSlot } from "../ads/AdSlot";
import { PostMeta } from "./PostMeta";

export function BlogSidebar({
  activeCategory,
  onSelectCategory



}: {activeCategory: BlogCategory | null;onSelectCategory: (c: BlogCategory | null) => void;}) {
  const categories = getCategoryCounts();
  const popular = getSortedPosts().slice(0, 3);

  return (
    <aside aria-label="Blog sidebar" className="space-y-10">
      <section aria-labelledby="sidebar-categories">
        <h2 id="sidebar-categories" className="font-display text-base font-bold text-foreground">Categories</h2>
        <ul className="mt-3 space-y-0.5">
          {categories.map((c) =>
          <li key={c.name}>
              <button
              type="button"
              onClick={() => onSelectCategory(activeCategory === c.name ? null : c.name)}
              aria-pressed={activeCategory === c.name}
              className={cn(
                "flex min-h-[40px] w-full items-center justify-between rounded-md px-3 text-sm transition-colors duration-150 hover:bg-muted",
                activeCategory === c.name ? "bg-accent font-semibold text-accent-foreground" : "text-muted-foreground"
              )}>
              
                {c.name}
                <span className="font-mono text-xs">{c.count}</span>
              </button>
            </li>
          )}
        </ul>
      </section>

      <section aria-labelledby="sidebar-popular">
        <h2 id="sidebar-popular" className="font-display text-base font-bold text-foreground">Popular guides</h2>
        <ol className="mt-3 divide-y divide-border">
          {popular.map((post) =>
          <li key={post.slug} className="py-3">
              <Link href={`/blog/${post.slug}`} className="text-sm font-semibold leading-snug text-foreground transition-colors duration-150 hover:text-primary">
                {post.title}
              </Link>
              <div className="mt-1"><PostMeta date={post.date} readTime={post.readTime} /></div>
            </li>
          )}
        </ol>
      </section>

      <div className="sticky top-24">
        <AdSlot slotId="blog-sidebar" format="vertical" />
      </div>
    </aside>);

}