"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createAuthStore } from "@/stores/AuthStore";
import ResultPageUserProvider from "@/providers/ResultPageUserProvider";

export default function ResultPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authStore = createAuthStore();
  const router = useRouter();

  useEffect(() => {
    // 새로운 인증 방식: resultPageLogin 쿠키 확인
    // 또는 다른 인증 로직을 여기에 구현
    const hasResultPageLogin = document.cookie.includes("resultPageLogin=true");
    
    // 원하는 인증 방식에 따라 수정 가능:
    // 1. 쿠키 기반: resultPageLogin 쿠키 확인
    // 2. 토큰 기반: localStorage나 sessionStorage의 토큰 확인
    // 3. 별도 API 호출로 인증 확인
    
    if (!hasResultPageLogin) {
      // 인증되지 않은 경우 리다이렉트
      // 예: router.replace("/result-page/login");
      // 또는 다른 로그인 페이지로 이동
      authStore.getState().setLogout();
      router.replace("/result-page/login");
    }
  }, [authStore, router]);

  return (
    <div className="min-h-screen w-full">
      <ResultPageUserProvider>
      {/* 결과 페이지 전용 레이아웃 */}
      {children}
      </ResultPageUserProvider>
    </div>
  );
}

