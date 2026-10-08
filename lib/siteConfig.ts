// Site-wide constants. Change the brand name here and it updates everywhere.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shipkit.example.com";

export const siteConfig = {
  name: "ShipKit",
  tagline: "Free shipping tools for online sellers",
  description:
  "Free, browser-based shipping tools for Etsy, eBay, Amazon, Shopify and Poshmark sellers: shipping label maker, packing slip generator and 4x6 label resizer.",
  url: siteUrl,
  email: "hello@shipkit.example.com",
  responseTime: "Within 1–2 business days",
  ogImage: `${siteUrl}/og-default.png`,
  social: {
    x: "https://x.com/shipkit",
    facebook: "https://facebook.com/shipkit",
    pinterest: "https://pinterest.com/shipkit"
  },
  // Google AdSense. ANABLE_ADSENSE controls whether ad areas are visible at all.
  adsense: {
    visible: process.env.NEXT_PUBLIC_ANABLE_ADSENSE?.trim().toLowerCase() === "true",
    publisherId: process.env.NEXT_PUBLIC_ADSENSE_ID ?? "",
    enabled:
      process.env.NEXT_PUBLIC_ANABLE_ADSENSE?.trim().toLowerCase() === "true" &&
      process.env.NODE_ENV === "production" &&
      Boolean(process.env.NEXT_PUBLIC_ADSENSE_ID)
  }
};
