import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";
import { policies } from "@/lib/policies";
import { siteConfig } from "@/lib/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/shipping-label-maker", "/packing-slip-generator", "/blog", "/policy", "/about-us", "/contact-us"];
  return [
    ...routes.map((route) => ({ url: `${siteConfig.url}${route}`, changeFrequency: "weekly" as const })),
    ...blogPosts.map((p) => ({ url: `${siteConfig.url}/blog/${p.slug}`, lastModified: new Date(p.updatedAt ?? p.date), changeFrequency: "monthly" as const })),
    ...policies.map((p) => ({ url: `${siteConfig.url}/policy/${p.slug}`, changeFrequency: "yearly" as const })),
  ];
}
