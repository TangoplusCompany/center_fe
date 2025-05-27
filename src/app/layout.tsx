import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import QueryProvider from "@/providers/QueryProvider";
import Script from "next/script";

export const metadata: Metadata = {
  title: "탱고바디 센터 관리자",
  description: "탱고바디 센터 관리자 페이지 입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script
        src="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/variable/woff2/SUIT-Variable.css"
        rel="stylesheet"
      />
      <body className={`antialiased`}>
        <ThemeProvider
          attribute={"class"}
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
