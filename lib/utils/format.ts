import { format, parseISO } from "date-fns";

export function formatDate(iso: string): string {
  return format(parseISO(iso), "MMM d, yyyy");
}

export function slugify(text: string): string {
  return text.
  toLowerCase().
  replace(/[^a-z0-9\s-]/g, "").
  trim().
  replace(/\s+/g, "-");
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}