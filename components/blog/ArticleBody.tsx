"use client";

import React from "react";
import { LightbulbIcon } from "lucide-react";
import type { BlogBlock } from "../../lib/types/blog";
import type { Product } from "../../lib/types/product";
import { slugify } from "../../lib/utils/format";
import { AdSlot } from "../ads/AdSlot";
import { TryToolCard } from "./TryToolCard";

// In-article ads are inserted after these paragraph numbers (1-based).
const AD_AFTER_PARAGRAPHS = [3, 7];
const TOOL_CARD_AFTER_PARAGRAPH = 5;

function renderBlock(block: BlogBlock, key: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2 key={key} id={slugify(block.text)} className="mt-12 scroll-mt-24 font-display text-2xl font-bold tracking-tight text-foreground sm:text-[1.7rem]">
          {block.text}
        </h2>);

    case "h3":
      return (
        <h3 key={key} id={slugify(block.text)} className="mt-8 scroll-mt-24 font-display text-xl font-bold text-foreground">
          {block.text}
        </h3>);

    case "ul":
      return (
        <ul key={key} className="mt-5 list-disc space-y-2 pl-6 text-[1.0625rem] leading-8 text-foreground/85 marker:text-primary">
          {block.items.map((item) =>
          <li key={item}>{item}</li>
          )}
        </ul>);

    case "tip":
      return (
        <div key={key} className="mt-6 flex gap-3 rounded-lg border-l-4 border-primary bg-muted px-5 py-4">
          <LightbulbIcon className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <p className="leading-7 text-foreground"><strong className="font-semibold">Tip: </strong>{block.text}</p>
        </div>);

    default:
      return (
        <p key={key} className="mt-5 text-[1.0625rem] leading-8 text-foreground/85">
          {block.text}
        </p>);

  }
}

export function ArticleBody({ blocks, slug, product }: {blocks: BlogBlock[];slug: string;product?: Product;}) {
  const nodes: React.ReactNode[] = [];
  let paragraphCount = 0;

  blocks.forEach((block, i) => {
    nodes.push(renderBlock(block, i));
    if (block.type !== "p") return;
    paragraphCount += 1;
    if (AD_AFTER_PARAGRAPHS.includes(paragraphCount)) {
      nodes.push(<AdSlot key={`ad-${paragraphCount}`} slotId={`${slug}-inarticle-${paragraphCount}`} format="in-article" className="my-10" />);
    }
    if (paragraphCount === TOOL_CARD_AFTER_PARAGRAPH && product) {
      nodes.push(<TryToolCard key="try-tool" product={product} className="my-10" />);
    }
  });

  return <div className="max-w-reading [&>*:first-child]:mt-0">{nodes}</div>;
}