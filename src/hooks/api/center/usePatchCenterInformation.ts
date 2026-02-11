import { patchCenterInformation } from "@/services/center/patchCenterInformation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/providers/AuthProvider";

/**
 * 센터 정보 수정 Hooks
 * @returns 센터 정보 수정 뮤테이션
 */
export const usePatchCenterInformation = () => {
  const queryClient = useQueryClient();
  const centerSn = useAuthStore((state) => state.centerSn);
  const setCenterSn = useAuthStore((state) => state.setCenterSn);

  return useMutation({
    mutationFn: (data: {
      center_name: string;
      center_address: string;
      center_address_detail: string;
      center_phone?: string;
    }) => patchCenterInformation({ center_sn: centerSn, ...data }),
    onSuccess: (_data, variables) => {
      setCenterSn(centerSn, variables.center_name);
      alert("정상적으로 센터 정보를 수정하였습니다.");
      queryClient.invalidateQueries({ queryKey: ["getCenterInformation"] });
    },
  });
};
