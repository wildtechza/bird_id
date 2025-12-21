import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    // Disable built-in optimization because static export does not support the Image API
    unoptimized: true,
  },
};

export default nextConfig;
