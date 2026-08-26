import type { Metadata } from "next";
import { Suspense } from "react";
import DelegationContent from "./_components/DelegationContent";

export const metadata: Metadata = {
  title: "센터 위임 결과",
  description: "센터 위임 처리 결과 페이지입니다.",
};

export default function DelegationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">처리 결과를 확인 중입니다...</p>
        </div>
      }
    >
      <DelegationContent />
    </Suspense>
  );
}
