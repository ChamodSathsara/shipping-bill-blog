"use client";

import React from "react";
import { LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { buttonVariants } from "../../lib/utils/buttonVariants";

export function ShareButtons({ url, title }: {url: string;title: string;}) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const networks = [
  { label: "X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
  { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
  { label: "Pinterest", href: `https://pinterest.com/pin/create/button/?url=${u}&description=${t}` },
  { label: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}` }];


  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Couldn't copy the link. Please copy it from the address bar.");
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-semibold text-foreground">Share</span>
      <button type="button" onClick={copy} className={buttonVariants({ variant: "secondary", size: "sm" })}>
        <LinkIcon className="h-4 w-4" aria-hidden="true" />
        Copy link
      </button>
      {networks.map((n) =>
      <a
        key={n.label}
        href={n.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Share on ${n.label} (opens in a new tab)`}
        className={buttonVariants({ variant: "secondary", size: "sm" })}>
        
          {n.label}
        </a>
      )}
    </div>);

}