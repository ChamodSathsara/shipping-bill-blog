import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/products", destination: "/shipping-label-maker", permanent: true },
      { source: "/products/shipping-label-maker", destination: "/shipping-label-maker", permanent: true },
      { source: "/products/packing-slip-generator", destination: "/packing-slip-generator", permanent: true },
    ];
  },
};

export default nextConfig;
