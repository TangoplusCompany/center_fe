// vitest.config.ts
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom", // React 컴포넌트 테스트라면 필수
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // ✅ Next.js의 @ alias 대응
    },
  },
});
