import { deleteCenterManager } from "@/services/center/deleteCenterManager";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * 센터 관리자 삭제 Hooks
 * @returns 센터 관리자 삭제 뮤테이션
 */
export const useDeleteManager = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCenterManager,
    onSuccess: () => {
      alert("해당 매니저가 센터에서 성공적으로 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["adminList"] });
    },
  });
};
