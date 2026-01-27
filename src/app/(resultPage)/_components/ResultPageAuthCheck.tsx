"use client";

import { useEffect, useContext } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useResultPageUserStore, ResultPageUserContext } from "@/providers/ResultPageUserProvider";

export default function ResultPageAuthCheck() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // zustand store 상태 확인 (persist가 자동으로 sessionStorage에서 복원)
  const isLogin = useResultPageUserStore((state) => state.isLogin);
  const user = useResultPageUserStore((state) => state.user);
  const store = useContext(ResultPageUserContext);

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

    // Store 상태 확인 (persist가 자동으로 복원하므로 store 상태만 확인)
    if (!isLogin || !user) {
      // Store에 데이터가 없으면 설정될 때까지 polling
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
        
        // Store 상태 재확인 (persist가 복원되었을 수 있음)
        if (store) {
          const state = store.getState();
          if (state.isLogin && state.user) {
            clearInterval(interval);
            return;
          }
        }
        
        // 최대 시도 횟수에 도달했고 Store에도 없으면 리다이렉트
        if (attempts >= maxAttempts) {
          clearInterval(interval);
          router.replace("/result-page/login");
        }
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [router, pathname, searchParams, isLogin, user, store]);

  return null;
}