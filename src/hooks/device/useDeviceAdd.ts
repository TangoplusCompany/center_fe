import { postDeviceAdd } from "@/services/device/postDeviceAdd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

/**
 * 센터 기기 추가 Hooks
 * @returns 기기 추가 뮤테이션
 */
export const useDeviceAdd = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postDeviceAdd,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deviceStatusList"] });
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
