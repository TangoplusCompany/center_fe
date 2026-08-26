import axios, { AxiosError } from "axios";
import { customUnAuthAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";
import { ILoginData } from "@/types/manager";

type IVerifyLoginOtpResponse = { data: ILoginData } & IResponseDefault;

/** 400, 403, 404, 410, 423: data 빈 배열 */
type IVerify2FAErrorResponseBase = IResponseDefault & {
  status: 400 | 403 | 404 | 410 | 423;
  success: false;
  data: [];
};

/** 401: 남은 실패/발급 횟수 포함 */
type IVerify2FAErrorResponse401 = IResponseDefault & {
  status: 401;
  success: false;
  data: {
    remaining_fail_count: number;
    remaining_issue_count: number;
  };
};

type IVerify2FAErrorResponse =
  | IVerify2FAErrorResponseBase
  | IVerify2FAErrorResponse401;

/**
 * verify-2fa 에러 클래스
 */
export class Verify2FAError extends Error {
  status: number;
  message: string;
  userMessage: string;
  /** 401일 때만: 남은 OTP 검증 실패 횟수 (최대 5회) */
  remainingFailCount?: number;
  /** 401일 때만: 남은 OTP 발급 횟수 (최대 10회) */
  remainingIssueCount?: number;

  constructor(errorResponse: IVerify2FAErrorResponse, t: (key: string) => string) {
    const message = errorResponse.message?.[0] ?? "OTP 검증에 실패했습니다.";
    super(message);
    this.name = "Verify2FAError";
    this.status = errorResponse.status;
    this.message = message;

    const translate = t ?? ((key: string) => key);

    if (errorResponse.status === 401 && "remaining_fail_count" in errorResponse.data) {
      this.remainingFailCount = errorResponse.data.remaining_fail_count;
      this.remainingIssueCount = errorResponse.data.remaining_issue_count;
    }

    // 상태코드별 사용자 메시지
    switch (errorResponse.status) {
      case 400:
        this.userMessage = translate("alert_otp_verify_error_400");
        break;
      case 403:
        this.userMessage = translate("alert_otp_verify_error_403");
        break;
      case 401: {
        let baseMsg = translate("alert_otp_verify_error_401");
        if (
          this.remainingFailCount !== undefined ||
          this.remainingIssueCount !== undefined
        ) {
          const parts: string[] = [];
          if (this.remainingFailCount !== undefined) {
            parts.push(
              `${translate("alert_login_error_count")} ${this.remainingFailCount}${translate("unit_times")}`
            );
          }
          if (this.remainingIssueCount !== undefined) {
            parts.push(
              `${translate("alert_login_error_count")} ${this.remainingIssueCount}${translate("unit_times")}`
            );
          }
          baseMsg += ` (${parts.join(", ")})`;
        }
        this.userMessage = baseMsg;
        break;
      }
      case 404:
        this.userMessage = translate("alert_otp_verify_error_404");
        break;
      case 410:
        this.userMessage = translate("alert_otp_verify_error_410");
        break;
      case 423:
        this.userMessage = translate("alert_otp_verify_error_423");
        break;
      default:
        this.userMessage = translate("alert_otp_verify_error_etc");
    }
  }
}

/**
 * 2차 인증 OTP 검증
 */
export const postVerifyLoginOtp = async ({
  t,
  otp,
  tempJwt,
}: {
  t: (key: string) => string;
  otp: string;
  type?: "email" | "mobile";
  tempJwt: string;
}): Promise<ILoginData> => {
  try {
    const { data } = await customUnAuthAxios.post<IVerifyLoginOtpResponse>(
      "/auth/verify-2fa",
      { otp },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tempJwt}`,
        },
      },
    );
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<IVerify2FAErrorResponse>;
      if (axiosError.response?.data) {
        throw new Verify2FAError(axiosError.response.data, t);
      }
      throw new Error(t("device_error_network"));
    }
    if (error instanceof Verify2FAError) throw error;
    throw new Error(t("alert_otp_verify_error_etc"));
  }
};