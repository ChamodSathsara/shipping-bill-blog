import type { Metadata } from "next";
import { ProductDetail } from "@/views/ProductDetail";
import type { Product } from "@/lib/types/product";

const shippingLabelMaker = {
  slug: "shipping-label-maker",
  name: "Shipping Label Maker",
  summary:
    "Enter sender and receiver details, order number and weight, then generate a printable 4x6 shipping label.",
  metaTitle: "Free Shipping Label Maker – Create & Print Labels Online",
  metaDescription:
    "Make printable 4x6 shipping labels for free and export them as PDF with no signup.",
  keywords: [
    "shipping label maker",
    "free shipping label maker",
    "4x6 shipping label maker",
    "printable shipping label",
    "shipping label generator",
    "free shipping label generator",
    "online shipping label maker",
    "shipping label creator",
    "create shipping label online",
    "thermal shipping label maker",
    "shipping label template",
  ],
  status: "live",
  icon: "label",
  highlights: [
    "Standard 4x6 thermal size",
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
      title: "Scanner-ready barcode",
      description: "Generate a standards-compliant Code 128 barcode from the tracking number.",
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
      title: "No document-data retention",
      description: "Shipment data is processed in server memory only and discarded after the PDF is generated.",
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
    { title: "Choose a template", description: "Select a 4x6 layout for your shipment." },
    {
      title: "Print or download",
      description: "Print the label or save a PDF.",
    },
  ],
  seoContent: [
    {
      heading: "A free shipping label maker for small sellers",
      paragraphs: [
        "Use this online shipping label maker to create a shipping label online without subscribing to a full shipping platform. The shipping label creator is designed for marketplace sellers, replacement shipments and orders handled outside a marketplace checkout.",
        "There is no account to create. Shipment information is sent securely for PDF generation, is not saved to our database and is discarded from server memory when generation completes.",
      ],
    },
    {
      heading: "Print 4x6 labels or use regular paper",
      paragraphs: [
        "Every shipping label template uses the standard 4×6 thermal format with readable type, barcode quiet zones and dependable print spacing. This makes the tool useful as both a 4×6 shipping label maker and thermal shipping label maker.",
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
      question: "What size is a shipping label?",
      answer: "The standard parcel-label format is 4 × 6 inches, which is the fixed output size used by this tool.",
    },
    {
      question: "Can I print 4 × 6 labels?",
      answer: "Yes. Download the PDF or open the system print dialog and print at 100% or Actual Size on 4 × 6 media.",
    },
    {
      question: "Does this create postage?",
      answer: "No. ShipKit creates a custom printable label layout but does not purchase postage or create an official carrier postage label.",
    },
    {
      question: "Can I use a thermal printer?",
      answer: "Yes. The PDF is sized for common 4 × 6 thermal printers, including Rollo, Munbyn and Zebra devices.",
    },
    {
      question: "Which printers are supported?",
      answer:
        "It supports common 4x6 thermal printers and standard inkjet or laser printers.",
    },
    {
      question: "Can I create and print a shipping label online?",
      answer: "Yes. Enter the shipment details, choose a template, check the live preview and download or print the generated 4×6 PDF.",
    },
    {
      question: "Is address data stored?",
      answer: "No. Label details are processed temporarily in server memory to create the PDF and are discarded when generation completes.",
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
  status: "live",
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
function ShippingLabelMakerPage() {
  return (
    <ProductDetail
      product={shippingLabelMaker}
      relatedProduct={packingSlipGenerator}
    />
  );
}
export default ShippingLabelMakerPage;
