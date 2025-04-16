import { postRegister } from "@/services/auth/postRegister";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FieldValues, UseFormSetError } from "react-hook-form";

export const useRegister = (setError: UseFormSetError<FieldValues>) => {
  const router = useRouter();
  return useMutation({
    mutationFn: postRegister,
    onSuccess: () => {
      // Handle successful login, e.g., redirect to dashboard
      router.push("/login");
    },
    onError: (
      data: AxiosError<{
        message: string[];
        status: number;
        success: boolean;
      }>,
    ) => {
      // Handle login error, e.g., show error message
      if (!data.response) {
        alert("서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
        return;
      }
      if (data.status === 409) {
        const errorMessage = data.response.data;
        if (errorMessage.message[0].includes("email")) {
          setError("email", {
            type: "custom",
            message: "이미 가입된 이메일입니다.",
          });
        } else {
          setError("phone", {
            type: "custom",
            message: "이미 가입된 전화번호입니다.",
          });
        }
      } else {
        alert("회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    },
  });
};
