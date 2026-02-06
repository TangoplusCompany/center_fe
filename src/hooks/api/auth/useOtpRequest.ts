import { useMutation } from "@tanstack/react-query";
import { postOtpRequest } from "@/services/auth/postOtpRequest";
import type { Purpose } from "@/types/admin";

export const useOtpRequest = ({
  setEmail,
}: {
  value: string;
  setEmail: (email: string) => void;
  purpose?: Purpose;
}) => {
  return useMutation({
    mutationFn: (params: {
      email_or_mobile: string;
      type: "email" | "mobile";
      purpose: Purpose;
    }) => postOtpRequest(params),
    onSuccess: (_data, variables) => {
      alert("OTP 요청이 완료되었습니다.");
      setEmail(variables.email_or_mobile);
    },
    onError: () => {
      alert("OTP 요청에 실패했습니다.");
    },
  });
};
