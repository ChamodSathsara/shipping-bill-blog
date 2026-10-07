import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";
import { policies } from "@/lib/policies";
import { products } from "@/lib/products";
import { siteConfig } from "@/lib/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/products", "/blog", "/policy", "/about-us", "/contact-us"];
  return [
    ...routes.map((route) => ({ url: `${siteConfig.url}${route}`, lastModified: new Date(), changeFrequency: "weekly" as const })),
    ...products.map((p) => ({ url: `${siteConfig.url}/products/${p.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const })),
    ...blogPosts.map((p) => ({ url: `${siteConfig.url}/blog/${p.slug}`, lastModified: new Date(p.updatedAt ?? p.date), changeFrequency: "monthly" as const })),
    ...policies.map((p) => ({ url: `${siteConfig.url}/policy/${p.slug}`, lastModified: new Date(), changeFrequency: "yearly" as const })),
  ];
}
