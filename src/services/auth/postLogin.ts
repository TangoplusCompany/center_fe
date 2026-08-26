import axios, { AxiosError } from "axios";
import { customUnAuthAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";
import {
  ILoginData,
  ILoginTempJwtResponse,
  IAdminLoginNewResponse,
  IAdminLoginNewErrorResponse,
} from "@/types/manager";

type ILoginResponse = { data: ILoginData } & IResponseDefault;
type TranslateFn = (key: string, values?: Record<string, unknown>) => string;
/**
 * 관리자 로그인 에러 클래스 (auth/login-new 실패 시)
 */

export class AdminLoginError extends Error {
  status: number;
  message: string;
  remainingAttempts?: number;
  userMessage: string;

  constructor(errorResponse: IAdminLoginNewErrorResponse, t?: TranslateFn) {
    const message = errorResponse.message?.[0] ?? "로그인에 실패했습니다.";
    super(message);
    this.name = "AdminLoginError";
    this.status = errorResponse.status;
    this.message = message;

    const attempts = errorResponse.data?.remaining_attempts;
    if (attempts !== undefined) {
      this.remainingAttempts = attempts;
    }

    // t가 제공되지 않았을 때의 기본 번역/폴백 함수
    const translate = t ?? ((key: string) => key);

    switch (errorResponse.status) {
      case 401:
        this.userMessage =
          this.remainingAttempts !== undefined
            ? `${translate('alert_login_error')} (${translate('alert_login_error_count')}: ${this.remainingAttempts}${translate('unit_times')})`
            : `${translate('alert_login_error')}`;
        break;
      case 403:
        this.userMessage =
          translate('alert_login_error_lock');
        break;
      case 500: 
        this.userMessage = 
          translate('device_error_network')
      default:
        this.userMessage = translate('login_error_general');
    }
  }
}

/**
 * 로그인 API (최종 로그인 완료 시 - OTP 검증 후 등)
 * @param email 이메일
 * @param password 비밀번호
 * @returns 로그인 응답
 */
export const postLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data } = await customUnAuthAxios.post<ILoginResponse>(
    "/auth/login",
    {
      email,
      password,
    },
    {
      withCredentials: true,
    },
  );
  return data.data;
};

/**
 * 2차 인증용 1단계 로그인 API - /auth/login-new 호출
 * 성공 시 data.temp_token을 2차 인증용 임시 JWT로 사용
 * @throws {AdminLoginError} 로그인 실패 시 (401 남은 시도 / 403 계정 잠김)
 */
export const postLoginFor2FA = async ({
  email,
  password,
  translate,
}: {
  email: string;
  password: string;
  translate : (key : string) => string
}): Promise<ILoginTempJwtResponse> => {
  try {
    const { data } = await customUnAuthAxios.post<IAdminLoginNewResponse>(
      "/auth/login-new",
      { email, password },
      { withCredentials: true },
    );

    if (data.success && data.status === 200) {
      return { temp_jwt: data.data.temp_token };
    }

    throw new AdminLoginError(data as unknown as IAdminLoginNewErrorResponse, translate);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<IAdminLoginNewErrorResponse>;
      if (axiosError.response?.data) {
        throw new AdminLoginError(axiosError.response.data, translate);
      }
    }
    if (error instanceof AdminLoginError) {
      throw error;
    }
    throw error;
  }
};
