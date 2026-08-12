"use client";

import { useEffect, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useResultPageUserStore, ResultPageUserContext } from "@/providers/ResultPageUserProvider";

const RESULT_PAGE_IDLE_TIMEOUT_MS = 60 * 60 * 1_000;
const RESULT_PAGE_ACTIVITY_EVENTS = [
  "click",
  "keydown",
  "touchstart",
  "wheel",
] as const;

export default function ResultPageAuthCheck() {
  const router = useRouter();
  const pathname = usePathname();
  
  // zustand store 상태 확인 (persist가 자동으로 sessionStorage에서 복원)
  const isLogin = useResultPageUserStore((state) => state.isLogin);
  const user = useResultPageUserStore((state) => state.user);
  const store = useContext(ResultPageUserContext);

  useEffect(() => {
    if (
      pathname.includes("/result-page/login") ||
      !isLogin ||
      !user ||
      !store
    ) {
      return;
    }

    let lastActivityAt = Date.now();
    let hasLoggedOut = false;

    // GS 인증: 결과 페이지에서 1시간 동안 활동이 없으면 로그인 정보를 삭제하고 접근을 차단한다.
    const checkIdleTimeout = () => {
      if (
        hasLoggedOut ||
        Date.now() - lastActivityAt < RESULT_PAGE_IDLE_TIMEOUT_MS
      ) {
        return;
      }

      hasLoggedOut = true;
      store.getState().setLogout();
      alert("1시간 동안 사용하지 않아 자동 로그아웃되었습니다.");
      router.replace("/result-page/login");
    };

    // GS 인증: 프로그램 스크롤이 아닌 클릭·키보드·터치·휠 입력만 실제 사용자 활동으로 기록한다.
    const recordUserActivity = () => {
      lastActivityAt = Date.now();
    };

    const intervalId = setInterval(checkIdleTimeout, 1_000);
    RESULT_PAGE_ACTIVITY_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, recordUserActivity, { passive: true });
    });
    // GS 인증: 백그라운드 탭에서 타이머 실행이 지연돼도 화면 복귀 시 실제 경과 시간으로 만료한다.
    document.addEventListener("visibilitychange", checkIdleTimeout);

    return () => {
      clearInterval(intervalId);
      RESULT_PAGE_ACTIVITY_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, recordUserActivity);
      });
      document.removeEventListener("visibilitychange", checkIdleTimeout);
    };
  }, [router, pathname, isLogin, user, store]);

  useEffect(() => {
    // 로그인 페이지 자체에서는 체크 안 함 (무한 리다이렉트 방지)
    if (pathname.includes("/result-page/login")) {
      return;
    }

    // Store 상태 확인 (persist가 자동으로 복원하므로 store 상태만 확인)
    if (!isLogin || !user) {
      // GS 인증: URL의 key 유무와 관계없이 실제 로그인 상태가 없으면 직접 접근을 차단한다.
      // Store에 데이터가 없으면 설정될 때까지 polling
      let attempts = 0;
      const maxAttempts = 30; // 최대 3초 (100ms * 30)
      const interval = setInterval(() => {
        attempts++;
        
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
  }, [router, pathname, isLogin, user, store]);

  return null;
}
