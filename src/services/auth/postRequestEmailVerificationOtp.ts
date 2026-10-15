import { customUnAuthAxios } from "@/lib/axios";
import type { IResponseDefault } from "@/types/default";

/** auth/request-email-verification-otp 응답 data */
export interface IRequestEmailVerificationOtpSentData {
  remaining_issue_count: number;
}

/** 기존 관리자 존재(200) 응답 data */
export interface IRequestEmailVerificationOtpExistingAdminData {
  existing_admin_before_registering_temp_token: string;
  admin_sn: number;
}

export type IRequestEmailVerificationOtpData =
  | IRequestEmailVerificationOtpSentData
  | IRequestEmailVerificationOtpExistingAdminData;

export type IRequestEmailVerificationOtpResponse = IResponseDefault & {
  data: IRequestEmailVerificationOtpData;
};

/**
 * 주관리자 이메일 인증 OTP 요청 실패 시 한국어 메시지 반환
 */
export function getRequestEmailVerificationOtpErrorMessage(
  status: number | undefined,
  t?: (key: string) => string,
): string {
  if (t) {
    switch (status) {
      case 401:
        return t("alert_device_token_invalid");
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
  switch (status) {
    case 401:
      return "Invalid device verification token. Please check the serial number and try again.";
    case 400:
      return "Required parameter is missing, or the format is invalid.";
    case 429:
      return "Exceeded the allowed number of OTP requests (10 times). Please contact the administrator.";
    case 423:
      return "Account locked due to exceeding OTP requests or 5 failed verification attempts. Please contact the administrator.";
    case 500:
      return "Failed to send OTP email.";
    default:
      return "Failed to request OTP.";
  }
}

/**
 * 주관리자 회원가입 전 이메일 인증 OTP 요청
 * 기기번호 검증에서 받은 temp_token을 Authorization: Bearer {temp_token} 으로 전달
 */
export const postRequestEmailVerificationOtp = async ({
  email,
  tempToken,
}: {
  email: string;
  tempToken: string;
}) => {
  if (!tempToken || typeof tempToken !== "string") {
    throw new Error("Device verification is required before proceeding with email verification.");
  }
  const { data } = await customUnAuthAxios.post<IRequestEmailVerificationOtpResponse>(
    "/auth/request-email-verification-otp",
    { email },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tempToken}`,
      },
    },
  );
  return data;
};
