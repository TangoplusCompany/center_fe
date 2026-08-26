import { deleteDeviceCenter } from "@/services/device/deleteDeviceCenter";
import { useAuthStore } from "@/providers/AuthProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";

/**
 * 센터 기기 삭제 Hooks
 * @param setOpen 기기 삭제 모달 열기 함수
 * @returns 센터 기기 삭제 뮤테이션
 */
export const useDeviceRemove = (
  setOpen: (value: React.SetStateAction<boolean>) => void,
) => {
  const queryClient = useQueryClient();
  const centerSn = useAuthStore((state) => state.centerSn);
  const t = useTranslations();

  return useMutation({
    mutationFn: (sn: number) => deleteDeviceCenter(sn, centerSn),
    onSuccess: () => {
      alert(t("device_remove_success"));
      queryClient.invalidateQueries({ queryKey: ["deviceStatusList"] });
      setOpen(false);
    },
    onError: (
      error: AxiosError<{
        data: unknown;
        message: string[];
        status: number;
        success: boolean;
      }>,
    ) => {
      if (!error.response) {
        alert(t("device_remove_network_error"));
        return;
      }

      const { status } = error.response;

      if (status === 400) {
        alert(t("device_remove_error_400"));
      } else if (status === 401) {
        alert(t("device_remove_error_401"));
      } else if (status === 403) {
        alert(t("device_remove_error_403"));
      } else if (status === 404) {
        alert(t("device_remove_error_404"));
      } else if (status === 409) {
        alert(t("device_remove_error_409"));
      } else if (status === 500) {
        alert(t("device_remove_error_500"));
      } else {
        alert(t("device_remove_error_default", { status }));
      }
    },
  });
};