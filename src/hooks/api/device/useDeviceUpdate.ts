import { patchDeviceInfo } from "@/services/device/patchDeviceInfo";
import { useAuthStore } from "@/providers/AuthProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IDeviceInfo } from "@/types/device";

/**
 * 센터 기기 정보 수정 Hooks
 * @returns 센터 기기 정보 수정 뮤테이션
 */
export const useDeviceUpdate = () => {
  const queryClient = useQueryClient();
  const centerSn = useAuthStore((state) => state.centerSn);

  return useMutation({
    mutationFn: (deviceInfo: IDeviceInfo) =>
      patchDeviceInfo(deviceInfo, centerSn),
    onSuccess: async (_, variables) => {
      alert("기기 정보가 수정되었습니다.");
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["deviceStatusList"] }),
        queryClient.invalidateQueries({
          queryKey: ["deviceDetail", variables.sn, centerSn],
        }),
      ]);
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
