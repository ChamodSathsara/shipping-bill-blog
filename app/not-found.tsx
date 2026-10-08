import { NotFound } from "@/views/NotFound";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFoundPage() { return <NotFound />; }
