import { patchCenterManagerRole } from "@/services/center/patchCenterManagerRole";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * 센터 관리자 권한 수정 Hooks
 * @returns 센터 관리자 권한 수정 뮤테이션
 */
export const usePatchManagerRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchCenterManagerRole,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["ManagerDetails"] });
    },
  });
};
