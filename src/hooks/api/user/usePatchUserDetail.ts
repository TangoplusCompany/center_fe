import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchUserDetail } from "@/services/user/patchUserDetail";

/**
 * 사용자 상세 수정 Hooks
 * @param userSn 사용자 번호
 * @returns 사용자 상세 수정 뮤테이션
 */
export const usePatchUserDetail = (userSn: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchUserDetail,
    onSuccess: () => {
      alert("성공적으로 사용자의 데이터가 수정되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["userDetail", userSn] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
