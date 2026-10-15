import { customUnAuthAxios } from "@/lib/axios";
import type { IResponseDefault } from "@/types/default";

/** auth/register-admin 요청 body (최초 가입) */
export interface IRegisterAdminRequest {
  admin_email: string;
  password: string;
  admin_name: string;
  admin_mobile: string;
  center_name: string;
  center_address: string;
  center_address_detail: string;
  center_phone: string;
}

/** auth/register-admin 요청 body (이미 존재하는 관리자: 센터 정보만) */
export interface IRegisterAdminExistingAdminRequest {
  center_name: string;
  center_address: string;
  center_address_detail: string;
  center_phone: string;
}

/** auth/register-admin 성공(201) 응답 data */
export interface IRegisterAdminData {
  admin_sn: number;
  center_sn: number;
  device_sn: number;
}

export type IRegisterAdminResponse = IResponseDefault & {
  data: IRegisterAdminData;
};

/**
 * 주관리자 회원가입 실패 시 한국어 메시지 반환
 */
export function getRegisterAdminErrorMessage(
  status: number | undefined,
  t?: (key: string) => string,
): string {
  if (t) {
    switch (status) {
      case 401:
        return t("alert_email_token_invalid");
      case 400:
        return t("alert_register_missing_fields");
      case 409:
        return t("alert_register_already_registered");
      case 500:
        return t("alert_sub_admin_error_500");
      default:
        return t("signup_failed");
    }
  }
  switch (status) {
    case 401:
      return "Invalid email verification token. Please restart email verification.";
    case 400:
      return "Required fields are missing or the format is invalid.";
    case 409:
      return "This account is already registered.";
    case 500:
      return "An error occurred during registration. Please try again in a moment.";
    default:
      return "Registration failed.";
  }
}

/**
 * 주관리자 회원가입
 * - 최초 가입: email_verification_temp_token 사용, 전체 body 전달
 * - 이미 존재하는 관리자: existing_admin_before_registering_temp_token 사용, 센터 정보만 전달
 */
export const postRegisterAdmin = async (
  body: IRegisterAdminRequest | IRegisterAdminExistingAdminRequest,
  token: string,
) => {
  if (!token?.trim()) {
    throw new Error("Email verification is required. Please complete OTP verification.");
  }
  const { data } = await customUnAuthAxios.post<IRegisterAdminResponse>(
    "/auth/register-admin",
    body,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};
