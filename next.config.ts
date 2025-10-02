import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  trailingSlash: false,
  outputFileTracingRoot: __dirname,
  experimental: {
    turbo: undefined
  }
};

export default nextConfig;
