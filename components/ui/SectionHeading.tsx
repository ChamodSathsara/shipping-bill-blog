"use client";

import React from "react";
import { cn } from "../../lib/utils/cn";

export function SectionHeading({
  title,
  description,
  id,
  align = "left",
  className






}: {title: string;description?: string;id?: string;align?: "left" | "center";className?: string;}) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-2xl", className)}>
      <h2 id={id} className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-[2.1rem] sm:leading-tight">
        {title}
      </h2>
      {description && <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{description}</p>}
    </div>);

}