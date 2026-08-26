import { postDeviceAdd } from "@/services/device/postDeviceAdd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAuthStore } from "@/providers/AuthProvider";
import { useTranslations } from "next-intl";

/**
 * 센터 기기 추가 Hooks
 * @returns 기기 추가 뮤테이션
 */
export const useDeviceAdd = () => {
  const queryClient = useQueryClient();
  const centerSn = useAuthStore((state) => state.centerSn);
  const t = useTranslations();

  return useMutation({
    mutationFn: ({ deviceSn }: { deviceSn: number }) =>
      postDeviceAdd({ centerSn, deviceSn }),
    onSuccess: () => {
      alert(t("device_add_success"));
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
      if (!data.response) {
        alert(t("device_add_network_error"));
        return;
      }

      const { status } = data.response;

      if (status === 400) {
        alert(t("device_add_error_400"));
      } else if (status === 403) {
        alert(t("device_add_error_403"));
      } else if (status === 404) {
        alert(t("device_add_error_404"));
      } else if (status === 409) {
        alert(t("device_add_error_409"));
      } else if (status === 500) {
        alert(t("device_add_error_500"));
      } else {
        alert(t("device_add_error_default", { status }));
      }
    },
  });
};