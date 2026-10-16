import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { postUserRegister, UserRegisterError } from "@/services/user/postUserRegister";
import { FieldValues, UseFormSetError } from "react-hook-form";

/**
 * ResultPage 사용자 회원가입 Mutation Hook
 * @param setError react-hook-form setError (optional)
 */
export const useUserRegister = (setError?: UseFormSetError<FieldValues>) => {
  const t = useTranslations("Index");
  const router = useRouter();

  return useMutation({
    mutationFn: postUserRegister,
    onSuccess: () => {
      alert(t("signup_success"));
      router.push("/result-page/login");
    },
    onError: (error: unknown) => {
      console.error("회원가입 실패:", error);
      if (error instanceof UserRegisterError) {
        alert(error.userMessage);
        if (setError && error.shouldSetFieldError) {
          setError(error.shouldSetFieldError.field, {
            type: "manual",
            message: error.shouldSetFieldError.message,
          });
        }
      } else if (error instanceof Error) {
        alert(error.message);
      } else {
        alert(t("signup_failed"));
      }
    },
  });
};
