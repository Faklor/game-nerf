import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
