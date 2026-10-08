import type { Metadata } from "next";
import { Home } from "@/views/Home";
import { HOME_KEYWORDS } from "@/lib/keywords";

export const metadata: Metadata = {
  title: "Free Shipping Tools for Online Sellers",
  description: "Create labels, packing slips and print-ready 4x6 files with free browser tools built for online sellers.",
  keywords: HOME_KEYWORDS,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Free Shipping Tools for Online Sellers | ShipKit",
    description: "Create shipping labels and packing slips with free ecommerce shipping tools for online sellers.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Shipping Tools for Online Sellers | ShipKit",
    description: "Create shipping labels and packing slips online for free.",
  },
};

export default function Page() { return <Home />; }
