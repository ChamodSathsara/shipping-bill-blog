import type { Metadata } from "next";
import { Products } from "@/views/Products";

export const metadata: Metadata = { title: "Free Shipping Products", description: "Explore free shipping label, packing slip and label resizing tools for online sellers.", alternates: { canonical: "/products" } };
export default function Page() { return <Products />; }
