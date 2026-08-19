import type { Metadata } from "next";
import "@/app/globals.css";
import { headers } from "next/headers";
import { ThemeProvider } from "@/components/theme-provider";
import QueryProvider from "@/providers/QueryProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host") ?? "";
  const isMy = host.startsWith("my.tangobody.co.kr");

  return {
    title: isMy ? "탱고바디 측정 결과" : "탱고바디 센터 관리자",
    description: isMy
      ? "탱고바디 측정 결과 확인 페이지입니다."
      : "탱고바디 센터 관리자 페이지 입니다.",
    icons: {
      icon: isMy ? "/favicon_my.ico" : "/favicon_admin.ico",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // 지원하지 않는 언어로 접근 시 404 처리
  if (!["ko", "en"].includes(locale)) {
    notFound();
  }

  // 서버에서 해당 locale의 번역 메시지 로드
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/variable/woff2/SUIT-Variable.css"
        />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <QueryProvider>{children}</QueryProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}