"use client";

import React, { useMemo, useState } from "react";
import { SearchIcon, XIcon } from "lucide-react";
import { BlogSidebar } from "../components/blog/BlogSidebar";
import { FeaturedPostCard } from "../components/blog/FeaturedPostCard";
import { Pagination } from "../components/blog/Pagination";
import { PostCard } from "../components/blog/PostCard";
import { PageHeader } from "../components/sections/PageHeader";
import { Container } from "../components/ui/Container";
import { blogCategories, POSTS_PER_PAGE } from "../lib/blog";
import { usePageMeta } from "../hooks/usePageMeta";
import type { BlogCategory } from "../lib/types/blog";
import { getSortedPosts } from "../lib/utils/blog";
import { cn } from "../lib/utils/cn";

export function Blog() {
  usePageMeta({
    title: "Shipping Guides & Tips for Online Sellers",
    description: "Practical guides on shipping labels, 4x6 thermal printers, packing slips and Etsy, eBay and Amazon shipping for small online sellers.",
    path: "/blog"
  });

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<BlogCategory | null>(null);
  const [page, setPage] = useState(1);

  const allPosts = getSortedPosts();
  const filtering = query.trim().length > 0 || category !== null;
  const featured = allPosts.find((p) => p.featured);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allPosts.filter((p) => {
      if (category && p.category !== category) return false;
      if (!filtering && featured && p.slug === featured.slug) return false;
      if (!q) return true;
      return [p.title, p.description, ...p.tags].some((t) => t.toLowerCase().includes(q));
    });
  }, [allPosts, query, category, filtering, featured]);

  const totalPages = Math.max(1, Math.ceil(results.length / POSTS_PER_PAGE));
  const current = results.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const selectCategory = (c: BlogCategory | null) => {
    setCategory(c);
    setPage(1);
  };

  return (
    <>
      <PageHeader
        title="Shipping guides for online sellers"
        description="Step-by-step help with labels, packing, printers and marketplace shipping — written by people who have packed thousands of orders."
        breadcrumbs={[{ label: "Blog" }]}>
        
        <div className="mt-8 flex flex-col gap-4">
          <div className="relative max-w-md">
            <label htmlFor="blog-search" className="sr-only">Search articles</label>
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input
              id="blog-search"
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search guides, e.g. thermal printer"
              className="h-11 w-full rounded-lg border border-border bg-background pl-10 pr-3.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
            
          </div>
          <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
            <Chip active={category === null} onClick={() => selectCategory(null)}>All</Chip>
            {blogCategories.map((c) =>
            <Chip key={c.name} active={category === c.name} onClick={() => selectCategory(c.name)}>
                {c.name}
              </Chip>
            )}
          </div>
        </div>
      </PageHeader>

      <Container className="grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          {!filtering && page === 1 && featured &&
          <div className="mb-10">
              <FeaturedPostCard post={featured} />
            </div>
          }

          {filtering &&
          <p className="mb-6 flex items-center gap-2 text-sm text-muted-foreground" role="status">
              {results.length} {results.length === 1 ? "article" : "articles"} found
              <button
              type="button"
              onClick={() => {
                setQuery("");
                selectCategory(null);
              }}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 font-medium text-primary hover:bg-muted">
              
                <XIcon className="h-3.5 w-3.5" aria-hidden="true" />
                Clear filters
              </button>
            </p>
          }

          {current.length > 0 ?
          <div className="grid gap-6 sm:grid-cols-2">
              {current.map((post) =>
            <PostCard key={post.slug} post={post} headingLevel="h2" />
            )}
            </div> :

          <div className="rounded-xl border border-dashed border-border px-6 py-16 text-center">
              <h2 className="font-display text-lg font-bold text-foreground">No guides match that search</h2>
              <p className="mt-2 text-muted-foreground">Try a broader term like “label” or “packing”.</p>
            </div>
          }

          <div className="mt-10">
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </div>
        </div>

        <div className="hidden lg:block">
          <BlogSidebar activeCategory={category} onSelectCategory={selectCategory} />
        </div>
      </Container>
    </>);

}

function Chip({ active, onClick, children }: {active: boolean;onClick: () => void;children: React.ReactNode;}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex h-10 items-center rounded-full border px-4 text-sm font-medium transition-colors duration-150",
        active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground"
      )}>
      
      {children}
    </button>);

}