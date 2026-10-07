import type { Metadata } from "next";
import { PolicyHub } from "@/views/PolicyHub";
export const metadata: Metadata = { title: "Policies", description: "Review ShipKit privacy, terms of service and cookie policies.", alternates: { canonical: "/policy" } };
export default function Page() { return <PolicyHub />; }
