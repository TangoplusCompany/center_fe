import axios, { AxiosError } from "axios";
import { customUnAuthAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";

/** 성공 시 응답 */
type IRequest2FASuccessResponse = IResponseDefault & {
  status: 200;
  success: true;
  data: {
    remaining_issue_count: number;
    temp_token: string;
  };
};

/** 실패 시 응답 (429: OTP 발급 횟수 제한, 423: OTP 요청 잠김) */
type IRequest2FAErrorResponse = IResponseDefault & {
  status: 429 | 423;
  success: false;
  data: [];
};

/**
 * 2차 인증 OTP 발송 요청 (임시 JWT를 헤더에 담아 전송)
 * - request: { type: "email" | "mobile", purpose: "2fa" }
 * - 429: OTP 발급 10회 제한 초과
 * - 423: OTP 요청 잠김 (발급/실패 횟수 초과)
 */
export const postRequestLogin2FAOtp = async ({
  type,
  tempJwt,
}: {
  type: "email" | "mobile";
  tempJwt: string;
}): Promise<IRequest2FASuccessResponse["data"]> => {
  try {
    const { data } = await customUnAuthAxios.post<IRequest2FASuccessResponse>(
      "/auth/request-2fa",
      { type, purpose: "2fa" },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tempJwt}`,
        },
      },
    );
    return data.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError<IRequest2FAErrorResponse>;
      const message = axiosError.response?.data?.message?.[0];
      if (message) throw new Error(message);
    }
    throw err;
  }
};
