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
      // 전역 store 인스턴스를 사용하므로 axios 인터셉터와 동일한 store
      setLoginFromResponse(data);

      // zustand의 getState()는 동기적으로 즉시 반환되므로
      // persist가 sessionStorage에 저장되는 것과 관계없이 store 상태는 즉시 업데이트됨
      // 따라서 별도의 대기 시간이 필요 없음
      // persist는 백그라운드에서 자동으로 sessionStorage에 저장됨

      // 사용자 정보를 암호화하여 쿼리 파라미터로 전달
      const encrypted = await actionUserEncrypt({
        user_uuid: data.user.user_uuid,
        user_sn: data.user.user_sn,
        user_name: data.user.user_name,
      });
      
      if (encrypted !== "ERROR") {
        // store 상태는 이미 업데이트되었으므로 바로 페이지 이동
        // persist는 백그라운드에서 sessionStorage에 저장 중
        // axios 인터셉터는 같은 전역 store를 사용하므로 최신 토큰을 읽을 수 있음
        router.push(`/result-page?key=${encrypted}`);
      } else {
        alert("암호화 중 오류가 발생했습니다.");
      }
    },
    onError: (error: unknown) => {
      console.error("로그인 실패:", error);

      // 서비스에서 변환된 API 에러 분기: 400 필수값 누락, 422 전화번호 형식 오류, 401 비밀번호 오류, 423 계정 잠금
      if (error instanceof UserLoginError) {
        alert(error.userMessage);

        if (error.shouldSetFieldError) {
          setError(error.shouldSetFieldError.field, {
            type: "manual",
            message: error.shouldSetFieldError.message,
          });
        }
        return;
      }

      // 네트워크 에러 등
      alert(error instanceof Error ? error.message : "서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
    },
  });
};
