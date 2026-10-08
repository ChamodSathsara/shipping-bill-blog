import type { Metadata } from "next";
import { ProductDetail } from "@/views/ProductDetail";
import type { Product } from "@/lib/types/product";

const packingSlipGenerator = {
  slug: "packing-slip-generator",
  name: "Packing Slip Generator",
  summary: "Generate a professional packing slip with products, SKU, quantity and variant details to place inside every parcel.",
  metaTitle: "Free Packing Slip Generator – Create & Print Packing Slips",
  metaDescription: "Create printable A4 or A5 packing slips online with SKU, quantity, variants and custom branding.",
  keywords: ["packing slip generator", "free packing slip generator", "packing slip maker", "packing slip template", "free packing slip template", "online packing slip generator", "packing slip creator", "printable packing slip", "create packing slip online", "packing slip PDF", "packing list generator"],
  status: "live",
  icon: "slip",
  highlights: ["Line items with SKU and variants", "Shop details and customer note", "Print on A4 or A5"],
  longDescription: "Turn an order into a tidy packing slip in under a minute. Add line items, variants and a thank-you note, then print it with your label.",
  features: [
    { title: "Itemized products", description: "Show product name, SKU, variant and quantity in a clear table." },
    { title: "Brand details", description: "Add your shop name and a personal customer message." },
    { title: "Return instructions", description: "Include an optional return address and policy note." },
    { title: "A4 and A5 sizes", description: "Choose a full A4 sheet or compact A5 packing slip." },
    { title: "Packing checklist", description: "Verify every line item before sealing the parcel." },
    { title: "PDF export", description: "Download a crisp PDF for records or batch printing." },
  ],
  steps: [
    { title: "Add shop details", description: "Enter your shop and contact information." },
    { title: "Enter line items", description: "Add products, SKU, variant and quantity." },
    { title: "Preview the slip", description: "Check the layout and order details." },
    { title: "Print or download", description: "Print immediately or export a PDF." },
  ],
  seoContent: [
    { heading: "Why every parcel benefits from a packing slip", paragraphs: ["A packing slip tells the customer exactly what is inside the parcel. A clear slip reduces missing-item questions, simplifies returns and helps a small shop present a professional experience.", "Unlike an invoice, a packing slip normally leaves out prices, making it suitable for gifts and marketplace orders."] },
    { heading: "Create a packing slip online", paragraphs: ["Use the online packing slip generator as a packing slip maker or packing list generator for any shop. Choose a free packing slip template, enter order details and produce a printable packing slip without installing software."] },
    { heading: "Download a packing slip PDF", paragraphs: ["Choose a full A4 layout or a compact A5 packing slip template. Add variants and SKUs, preview the document, then download a packing slip PDF that is ready to print and place inside the parcel."] },
  ],
  faqs: [
    { question: "What is the difference between a packing slip and an invoice?", answer: "A packing slip lists parcel contents and usually omits prices; an invoice records payment details." },
    { question: "Can I add shop details?", answer: "Yes. Add sender information, an optional logo, a customer message and footer text." },
    { question: "Is this a free packing slip generator?", answer: "Yes. You can create a packing slip online and download the printable PDF without a subscription." },
    { question: "Which paper sizes are supported?", answer: "Packing slips can be generated as A4 or A5 PDFs." },
    { question: "Does it work for marketplace orders?", answer: "Yes. The layout works for Etsy, eBay, Shopify and other stores." },
  ],
} satisfies Product;

const shippingLabelMaker = {
  slug: "shipping-label-maker", name: "Shipping Label Maker", summary: "Create printable 4x6, A4 or Letter shipping labels.",
  metaTitle: "Free Shipping Label Maker", metaDescription: "Create printable shipping labels.",
  keywords: ["shipping label maker", "4x6 shipping label"], status: "live", icon: "label",
  highlights: ["4x6 thermal output", "Address fields", "PDF download"], longDescription: "Create clean printable shipping labels.",
  features: [], steps: [], seoContent: [], faqs: [],
} satisfies Product;

export const metadata: Metadata = { title: packingSlipGenerator.metaTitle, description: packingSlipGenerator.metaDescription, keywords: packingSlipGenerator.keywords, alternates: { canonical: "/products/packing-slip-generator" } };
function PackingSlipGeneratorPage() { return <ProductDetail product={packingSlipGenerator} relatedProduct={shippingLabelMaker} />; }
export default PackingSlipGeneratorPage;
