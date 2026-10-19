import { customUserAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";
import axios from "axios";

export interface IGetQrCodeStatusParams {
  user_sn: number | string;
}

export interface IQrCodeStatusResponse extends IResponseDefault {
  data?: unknown[];
}

/**
 * 키오스크 QR 코드 상태 조회 API (GET)
 * @param user_sn 사용자 고유 번호
 * @returns 200: QR code still in use (계속 사용 가능)
 *          403: QR code no longer in use (사용 완료/만료)
 */
export const getQrCodeStatus = async ({
  user_sn,
}: IGetQrCodeStatusParams): Promise<IQrCodeStatusResponse> => {
  try {
    const { data } = await customUserAxios.get<IQrCodeStatusResponse>(
      `/qr-code-status/users/${user_sn}`,
      {
        // 403(사용 완료)도 비즈니스 응답으로 수신하여 reject 방지
        validateStatus: (status) =>
          (status >= 200 && status < 300) || status === 403,
      }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      return error.response.data as IQrCodeStatusResponse;
    }
    throw error;
  }
};

