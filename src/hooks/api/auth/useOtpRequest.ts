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
  status: number | undefined
): string {
  switch (status) {
    case 400:
      return "필수 파라미터가 누락되었거나, type/purpose 값이 올바르지 않습니다.";
    case 429:
      return "OTP 발행 허용 횟수(10회)를 초과했습니다. 탱고바디 관리자에게 문의해주세요.";
    case 423:
      return "OTP 요청 횟수 초과 또는 5회 검증 실패로 잠겼습니다. 탱고바디 관리자에게 문의해주세요.";
    case 500:
      return "OTP 메일 발송에 실패했습니다.";
    default:
      return "OTP 요청에 실패했습니다.";
  }
}

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
    onError: (error: AxiosError<RequestOtpErrorResponse>) => {
      const status = error.response?.status;
      const message = getRequestOtpErrorMessage(status);
      alert(message);
    },
  });
};
