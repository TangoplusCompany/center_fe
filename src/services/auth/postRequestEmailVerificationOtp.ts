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
): string {
  switch (status) {
    case 401:
      return "유효하지 않은 기기 인증 토큰입니다. 시리얼 넘버 확인 후 다시 시도해주세요.";
    case 400:
      return "필수 파라미터가 누락되었거나 이메일 형식이 올바르지 않습니다.";
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
    throw new Error("기기 확인 후 이메일 인증을 진행해주세요.");
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
