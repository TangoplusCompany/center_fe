import { patchCenterManagerRole } from "@/services/center/patchCenterManagerRole";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/providers/AuthProvider";
import { useTranslations } from "next-intl";

/**
 * 센터 관리자 권한 수정 Hooks
 * @returns 센터 관리자 권한 수정 뮤테이션
 */
export const usePatchManagerRole = () => {
  const queryClient = useQueryClient();
  const centerSn = useAuthStore((state) => state.centerSn);
  const t = useTranslations();

  return useMutation({
    mutationFn: (data: { sn: number; role: number }) =>
      patchCenterManagerRole({ center_sn: centerSn, ...data }),
    onSuccess: async () => {
      alert(t("manager_role_patch_success"));
      await queryClient.invalidateQueries({ queryKey: ["adminList"] });
      await queryClient.invalidateQueries({ queryKey: ["ManagerDetails"] });
    },
  });
};