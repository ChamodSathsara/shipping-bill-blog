"use client";

import React from "react";
import { Container } from "./Container";
import { Skeleton } from "./Skeleton";

export function PageSkeleton() {
  return (
    <Container className="py-16">
      <span className="sr-only" role="status">Loading page…</span>
      <Skeleton className="h-4 w-40" />
      <Skeleton className="mt-6 h-10 w-full max-w-xl" />
      <Skeleton className="mt-3 h-5 w-full max-w-lg" />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {[0, 1, 2].map((i) =>
        <div key={i} className="space-y-3">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
        )}
      </div>
    </Container>);

}