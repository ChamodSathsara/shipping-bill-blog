"use client";

import { useEffect } from "react";
import { siteConfig } from "../lib/siteConfig";

interface PageMeta {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

// Sets title, description, canonical, Open Graph and Twitter tags for the current page.
export function usePageMeta({ title, description, path, keywords, type = "website" }: PageMeta) {
  const keywordString = keywords?.join(", ") ?? "";
  useEffect(() => {
    const fullTitle = title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`;
    const url = `${siteConfig.url}${path}`;
    document.title = fullTitle;
    upsertMeta("name", "description", description);
    if (keywordString) upsertMeta("name", "keywords", keywordString);
    upsertCanonical(url);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:site_name", siteConfig.name);
    upsertMeta("property", "og:image", siteConfig.ogImage);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
  }, [title, description, path, keywordString, type]);
}
