import { useMutation } from "@tanstack/react-query";
import { postOtpVerify } from "@/services/auth/postOtpVerify";

export const useOtpVerify = ({
  handleRequestOtp,
}: {
  handleRequestOtp: (jwt: string) => void;
}) => {
  return useMutation({
    mutationFn: postOtpVerify,
    onSuccess: (data) => {
      alert("OTP 인증이 완료되었습니다.");
      handleRequestOtp(data.data[0]);
    },
    onError: () => {
      alert("OTP 인증에 실패했습니다.");
    },
  });
};
