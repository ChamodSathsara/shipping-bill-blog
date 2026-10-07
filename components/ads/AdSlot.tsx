"use client";

import React, { useEffect } from "react";
import { siteConfig } from "../../lib/siteConfig";
import { cn } from "../../lib/utils/cn";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export type AdFormat = "horizontal" | "rectangle" | "vertical" | "in-article";

// Fixed min-heights reserve space so ads never cause layout shift (CLS).
const minHeights: Record<AdFormat, string> = {
  horizontal: "min-h-[100px] md:min-h-[120px]",
  rectangle: "min-h-[280px]",
  vertical: "min-h-[600px]",
  "in-article": "min-h-[250px]"
};

interface AdSlotProps {
  slotId: string;
  format: AdFormat;
  className?: string;
}

export function AdSlot({ slotId, format, className }: AdSlotProps) {
  const { publisherId, enabled } = siteConfig.adsense;
  const live = enabled && publisherId.length > 0;

  useEffect(() => {
    if (!live) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {

      // AdSense not ready (e.g. blocked); the reserved space simply stays empty.
    }}, [live, slotId]);

  return (
    <aside aria-label="Advertisement" className={cn("w-full", className)}>
      <p className="mb-1.5 text-center text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Advertisement
      </p>
      <div className={cn("flex w-full items-stretch overflow-hidden rounded-lg", minHeights[format])}>
        {live ?
        <ins
          className="adsbygoogle block w-full"
          style={{ display: "block" }}
          data-ad-client={publisherId}
          data-ad-slot={slotId}
          data-ad-format={format === "in-article" ? "fluid" : "auto"}
          data-ad-layout={format === "in-article" ? "in-article" : undefined}
          data-full-width-responsive="true" /> :


        <div className="flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/40 px-4 text-center text-xs text-muted-foreground">
            <span className="font-medium">Ad placeholder · {format}</span>
            <span className="mt-0.5 font-mono">{slotId}</span>
          </div>
        }
      </div>
    </aside>);

}