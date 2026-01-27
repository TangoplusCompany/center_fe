import type { Metadata } from "next";
import ResultPageUserProvider from "@/providers/ResultPageUserProvider";
import ResultPageAuthCheck from "./_components/ResultPageAuthCheck";

export const metadata: Metadata = {
  title: "탱고바디 결과 페이지",
  description: "탱고바디 결과 페이지 입니다.",
};

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

