import { deleteUser } from "@/services/user/deleteUser";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAuthStore } from "@/providers/AuthProvider";

/**
 * 사용자 삭제 Hooks
 * @param refetch 사용자 목록 조회 함수
 * @returns 사용자 삭제 뮤테이션
 */
export const useDeleteUser = (refetch: () => void) => {
  const centerSn = useAuthStore((state) => state.centerSn);
  return useMutation({
    mutationFn: ({ sn }: { sn: number }) =>
      deleteUser({ sn, center_sn: centerSn }),
    onSuccess: (data) => {
      console.log(data.message);
      alert("사용자 제거에 성공했습니다.");
      refetch();
    },
    onError: (
      data: AxiosError<{
        data: unknown;
        message: string[];
        status: number;
        success: boolean;
      }>,
    ) => {
      alert(`Error: ${data.message}`);
      return;
    },
  });
};
