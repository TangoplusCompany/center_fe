import { patchCenterManagerInformation } from "@/services/center/patchCenterManagerInformation";
import { IResponseDefault } from "@/types/default";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAuthStore } from "@/providers/AuthProvider";
import { useTranslations } from "next-intl";

/**
 * 센터 관리자 정보 수정 Hooks
 * @returns 센터 관리자 정보 수정 뮤테이션
 */
export const usePatchManagerInformation = () => {
  const queryClient = useQueryClient();
  const setAdminProfile = useAuthStore((state) => state.setAdminProfile);
  const t = useTranslations("Index");

  return useMutation({
    mutationFn: patchCenterManagerInformation,
    onSuccess: (_data, variables) => {
      setAdminProfile({
        adminName: variables.admin_name,
        adminMobile: variables.mobile,
      });
      alert(t("manager_info_patch_success"));
      queryClient.invalidateQueries({ queryKey: ["ManagerDetails"] });
    },
    onError: (data: AxiosError<IResponseDefault>) => {
      console.error(data);
      alert(t("manager_info_patch_fail"));
    },
  });
};