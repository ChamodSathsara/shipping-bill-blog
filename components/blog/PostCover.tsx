"use client";
import { BoxIcon, PrinterIcon, StoreIcon, TagIcon } from "lucide-react";
import type { BlogCategory } from "../../lib/types/blog";
import { getCategoryCover } from "../../lib/utils/blog";
import { cn } from "../../lib/utils/cn";

const icons: Record<BlogCategory, typeof TagIcon> = {
  "Shipping Labels": TagIcon,
  "Packing & Fulfillment": BoxIcon,
  "Marketplace Guides": StoreIcon,
  "Printers & Hardware": PrinterIcon,
};
export function PostCover({
  category,
  title,
  image,
  imageAlt,
  className,
}: {
  category: BlogCategory;
  title: string;
  image?: string;
  imageAlt?: string;
  className?: string;
}) {
  const Icon = icons[category];
  return (
    <div
      role="img"
      aria-label={imageAlt || `Cover illustration for ${title}`}
      className={cn(
        "relative flex items-end overflow-hidden",
        getCategoryCover(category),
        className,
      )}
    >
      {image ? (
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <>
          <Icon
            className="absolute -right-4 -top-4 h-32 w-32 text-white/15"
            strokeWidth={1.25}
          />
          <Icon className="m-5 h-7 w-7 text-white/90" />
        </>
      )}
    </div>
  );
}
