import { useMutation } from "@tanstack/react-query";
import { postResetPwd } from "@/services/auth/postResetPwd";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export const useResetPwd = () => {
  const router = useRouter();
  const t = useTranslations("Index");

  return useMutation({
    mutationFn: postResetPwd,
    onSuccess: () => {
      alert(t("reset_pwd_success"));
      router.push("/login");
    },
    onError: () => {
      alert(t("reset_pwd_fail"));
    },
  });
};