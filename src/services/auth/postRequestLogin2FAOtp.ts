import { customUnAuthAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";

type IRequest2FAResponse = IResponseDefault & {
  status: 200;
  success: true;
  data: {
    otp_sent: boolean;
    temp_token: string;
  };
};

/**
 * 2차 인증 OTP 발송 요청 (임시 JWT를 헤더에 담아 전송)
 * 실제 API 연동 시 엔드포인트/스펙 알려주시면 반영 예정
 */
export const postRequestLogin2FAOtp = async ({
  type,
  tempJwt,
}: {
  type: "email" | "mobile";
  tempJwt: string;
}): Promise<IRequest2FAResponse["data"]> => {
  const { data } = await customUnAuthAxios.post<IRequest2FAResponse>(
    "/auth/request-2fa",
    { type },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tempJwt}`,
      },
    },
  );
  return data.data;
};
