import { IManagerPasswordForm } from "@/schemas/managerSchema";
import { patchAdminPassword } from "@/services/auth/patchAdminPassword";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormSetError } from "react-hook-form";

/** 비밀번호 변경 API 실패 시 상태별 안내 메시지 */
function getPasswordChangeErrorMessage(error: unknown): string {
  if (error instanceof AxiosError && error.response?.status) {
    switch (error.response.status) {
      case 400: {
        const msg = (error.response.data as { message?: string[] })?.message?.[0] ?? "";
        if (msg.toLowerCase().includes("both") && msg.toLowerCase().includes("required")) {
          return "현재 비밀번호와 새 비밀번호를 모두 입력해주세요.";
        }
        if (msg.toLowerCase().includes("cannot be the same")) {
          return "새 비밀번호는 현재 비밀번호와 달라야 합니다.";
        }
        if (msg.toLowerCase().includes("invalid password format")) {
          return "새 비밀번호 형식이 올바르지 않습니다.";
        }
        return "입력값을 확인해주세요.";
      }
      case 401:
        return "현재 비밀번호가 일치하지 않습니다.";
      case 403:
        return "본인 비밀번호만 변경할 수 있습니다.";
      default:
        break;
    }
  }
  return "비밀번호 변경에 실패했습니다. 다시 시도해주세요.";
}

/**
 * 센터 관리자 비밀번호 수정 Hooks
 * @param setError react-hook-form 에러 설정 함수
 * @returns 센터 관리자 비밀번호 수정 뮤테이션
 */
export const usePatchManagerPassword = (
  setError: UseFormSetError<IManagerPasswordForm>,
) => {
  return useMutation({
    mutationFn: patchAdminPassword,
    mutationKey: ["patchAdminPassword"],
    onSuccess: () => {
      alert("성공적으로 비밀번호가 변경되었습니다.");
    },
    onError: (error: AxiosError) => {
      const status = error.response?.status;
      const message = getPasswordChangeErrorMessage(error);

      if (status === 401) {
        setError("currentPassword", { type: "custom", message });
        return;
      }
      if (status === 400) {
        const data = error.response?.data as { message?: string[] };
        const msg = data?.message?.[0] ?? "";
        if (msg.toLowerCase().includes("invalid password format") || msg.toLowerCase().includes("cannot be the same")) {
          setError("newPassword", { type: "custom", message });
        } else {
          alert(message);
        }
        return;
      }
      if (status === 403) {
        alert(message);
        return;
      }
      alert(message);
    },
  });
};
