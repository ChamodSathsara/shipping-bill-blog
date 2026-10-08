import type { Author, BlogPost, CategoryInfo } from "../lib/types/blog";

/*
 * BLOG CONTENT GUIDANCE
 * ---------------------------------------------------------------------------
 * - Each post should target 3,000+ words of genuinely useful content.
 * - Cover how to use our tools (label maker, packing slip generator, resizer)
 *   plus related topics: shipping tips, label sizes, thermal printers,
 *   Etsy/eBay/Amazon shipping, carrier comparisons and packing best practices.
 * - Content is an array of blocks. Use "h2"/"h3" for headings (they build the
 *   table of contents automatically), "p" for paragraphs, "ul" for lists and
 *   "tip" for callouts. In-article ads are inserted automatically after
 *   paragraph 3 and 7; the "Try this tool" card appears after paragraph 5.
 * - To add a post: copy one object below, give it a unique slug, set
 *   relatedProduct to a product slug from data/products.ts, and paste your
 *   article into `content`.
 * ---------------------------------------------------------------------------
 */

export const authors: Record<string, Author> = {
  chamod: {
    name: "Chamod Sathsara",
    role: "Software Engineer",
    bio: "Software Engineer with a B.Sc. (Hons) in Computation and Management from the University of Peradeniya. Chamod builds practical shipping and fulfillment tools for online sellers.",
    initials: "CS",
    linkedIn: "https://www.linkedin.com/in/chamodsathsara",
  },
};

export const blogCategories: CategoryInfo[] = [
  {
    name: "Shipping Labels",
    cover: "bg-gradient-to-br from-teal-600 to-cyan-800",
  },
  {
    name: "Packing & Fulfillment",
    cover: "bg-gradient-to-br from-amber-500 to-orange-700",
  },
  {
    name: "Marketplace Guides",
    cover: "bg-gradient-to-br from-indigo-500 to-blue-800",
  },
  {
    name: "Printers & Hardware",
    cover: "bg-gradient-to-br from-slate-600 to-slate-900",
  },
];

export const POSTS_PER_PAGE = 6;

