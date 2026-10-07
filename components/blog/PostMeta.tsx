"use client";

import React from "react";
import { ClockIcon } from "lucide-react";
import { formatDate } from "../../lib/utils/format";

export function PostMeta({ date, readTime }: {date: string;readTime: number;}) {
  return (
    <p className="flex items-center gap-2 text-sm text-muted-foreground">
      <time dateTime={date}>{formatDate(date)}</time>
      <span aria-hidden="true">·</span>
      <span className="inline-flex items-center gap-1">
        <ClockIcon className="h-3.5 w-3.5" aria-hidden="true" />
        {readTime} min read
      </span>
    </p>);

}