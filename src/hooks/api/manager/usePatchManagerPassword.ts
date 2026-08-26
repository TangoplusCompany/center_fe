import { IManagerPasswordForm } from "@/schemas/managerSchema";
import { patchAdminPassword } from "@/services/auth/patchAdminPassword";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { UseFormSetError } from "react-hook-form";

/** 비밀번호 변경 API 실패 시 상태별 안내 메시지 */
function getPasswordChangeErrorMessage(
  error: unknown,
  t: (key: string) => string
): string {
  if (error instanceof AxiosError && error.response?.status) {
    switch (error.response.status) {
      case 400: {
        const msg = (error.response.data as { message?: string[] })?.message?.[0] ?? "";
        if (msg.toLowerCase().includes("both") && msg.toLowerCase().includes("required")) {
          return t("manager_pwd_error_both_required");
        }
        if (msg.toLowerCase().includes("cannot be the same")) {
          return t("manager_pwd_error_same");
        }
        if (msg.toLowerCase().includes("invalid password format")) {
          return t("manager_pwd_error_format");
        }
        return t("manager_pwd_error_invalid_input");
      }
      case 401:
        return t("manager_pwd_error_401");
      case 403:
        return t("manager_pwd_error_403");
      default:
        break;
    }
  }
  return t("manager_pwd_error_default");
}

export const usePatchManagerPassword = (
  setError: UseFormSetError<IManagerPasswordForm>,
) => {
  const t = useTranslations("Index");

  return useMutation({
    mutationFn: patchAdminPassword,
    mutationKey: ["patchAdminPassword"],
    onSuccess: () => {
      alert(t("manager_pwd_patch_success"));
    },
    onError: (error: AxiosError) => {
      const status = error.response?.status;
      const message = getPasswordChangeErrorMessage(error, t);

      if (status === 401) {
        setError("currentPassword", { type: "custom", message });
        return;
      }
      if (status === 400) {
        const data = error.response?.data as { message?: string[] };
        const msg = data?.message?.[0] ?? "";
        if (
          msg.toLowerCase().includes("invalid password format") ||
          msg.toLowerCase().includes("cannot be the same")
        ) {
          setError("newPassword", { type: "custom", message });
        } else {
          alert(message);
        }
        return;
      }
      if (status === 403) {
        alert(message);
        return;
      }
      alert(message);
    },
  });
};