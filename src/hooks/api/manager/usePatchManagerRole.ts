import { patchCenterManagerRole } from "@/services/center/patchCenterManagerRole";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/providers/AuthProvider";

/**
 * 센터 관리자 권한 수정 Hooks
 * @returns 센터 관리자 권한 수정 뮤테이션
 */
export const usePatchManagerRole = () => {
  const queryClient = useQueryClient();
  const centerSn = useAuthStore((state) => state.centerSn);

  return useMutation({
    mutationFn: (data: { sn: number; role: number }) =>
      patchCenterManagerRole({ center_sn: centerSn, ...data }),
    onSuccess: async () => {
      alert("해당 매니저의 권한이 성공적으로 변경되었습니다.");
      await queryClient.invalidateQueries({ queryKey: ["ManagerDetails"] });
    },
  });
};