export const blogPosts: BlogPost[] = [
  {
    title: "How to Create a Shipping Label Online – Step-by-Step Guide",
    slug: "how-to-create-a-shipping-label",
    description:
      "A step-by-step guide to entering shipment data, choosing a template, bulk generating and printing scanner-ready 4x6 labels.",
    image: "/blog/how-to-create-shipping-label.png",
    imageAlt: "Thermal printer producing a 4x6 shipping label beside a parcel",
    date: "2026-09-18",
    updatedAt: "2026-10-01",
    category: "Shipping Labels",
    tags: [
      "how to create a shipping label",
      "how to make a shipping label",
      "how to create shipping label online",
      "how to print a shipping label",
      "create shipping label online",
      "how to make shipping labels for small business",
      "how to print 4x6 shipping labels",
      "shipping label example",
    ],
    relatedProduct: "shipping-label-maker",
    readTime: 12,
    author: authors.chamod,
    featured: true,
    content: [
      // ── PASTE FULL ARTICLE BELOW (target 3,000+ words) ──
      {
        type: "p",
        text: "The 4x6 inch shipping label is the closest thing online selling has to a universal standard. USPS, UPS, FedEx and DHL all accept it, every major thermal printer is built around it, and it fits neatly on a poly mailer or a small box.",
      },
      {
        type: "p",
        text: "If you are learning how to make shipping labels for a small business, start with one consistent 4×6 template, verify every address and print a test barcode before processing a batch.",
      },
      {
        type: "p",
        text: "Yet many new sellers still print labels on full sheets of paper, cut them with scissors and tape them on. It works, but it is slow, it wastes ink and it looks amateur. This guide walks through the faster way.",
      },
      { type: "h2", text: "Why 4x6 became the standard" },
      {
        type: "p",
        text: "Carriers designed their sorting equipment around a label that holds a full address block, a large barcode and routing codes with enough quiet space for scanners. Four by six inches turned out to be the smallest size that fits all of it legibly.",
      },
      {
        type: "p",
        text: "Thermal printers followed. Because they use heat instead of ink, the cost per label drops to a few cents, and a roll of 500 labels lasts a small shop for months.",
      },
      { type: "h3", text: "4x6 vs half-sheet labels" },
      {
        type: "p",
        text: "Half-sheet adhesive labels (8.5x5.5 in) are the inkjet alternative. They are fine for low volume but cost more per label and take longer to print.",
      },
      {
        type: "ul",
        items: [
          "4x6 thermal: cheapest per label, fastest, no ink",
          "Half-sheet: works with any home printer",
          "Plain paper and tape: last resort, prone to smudging",
        ],
      },
      { type: "h2", text: "What a shipping label must include" },
      {
        type: "p",
        text: "At minimum: the sender's return address in the top left, the recipient's address in the center, the service level and a tracking barcode. Order numbers and weights are optional but make packing and dispute handling much easier.",
      },
      {
        type: "tip",
        text: "Always write the recipient address in uppercase with no punctuation — it is what carrier OCR systems read most reliably.",
      },
      {
        type: "p",
        text: "Keep at least a quarter inch of margin around the barcode and never resize it non-proportionally, or scanners may reject it.",
      },
      { type: "h2", text: "Printing your first label" },
      {
        type: "p",
        text: "Load your 4x6 roll, set the printer driver's paper size to 4x6 in, and disable any 'fit to page' scaling. Print a test label and measure it; the barcode should be crisp with no grey banding.",
      },
      {
        type: "p",
        text: "If your label came from a carrier as a full-page PDF, crop it to the label area first instead of shrinking the whole page. That keeps barcodes at full size.",
      },
      { type: "h2", text: "Step 1 – Choose a Shipping Label Template" },
      {
        type: "p",
        text: "Open the free Shipping Label Maker and choose the Marketplace, Minimal Mono, Clean Hierarchy, Simple List or Standard Barcode 4×6 template.",
      },
      {
        type: "image",
        src: "/blog/screenshots/shipping-templates.png",
        alt: "Shipping Label Maker template selection showing five 4x6 layouts",
        caption: "Choose one of the five 4×6 shipping label templates.",
      },
      { type: "h2", text: "Step 2 – Enter Sender Information" },
      {
        type: "p",
        text: "Add the return name, company, street address, city, state, postal code, country and phone number.",
      },
      {
        type: "image",
        src: "/blog/screenshots/shipping-sender.png",
        alt: "Sender information form in the Shipping Label Maker",
        caption: "Enter the sender or return-address information.",
      },
      { type: "h2", text: "Step 3 – Enter Recipient Information" },
      {
        type: "p",
        text: "Enter the delivery address carefully and confirm the postal code before generating the label.",
      },
      {
        type: "image",
        src: "/blog/screenshots/shipping-recipient.png",
        alt: "Recipient address form in the Shipping Label Maker",
        caption: "Add the recipient’s complete delivery address.",
      },
      { type: "h2", text: "Step 4 – Add Package Details" },
      {
        type: "p",
        text: "Choose the package type and enter its weight and dimensions using the correct units.",
      },
      {
        type: "image",
        src: "/blog/screenshots/shipping-package.png",
        alt: "Package type weight and dimension fields",
        caption: "Enter the parcel type, weight and dimensions.",
      },
      { type: "h2", text: "Step 5 – Add Carrier and Tracking Information" },
      {
        type: "p",
        text: "Select the carrier and service level, then enter the tracking and reference numbers used to create the Code 128 barcode.",
      },
      {
        type: "image",
        src: "/blog/screenshots/shipping-format.png",
        alt: "Shipping format carrier marketplace and service controls",
        caption: "Choose the carrier, marketplace, service and ship date.",
      },
      {
        type: "image",
        src: "/blog/screenshots/shipping-tracking.png",
        alt: "Tracking reference heading and handling instruction fields",
        caption:
          "Add the tracking number, reference and handling instructions.",
      },
      { type: "h2", text: "Step 6 – Preview Your Shipping Label" },
      {
        type: "p",
        text: "Check every address line and scan the preview barcode before printing a full batch.",
      },
      {
        type: "image",
        src: "/blog/screenshots/shipping-preview.png",
        alt: "Live preview of a completed 4x6 shipping label",
        caption: "Review the live 4×6 preview before generating the PDF.",
      },
      { type: "h2", text: "Step 7 – Download or Print Your Label" },
      {
        type: "p",
        text: "Generate the PDF, download it or open the system print dialog and print at 100% on 4×6 media.",
      },
      {
        type: "image",
        src: "/blog/screenshots/shipping-bulk.png",
        alt: "Shipping label bulk spreadsheet with Excel import and add row controls",
        caption:
          "For multiple shipments, add rows manually or import the Excel template.",
      },
      // ── END OF ARTICLE ──
    ],
  },
  {
    title: "How to Create a Packing Slip – Step-by-Step Guide",
    slug: "how-to-create-a-packing-slip",
    description:
      "Create an A4 or A5 packing slip with order details, line items, branding, customer messages and print-ready PDF output.",
    image: "/blog/how-to-create-packing-slip.png",
    imageAlt: "A4 and A5 packing slips on an ecommerce fulfillment desk",
    date: "2026-09-05",
    updatedAt: "2026-09-20",
    category: "Packing & Fulfillment",
    tags: [
      "how to create a packing slip",
      "how to make a packing slip",
      "how to fill out a packing slip",
      "create packing slip online",
      "how to make a packing list",
      "packing slip example",
      "packing slip format",
      "what goes on a packing slip",
    ],
    relatedProduct: "packing-slip-generator",
    readTime: 9,
    author: authors.chamod,
    featured: false,
    content: [
      // ── PASTE FULL ARTICLE BELOW (target 3,000+ words) ──
      {
        type: "p",
        text: "A packing slip is the quiet workhorse of fulfillment. It tells customers what they should find in the box, helps you catch picking errors and makes returns far simpler.",
      },
      {
        type: "p",
        text: "It is also one of the few printed touchpoints a small shop gets with a buyer, so it is worth doing well.",
      },
      {
        type: "p",
        text: "To understand what goes on a packing slip or how to make a packing list, focus on the order number, sender and ship-to details, plus every product, SKU, variant and quantity in the parcel.",
      },
      { type: "h2", text: "The essential fields" },
      {
        type: "ul",
        items: [
          "Shop name and contact email",
          "Order number and order date",
          "Ship-to name and address",
          "Each item with SKU, variant and quantity",
          "Return or exchange instructions",
        ],
      },
      {
        type: "p",
        text: "Prices are optional. Leaving them off makes the slip suitable for gift orders, which are more common than most sellers expect during the holidays.",
      },
      { type: "h3", text: "Variants deserve their own column" },
      {
        type: "p",
        text: "Size, color and personalization are where most wrong-item shipments come from. Giving variants a dedicated column makes them impossible to miss during packing.",
      },
      { type: "h2", text: "Packing slip vs invoice" },
      {
        type: "p",
        text: "An invoice is a financial document with prices, taxes and payment terms. A packing slip describes the physical contents. Some sellers combine both, but separating them keeps each one simple.",
      },
      {
        type: "p",
        text: "Marketplaces like Etsy and eBay generate basic slips, but they are often cluttered and hard to brand.",
      },
      { type: "h2", text: "Adding a personal touch" },
      {
        type: "p",
        text: "A one-line handwritten-style thank-you note on the slip measurably increases repeat purchases for small shops. Keep it short and genuine.",
      },
      {
        type: "p",
        text: "Finally, add a short line about how to leave a review. Timing matters: the moment a customer opens the box is when they are most likely to act on it.",
      },
      { type: "h2", text: "Step 1 – Choose a Packing Slip Template" },
      {
        type: "p",
        text: "Open the Packing Slip Generator, choose a visual template, and select A4 or A5 paper.",
      },
      {
        type: "image",
        src: "/blog/screenshots/packing-templates.png",
        alt: "Packing Slip Generator template selection",
        caption:
          "Choose a Standard, Minimal, Modern, Compact or Branded packing slip.",
      },
      { type: "h2", text: "Step 2 – Enter Order Information" },
      {
        type: "p",
        text: "Add the order number, order date and optional packing slip number.",
      },
      {
        type: "image",
        src: "/blog/screenshots/packing-order.png",
        alt: "Packing slip order information and A4 A5 paper size selector",
        caption: "Enter order information and select A4 or A5 paper.",
      },
      { type: "h2", text: "Step 3 – Enter Sender Information" },
      {
        type: "p",
        text: "Enter your shop, warehouse or return-address details.",
      },
      {
        type: "image",
        src: "/blog/screenshots/packing-sender.png",
        alt: "Packing slip sender information form",
        caption: "Add the sender, shop or warehouse details.",
      },
      { type: "h2", text: "Step 4 – Enter Ship-To Information" },
      {
        type: "p",
        text: "Add the customer's delivery name and address exactly as it appears on the order.",
      },
      {
        type: "image",
        src: "/blog/screenshots/packing-recipient.png",
        alt: "Packing slip ship-to information form",
        caption: "Enter the customer’s ship-to details.",
      },
      { type: "h2", text: "Step 5 – Add Order Items" },
      {
        type: "p",
        text: "Add each SKU, description, variant and quantity. Duplicate rows when products share similar details.",
      },
      {
        type: "image",
        src: "/blog/screenshots/packing-items.png",
        alt: "Packing slip item editor with SKU description variant and quantity",
        caption: "Add every item, SKU, variant and quantity in the parcel.",
      },
      { type: "h2", text: "Step 6 – Add Special Instructions" },
      {
        type: "p",
        text: "Include packing notes, a customer message, footer text and an optional business logo.",
      },
      {
        type: "image",
        src: "/blog/screenshots/packing-branding.png",
        alt: "Packing slip branding display and message controls",
        caption:
          "Customize the heading, logo, visible columns and customer messages.",
      },
      { type: "h2", text: "Step 7 – Preview the Packing Slip" },
      {
        type: "p",
        text: "Check the addresses and ensure every item remains aligned in the live preview.",
      },
      {
        type: "image",
        src: "/blog/screenshots/packing-preview.png",
        alt: "Live preview of an A4 packing slip",
        caption: "Confirm the selected template and paper-size preview.",
      },
      { type: "h2", text: "Step 8 – Download or Print" },
      {
        type: "p",
        text: "Generate the A4 or A5 PDF, download a copy or open the system print dialog.",
      },
      {
        type: "image",
        src: "/blog/screenshots/packing-pdf.png",
        alt: "Generated printable packing slip PDF",
        caption:
          "Download the generated PDF or send it to the system print dialog.",
      },
      // ── END OF ARTICLE ──
    ],
  },
  {
    title: "Shipping Label Size Guide: 4×6, 3×4 & Standard Label Dimensions",
    slug: "shipping-label-size-guide",
    description:
      "Understand standard shipping label sizes, 4×6 and 3×4 dimensions, thermal printer formats, and which size to use.",
    image: "/blog/shipping-label-size-guide.png",
    imageAlt:
      "Comparison of standard shipping label dimensions beside a thermal printer",
    date: "2026-08-22",
    updatedAt: "2026-09-12",
    category: "Printers & Hardware",
    tags: [
      "shipping label size",
      "standard shipping label size",
      "shipping label dimensions",
      "4x6 shipping label size",
      "thermal shipping label size",
      "shipping label size in inches",
      "what size is a shipping label",
      "4x6 label dimensions",
      "shipping label size for thermal printer",
    ],
    relatedProduct: "shipping-label-maker",
    readTime: 10,
    author: authors.chamod,
    featured: false,
    content: [
      // ── PASTE FULL ARTICLE BELOW (target 3,000+ words) ──
      {
        type: "p",
        text: "Shipping label size affects readability, barcode scanning and how easily a label fits on a parcel. The most common standard shipping label size is 4×6 inches.",
      },
      { type: "h2", text: "What Is the Standard Shipping Label Size?" },
      {
        type: "p",
        text: "For parcel shipping, 4×6 inches is the widely used format across thermal printers and major carrier workflows. It provides enough room for addresses, routing data and a readable tracking barcode.",
      },
      { type: "h2", text: "4×6 Shipping Labels" },
      {
        type: "p",
        text: "A 4×6 shipping label measures four inches wide by six inches tall. These 4×6 label dimensions are the standard shipping label size for a thermal printer. ShipKit creates labels at this exact physical page size so users can print at 100% or Actual Size.",
      },
      { type: "h2", text: "3×4 Shipping Labels" },
      {
        type: "p",
        text: "A 3×4 label can work for small internal inventory or address labels, but it gives carrier barcodes less space. ShipKit standardizes generated carrier-style labels at 4×6 for better scanner reliability.",
      },
      { type: "h2", text: "Thermal Printer Label Sizes" },
      {
        type: "p",
        text: "Most desktop shipping printers support 4×6 rolls. Confirm the printer driver is set to 4×6 inches, portrait orientation and 100% scale before printing.",
      },
      { type: "h2", text: "Which Label Size Should You Use?" },
      {
        type: "p",
        text: "Use 4×6 for parcel shipping. Use smaller formats only when the carrier or your internal workflow explicitly supports them.",
      },
      { type: "h2", text: "How to Create a 4×6 Shipping Label" },
      {
        type: "p",
        text: "Open the Shipping Label Maker, choose a template, enter sender and recipient information, add package and tracking details, then download or print the generated 4×6 PDF.",
      },
      {
        type: "tip",
        text: "Print at Actual Size and scan one test barcode before producing a large batch.",
      },
      // ── END OF ARTICLE ──
    ],
  },
  {
    title: "Packing Slip vs Shipping Label: What's the Difference?",
    slug: "packing-slip-vs-shipping-label",
    description:
      "Learn the difference between a packing slip and shipping label, what each contains, where each goes, and whether you need both.",
    image: "/blog/packing-slip-vs-shipping-label.png",
    imageAlt:
      "Shipping label outside a parcel compared with a packing slip inside the box",
    date: "2026-08-08",
    updatedAt: "2026-08-30",
    category: "Packing & Fulfillment",
    tags: [
      "packing slip vs shipping label",
      "shipping label vs packing slip",
      "difference between packing slip and shipping label",
      "packing slip and shipping label",
      "is a packing slip the same as a shipping label",
      "do I need a packing slip and shipping label",
    ],
    relatedProduct: "shipping-label-maker",
    readTime: 14,
    author: authors.chamod,
    featured: false,
    content: [
      // ── PASTE FULL ARTICLE BELOW (target 3,000+ words) ──
      {
        type: "p",
        text: "A packing slip and shipping label travel with the same order, but they perform different jobs. One guides the carrier; the other explains the parcel contents to the seller and customer.",
      },
      {
        type: "p",
        text: "Is a packing slip the same as a shipping label? No. The label routes the parcel from the outside, while the packing slip documents its contents inside the package.",
      },
      { type: "h2", text: "What Is a Shipping Label?" },
      {
        type: "p",
        text: "A shipping label is attached to the outside of a parcel. It identifies the sender and recipient and normally carries routing, service and tracking information in a barcode.",
      },
      { type: "h2", text: "What Is a Packing Slip?" },
      {
        type: "p",
        text: "A packing slip is placed inside the package. It lists the order number, ship-to details and the products, SKUs, variants and quantities included in the shipment.",
      },
      { type: "h2", text: "Shipping Label vs Packing Slip" },
      {
        type: "ul",
        items: [
          "Shipping label: outside the parcel and used by the carrier",
          "Packing slip: inside the parcel and used by the seller and recipient",
          "Shipping label: includes a tracking barcode",
          "Packing slip: includes an itemized product table",
        ],
      },
      { type: "h2", text: "Where Each Document Goes" },
      {
        type: "p",
        text: "Attach the shipping label flat on the largest exterior surface. Place the packing slip inside the box above the products where the customer can find it immediately.",
      },
      { type: "h2", text: "What Information Each Contains" },
      {
        type: "p",
        text: "The label contains delivery addresses, package information, service level and tracking. The slip contains order details, product lines, quantities and optional customer or return messages.",
      },
      { type: "h2", text: "Do You Need Both?" },
      {
        type: "p",
        text: "You need a valid carrier label to ship a parcel. A packing slip is optional for many orders, but it reduces picking errors and gives customers a clear record of what arrived.",
      },
      { type: "h2", text: "Example Shipping Workflow" },
      {
        type: "p",
        text: "Create the 4×6 shipping label for the outside, generate an A4 or A5 packing slip for the inside, verify the item quantities, seal the parcel and scan the label before dispatch.",
      },
      // ── END OF ARTICLE ──
    ],
  },
];
