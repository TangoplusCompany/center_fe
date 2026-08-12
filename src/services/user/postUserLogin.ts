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
    // GS 인증: 휴대폰·PIN 오류와 계정 잠금 여부를 구분하지 않는 동일 문구를 사용한다.
    const message = "휴대폰 번호 또는 PIN 번호가 올바르지 않습니다.";
    super(message);
    this.name = "UserLoginError";
    this.status = errorResponse.status;
    this.message = message;
    
    this.userMessage = message;
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
      process.env.NEXT_PUBLIC_API_URL_V1 + "/login",
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
