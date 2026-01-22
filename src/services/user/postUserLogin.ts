import axios, { AxiosError } from "axios";
import { IResultPageLoginResponse, IResultPageLoginSuccessResponse, IResultPageLoginErrorResponse } from "@/types/user";

/**
 * 사용자 로그인 에러 클래스
 */
export class UserLoginError extends Error {
  status: number;
  message: string;
  remainingAttempts?: number;
  userMessage: string; // 사용자에게 표시할 메시지
  shouldSetFieldError?: {
    field: "phone" | "pin";
    message: string;
  };

  constructor(errorResponse: IResultPageLoginErrorResponse) {
    const message = errorResponse.message?.[0] || "로그인에 실패했습니다.";
    super(message);
    this.name = "UserLoginError";
    this.status = errorResponse.status;
    this.message = message;
    
    if (!Array.isArray(errorResponse.data) && errorResponse.data?.remaining_attempts !== undefined) {
      this.remainingAttempts = errorResponse.data.remaining_attempts;
    }

    // 에러 상태에 따라 사용자 메시지와 필드 에러 설정
    switch (errorResponse.status) {
      case 400:
        this.userMessage = "필수 정보가 누락되었습니다. 다시 확인해주세요.";
        break;
      case 422:
        this.userMessage = "전화번호 형식이 올바르지 않습니다.";
        this.shouldSetFieldError = {
          field: "phone",
          message: "전화번호 형식이 올바르지 않습니다.",
        };
        break;
      case 401:
        // 메시지에 이미 남은 시도 횟수가 포함되어 있는지 확인
        if (message.includes("Remaining attempts")) {
          this.userMessage = message;
        } else if (this.remainingAttempts !== undefined) {
          this.userMessage = `${message} (남은 시도 횟수: ${this.remainingAttempts}회)`;
        } else {
          this.userMessage = message;
        }
        break;
      case 423:
        this.userMessage = "로그인 시도가 5번 이상 실패하여 계정이 잠겼습니다.";
        break;
      default:
        this.userMessage = message || "로그인에 실패했습니다. 잠시 후 다시 시도해주세요.";
    }
  }
}

/**
 * 사용자 로그인 API
 * @param mobile 전화번호
 * @param pin_password PIN 비밀번호
 * @returns 로그인 응답
 * @throws {UserLoginError} 로그인 실패 시
 */
export const postUserLogin = async ({
  mobile,
  pin_password,
}: {
  mobile: string;
  pin_password: string;
}): Promise<IResultPageLoginSuccessResponse["data"]> => {
  try {
    // 사용자 로그인 API 호출
    // TODO: 백엔드에서 CORS 설정 완료되면 직접 호출 가능
    const { data } = await axios.post<IResultPageLoginResponse>(
      "https://gym.tangoplus.co.kr/user_api/v1/login",
      {
        mobile,
        pin_password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );

    if (!data.success || data.status !== 200) {
      throw new UserLoginError(data as IResultPageLoginErrorResponse);
    }

    return data.data;
  } catch (error) {
    // Axios 에러인 경우 (네트워크 에러 등)
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<IResultPageLoginErrorResponse>;
      
      // 서버에서 응답을 받은 경우
      if (axiosError.response?.data) {
        throw new UserLoginError(axiosError.response.data);
      }
      
      // 네트워크 에러 등
      throw new Error("서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
    }
    
    // 이미 UserLoginError인 경우 그대로 throw
    if (error instanceof UserLoginError) {
      throw error;
    }
    
    // 기타 에러
    throw new Error("로그인에 실패했습니다. 잠시 후 다시 시도해주세요.");
  }
};
