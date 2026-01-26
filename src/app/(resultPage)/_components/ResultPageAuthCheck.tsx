"use client";

import { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function ResultPageAuthCheck() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 로그인 페이지 자체에서는 체크 안 함 (무한 리다이렉트 방지)
    if (pathname.includes("/result-page/login")) {
      return;
    }

    // result-page 경로이고 쿼리 파라미터 key가 있으면 인증 체크 건너뛰기
    // (쿼리 파라미터 key 자체가 인증 토큰 역할을 함)
    const keyParam = searchParams.get("key");
    if (pathname === "/result-page" && keyParam) {
      return;
    }

    const hasResultPageLogin = document.cookie.includes("resultPageLogin=true");
    
    if (!hasResultPageLogin) {
      // 쿠키가 없으면 쿠키가 설정될 때까지 polling
      let attempts = 0;
      const maxAttempts = 30; // 최대 3초 (100ms * 30)
      const interval = setInterval(() => {
        attempts++;
        
        // 쿼리 파라미터 key가 있으면 체크 건너뛰기
        const currentKey = searchParams.get("key");
        if (pathname === "/result-page" && currentKey) {
          clearInterval(interval);
          return;
        }
        
        // 쿠키 확인
        if (document.cookie.includes("resultPageLogin=true")) {
          clearInterval(interval);
          return;
        }
        
        // 최대 시도 횟수에 도달했고 쿠키도 없으면 리다이렉트
        if (attempts >= maxAttempts) {
          clearInterval(interval);
          router.replace("/result-page/login");
        }
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [router, pathname, searchParams]);

  return null;
}