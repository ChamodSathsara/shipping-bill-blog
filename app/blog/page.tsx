import type { Metadata } from "next";
import { Blog } from "@/views/Blog";

export const metadata: Metadata = { title: "Shipping Guides & Seller Tips", description: "Practical shipping, label, packaging and fulfillment guides for marketplace sellers.", alternates: { canonical: "/blog" } };
export default function Page() { return <Blog />; }
