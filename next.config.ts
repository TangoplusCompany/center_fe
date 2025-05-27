import type { NextConfig } from "next";

import { resolve } from "path";
const nextConfig: NextConfig = {
  webpack(config: any) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": resolve(__dirname, "src"),
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gym.tangoplus.co.kr",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
