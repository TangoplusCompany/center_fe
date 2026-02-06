import axios, { AxiosError } from "axios";
import { customUnAuthAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";
import { ILoginData } from "@/types/manager";

type IVerifyLoginOtpResponse = { data: ILoginData } & IResponseDefault;

type IVerify2FAErrorResponse = IResponseDefault & {
  status: 400 | 401 | 404 | 410 | 423;
  success: false;
  data: [];
};

/**
 * verify-2fa 에러 클래스
 */
export class Verify2FAError extends Error {
  status: number;
  message: string;
  userMessage: string;

  constructor(errorResponse: IVerify2FAErrorResponse) {
    const message = errorResponse.message?.[0] ?? "OTP 검증에 실패했습니다.";
    super(message);
    this.name = "Verify2FAError";
    this.status = errorResponse.status;
    this.message = message;

    // 상태코드별 사용자 메시지
    switch (errorResponse.status) {
      case 400: {
        // Missing required parameters / Invalid type or purpose 둘 다 400이므로 message로 보정
        if (message.toLowerCase().includes("missing required")) {
          this.userMessage = "필수 정보가 누락되었습니다. 다시 시도해주세요.";
        } else if (message.toLowerCase().includes("invalid type") || message.toLowerCase().includes("invalid purpose")) {
          this.userMessage = "요청 값이 올바르지 않습니다. 다시 시도해주세요.";
        } else {
          this.userMessage = "요청이 올바르지 않습니다. 다시 시도해주세요.";
        }
        break;
      }
      case 401:
        this.userMessage = "인증번호가 맞지 않습니다.";
        break;
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
 * 2차 인증 OTP 검증 (임시 JWT를 헤더에 담아 전송, 성공 시 로그인 정보 반환)
 */
export const postVerifyLoginOtp = async ({
  otp,
  type,
  tempJwt,
}: {
  otp: string;
  type: "email" | "mobile";
  tempJwt: string;
}): Promise<ILoginData> => {
  try {
    const { data } = await customUnAuthAxios.post<IVerifyLoginOtpResponse>(
      "/auth/verify-2fa",
      { otp, type, purpose: "2fa" },
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
