import { deleteCenterManager } from "@/services/center/deleteCenterManager";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/providers/AuthProvider";
import { useTranslations } from "next-intl";

/**
 * 센터 관리자 삭제 Hooks
 * @returns 센터 관리자 삭제 뮤테이션
 */
export const useDeleteManager = () => {
  const queryClient = useQueryClient();
  const centerSn = useAuthStore((state) => state.centerSn);
  const t = useTranslations();

  return useMutation({
    mutationFn: (data: { sn: number }) =>
      deleteCenterManager({ center_sn: centerSn, sn: data.sn }),
    onSuccess: () => {
      alert(t("manager_delete_success"));
      queryClient.invalidateQueries({ queryKey: ["adminList"] });
    },
  });
};