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
  t: (key :string) => string,
  status: number,
  data?: UnlockAccountErrorResponse
): string {
  switch (status) {
    case 400:
      return t('alert_otp_error_400');
    case 404:
      return t('alert_otp_error_404');
    case 423:
      return t('alert_otp_error_423');
    case 401: {
      const d = data?.data;
      const extra =
        d && typeof d === "object" && "remaining_fail_count" in d
          ? ` (${t('alert_login_error_count')}: ${(d as { remaining_fail_count: number }).remaining_fail_count}회)`
          : "";
      return t('alert_otp_error_401') + extra;
    }
    case 410:
      return t('alert_otp_error_410');
    default:
      return t('otp_verify_failed');
  }
}

export const useUnlockAccountVerify = ({
  onSuccess: handleRequestOtp,
  t,
}: {
  onSuccess: (jwt: string) => void;
  t : (key: string) => string
}) => {
  return useMutation({
    mutationFn: (params: IUnlockAccountProps) => postUnlockAccount(params),
    onSuccess: () => {
      alert(t('alert_unlock'));
      handleRequestOtp("");
    },
    onError: (error: AxiosError<UnlockAccountErrorResponse>) => {
      const status = error.response?.status;
      const data = error.response?.data;
      const message = getUnlockAccountErrorMessage(t, status ?? 0, data);
      alert(message);
    },
  });
};
