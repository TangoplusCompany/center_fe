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

  constructor(errorResponse: IVerify2FAErrorResponse) {
    const message = errorResponse.message?.[0] ?? "OTP 검증에 실패했습니다.";
    super(message);
    this.name = "Verify2FAError";
    this.status = errorResponse.status;
    this.message = message;

    if (errorResponse.status === 401 && "remaining_fail_count" in errorResponse.data) {
      this.remainingFailCount = errorResponse.data.remaining_fail_count;
      this.remainingIssueCount = errorResponse.data.remaining_issue_count;
    }

    // 상태코드별 사용자 메시지
    switch (errorResponse.status) {
      case 400:
        this.userMessage = "필수 정보가 누락되었습니다. 다시 시도해주세요.";
        break;
      case 403:
        this.userMessage = "요청 값이 올바르지 않습니다. 다시 시도해주세요.";
        break;
      case 401: {
        this.userMessage = "인증번호가 맞지 않습니다.";
        if (
          this.remainingFailCount !== undefined ||
          this.remainingIssueCount !== undefined
        ) {
          const parts: string[] = [];
          if (this.remainingFailCount !== undefined)
            parts.push(`남은 시도 ${this.remainingFailCount}회`);
          if (this.remainingIssueCount !== undefined)
            parts.push(`재전송 가능 ${this.remainingIssueCount}회`);
          this.userMessage += ` (${parts.join(", ")})`;
        }
        break;
      }
      case 404:
        this.userMessage = "인증번호 요청 내역이 없습니다. 재전송 후 다시 입력해주세요.";
        break;
      case 410:
        this.userMessage = "인증번호가 만료되었습니다. 재전송 후 다시 입력해주세요.";
        break;
      case 423:
        this.userMessage =
          "OTP 요청/검증 실패 횟수를 초과해 잠겼습니다. 탱고바디 관리자에게 문의해주세요.";
        break;
      default:
        this.userMessage = "OTP 검증에 실패했습니다. 잠시 후 다시 시도해주세요.";
    }
  }
}

/**
 * 2차 인증 OTP 검증
 * - Header: Content-Type, Authorization Bearer {temp_token} (request-2fa에서 발급한 임시 JWT)
 * - Request: { otp } 만 전송 (type/purpose는 temp_token에 포함됨)
 * - 성공 시 로그인 정보(admin_info, access_jwt) 반환
 */
export const postVerifyLoginOtp = async ({
  otp,
  tempJwt,
}: {
  otp: string;
  /** 호출부 호환용, API에는 미전송(temp_token에 포함) */
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
        throw new Verify2FAError(axiosError.response.data);
      }
      throw new Error("서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
    }
    if (error instanceof Verify2FAError) throw error;
    throw new Error("OTP 검증에 실패했습니다. 잠시 후 다시 시도해주세요.");
  }
};
