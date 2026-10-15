import { patchDeviceInfo } from "@/services/device/patchDeviceInfo";
import { useAuthStore } from "@/providers/AuthProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IDeviceInfo } from "@/types/device";
import { useTranslations } from "next-intl";

/**
 * 센터 기기 정보 수정 Hooks
 * @returns 센터 기기 정보 수정 뮤테이션
 */
export const useDeviceUpdate = () => {
  const t = useTranslations("Index");
  const queryClient = useQueryClient();
  const centerSn = useAuthStore((state) => state.centerSn);

  return useMutation({
    mutationFn: (deviceInfo: IDeviceInfo) =>
      patchDeviceInfo(deviceInfo, centerSn),
    onSuccess: async (_, variables) => {
      alert(t("device_success_updated"));
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
