"use client";

import React from "react";
import type { Author } from "../../lib/types/blog";

export function AuthorBox({ author }: {author: Author;}) {
  return (
    <section aria-label="About the author" className="flex gap-4 rounded-xl border border-border bg-surface p-5 sm:p-6">
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary font-display text-lg font-bold text-primary-foreground" aria-hidden="true">
        {author.initials}
      </span>
      <div>
        <p className="font-display text-base font-bold text-foreground">{author.name}</p>
        <p className="text-sm text-muted-foreground">{author.role}</p>
        <p className="mt-2 text-sm leading-6 text-foreground/85">{author.bio}</p>
      </div>
    </section>);

}