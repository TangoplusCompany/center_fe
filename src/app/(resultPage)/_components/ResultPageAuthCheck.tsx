"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createAuthStore } from "@/stores/AuthStore";

export default function ResultPageAuthCheck() {
  const authStore = createAuthStore();
  const router = useRouter();

  useEffect(() => {
    // 쿠키 체크를 약간의 딜레이와 함께 수행
    // 로그인 직후 쿠키가 아직 반영되지 않았을 수 있으므로 재확인
    const checkAuth = () => {
      const hasResultPageLogin = document.cookie.includes("resultPageLogin=true");
      
      if (!hasResultPageLogin) {
        // 쿠키가 없으면 약간의 딜레이 후 다시 한 번 확인
        // (로그인 직후 쿠키가 아직 반영되지 않았을 수 있음)
        setTimeout(() => {
          const recheckCookie = document.cookie.includes("resultPageLogin=true");
          if (!recheckCookie) {
            // 인증되지 않은 경우 리다이렉트
            authStore.getState().setLogout();
            router.replace("/result-page/login");
          }
        }, 100);
      }
    };

    checkAuth();
  }, [authStore, router]);

  return null;
}
