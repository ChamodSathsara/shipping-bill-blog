import type { Metadata } from "next";
import { AboutUs } from "@/views/AboutUs";
export const metadata: Metadata = { title: "About Us", description: "Learn why ShipKit builds straightforward, free shipping tools for independent online sellers.", alternates: { canonical: "/about-us" } };
export default function Page() { return <AboutUs />; }
