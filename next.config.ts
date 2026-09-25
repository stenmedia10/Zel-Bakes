import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
    deviceSizes: [480, 800, 1200],
    imageSizes: [160],
  },
};

export default nextConfig;
