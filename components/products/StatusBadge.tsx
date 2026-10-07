"use client";

import React from "react";
import type { ProductStatus } from "../../lib/types/product";
import { Badge } from "../ui/Badge";

export function StatusBadge({ status, className }: {status: ProductStatus;className?: string;}) {
  return status === "live" ?
  <Badge variant="live" className={className}>Live</Badge> :

  <Badge variant="soon" className={className}>Coming Soon</Badge>;

}