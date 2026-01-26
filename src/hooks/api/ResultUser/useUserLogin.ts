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
      // zustand store에 저장
      setLoginFromResponse(data);

      // 로그인 성공 시 쿠키 설정
      document.cookie = "resultPageLogin=true; path=/; max-age=86400"; // 24시간

      // sessionStorage에 직접 저장 (persist가 비동기적으로 저장하므로 직접 저장하여 확실히 함)
      try {
        const storeData = {
          state: {
            isLogin: true,
            user: data.user,
            accessToken: data.access_token,
          },
          version: 0,
        };
        sessionStorage.setItem("result-page-user", JSON.stringify(storeData));
      } catch (error) {
        console.error("sessionStorage 저장 실패:", error);
      }

      // 사용자 정보를 암호화하여 쿼리 파라미터로 전달
      const encrypted = await actionUserEncrypt({
        user_uuid: data.user.user_uuid,
        user_sn: data.user.user_sn,
        user_name: data.user.user_name,
      });
      
      if (encrypted !== "ERROR") {
        // sessionStorage 저장과 쿠키 설정이 완료될 시간을 주기 위해 딜레이
        // React 상태 업데이트, 쿠키 반영, sessionStorage 저장이 완료되도록 보장
        setTimeout(() => {
          router.push(`/result-page?key=${encrypted}`);
        }, 200);
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
