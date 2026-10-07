import type { Metadata } from "next";
import { ProductDetail } from "@/views/ProductDetail";
import type { Product } from "@/lib/types/product";

const shippingLabelMaker = {
  slug: "shipping-label-maker",
  name: "Shipping Label Maker",
  summary:
    "Enter sender and receiver details, order number and weight, then generate a printable shipping label for 4x6, A4 or Letter paper.",
  metaTitle: "Free Shipping Label Maker – 4x6 & Printable",
  metaDescription:
    "Make printable shipping labels for free. Create 4x6 thermal or A4/Letter labels as PDF with no signup.",
  keywords: [
    "shipping label maker",
    "free shipping label maker",
    "4x6 shipping label maker",
    "printable shipping label",
    "shipping label generator",
  ],
  status: "live",
  icon: "label",
  highlights: [
    "4x6 thermal, A4 and Letter sizes",
    "Sender, receiver, order number and weight",
    "Download as PDF or print instantly",
  ],
  longDescription:
    "A fast, private label builder for sellers who ship from home. Add two addresses and order details, then create a clean label sized for your printer.",
  features: [
    {
      title: "Sender and receiver fields",
      description:
        "Structured address inputs keep important delivery details clear.",
    },
    {
      title: "4x6 thermal output",
      description:
        "Print-ready labels for Rollo, Munbyn, Zebra and similar printers.",
    },
    {
      title: "A4 and Letter sheets",
      description: "Use regular paper or half-sheet adhesive labels.",
    },
    {
      title: "Order details",
      description: "Add an order number, parcel weight and optional reference.",
    },
    {
      title: "PDF download",
      description: "Save a high-resolution PDF or print directly.",
    },
    {
      title: "Private by design",
      description: "Label information stays in your browser.",
    },
  ],
  steps: [
    {
      title: "Enter addresses",
      description: "Add sender and receiver details.",
    },
    {
      title: "Add order details",
      description: "Include order number and weight.",
    },
    { title: "Pick a size", description: "Choose 4x6, A4 or Letter." },
    {
      title: "Print or download",
      description: "Print the label or save a PDF.",
    },
  ],
  seoContent: [
    {
      heading: "A free shipping label maker for small sellers",
      paragraphs: [
        "Create a clear address label without subscribing to a full shipping platform. This tool is designed for marketplace sellers, replacement shipments and orders handled outside a marketplace checkout.",
        "The workflow runs in the browser, so there is no account to create and customer address information stays on your device.",
      ],
    },
    {
      heading: "Print 4x6 labels or use regular paper",
      paragraphs: [
        "Choose the standard 4x6 thermal format or lay the label out on A4 and US Letter paper. Every format uses readable type and generous spacing for dependable printing.",
      ],
    },
  ],
  faqs: [
    {
      question: "Is the shipping label maker free?",
      answer: "Yes. It will be free to use with no signup or watermark.",
    },
    {
      question: "Does it include postage?",
      answer:
        "No. It creates the printable address label; postage must be purchased separately.",
    },
    {
      question: "Which printers are supported?",
      answer:
        "It supports common 4x6 thermal printers and standard inkjet or laser printers.",
    },
    {
      question: "Is address data stored?",
      answer: "No. Label details are processed in your browser.",
    },
  ],
} satisfies Product;

const packingSlipGenerator = {
  slug: "packing-slip-generator",
  name: "Packing Slip Generator",
  summary:
    "Create professional packing slips with products, SKU, quantity and variant details.",
  metaTitle: "Free Packing Slip Generator",
  metaDescription: "Create printable packing slips for online orders.",
  keywords: ["packing slip generator", "packing slip template"],
  status: "coming-soon",
  icon: "slip",
  highlights: ["SKU and variants", "Custom shop details", "4x6, A4 or Letter"],
  longDescription: "Build a tidy packing slip for every parcel.",
  features: [],
  steps: [],
  seoContent: [],
  faqs: [],
} satisfies Product;

export const metadata: Metadata = {
  title: shippingLabelMaker.metaTitle,
  description: shippingLabelMaker.metaDescription,
  keywords: shippingLabelMaker.keywords,
  alternates: { canonical: "/products/shipping-label-maker" },
};
export default function Page() {
  return (
    <ProductDetail
      product={shippingLabelMaker}
      relatedProduct={packingSlipGenerator}
    />
  );
}
