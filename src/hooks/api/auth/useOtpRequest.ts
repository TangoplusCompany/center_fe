import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { postOtpRequest } from "@/services/auth/postOtpRequest";
import type { Purpose } from "@/types/admin";

export type RequestOtpErrorResponse = {
  status: number;
  success: false;
  message: string[];
  data: unknown[];
};

export function getRequestOtpErrorMessage(
  status: number | undefined,
  t: (key: string) => string
): string {
  switch (status) {
    case 400:
      return t("otp_error_400");
    case 429:
      return t("otp_error_429");
    case 423:
      return t("otp_error_423");
    case 500:
      return t("otp_error_500");
    default:
      return t("otp_error_default");
  }
}

export const useOtpRequest = ({
  setEmail,
  t,
}: {
  value: string;
  setEmail: (email: string) => void;
  purpose?: Purpose;
  t: (key : string) => string;
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
    onError: (error: AxiosError<RequestOtpErrorResponse>) => {
      const status = error.response?.status;
      const message = getRequestOtpErrorMessage(status, t);
      alert(message);
    },
  });
};
