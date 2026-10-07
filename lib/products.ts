import type { Product } from "../lib/types/product";

// Product catalog. To launch a tool: set status to "live" and implement the matching
// component in components/tools/. The product page swaps the "Coming Soon" preview for the real tool.
export const products: Product[] = [
{
  slug: "shipping-label-maker",
  name: "Shipping Label Maker",
  summary:
  "Enter sender and receiver details, order number and weight, then generate a printable shipping label. Supports 4x6 thermal labels, A4/Letter sheets, PDF and direct print.",
  metaTitle: "Free Shipping Label Maker – 4x6 & Printable",
  metaDescription:
  "Make printable shipping labels for free. Enter addresses, order number and weight, then print 4x6 thermal or A4/Letter labels as PDF. No signup.",
  keywords: [
  "shipping label maker",
  "free shipping label maker",
  "4x6 shipping label maker",
  "printable shipping label",
  "shipping label generator",
  "thermal shipping label maker"],

  status: "coming-soon",
  icon: "label",
  highlights: ["4x6 thermal, A4 and Letter sizes", "Sender, receiver, order # and weight", "Download as PDF or print instantly"],
  longDescription:
  "A fast, private label builder for sellers who ship from home. Fill in two addresses, add your order details and get a clean, scannable label sized for your printer.",
  features: [
  { title: "Sender and receiver fields", description: "Structured address inputs with country-aware formatting so nothing gets cut off." },
  { title: "4x6 thermal output", description: "Pixel-perfect 4x6 in labels for Rollo, Munbyn, Zebra and other thermal printers." },
  { title: "A4 and Letter sheets", description: "Print on regular paper or half-sheet adhesive labels with a standard inkjet or laser printer." },
  { title: "Order number and weight", description: "Add order IDs, parcel weight and an optional reference so packing stays organized." },
  { title: "PDF download", description: "Save a high-resolution PDF to print later or attach to your order records." },
  { title: "Private by design", description: "Label data is processed in your browser and never stored on our servers." }],

  steps: [
  { title: "Enter addresses", description: "Type or paste the sender and receiver details." },
  { title: "Add order details", description: "Include order number, weight and service notes." },
  { title: "Pick a size", description: "Choose 4x6 thermal, A4 or US Letter." },
  { title: "Print or download", description: "Send it straight to your printer or save a PDF." }],

  seoContent: [
  {
    heading: "A free shipping label maker built for small sellers",
    paragraphs: [
    "Most marketplace sellers do not need a full shipping platform for every parcel. Sometimes you are sending a replacement part, a wholesale sample or a local order that never touched Etsy or eBay checkout, and you just need a clean, legible label. ShipKit's shipping label maker is designed for exactly those moments: open the page, fill in the addresses and print.",
    "Because the tool runs entirely in your browser, there is no account to create and nothing to install. Your customer's address stays on your device, which matters if you handle personal data under GDPR or CCPA."]

  },
  {
    heading: "4x6 thermal labels or regular paper",
    paragraphs: [
    "The 4x6 inch format is the standard for thermal label printers and is accepted by USPS, UPS, FedEx, DHL and most regional carriers. If you do not own a thermal printer yet, the same label can be laid out on A4 or US Letter paper and taped to the box or printed on half-sheet adhesive labels.",
    "Every layout keeps generous quiet zones around the barcode area and uses high-contrast type so sorting scanners and delivery drivers can read it on the first try."]

  },
  {
    heading: "When to use a printable shipping label generator",
    paragraphs: [
    "Use this generator for return labels you include in the box, address labels for pre-paid postage, internal warehouse transfers, gift shipments or any parcel where you already have postage and simply need a professional label. For carrier-purchased postage, pair it with our 4x6 label resizer to fit carrier PDFs onto your thermal printer."]

  }],

  faqs: [
  { question: "Is the shipping label maker really free?", answer: "Yes. The tool will be completely free to use with no signup, watermark or label limit. It is supported by non-intrusive ads elsewhere on the site." },
  { question: "Does it include postage?", answer: "No. The label maker creates the address label layout. Postage must be purchased from your carrier or marketplace; you can then print both together." },
  { question: "Which printers are supported?", answer: "Any thermal printer that accepts 4x6 labels (Rollo, Munbyn, Zebra, Dymo 4XL and similar) plus any inkjet or laser printer for A4 and Letter sheets." },
  { question: "Is my address data stored?", answer: "No. Label details are processed in your browser and are not sent to or saved on our servers." }]

},
{
  slug: "packing-slip-generator",
  name: "Packing Slip Generator",
  summary:
  "Generate a professional packing slip with products, SKU, quantity and variant details to drop inside every parcel.",
  metaTitle: "Free Packing Slip Generator – Printable Template",
  metaDescription:
  "Create professional packing slips with SKU, quantity and variant details. Free printable packing slip template for Etsy, eBay and Shopify sellers.",
  keywords: [
  "packing slip generator",
  "packing slip template",
  "free packing slip generator",
  "printable packing slip",
  "packing list generator",
  "packing slip maker"],

  status: "coming-soon",
  icon: "slip",
  highlights: ["Line items with SKU and variants", "Your logo, note and return info", "Print 4x6, A4 or Letter"],
  longDescription:
  "Turn an order into a tidy, branded packing slip in under a minute. Add line items, variants and a thank-you note, then print it alongside your label.",
  features: [
  { title: "Itemized line items", description: "Product name, SKU, variant, and quantity in a clear, scannable table." },
  { title: "Brand touches", description: "Add your shop name, logo and a personal thank-you message." },
  { title: "Return instructions", description: "Optional return address and policy note so customers know what to do." },
  { title: "Multiple sizes", description: "Print on 4x6 thermal stock or full A4 and Letter paper." },
  { title: "Packing checklist", description: "Tick boxes per line so pickers can verify every item before sealing." },
  { title: "PDF export", description: "Download a crisp PDF for your records or batch printing." }],

  steps: [
  { title: "Add shop details", description: "Name, logo and contact info once." },
  { title: "Enter line items", description: "Products, SKU, variant and quantity." },
  { title: "Preview the slip", description: "Check layout and totals at a glance." },
  { title: "Print or download", description: "Print now or export a PDF." }],

  seoContent: [
  {
    heading: "Why every parcel needs a packing slip",
    paragraphs: [
    "A packing slip is the document that tells your customer, and anyone handling the box, exactly what is inside. Unlike an invoice it usually leaves out prices, which makes it ideal for gifts and marketplace orders. A clear slip reduces 'missing item' messages, speeds up returns and makes a small shop look established.",
    "ShipKit's packing slip generator focuses on the details that matter for handmade and resale sellers: variants like size and color, SKUs for inventory, and quantities that are easy to double-check."]

  },
  {
    heading: "A packing slip template that fits your printer",
    paragraphs: [
    "If you already print shipping labels on a 4x6 thermal printer, you can print your packing slip on the same roll and skip the inkjet entirely. Prefer paper? Choose A4 or US Letter for a full-page slip with room for a personal note and return instructions."]

  },
  {
    heading: "Packing list generator for multi-item orders",
    paragraphs: [
    "For orders with several items, the generator doubles as a packing list: each line gets a checkbox so you or a helper can confirm every product before the box is sealed. It is a simple habit that dramatically cuts wrong-item shipments during busy seasons."]

  }],

  faqs: [
  { question: "What is the difference between a packing slip and an invoice?", answer: "A packing slip lists what is in the parcel and usually omits prices. An invoice is a payment request or receipt and includes prices, taxes and payment terms." },
  { question: "Can I add my logo?", answer: "Yes. You will be able to upload a logo that stays in your browser for the session and appears at the top of each slip." },
  { question: "Can I print packing slips on a thermal printer?", answer: "Yes. The 4x6 layout is designed for thermal printers, so you can print slips on the same labels you use for shipping." },
  { question: "Does it work for Etsy and Shopify orders?", answer: "Yes. Enter the order details manually; the layout works for any marketplace or your own store." }]

},
{
  slug: "shipping-label-resizer",
  name: "Shipping Label Resizer",
  summary:
  "Crop, resize and convert A4/Letter label PDFs from UPS, FedEx, Amazon and eBay to 4x6 thermal printer size.",
  metaTitle: "Shipping Label Resizer – Convert PDF to 4x6",
  metaDescription:
  "Resize shipping label PDFs to 4x6 for thermal printers. Crop and convert A4 or Letter labels from UPS, FedEx, Amazon and eBay. Free, in your browser.",
  keywords: [
  "shipping label resizer",
  "resize shipping label to 4x6",
  "4x6 shipping label converter",
  "resize shipping label pdf",
  "crop shipping label",
  "thermal label converter"],

  status: "coming-soon",
  icon: "resize",
  highlights: ["Auto-detects the label area", "UPS, FedEx, Amazon and eBay PDFs", "Outputs print-ready 4x6 PDF"],
  longDescription:
  "Carriers and marketplaces often hand you a full-page PDF with a small label in the corner. The resizer finds the label, crops it and scales it to a crisp 4x6.",
  features: [
  { title: "Automatic crop", description: "Detects the label region on the page and trims the surrounding whitespace." },
  { title: "Carrier presets", description: "Tuned crop presets for UPS, FedEx, USPS, Amazon Buy Shipping and eBay labels." },
  { title: "Lossless barcodes", description: "Vector-preserving scaling keeps barcodes sharp and scannable." },
  { title: "Rotate and fit", description: "Rotate landscape labels and fit them to 4x6 portrait automatically." },
  { title: "Batch friendly", description: "Process multi-page PDFs and export a single 4x6 file." },
  { title: "Runs locally", description: "Files never leave your device; processing happens in your browser." }],

  steps: [
  { title: "Upload a PDF", description: "Drop in a carrier or marketplace label." },
  { title: "Choose a preset", description: "Select UPS, FedEx, Amazon, eBay or auto." },
  { title: "Adjust the crop", description: "Fine-tune the frame if needed." },
  { title: "Download 4x6", description: "Get a print-ready thermal PDF." }],

  seoContent: [
  {
    heading: "Resize shipping labels to 4x6 without the hassle",
    paragraphs: [
    "Buying postage through UPS, FedEx, Amazon or eBay often produces an 8.5x11 or A4 PDF, while thermal printers expect a 4x6 inch label. Printing the full page shrinks the label until barcodes fail to scan. The resizer solves this by cropping to the label itself and scaling it to exactly 4x6.",
    "Because the barcode is preserved as vector data wherever possible, the output stays sharp on 203 and 300 dpi printers."]

  },
  {
    heading: "A thermal label converter for every carrier",
    paragraphs: [
    "Each carrier lays out its labels differently. Presets handle the common formats, including labels with receipts or instructions printed on the same page, and you can always drag the crop frame manually for unusual layouts."]

  },
  {
    heading: "Crop shipping label PDFs privately",
    paragraphs: [
    "Shipping labels contain customer names and addresses. Unlike upload-based converters, ShipKit will process your file locally in the browser, so the PDF is never sent to a server. When you close the tab, it is gone."]

  }],

  faqs: [
  { question: "Will the barcode still scan after resizing?", answer: "Yes. The resizer keeps vector barcodes sharp and scales proportionally so carriers can scan them reliably." },
  { question: "Which label sources are supported?", answer: "PDF labels from UPS, FedEx, USPS, DHL, Amazon Buy Shipping, eBay, Etsy and Pirate Ship, plus a manual mode for anything else." },
  { question: "Can I convert multiple labels at once?", answer: "Yes. Multi-page PDFs will be converted into a single 4x6 file with one label per page." },
  { question: "Do you upload my PDF?", answer: "No. Files are processed in your browser and never uploaded to our servers." }]

}];