import { useResultPageUserStore } from "@/providers/ResultPageUserProvider";
import { postUserLogin, UserLoginError } from "@/services/user/postUserLogin";
import { IResultPageLoginSuccessResponse } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FieldValues, UseFormSetError } from "react-hook-form";
import { actionUserEncrypt } from "@/app/actions/getCrypto";

/**
 * 사용자 로그인 Hooks
 * @param setError react-hook-form 에러 설정 함수
 * @returns 로그인 뮤테이션
 */
export const useUserLogin = (setError: UseFormSetError<FieldValues>) => {
  const router = useRouter();
  const setLoginFromResponse = useResultPageUserStore((state) => state.setLoginFromResponse);
  
  return useMutation({
    mutationFn: postUserLogin,
    onSuccess: async (data: IResultPageLoginSuccessResponse["data"]) => {
      // zustand store에 저장 (persist가 자동으로 sessionStorage에 저장함)
      setLoginFromResponse(data);

      // 로그인 성공 시 쿠키 설정
      document.cookie = "resultPageLogin=true; path=/; max-age=86400"; // 24시간

      // persist가 sessionStorage에 저장될 때까지 기다리는 헬퍼 함수
      const waitForPersist = (): Promise<void> => {
        return new Promise((resolve) => {
          // sessionStorage에 이미 저장되어 있으면 즉시 resolve
          const stored = sessionStorage.getItem("result-page-user");
          if (stored) {
            try {
              const parsed = JSON.parse(stored);
              if (parsed?.state?.isLogin && parsed?.state?.user) {
                resolve();
                return;
              }
            } catch {
              // 파싱 실패는 무시하고 계속 진행
            }
          }
          
          // persist가 저장할 때까지 polling
          let attempts = 0;
          const maxAttempts = 30; // 최대 3초 (100ms * 30)
          const interval = setInterval(() => {
            attempts++;
            const stored = sessionStorage.getItem("result-page-user");
            if (stored) {
              try {
                const parsed = JSON.parse(stored);
                if (parsed?.state?.isLogin && parsed?.state?.user) {
                  clearInterval(interval);
                  resolve();
                  return;
                }
              } catch {
                // 파싱 실패는 무시하고 계속 진행
              }
            }
            
            if (attempts >= maxAttempts) {
              clearInterval(interval);
              // 타임아웃이어도 진행 (persist는 저장되었을 가능성이 높음)
              resolve();
            }
          }, 100);
        });
      };

      // 쿠키 설정 확인을 위한 헬퍼 함수
      const waitForCookie = (): Promise<void> => {
        return new Promise((resolve) => {
          // 쿠키가 이미 설정되어 있으면 즉시 resolve
          if (document.cookie.includes("resultPageLogin=true")) {
            resolve();
            return;
          }
          
          // 쿠키가 설정될 때까지 polling
          let attempts = 0;
          const maxAttempts = 20; // 최대 2초 (100ms * 20)
          const interval = setInterval(() => {
            attempts++;
            if (document.cookie.includes("resultPageLogin=true")) {
              clearInterval(interval);
              resolve();
            } else if (attempts >= maxAttempts) {
              clearInterval(interval);
              // 타임아웃이어도 진행 (쿠키는 설정되었을 가능성이 높음)
              resolve();
            }
          }, 100);
        });
      };

      // 사용자 정보를 암호화하여 쿼리 파라미터로 전달
      const encrypted = await actionUserEncrypt({
        user_uuid: data.user.user_uuid,
        user_sn: data.user.user_sn,
        user_name: data.user.user_name,
      });
      
      if (encrypted !== "ERROR") {
        // persist가 sessionStorage에 저장되고 쿠키가 설정될 때까지 기다린 후 페이지 이동
        await Promise.all([waitForPersist(), waitForCookie()]);
        router.push(`/result-page?key=${encrypted}`);
      } else {
        alert("암호화 중 오류가 발생했습니다.");
      }
    },
    onError: (error: unknown) => {
      console.error("로그인 실패:", error);
      
      // UserLoginError인 경우 - 서비스 레이어에서 처리된 에러
      if (error instanceof UserLoginError) {
        alert(error.userMessage);
        
        // 필드 에러 설정이 필요한 경우
        if (error.shouldSetFieldError) {
          setError(error.shouldSetFieldError.field, {
            type: "manual",
            message: error.shouldSetFieldError.message,
          });
        }
        return;
      }
      
      // 일반 에러 (네트워크 에러 등)
      alert(error instanceof Error ? error.message : "서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
    },
  });
};
