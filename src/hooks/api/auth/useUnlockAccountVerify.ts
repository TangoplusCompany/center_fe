import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { postUnlockAccount } from "@/services/auth/postUnlockAccount";
import type { IUnlockAccountProps } from "@/types/admin";

type UnlockAccountErrorResponse = {
  status: number;
  success: false;
  message: string[];
  data: [] | { remaining_fail_count?: number; remaining_issue_count?: number };
};

function getUnlockAccountErrorMessage(
  status: number,
  data?: UnlockAccountErrorResponse
): string {
  switch (status) {
    case 400:
      return "필수 파라미터가 누락되었거나, type/purpose 값이 올바르지 않습니다.";
    case 404:
      return "해당 이메일/전화번호와 매칭되는 OTP 정보가 없습니다.";
    case 423:
      return "OTP 요청 횟수 초과 또는 5회 검증 실패로 잠겼습니다. 탱고바디 관리자에게 문의해주세요.";
    case 401: {
      const d = data?.data;
      const extra =
        d && typeof d === "object" && "remaining_fail_count" in d
          ? ` (남은 시도: ${(d as { remaining_fail_count: number }).remaining_fail_count}회)`
          : "";
      return "OTP가 틀렸습니다. 다시 확인해주세요." + extra;
    }
    case 410:
      return "OTP 유효시간(5분)이 지났습니다. 다시 요청해주세요.";
    default:
      return "OTP 인증에 실패했습니다.";
  }
}

export const useUnlockAccountVerify = ({
  onSuccess: handleRequestOtp,
}: {
  onSuccess: (jwt: string) => void;
}) => {
  return useMutation({
    mutationFn: (params: IUnlockAccountProps) => postUnlockAccount(params),
    onSuccess: () => {
      alert("계정이 해제되었습니다.");
      handleRequestOtp("");
    },
    onError: (error: AxiosError<UnlockAccountErrorResponse>) => {
      const status = error.response?.status;
      const data = error.response?.data;
      const message = getUnlockAccountErrorMessage(status ?? 0, data);
      alert(message);
    },
  });
};
