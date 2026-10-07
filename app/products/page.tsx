import type { Metadata } from "next";
import { Products } from "@/views/Products";

export const metadata: Metadata = { title: "Free Shipping Products", description: "Explore a free shipping label maker and packing slip generator for online sellers.", alternates: { canonical: "/products" } };
export default function Page() { return <Products />; }
