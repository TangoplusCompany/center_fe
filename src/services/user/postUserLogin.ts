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

    // API 응답 상태코드별 한글 메시지 및 필드 에러 설정
    switch (errorResponse.status) {
      case 400:
        // 필수 파라미터 없을 경우
        this.userMessage = "필수 정보가 누락되었습니다. 다시 확인해주세요.";
        break;
      case 422:
        // 전화번호 등 유효하지 않은 입력 형식
        this.userMessage = "전화번호 형식이 올바르지 않습니다.";
        this.shouldSetFieldError = {
          field: "phone",
          message: "전화번호 형식이 올바르지 않습니다.",
        };
        break;
      case 401:
        // 전화번호 또는 비밀번호 오류 (존재하지 않는 번호 / 또는 남은 시도 횟수 있음)
        this.userMessage =
          this.remainingAttempts !== undefined
            ? `전화번호 또는 비밀번호가 일치하지 않습니다. (남은 시도 횟수: ${this.remainingAttempts}회)`
            : "전화번호 또는 비밀번호가 일치하지 않습니다.";
        break;
      case 423:
        // 로그인 5회 이상 실패로 계정 잠금
        this.userMessage = "로그인 시도가 5번 이상 실패하여 계정이 잠겼습니다.";
        break;
      default:
        this.userMessage = "로그인에 실패했습니다. 잠시 후 다시 시도해주세요.";
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
    // Axios 에러(네트워크 오류 등)
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<IResultPageLoginErrorResponse>;
      if (axiosError.response?.data) {
        throw new UserLoginError(axiosError.response.data);
      }
      throw new Error("서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
    }
    if (error instanceof UserLoginError) {
      throw error;
    }
    throw new Error("로그인에 실패했습니다. 잠시 후 다시 시도해주세요.");
  }
};
