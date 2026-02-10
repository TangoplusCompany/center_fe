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
      const otpJwt = data?.data?.otp_jwt;
      if (!otpJwt) {
        alert("OTP 인증 응답에 토큰이 없습니다. 다시 시도해주세요.");
        return;
      }
      alert("OTP 인증이 완료되었습니다.");
      handleRequestOtp(otpJwt);
    },
    onError: () => {
      alert("OTP 인증에 실패했습니다.");
    },
  });
};
