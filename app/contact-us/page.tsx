import type { Metadata } from "next";
import { ContactUs } from "@/views/ContactUs";
export const metadata: Metadata = { title: "Contact Us", description: "Contact the ShipKit team with questions, feedback or partnership enquiries.", alternates: { canonical: "/contact-us" } };
export default function Page() { return <ContactUs />; }
