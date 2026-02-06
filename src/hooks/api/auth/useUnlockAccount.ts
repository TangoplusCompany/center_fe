import { useMutation } from "@tanstack/react-query";
import { postUnlockAccount } from "@/services/auth/postUnlockAccount";

export const useUnlockAccount = (setEmail: (email: string) => void) => {
  return useMutation({
    mutationFn: postUnlockAccount,
    onSuccess: (_data, variables) => {
      alert("OTP 요청이 완료되었습니다.");
      setEmail(variables.email_or_mobile);
    },
    onError: () => {
      alert("OTP 요청에 실패했습니다.");
    },
  });
};