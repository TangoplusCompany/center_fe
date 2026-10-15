import type { Metadata } from "next";
import "@/app/globals.css";
import { headers } from "next/headers";
import { ThemeProvider } from "@/components/theme-provider";
import QueryProvider from "@/providers/QueryProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host") ?? "";
  const isMy = host.startsWith("my.tangobody.co.kr");
  const t = await getTranslations("Index");

  return {
    title: isMy ? t("meta_title_my") : t("meta_title_admin"),
    description: isMy
      ? t("meta_desc_my")
      : t("meta_desc_admin"),
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