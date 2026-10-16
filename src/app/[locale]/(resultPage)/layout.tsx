import type { Metadata } from "next";
import ResultPageUserProvider from "@/providers/ResultPageUserProvider";
import ResultPageAuthCheck from "./_components/ResultPageAuthCheck";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Index");
  return {
    title: t("meta_title_result_page"),
    description: t("meta_desc_result_page"),
  };
}

export default function ResultPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full">
      <ResultPageUserProvider>
        <ResultPageAuthCheck />
        {/* 결과 페이지 전용 레이아웃 */}
        {children}
      </ResultPageUserProvider>
    </div>
  );
}

