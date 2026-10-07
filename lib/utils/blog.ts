import { blogCategories, blogPosts } from "../blog";
import type { BlogCategory, BlogPost } from "../types/blog";
import type { TocItem } from "../types/site";
import { slugify } from "./format";

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getSortedPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostsByProduct(productSlug: string): BlogPost[] {
  return getSortedPosts().filter((p) => p.relatedProduct === productSlug);
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const others = getSortedPosts().filter((p) => p.slug !== post.slug);
  const scored = others.map((p) => ({
    post: p,
    score:
    (p.category === post.category ? 2 : 0) + (
    p.relatedProduct === post.relatedProduct ? 2 : 0) +
    p.tags.filter((t) => post.tags.includes(t)).length
  }));
  return scored.sort((a, b) => b.score - a.score).slice(0, limit).map((s) => s.post);
}

export function getHeadings(post: BlogPost): TocItem[] {
  return post.content.flatMap((block) =>
  block.type === "h2" || block.type === "h3" ?
  [{ id: slugify(block.text), text: block.text, level: block.type === "h2" ? 2 : 3 } as TocItem] :
  []
  );
}

export function getCategoryCover(category: BlogCategory): string {
  return blogCategories.find((c) => c.name === category)?.cover ?? "bg-primary";
}

export function getCategoryCounts(): {name: BlogCategory;count: number;}[] {
  return blogCategories.map((c) => ({ name: c.name, count: blogPosts.filter((p) => p.category === c.name).length }));
}
