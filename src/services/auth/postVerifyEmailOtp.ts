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
  tempToken: string
) => {
  if (!tempToken || typeof tempToken !== "string") {
    throw new Error("기기 확인 후 이메일 인증을 진행해주세요.");
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
  status: number | undefined,
  data?: { data?: IVerifyEmailOtp401Data }
): string {
  switch (status) {
    case 400:
      return "필수 파라미터가 누락되었거나, type/purpose 값이 올바르지 않습니다.";
    case 404:
      return "해당 이메일과 매칭되는 OTP 정보가 없습니다.";
    case 423:
      return "OTP 요청 횟수 초과 또는 5회 검증 실패로 잠겼습니다. 탱고바디 관리자에게 문의해주세요.";
    case 401: {
      const d = data?.data;
      const extra =
        d && typeof d === "object" && "remaining_fail_count" in d
          ? ` (남은 시도: ${(d as IVerifyEmailOtp401Data).remaining_fail_count}회)`
          : "";
      return "OTP가 틀렸습니다. 다시 확인해주세요." + extra;
    }
    case 410:
      return "OTP 유효시간(5분)이 지났습니다. 재전송 후 다시 시도해주세요.";
    default:
      return "OTP 인증에 실패했습니다.";
  }
}
