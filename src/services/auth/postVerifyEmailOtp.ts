import { customUnAuthAxios } from "@/lib/axios";
import type { IResponseDefault } from "@/types/default";

/** auth/verify-email-otp 요청 body */
export interface IVerifyEmailOtpRequest {
  email_or_mobile: string;
  otp: string;
  type: "email" | "mobile";
  purpose: "verify_email" | "verify_mobile";
}

/** auth/verify-email-otp 성공 응답 data */
export interface IVerifyEmailOtpData {
  email_verification_temp_token: string;
}

export type IVerifyEmailOtpResponse = IResponseDefault & {
  data: IVerifyEmailOtpData;
};

/** 401 응답 data */
export interface IVerifyEmailOtp401Data {
  remaining_fail_count?: number;
  remaining_issue_count?: number;
}

/**
 * 주관리자 회원가입 전 이메일 OTP 검증
 * 기기번호 검증에서 받은 temp_token을 Authorization: Bearer {temp_token} 으로 전달
 * 성공 시 data.email_verification_temp_token 으로 회원가입 API 요청
 */
export const postVerifyEmailOtp = async (
  body: IVerifyEmailOtpRequest,
  tempToken: string,
  t : (key : string) => string
) => {
  if (!tempToken || typeof tempToken !== "string") {
    throw new Error(t('signup_device_invalid'));
  }
  const { data } = await customUnAuthAxios.post<IVerifyEmailOtpResponse>(
    "/auth/verify-email-otp",
    body,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tempToken}`,
      },
    },
  );
  return data;
};

export function getVerifyEmailOtpErrorMessage(
  t : (key : string) => string,
  status: number | undefined,
  data?: { data?: IVerifyEmailOtp401Data },
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
          ? ` (${t('alert_login_error_count')}: ${(d as IVerifyEmailOtp401Data).remaining_fail_count}${t('unit_times')})`
          : "";
      return t('alert_otp_error_401') + extra;
    }
    case 410:
      return t('alert_otp_error_410');
    default:
      return t('alert_otp_error_etc');
  }
}
