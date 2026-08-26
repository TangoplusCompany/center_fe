import { useMutation } from "@tanstack/react-query";
import { postOtpVerify } from "@/services/auth/postOtpVerify";
import { useTranslations } from "next-intl";

export const useOtpVerify = ({
  handleRequestOtp,
}: {
  handleRequestOtp: (jwt: string) => void;
}) => {
  const t = useTranslations();

  return useMutation({
    mutationFn: postOtpVerify,
    onSuccess: (data) => {
      const otpJwt = data?.data?.otp_jwt;
      if (!otpJwt) {
        alert(t("otp_verify_no_token"));
        return;
      }
      alert(t("otp_verify_success"));
      handleRequestOtp(otpJwt);
    },
    onError: () => {
      alert(t("otp_verify_fail"));
    },
  });
};