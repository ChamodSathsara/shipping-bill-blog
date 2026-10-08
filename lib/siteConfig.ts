// Site-wide constants. Change the brand name here and it updates everywhere.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shipkit.net";

export const siteConfig = {
  name: "ShipKit",
  tagline: "Free shipping tools for online sellers",
  description:
  "Free shipping tools for Etsy, eBay, Amazon, Shopify and Poshmark sellers: a 4×6 shipping label maker and printable packing slip generator.",
  url: siteUrl,
  email: "hello@shipkit.net",
  responseTime: "Within 1–2 business days",
  ogImage: `${siteUrl}/og-default.png`,
  social: {
    linkedin: "https://www.linkedin.com/in/chamodsathsara"
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
