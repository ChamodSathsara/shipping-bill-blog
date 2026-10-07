import { cn } from "../../lib/utils/cn";

export function navLinkClass(active: boolean): string {
  return cn(
    "inline-flex h-10 items-center gap-1 rounded-md px-3 text-sm font-medium transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    active ? "text-primary" : "text-muted-foreground"
  );
}