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
): string {
  switch (status) {
    case 401:
      return "유효하지 않은 이메일 인증 토큰입니다. 이메일 인증부터 다시 진행해주세요.";
    case 400:
      return "필수 항목이 누락되었거나 입력 형식이 올바르지 않습니다.";
    case 409:
      return "이미 등록된 계정입니다.";
    case 500:
      return "회원가입 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
    default:
      return "회원가입에 실패했습니다.";
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
    throw new Error("이메일 인증이 필요합니다. OTP 인증을 완료해주세요.");
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
