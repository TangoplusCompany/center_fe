import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
  webpack: (config, context) => {
    if (context.isServer) {
      if (Array.isArray(config.resolve.alias)) {
        // Next.js에서는 항상 객체 타입이지만,
        // TypeScript 오류를 피하고
        // 향후 발생할 수 있는 변경사항에 대비하기 위해 이 분기를 유지
        config.resolve.alias.push({ name: "msw/browser", alias: false });
      } else {
        config.resolve.alias["msw/browser"] = false;
      }
    } else {
      // msw/node를 무시하도록 설정
      if (Array.isArray(config.resolve.alias)) {
        config.resolve.alias.push({ name: "msw/node", alias: false });
      } else {
        config.resolve.alias["msw/node"] = false;
      }
    }
    return config;
  },
};

export default nextConfig;
