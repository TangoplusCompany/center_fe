import type { Metadata } from "next";
import "./globals.css";
import { headers } from "next/headers";
import { ThemeProvider } from "@/components/theme-provider";
import QueryProvider from "@/providers/QueryProvider";

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host") ?? "";
  const isMy = host.startsWith("my.tangobody.co.kr");

  return {
    title: isMy ? "탱고바디 측정 결과" : "탱고바디 센터 관리자",
    description: isMy
      ? "탱고바디 측정 결과 확인 페이지입니다."
      : "탱고바디 센터 관리자 페이지 입니다.",
    icons: {
      icon: isMy ? "/favicon-admin.svg" : "/favicon-admin.svg",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/variable/woff2/SUIT-Variable.css"
        />
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
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