import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  }
};

export default nextConfig;
