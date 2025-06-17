import { patchCenterInformation } from "@/services/center/patchCenterInformation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * 센터 정보 수정 Hooks
 * @returns 센터 정보 수정 뮤테이션
 */
export const usePatchCenterInformation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchCenterInformation,
    onSuccess: () => {
      alert("정상적으로 센터 정보를 수정하였습니다.");
      queryClient.invalidateQueries({ queryKey: ["getCenterInformation"] });
    },
  });
};
