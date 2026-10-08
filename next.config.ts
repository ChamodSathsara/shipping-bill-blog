import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/products", destination: "/shipping-label-maker", permanent: true },
      { source: "/products/shipping-label-maker", destination: "/shipping-label-maker", permanent: true },
      { source: "/products/packing-slip-generator", destination: "/packing-slip-generator", permanent: true },
      { source: "/blog/how-to-make-a-4x6-shipping-label", destination: "/blog/how-to-create-a-shipping-label", permanent: true },
      { source: "/blog/what-to-include-on-a-packing-slip", destination: "/blog/how-to-create-a-packing-slip", permanent: true },
      { source: "/blog/resize-shipping-label-pdf-to-4x6", destination: "/blog/shipping-label-size-guide", permanent: true },
      { source: "/blog/etsy-vs-ebay-vs-amazon-shipping-guide", destination: "/blog/packing-slip-vs-shipping-label", permanent: true },
    ];
  },
};

export default nextConfig;
