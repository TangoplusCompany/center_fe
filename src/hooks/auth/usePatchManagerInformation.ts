import { patchCenterManagerInformation } from "@/services/center/patchCenterManagerInformation";
import { IResponseDefault } from "@/types/default";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

/**
 * 센터 관리자 정보 수정 Hooks
 * @returns 센터 관리자 정보 수정 뮤테이션
 */
export const usePatchManagerInformation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchCenterManagerInformation,
    onSuccess: () => {
      // Handle successful login, e.g., redirect to dashboard
      alert("센터 매니저 정보가 수정되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["ManagerDetails"] });
    },
    onError: (data: AxiosError<IResponseDefault>) => {
      console.error(data);
      alert("로그인에 실패했습니다. 잠시 후 다시 시도해주세요.");
      return;
    },
  });
};
