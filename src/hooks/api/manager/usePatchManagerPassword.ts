import { patchAdminPassword } from "@/services/auth/patchAdminPassword";
import { IResponseDefault } from "@/types/default";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { FieldValues, UseFormSetError } from "react-hook-form";

/**
 * 센터 관리자 비밀번호 수정 Hooks
 * @param setError react-hook-form 에러 설정 함수
 * @returns 센터 관리자 비밀번호 수정 뮤테이션
 */
export const usePatchManagerPassword = (
  setError: UseFormSetError<FieldValues>,
) => {
  return useMutation({
    mutationFn: patchAdminPassword,
    mutationKey: ["patchAdminPassword"],
    onSuccess: () => {
      alert("성공적으로 비밀번호가 변경되었습니다.");
    },
    onError: (data: { data: AxiosError } & IResponseDefault) => {
      if (data.status === 401) {
        setError("currentPassword", {
          type: "custom",
          message: "현재 비밀번호가 일치하지 않습니다.",
        });
      }
    },
  });
};
