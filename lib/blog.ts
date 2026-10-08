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
  maya: {
    name: "Maya Torres",
    role: "Fulfillment Editor",
    bio: "Maya ran a handmade jewelry shop on Etsy for six years and has shipped more than 20,000 orders. She writes about practical shipping workflows for small sellers.",
    initials: "MT"
  },
  dev: {
    name: "Dev Patel",
    role: "Product Lead",
    bio: "Dev builds ShipKit's tools and tests them on every thermal printer he can get his hands on. Previously a warehouse systems engineer.",
    initials: "DP"
  }
};

export const blogCategories: CategoryInfo[] = [
{ name: "Shipping Labels", cover: "bg-gradient-to-br from-teal-600 to-cyan-800" },
{ name: "Packing & Fulfillment", cover: "bg-gradient-to-br from-amber-500 to-orange-700" },
{ name: "Marketplace Guides", cover: "bg-gradient-to-br from-indigo-500 to-blue-800" },
{ name: "Printers & Hardware", cover: "bg-gradient-to-br from-slate-600 to-slate-900" }];


export const POSTS_PER_PAGE = 6;

export const blogPosts: BlogPost[] = [
{
  title: "How to Use the Shipping Label Maker (Step-by-Step)",
  slug: "how-to-make-a-4x6-shipping-label",
  description:
  "A step-by-step guide to entering shipment data, choosing a template, bulk generating and printing scanner-ready 4x6 labels.",
  date: "2026-09-18",
  updatedAt: "2026-10-01",
  category: "Shipping Labels",
  tags: ["4x6 labels", "thermal printer", "label maker"],
  relatedProduct: "shipping-label-maker",
  readTime: 12,
  author: authors.maya,
  featured: true,
  content: [
  // ── PASTE FULL ARTICLE BELOW (target 3,000+ words) ──
  { type: "p", text: "The 4x6 inch shipping label is the closest thing online selling has to a universal standard. USPS, UPS, FedEx and DHL all accept it, every major thermal printer is built around it, and it fits neatly on a poly mailer or a small box." },
  { type: "p", text: "Yet many new sellers still print labels on full sheets of paper, cut them with scissors and tape them on. It works, but it is slow, it wastes ink and it looks amateur. This guide walks through the faster way." },
  { type: "h2", text: "Why 4x6 became the standard" },
  { type: "p", text: "Carriers designed their sorting equipment around a label that holds a full address block, a large barcode and routing codes with enough quiet space for scanners. Four by six inches turned out to be the smallest size that fits all of it legibly." },
  { type: "p", text: "Thermal printers followed. Because they use heat instead of ink, the cost per label drops to a few cents, and a roll of 500 labels lasts a small shop for months." },
  { type: "h3", text: "4x6 vs half-sheet labels" },
  { type: "p", text: "Half-sheet adhesive labels (8.5x5.5 in) are the inkjet alternative. They are fine for low volume but cost more per label and take longer to print." },
  { type: "ul", items: ["4x6 thermal: cheapest per label, fastest, no ink", "Half-sheet: works with any home printer", "Plain paper and tape: last resort, prone to smudging"] },
  { type: "h2", text: "What a shipping label must include" },
  { type: "p", text: "At minimum: the sender's return address in the top left, the recipient's address in the center, the service level and a tracking barcode. Order numbers and weights are optional but make packing and dispute handling much easier." },
  { type: "tip", text: "Always write the recipient address in uppercase with no punctuation — it is what carrier OCR systems read most reliably." },
  { type: "p", text: "Keep at least a quarter inch of margin around the barcode and never resize it non-proportionally, or scanners may reject it." },
  { type: "h2", text: "Printing your first label" },
  { type: "p", text: "Load your 4x6 roll, set the printer driver's paper size to 4x6 in, and disable any 'fit to page' scaling. Print a test label and measure it; the barcode should be crisp with no grey banding." },
  { type: "p", text: "If your label came from a carrier as a full-page PDF, crop it to the label area first instead of shrinking the whole page. That keeps barcodes at full size." }
  // ── END OF ARTICLE ──
  ]
},
{
  title: "How to Use the Packing Slip Generator (A4 & A5)",
  slug: "what-to-include-on-a-packing-slip",
  description:
  "Create an A4 or A5 packing slip with order details, line items, branding, customer messages and print-ready PDF output.",
  date: "2026-09-05",
  updatedAt: "2026-09-20",
  category: "Packing & Fulfillment",
  tags: ["packing slip", "fulfillment", "templates"],
  relatedProduct: "packing-slip-generator",
  readTime: 9,
  author: authors.maya,
  featured: false,
  content: [
  // ── PASTE FULL ARTICLE BELOW (target 3,000+ words) ──
  { type: "p", text: "A packing slip is the quiet workhorse of fulfillment. It tells customers what they should find in the box, helps you catch picking errors and makes returns far simpler." },
  { type: "p", text: "It is also one of the few printed touchpoints a small shop gets with a buyer, so it is worth doing well." },
  { type: "h2", text: "The essential fields" },
  { type: "ul", items: ["Shop name and contact email", "Order number and order date", "Ship-to name and address", "Each item with SKU, variant and quantity", "Return or exchange instructions"] },
  { type: "p", text: "Prices are optional. Leaving them off makes the slip suitable for gift orders, which are more common than most sellers expect during the holidays." },
  { type: "h3", text: "Variants deserve their own column" },
  { type: "p", text: "Size, color and personalization are where most wrong-item shipments come from. Giving variants a dedicated column makes them impossible to miss during packing." },
  { type: "h2", text: "Packing slip vs invoice" },
  { type: "p", text: "An invoice is a financial document with prices, taxes and payment terms. A packing slip describes the physical contents. Some sellers combine both, but separating them keeps each one simple." },
  { type: "p", text: "Marketplaces like Etsy and eBay generate basic slips, but they are often cluttered and hard to brand." },
  { type: "h2", text: "Adding a personal touch" },
  { type: "p", text: "A one-line handwritten-style thank-you note on the slip measurably increases repeat purchases for small shops. Keep it short and genuine." },
  { type: "p", text: "Finally, add a short line about how to leave a review. Timing matters: the moment a customer opens the box is when they are most likely to act on it." }
  // ── END OF ARTICLE ──
  ]
},
{
  title: "How to Resize a Shipping Label PDF to 4x6 for Thermal Printers",
  slug: "resize-shipping-label-pdf-to-4x6",
  description:
  "Convert UPS, FedEx, Amazon and eBay full-page label PDFs to 4x6 without losing barcode quality.",
  date: "2026-08-22",
  updatedAt: "2026-09-12",
  category: "Printers & Hardware",
  tags: ["resize label", "thermal printer", "PDF"],
  relatedProduct: "shipping-label-maker",
  readTime: 10,
  author: authors.dev,
  featured: false,
  content: [
  // ── PASTE FULL ARTICLE BELOW (target 3,000+ words) ──
  { type: "p", text: "You bought postage, downloaded the label and hit print — only to see a tiny label floating in the middle of a 4x6 sticker. Sound familiar? It happens because many carriers export labels on a full 8.5x11 or A4 page." },
  { type: "p", text: "The fix is to crop the label out of the page before printing, not to shrink the page to fit." },
  { type: "h2", text: "Why shrinking breaks barcodes" },
  { type: "p", text: "Barcodes encode data in the width of their bars. Scaling a full page down to 4x6 can shrink those bars below what a scanner can resolve, especially on 203 dpi thermal printers." },
  { type: "p", text: "Cropping keeps the label at, or very close to, its original physical size, so the barcode stays readable." },
  { type: "h2", text: "Carrier-by-carrier notes" },
  { type: "h3", text: "UPS and FedEx" },
  { type: "p", text: "Both usually place the label on the top half of the page with instructions below. Crop the top half and rotate if needed." },
  { type: "h3", text: "Amazon and eBay" },
  { type: "p", text: "Amazon Buy Shipping and eBay labels often include a packing slip on the same page. Crop just the label area and print the slip separately." },
  { type: "tip", text: "Set your printer driver to 4x6 and 'actual size' — any automatic scaling undoes your careful crop." },
  { type: "h2", text: "Testing your output" },
  { type: "p", text: "Before printing a batch, scan a test label with your phone's camera or a free barcode app. If it reads instantly, carriers will read it too." },
  { type: "p", text: "Keep a few spare labels for test prints whenever you change printer settings or label stock." }
  // ── END OF ARTICLE ──
  ]
},
{
  title: "Etsy vs eBay vs Amazon: A Shipping Guide for Small Sellers",
  slug: "etsy-vs-ebay-vs-amazon-shipping-guide",
  description:
  "How shipping labels, rates and handling times differ across Etsy, eBay and Amazon — and how to run one workflow for all three.",
  date: "2026-08-08",
  updatedAt: "2026-08-30",
  category: "Marketplace Guides",
  tags: ["Etsy", "eBay", "Amazon", "carriers"],
  relatedProduct: "shipping-label-maker",
  readTime: 14,
  author: authors.maya,
  featured: false,
  content: [
  // ── PASTE FULL ARTICLE BELOW (target 3,000+ words) ──
  { type: "p", text: "Selling on more than one marketplace is one of the best ways to grow, but each platform has its own shipping rules, label tools and handling-time expectations." },
  { type: "p", text: "This guide compares the three biggest marketplaces from a shipping point of view and shows how to keep one simple workflow." },
  { type: "h2", text: "Etsy shipping" },
  { type: "p", text: "Etsy Labels offer discounted USPS, FedEx and Canada Post rates. Labels download as PDFs sized for 4x6 or full page, depending on your settings." },
  { type: "p", text: "Etsy rewards accurate processing times in search, so it pays to set realistic handling days and stick to them." },
  { type: "h2", text: "eBay shipping" },
  { type: "p", text: "eBay's label tool supports USPS, UPS and FedEx with commercial pricing. Its PDFs often combine label and packing slip on one page." },
  { type: "h3", text: "Handling time and tracking" },
  { type: "p", text: "Upload tracking within your stated handling time to protect your seller metrics and avoid defects." },
  { type: "h2", text: "Amazon shipping" },
  { type: "p", text: "Merchant-fulfilled orders can use Amazon Buy Shipping, which provides A-to-z claim protection when you ship on time with an eligible service." },
  { type: "ul", items: ["Etsy: reward for accurate processing times", "eBay: strict tracking upload windows", "Amazon: Buy Shipping protection"] },
  { type: "p", text: "Whatever the platform, standardizing on 4x6 thermal labels and a consistent packing slip saves real time every day." }
  // ── END OF ARTICLE ──
  ]
}];
