import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchUserDetail } from "@/services/user/patchUserDetail";
import { patchResultUserDetail } from "@/services/user/patchResultUserDetail";
import { useAuthStore } from "@/providers/AuthProvider";

type PatchUserDetailParams = Parameters<typeof patchUserDetail>[0];
type PatchResultUserDetailParams = Parameters<typeof patchResultUserDetail>[0];

/**
 * 사용자 상세 수정 Hooks
 * @param userSn 사용자 번호
 * @param isResultPage result-page에서 사용하는지 여부
 * @returns 사용자 상세 수정 뮤테이션
 */
export const usePatchUserDetail = (userSn: string, isResultPage = false) => {
  const queryClient = useQueryClient();
  const centerSn = useAuthStore((state) => state.centerSn);
  return useMutation({
    mutationFn: isResultPage
      ? (params: PatchResultUserDetailParams) => patchResultUserDetail(params)
      : (params: Omit<PatchUserDetailParams, "center_sn">) =>
          patchUserDetail({ ...params, center_sn: centerSn }),
    onSuccess: () => {
      alert("성공적으로 사용자의 데이터가 수정되었습니다.");
      // queryKey를 isResultPage에 따라 다르게 무효화
      if (isResultPage) {
        queryClient.invalidateQueries({ queryKey: ["userResultDetail", userSn] });
      } else {
        queryClient.invalidateQueries({ queryKey: ["userDetail", userSn] });
      }
      // 측정 상세 데이터도 무효화하여 사용자 이름이 업데이트되도록 함
      queryClient.invalidateQueries({ queryKey: ["measureDetail"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
