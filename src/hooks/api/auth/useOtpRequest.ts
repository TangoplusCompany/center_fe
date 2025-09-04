import { useMutation } from "@tanstack/react-query";
import { postOtpRequest } from "@/services/auth/postOtpRequest";

export const useOtpRequest = ({
  value,
  setEmail,
}: {
  value: string;
  setEmail: (email: string) => void;
}) => {
  return useMutation({
    mutationFn: postOtpRequest,
    onSuccess: () => {
      alert("OTP 요청이 완료되었습니다.");
      setEmail(value);
    },
    onError: () => {
      alert("OTP 요청에 실패했습니다.");
    },
  });
};
