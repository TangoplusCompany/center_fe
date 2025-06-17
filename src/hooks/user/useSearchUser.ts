import { getSearchUser } from "@/services/user/getSearchUser";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

/**
 * 사용자 검색 Hooks
 * @returns 사용자 검색 뮤테이션
 */
export const useSearchUser = () => {
  return useMutation({
    mutationFn: getSearchUser,
    onSuccess: () => {},
    onError: (
      data: AxiosError<{
        data: unknown;
        message: string[];
        status: number;
        success: boolean;
      }>,
    ) => {
      console.error(data.message[0]);
      return;
    },
  });
};
