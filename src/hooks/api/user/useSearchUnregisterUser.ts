import { getUnregisterUser } from "@/services/user/getUnregisterUser";
import { IUnregisterUserResponse } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAuthStore } from "@/providers/AuthProvider";

/**
 * 사용자 미등록 조회 Hooks
 * @returns 사용자 미등록 조회 뮤테이션
 */
export const useSearchUnregisterUser = () => {
  const centerSn = useAuthStore((state) => state.centerSn);

  return useMutation({
    mutationFn: (data: { searchValue: string }) =>
      getUnregisterUser({ center_sn: centerSn, ...data }),
    onSuccess: (data: IUnregisterUserResponse) => {
      return data;
    },
    onError: (
      data: AxiosError<{
        data: unknown;
        message: string[];
        status: number;
        success: boolean;
      }>,
    ) => {
      console.log(data);
      return;
    },
  });
};
